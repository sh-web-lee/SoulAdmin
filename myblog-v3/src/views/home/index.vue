<script lang="ts" setup>
import EasyTyper from 'easy-typer-js';
import { useLoading } from '@sa/hooks';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { fetchArticleList, fetchSiteConfig, fetchStatistic } from '@/service/api';
import { numberFormate } from '@/utils/common';
import { handleScroll } from '@/utils/animation';

const { loading, startLoading, endLoading } = useLoading();
const router = useRouter();

const title = import.meta.env.VITE_APP_TITLE;

const obj = reactive({
  output: '',
  isEnd: false,
  speed: 200,
  singleBack: true,
  sleep: 0,
  type: 'rollback',
  backSpeed: 40,
  sentencePause: true
});

const articleList = ref<Api.ArticleManage.Article[]>([]);
const configInfo = ref<Api.SystemManage.SystemConfig>(createDefaultConfig());
function createDefaultConfig(): Api.SystemManage.SystemConfig {
  return {
    blog_avatar: '../../assets/image/home-banner.jpg',
    blog_name: 'LEE Malachi - BLOG',
    gitee_link: '',
    github_link: '',
    banner: '../../assets/image/home-banner.jpg',
    notice: '',
    personal_say: ''
  };
}
const statisticInfo = ref<Api.SystemManage.SystemStatistic>({
  articleCount: 0,
  categoryCount: 0,
  tagCount: 0
});

function getTyper() {
  fetch('https://v1.hitokoto.cn?c=i')
    .then(res => {
      return res.json();
    })
    .then(({ hitokoto }) => {
      initTyped(hitokoto);
    })
    .catch(err => {
      throw new Error(err);
    });
}

function initTyped(input: string) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const typed = new EasyTyper(
    obj,
    input,
    () => {},
    () => {}
  );
}

async function init() {
  startLoading();
  getTyper();
  await getSiteConfig();
  await getStatisticData();
  await getArticleList();
  endLoading();
}

/** 文章 */
const param = reactive({
  current: 1, // 当前页
  size: 5 // 每页条目数
});
async function getArticleList() {
  const { data } = await fetchArticleList(param);
  const res = data?.items || [];
  articleList.value = res;
}

async function getSiteConfig() {
  const { data } = await fetchSiteConfig();
  if (data) {
    configInfo.value = data;
  }
}

async function getStatisticData() {
  const { data } = await fetchStatistic();
  if (data) {
    Object.assign(statisticInfo.value, data);
  }
}

function addTag() {
  ElNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, '按 Ctrl + D 加入书签')
  });
}

function scrollDown() {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
  });
}
/* 文章操作 start */
type OperateType = 'detail' | 'tag' | 'category';
function operate(type: OperateType, item: Api.ArticleManage.Article) {
  const handlers: Record<OperateType, () => void> = {
    detail: () => router.push({ path: '/article', query: { id: item.id } }),
    tag: () => router.push({ path: '/tag' }),
    category: () => router.push({ path: '/category' })
  };

  handlers[type]();
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  init();
});
</script>

