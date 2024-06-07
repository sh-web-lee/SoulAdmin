<template>
  <v-row justify="center">
    <v-dialog v-model="loginFlag" :fullscreen="false" persistent max-width="460px">
      <v-card class="loginForm">
        <v-card-title class="card_head">
          <span class="text-h5">Sign in to Blog</span>
          <v-icon class="" @click="loginFlag = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 邮箱和密码 -->
              <v-col cols="12">
                <v-text-field label="Email*" @keyup.enter="login" clearable v-model="username" placeholder="enter your email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" @keyup.enter="login"  required v-model="password" placeholder="enter your password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'"></v-text-field>
              </v-col>
              <!-- 登录按钮 -->
              <v-col cols="12">
                <v-btn elevation="1" block color="success" @click="login">SIGN IN</v-btn>
              </v-col>
              <!-- 注册和忘记密码操作区 -->
              <v-col cols="12" class="additional_act">
                <span @click="openRegister">Create an account</span>
                <span @click="openForget" class="float-right">Forgot password?</span>
              </v-col>
              <v-col cols="12">
                <div class="social-login-title">Social account</div>
              </v-col>
              <v-col>
                <div class="social-login-wrapper">
                  <!-- 微博登录 -->
                  <a class="mr-3 iconfont iconweibo" style="color:#e05244" @click="weiboLogin" />
                  <!-- qq登录 -->
                  <a class="iconfont iconqq" style="color:#00AAEE" @click="qqLogin" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { handlerLogin } from '@/api/user/login'
export default {
  data () {
    return {
      show: false,
      username: '',
      password: ''
    }
  },
  computed: {
    loginFlag: {
      set (value) {
        this.$store.state.loginFlag = value
      },
      get () {
        return this.$store.state.loginFlag
      }
    }
  },
  methods: {
    openRegister () {
      this.$store.state.loginFlag = false
      this.$store.state.registerFlag = true
    },
    openForget () {
      this.$store.state.loginFlag = false
      this.$store.state.forgetFlag = true
    },
    login () {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      // 验证邮箱格式
      if (!reg.test(this.username)) {
        this.$store.state.snackbar = {
          status: true,
          color: '#F56C6C',
          mes: 'Email error, Please enter correct Email',
          icon: 'iconfont iconcuowu'
        }
        return false
      }
      // 判断密码
      if (this.password.trim().length === 0) {
        this.$store.state.snackbar = {
          status: true,
          color: '#F56C6C',
          mes: 'Password error, Please enter correct Password',
          icon: 'iconfont iconcuowu'
        }
        return false
      }
      this.$store.state.snackbar = {
        status: true,
        color: '#52C41A',
        mes: 'Success',
        icon: 'iconfont iconchenggong'
      }
      const userMes = {
        username: this.username,
        password: this.password
      }
      handlerLogin(userMes)
      this.$store.state.loginFlag = false
    },
    weiboLogin () {},
    qqLogin () {}
  }
}
</script>
<style scoped>
.card_head {
  justify-content: space-between;
}
.additional_act span {
  cursor: pointer;
}
.additional_act span:hover {
  color: #49b1f5;
}
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}
.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}
.social-login-wrapper a {
  text-decoration: none;
}
</style>
