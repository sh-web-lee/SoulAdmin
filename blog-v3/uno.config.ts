// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-y-center': 'flex items-center',
    'flex-x-center': 'flex justify-center',
    'flex-center': 'flex-x-center flex-y-center',
    'flex-between': 'flex justify-between',
    'flex-col': 'flex flex-col',
  },
  rules: [
    ['blink', { animation: 'blink .8s infinite' }],
    [/^order-(\d+)$/, ([, d]) => ({ order: `${d}` })]
  ]
})