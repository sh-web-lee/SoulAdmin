import './assets/css/animation.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vuetify 框架
import vuetify from './plugins/vuetify'
// 弹幕插件
import { vueBaberrage } from 'vue-baberrage'
// 顶部网页加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// animate动画插件
import animated from 'animate.css'
import './assets/css/iconfont.css'
import './assets/css/index.css'
import './assets/css/markdown.css'
import './assets/css/reset.scss'
// 画布
import './utils/ribbon'
// 分享组件
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'
import InfiniteLoading from 'vue-infinite-loading'
// 查看图片
import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'

// import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(vueBaberrage)
Vue.use(animated)
Vue.use(Share)
Vue.use(InfiniteLoading)
Vue.use(VueImageSwipe)

// Vue.filter('date', function (value) {
//   return dayjs(value).format('YYYY-MM-DD')
// })
// Vue.filter('year', function (value) {
//   return dayjs(value).format('YYYY')
// })

// Vue.filter('hour', function (value) {
//   return dayjs(value).format('HH:mm:ss')
// })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 跳转404
  if (to.matched.length === 0) {
    next('/404')
    // from.name ? next({ name: from.name }) : next('/404')
  } else {
    next()
  }
  next()
})

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
  NProgress.done()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
