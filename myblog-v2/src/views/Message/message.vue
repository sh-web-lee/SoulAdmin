<template>
  <div class="message">
      <div class="message-banner">
        <!-- 弹幕输入 -->
        <div class="message-container">
            <h1 class="message-title">留言板</h1>
            <div class="message-input-wrapper">
                <input
                  type="text"
                  v-model="messageContent"
                  @click="show = true"
                  @keyup.enter="addToList"
                  placeholder="说点什么吧"
                >
                <button
                  class="ml-3 animated bounceInLeft"
                  @click="addToList"
                  v-show="show"
                >
                  发送
                </button>
            </div>
        </div>
        <!-- 弹幕墙 -->
        <div class="barrage-container">
          <vue-baberrage :barrageList="barrageList">
            <template v-slot:default="slotProps">
              <span class="barrage-items">
                <img
                  :src="slotProps.item.avatar"
                  width="30"
                  height="30"
                  style="border-radius:50%"
                />
                <span class="ml-2">{{ slotProps.item.nickname }} :</span>
                <span class="ml-2">{{ slotProps.item.messageContent }}</span>
              </span>
            </template>
          </vue-baberrage>
      </div>
      </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
import { addBarrage, getBarrage } from '../../api/barrage'
export default {
  name: 'Message',
  data () {
    return {
      show: false,
      messageContent: '',
      barrageList: [],
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: false
    }
  },
  methods: {
    addToList () {
      if (this.messageContent.trim() === '') {
        // this.$toast({ type: 'error', message: '留言不能为空' })
        return false
      }
      const userAvatar = 'https://gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&v=1.4.14'
      const userNickname = '游客'
      var message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * (10 - 7)) + 7,
        type: MESSAGE_TYPE
      }
      this.barrageList.push(message)
      this.messageContent = ''
      addBarrage(message)
    }
  },
  async created () {
    try {
      const result = await getBarrage()
      this.barrageList = result
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.message-banner {
  background: url('../../assets/image/message-banner.jpg') center center / cover no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;
}
.message-title {
  color: #eee;
  animation: title-scale 1s;
}
.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}
.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}
.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% -50px);
  width: 100%;
}
.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>
