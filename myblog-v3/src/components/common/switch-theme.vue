<script lang="ts" setup>
import { Moon, Sunrise } from '@element-plus/icons-vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTheme } from '@souljs/theme-crazing-js';
import { useThemeStore } from '@/store/theme';

const { setTheme } = useTheme();

const themeStore = useThemeStore();

function handleSwitch(e: Event) {
  setTheme(e);
}

onMounted(() => {});
</script>

<template>
  <ElSwitch
    :model-value="themeStore.darkMode"
    :active-icon="Moon"
    inline-prompt
    :inactive-icon="Sunrise"
    @click="handleSwitch"
  />
</template>

<style lang="scss" scoped></style>
