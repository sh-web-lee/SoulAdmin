import App from "./App.vue";
import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupStore } from './store'
import { setupDirectives } from './directives'
import './plugins/assets';


function setupApp() {
  const app = createApp(App);

  /** setup router */
  setupRouter(app)

  /** setup store */
  setupStore(app)

  /** setup directives */
  setupDirectives(app)

  app.mount('#app')
}

setupApp()