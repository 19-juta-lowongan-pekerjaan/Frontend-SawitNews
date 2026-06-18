<template>
  <div class="py-4">
    <!-- Back Button -->
    <button 
      @click="router.back()"
      class="mb-6 inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-gray-100 rounded-xl text-xs font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-all transform active:scale-95"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ uiStore.t('back_btn') }}
    </button>

    <!-- Loading State -->
    <LoadingSpinner :visible="articleStore.loading" />

    <!-- Error State -->
    <div 
      v-if="!articleStore.loading && !articleStore.currentArticle"
      class="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4 dark:bg-slate-800 dark:border-slate-700"
    >
      <span class="text-amber-500">
        <svg class="h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </span>
      <h3 class="text-lg font-bold text-accent dark:text-white">{{ uiStore.t('article_not_found') }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {{ uiStore.t('article_not_found_desc') }}
      </p>
      <router-link to="/" class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all">
        {{ uiStore.t('back_to_home') }}
      </router-link>
    </div>

    <!-- Article Detail Content -->
    <ArticleDetail 
      v-if="!articleStore.loading && articleStore.currentArticle" 
      :article="articleStore.currentArticle" 
    />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import ArticleDetail from '../components/articles/ArticleDetail.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const uiStore = useUiStore()

const loadArticle = () => {
  const slug = route.params.slug
  if (slug) {
    articleStore.fetchArticle(slug)
  }
}

onMounted(() => {
  loadArticle()
})

// Watch for slug param changes (e.g. click related articles)
watch(() => route.params.slug, () => {
  loadArticle()
})
</script>
