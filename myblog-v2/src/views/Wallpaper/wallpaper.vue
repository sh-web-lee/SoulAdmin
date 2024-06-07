<template>
  <div class="">
    <div class="wallpaper_banner banner">
        <h1 class="banner_title">{{ photoAlbumName }}</h1>
    </div>
    <!-- 相册列表 -->
    <v-card class="blog-container">
      <div class="photo-wrap">
        <img
          v-for="(item, index) of photoList"
          class="photo"
          :key="index"
          :src="item"
          @click="preview(index)"
        />
      </div>
      <!-- 无限加载 -->
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading>
    </v-card>
  </div>
</template>

<script>
import { getWallpaper } from '../../api/getWallpaper'
export default {
  name: '',
  data () {
    return {
      current: 1,
      size: 10,
      photoAlbumCover: '',
      photoAlbumName: '',
      photoList: []
    }
  },
  methods: {
    async infiniteHandler ($state) {
      const albumsId = this.$route.params.albumId
      const res = await getWallpaper(albumsId, this.current)
      this.photoAlbumCover = res.photoAlbumCover
      this.photoAlbumName = res.photoAlbumName
      if (res.photoList.length) {
        this.current++
        this.photoList = res.photoList
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    preview (index) {
      this.$imagePreview({
        images: this.photoList,
        index: index
      })
    }
  }
  // computed: {
  //   cover () {
  //     return (
  //       'background: url(' + this.photoAlbumCover + ') no-repeat center center / cover'
  //     )
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.wallpaper_banner {
    background: url('../../assets/image/albums-banner.jpg') center center / cover no-repeat;
}
.photo-wrap {
  display: flex;
  flex-wrap: wrap;
  .photo {
    margin: 3px;
    cursor: pointer;
    flex-grow: 1;
    object-fit: cover;
    height: 200px;
  }
}
@media (max-width: 768px) {
  .photo {
    width: 100%;
  }
}
</style>
