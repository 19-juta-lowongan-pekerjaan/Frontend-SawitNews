<template>
  <footer class="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-200 mt-auto dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <img 
              src="/icon-sawit.svg"
              class="h-7 w-7 object-contain dark:brightness-0 dark:invert"
              alt="SawitNews Logo"
            />
            <span class="text-lg font-bold text-white tracking-wider">
              Sawit<span class="text-primary">News</span>
            </span>
          </div>
          <p class="text-sm text-slate-400 max-w-sm">
            {{ uiStore.t('footer_desc') }}
          </p>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">{{ uiStore.t('footer_nav') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/" class="hover:text-white transition-colors">{{ uiStore.t('home') }}</router-link></li>
            <li><router-link to="/berita" class="hover:text-white transition-colors">{{ uiStore.t('news') }}</router-link></li>
            <li><router-link to="/leaderboard" class="hover:text-white transition-colors">{{ uiStore.t('leaderboard') }}</router-link></li>
            <li><router-link to="/tentang" class="hover:text-white transition-colors">{{ uiStore.t('footer_about') }}</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">{{ uiStore.t('footer_policy') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">{{ uiStore.t('footer_terms') }}</a></li>
            <li><a href="#" class="hover:text-white transition-colors">{{ uiStore.t('footer_privacy') }}</a></li>
            <li><a href="#" class="hover:text-white transition-colors">{{ uiStore.t('footer_community') }}</a></li>
            <li><router-link to="/subscription" class="hover:text-white transition-colors">{{ uiStore.t('footer_subscribe') }}</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {{ new Date().getFullYear() }} SawitNews. {{ uiStore.t('footer_copyright') }}</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white transition-colors">Twitter</a>
          <a href="#" class="hover:text-white transition-colors">Instagram</a>
          <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
</script>
