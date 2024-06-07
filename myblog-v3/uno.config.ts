import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-y-center': 'flex items-center',
    'flex-x-center': 'flex justify-center',
    'flex-center': 'flex-x-center flex-y-center',
    'flex-between': 'flex justify-between',
    'flex-col': 'flex flex-col',
    'hover-pointer': 'cursor-pointer hover:text-primary'
  },
  rules: [
    ['scroll-down-effects', { animation: 'scroll-down-effect 1.5s infinite' }],
    ['blink', { animation: 'blink .8s infinite' }],
    [/^order-(\d+)$/, ([, d]) => ({ order: `${d}` })]
  ],
  presets: [presetUno({ dark: 'class' })]
});