<template>
  <div class="home_banner">
    <div class="banner_container">
      <!-- title -->
      <h1 class="animate__animated blog_title animate__zoomIn">{{ title }}</h1>
      <!-- 打字机 -->
      <div class="blog_intro">
        {{ obj.output }}
        <span class="typed_cursor">|</span>
      </div>
      <!-- more -->
      <div class="scroll-down">
        <div class="inline-block scroll-down-effects" @click="scrollDown">
          <SvgIcon local-icon="arrow-down" class="cursor-pointer text-8" />
        </div>
      </div>
    </div>
  </div>
  <div class="home_cont">
    <ElRow :gutter="20">
      <ElCol :xs="24" :sm="18">
        <div class="flex-col gap-20px">
          <template v-if="loading">
            <ElCard v-for="item in 5" :key="item" class="card-hover">
              <div class="article-box">
                <ElSkeleton class="h-full" animated>
                  <template #template>
                    <ArticleSkeleton />
                  </template>
                </ElSkeleton>
              </div>
            </ElCard>
          </template>
          <template v-else>
            <template v-if="articleList.length">
              <ElCard v-for="(item, index) in articleList" :key="index" class="!bg-transparent">
                <div class="article-card scroll-animation">
                  <div class="article-cover" :class="[`order-${index % 2}`]" @click="operate('detail', item)">
                    <div v-image="item.article_cover" class="wh-full cursor-pointer">
                      <ElImage :src="item.article_cover" fit="cover" class="on_hover wh-full">
                        <template #error>
                          <SvgIcon local-icon="image404" :width="15" :height="15"></SvgIcon>
                        </template>
                      </ElImage>
                    </div>
                  </div>
                  <!-- 信息 -->
                  <div class="article_wrapper">
                    <RouterLink :to="'/article/' + item.id" class="article_title fadeInUp fadeDelay00">
                      {{ item.article_title }}
                    </RouterLink>
                    <div class="article_info">
                      <span v-if="item.is_top == 1" class="hover-pointer">
                        <i class="iconfont icon-zhiding"></i>
                        <span class="meta-label">置顶</span>
                        <span class="article-meta__separator"></span>
                      </span>
                      <span class="cursor-pointer">
                        <i class="iconfont icon-calendar2"></i>
                        <span class="meta-label">发表于</span>
                        <span class="meta-value">{{ item.createdAt }}</span>
                      </span>
                      <span class="cursor-pointer">
                        <i class="iconfont icon-schedule"></i>
                        <span class="meta-label">更新于</span>
                        <span class="meta-value">{{ item.updatedAt }}</span>
                      </span>
                      <span class="article-meta__separator"></span>
                      <span class="cursor-pointer" @click="operate('category', item)">
                        <i class="iconfont icon-folder"></i>
                        <span class="meta-value">{{ item.categoryName }}</span>
                      </span>
                      <span class="article-meta__separator"></span>
                      <span class="cursor-pointer" @click="operate('tag', item)">
                        <i class="iconfont icon-label_fill"></i>
                        <span v-for="(tagName, index) in item.tagNameList" :key="index" class="meta-value">
                          {{ index == item.tagNameList.length - 1 ? tagName : tagName + '、' }}
                        </span>
                      </span>
                      <span class="article-meta__separator"></span>
                      <span class="cursor-pointer">
                        <i class="iconfont icon-icon1"></i>
                        <GsapCount
                          v-if="item.thumbs_up_times - 0 < 1000"
                          class="meta-value"
                          :value="numberFormate(item.thumbs_up_times)"
                        />
                        <span v-else class="meta-value">
                          {{ numberFormate(item.thumbs_up_times) }}
                        </span>
                      </span>
                      <span class="article-meta__separator"></span>
                      <span class="cursor-pointer">
                        <i class="iconfont icon-chakan"></i>
                        <GsapCount
                          v-if="item.view_times - 0 < 1000"
                          class="meta-value"
                          :value="numberFormate(item.view_times)"
                        />
                        <span v-else class="meta-value">
                          {{ numberFormate(item.view_times) }}
                        </span>
                      </span>
                    </div>
                    <ToolTip
                      width="100%"
                      size="1.2rem"
                      align="left"
                      :line-height="3"
                      :name="item.article_description"
                    />
                  </div>
                </div>
              </ElCard>
            </template>
            <template v-else>
              <div class="no-article">暂无文章，请先到后台发布文章～</div>
            </template>
          </template>
        </div>
        <ElCard
          class="animate__animated card-hover animate__fadeIn info-card mobile-bottom-card mobile-card"
          shadow="hover"
        ></ElCard>
      </ElCol>
      <ElCol :xs="0" :sm="6">
        <!-- 博客我的信息 -->
        <div class="scroll-animation blog_wrapper">
          <ElCard class="animate__animated animate__fadeInUp blog_card !bg-transparent">
            <!-- 博主信息 -->
            <div class="author_wrapper">
              <!-- 头像 -->
              <ElAvatar :size="110" :src="configInfo.blog_avatar" />
              <div class="fadeInUp fadeDelay00 text-5.5 font-500">{{ configInfo.blog_name }}</div>
              <div class="fadeInUp fadeDelay01 text-3.5">{{ configInfo.personal_say }}</div>
            </div>
            <!-- 导航标签 -->
            <div class="blog_info_wrapper">
              <div class="fadeInUp blog_info_data fadeDelay02">
                <RouterLink to="/archives">
                  <div class="text-3.5">文章</div>
                  <GsapCount :value="statisticInfo.articleCount" />
                </RouterLink>
              </div>
              <div class="fadeInUp blog-info-data fadeDelay03">
                <RouterLink to="/category">
                  <div class="text-3.5">分类</div>
                  <GsapCount :value="statisticInfo.categoryCount" />
                </RouterLink>
              </div>
              <div class="blog-info-data fadeInUp fadeDelay04">
                <RouterLink to="/tag">
                  <div class="text-3.5">标签</div>
                  <GsapCount :value="statisticInfo.tagCount" />
                </RouterLink>
              </div>
            </div>
            <!-- 加入书签 -->
            <a class="fadeInUp collection_btn fadeDelay05 cursor-pointer" @click="addTag">
              <!-- <VIcon color="#fff" size="18" class="mr-1">mdi-bookmark</VIcon> -->
              加入书签
            </a>
            <!-- 跳转链接 -->
            <div class="social_wrapper">
              <a
                class="iconfont fadeInUp iconqq fadeDelay06"
                target="_blank"
                rel="noopener noreferrer"
                href="http://wpa.qq.com/msgrd?v=3&uin=1986466043&site=qq&menu=yes"
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/sh-web-lee"
                class="iconfont fadeInUp icongithub fadeDelay07 ml-5 mr-5"
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://gitee.com/leefath"
                class="iconfont fadeInUp icongitee-fill-round fadeDelay08"
              />
            </div>
          </ElCard>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.home_banner {
  height: 100vh;
  background: url('../../assets/image/home-banner.jpg') center center / cover no-repeat;
  text-align: center;
  background-color: #49b1f5;
  background-attachment: fixed;
  color: #fff;
  animation: header-effect 1s;
  overflow: hidden;
  position: relative;
  .banner_container {
    margin-top: 43vh;
    line-height: 1.5;
    color: #eee;
    .blog_title {
      font-size: 2.5rem;
    }
    .typed_cursor {
      opacity: 1;
      animation: blink 0.8s infinite;
    }
  }
}
.scroll-down {
  position: absolute;
  width: 100%;
  bottom: 50px;
  display: flex;
  justify-content: center;
}
.article_info {
  font-size: 95%;
  color: #858585;
  line-height: 2;
  margin: 0.375rem 0;
}
.article_info a {
  font-size: 95%;
  color: #858585 !important;
}

