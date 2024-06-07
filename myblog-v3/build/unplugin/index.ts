import vue from '@vitejs/plugin-vue';
import type { PluginOption } from 'vite';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';

export function setupVitePlugin(viteEnv: Env.ImportMeta) {
  const plugins: PluginOption = [vue(), ...setupUnocss(), ...setupUnplugin(viteEnv)];

  return plugins;
}
