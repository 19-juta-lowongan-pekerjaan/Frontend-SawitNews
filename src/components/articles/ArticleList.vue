<template>
  <div>
    <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="article in articles" 
        :key="article.id"
        class="h-full"
      >
        <ArticleCard :article="article" />
      </div>
    </div>
    
    <div 
      v-else 
      class="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4 dark:bg-slate-800 dark:border-slate-700"
    >
      <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-500">
        <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <div>
        <h4 class="text-lg font-bold text-accent dark:text-white">{{ uiStore.t('no_articles_title') }}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-1">
          {{ uiStore.t('no_articles_desc') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>
