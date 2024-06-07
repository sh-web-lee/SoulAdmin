<script setup lang="ts"></script>

<template>
  <div class="pc">
    <ElSkeletonItem style="width: 45%; height: 18rem" />
    <div class="flex_c_around pc-text">
      <ElSkeletonItem style="width: 60%; height: 50px" />
      <ElSkeletonItem style="width: 95%; height: 40px" />
      <ElSkeletonItem style="width: 65%; height: 30px" />
    </div>
  </div>
  <div class="mobile">
    <ElSkeletonItem style="width: 100%; height: 18rem" />
    <div class="flex_c_around mobile-text">
      <ElSkeletonItem style="width: 60%; height: 45px" />
      <ElSkeletonItem style="width: 95%; height: 35px" />
      <ElSkeletonItem style="width: 65%; height: 25px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-text {
    width: 50%;
    height: 12rem;
  }
}
.mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-text {
    padding: 0.5rem 0;
    width: 90%;
    height: 12rem;
  }
}
@media screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .pc {
    display: none;
  }
}
</style>
