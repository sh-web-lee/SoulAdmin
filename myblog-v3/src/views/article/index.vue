<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useLoading } from '@sa/hooks';
import { MdCatalog, MdPreview } from 'md-editor-v3';
import { fetchArticleDetailById, fetchRecommendArticleById } from '@/service/api';
import { addZero, numberFormate } from '@/utils/common';
import 'md-editor-v3/lib/preview.css';
import { useThemeStore } from '@/store';

const route = useRoute();
const { loading, startLoading, endLoading } = useLoading();
const themeStore = useThemeStore();

const mdState = reactive({
  text: '',
  id: 'preview-only'
});
const scrollElement = document.documentElement;
const id = ref(0);
const articleInfo = ref<Api.ArticleManage.Article>(createDefaultArticleInfo());
function createDefaultArticleInfo(): Api.ArticleManage.Article {
  return {
    id: 0,
    author_id: 0,
    category_name: '',
    tagNameList: [],
    tags: [],
    is_top: 0,
    article_title: '',
    article_content: '',
    article_cover: '',
    article_description: '',
    status: 1,
    type: 1,
    updatedAt: '',
    view_times: 0,
    thumbs_up_times: 0,
    categoryName: '',
    reading_duration: 0,
    createdAt: ''
  };
}
const recommendInfo = ref<Api.SystemManage.RecommendArticleList>({
  next: null,
  previous: null,
  recommend: []
});

async function getData() {
  const { data } = await fetchArticleDetailById(id.value);
  if (data) {
    articleInfo.value = data;
  }
}

async function getRecommendData() {
  const { data } = await fetchRecommendArticleById(id.value);
  if (data) {
    recommendInfo.value = data;
  }
}

async function init() {
  startLoading();
  await getData();
  await getRecommendData();
  endLoading();
}

function readingDuration(times: number) {
  if (times > 3.6e6) {
    const hours = Number((times / 3.6e6).toFixed(0));
    const minutes = Number(((times % 3.6e6) / 6e4).toFixed(0));
    return `${addZero(hours)} 时 ${addZero(minutes)} 分`;
  }
  const minutes = Number((times / 6e4).toFixed(0));
  return `${addZero(minutes)} 分`;
}

const headerBgCover = computed(() => `background-image: url(${articleInfo.value.article_cover})`);

onMounted(() => {
  init();
});

