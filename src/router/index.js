import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/views/TopPage.vue'
import ShareApp from '@/views/ShareApp.vue'
import PrivacyPage from '@/views/PrivacyPage.vue'
import HowToPage from '@/views/HowToPage.vue'
import LicensePage from '@/views/LicensePage.vue'
import ServicesPage from '@/views/ServicesPage.vue'
import ContactPage from '@/views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopPage
  },
  {
    path: '/share',
    name: 'share',
    component: ShareApp
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPage
  },
  {
    path: '/terms',
    name: 'terms',
    redirect: '/privacy'
  },
  {
    path: '/howto',
    name: 'howto',
    component: HowToPage
  },
  {
    path: '/license',
    name: 'license',
    component: LicensePage
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesPage
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
