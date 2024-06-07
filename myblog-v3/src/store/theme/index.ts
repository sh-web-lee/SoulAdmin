import { defineStore } from 'pinia';
import { useEventListener } from '@vueuse/core';
import { localStg } from '@/utils/storage';
import { initThemeSettings } from './shared';

type CodeTheme = 'atom' | 'a11y' | 'github' | 'gradient' | 'kimbie' | 'paraiso' | 'qtcreator' | 'stackoverflow';
type PreviewTheme = 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis';

export const useThemeStore = defineStore('theme-store', () => {
  // 代码主题
  const previewThemeList: PreviewTheme[] = ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis'];
  const codeThemeList: CodeTheme[] = [
    'atom',
    'a11y',
    'github',
    'gradient',
    'kimbie',
    'paraiso',
    'qtcreator',
    'stackoverflow'
  ];
  // md预览主题
  const previewTheme = ref('default');
  // md代码主题
  const codeTheme = ref('atom');

  const themeScheme = ref<UnionKey.ThemeScheme>(initThemeSettings());

  const darkMode = computed(() => themeScheme.value === 'dark');

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

  function toggleCodeTheme(theme: CodeTheme) {
    codeTheme.value = theme;
  }

  function togglePreviewTheme(theme: PreviewTheme) {
    previewTheme.value = theme;
  }

  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings();
  });

  return {
    themeScheme,
    darkMode,
    previewTheme,
    codeTheme,
    previewThemeList,
    codeThemeList,
    toggleCodeTheme,
    togglePreviewTheme,
    toggleThemeScheme
  };
});
