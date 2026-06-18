<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Stat 1: Total Users -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 dark:bg-slate-800 dark:border-slate-700">
      <span class="p-3.5 bg-primary/10 rounded-2xl text-primary dark:bg-primary/20 dark:text-primary-light">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
      <div class="space-y-0.5">
        <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('admin_total_readers') }}</span>
        <h4 class="text-2xl font-black text-slate-800 dark:text-white leading-none">
          {{ formatNumber(stats.users ?? 0) }}
        </h4>
      </div>
    </div>

    <!-- Stat 2: Total Articles -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 dark:bg-slate-800 dark:border-slate-700">
      <span class="p-3.5 bg-sky-50 rounded-2xl text-sky-500 dark:bg-sky-950/20 dark:text-sky-400">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
        </svg>
      </span>
      <div class="space-y-0.5">
        <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('admin_total_articles') }}</span>
        <h4 class="text-2xl font-black text-slate-800 dark:text-white leading-none">
          {{ formatNumber(stats.articles ?? 0) }}
        </h4>
      </div>
    </div>

    <!-- Stat 3: Total Views -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 dark:bg-slate-800 dark:border-slate-700">
      <span class="p-3.5 bg-amber-50 rounded-2xl text-amber-500 dark:bg-amber-950/20 dark:text-amber-400">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </span>
      <div class="space-y-0.5">
        <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('admin_total_views') }}</span>
        <h4 class="text-2xl font-black text-slate-800 dark:text-white leading-none">
          {{ formatNumber(stats.views ?? 0) }}
        </h4>
      </div>
    </div>

    <!-- Stat 4: Revenue -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 dark:bg-slate-800 dark:border-slate-700">
      <span class="p-3.5 bg-green-50 rounded-2xl text-green-600 dark:bg-green-950/20 dark:text-green-400">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
      <div class="space-y-0.5">
        <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('admin_revenue') }}</span>
        <h4 class="text-xl font-black text-slate-800 dark:text-white leading-none">
          {{ formatPrice(stats.revenue ?? 0) }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({ users: 0, articles: 0, views: 0, revenue: 0 })
  }
})

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>
