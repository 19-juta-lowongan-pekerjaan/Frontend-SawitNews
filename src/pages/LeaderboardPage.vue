<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
          <span class="h-6 w-1 bg-primary rounded-full"></span>
          {{ uiStore.t('leaderboard_title') }}
        </h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {{ uiStore.t('leaderboard_subtitle') }}
        </p>
      </div>
      <!-- Quick link to own progress -->
      <router-link 
        to="/rank-saya"
        class="inline-flex items-center px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl transition-all duration-200 transform active:scale-95 gap-1.5 dark:bg-primary/20 dark:text-primary-light group"
      >
        <span>{{ uiStore.t('view_my_rank') }}</span>
        <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </router-link>
    </div>

    <!-- Leaderboard Table Component -->
    <LeaderboardTable />
  </div>
</template>

<script setup>
import LeaderboardTable from '../components/users/LeaderboardTable.vue'
import { useUiStore } from '../stores/ui'

const uiStore = useUiStore()
</script>
