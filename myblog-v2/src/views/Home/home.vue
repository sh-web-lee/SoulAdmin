<template>
  <div class="home">
    <div class="home_banner">
      <div class="banner_container">
        <!-- title -->
        <h1 class="blog_title animate__animated animate__zoomIn">
          李建阳的个人博客
        </h1>
        <!-- 打字机 -->
        <div class="blog_intro">
          {{ obj.output }}<span class="typed_cursor">|</span>
        </div>
        <!-- 社交媒体 -->
        <div class="blog-contact">
          <a
            class="iconfont iconqq"
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=1986466043&site=qq&menu=yes"
          />
          <a
            target="_blank"
            href="https://github.com/sh-web-lee"
            class="ml-5 mr-5 iconfont icongithub"
          />
          <a
            target="_blank"
            href="https://gitee.com/leefath"
            class="iconfont icongitee-fill-round"
          />
        </div>
        <!-- more -->
        <div class="scroll-down" >
          <v-icon color="#fff" @click="scrollDown" class="scroll-down-effects">
            mdi-chevron-down
          </v-icon>
        </div>
      </div>
    </div>
    <v-row class="home_cont">
      <v-col md="9" cols="12">
        <v-card class="scroll-animation mx-auto article-card" style="border-radius: 12px 8px 8px 12px" v-for="(item, index) in articleList" :key="item.id" ref="testref">
          <div :class="isRight(index)">
            <router-link :to="'/article/' + item.id">
              <v-img class="on_hover fadeInUp" :src="item.articleCover" height="100%" width="100%" ></v-img>
            </router-link>
          </div>
          <div class="article_wrapper">
            <!-- 文章标题 -->
            <div style="line-height:1.4">
              <router-link :to="'/article/' + item.id" class="article_title fadeInUp fadeDelay00">{{ item.articleTitle }}</router-link>
            </div>
            <!--  -->
            <div class="article_info fadeInUp fadeDelay01">
              <!-- 是否置顶 -->
              <span v-if="item.isTop == 1">
                <span style="color:#ff7242">
                  <i class="iconfont iconzhiding" /> 置顶
                </span>
                <span class="separator">|</span>
              </span>
              <!-- 发表时间 -->
              <v-icon size="14">mdi-calendar-month-outline</v-icon>
              {{ item.createTime.slice(0, 10) }}
              <span class="separator">|</span>
              <!-- 文章分类 -->
              <router-link :to="'/categories/' + item.categoryId">
                <v-icon size="14">mdi-inbox-full</v-icon>
                {{ item.categoryName }}
              </router-link>
              <span class="separator">|</span>
              <!-- 文章标签 -->
              <router-link style="display:inline-block" :to="'/tags/' + tag.id" class="mr-1" v-for="tag of item.tagDTOList" :key="tag.id" >
                <v-icon size="14" class="separator">mdi-tag-multiple</v-icon>{{ tag.tagName }}
              </router-link>
            </div>
            <!-- 文章内容 -->
            <div class="article_content fadeInUp fadeDelay02">{{ item.articleContent }}</div>
          </div>
        </v-card>
        <!-- 无限加载 -->
        <!-- <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more" />
        </infinite-loading> -->
      </v-col>
      <v-col md="3" cols="12" class="d-none">
        <div class="blog_wrapper scroll-animation">
          <v-card class="animate__animated animate__fadeInUp blog_card">
            <!-- 博主信息 -->
            <div class="author_wrapper">
              <!-- 头像 -->
              <v-avatar size="110">
                <img src="../../assets/image/avatar.jpg" class="author_avatar" alt="">
              </v-avatar>
              <div style="font-size: 1.375rem;" class="fadeInUp fadeDelay00">Lee</div>
              <div style="font-size: 0.875rem;" class="fadeInUp fadeDelay01">真正的大师，永远怀着一颗学徒的心</div>
            </div>
            <!-- 导航标签 -->
            <div class="blog_info_wrapper">
              <div class="blog_info_data fadeInUp fadeDelay02">
                <router-link to="/archives">
                  <div style="font-size: 0.875rem">文章</div>
                  <div style="font-size: 1.25rem">8</div>
                </router-link>
              </div>
              <div class="blog-info-data fadeInUp fadeDelay03">
                <router-link to="/categories">
                  <div style="font-size: 0.875rem">分类</div>
                  <div style="font-size: 1.25rem">10</div>
                </router-link>
              </div>
              <div class="blog-info-data fadeInUp fadeDelay04">
                <router-link to="/tags">
                  <div style="font-size: 0.875rem">标签</div>
                  <div style="font-size: 1.25rem">11</div>
                </router-link>
              </div>
            </div>
            <!-- 加入书签 -->
            <a class="collection_btn fadeInUp fadeDelay05" @click="tip = true">
              <v-icon color="#fff" size="18" class="mr-1">mdi-bookmark</v-icon>
              加入书签
            </a>
            <!-- 跳转链接 -->
            <div class="social_wrapper">
              <a
                class="iconfont iconqq fadeInUp fadeDelay06"
                target="_blank"
                href="http://wpa.qq.com/msgrd?v=3&uin=1986466043&site=qq&menu=yes"
              />
              <a
                target="_blank"
                href="https://github.com/sh-web-lee"
                class="ml-5 mr-5 iconfont icongithub fadeInUp fadeDelay07"
              />
              <a
                target="_blank"
                href="https://gitee.com/leefath"
                class="iconfont icongitee-fill-round fadeInUp fadeDelay08"
              />
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- 提示消息 -->
    <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000" class="tips">
      按CTRL+D 键将本页加入书签
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import EasyTyper from 'easy-typer-js'
import { getAllarticles } from '../../api/getArticles'
import '../../assets/css/animation.scss'
import { handleScroll } from '@/utils/animation'
export default {
  name: 'Home',
  data () {
    return {
      show: false,
      tip: false,
      articleList: [],
      obj: {
        output: '',
        isEnd: false,
        speed: 200,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true
      }
    }
  },
  async created () {
    this.init()
    // 异步调用接口 获取文章
    try {
      const result = await getAllarticles()
      this.articleList = result
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
    window.addEventListener('scroll', handleScroll)
    console.log(
      '%clee`s blog%c',
      'padding: 4px 18px;' +
      'background: linear-gradient(45deg, #FFCF61 0%, #AD34D8 30% , #111EC5 60%, #FFCF61);' +
      'border-radius: 10px;' +
      'font-size: 28px;' +
      'font-weight: 800;' +
      'color: #fff;' +
      '',
      'margin-left: 16px;'
    )
  },
  methods: {
    // 初始化 一言打字机
    init () {
      fetch('https://v1.hitokoto.cn?c=i')
        .then(res => {
          return res.json()
        })
        .then(({ hitokoto }) => {
          this.initTyped(hitokoto)
        })
        .catch(err => {
          console.log(err)
        })
    },
    initTyped (input, fn, hooks) {
      const obj = this.obj
      // eslint-disable-next-line no-unused-vars
      const typed = new EasyTyper(obj, input, fn, hooks)
    },
    // 向下翻页
    scrollDown () {
      window.scrollTo({
        behavior: 'smooth',
        top: document.documentElement.clientHeight
      })
    },
    infiniteHandler ($state) {
      const md = require('markdown-it')()
      this.axios
        .get('/api/articles', {
          params: {
            current: this.current
          }
        })
        .then(({ data }) => {
          if (data.data.length) {
            // 去除markdown标签
            data.data.forEach(item => {
              item.articleContent = md
                .render(item.articleContent)
                .replace(/<\/?[^>]*>/g, '')
                .replace(/[|]*\n/, '')
                .replace(/&npsp;/gi, '')
            })
            this.articleList.push(...data.data)
            this.current++
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  },
  computed: {
    // 文章 内容和图片一左一右交叉排列
    isRight () {
      return function (index) {
        if (index % 2 === 0) {
          return 'article-cover left-radius'
        }
        return 'article-cover right-radius'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.home_banner {
  height: 100vh;
  background: url("../../assets/image/home-banner.jpg") center center / cover no-repeat;
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
      animation: blink .8s infinite;
    }
  }
}
.scroll-down {
  position: absolute;
  width: 100%;
  bottom: 50px;
}
.scroll-down i {
  font-size: 2rem;
}
.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
.article_wrapper {
  font-size: 14px;
}
.article_content {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
.blog_wrapper {
  margin-top: 20px;
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
  padding: .875rem 0;
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
  content: "";
  background-color: #ff7242;
  z-index: -1;
  transition: all .5s ease-out;
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
.social_wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.social_wrapper a {
  font-size: 26px;
}
@media (min-width: 760px) {
  .v-application .d-none {
    display: block !important;
  }
  .article-card {
    display: flex;
    align-items: center;
    height: 280px;
    width: 100%;
    margin-top: 20px;
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
</style>
