<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
