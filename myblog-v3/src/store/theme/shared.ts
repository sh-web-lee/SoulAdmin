import { localStg } from '@/utils/storage';
import { toggleHtmlClass } from '@/utils/common';

const DARK_CLASS = 'dark';

export function initThemeSettings() {
  const settings = localStg.get('theme') || 'light';

  return settings;
}

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass(DARK_CLASS);
  if (darkMode) {
    add();
  } else {
    remove();
  }
}
