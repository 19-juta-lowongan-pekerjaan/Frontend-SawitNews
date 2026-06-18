<template>
  <div v-if="articles && articles.length > 0" class="relative rounded-3xl overflow-hidden shadow-lg h-[340px] md:h-[450px] bg-slate-900 mb-8 group">
    <!-- Carousel Track -->
    <div class="relative w-full h-full">
      <div 
        v-for="(slide, index) in articles" 
        :key="slide.id"
        v-show="currentIndex === index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      >
        <!-- Background Image with Overlay -->
        <img 
          :src="slide.featuredImage" 
          class="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700" 
          :alt="slide.title"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        
        <!-- Slide Content (Bottom-aligned) -->
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white space-y-3 md:space-y-4 max-w-3xl">
          <!-- Tag -->
          <span class="inline-flex items-center gap-1 bg-secondary text-accent text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow">
            <svg class="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {{ slide.categoryName }}
          </span>
          
          <!-- Title -->
          <h2 class="text-xl md:text-3xl font-extrabold tracking-tight hover:text-secondary-light transition-colors leading-tight">
            <router-link :to="`/berita/${slide.slug}`">
              {{ slide.title }}
            </router-link>
          </h2>
          
          <!-- Summary -->
          <p class="text-xs md:text-sm text-slate-200 line-clamp-2 opacity-90 font-medium">
            {{ slide.summary }}
          </p>
          
          <!-- Author and Time -->
          <div class="flex items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
            <span class="flex items-center gap-1.5">
              <img 
                :src="slide.author?.avatar || 'https://www.gravatar.com/avatar/?d=mp'" 
                class="h-6 w-6 rounded-full object-cover ring-2 ring-white/10" 
                @error="(e) => e.target.src = 'https://www.gravatar.com/avatar/?d=mp'"
              />
              {{ slide.isAnonymous ? 'Anonymous' : (slide.authorDisplayName || slide.author?.displayName || slide.author?.username || '') }}
            </span>
            <span>•</span>
            <span>{{ formatDate(slide.publishedAt) }}</span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <svg class="h-4 w-4 text-red-500 fill-red-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {{ slide.likes }} Suka
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows (Shown on hover) -->
    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 right-6 flex space-x-2">
      <button 
        v-for="(_, index) in articles" 
        :key="index"
        @click="currentIndex = index"
        class="h-2 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'w-6 bg-secondary' : 'w-2 bg-white/50'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDate } from '../../utils/formatters'

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.articles.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.articles.length) % props.articles.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