.article-meta__separator {
  margin: 0 0.4rem;
  position: relative;

  &::after {
    content: '|';
    position: absolute;
    top: -7px;
    right: 0;
  }
}
@media (min-width: 760px) {
  .article-card {
    display: flex;
    align-items: center;
    height: 280px;
    width: 100%;
  }
  .on_hover {
    transition: all 0.6s;
  }
  .article-card:hover .on_hover {
    transform: scale(1.1);
  }
  .article-cover {
    overflow: hidden;
    height: 100%;
    width: 45%;
  }
  .left-radius {
    border-radius: 8px 0 0 8px !important;
    order: 0;
  }
  .right-radius {
    border-radius: 0 8px 8px 0 !important;
    order: 1;
  }
  .article_wrapper {
    padding: 0 2.5rem;
    width: 55%;
  }
  .article_wrapper .article_title {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
  .article_wrapper a:hover {
    color: #49b1f5;
  }
  .home_cont {
    max-width: 1200px;
    padding: 0 5px;
    margin: 30px auto;
  }
}
@media (max-width: 759px) {
  .tips {
    display: none;
  }
  .home_cont {
    width: 100%;
    margin: 15px auto;
  }
  .article-cover {
    overflow: hidden;
  }
  .article_wrapper {
    padding: 1.25rem 1.25rem 1.875rem;
  }
  .article-card {
    margin-top: 1rem;
  }
  .article_title {
    font-size: 1.5rem;
  }
}

.no-article {
  width: 100%;
  height: 80vh;
  line-height: 80vh;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.blog_wrapper {
  position: sticky;
  top: 10px;
}
.blog_card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}
.author_wrapper {
  text-align: center;
}
.blog_info_wrapper {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 0.875rem 0;
}

.collection_btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  transition-duration: 1s;
  transition-property: color;
}
.collection_btn:before {
  content: '';
  background-color: #ff7242;
  z-index: -1;
  transition: all 0.5s ease-out;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.collection_btn:hover:before {
  transform: scaleX(1);
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
}

:deep(.el-card .el-card__body) {
  padding: 0 !important;
}
</style>
