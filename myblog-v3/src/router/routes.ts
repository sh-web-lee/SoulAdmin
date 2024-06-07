import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/layouts/base-layout.vue'),
    meta: {
      title: '首页'
    },
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章详情'
        }
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/archives/index.vue'),
        meta: {
          title: '归档'
        }
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/views/message/index.vue'),
        meta: {
          title: '消息'
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/index.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/tag',
        name: 'tag',
        component: () => import('@/views/tag/index.vue'),
        meta: {
          title: '分类'
        }
      }
    ]
  }
];

export default routes;
