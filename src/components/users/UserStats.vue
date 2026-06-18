<template>
  <div class="grid grid-cols-3 gap-4">
    <!-- Stat 1: Articles -->
    <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <span class="p-2 bg-primary/10 rounded-xl text-primary inline-flex mb-3 dark:bg-primary/20 dark:text-primary-light">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
        </svg>
      </span>
      <div class="text-2xl font-black text-slate-800 dark:text-white leading-none">
        {{ stats.articles || 0 }}
      </div>
      <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1.5">{{ uiStore.t('stats_articles') }}</div>
    </div>

    <!-- Stat 2: Views -->
    <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <span class="p-2 bg-blue-50 rounded-xl text-blue-500 inline-flex mb-3 dark:bg-blue-950/20 dark:text-blue-400">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </span>
      <div class="text-2xl font-black text-slate-800 dark:text-white leading-none">
        {{ formatCount(stats.views || 0) }}
      </div>
      <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1.5">{{ uiStore.t('stats_readers') }}</div>
    </div>

    <!-- Stat 3: Likes -->
    <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <span class="p-2 bg-red-50 rounded-xl text-red-500 inline-flex mb-3 dark:bg-red-950/20 dark:text-red-400">
        <svg class="h-6 w-6 text-red-500 fill-red-500" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </span>
      <div class="text-2xl font-black text-slate-800 dark:text-white leading-none">
        {{ formatCount(stats.likes || 0) }}
      </div>
      <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1.5">{{ uiStore.t('stats_likes') }}</div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({ articles: 0, views: 0, likes: 0 })
  }
})

const formatCount = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>
