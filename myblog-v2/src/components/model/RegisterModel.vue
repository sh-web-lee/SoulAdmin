<template>
  <v-row justify="center">
    <v-dialog light v-model="registerFlag" :fullscreen="false" persistent max-width="460px" >
      <v-card class="loginForm">
        <v-card-title class="card_head">
          <span class="text-h5">Create an account</span>
          <v-icon class="" @click="registerFlag = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 邮箱和密码 -->
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12" class="code_area">
                <div class="code_input">
                    <v-text-field label="Code*" v-model="code" required></v-text-field>
                </div>
                <div class="code_btn">
                    <v-btn text depressed bottom>Send</v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" v-model="password" required :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'"></v-text-field>
              </v-col>
              <!-- 注册按钮 -->
              <v-col cols="12">
                <v-btn elevation="1" block color="pink" @click="register()">CREATE</v-btn>
              </v-col>
              <!-- 跳转登录框 -->
              <v-col cols="12" class="additional_act">
                Have one account ?<span @click="openLogin"> Sign in Now</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { registerUser } from '../../api/user/register'
export default {
  data () {
    return {
      show: false,
      email: '',
      password: '',
      code: ''
    }
  },
  computed: {
    registerFlag: {
      set (value) {
        this.$store.state.registerFlag = value
      },
      get () {
        return this.$store.state.registerFlag
      }
    },
    isMobile () {
      const clientWidth = document.documentElement.clientWidth
      if (clientWidth > 960) {
        return false
      }
      return true
    }
  },
  methods: {
    openLogin () {
      this.$store.state.loginFlag = true
      this.$store.state.registerFlag = false
    },
    async register () {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.email)) {
        // email err code
      }
      if (this.code.trim().length !== 6) {
        // The captcha must be six digits
      }
      if (this.password.trim().length < 6) {
        // password must be more than six digits
      }
      const userMes = {
        username: this.email,
        password: this.password,
        code: this.code
      }
      const res = await registerUser(userMes)
      console.log(res)
    }
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
.code_area {
    display: flex;
    justify-content: space-between;
}
.code_input {
    width: 72%;
}
.code_btn {
    padding-top: 12px;
}
</style>
