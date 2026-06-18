<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800">
      <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
        <span class="h-6 w-1 bg-primary rounded-full"></span>
        {{ t('article_list_title') }}
      </h1>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {{ t('article_list_subtitle') }}
      </p>
    </div>

    <!-- Filters Section -->
    <ArticleSorter 
      :categories="categoryStore.categories"
      :initial-category="filters.category"
      :initial-sort="filters.sortBy"
      :initial-search="filters.search"
      @filter-change="handleFilterChange"
    />

    <!-- Articles Content -->
    <LoadingSpinner :visible="articleStore.loading" />

    <ArticleList v-show="!articleStore.loading" :articles="articleStore.articles" />

    <!-- Pagination -->
    <Pagination 
      v-show="!articleStore.loading"
      :current="articleStore.pagination.page" 
      :total="articleStore.pagination.total" 
      :limit="articleStore.pagination.limit" 
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articles'
import { useCategoryStore } from '../stores/categories'
import { useUiStore } from '../stores/ui'
import ArticleSorter from '../components/articles/ArticleSorter.vue'
import ArticleList from '../components/articles/ArticleList.vue'
import Pagination from '../components/common/Pagination.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const uiStore = useUiStore()

const t = (key) => {
  const localTranslations = {
    id: {
      article_list_title: 'Daftar Berita Kelapa Sawit',
      article_list_subtitle: 'Jelajahi seluruh arsip informasi dan berita kelapa sawit terupdate'
    },
    en: {
      article_list_title: 'Sawit News List',
      article_list_subtitle: 'Explore the complete archive of updated sawit news and information'
    }
  }
  const val = localTranslations[uiStore.lang]?.[key] || uiStore.t(key)
  if (val !== undefined && val !== null && val !== key) {
    return val
  }
  
  if (typeof key === 'string' && (key.includes('_') || key.includes('-') || /^[a-z]+[A-Z]/.test(key))) {
    const words = key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]/g, ' ')
      .split(/\s+/)
    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return key
}

const filters = reactive({
  search: route.query.search || '',
  category: route.query.category || '',
  sortBy: route.query.sortBy || 'latest',
  page: parseInt(route.query.page) || 1
})

onMounted(() => {
  categoryStore.fetchCategories()
  fetchData()
})

// Sync query params change (e.g. user clicks category in header/sidebar)
watch(() => route.query, (newQuery) => {
  filters.search = newQuery.search || ''
  filters.category = newQuery.category || ''
  filters.sortBy = newQuery.sortBy || 'latest'
  filters.page = parseInt(newQuery.page) || 1
  fetchData()
}, { deep: true })

const fetchData = () => {
  articleStore.fetchArticles({
    search: filters.search,
    category: filters.category,
    sortBy: filters.sortBy,
    page: filters.page
  })
}

const handleFilterChange = (newFilters) => {
  filters.search = newFilters.search
  filters.category = newFilters.category
  filters.sortBy = newFilters.sortBy
  filters.page = 1 // reset page on filter change
  
  updateRouterQuery()
}

const handlePageChange = (page) => {
  filters.page = page
  updateRouterQuery()
}

const updateRouterQuery = () => {
  router.push({
    path: route.path,
    query: {
      search: filters.search || undefined,
      category: filters.category || undefined,
      sortBy: filters.sortBy !== 'latest' ? filters.sortBy : undefined,
      page: filters.page !== 1 ? filters.page : undefined
    }
  })
}
</script>
