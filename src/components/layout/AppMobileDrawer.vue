<template>
  <div class="md:hidden">
    <!-- Backdrop for mobile -->
    <transition name="fade">
      <div 
        v-if="uiStore.sidebarOpen"
        @click="uiStore.setSidebar(false)"
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      ></div>
    </transition>

    <!-- Sidebar Drawer -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r border-gray-100 shadow-2xl p-6 transition-transform duration-300 transform dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full"
      :class="uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
        <router-link to="/" @click="uiStore.setSidebar(false)" class="flex items-center gap-2 group">
          <img 
            src="/icon-sawit.svg"
            class="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
            alt="SawitNews Logo"
          />
          <span class="text-xl font-bold tracking-tight text-accent dark:text-white">
            Sawit<span class="text-primary">News</span>
          </span>
        </router-link>
        
        <button 
          @click="uiStore.setSidebar(false)"
          class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
          title="Tutup Menu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto py-6 space-y-6 pr-1 -mr-2">
        <!-- Main Navigation Links -->
        <div class="space-y-1">
          <h4 class="text-xxs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">Menu</h4>
          <router-link 
            to="/" 
            @click="uiStore.setSidebar(false)" 
            class="mobile-nav-link" 
            active-class="mobile-nav-link-active font-bold"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ uiStore.t('home') }}
          </router-link>
          <router-link 
            to="/berita" 
            @click="uiStore.setSidebar(false)" 
            class="mobile-nav-link" 
            active-class="mobile-nav-link-active font-bold"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
            </svg>
            {{ uiStore.t('news') }}
          </router-link>
          <router-link 
            to="/leaderboard" 
            @click="uiStore.setSidebar(false)" 
            class="mobile-nav-link" 
            active-class="mobile-nav-link-active font-bold"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {{ uiStore.t('leaderboard') }}
          </router-link>
          <router-link 
            to="/tentang" 
            @click="uiStore.setSidebar(false)" 
            class="mobile-nav-link" 
            active-class="mobile-nav-link-active font-bold"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ uiStore.t('about') }}
          </router-link>
        </div>

        <!-- Categories List Section -->
        <div class="space-y-2">
          <h4 class="text-xxs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">{{ uiStore.t('main_categories') }}</h4>
          <div class="space-y-1">
            <button
              @click="handleCategorySelect(null)"
              class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200"
              :class="!categoryStore.selectedCategory ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800'"
            >
              <span>{{ uiStore.t('all_categories') }}</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              v-for="cat in categoryStore.categories"
              :key="cat.id"
              @click="handleCategorySelect(cat)"
              class="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold flex flex-col transition-all duration-200"
              :class="categoryStore.selectedCategory?.id === cat.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800'"
            >
              <div class="flex items-center justify-between w-full">
                <span>{{ cat.name }}</span>
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Toggles Section (Theme & Language) -->
        <div class="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
          <h4 class="text-xxs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 px-2">Pengaturan</h4>
          <div class="grid grid-cols-2 gap-2">
            <!-- Theme Toggle -->
            <button 
              @click="uiStore.toggleTheme()"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors"
            >
              <!-- Sun -->
              <svg v-if="uiStore.theme === 'dark'" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <!-- Moon -->
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span class="text-xs font-semibold">Tema</span>
            </button>

            <!-- Language Toggle -->
            <button 
              @click="uiStore.toggleLang()"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span class="text-xs font-bold uppercase">{{ uiStore.lang }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer / Auth Options -->
      <div class="pt-4 border-t border-gray-100 dark:border-slate-800 mt-auto">
        <div v-if="authStore.isAuthenticated" class="space-y-4">
          <div class="flex items-center gap-3 px-2">
            <img 
              :src="getImageUrl(authStore.user?.avatar) || getDefaultAvatar(authStore.user?.displayName || authStore.user?.name || authStore.user?.username || '?')" 
              class="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/20"
              alt="User Avatar"
              @error="(e) => e.target.src = getDefaultAvatar(authStore.user?.displayName || authStore.user?.username || '?')"
            />
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {{ authStore.user?.name }}
              </span>
              <span class="text-xxs text-gray-400 dark:text-gray-500 truncate">
                {{ authStore.user?.email }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <router-link 
              :to="`/profil/${authStore.user?.id}`" 
              @click="uiStore.setSidebar(false)"
              class="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold dark:bg-slate-850 dark:text-gray-300 dark:hover:bg-slate-800 transition-all"
            >
              Profil
            </router-link>
            <router-link 
              to="/buat-artikel" 
              @click="uiStore.setSidebar(false)"
              class="flex items-center justify-center p-2 bg-primary/10 text-primary hover:bg-primary/15 rounded-xl text-xs font-bold dark:bg-primary/20 dark:text-primary-light transition-all"
            >
              Tulis
            </router-link>
            <router-link 
              to="/artikel-saya" 
              @click="uiStore.setSidebar(false)"
              class="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold dark:bg-slate-850 dark:text-gray-300 dark:hover:bg-slate-800 transition-all"
            >
              Artikelku
            </router-link>
            <router-link 
              v-if="authStore.isAdmin"
              to="/admin" 
              @click="uiStore.setSidebar(false)"
              class="flex items-center justify-center p-2 bg-red-50 text-red-650 hover:bg-red-100 rounded-xl text-xs font-bold dark:bg-red-950/20 dark:text-red-400 transition-all col-span-1"
            >
              Admin
            </router-link>
            <router-link 
              v-else
              to="/rank-saya" 
              @click="uiStore.setSidebar(false)"
              class="flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold dark:bg-slate-850 dark:text-gray-300 dark:hover:bg-slate-800 transition-all"
            >
              Rank
            </router-link>
          </div>

          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 p-2.5 bg-red-50 text-red-655 hover:bg-red-100 dark:bg-red-950/10 dark:text-red-400 dark:hover:bg-red-950/20 rounded-xl text-sm font-bold transition-colors"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {{ uiStore.t('logout') }}
          </button>
        </div>

        <div v-else class="grid grid-cols-2 gap-2">
          <router-link 
            to="/login" 
            @click="uiStore.setSidebar(false)"
            class="flex items-center justify-center p-2.5 border border-gray-250 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-bold dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 transition-all"
          >
            {{ uiStore.t('login') }}
          </router-link>
          <router-link 
            to="/register" 
            @click="uiStore.setSidebar(false)"
            class="flex items-center justify-center p-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow transition-all transform active:scale-95"
          >
            {{ uiStore.t('register') }}
          </router-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { useCategoryStore } from '../../stores/categories'
import { useRouter } from 'vue-router'
import { getImageUrl, getDefaultAvatar } from '../../utils/formatters'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const uiStore = useUiStore()
const categoryStore = useCategoryStore()
const router = useRouter()

onMounted(() => {
  categoryStore.fetchCategories()
})

const handleCategorySelect = (category) => {
  categoryStore.selectCategory(category)
  uiStore.setSidebar(false)
  
  router.push({ 
    path: '/berita', 
    query: category ? { category: category.slug } : {} 
  })
}

const handleLogout = () => {
  uiStore.setSidebar(false)
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.mobile-nav-link {
  @apply flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-600 rounded-xl hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800 transition-all;
}

.mobile-nav-link-active {
  @apply bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light;
}

.text-xxs {
  font-size: 0.65rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
