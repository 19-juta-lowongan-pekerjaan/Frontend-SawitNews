<template>
  <div>
    <!-- Backdrop for mobile -->
    <div 
      v-if="uiStore.sidebarOpen"
      @click="uiStore.toggleSidebar()"
      class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
    ></div>

    <!-- Sidebar Drawer -->
    <aside 
      class="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 shadow-2xl md:shadow-none md:sticky md:top-20 md:h-[calc(100vh-6rem)] md:z-0 md:bg-transparent md:border-none md:w-auto p-5 transition-transform duration-300 transform md:transform-none dark:bg-slate-900 md:dark:bg-transparent dark:border-slate-800"
      :class="uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <!-- Mobile Close Button -->
      <div class="flex items-center justify-between mb-6 md:hidden">
        <h2 class="font-bold text-lg text-slate-800 dark:text-white">{{ uiStore.t('sidebar_title') }}</h2>
        <button 
          @click="uiStore.setSidebar(false)"
          class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Categories Card (Premium box styling) -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 dark:bg-slate-800 dark:border-slate-700">
        <div>
          <h3 class="font-bold text-base text-accent dark:text-white flex items-center gap-2">
            <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {{ uiStore.t('main_categories') }}
          </h3>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ uiStore.t('sidebar_subtitle') }}</p>
        </div>

        <nav class="space-y-1">
          <button
            @click="handleCategorySelect(null)"
            class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200"
            :class="!categoryStore.selectedCategory ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700/50'"
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
            class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex flex-col transition-all duration-200"
            :class="categoryStore.selectedCategory?.id === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700/50'"
          >
            <div class="flex items-center justify-between w-full">
              <span>{{ cat.name }}</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <span 
              class="text-xxs font-normal mt-0.5 line-clamp-1"
              :class="categoryStore.selectedCategory?.id === cat.id ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'"
            >
              {{ cat.description }}
            </span>
          </button>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useCategoryStore } from '../../stores/categories'
import { useUiStore } from '../../stores/ui'
import { useRouter } from 'vue-router'

const categoryStore = useCategoryStore()
const uiStore = useUiStore()
const router = useRouter()

const handleCategorySelect = (category) => {
  categoryStore.selectCategory(category)
  uiStore.setSidebar(false)
  
  // Navigate to list berita with category param
  router.push({ 
    path: '/berita', 
    query: category ? { category: category.slug } : {} 
  })
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
