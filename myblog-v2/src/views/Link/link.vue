<template>
  <div class="link">
    <div class="link_banner">
        <h1 class="banner_title animate__animated animate__zoomIn">友情链接</h1>
    </div>
    <v-card class="blog-container" elevation="2" >
        <div class="link-title">
            <v-icon color="blue">mdi-link-variant</v-icon> 大佬链接
        </div>
        <v-row class="link_container">
            <v-col class="link_wrapper" md="4" :style="randomStyle()" cols="12" @mouseenter="hover($event)" @mouseleave="leave($event)">
                <a href="https://yanyi24.cn/" target="_blank">
                    <v-avatar size="65" class="link_avatar">
                        <img src="https://tse3-mm.cn.bing.net/th/id/OIP.N9gKzFp25pPG7h7sIVznSwHaHa?pid=ImgDet&rs=1" alt="">
                    </v-avatar>
                    <div style="width:100%;z-index:10;">
                        <div class="link_name">Yanyi</div>
                        <div class="link_intro">Yanyi的个人博客</div>
                    </div>
                </a>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Link',
  data () {
    return {
    }
  },
  methods: {
    hover ($event) {
      $event.currentTarget.className = 'link_wrapper col-md-4 col-12 active'
    },
    leave ($event) {
      $event.currentTarget.className = 'link_wrapper col-md-4 col-12'
    },
    randomStyle () {
      const R = Math.floor(Math.random() * 255)
      const G = Math.floor(Math.random() * 255)
      const B = Math.floor(Math.random() * 255)
      return {
        background: 'rgba(' + R + ',' + G + ',' + B + ')'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link_container {
    margin: 10px 10px 0;
}
.link_wrapper {
    position: relative;
    transition: all .3s;
    border-radius: 8px;
}
.link_wrapper a {
    color: #333;
    text-decoration: none;
    display: flex;
    height: 100%;
    width: 100%;
}
.link_wrapper:hover {
    box-shadow: 0 2px 20px #49b1f5;
}
.link_wrapper:hover:before {
    transform: scale(1);
}
.link_wrapper:before {
    position: absolute;
    border-radius: 8px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #49b1f5 !important;
    content: "";
    transition: all .5s ease-out;
    transform: scale(0);
}
.link_wrapper:hover a {
    color: #fff;
}
.link_wrapper:hover .link_intro {
    color: #fff;
}
.link_avatar {
    margin-top: 5px;
    margin-left: 10px;
    transition: all .5s;
}
.link_name {
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    z-index: 1000;
}
.link_intro {
    padding: 16px 10px;
    text-align: center;
    height: 50px;
    font-size: 13px;
    color: #1f2d3d;
    width: 100%;
}
@media (min-width: 760px) {
    .link {
        overflow: hidden;
    }
    .link_banner {
        height: 400px;
        background: url('../../assets/image/link-banner.jpg') 50% / cover no-repeat;
        background-color: #49b1f5;
        animation: header-effect 1s;
    }
}
@media (max-width: 759px) {
    .link_container {
        margin: 10px auto 0;
    }
    .link_banner {
        height: 280px;
        background: url('../../assets/image/link-banner.jpg') 50% / cover no-repeat;
    }
}
</style>
