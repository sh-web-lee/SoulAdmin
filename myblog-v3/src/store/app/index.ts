import { defineStore } from 'pinia';
import { useEventListener } from '@vueuse/core';
import { localStg } from '@/utils/storage';
import { getCurrentTheme } from './helper';

export const useAppStore = defineStore('app-store', () => {
  const themeScheme = ref<UnionKey.ThemeScheme>(getCurrentTheme());

  const darkMode = computed(() => {
    return themeScheme.value === 'dark';
  });

  function toggleThemeScheme() {
    const nextThemeScheme = darkMode.value ? 'light' : 'dark';
    setThemeScheme(nextThemeScheme);
  }

  function setThemeScheme(theme: UnionKey.ThemeScheme) {
    themeScheme.value = theme;
  }

  /** Cache theme settings */
  function cacheThemeSettings() {
    localStg.set('theme', themeScheme.value);
  }

  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings();
  });

  return {
    themeScheme,
    darkMode,
    toggleThemeScheme
  };
});
