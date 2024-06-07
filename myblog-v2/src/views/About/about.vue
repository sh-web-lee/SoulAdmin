<template>
  <div class="about">
      <div class="about_banner banner">
        <h1 class="banner_title">About</h1>
      </div>
      <!-- 基本资料 -->
      <v-card class="about-container">
        <div class="my-wrapper">
            <v-avatar size="110" class="avatar">
                <img class="author-avatar" src="@/assets/image/avatar.jpg" />
            </v-avatar>
        </div>
        <div class="basic-profile markdown-body">
          <h2 class="title">🍀基本资料</h2>
          <div class="basic-profile-content">
            <v-row>
              <v-col md="5" cols="10">
                <div class="profile-item">
                  <span class="profile-item-name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
                  <span class="profile-item-detail">lee_malachi</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">毕业院校:</span>
                  <span class="profile-item-detail">攀枝花学院</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业:</span>
                  <span class="profile-item-detail">信息与计算科学</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">工作岗位:</span>
                  <span class="profile-item-detail">web前端开发</span>
                </div>
              </v-col>
              <v-col md="5" cols="10">
                <div class="profile-item">
                  <span class="profile-item-name">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</span>
                  <span class="profile-item-detail">24</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历:</span>
                  <span class="profile-item-detail">本科</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
                  <span class="profile-item-detail">13698217908</span>
                </div>
                <div class="profile-item">
                  <span class="profile-item-name">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>
                  <span class="profile-item-detail">lee_malachi@163.com</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
      <!-- 项目经历 -->
      <v-card class="about-container">
        <div class="pro-experience markdown-body">
          <h2 class="title">📁项目经历</h2>
          <template>
            <v-timeline>
              <!--  -->
              <v-timeline-item color="cyan lighten-2">
                <template v-slot:opposite>
                  <span class="cyan--text font-weight-bold headline">2020.11.20-2021.3.1</span>
                  <!-- <v-img class="on_hover" src="../../assets/image/about-banner.jpg" height="100%" width="100%" ></v-img> -->
                </template>
                <v-card class="pro-card elevation-1" @mouseenter="enter($event)" @mouseleave="leave($event)">
                  <v-card-title class="text-h5 cyan--text">
                    粤航通 原名：启航者（实习）
                  </v-card-title>
                  <v-card-text class="pro-introduce cyan--text">
                    航道通一体化服务平台应用系统开发基于南海航海保障中心E航海服务作为粤航通APP船舶动态识别后台，以启航者APP为蓝本，综合利用航道服务资源信息，升级航道通APP，实现北江智慧船闸智能报闸，实现辅助驾引、过闸服务、信息查询等服务；用jQuery和Layui框架开发。
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <!--  -->
              <v-timeline-item color="pink lighten-2">
                <template v-slot:opposite>
                  <span class="pink--text font-weight-bold headline">2021.1.1-2021.4.1</span>
                </template>
                <v-card class="pro-card elevation-1" @mouseenter="enter($event)" @mouseleave="leave($event)">
                  <v-card-title class="text-h5 pink--text">
                    广东省航道信息服务平台（实习）
                  </v-card-title>
                  <v-card-text class="pro-introduce pink--text">
                    信息服务平台又称对外服务平台，针对注册用户查看海上交通、天气、船舶、航行规则等实时情况。便于海上作业。
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <!--  -->
              <v-timeline-item color="amber lighten-2">
                <template v-slot:opposite>
                  <span class="amber--text font-weight-bold headline">2021.4.20-2021.12.30</span>
                </template>
                <v-card class="pro-card elevation-1" @mouseenter="enter($event)" @mouseleave="leave($event)">
                  <v-card-title class="text-h5 amber--text">
                    Advanced SystemCare产品网站
                  </v-card-title>
                  <v-card-text class="pro-introduce amber--text">
                    该网站为公司电脑清理加速等一系列软件（Advanced SystemCare、Driver Booster、Iobit Malware Fighter等）的促销官网。引导用户进入网站了解公司产品以及及时更新产品，下载使用。使用css添加特效，js处理动态逻辑，与PHP后端联合开发，实现网站功能。
                  </v-card-text>
                  <v-card-text>
                    <a class="pro-link" target="black" href="https://purchase.iobit.com/en/asc/index.php">直达链接</a>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <!--  -->
              <v-timeline-item color="green lighten-2">
                <template v-slot:opposite>
                  <span class="green--text font-weight-bold headline">2021.7.1-2021.12.30</span>
                </template>
                <v-card class="pro-card elevation-1" @mouseenter="enter($event)" @mouseleave="leave($event)">
                  <v-card-title class="text-h5 green--text">
                    GetInsita: Get Free Instagram Followers & Likes [100% Real]
                  </v-card-title>
                  <v-card-text class="pro-introduce green--text">
                    基于jQuery开发的PC端网站。InsA网站面向Ins用户，可通过该网站购买followers以及likes。网站使用css + js实现页面特效，完成产品需求，满足用户体验。使用媒体查询实现自适应设备。按钮添加GA，满足谷歌浏览器抓取数据的需求。使用ajax获取后台数据，与PHP后端人员紧密配合实现产品需求，前端代码使用sass编译，完成项目网站上线。
                  </v-card-text>
                  <v-card-text>
                    <a href="https://www.easygetinnta.com/" target="black">直达链接</a>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
              <!--  -->
              <v-timeline-item color="orange lighten-2">
                <template v-slot:opposite>
                  <span class="orange--text font-weight-bold headline">2021.7.1-2021.12.30</span>
                </template>
                <v-card class="pro-card elevation-1" @mouseenter="enter($event)" @mouseleave="leave($event)">
                  <v-card-title class="text-h5 orange--text">
                    Ins Followers: Get Insta Free Followers | 100% Free Real Instant
                  </v-card-title>
                  <v-card-text class="pro-introduce orange--text">
                    基于jQuery开发的PC端网站。InsC网站面向Ins用户，可通过该网站购买followers以及likes。网站使用css + js实现页面特效，完成产品需求，满足用户体验。使用媒体查询实现自适应设备。按钮添加GA，满足谷歌浏览器抓取数据的需求。使用ajax获取后台数据，与PHP后端人员紧密配合实现产品需求，前端代码使用sass编译，完成项目网站上线。
                  </v-card-text>
                  <v-card-text>
                    <a href="https://www.getinsfollowers.com" target="black">直达链接</a>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </template>
        </div>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      years: [
        {
          color: 'cyan',
          year: '1960'
        },
        {
          color: 'green',
          year: '1970'
        },
        {
          color: 'pink',
          year: '1980'
        },
        {
          color: 'amber',
          year: '1990'
        },
        {
          color: 'orange',
          year: '2000'
        }
      ]
    }
  },
  methods: {
    enter ($event) {
      $event.currentTarget.className = 'pro-card elevation-15 v-card v-sheet theme--light'
    },
    leave ($event) {
      $event.currentTarget.className = 'pro-card elevation-1 v-card v-sheet theme--light'
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .about_banner {
    background: url('../../assets/image/banner.jpg') center center / cover no-repeat;
  }
  .about-container {
    background: linear-gradient(90deg, #7c56ff 0%, #ff8192 50%, #7c56ff);
    background-size: 200% 100%;
    background-position: 200% 0%;
    animation: loading-data 5s ease-in-out infinite;
    max-width: 960px;
    margin: 50px auto;
    padding: 50px 40px;
    .title {
      font-size: 1.8rem !important;
    }
    .row {
      margin: 0;
      .profile-item {
        margin-top: 8px;
        span {
          font-size: 1.2rem;
          color: #fff;
          &.profile-item-detail {
            margin-left: 12px;
          }
        }
      }
    }
    .pro-experience {
      margin-top: 1.5rem;
      .pro-card {
        cursor: pointer;
        .pro-introduce {
          text-indent: 3.1rem;
          font-size: 1.5rem;
          line-height: 1.7rem;
        }
        .pro-link {
          font-size: 1.3rem;
        }
      }
    }
  }
  .my-wrapper {
    text-align: center;
  }
  .avatar {
      border-radius: 50%;
  }
  .author-avatar {
    transition: all 1s;
  }
  .author-avatar:hover {
    transform: scale(1.3);
    transition: all .8s ease-in-out;
  }
}
@media (max-width: 759px) {
  .about {
    .about-container {
      margin: 50px 10px;
    }
  }
}
</style>
