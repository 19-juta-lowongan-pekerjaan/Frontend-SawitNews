<template>
  <div class="user-badges-container space-y-3">
    <h4 class="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
      <svg class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 113.536 0V21h-2v-3.07a5.047 5.047 0 01-1.536-.37z" />
      </svg>
      {{ uiStore.t('achievement_badges') }} ({{ badges.length }})
    </h4>
    
    <div class="flex flex-wrap gap-2.5">
      <div 
        v-for="badgeName in badges" 
        :key="badgeName"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all duration-300 hover:scale-105 border border-white/20 select-none cursor-help"
        :class="[getBadge(badgeName).bg, getBadge(badgeName).text]"
        :title="getTooltipText(badgeName)"
      >
        <span class="w-4 h-4 flex items-center justify-center" v-html="getBadge(badgeName).icon"></span>
        <span>{{ translateBadge(badgeName) }}</span>
      </div>
      
      <!-- Fallback empty state -->
      <p v-if="badges.length === 0" class="text-xs text-gray-400 dark:text-gray-500 italic">
        {{ uiStore.t('no_badges_earned') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { getBadge } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

defineProps({
  badges: {
    type: Array,
    required: true,
    default: () => []
  }
})

const translateBadge = (name) => {
  const key = `badge_${name.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key)
}

const getTooltipText = (name) => {
  const key = `badge_${name.toLowerCase().replace(/ /g, '_')}_desc`
  return uiStore.t(key)
}
</script>
