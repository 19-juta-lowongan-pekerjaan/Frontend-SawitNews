<template>
  <div class="space-y-6">
    <!-- Featured Carousel Section -->
    <FeaturedCarousel :articles="articleStore.featuredArticles" />

    <!-- Main Content Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Latest Articles Grid (Left / Span 3) -->
      <div class="lg:col-span-3 space-y-6">
        <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex items-center justify-between">
          <h2 class="font-extrabold text-xl text-accent dark:text-white flex items-center gap-2">
            <span class="h-6 w-1 bg-primary rounded-full"></span>
            {{ uiStore.t('latest_news') }}
          </h2>
          <router-link to="/berita" class="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
            {{ uiStore.t('see_all') }}
            <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>

        <LoadingSpinner :visible="articleStore.loading" />

        <ArticleList v-show="!articleStore.loading" :articles="articleStore.articles" />
        
        <Pagination 
          :current="articleStore.pagination.page" 
          :total="articleStore.pagination.total" 
          :limit="articleStore.pagination.limit" 
          @page-change="handlePageChange"
        />
      </div>

      <!-- Widgets Column (Right / Span 1) -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Trending Widget -->
        <TrendingSidebar :articles="articleStore.trendingArticles" />

        <!-- Categories Sidebar Navigation -->
        <div class="hidden lg:block">
          <AppSidebar />
        </div>

        <!-- Newsletter Signup Premium Box -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4 border border-slate-800">
          <div class="absolute -right-12 -top-12 opacity-10">
            <svg class="h-32 w-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          
          <div class="relative z-10 space-y-2">
            <h4 class="font-bold text-base">Newsletter SawitNews</h4>
            <p class="text-xs text-slate-300 leading-normal">
              Dapatkan rangkuman mingguan berita CPO, tips agronomi, dan riset sawit terbaru langsung di email Anda.
            </p>
          </div>

          <div class="relative z-10 space-y-2">
            <input 
              type="email" 
              v-model="newsletterEmail"
              placeholder="Alamat email Anda..." 
              class="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-slate-500"
            />
            <button 
              @click="handleSubscribeNewsletter"
              class="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow shadow-primary/20"
            >
              Langganan Gratis
            </button>
          </div>
        </div>
      </div>
    </div>

    <router-link 
      to="/buat-artikel" 
      class="fixed bottom-6 right-6 z-40 h-14 w-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center font-bold text-2xl shadow-primary/20 group"
      :title="uiStore.t('write_new_article_tooltip')"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
      </svg>
      <!-- Tooltip -->
      <span class="absolute right-full mr-3 bg-slate-900 text-white text-xxs font-bold px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow">
        {{ uiStore.t('write_article') }}
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import FeaturedCarousel from '../components/articles/FeaturedCarousel.vue'
import ArticleList from '../components/articles/ArticleList.vue'
import TrendingSidebar from '../components/articles/TrendingSidebar.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
import Pagination from '../components/common/Pagination.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const articleStore = useArticleStore()
const uiStore = useUiStore()

const newsletterEmail = ref('')

onMounted(() => {
  articleStore.fetchFeatured()
  articleStore.fetchTrending()
  articleStore.fetchArticles({ page: 1 })
})

const handlePageChange = (page) => {
  articleStore.fetchArticles({ page })
}

const handleSubscribeNewsletter = () => {
  if (newsletterEmail.value.trim() && newsletterEmail.value.includes('@')) {
    uiStore.showNotification('Terima kasih! Email Anda telah terdaftar untuk Newsletter.', 'success')
    newsletterEmail.value = ''
  } else {
    uiStore.showNotification('Masukkan alamat email yang valid.', 'warning')
  }
}
</script>
