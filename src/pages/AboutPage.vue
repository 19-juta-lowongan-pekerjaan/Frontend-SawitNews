<template>
  <div class="space-y-12 py-4">
    <!-- Hero banner -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <span class="text-xxs font-black tracking-widest uppercase bg-primary/10 text-primary px-3 py-1 rounded-full dark:bg-primary/20 dark:text-primary-light">
        {{ uiStore.t('about_hero_tag') }}
      </span>
      <h1 class="font-black text-3xl md:text-5xl text-accent dark:text-white leading-tight">
        {{ uiStore.t('about_hero_title') }}
      </h1>
      <p class="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
        {{ uiStore.t('about_hero_desc') }}
      </p>
    </div>

    <!-- Vision and Mission Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <!-- Visi -->
      <div class="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm dark:bg-slate-800 dark:border-slate-700 space-y-3">
        <span class="inline-block text-primary">
          <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </span>
        <h3 class="text-lg font-bold text-accent dark:text-white">{{ uiStore.t('about_vision_title') }}</h3>
        <p class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {{ uiStore.t('about_vision_desc') }}
        </p>
      </div>

      <!-- Misi -->
      <div class="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm dark:bg-slate-800 dark:border-slate-700 space-y-3">
        <span class="inline-block text-primary">
          <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 3.5-2 3.5s2.24-.5 3.5-2c1.37-1.64 2.82-3.55 4-5.5M12 2C8 2 5 7 5 12c0 2.5 2 5 2 5h10s2-2.5 2-5c0-5-3-10-7-10z"></path>
            <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>
          </svg>
        </span>
        <h3 class="text-lg font-bold text-accent dark:text-white">{{ uiStore.t('about_mission_title') }}</h3>
        <p class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {{ uiStore.t('about_mission_desc') }}
        </p>
      </div>
    </div>

    <!-- Key Pillars Section -->
    <div class="max-w-4xl mx-auto space-y-6">
      <h2 class="text-xl md:text-2xl font-black text-accent dark:text-white text-center">{{ uiStore.t('about_pillars_title') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <!-- 1. Jurnalisme Independen -->
        <div class="p-6 text-center space-y-3">
          <span class="inline-block text-primary mb-2">
            <svg class="w-10 h-10 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <line x1="5" y1="7" x2="19" y2="7"></line>
              <path d="M5 7L2 17h6L5 7z"></path>
              <path d="M19 7l-3 10h6l-3-10z"></path>
            </svg>
          </span>
          <h4 class="font-bold text-sm text-slate-800 dark:text-white">{{ uiStore.t('about_pillar1_title') }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 leading-normal">
            {{ uiStore.t('about_pillar1_desc') }}
          </p>
        </div>

        <!-- 2. Pemberdayaan Reputasi -->
        <div class="p-6 text-center space-y-3">
          <span class="inline-block text-primary mb-2">
            <svg class="w-10 h-10 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
              <path d="M12 2a5 5 0 0 0-5 5v3c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7a5 5 0 0 0-5-5Z"></path>
            </svg>
          </span>
          <h4 class="font-bold text-sm text-slate-800 dark:text-white">{{ uiStore.t('about_pillar2_title') }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 leading-normal">
            {{ uiStore.t('about_pillar2_desc') }}
          </p>
        </div>

        <!-- 3. Data Pasar CPO -->
        <div class="p-6 text-center space-y-3">
          <span class="inline-block text-primary mb-2">
            <svg class="w-10 h-10 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </span>
          <h4 class="font-bold text-sm text-slate-800 dark:text-white">{{ uiStore.t('about_pillar3_title') }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 leading-normal">
            {{ uiStore.t('about_pillar3_desc') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '../stores/ui'
const uiStore = useUiStore()
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
