<template>
  <div v-if="article" class="article-detail space-y-8">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 dark:bg-slate-800 dark:border-slate-700">
      <!-- Category & Reading Time -->
      <div class="flex items-center gap-3 text-sm font-semibold text-primary">
        <span>{{ article.categoryName }}</span>
        <span class="text-slate-300">•</span>
        <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {{ article.readingTime }} {{ uiStore.t('minutes_read') }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-2xl md:text-4xl font-extrabold text-accent dark:text-white mt-3 leading-tight">
        {{ article.title }}
      </h1>

      <!-- Metadata & Author Info -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-slate-50 dark:border-slate-700/50 my-6">
        <!-- Author Profile -->
        <div class="flex items-center gap-3">
          <img 
            :src="article.author?.avatar || 'https://www.gravatar.com/avatar/?d=mp'" 
            class="h-11 w-11 rounded-full object-cover ring-2 ring-primary/10"
            alt="Author Avatar"
          />
          <div class="flex flex-col leading-tight">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-slate-800 dark:text-white">
              {{ article.isAnonymous ? uiStore.t('anonymous') : (article.authorDisplayName || article.author?.displayName || article.author?.username || '') }}
              </span>
              <span v-if="article.anonymous" class="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium dark:bg-slate-700 dark:text-gray-300 gap-1">
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                {{ uiStore.t('anonymous') }}
              </span>
            </div>
            <!-- Rank & Badge Preview -->
            <div v-if="!article.isAnonymous && article.author?.rank" class="flex items-center gap-1 mt-0.5">
              <span class="text-xs font-semibold text-primary">
                {{ translateRank(article.author.rank) }}
              </span>
              <span v-if="article.author?.badges?.length" class="text-slate-300">•</span>
              <!-- Render small badge icons -->
              <div v-if="article.author?.badges?.length" class="flex items-center gap-0.5">
                <span 
                  v-for="badgeName in article.author.badges.slice(0, 3)" 
                  :key="badgeName" 
                  :title="translateBadge(badgeName)"
                  class="w-3.5 h-3.5 flex items-center justify-center"
                  v-html="getBadge(badgeName).icon"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date & Views -->
        <div class="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.publishedAt) }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ article.views }} {{ uiStore.t('readers_count') }}
          </span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="rounded-3xl overflow-hidden shadow-lg aspect-[21/10] bg-slate-100 dark:bg-slate-900 border border-gray-50 dark:border-slate-800">
        <img 
          :src="getImageUrl(article.featuredImage) || 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=1200&q=80'" 
          class="w-full h-full object-cover" 
          :alt="article.title"
          @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=1200&q=80'"
        />
      </div>

      <!-- Article Rich Text Body -->
      <div 
        class="prose prose-slate max-w-none mt-8 dark:prose-invert prose-headings:text-accent prose-headings:font-extrabold prose-p:leading-relaxed prose-a:text-primary hover:prose-a:underline"
        v-html="article.content"
      ></div>

      <!-- Article Action Footer -->
      <div class="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700/50 mt-10">
        <!-- Likes -->
        <button 
          @click="likeArticle"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-white hover:bg-red-50 hover:text-red-500 transition-all duration-200 shadow-sm text-sm font-bold text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-red-950/20 transform active:scale-95"
        >
          <svg class="h-5 w-5 text-red-500 fill-red-500 animate-pulse" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          {{ uiStore.t('like') }} ({{ article.likes }})
        </button>

        <!-- Share & Socials -->
        <button 
          @click="shareArticle"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm text-sm font-bold text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 transform active:scale-95"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l5.228-2.614M14 6h6m0 0v6m0-6L10 14M8.684 13.258l5.228 2.614" />
          </svg>
          {{ uiStore.t('share_news') }}
        </button>
      </div>
    </div>

    <!-- Related Articles Grid (Optional Premium Feature) -->
    <div class="max-w-4xl mx-auto space-y-4">
      <h3 class="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2 pl-2">
        <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {{ uiStore.t('related_news') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="rel in relatedArticles" :key="rel.id" class="h-full">
          <router-link :to="`/berita/${rel.slug}`" class="block h-full group bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all dark:bg-slate-800 dark:border-slate-700">
            <img 
              :src="getImageUrl(rel.featuredImage) || 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=200&q=80'" 
              class="w-24 h-16 rounded-xl object-cover flex-shrink-0"
              @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=200&q=80'"
            />
            <div class="flex-1 space-y-1">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                {{ rel.title }}
              </h4>
              <span class="text-xxs text-slate-400 dark:text-slate-500 font-semibold">{{ rel.categoryName }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Comments Section Container -->
    <div class="max-w-4xl mx-auto">
      <CommentSection :articleId="article.id" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useArticleStore } from '../../stores/articles'
import { useUiStore } from '../../stores/ui'
import { formatDate, getBadge, getImageUrl } from '../../utils/formatters'
import CommentSection from '../comments/CommentSection.vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const articleStore = useArticleStore()
const uiStore = useUiStore()

const translateRank = (rank) => {
  if (!rank) return ''
  const rankName = typeof rank === 'string' ? rank : (rank?.name || '')
  if (!rankName) return ''
  const key = `badge_${rankName.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key) || rankName
}

const translateBadge = (name) => {
  if (!name) return ''
  const key = `badge_${name.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key) || name
}

const relatedArticles = computed(() => {
  return articleStore.articles
    .filter(a => a.id !== props.article.id && a.categoryId === props.article.categoryId && a.status === 'PUBLISHED')
    .slice(0, 2)
})

const likeArticle = () => {
  articleStore.likeArticle(props.article.id)
  uiStore.showNotification(uiStore.t('liked_notification'), 'success')
}

const shareArticle = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url)
    .then(() => {
      uiStore.showNotification(uiStore.t('link_copied_notification'), 'success')
    })
    .catch(() => {
      uiStore.showNotification(uiStore.t('copy_failed_notification'), 'error')
    })
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
