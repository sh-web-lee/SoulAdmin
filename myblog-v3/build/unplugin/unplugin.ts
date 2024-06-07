import path from 'node:path';
import process from 'node:process';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import type { PluginOption } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  const plugins: PluginOption[] = [
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/typings/auto-import.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      /**
       * 自定义插入位置
       *
       * @default: body-last
       */
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    })
  ];

  return plugins;
}
