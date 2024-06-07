<template>
  <div style="overflow: hidden;">
    <div class="banner">
        <h1 class="banner_title">{{ title }} - {{ banner_title }}</h1>
    </div>
    <div class="article-list-wrapper blog-container">
        <v-row>
          <v-col md="4" cols="12" v-for="item in articleList" :key="item.id">
            <v-card class="article-item-card">
              <div class="article-item-cover">
                <router-link :to="'/article/' + item.id">
                  <v-img class="on-hover" width="100%" height="100%" :src="item.articleCover" />
                </router-link>
              </div>
              <div class="article-item-info">
                <!-- 文章标题 -->
                <div>
                  <router-link :to="'/articles/' + item.id">
                    {{ item.articleTitle }}
                  </router-link>
                </div>
                <div style="margin-top:0.375rem">
                  <!-- 发表时间 -->
                  <v-icon size="20">mdi-clock-outline</v-icon>
                  {{ item.createTime.substring(0, 10) }}
                  <!-- 文章分类 -->
                  <router-link :to="'/categories/' + item.categoryId" class="float-right" >
                    <v-icon>mdi-bookmark</v-icon>{{ item.categoryName }}
                  </router-link>
                </div>
              </div>
              <!-- 分割线 -->
              <v-divider></v-divider>
              <!-- 文章标签 -->
              <div class="tag-wrapper">
                <router-link
                  :to="'/tags/' + tag.id"
                  class="tag-btn"
                  v-for="tag of item.tagDTOList"
                  :key="tag.id"
                >
                  {{ tag.tagName }}
                </router-link>
              </div>
            </v-card>
          </v-col>
        </v-row>
    </div>
  </div>
</template>

<script>
import { getCategoryArticles, getTagArticles } from '../api/getCategories'
export default {
  name: '',
  data () {
    return {
      path: '',
      title: '',
      current: 1,
      id: '',
      banner_title: '',
      articleList: []
    }
  },
  async created () {
    this.path = this.$route.path
    if (this.path.indexOf('categories') !== -1) {
      this.title = '分类'
      this.id = this.path.substring(12)
      const categoryRes = await getCategoryArticles(this.id)
      this.banner_title = categoryRes.name
      this.articleList = categoryRes.articlePreviewDTOList
    } else {
      this.title = '标签'
      this.id = this.path.substring(6)
      const tagRes = await getTagArticles(this.id, this.current)
      this.banner_title = tagRes.name
      this.articleList = tagRes.articlePreviewDTOList
    }
    document.title = this.title + ' - ' + this.banner_title
  },
  methods: {
    infiniteHandler ($state) {
      this.axios
        .get('/api/articles/condition', {
          params: {
            categoryId: this.$route.params.categoryId,
            tagId: this.$route.params.tagId,
            current: this.current
          }
        })
        .then(({ data }) => {
          if (data.data.name) {
            this.name = data.data.name
            document.title = this.title + ' - ' + this.name
          }
          if (data.data.articlePreviewDTOList.length) {
            this.current++
            this.articleList.push(...data.data.articlePreviewDTOList)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
    background: url('../assets/image/categories-banner.jpg') center center / cover no-repeat;
    background-color: #49b1f5!important;
    height: 400px;
    animation: header-effect 1s;
}
.article-list-wrapper {
  max-width: 1106px;
  margin: 0 auto !important;
  .article-item-card {
    overflow: hidden;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    .article-item-cover {
      height: 220px;
      overflow: hidden;
    }
    .article-item-info {
      line-height: 1.7;
      padding: 15px 15px 12px 18px;
      font-size: 15px;
      a {
        transition: all .3s;
      }
    }
    .tag-wrapper {
      padding: 10px 15px 10px 18px;
      a {
        color: #fff;
      }
      .tag-btn[data-v-44de4ab4] {
        display: inline-block;
        font-size: .725rem;
        line-height: 22px;
        height: 22px;
        border-radius: 10px;
        padding: 0 12px!important;
        background: linear-gradient(90deg,#bf4643 0,#6c9d8f);
        opacity: .6;
        margin-right: 0.5rem;
      }
    }
  }
}
.article-item-card:hover {
  transition: all 0.3s;
  box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
}
.article-item-card:not(:hover) {
  transition: all 0.3s;
}
.article-item-card:hover .on-hover {
  transition: all 0.6s;
  transform: scale(1.1);
}
.article-item-card:not(:hover) .on-hover {
  transition: all 0.6s;
}
@media (max-width: 768px) {
  .article-list-wrapper {
    margin: 15px 5px 20px 5px;
    padding: 36px 14px;
    animation:  main 1s;
  }
}
</style>
