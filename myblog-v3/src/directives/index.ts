import type { App } from 'vue';
import image from './imageLoading';

export function setupDirectives(app: App) {
  app.directive('image', image);
}
