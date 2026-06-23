<template>
  <article class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full dark:bg-slate-800 dark:border-slate-700 dark:hover:shadow-none">
    <!-- Image Area -->
    <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-900 group">
      <router-link :to="`/berita/${article.slug}`" class="block w-full h-full">
        <img 
          :src="getImageUrl(article.featuredImage) || 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=600&q=80'" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          :alt="article.title || 'Article'"
          loading="lazy"
          @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1597430162074-a1185088574e?auto=format&fit=crop&w=600&q=80'"
        />
      </router-link>
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        {{ article.categoryName }}
      </span>
      <!-- Premium Overlay (if featured) -->
      <span v-if="article.featured" class="absolute top-4 right-4 bg-secondary text-accent text-xxs font-black px-2.5 py-1.5 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
        <svg class="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        {{ uiStore.lang === 'id' ? 'Unggulan' : 'Featured' }}
      </span>
    </div>

    <!-- Content Area -->
    <div class="p-6 flex flex-col flex-1 space-y-3">
      <!-- Title -->
      <h3 class="text-lg font-bold text-accent hover:text-primary transition-colors duration-200 line-clamp-2 dark:text-white leading-snug">
        <router-link :to="`/berita/${article.slug}`">
          {{ article.title }}
        </router-link>
      </h3>

      <!-- Summary -->
      <p class="text-sm text-gray-500 line-clamp-2 dark:text-gray-400 flex-1">
        {{ article.summary }}
      </p>

      <!-- Author and Stats -->
      <div class="pt-4 border-t border-gray-50 dark:border-slate-700/50 space-y-3">
        <!-- Author Info -->
        <div class="flex items-center gap-2">
          <img 
            :src="getImageUrl(article.author?.avatar) || getDefaultAvatar(article.author?.displayName || article.author?.username || '?')" 
            class="h-7 w-7 rounded-full object-cover"
            alt="Author Avatar"
            @error="(e) => e.target.src = getDefaultAvatar(article.author?.displayName || article.author?.username || '?')"
          />
          <div class="flex flex-col text-xxs leading-none">
            <span class="font-bold text-gray-700 dark:text-gray-200">
              {{ article.isAnonymous ? uiStore.t('anonymous') : (article.authorDisplayName || article.author?.displayName || article.author?.username || '') }}
            </span>
            <span v-if="!article.isAnonymous && article.author?.rank" class="text-primary font-semibold mt-0.5">
              {{ translateRank(article.author.rank) }}
            </span>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="flex items-center justify-between text-xxs text-gray-400 dark:text-gray-500 font-medium">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ article.views }}
            </span>
            <span class="flex items-center gap-1">
              <svg class="h-3.5 w-3.5 text-red-500 fill-red-500" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {{ article.likes }}
            </span>
            <span class="flex items-center gap-1">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {{ article.readingTime }} {{ uiStore.lang === 'id' ? 'mnt' : 'min' }}
            </span>
          </div>
          
          <span>{{ formatRelativeDate(article.publishedAt) }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatRelativeDate, getImageUrl, getDefaultAvatar } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const translateRank = (rank) => {
  if (!rank) return ''
  // rank can be a string OR an object {id, name, ...}
  const rankName = typeof rank === 'string' ? rank : (rank?.name || '')
  if (!rankName) return ''
  const key = `badge_${rankName.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key) || rankName
}

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>


<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
