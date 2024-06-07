<template>
  <v-app>
    <!-- 导航栏 -->
    <NavBar></NavBar>
    <!-- 内容 -->
    <v-main :style="{padding: 0}">
      <router-view></router-view>
    </v-main>
    <!-- 搜索框 -->
    <SearchModel></SearchModel>
    <!-- 登录框 -->
    <LoginModel></LoginModel>
    <!-- 注册框 -->
    <RegisterModel></RegisterModel>
    <!-- 忘记密码 -->
    <ForgetModel></ForgetModel>
    <!-- 消息提示框 -->
    <SnackerBar></SnackerBar>
    <!-- 绑定邮箱框 -->
    <EmailModel></EmailModel>
    <!-- 侧边导航栏 -->
    <SideNavBar></SideNavBar>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    <!-- 备案信息 -->
    <footer>
      <div class="beian">
        <p class="beian-time">
          ©2021 - {{ new Date().getFullYear() }} By lee
        </p>
        <p class="beian-context">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">蜀ICP备2021021318号-1</a>
        </p>
      </div>
    </footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import SearchModel from './components/model/SearchModel'
import LoginModel from './components/model/LoginModel'
import RegisterModel from './components/model/RegisterModel'
import ForgetModel from './components/model/ForgetModel'
import EmailModel from './components/model/EmailModel.vue'
import SnackerBar from './components/toast/Toast'
import SideNavBar from './components/layout/SideNavBar'
import BackTop from './components/BackTop'
export default {
  name: 'App',
  components: {
    NavBar,
    SearchModel,
    LoginModel,
    RegisterModel,
    ForgetModel,
    EmailModel,
    SnackerBar,
    SideNavBar,
    BackTop
  },
  data: () => ({
    //
  })
}
</script>
<style lang="scss" scoped>
  .beian {
    line-height: 2;
    color: #eee;
    font-size: 14px;
    background: linear-gradient(-45deg,#ee7752,#ce3e75,#23a6d5,#23d5ab);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    text-align: center;
    padding: 40px 20px;
    p {
      margin: 0 !important;
    }
    a {
      font-size: 1.5rem;
      color: #eee !important;
    }
  }
</style>
