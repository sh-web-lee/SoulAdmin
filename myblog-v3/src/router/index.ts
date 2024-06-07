import type { App } from 'vue';
import type { RouterHistory } from 'vue-router';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env;

const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory
};

const router = createRouter({
  routes,
  history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE as Env.RouterHistoryMode](VITE_BASE_URL)
});

export function setupRouter(app: App) {
  app.use(router);
}
