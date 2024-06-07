import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import { setupVitePlugin } from './build/unplugin';
import { createViteProxy } from './build/config';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as Env.ImportMeta;

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: setupVitePlugin(viteEnv),
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: createViteProxy(viteEnv, configEnv.command === 'serve')
    }
  };
});
