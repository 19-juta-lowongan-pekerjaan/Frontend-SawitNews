import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/berita',
    name: 'Articles',
    component: () => import('../pages/ArticleListPage.vue')
  },
  {
    path: '/berita/:slug',
    name: 'ArticleDetail',
    component: () => import('../pages/ArticleDetailPage.vue')
  },
  {
    path: '/buat-artikel',
    name: 'CreateArticle',
    component: () => import('../pages/CreateArticlePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-artikel/:id',
    name: 'EditArticle',
    component: () => import('../pages/EditArticlePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/artikel-saya',
    name: 'MyArticles',
    component: () => import('../pages/MyArticlesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profil/:id',
    name: 'Profile',
    component: () => import('../pages/ProfilePage.vue')
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../pages/LeaderboardPage.vue')
  },
  {
    path: '/rank-saya',
    name: 'MyRank',
    component: () => import('../pages/MyRankPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('../pages/SubscriptionPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../pages/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/RegisterPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/tentang',
    name: 'About',
    component: () => import('../pages/AboutPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guest && isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAdmin) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'ADMIN') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
