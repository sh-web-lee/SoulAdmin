<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface Props {
  value: number | string;
  duration?: number;
}
// 接收需要实现滚动的数据
const props = withDefaults(defineProps<Props>(), {
  duration: 1
});
const id = ref('');
// 初始值
const d = reactive({
  num: 0
});
// 实现动画的方法
function AnimateToValue() {
  gsap.to(d, {
    scrollTrigger: `.num-${id.value}`,
    duration: props.duration,
    num: props.value
  });
}

onMounted(() => {
  id.value = Math.random().toString(16).slice(2);

  nextTick(() => {
    gsap.registerPlugin(ScrollTrigger);
    AnimateToValue();
  });
});

// 监听传过来的值是否变化，如果变化了，就执行一次
watch(
  () => props.value,
  () => {
    nextTick(() => {
      gsap.registerPlugin(ScrollTrigger);
      AnimateToValue();
    });
  }
);
</script>

<template>
  <span :class="'num-' + id">
    {{ d.num.toFixed(0) }}
  </span>
</template>
