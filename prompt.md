Buatkan frontend aplikasi portal berita SawitNews dengan Vue.js dengan spesifikasi berikut:

TEKNOLOGI
Vue.js 3 dengan Composition API

Vue Router 4

Pinia untuk state management

Tailwind CSS atau Vuetify 3 untuk UI

Axios untuk API calls

VueQuill atau TipTap untuk rich text editor

VueUse untuk utilities

STRUKTUR APLIKASI
Pages/Routes
text
/                    - Homepage (trending articles)
/berita              - List semua artikel dengan filter
/berita/:slug        - Detail artikel
/buat-artikel        - Create article (auth required)
/artikel-saya        - My articles list
/profil/:id          - User profile dengan badges
/leaderboard         - Ranking users
/rank-saya           - My rank progress
/subscription        - Halaman paket subscription
/admin               - Admin dashboard (admin only)
/login               - Login page
/register            - Register page
/tentang             - About page
Components
Layout Components
text
AppHeader.vue        - Navigation bar with user menu
AppFooter.vue        - Footer
AppSidebar.vue       - Sidebar untuk kategori
Article Components
text
ArticleCard.vue      - Card preview artikel
ArticleList.vue      - Grid/list artikel
ArticleDetail.vue    - Full article view with comments
ArticleSorter.vue    - Filter dan sorting
TrendingSidebar.vue  - Widget trending articles
FeaturedCarousel.vue - Carousel untuk featured articles
User Components
text
UserBadges.vue       - Display badges user
UserRank.vue         - Show user rank dengan progress
UserStats.vue        - Statistik user
LeaderboardTable.vue - Tabel leaderboard
SubscriptionCard.vue - Card paket subscription
PaymentModal.vue     - Modal untuk pembayaran
Form Components
text
RichTextEditor.vue   - WYSIWYG editor untuk artikel
ArticleForm.vue      - Form create/edit artikel
LoginForm.vue
RegisterForm.vue
ProfileForm.vue
CommentForm.vue
Admin Components
text
AdminStats.vue       - Dashboard statistics
AdminArticles.vue    - Manage articles
AdminUsers.vue       - Manage users
AdminTransactions.vue - View transactions
VerificationQueue.vue - Queue artikel pending
STATE MANAGEMENT (Pinia Stores)
Auth Store
javascript
state: {
  user: null,
  token: null,
  isAuthenticated: false
}
actions: {
  login(credentials),
  register(userData),
  logout(),
  fetchProfile(),
  updateProfile(data)
}
getters: {
  isAdmin: (state) => state.user?.role === 'ADMIN',
  isModerator: (state) => state.user?.role === 'MODERATOR' || state.user?.role === 'ADMIN',
  userRank: (state) => state.user?.rank,
  userBadges: (state) => state.user?.badges
}
Article Store
javascript
state: {
  articles: [],
  currentArticle: null,
  trendingArticles: [],
  featuredArticles: [],
  myArticles: [],
  pendingArticles: [], // moderator
  loading: false,
  pagination: { page: 1, limit: 12, total: 0 }
}
actions: {
  fetchArticles(filters),
  fetchTrending(),
  fetchFeatured(),
  fetchArticle(slug),
  createArticle(data),
  updateArticle(id, data),
  deleteArticle(id),
  publishArticle(id),
  verifyArticle(id, action, reason), // moderator
  fetchMyArticles(),
  fetchPendingArticles() // moderator
}
Category Store
javascript
state: {
  categories: [],
  selectedCategory: null
}
actions: {
  fetchCategories(),
  createCategory(data), // admin
  updateCategory(id, data), // admin
  deleteCategory(id) // admin
}
Comment Store
javascript
state: {
  comments: [],
  loading: false
}
actions: {
  fetchComments(articleId),
  postComment(articleId, content),
  deleteComment(id),
  likeComment(id)
}
Subscription Store
javascript
state: {
  plans: [],
  mySubscription: null,
  transactionHistory: [],
  loading: false
}
actions: {
  fetchPlans(),
  fetchMySubscription(),
  purchasePlan(planId),
  cancelSubscription(),
  fetchTransactionHistory()
}
UI Store
javascript
state: {
  isLoading: false,
  notification: null,
  sidebarOpen: false,
  theme: 'light'
}
actions: {
  showNotification(message, type),
  toggleSidebar(),
  toggleTheme()
}
FITUR UTAMA
1. Homepage
Hero section dengan featured articles carousel

