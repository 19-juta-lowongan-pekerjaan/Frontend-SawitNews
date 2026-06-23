<template>
  <div class="max-w-4xl mx-auto py-4 space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800">
      <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
        <span class="h-6 w-1 bg-primary rounded-full"></span>
        {{ t('create_article_title') }}
      </h1>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {{ t('create_article_subtitle') }}
      </p>
    </div>

    <!-- Article Creation Form -->
    <ArticleForm @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import ArticleForm from '../components/articles/ArticleForm.vue'

const router = useRouter()
const articleStore = useArticleStore()
const uiStore = useUiStore()

const t = (key) => {
  const localTranslations = {
    id: {
      create_article_title: 'Tulis Artikel Sawit Baru',
      create_article_subtitle: 'Bagikan berita, opini, riset lapangan, atau update pasar kelapa sawit Anda kepada komunitas'
    },
    en: {
      create_article_title: 'Write New Sawit Article',
      create_article_subtitle: 'Share your news, opinions, field research, or sawit market updates with the community'
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

    const newArticle = await articleStore.createArticle(payload)
    if (!data.isDraft && newArticle && newArticle.id) {
      try {
        await articleStore.publishArticle(newArticle.id)
      } catch (pubErr) {
        console.error('Failed to publish created article', pubErr)
      }
    }
    router.push('/artikel-saya')
  } catch (err) {
    console.error('Failed to create article', err)
  }
}
</script>
