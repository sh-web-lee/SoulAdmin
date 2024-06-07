<template>
  <div class="category">
      <div class="category_banner banner">
          <h1 class="banner_title">分类</h1>
      </div>
      <v-card class="category-container blog-container">
        <div class="category-title">分类 - {{ count }}</div>
        <ul class="category-list">
          <li class="category-list-item" v-for="item of categorylist" :key="item.id">
            <router-link :to="'/categories/' + item.id">
              {{ item.categoryName }}
              <span class="category-item-count">({{ item.articleCount }})</span>
            </router-link>
          </li>
        </ul>
      </v-card>
  </div>
</template>

<script>
import { getCategories } from '../../api/getCategories'
export default {
  name: 'Category',
  data () {
    return {
      count: '',
      categorylist: []
    }
  },
  async created () {
    const result = await getCategories()
    this.count = result.count
    this.categorylist = result.recordList
  }
}
</script>

<style lang="scss" scoped>
.category {
  overflow: hidden;
  .category_banner {
    background: url('../../assets/image/category-banner.jpg') 50% / cover no-repeat;
  }
}
.category-container {
  .category-title {
    text-align: center;
    font-size: 36px;
    line-height: 2;
  }
  .category-list {
    margin: 0 1.8rem;
    .category-list-item {
      padding: 8px 1.8rem 8px 0;
      &::before {
        position: relative;
        display: inline-block;
        content: "";
        left: -0.75rem;
        width: 12px;
        height: 12px;
        border: 0.2rem solid #49b1f5;
        border-radius: 50%;
        background: #fff;
        transition: all .3s;
      }
      &:hover:before {
        border: .2rem solid #ff7242;
      }
      a {
        transition: all .3s;
      }
      &:hover a {
        color: #8e8cd8;
      }
    }
  }
}
@media (max-width: 768px) {
  .category-container {
    margin: 15px 5px 20px 5px;
    padding: 36px 14px;
    animation: main 1s;
  }
}
</style>