Trending articles widget

Latest articles grid

Category filter

Search bar

2. Article Creation
Rich text editor (Quill/TipTap)

Image upload (featured image)

Category selection

Anonymous toggle

Draft save

Preview before publish

3. Article Detail
Full article with formatting

Author info (with badges and rank)

Share buttons

Like button

Comment section with nested replies

Related articles

Reading time estimate

4. User Profile
Profile picture

Display name and username

Rank and badge display

Statistics (articles, views, likes)

List of published articles

Subscription status

Edit profile form

5. Leaderboard
Top users by rank

Sort by articles, views, likes

User search

Pagination

6. Subscription Page
Display all packages with features

Comparison table

Payment button (integrate Midtrans)

Current subscription status

Transaction history

7. Admin Dashboard
Statistics cards (total users, articles, views, revenue)

Article verification queue

Manage users (view, edit rank, suspend)

Manage categories

View transactions

Featured article management

UI/UX DESIGN
Color Scheme
Primary: #2C7A4D (hijau sawit)

Secondary: #F59E0B (gold)

Accent: #1E3A5F (dark blue)

Background: #F8FAFC

Text: #1A202C

Badge Design
javascript
const badges = {
  'Pemula': { icon: '🥉', color: '#CD7F32', bg: '#FDE68A' },
  'Penulis': { icon: '📝', color: '#3B82F6', bg: '#DBEAFE' },
  'Jurnalis': { icon: '🎙️', color: '#6B7280', bg: '#E5E7EB' },
  'Wartawan Senior': { icon: '⭐', color: '#F59E0B', bg: '#FEF3C7' },
  'Maestro': { icon: '👑', color: '#8B5CF6', bg: '#EDE9FE' }
}
Responsive Design
Mobile-first approach

Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

Sidebar collapse on mobile

Hamburger menu for mobile

PAGES IMPLEMENTATION
HomePage.vue
vue
<template>
  <div class="home">
    <FeaturedCarousel :articles="featuredArticles" />
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3">
        <ArticleList :articles="latestArticles" />
        <Pagination :current="page" :total="total" @page-change="changePage" />
      </div>
      <div class="lg:col-span-1">
        <TrendingSidebar :articles="trendingArticles" />
        <CategoryFilter :categories="categories" />
        <NewsletterSignup />
      </div>
    </div>
  </div>
</template>
ArticleDetailPage.vue
vue
<template>
  <div v-if="article" class="article-detail">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold">{{ article.title }}</h1>
      <div class="flex items-center gap-4 my-4">
        <UserBadge :user="article.author" />
        <span>{{ formatDate(article.publishedAt) }}</span>
        <span>{{ article.views }} views</span>
      </div>
      <img :src="article.featuredImage" class="w-full h-96 object-cover rounded-lg" />
      <div class="prose max-w-none mt-8" v-html="article.content" />
      <div class="flex gap-4 mt-8">
        <button @click="likeArticle">❤️ {{ article.likes }}</button>
        <button @click="shareArticle">🔗 Share</button>
      </div>
      <CommentSection :articleId="article.id" />
    </div>
  </div>
</template>
CreateArticlePage.vue
vue
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Buat Artikel Baru</h1>
    <ArticleForm @submit="handleSubmit" :initialData="article" />
  </div>
</template>
AdminDashboard.vue
vue
<template>
  <div class="admin-dashboard">
    <div class="grid grid-cols-4 gap-4">
      <StatsCard title="Total Users" :value="stats.users" icon="users" />
      <StatsCard title="Total Articles" :value="stats.articles" icon="file" />
      <StatsCard title="Total Views" :value="stats.views" icon="eye" />
      <StatsCard title="Revenue" :value="stats.revenue" icon="dollar" />
    </div>
    <div class="mt-8">
      <VerificationQueue :articles="pendingArticles" @verify="handleVerify" />
    </div>
    <div class="mt-8">
      <AdminArticles :articles="articles" @delete="handleDelete" @feature="handleFeature" />
    </div>
  </div>
