<template>
  <div class="user-rank bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 dark:bg-slate-800 dark:border-slate-700">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('current_rank') }}</span>
        <h3 class="text-xl font-black text-accent dark:text-white flex items-center gap-2">
          <span class="w-5 h-5 flex items-center justify-center" v-html="currentBadge.icon"></span>
          <span :style="{ color: currentBadge.color }">{{ translateRank(rank) }}</span>
        </h3>
      </div>
      <!-- Badge Badge Level Visual -->
      <span 
        class="h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner border border-white/20"
        :class="currentBadge.bg"
      >
        <span class="w-7 h-7 flex items-center justify-center text-slate-500" v-html="currentBadge.icon"></span>
      </span>
    </div>

    <!-- Progress to next level -->
    <div class="space-y-2 pt-2">
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-gray-500 dark:text-gray-400">{{ uiStore.t('writer_points') }}: {{ xp }} XP</span>
        <span v-if="nextRank" class="text-slate-400 dark:text-slate-500">{{ uiStore.t('next_rank_prefix') }} {{ translateRank(nextRank) }} ({{ percentage }}%)</span>
        <span v-else class="text-primary flex items-center gap-1">
          {{ uiStore.t('max_level') }}
          <svg class="h-4 w-4 inline-block text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
            <path d="M3 20h18" />
          </svg>
        </span>
      </div>
      
      <!-- Progress Bar Container -->
      <div class="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/20 shadow-inner">
        <div 
          class="bg-gradient-to-r from-primary to-green-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
      
      <!-- Next tier info -->
      <p v-if="nextRank" class="text-xxs text-gray-400 dark:text-gray-500">
        {{ uiStore.t('need_xp_prefix') }} <span class="font-bold text-slate-600 dark:text-slate-300">{{ remainingXp }} XP</span> {{ uiStore.t('need_xp_suffix') }} <span class="font-bold text-primary">{{ translateRank(nextRank) }}</span>. {{ uiStore.t('rank_action_tip') }}
      </p>
      <p v-else class="text-xxs text-primary font-medium">
        {{ uiStore.t('max_level_congrats') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BADGE_DETAILS } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const props = defineProps({
  rank: {
    type: String,
    required: true,
    default: 'Benih'
  },
  stats: {
    type: Object,
    default: () => ({ articles: 0, views: 0, likes: 0 })
  }
})

const translateRank = (name) => {
  if (!name) return ''
  const key = `badge_${name.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key)
}

// Calculate XP: 1 article = 50 XP, 1 view = 1 XP, 1 like = 5 XP
const xp = computed(() => {
  const articles = props.stats?.articles || 0
  const views = props.stats?.views || 0
  const likes = props.stats?.likes || 0
  return (articles * 50) + (views * 1) + (likes * 5)
})

const currentBadge = computed(() => {
  return BADGE_DETAILS[props.rank] || { 
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, 
    color: '#9CA3AF', 
    bg: 'bg-gray-100' 
  }
})

// XP Tier Levels
const TIER_THRESHOLDS = [
  { rank: 'Benih', threshold: 0 },
  { rank: 'Tunas', threshold: 500 },
  { rank: 'Pelepah', threshold: 2000 },
  { rank: 'Mahkota', threshold: 8000 },
  { rank: 'Raja Sawit', threshold: 25000 }
]

const currentTierIndex = computed(() => {
  const idx = TIER_THRESHOLDS.findIndex(t => t.rank === props.rank)
  return idx !== -1 ? idx : 0
})

const nextRank = computed(() => {
  if (currentTierIndex.value < TIER_THRESHOLDS.length - 1) {
    return TIER_THRESHOLDS[currentTierIndex.value + 1].rank
  }
  return null
})

const nextThreshold = computed(() => {
  if (currentTierIndex.value < TIER_THRESHOLDS.length - 1) {
    return TIER_THRESHOLDS[currentTierIndex.value + 1].threshold
  }
  return 0
})

const currentThreshold = computed(() => {
  return TIER_THRESHOLDS[currentTierIndex.value].threshold
})

const percentage = computed(() => {
  if (!nextRank.value) return 100
  const range = nextThreshold.value - currentThreshold.value
  const progress = xp.value - currentThreshold.value
  const percent = Math.min(100, Math.max(0, Math.floor((progress / range) * 100)))
  return percent
})

const remainingXp = computed(() => {
  if (!nextRank.value) return 0
  return Math.max(0, nextThreshold.value - xp.value)
})
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
