<template>
  <div class="max-w-4xl mx-auto py-4 space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800">
      <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
        <span class="h-6 w-1 bg-blue-500 rounded-full"></span>
        {{ t('edit_article_title') }}
      </h1>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {{ t('edit_article_subtitle') }}
      </p>
    </div>

    <!-- Article Edit Form -->
    <ArticleForm v-if="articleData" :initialData="articleData" @submit="handleSubmit" />
    <LoadingSpinner v-else :visible="true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import ArticleForm from '../components/articles/ArticleForm.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const router = useRouter()
const route = useRoute()
const articleStore = useArticleStore()
const uiStore = useUiStore()

const articleData = ref(null)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await articleStore.fetchArticle(id)
    if (articleStore.currentArticle) {
      articleData.value = { ...articleStore.currentArticle }
    } else {
      uiStore.showNotification('Artikel tidak ditemukan.', 'error')
      router.push('/artikel-saya')
    }
  }
})

const t = (key) => {
  const localTranslations = {
    id: {
      edit_article_title: 'Edit Artikel Sawit',
      edit_article_subtitle: 'Perbarui isi berita, perbaiki kesalahan ketik, atau lengkapi informasi artikel Anda'
    },
    en: {
      edit_article_title: 'Edit Sawit Article',
      edit_article_subtitle: 'Update your news content, fix typos, or complete your article information'
    }
  }
  const val = localTranslations[uiStore.lang]?.[key] || uiStore.t(key)
  if (val !== undefined && val !== null && val !== key) {
    return val
  }
  return key
}

const handleSubmit = async (data) => {
  try {
    const payload = new FormData()
    payload.append('title', data.title)
    payload.append('content', data.content)
    if (data.summary) payload.append('excerpt', data.summary)
    if (data.anonymous) payload.append('isAnonymous', data.anonymous)
    
    if (data.categoryId) {
      payload.append('categoryIds[]', data.categoryId)
    }
    
    if (data.featuredImageFile) {
      payload.append('featuredImage', data.featuredImageFile)
    }

    const updatedArticle = await articleStore.updateArticle(route.params.id, payload)
    if (!data.isDraft && updatedArticle) {
      try {
        await articleStore.publishArticle(updatedArticle.id)
      } catch (pubErr) {
        console.error('Failed to publish updated article', pubErr)
      }
    }
    router.push('/artikel-saya')
  } catch (err) {
    console.error('Failed to update article', err)
  }
}
</script>