</template>
SubscriptionPage.vue
vue
<template>
  <div class="subscription-page">
    <h1 class="text-3xl font-bold text-center mb-8">Pilih Paket Berlangganan</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <SubscriptionCard 
        v-for="plan in plans" 
        :key="plan.id"
        :plan="plan"
        :current="mySubscription?.id === plan.id"
        @select="handleSelectPlan"
      />
    </div>
    <PaymentModal 
      v-if="selectedPlan" 
      :plan="selectedPlan"
      @close="selectedPlan = null"
      @success="handlePaymentSuccess"
    />
  </div>
</template>
API INTEGRATION
Axios Configuration
javascript
// plugins/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
DEPENDENCIES
json
{
  "dependencies": {
    "vue": "^3.3.4",
    "vue-router": "^4.2.4",
    "pinia": "^2.1.6",
    "axios": "^1.4.0",
    "@vueuse/core": "^10.4.0",
    "quill": "^1.3.7",
    "@vueup/vue-quill": "^1.2.0",
    "tailwindcss": "^3.3.3",
    "@headlessui/vue": "^1.7.16",
    "@heroicons/vue": "^2.0.18",
    "vue-sweetalert2": "^5.0.7",
    "moment": "^2.29.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "vite": "^4.4.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27"
  }
}
ENVIRONMENT VARIABLES
env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=SawitNews
VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
STRUKTUR FOLDER FRONTEND
text
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.js
│   │   ├── articles.js
│   │   ├── users.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   └── subscriptions.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   └── AppSidebar.vue
│   │   ├── articles/
│   │   │   ├── ArticleCard.vue
│   │   │   ├── ArticleList.vue
│   │   │   ├── ArticleDetail.vue
│   │   │   ├── ArticleForm.vue
│   │   │   ├── FeaturedCarousel.vue
│   │   │   └── TrendingSidebar.vue
│   │   ├── users/
│   │   │   ├── UserBadges.vue
│   │   │   ├── UserRank.vue
│   │   │   ├── UserStats.vue
│   │   │   └── LeaderboardTable.vue
│   │   ├── comments/
│   │   │   ├── CommentSection.vue
│   │   │   └── CommentForm.vue
│   │   ├── admin/
│   │   │   ├── AdminStats.vue
│   │   │   ├── AdminArticles.vue
│   │   │   ├── AdminUsers.vue
│   │   │   └── VerificationQueue.vue
│   │   ├── subscription/
│   │   │   ├── SubscriptionCard.vue
│   │   │   └── PaymentModal.vue
│   │   └── common/
│   │       ├── Pagination.vue
│   │       ├── LoadingSpinner.vue
│   │       └── Notification.vue
│   ├── pages/
│   │   ├── HomePage.vue
│   │   ├── ArticleListPage.vue
│   │   ├── ArticleDetailPage.vue
│   │   ├── CreateArticlePage.vue
│   │   ├── MyArticlesPage.vue
│   │   ├── ProfilePage.vue
│   │   ├── LeaderboardPage.vue
│   │   ├── MyRankPage.vue
│   │   ├── SubscriptionPage.vue
│   │   ├── AdminDashboard.vue
│   │   ├── LoginPage.vue
│   │   ├── RegisterPage.vue
│   │   └── AboutPage.vue
│   ├── stores/
│   │   ├── auth.js
│   │   ├── articles.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   ├── subscriptions.js
│   │   └── ui.js
│   ├── composables/
│   │   ├── useAuth.js
│   │   ├── useArticles.js
│   │   └── useSubscription.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── router/
│   │   └── index.js
│   ├── styles/
│   │   └── main.css
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
ROUTER CONFIGURATION
javascript
// router/index.js
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
  routes
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
