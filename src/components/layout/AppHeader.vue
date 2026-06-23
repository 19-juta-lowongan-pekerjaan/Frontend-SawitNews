<template>
  <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button 
            @click="uiStore.toggleSidebar()"
            class="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-slate-800"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 group ml-2 md:ml-0">
            <img 
              src="/icon-sawit.svg"
              class="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105 dark:brightness-0 dark:invert"
              alt="SawitNews Logo"
            />
            <span class="text-xl font-bold tracking-tight text-accent dark:text-white group-hover:text-primary transition-colors duration-200">
              Sawit<span class="text-primary">News</span>
            </span>
          </router-link>

          <!-- Main Desktop Navigation -->
          <nav class="hidden md:flex space-x-6 ml-10">
            <router-link to="/" class="nav-link" active-class="nav-link-active">{{ uiStore.t('home') }}</router-link>
            <router-link to="/berita" class="nav-link" active-class="nav-link-active">{{ uiStore.t('news') }}</router-link>
            <router-link to="/leaderboard" class="nav-link" active-class="nav-link-active">{{ uiStore.t('leaderboard') }}</router-link>
            <router-link to="/tentang" class="nav-link" active-class="nav-link-active">{{ uiStore.t('about') }}</router-link>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="uiStore.toggleTheme()"
            class="hidden md:inline-flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
            title="Ganti Tema"
          >
            <!-- Sun -->
            <svg v-if="uiStore.theme === 'dark'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <!-- Moon -->
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Language Toggle -->
          <button 
            @click="uiStore.toggleLang()"
            class="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors items-center justify-center gap-1 text-xs font-black uppercase tracking-wider"
            :title="uiStore.lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>{{ uiStore.lang.toUpperCase() }}</span>
          </button>

          <!-- Auth Menu -->
          <div v-if="authStore.isAuthenticated" class="relative group">
            <button class="flex items-center gap-2 focus:outline-none py-1">
              <img 
                :src="getImageUrl(authStore.user?.avatar) || getDefaultAvatar(authStore.user?.displayName || authStore.user?.name || authStore.user?.username || '?')" 
                class="h-9 w-9 rounded-xl object-cover ring-2 ring-primary/20 hover:ring-primary transition-all duration-200"
                alt="User Avatar"
                @error="(e) => e.target.src = getDefaultAvatar(authStore.user?.displayName || authStore.user?.username || '?')"
              />
              <span class="hidden sm:inline text-sm font-semibold text-gray-700 dark:text-gray-200">
                {{ authStore.user?.name }}
              </span>
              <!-- Dropdown Chevron -->
              <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 w-56 mt-1 origin-top-right bg-white border border-gray-100 rounded-2xl shadow-xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 dark:bg-slate-800 dark:border-slate-700">
              <div class="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ uiStore.t('logged_in_as') }}</p>
                <p class="text-sm font-semibold text-gray-800 truncate dark:text-white">{{ authStore.user?.email }}</p>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium bg-primary-light text-primary dark:bg-primary/20 dark:text-primary-light">
                    {{ authStore.user?.role }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary-light text-secondary-hover dark:bg-secondary/20 dark:text-secondary">
                    {{ authStore.userRank }}
                  </span>
                </div>
              </div>
              <div class="p-2 space-y-1">
                <router-link :to="`/profil/${authStore.user?.id}`" class="dropdown-item">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ uiStore.t('profile') }}
                </router-link>
                <router-link to="/buat-artikel" class="dropdown-item">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {{ uiStore.t('write_nav') }}
                </router-link>
                <router-link to="/artikel-saya" class="dropdown-item">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
                  </svg>
                  {{ uiStore.t('my_articles') }}
                </router-link>
                <router-link to="/rank-saya" class="dropdown-item">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  {{ uiStore.t('rank_progress') }}
                </router-link>
                <router-link to="/subscription" class="dropdown-item">
                  <svg class="h-4 w-4 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ uiStore.t('subscription') }}
                </router-link>
                <router-link v-if="authStore.isAdmin" to="/admin" class="dropdown-item border-t border-gray-100 dark:border-slate-700">
                  <svg class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {{ uiStore.t('admin_panel') }}
                </router-link>
                <button 
                  @click="handleLogout"
                  class="dropdown-item w-full text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                >
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {{ uiStore.t('logout') }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center gap-2">
            <router-link 
              to="/login" 
              class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              {{ uiStore.t('login') }}
            </router-link>
            <router-link 
              to="/register" 
              class="inline-flex items-center px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md transition-all duration-200 transform active:scale-95"
            >
              {{ uiStore.t('register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { useRouter } from 'vue-router'
import { getImageUrl, getDefaultAvatar } from '../../utils/formatters'

const authStore = useAuthStore()
const uiStore = useUiStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-primary transition-colors duration-200 border-b-2 border-transparent dark:text-gray-400 dark:hover:text-white;
}

.nav-link-active {
  @apply text-primary border-primary dark:text-white dark:border-white;
}

.dropdown-item {
  @apply flex items-center px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700/50 transition-colors duration-150;
}
</style>
