<template>
  <div>
    <!-- banner -->
    <div class="archive_banner">
        <h1 class="banner_title animate__animated animate__rubberBand">File</h1>
    </div>
    <v-card class="blog-container">
        <timeline>
            <timeline-title>共计{{ count }}篇文章</timeline-title>
            <timeline-item bg-color="#9dd8e0" v-for="item in archiveList" :key="item.id">
                <!-- 日期 -->
                <span class="time">{{ item.createTime.slice(0, 10) }}</span>
                <!-- 文章标题 -->
                <router-link class="artilce_title" :to="'/article/' + item.id" style="color:#666;text-decoration: none">{{ item.articleTitle }}</router-link>
                <!-- <span class="title" style="color: #666; text-decoration: none;">{{ item.articleTitle }}</span> -->
            </timeline-item>
        </timeline>
        <!-- 分页按钮 -->
        <v-pagination
            color="#00C4B6"
            v-model="current"
            :length="Math.ceil(count / 10)"
            total-visible="7"
        />
    </v-card>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import { getArchives } from '../../api/getArchives'
export default {
  name: 'Archive',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data () {
    return {
      current: 1,
      count: '',
      archiveList: []
    }
  },
  async created () {
    try {
      const result = await getArchives()
      this.archiveList = result.recordList
      this.count = result.count
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.archive_banner {
    background: url('../../assets/image/archive-banner.jpg') center center / cover no-repeat;
    background-color: #49b1f5;
    min-height: 400px;
    overflow: hidden;
    animation: header-effect 1s;
}
.banner_title {
  font-size: 2.5rem;
  text-align: center;
  color: #eee;
}
.time {
    font-size: .75rem;
    color: #555;
    margin-right: 1rem;
}
.title {
    cursor: pointer;
}
</style>
