<template>
  <div class="">
      <div class="article_banner" :style="articleCover">
        <div class="article_info_container">
          <!-- 文章标题 -->
          <div class="article_title">{{ article.articleTitle }}</div>
          <!-- 文章信息 -->
          <div class="article_info">
              <div class="first_line">
                  <!-- 发表时间 -->
                  <span><i class="iconfont iconrili" />发表于 {{ createTime }}</span>
                  <span class="separator">|</span>
                  <!-- 发表时间 -->
                  <span><i class="iconfont icongengxinshijian" />更新于
                      <template v-if="article.updateTime">
                          {{ updateTime }}
                      </template>
                      <template v-else>
                          {{ article.createTime }}
                      </template>
                  </span>
                  <span class="separator">|</span>
                  <!-- 文章分类 -->
                  <span class="article_category">
                      <i class="iconfont iconfenlei1" />
                      <router-link :to="'/categories/' + article.categoryId">
                          {{ article.categoryName }}
                      </router-link>
                  </span>
              </div>
              <div class="second_line">
                <!-- 字数统计 -->
                <span>
                  <i class="iconfont iconzishu" />字数统计: {{ wordNum }}
                </span>
                <span class="separator">|</span>
                <!-- 阅读时长 -->
                <span>
                  <i class="iconfont iconshijian" />阅读时长: {{ readTime }}
                </span>
                <!-- 阅读量 -->
              </div>
              <div class="third_line">
                <span>
                  <i class="iconfont iconliulan" /> 阅读量: {{ article.viewsCount }}
                </span>
                <span class="separator">|</span>
                <!-- 评论量 -->
                <span>
                  <i class="iconfont iconpinglunzu1" />评论数:
                  <template v-if="count">{{ count }}</template>
                  <template v-else>0</template>
                </span>
              </div>
          </div>
        </div>
      </div>
      <!-- 文章内容 -->
      <v-row class="article_container">
        <v-col md="9" cols="12">
          <v-card class="article_wrapper">
            <!-- 文章 -->
            <article id="write" class="article_content markdown-body" v-html="article.articleContent" ref="article"></article>
            <!-- 版权声明 -->
            <div class="aritcle_copyright">
              <div>
                <span>文章作者：</span>
                <a href="/" target="_blank"> lee</a>
              </div>
              <div>
                <span>版权声明：</span>本博客所有文章除特别声明外，均采用
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" >CC BY-NC-SA 4.0</a>
                许可协议。转载请注明文章出处。
              </div>
            </div>
            <!-- 转发 -->
            <div class="article_operation">
              <div class="tag_container">
                <router-link v-for="item of article.tagDTOList" :key="item.id" :to="'/tags/' + item.id">{{ item.tagName }}</router-link>
              </div>
              <share style="margin-left:auto" :config="config" />
            </div>
            <!-- 点赞 -->
            <div class="article_reward">
              <!-- 点赞按钮 -->
              <a :class="isLike" @click="like">
                <v-icon size="14" color="#fff">mdi-thumb-up</v-icon> 点赞
                <span v-show="article.likeCount > 0">{{ article.likeCount }}</span>
              </a>
              <a class="reward_btn">
                <!-- 打赏按钮 -->
                <i class="iconfont iconerweima" /> 打赏
                <!-- 二维码 -->
                <div class="animate__animated animate__fadeInDown reward_main">
                  <ul class="reward_all">
                    <li class="reward_item">
                      <img class="reward_img" :src="require('../../assets/image/wechat.png')" />
                      <div class="reward_desc">微信</div>
                    </li>
                    <li class="reward_item">
                      <img class="reward_img" :src="require('../../assets/image/alipay.png')" />
                      <div class="reward_desc">支付宝</div>
                    </li>
                  </ul>
                </div>
              </a>
            </div>
            <!-- 跳转 -->
            <div class="pagination_post">
              <!-- 上一篇 -->
              <div :class="isFull(article.lastArticle.id)" v-if="article.lastArticle.id">
                 <router-link :to="'/article/' + article.lastArticle.id">
                  <img class="post_cover" :src="article.lastArticle.articleCover" />
                  <div class="post_info">
                    <div class="label">上一篇</div>
                    <div class="post_title">{{ article.lastArticle.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
              <!-- 下一篇 -->
              <div :class="isFull(article.nextArticle.id)" v-if="article.nextArticle.id">
                <router-link :to="'/article/' + article.nextArticle.id">
                  <img class="post_cover" :src="article.nextArticle.articleCover" />
                  <div class="post_info">
                    <div class="label">下一篇</div>
                    <div class="post_title">{{ article.nextArticle.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" cols="12" class="d-md-block d-none">
          <!-- 目录 -->
          <div class="article_directory">
            <v-card class="right_container">
              <div class="right_title">
                <i class="iconfont iconhanbao" style="font-size:16.8px" />
                <span style="margin-left:10px">目录</span>
              </div>
              <div id="toc"/>
            </v-card>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { getArticles } from '../../api/getArticles'
// 目录生成插件
import tocbot from 'tocbot'
// 文本复制插件
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      article: {
        nextArticle: {
          id: 0,
          articleCover: ''
        },
        lastArticle: {
          id: 0,
          articleCover: ''
        },
        articleRecommendList: []
      },
      imgList: [],
      createTime: '',
      updateTime: '',
      wordNum: '',
      readTime: '',
      count: 0,
      config: {
        sites: ['qzone', 'wechat', 'weibo', 'qq']
      },
      clipboard: null
    }
  },
  async created () {
    try {
    // 根据路径中携带的参数请求接口，截取路径中id参数，将拦截到的结果存入data中
      const _route = this.$route.path
      const _id = _route.slice(9)
      const res = await getArticles(_id)
      this.article = res
      // 网站标题
      document.title = res.articleTitle
      // 时间处理,发表时间，更新时间
      this.createTime = res.createTime.slice(0, 10)
      this.updateTime = res.updateTime.slice(0, 10)
      // 将markdown转化为HTML
      this.markdownToHtml(this.article)
      this.$nextTick(() => {
        // 统计字数
        this.wordNum = this.deleteHTMLTag(this.article.articleContent).length
        // 计算阅读时长
        this.readTime = Math.round(this.wordNum / 400) + '分钟'
        // 添加代码复制功能
        this.clipboard = new Clipboard('.copy_btn')
        // 文章自动生成目录
        const nodes = this.$refs.article.children
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            const reg = /^H[1-4]{1}$/
            if (reg.exec(node.tagName)) {
              node.id = i
            }
          }
        }
        tocbot.init({
          tocSelector: '#toc', // 要把目录添加元素位置，支持选择器
          contentSelector: '.article_content', // 获取html的元素
          headingSelector: 'h1, h2, h3', // 要显示的id的目录
          hasInnerContainers: true,
          onClick: function (e) {
            e.preventDefault()
          }
        })
        // 图片预览功能
        const imgList = this.$refs.article.getElementsByTagName('img')
        const that = this
        for (var i = 0; i < imgList.length; i++) {
          this.imgList.push(imgList[i].currentSrc)
          imgList[i].addEventListener("'click", function (e) {
            that.previewImg(e.toElement.src)
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    previewImg (img) {
      this.$imagePreview({
        images: this.imgList,
        index: this.imgList.indexOf(img)
      })
    },
    deleteHTMLTag (content) {
      return content
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '')
    },
    markdownToHtml (article) {
      const MarkdownIt = require('markdown-it')
      const hljs = require('highlight.js')
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          // 当前时间加随机数生成唯一的id标识
          var d = new Date().getTime()
          if (
            window.performance &&
            typeof window.performance.now === 'function'
          ) {
            d += performance.now()
          }
          const codeIndex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
              var r = (d + Math.random() * 16) % 16 | 0
              d = Math.floor(d / 16)
              return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
            }
          )
          // 复制功能主要使用的是 clipboard.js
          let html = `<button class="_ iconfont iconfuzhi" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`
          const linesLength = str.split(/\n/).length - 1
          // 生成行号
          let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
          for (let index = 0; index < linesLength; index++) {
            linesNum = linesNum + '<span></span>'
          }
          linesNum += '</span>'
          if (lang && hljs.getLanguage(lang)) {
            // highlight.js 高亮代码
            const preCode = hljs.highlight(lang, str, true).value
            html = html + preCode
            if (linesLength) {
              html += '<b class="name">' + lang + '</b>'
            }
            // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              '</textarea>'
            )}</textarea>`
          }
        }
      })
      // 将markdown替换为html标签
      article.articleContent = md.render(article.articleContent)
      this.article = article
    },
    // 点赞功能
    like () {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true
        return false
      }
      // 发送请求
      const param = new URLSearchParams()
      param.append('articleId', this.article.id)
      this.axios.post('/api/articles/like', param).then(({ data }) => {
        if (data.flag) {
          // 判断是否点赞
          if (this.$store.state.articleLikeSet.indexOf(this.article.id) !== -1) {
            this.$set(this.article, 'likeCount', this.article.likeCount - 1)
          } else {
            this.$set(this.article, 'likeCount', this.article.likeCount + 1)
          }
          this.$store.commit('articleLike', this.article.id)
        }
      })
    }
  },
  computed: {
    articleCover () {
      return ('background: url(' + this.article.articleCover + ') center center / cover no-repeat')
    },
    isLike () {
      // var articleLikeSet = this.$store.state.articleLikeSet
      // return articleLikeSet.indexOf(this.article.id) !== -1 ? 'like-btn-active' : 'like-btn'
      return 'like_btn'
    },
    isFull () {
      return function (id) {
        return id ? 'post full' : 'post'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article_reward .reward_btn {
    position: relative;
    display: inline-block;
    width: 100px;
    background-color: #49b1f5;
    margin: 0 1rem;
    color: #fff !important;
    text-align: center;
    line-height: 36px;
    font-size: .75rem;
}
.article_reward .reward_btn:hover .reward_main {
  display: block;
}
.tag_container a {
  margin: 0.5rem .5rem .5rem 0;
  padding: 0 .75rem;
  border: 1px solid #49b1f5;
  color: #49b1f5 !important;
  border-radius: 1rem;
  font-size: 12px;
  line-height: 2;
  display: inline-block;
  width: fit-content;
}
.tag_container a:hover {
  background-color: #49b1f5;
  color: #fff !important;
  transition: all .5s;
}
.article_operation {
  display: flex;
  align-items: center;
}
.article_reward {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.like_btn {
  display: inline-block;
  width: 100px;
  background: #969696;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}
.like_btn_active {
  display: inline-block;
  width: 100px;
  background-color: #ec7259;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: .875rem;
}
.reward_item {
  display: inline-block;
  padding: 0 8px;
  list-style-type: none;
}
.reward_all {
  display: inline-block;
  margin: 0 0 0 -110px;
  padding: 20px 10px 8px !important;
  width: 320px;
  border-radius: 4px;
  background: #f5f5f5;
}
.reward_img {
  width: 130px;
  height: 130px;
  display: block;
}
.pagination_post {
  display: flex;
}
.full {
  width: 100%;
}
.post {
  position: relative;
  height: 150px;
  overflow: hidden;
}
.post:hover .post_cover {
  opacity: 0.8;
  transform: scale(1.1);
}
.post a {
  position: relative;
  display: block;
  overflow: hidden;
  height: 150px;
}
.post .post_cover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: .4;
  transition: all .6s;
  -o-object-fit: cover;
  object-fit: cover;
}
.post_info {
  position: absolute;
  top: 50%;
  padding: 20px 40px;
  width: 100%;
  transform: translateY(-50%);
  line-height: 2;
  font-size: 14px;
  text-align: center;
}
.post_title {
  font-weight: 500;
  color: #fff;
}
.label {
  font-size: 90%;
  color: #eee;
}
.article_info {
  span i {
    margin-right: 5px;
  }
}
@media (min-width: 760px) {
  .article_banner {
      position: absolute;
      background-color: #49b1f5;
      top: -60px;
      left: 0;
      right: 0;
      height: 400px;
      -webkit-animation: header-effect 1s;
      animation: header-effect 1s;
  }
  .article_banner::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(0,0,0,.5);
  }
  .article_info_container {
      position: absolute;
      bottom: 6.25rem;
      padding: 0 8%;
      width: 100%;
      text-align: center;
      color: #eee !important;
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
    margin: 372.5px auto 40px auto!important;
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
    content: "";
  }
  .aritcle_copyright:after {
    position: absolute;
    top: 0.95rem;
    right: 0.95rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5em;
    background: #fff;
    content: "";
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
    content: "";
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
    content: "";
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
.pagination_post {
  margin-top: 40px;
  background-color: #000;
  overflow: hidden;
  width: 100%;
}
@media (max-width: 759px) {
  .article_banner {
    height: 360px;
    position: relative;
  }
  .article_banner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0,0,0,.5);
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
    margin-bottom: .4rem;
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
    content: "";
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
</style>
