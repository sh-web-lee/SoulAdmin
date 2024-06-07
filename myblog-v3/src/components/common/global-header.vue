<script lang="ts" setup>
import { Moon, Sunrise } from '@element-plus/icons-vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTheme } from '@souljs/theme-crazing-js';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store';

const { setTheme } = useTheme();
const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);
const currentTheme = ref(false);

const headerClass = ref('nav');

function scroll() {
  const scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
  headerClass.value = scrollTop > 60 ? 'nav-fixed' : 'nav';
}
function openSearch() {}

function handleChange(e: Event) {
  setTheme(e);
  themeStore.toggleThemeScheme();
}

onMounted(() => {
  window.addEventListener('scroll', scroll);
  currentTheme.value = darkMode.value;
});
</script>

<template>
  <div class="header order-1" :class="headerClass">
    <div class="header__content">
      <div class="d-md-block nav-container wh-full">
        <div class="blog-title float-left">
          <RouterLink class="" to="/">lijianyang</RouterLink>
        </div>
        <div class="nav-title float-right">
          <div class="menus-btn">
            <a class="cursor-pointer" @click="openSearch">
              <i class="iconfont icon-nav-search" />
              搜索
            </a>
          </div>
          <div class="menus-item">
            <RouterLink to="/">
              <i class="iconfont icon-home" />
              首页
            </RouterLink>
          </div>
          <div class="menus-item">
            <RouterLink to="/archives">
              <i class="iconfont icon-icon" />
              归档
            </RouterLink>
          </div>
          <div class="menus-item">
            <RouterLink to="/category">
              <i class="iconfont icon-sort" />
              分类
            </RouterLink>
          </div>
          <div class="menus-item">
            <RouterLink to="/tag">
              <i class="iconfont icon-menu" />
              标签
            </RouterLink>
          </div>
          <div class="menus-item">
            <RouterLink to="/message">
              <i class="iconfont icon-liuyan" />
              留言
            </RouterLink>
          </div>
          <!--
   <div class="user-btn">
            <a v-if="!$store.state.avatar" @click="openLogin">
              <i class="iconfont icondenglu" />
              登录
            </a>
            <template v-else>
              <img class="user-avatar" :src="$store.state.avatar" height="30" width="30" />
              <ul class="user-submenu">
                <li>
                  <RouterLink to="/user">
                    <i class="iconfont icongerenzhongxin" />
                    个人中心
                  </RouterLink>
                </li>
                <li>
                  <a @click="logout">
                    <i class="iconfont icontuichu" />
                    退出
                  </a>
                </li>
              </ul>
            </template>
          </div> 
  -->
          <ElSwitch
            v-model="currentTheme"
            class="ml-3.5"
            size="default"
            :active-icon="Sunrise"
            inline-prompt
            :inactive-icon="Moon"
            @click="handleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2001;
  transform: translateY(0px);
  transition: all 0.3s;
}
.header__content {
  height: 60px;
}

.nav {
  background: rgba(0, 0, 0, 0) !important;
}
.nav a {
  color: #eee !important;
}

.menus-btn a,
.menus-item a {
  transition: all 0.2s;
}
.menus-item a:hover:after {
  width: 100%;
}
.menus-item a:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: -1;
  width: 0;
  height: 3px;
  background-color: #80c8f8;
  content: '';
  transition: all 0.3s ease-in-out;
}

.blog-title,
.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-btn,
.menus-btn,
.menus-item {
  position: relative;
  display: inline-block;
  margin: 0 0 0 0.875rem;
}

.blog-title a {
  font-size: 18px;
  font-weight: 700;
}

.nav .menus-item a {
  text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
}
.nav .blog-title a {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
}
.nav-fixed {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
}
.dark .nav-fixed {
  background: rgba(18, 18, 18, 0.8) !important;
}

.nav-fixed a {
  color: #4c4948 !important;
}
.dark .nav-fixed a {
  color: #ffffffcc !important;
}

@media (min-width: 760px) {
  .header__content {
    padding: 10px 36px;
  }

  .nav-container {
    display: block !important;
  }
}
@media (max-width: 759px) {
  .header__content {
    padding: 10px 16px;
  }

  .nav-container {
    display: none !important;
  }
}
</style>
