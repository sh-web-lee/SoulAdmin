import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/home'
import Archive from '../views/Archive/archive'
import Message from '../views/Message/message'
import About from '../views/About/about'
import Link from '../views/Link/link'
import Category from '../views/Category/category'
import Tag from '../views/Tag/tag'
import Article from '../views/Article/article'
import User from '../views/User/user'
import ArticleList from '../components/ArticleList'
import Album from '../views/Wallpaper/album.vue'
import Wallpaper from '../views/Wallpaper/wallpaper.vue'
import Works from '@/views/Masterworks/works'

import NotFound from '../views/Site/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '李建阳的个人博客'
    }
  },
  {
    path: '/archives',
    name: 'Archive',
    component: Archive,
    meta: {
      title: '归档'
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '留言板'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '我的故事'
    }
  },
  {
    path: '/links',
    name: 'Link',
    component: Link,
    meta: {
      title: '友情链接'
    }
  },
  {
    path: '/categories',
    name: 'Category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
    meta: {
      title: '个人作品'
    }
  },
  {
    path: '/categories/:categoryId',
    name: 'categories',
    component: ArticleList
  },
  {
    path: '/tags',
    name: 'Tag',
    component: Tag,
    meta: {
      title: '标签'
    }
  },
  {
    path: '/tags/:tagId',
    name: 'tags',
    component: ArticleList
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '用户中心'
    }
  },
  {
    path: '/albums',
    component: Album,
    name: 'albums',
    meta: {
      title: '壁纸'
    }
  },
  {
    path: '/albums/:albumId',
    component: Wallpaper,
    name: 'wallpaper'
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
