<script lang="ts" setup></script>

<template>
  <ElContainer class="h-full">
    <ElHeader>
      <GlobalHeader></GlobalHeader>
    </ElHeader>
    <ElMain>
      <slot />
    </ElMain>
    <ElFooter><GlobalFooter></GlobalFooter></ElFooter>
  </ElContainer>
</template>

<style lang="scss" scoped></style>
