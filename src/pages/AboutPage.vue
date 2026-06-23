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

    
    <!-- Founders Section -->
    <div class="max-w-4xl mx-auto space-y-8 pt-8 border-t border-gray-100 dark:border-slate-800 mt-12">
      <h2 class="text-xl md:text-2xl font-black text-accent dark:text-white text-center">{{ uiStore.t('about_developers_title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Zhao Han -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition-shadow">
          <img src="/zhao.png" alt="Zhao Han" class="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-primary/20 shadow-lg">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Zhao Han</h3>
          <p class="text-sm font-semibold text-primary mb-4">Co-Founder & Developer</p>
          <blockquote class="text-sm italic text-gray-600 dark:text-slate-300 relative px-6 py-2">
            <span class="absolute top-0 left-0 text-4xl text-primary/20 leading-none font-serif">"</span>
            McLaren Lu Warne Ape Bosss!!!
            <span class="absolute bottom-0 right-0 text-4xl text-primary/20 leading-none font-serif transform translate-y-4">"</span>
          </blockquote>
        </div>

        <!-- FayBoy -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition-shadow">
          <img src="/fay.png" alt="FayBoy" class="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-primary/20 shadow-lg">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">FayBoy</h3>
          <p class="text-sm font-semibold text-primary mb-4">Co-Founder & Developer</p>
          <blockquote class="text-sm italic text-gray-600 dark:text-slate-300 relative px-6 py-2">
            <span class="absolute top-0 left-0 text-4xl text-primary/20 leading-none font-serif">"</span>
            Yesterday is history, Tomorrow is a mystery but today is a gift. That is why it's called a present.
            <span class="absolute bottom-0 right-0 text-4xl text-primary/20 leading-none font-serif transform translate-y-4">"</span>
          </blockquote>
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
