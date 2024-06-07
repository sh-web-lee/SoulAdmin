<template>
  <div class="tag_wrapper">
      <div class="tag_banner banner">
          <h1 class="banner_title">标签</h1>
      </div>
      <v-card class="tag_wrapper_content blog-container">
        <div class="tag-title">标签 - {{ count }}</div>
        <div class="tag-cloud">
        <router-link
          :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
          v-for="item of tagList"
          :key="item.id"
          :to="'/tags/' + item.id"
        >
          {{ item.tagName }}
        </router-link>
      </div>
      </v-card>
  </div>
</template>

<script>
import { getTags } from '../../api/getCategories'
export default {
  data () {
    return {
      count: '',
      tagList: []
    }
  },
  async created () {
    const result = await getTags()
    this.count = result.count
    this.tagList = result.recordList
  }
}
</script>

<style lang="scss" scoped>
.tag_wrapper {
  overflow: hidden;
  text-align: center;
  .tag_banner {
    background: url('../../assets/image/tag-banner.jpg') center center / cover no-repeat;
  }
  .tag_wrapper_content {
    .tag-title {
      font-size: 36px;
      line-height: 2;
    }
    .tag-cloud a {
      color: #616161;
      display: inline-block;
      text-decoration: none;
      padding: 0 8px;
      line-height: 2;
      transition: all .3s;
      &:hover {
        color: #49b1f5;
        transform: scale(1.1);
      }
    }
  }
}
</style>