watch(
  route,
  newValue => {
    id.value = newValue.params.id as unknown as number;
    init();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="">
    <div class="fadeIn page-header" :style="headerBgCover">
      <div v-image="articleInfo.article_cover" class="loading !pt-[80px]"></div>
      <div class="article main-article">
        <div v-if="loading" class="px-20rem">
          <ElSkeleton />
        </div>
        <div v-else>
          <!-- <div v-image="articleInfo.article_cover" class="loading"></div> -->
          <ToolTip width="80%" weight="500" size="2.4rem" align="center" :name="articleInfo?.article_title" />
          <div class="!mt-[20px]">
            <span class="to_pointer">
              <i class="iconfont icon-calendar2"></i>
              <span class="meta-label">发表于</span>
              <span class="meta-value">{{ articleInfo?.createdAt }}</span>
            </span>
            <span class="to_pointer">
              <i class="iconfont icon-schedule"></i>
              <span class="meta-label">更新于</span>
              <span class="meta-value">{{ articleInfo?.updatedAt }}</span>
            </span>
            <span class="meta-separator"></span>
            <span class="to_pointer">
              <i class="iconfont icon-folder"></i>
              <span class="meta-value">{{ articleInfo?.categoryName }}</span>
            </span>
            <span class="meta-separator"></span>
            <span class="to_pointer">
              <i class="iconfont icon-label_fill"></i>
              <span v-for="(item, index) in articleInfo?.tagNameList" :key="item" class="meta-value">
                {{ index + 1 == articleInfo?.tagNameList.length ? item : item + '、' }}
              </span>
            </span>
            <span class="meta-separator"></span>
            <span class="to_pointer">
              <i class="iconfont icon-icon1"></i>
              <span class="meta-label">点赞数</span>
              <GsapCount
                v-if="articleInfo?.thumbs_up_times - 0 < 1000"
                class="meta-value"
                :value="articleInfo?.thumbs_up_times"
              />
              <span v-else class="meta-value">
                {{ numberFormate(articleInfo?.thumbs_up_times || 0) }}
              </span>
            </span>
            <span class="meta-separator"></span>
            <span class="to_pointer">
              <i class="iconfont icon-chakan"></i>
              <span class="meta-label">浏览次数</span>
              <GsapCount
                v-if="articleInfo?.view_times - 0 < 1000"
                class="meta-value"
                :value="articleInfo?.view_times"
              />
              <span v-else class="meta-value">{{ numberFormate(articleInfo?.view_times || 0) }}</span>
            </span>
            <span class="meta-separator"></span>
            <span class="to_pointer">
              <i class="iconfont icon-speechbubble"></i>
              <span class="meta-label">阅读时长</span>
              <span class="meta-value">{{ readingDuration(articleInfo?.reading_duration || 0) }}</span>
            </span>
          </div>
          <div class="toggle-theme">
            <ElDropdown class="theme-card-dropdown">
              <div class="flex-col items-center">
                <span>预览主题</span>
                <span>{{ themeStore.previewTheme }}</span>
              </div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="(item, index) in themeStore.previewThemeList"
                    :key="index"
                    @click="themeStore.togglePreviewTheme(item)"
                  >
                    {{ item }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
            <ElDropdown class="theme-card-dropdown">
              <div class="flex-col">
                <span>代码主题</span>
                <span>{{ themeStore.codeTheme }}</span>
              </div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="(item, index) in themeStore.codeThemeList"
                    :key="index"
                    @click="themeStore.toggleCodeTheme(item)"
                  >
                    {{ item }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article-wrapper">
        <ElRow :gutter="20">
          <ElCol :xs="24" :sm="18">
            <ElCard class="!b-none">
              <ElSkeleton v-if="loading" class="p-4" :loading="loading" :rows="8" animated />
              <MdPreview
                v-else
                :theme="themeStore.themeScheme"
                :editor-id="mdState.id"
                :model-value="articleInfo?.article_content"
              />
            </ElCard>
          </ElCol>
          <ElCol :xs="0" :sm="6">
            <ElCard title="推荐文章" class="mb-4 !b-none">
              <ElSkeleton v-if="loading" class="p-4" :loading="loading" :rows="5" animated />
              <ElScrollbar v-else :height="`calc(${recommendInfo.recommend.length - 1} * 280)px`">
                <RouterLink
                  v-for="(item, index) in recommendInfo.recommend"
                  :key="index"
                  class="flex p-1"
                  :to="`/article/${item.id}`"
                >
                  <ElImage class="mr-2 h-80px w-100px" fit="cover" :src="item.article_cover">
                    <template #error>
                      <div class="wh-full flex-center">
                        <SvgIcon local-icon="image404" class="text-16"></SvgIcon>
                      </div>
                    </template>
                  </ElImage>
                  <div class="w-51% flex-col flex-1 py-2">
                    <ToolTip align="left" width="100%" weight="600" size="1rem" :name="item.article_title" />
                    <ToolTip align="left" width="100%" size="0.8rem" :name="item.createdAt" />
                  </div>
                </RouterLink>
              </ElScrollbar>
            </ElCard>
            <ElAffix :offset="120">
              <ElCard class="!b-none">
                <ElSkeleton v-if="loading" class="p-4" :loading="loading" :rows="3" animated />
                <MdCatalog v-else theme="dark" :editor-id="mdState.id" :scroll-element="scrollElement" />
              </ElCard>
            </ElAffix>
          </ElCol>
        </ElRow>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 760px) {
  .article_banner {
    background-color: #49b0f567;
    top: -60px;
    left: 0;
    right: 0;
    height: 400px;
    -webkit-animation: header-effect 1s;
    animation: header-effect 1s;
  }
  .article_info {
    font-size: 14px;
    line-height: 1.9;
    display: inline-block;
    margin-top: 15px;
    .article_category a {
      color: #eee !important;
    }
  }
  .article_title {
    font-size: 35px;
  }
  .article_container {
    max-width: 1200px;
    margin: 372.5px auto 40px auto !important;
    padding: 0 5px;
  }
  .aritcle_copyright {
    border: 1px solid #eee;
    padding: 0.625rem 1rem;
    margin: 40px auto 10px;
    line-height: 2;
    position: relative;
    font-size: 0.875rem;
  }
  .aritcle_copyright span {
    color: #49b1f5;
    font-weight: bold;
  }
  .aritcle_copyright a {
    text-decoration: underline !important;
    color: #99a9bf;
  }
  .aritcle_copyright:before {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background: #49b1f5;
    content: '';
  }
  .aritcle_copyright:after {
    position: absolute;
    top: 0.95rem;
    right: 0.95rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5em;
    background: #fff;
    content: '';
  }
  .article_content {
    word-break: break-word;
    font-size: 14px;
    line-height: 2;
  }
  .reward_all:before {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    content: '';
  }
  .article_reward .reward_main {
    display: none;
    position: absolute;
    bottom: 40px;
    left: 0;
    margin: 0;
    padding: 0 0 15px;
    width: 100%;
  }
  .reward_all:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 2px;
    left: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: 13px solid #f5f5f5;
    border-right: 13px solid transparent;
    border-left: 13px solid transparent;
  }
  .reward_desc {
    margin: -5px 0;
    color: #858585;
    text-align: center;
  }
  .article_directory {
    position: sticky;
    top: 20px;
  }
  .right_container {
    padding: 20px 24px;
    font-size: 14px;
  }
  .right_title {
    display: flex;
    align-items: center;
    line-height: 2;
    font-size: 16.8px;
    margin-bottom: 6px;
  }
}
@media (max-width: 759px) {
  .article_banner {
    height: 360px;
    position: relative;
  }
  .article_banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .article_info_container {
    padding: 0 5%;
    position: absolute;
    bottom: 1.3rem;
    width: 100%;
    color: #eee;
    text-align: left;
  }
  .article_title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
  .article_info {
    font-size: 14px;
    line-height: 1.9;
    display: inline-block;
  }
  .article_category a {
    color: #eee !important;
  }
  .article_info span {
    font-size: 90%;
  }
  .first_line .separator {
    margin: 0 6px;
  }
  .article_container {
    margin: 5.5px 0 8px 0 !important;
  }
  .article_wrapper {
    padding: 36px 14px;
  }
  .article_content {
    font-size: 14px;
  }
  .reward_all:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 2px;
    left: 80px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: 13px solid #f5f5f5;
    border-right: 13px solid transparent;
    border-left: 13px solid transparent;
  }
  .article_reward .reward_main {
    display: none;
    position: absolute;
    bottom: 40px;
    left: -49px;
    margin: 0;
    padding: 0 0 15px;
    width: 100%;
  }
}

.page-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 26rem;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .route-font {
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 2.4;
    text-align: center;
    color: var(--router-color);
    z-index: 999;
    cursor: pointer;
    transition: all 0.3s;
  }
  .article {
    width: 100%;
    z-index: 999;
    background: transparent;
    font-size: 1.1rem;
    line-height: 1.4;
    margin-top: 5rem;
    text-align: center;
    color: #fff;

    .to_pointer {
      padding: 0 0.3rem;
    }

    .iconfont {
      margin-right: 0.3rem;
    }
  }

  .toggle-theme {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    h3 {
      line-height: 1.4;
    }

    .theme-card-dropdown {
      width: 8rem;
      overflow: auto;
      margin: 0.5rem;
      text-align: center;
      display: block;
      padding: 0.2rem 0;
      background: transparent;
      border: 1px solid var(--global-white);
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.5s;

      span {
        &:first-child {
          line-height: 1.2;
        }
      }
      &:hover {
        transform: translateY(-3px);
      }
    }
  }
}

.article-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 28rem);
  padding: 2.8rem 10px;
}

.command-box {
  max-height: 160px;
  overflow-y: auto;
  scrollbar-width: none;
}

:deep(.el-card .el-card__body) {
  padding: 0 !important;
}
</style>
