import { createApp } from 'vue';
import App from './App.vue';
import './plugins/assets';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupDirectives } from './directives';

function setupApp() {
  const app = createApp(App);

  // app.config.globalProperties.$message
  /** setup pinia */
  setupStore(app);

  /** setup directives */
  setupDirectives(app);

  /** setup Router */
  setupRouter(app);

  app.mount('#app');
}

setupApp();
