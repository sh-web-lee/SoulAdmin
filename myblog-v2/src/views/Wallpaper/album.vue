<template>
  <div class="">
      <div class="album_banner banner">
          <h1 class="banner_title">壁纸</h1>
      </div>
    <v-card class="blog-container">
        <v-row>
            <v-col :md="6" v-for="item of photoAlbumList" :key="item.id">
                <div class="album-item">
                    <v-img class="album-cover" :src="item.albumCover" />
                    <router-link :to="'/albums/' + item.id" class="album-wrapper">
                    <div class="album-name">{{ item.albumName }}</div>
                    <div class="album-desc">{{ item.albumDesc }}</div>
                    </router-link>
                </div>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import { getAlbums } from '../../api/getWallpaper'
export default {
  name: '',
  data () {
    return {
      photoAlbumList: []
    }
  },
  async created () {
    const res = await getAlbums()
    this.photoAlbumList = res
  }
}
</script>

<style lang="scss" scoped>
.album_banner {
    background: url('../../assets/image/album-banner.jpg') center center / cover no-repeat;
}
.album-item {
    position: relative;
    cursor: pointer;
    background-color: #000;
    border-radius: .5rem;
    overflow: hidden;
    &:hover .album-name::after {
        width: 100%;
    }
    &:hover .album-desc {
        transform: translate3d(0,0,0);
        opacity: 1;
    }
    &:hover .album-cover {
        transform: translateX(15px);
        opacity: .4;
    }
}
.album-cover {
    transition: all .35s;
}
.album-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.8rem 2rem;
    color: #fff!important;
}
.album-name {
    position: relative;
    font-weight: 700;
    font-size: 1.25rem;
    overflow: hidden;
    padding: 0.7rem 0;
    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        height: 2px;
        width: 0%;
        background-color: #fff;
        transition: all .35s;
    }
}
.album-desc {
    margin: 0;
    padding: 0.4rem 0 0;
    line-height: 1.5;
    opacity: 0;
    transition: opacity .35s,transform .35s;
    transform: translate3d(100%,0,0);
}
</style>
