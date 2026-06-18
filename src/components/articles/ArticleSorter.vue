<template>
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4 dark:bg-slate-800 dark:border-slate-700">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <!-- Search Bar -->
      <div class="relative w-full md:max-w-md">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          type="text" 
          v-model="searchQuery"
          @input="handleInput"
          :placeholder="uiStore.t('search_articles')" 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
        />
      </div>

      <!-- Filters Group -->
      <div class="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
        <!-- Category Dropdown -->
        <div class="w-full sm:w-auto">
          <select 
            v-model="selectedCategory"
            @change="handleFilterChange"
            class="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300"
          >
            <option value="">{{ uiStore.t('all_categories') }}</option>
            <option 
              v-for="cat in categories" 
              :key="cat.id" 
              :value="cat.slug"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Sort Dropdown -->
        <div class="w-full sm:w-auto">
          <select 
            v-model="sortBy"
            @change="handleFilterChange"
            class="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300"
          >
            <option value="latest">{{ uiStore.t('sort_latest') }}</option>
            <option value="trending">{{ uiStore.t('sort_trending') }}</option>
            <option value="likes">{{ uiStore.t('sort_likes') }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  initialCategory: {
    type: String,
    default: ''
  },
  initialSort: {
    type: String,
    default: 'latest'
  },
  initialSearch: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['filter-change'])

const searchQuery = ref(props.initialSearch)
const selectedCategory = ref(props.initialCategory)
const sortBy = ref(props.initialSort)

// Watch for prop changes (e.g. from sidebar clicks)
watch(() => props.initialCategory, (newVal) => {
  selectedCategory.value = newVal
})

let debounceTimer = null
const handleInput = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    handleFilterChange()
  }, 400)
}

const handleFilterChange = () => {
  emit('filter-change', {
    search: searchQuery.value,
    category: selectedCategory.value,
    sortBy: sortBy.value
  })
}
</script>
