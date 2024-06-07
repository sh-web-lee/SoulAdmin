<template>
    <v-navigation-drawer v-model="drawer" width="250" right app overlay-opacity="0.8" >
        <!-- 博主介绍 -->
        <div class="blogger-info">
            <v-avatar size="110" style="margin-bottom:0.5rem">
                <img src="@/assets/image/avatar.jpg" />
            </v-avatar>
        </div>
        <hr />
        <!-- 页面导航 -->
        <div class="menu-container">
        <div class="menus-item">
            <router-link to="/">
            <i class="iconfont iconzhuye" /> 首页
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/archives">
            <i class="iconfont iconguidang" /> 归档
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/categories">
            <i class="iconfont iconfenlei" /> 分类
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/tags">
            <i class="iconfont iconbiaoqian" /> 标签
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/albums">
            <i class="iconfont iconhanbao" /> 相册
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/links">
            <i class="iconfont iconlianjie" /> 友链
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/about">
            <i class="iconfont iconzhifeiji" /> 关于
            </router-link>
        </div>
        <div class="menus-item">
            <router-link to="/message">
            <i class="iconfont iconpinglunzu" /> 留言
            </router-link>
        </div>
        <div class="menus-item" v-if="!this.$store.state.avatar">
            <a @click="openLogin"><i class="iconfont icondenglu" /> 登录 </a>
        </div>
        <div v-else>
            <div class="menus-item">
            <router-link to="/user">
                <i class="iconfont icongerenzhongxin" /> 个人中心
            </router-link>
            </div>
            <div class="menus-item">
            <a @click="logout"><i class="iconfont icontuichu" /> 退出</a>
            </div>
        </div>
        </div>
    </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    group: null
  }),
  computed: {
    drawer: {
      set (value) {
        this.$store.state.drawer = value
      },
      get () {
        return this.$store.state.drawer
      }
    }
  },
  methods: {
    openLogin () {
      this.$store.state.loginFlag = true
    },
    logout () {
      // 如果在个人中心则跳回上一页
      if (this.$route.path === '/user') {
        this.$router.go(-1)
      }
      this.axios.get('/api/logout').then(({ data }) => {
        if (data.flag) {
          this.$store.commit('logout')
          this.$toast({ type: 'success', message: data.message })
        } else {
          this.$toast({ type: 'error', message: data.message })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.blogger-info {
    display: flex;
    justify-content: center;
    margin: 15px 0 0;
}
.menu-container {
  padding: 0 10px 40px;
  animation: 0.8s ease 0s 1 normal none running sidebarItem;
}
.menus-item a {
  padding: 6px 30px;
  display: block;
  line-height: 2;
}
.menus-item i {
  margin-right: 2rem;
}
hr {
  border: 2px dashed #d2ebfd;
  margin: 20px 0;
}
@keyframes sidebarItem {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(0);
  }
}
@media (min-width: 760px) {
  nav {
    display: none;
  }
}
</style>
