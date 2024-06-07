<template>
  <div class="backtop" :style="isShow">
        <div :class="'rightside-config-hide ' + isOut" @click="switchtheme()">
            <i :class="'iconfont rightside-icon ' + icon" />
        </div>
        <div class="setting-container" @click="show()">
            <i class="iconfont iconshezhi setting" />
        </div>
        <i @click="backTop" class="iconfont rightside-icon iconziyuanldpi" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: '',
      isOut: 'rightside-out',
      icon: 'iconyueliang'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 为了计算距离顶部的高度，当高度大于100显示回顶部图标，小于100则隐藏
    scrollToTop () {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.isShow = 'opacity: 1; transform: translateX(-38px);'
      } else {
        that.isShow = ''
      }
    },
    // 回到顶部
    backTop () {
      window.scrollTo({
        behavior: 'smooth',
        top: 0
      })
    },
    // 控制主题切换开关的显示与隐藏
    show () {
      const flag = this.isOut === 'rightside-out'
      this.isOut = flag ? 'rightside-in' : 'rightside-out'
    },
    // 主题切换
    switchtheme () {
      const flag = this.icon === 'iconyueliang'
      this.icon = flag ? 'icontaiyang' : 'iconyueliang'
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width:759px) {
  .backtop {
    display: none;
  }
}
@media (min-width: 760px) {
    .backtop {
      z-index: 4;
      position: fixed;
      right: -38px;
      bottom: 85px;
      transition: all 0.5s;
    }
    .rightside-icon,
    .setting-container {
      display: block;
      margin-bottom: 2px;
      width: 30px;
      height: 30px;
      background-color: #49b1f5;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }
    .setting-container i {
      display: block;
      animation: turn-round 2s linear infinite;
    }
    .rightside-config-hide {
      transform: translate(35px, 0);
    }
    .rightside-out {
      animation: rightsideOut 0.3s;
    }
    .rightside-in {
      transform: translate(0, 0) !important;
      animation: rightsideIn 0.3s;
    }
}
</style>
