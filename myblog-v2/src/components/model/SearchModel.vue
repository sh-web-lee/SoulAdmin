<template>
  <div class="text-center">
    <v-dialog v-model="searchFlag" max-width="600" transition="dialog-bottom-transition" >
      <v-card>
        <!-- head -->
        <v-card-title class="text-h5 grey lighten-2 card_head">
          <span class="fl search-title">搜索</span>
          <v-icon class="fr" @click="searchFlag = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <!-- content -->
        <v-card-text>
            <!-- input -->
            <div class="search-input-wrapper">
                <v-icon>mdi-magnify</v-icon>
                <input v-model="keywords" placeholder="输入文章标题或内容..." />
            </div>
        </v-card-text>
        <!-- results -->
        <div class="search-result-wrapper">
            <hr class="divider" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keywords: ''
    }
  },
  computed: {
    searchFlag: {
      set (value) {
        this.$store.state.searchFlag = value
      },
      get () {
        return this.$store.state.searchFlag
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card_head {
    justify-content: space-between;
}
.search-title {
    color: #49b1f5;
    font-size: 1.25rem;
    line-height: 1;
}
.search-input-wrapper {
  display: flex;
  padding: 5px;
  height: 35px;
  width: 100%;
  border: 2px solid #8e8cd8;
  border-radius: 2rem;
  margin-top: 1.5rem;
}
.search-input-wrapper input {
  width: 100%;
  margin-left: 5px;
  outline: none;
}
@media (min-width: 960px) {
  .search-result-wrapper {
    padding-right: 5px;
    height: 450px;
    overflow: auto;
  }
}
@media (max-width: 959px) {
  .search-result-wrapper {
    height: 80%;
    overflow: auto;
  }
}
.divider {
  margin: 1.5rem 0;
  border: 2px dashed #d2ebfd;
}
</style>
