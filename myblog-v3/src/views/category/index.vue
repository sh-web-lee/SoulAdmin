<script lang="ts" setup>
import { useLoading } from '@sa/hooks';
import { fetchCategories } from '@/service/api';

const { loading, startLoading, endLoading } = useLoading();

interface Category extends Api.CategoryManage.Category {
  fontSize: number;
  fontColor: string;
}
const categoryList = ref<Category[]>([]);

function randomFontSize() {
  return Math.random() * 1.6 + 0.6;
}

function randomFontColor() {
  return `rgb(${Math.random() * 180 + 30},${Math.random() * 180 + 30},${Math.random() * 180 + 30})`;
}

async function getData() {
  const { data } = await fetchCategories();
  const res = data?.items || [];
  categoryList.value = res.map(item => {
    return {
      ...item,
      fontSize: randomFontSize(),
      fontColor: randomFontColor()
    };
  });
}

async function init() {
  startLoading();
  await getData();
  endLoading();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="">
    <div class="page-header">
      <div class="route-font">
        <span>分类</span>
      </div>
    </div>
    <div class="category center_box">
      <ElCard class="category-card">
        <div class="category-total flex-center">
          分类 -
          <GsapCount :value="categoryList.length" />
        </div>
        <ElRow v-if="loading">
          <ElSkeleton v-if="loading" class="category-item" :loading="loading" :rows="1" animated />
        </ElRow>
        <ElRow v-else>
          <ElCol :span="24" class="category-item">
            <RouterLink
              v-for="(item, i) in categoryList"
              :key="i"
              :style="{ fontSize: item.fontSize + 'rem', color: item.fontColor }"
              class="category-item__label"
              :to="`/article/${item.id}`"
            >
              {{ item.name }}
            </RouterLink>
          </ElCol>
        </ElRow>
      </ElCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  background: url('../../assets/image/categories-banner.jpg') 50% / cover no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 26rem;

  .route-font {
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 2.4;
    text-align: center;
    color: #fff;
    z-index: 999;
    cursor: pointer;
    transition: all 0.3s;
  }
}
.category {
  &-card {
    padding: 40px 30px;
  }

  &-total {
    font-size: 1.4rem;
    line-height: 2;
    font-weight: 600;
    color: var(--font-color);
  }

  &-item {
    padding: 10px;
    box-sizing: border-box;
    text-align: center;

    &__label {
      display: inline-block;
      font-weight: bold;
      padding: 0 0.8rem;
    }
  }
}

@media (max-width: 759px) {
  .center_box {
    padding: 1.6rem 10px;
    max-width: 1000px;
    margin: 0 auto;
    min-height: calc(100vh - 35rem);
  }
}

@media (min-width: 760px) {
  .center_box {
    padding: 2.8rem 10px;
    max-width: 1000px;
    margin: 0 auto;
    min-height: calc(100vh - 35rem);
  }
}

:deep(.el-card) {
  border: none !important;
}
</style>
