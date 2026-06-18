<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 dark:bg-slate-800 dark:border-slate-700">
    <div class="border-b border-gray-50 pb-3 dark:border-slate-700/50">
      <h3 class="font-bold text-base text-accent dark:text-white flex items-center gap-2">
        <svg class="h-5 w-5 text-secondary fill-secondary" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
        </svg>
        {{ uiStore.t('trending_today') }}
      </h3>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ uiStore.t('trending_today_desc') }}</p>
    </div>

    <div class="space-y-4">
      <div 
        v-for="(art, idx) in articles" 
        :key="art.id"
        class="flex gap-4 items-start"
      >
        <!-- Rank Number -->
        <span class="text-2xl font-black text-slate-200 leading-none select-none dark:text-slate-700 w-8">
          0{{ idx + 1 }}
        </span>
        
        <!-- Info -->
        <div class="flex-1 space-y-1">
          <h4 class="text-sm font-bold text-slate-800 hover:text-primary transition-colors leading-tight line-clamp-2 dark:text-slate-200">
            <router-link :to="`/berita/${art.slug}`">
              {{ art.title }}
            </router-link>
          </h4>
          <div class="flex items-center justify-between text-xxs text-gray-400 dark:text-gray-500 font-medium">
            <span>{{ art.isAnonymous ? 'Anonymous' : (art.authorDisplayName || art.author?.displayName || art.author?.username || '') }}</span>
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ art.views }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
