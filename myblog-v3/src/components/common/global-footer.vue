<script lang="ts" setup></script>

<template>
  <footer>
    <div class="beian">
      <p class="beian-time">©2021 - {{ new Date().getFullYear() }} By lee</p>
      <p class="beian-context">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">蜀ICP备2021021318号-1</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.beian {
  line-height: 2;
  color: #eee;
  font-size: 14px;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab) transparent;
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  text-align: center;
  padding: 40px 20px;
  p {
    margin: 0 !important;
  }
  a {
    font-size: 1.5rem;
    color: #eee !important;
  }
}
</style>
