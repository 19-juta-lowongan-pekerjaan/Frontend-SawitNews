<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
          <span class="h-6 w-1 bg-primary rounded-full"></span>
          {{ t('my_articles_title') }}
        </h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {{ t('my_articles_subtitle') }}
        </p>
      </div>
      <router-link 
        to="/buat-artikel"
        class="inline-flex items-center px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200 transform active:scale-95 gap-1.5"
      >
        <span>{{ t('write_article') }}</span>
      </router-link>
    </div>

    <!-- Tabs Header -->
    <div class="border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-2">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all duration-150 relative border-b-2"
        :class="activeTab === tab.id 
          ? 'border-primary text-primary dark:text-white dark:border-white' 
          : 'border-transparent text-gray-400 hover:text-slate-600 dark:hover:text-slate-300'"
      >
        {{ tab.name }}
        <span class="ml-1 bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full text-xxs font-black dark:bg-slate-900 dark:text-slate-400">
          {{ getArticlesByTab(tab.id).length }}
        </span>
      </button>
    </div>

    <LoadingSpinner :visible="articleStore.loading" />

    <!-- Articles content list -->
    <div v-show="!articleStore.loading" class="space-y-4">
      <div 
        v-for="art in getArticlesByTab(activeTab)" 
        :key="art.id"
        class="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-sm hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700"
      >
        <!-- Card Left Info -->
        <div class="flex gap-4 items-center">
          <img :src="getImageUrl(art.featuredImage)" class="w-24 h-16 rounded-xl object-cover" />
          <div class="space-y-1">
            <h3 class="font-extrabold text-sm text-slate-800 dark:text-white line-clamp-1">
              {{ art.title }}
            </h3>
            <div class="flex items-center gap-3 text-xxs text-gray-400 dark:text-gray-500 font-semibold">
              <span class="px-2 py-0.5 bg-slate-50 rounded-full dark:bg-slate-900 text-slate-500">{{ art.categoryName }}</span>
              <span>{{ t('art_views') }}: {{ art.views }}</span>
              <span>{{ t('art_likes') }}: {{ art.likes }}</span>
            </div>
            
            <!-- Rejection Reason box -->
            <p v-if="art.status === 'REJECTED' && art.rejectionReason" class="text-xxs font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded-md mt-1">
              {{ t('rejection_reason_prefix') }} "{{ art.rejectionReason }}"
            </p>
          </div>
        </div>

        <!-- Card Right Actions -->
        <div class="flex gap-2 items-center w-full sm:w-auto justify-end border-t sm:border-transparent pt-3 sm:pt-0">
          <!-- View page -->
          <router-link 
            v-if="art.status === 'PUBLISHED'"
            :to="`/berita/${art.slug}`" 
            class="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-gray-100 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300 transition-all text-xs font-bold"
            :title="uiStore.lang === 'id' ? 'Lihat Berita' : 'View News'"
          >
            {{ t('view_news') }}
          </router-link>

          <!-- Edit -->
          <router-link 
            :to="`/edit-artikel/${art.id}`" 
            class="p-2 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 text-blue-600 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400 transition-all text-xs font-bold"
            :title="uiStore.lang === 'id' ? 'Edit Artikel' : 'Edit Article'"
          >
            {{ uiStore.lang === 'id' ? 'Edit' : 'Edit' }}
          </router-link>

          <!-- Delete -->
          <button 
            @click="handleDelete(art.id)"
            class="p-2 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 text-red-600 dark:hover:bg-red-950/20 transition-all text-xs font-bold"
            :title="uiStore.lang === 'id' ? 'Hapus Artikel' : 'Delete Article'"
          >
            {{ t('delete_btn') }}
          </button>
        </div>
      </div>

      <!-- Empty state inside tab -->
      <div 
        v-if="getArticlesByTab(activeTab).length === 0"
        class="py-12 text-center text-gray-400 dark:text-gray-500 italic bg-white border border-gray-100 rounded-3xl dark:bg-slate-800 dark:border-slate-700"
      >
        {{ t('empty_articles') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import { getImageUrl } from '../utils/formatters'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const articleStore = useArticleStore()
const uiStore = useUiStore()
const activeTab = ref('all')

const t = (key) => {
  const localTranslations = {
    id: {
      my_articles_title: 'Karya Artikel Saya',
      my_articles_subtitle: 'Kelola draf, artikel terbit, antrean verifikasi, dan pantau status tulisan Anda',
      write_article: 'Tulis Artikel Baru',
      tab_all: 'Semua Artikel',
      tab_published: 'Telah Terbit',
      tab_pending: 'Menunggu Verifikasi',
      tab_draft: 'Draf',
      tab_rejected: 'Ditolak',
      art_views: 'Views',
      art_likes: 'Likes',
      rejection_reason_prefix: 'Alasan Penolakan:',
      delete_confirm: 'Apakah Anda yakin ingin menghapus artikel ini secara permanen?',
      empty_articles: 'Tidak ada artikel di tab ini.',
      view_news: 'Lihat',
      delete_btn: 'Hapus'
    },
    en: {
      my_articles_title: 'My Articles Title',
      my_articles_subtitle: 'Manage drafts, published articles, verification queue, and monitor your writing status',
      write_article: 'Write New Article',
      tab_all: 'All Articles',
      tab_published: 'Published',
      tab_pending: 'Pending Verification',
      tab_draft: 'Draft',
      tab_rejected: 'Rejected',
      art_views: 'Views',
      art_likes: 'Likes',
      rejection_reason_prefix: 'Rejection Reason:',
      delete_confirm: 'Are you sure you want to permanently delete this article?',
      empty_articles: 'No articles in this tab.',
      view_news: 'View',
      delete_btn: 'Delete'
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

const tabs = computed(() => [
  { id: 'all', name: t('tab_all') },
  { id: 'published', name: t('tab_published') },
  { id: 'pending', name: t('tab_pending') },
  { id: 'draft', name: t('tab_draft') },
  { id: 'rejected', name: t('tab_rejected') }
])

onMounted(() => {
  articleStore.fetchMyArticles()
})

const getArticlesByTab = (tabId) => {
  const list = articleStore.myArticles
  if (tabId === 'published') return list.filter(a => a.status === 'PUBLISHED')
  if (tabId === 'pending') return list.filter(a => a.status === 'PENDING')
  if (tabId === 'draft') return list.filter(a => a.status === 'DRAFT')
  if (tabId === 'rejected') return list.filter(a => a.status === 'REJECTED')
  return list
}

const handleDelete = async (id) => {
  if (confirm(t('delete_confirm'))) {
    try {
      await articleStore.deleteArticle(id)
      articleStore.fetchMyArticles()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
