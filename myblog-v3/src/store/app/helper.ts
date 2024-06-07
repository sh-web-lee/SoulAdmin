import { localStg } from '@/utils/storage';

export function getCurrentTheme() {
  return localStg.get('theme') || 'light';
}
