<template>
  <div class="space-y-8 py-4">
    <!-- Header -->
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
          <span class="h-6 w-1 bg-primary rounded-full"></span>
          {{ t('rank_page_title') }}
        </h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {{ t('rank_page_subtitle') }}
        </p>
      </div>
    </div>

    <!-- Active User Status Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Dynamic User progress -->
      <div class="lg:col-span-1">
        <UserRank :rank="authStore.userRank" :stats="authStore.user?.stats" />
      </div>

      <!-- Right: XP earning rules list -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700 space-y-4">
        <h3 class="font-bold text-base text-accent dark:text-white flex items-center gap-1.5">
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
          {{ t('rank_earn_title') }}
        </h3>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          {{ t('rank_earn_subtitle') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Article Publish -->
          <div class="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 space-y-2">
            <span class="inline-block text-primary">
               <svg class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </span>
            <h4 class="font-bold text-xs text-slate-800 dark:text-white">{{ t('rank_rule_write') }}</h4>
            <p class="text-sm font-black text-primary">+50 XP</p>
            <p class="text-[10px] text-gray-400">{{ t('rank_rule_write_desc') }}</p>
          </div>

          <!-- View -->
          <div class="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 space-y-2">
            <span class="inline-block text-primary">
              <svg class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <h4 class="font-bold text-xs text-slate-800 dark:text-white">{{ t('rank_rule_readers') }}</h4>
            <p class="text-sm font-black text-primary">+1 XP</p>
            <p class="text-[10px] text-gray-400">{{ t('rank_rule_readers_desc') }}</p>
          </div>

          <!-- Like -->
          <div class="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 space-y-2">
            <span class="inline-block text-primary">
              <svg class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <h4 class="font-bold text-xs text-slate-800 dark:text-white">{{ t('rank_rule_likes') }}</h4>
            <p class="text-sm font-black text-primary">+5 XP</p>
            <p class="text-[10px] text-gray-400">{{ t('rank_rule_likes_desc') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tiers Cards Grid (Matching screenshot layout) -->
    <div class="space-y-6">
      <h2 class="font-extrabold text-xl text-accent dark:text-white flex items-center gap-2">
        <span class="h-6 w-1 bg-secondary rounded-full"></span>
        {{ t('rank_benefits_title') }}
      </h2>

      <!-- Grid layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="tier in tiers" 
          :key="tier.id"
          class="bg-white rounded-3xl border shadow-sm p-6 space-y-4 dark:bg-slate-800 flex flex-col justify-between relative hover:shadow-md transition-all"
          :class="tier.popular ? 'border-2 border-primary shadow-lg dark:border-primary hover:shadow-xl' : 'border-gray-100 dark:border-slate-700'"
        >
          <!-- Popular badge -->
          <span v-if="tier.popular" class="absolute top-0 right-6 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow tracking-wider">
            {{ uiStore.lang === 'id' ? 'Paling populer' : 'Most popular' }}
          </span>
          <!-- Highest badge -->
          <span v-if="tier.highest" class="absolute top-0 right-6 -translate-y-1/2 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow tracking-wider">
            {{ uiStore.lang === 'id' ? 'Rank tertinggi' : 'Highest rank' }}
          </span>

          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 flex items-center justify-center" :class="tier.iconColor" v-html="getBadge(tier.id).icon"></span>
              <div class="space-y-0.5">
                <h3 class="font-black text-lg text-slate-800 dark:text-white">{{ tier.name }}</h3>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ tier.desc }}</p>
              </div>
            </div>
            <!-- Points badge -->
            <span class="inline-block px-2.5 py-1 rounded-full text-xxs font-bold" :class="tier.colorClass">
              {{ tier.points }}
            </span>
            <!-- Benefits -->
            <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 font-medium">
              <li v-for="benefit in tier.benefits" :key="benefit" class="flex items-center gap-2">
                <span class="text-primary">•</span> {{ benefit }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'
import { getBadge } from '../utils/formatters'
import UserRank from '../components/users/UserRank.vue'

const authStore = useAuthStore()
const uiStore = useUiStore()

const t = (key) => {
  const localTranslations = {
    id: {
      rank_page_title: 'Tingkatan Pangkat & Reputasi Penulis',
      rank_page_subtitle: 'Pantau perkembangan Poin Reputasi (XP) Anda dan raih benefit kepenulisan yang lebih besar',
      rank_earn_title: 'Cara Memperoleh Poin Reputasi (XP)',
      rank_earn_subtitle: 'Reputasi dihitung berdasarkan keaktifan dan tingkat interaksi tulisan Anda pada platform SawitNews',
      rank_rule_write: 'Menulis Artikel',
      rank_rule_write_desc: 'per artikel terbit',
      rank_rule_readers: 'Jumlah Pembaca',
      rank_rule_readers_desc: 'per kali artikel dibaca',
      rank_rule_likes: 'Suka dari Pembaca',
      rank_rule_likes_desc: 'per tanda suka di artikel',
      rank_benefits_title: 'Benefit Berdasarkan Peringkat',
      badge_benih: 'Benih',
      badge_tunas: 'Tunas',
      badge_pelepah: 'Pelepah',
      badge_mahkota: 'Mahkota',
      badge_raja_sawit: 'Raja Sawit'
    },
    en: {
      rank_page_title: 'Author Rank Levels & Reputation',
      rank_page_subtitle: 'Monitor your Reputation Points (XP) progress and achieve greater writing benefits',
      rank_earn_title: 'How to Earn Reputation Points (XP)',
      rank_earn_subtitle: 'Reputation is calculated based on your activity and article engagement on SawitNews',
      rank_rule_write: 'Write Articles',
      rank_rule_write_desc: 'per published article',
      rank_rule_readers: 'Total Readers',
      rank_rule_readers_desc: 'per article view',
      rank_rule_likes: 'Likes from Readers',
      rank_rule_likes_desc: 'per like on article',
      rank_benefits_title: 'Benefits by Rank Tier',
      badge_benih: 'Seed',
      badge_tunas: 'Sprout',
      badge_pelepah: 'Frond',
      badge_mahkota: 'Crown',
      badge_raja_sawit: 'Sawit King'
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

const tiers = computed(() => [
  {
    id: 'Benih',
    name: t('badge_benih'),
    desc: uiStore.lang === 'id' ? 'Penulis baru, belum ada riwayat' : 'New writer, no history yet',
    points: uiStore.lang === 'id' ? '0 - 499 poin' : '0 - 499 points',
    colorClass: 'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400',
    iconColor: 'text-slate-400',
    benefits: [
      uiStore.lang === 'id' ? 'Submit 2 artikel/minggu' : 'Submit 2 articles/week',
      uiStore.lang === 'id' ? 'Prioritas antrian: standar' : 'Queue priority: standard',
      uiStore.lang === 'id' ? 'Tidak ada boost' : 'No boost',
      uiStore.lang === 'id' ? 'Badge abu-abu di profil' : 'Grey badge on profile'
    ]
  },
  {
    id: 'Tunas',
    name: t('badge_tunas'),
    desc: uiStore.lang === 'id' ? 'Penulis aktif, artikel mulai diterima' : 'Active writer, articles accepted',
    points: uiStore.lang === 'id' ? '500 - 1.999 poin' : '500 - 1,999 points',
    colorClass: 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400',
    iconColor: 'text-primary',
    benefits: [
      uiStore.lang === 'id' ? 'Submit 4 artikel/minggu' : 'Submit 4 articles/week',
      uiStore.lang === 'id' ? 'Boost ranking: +10%' : 'Ranking boost: +10%',
      uiStore.lang === 'id' ? 'Badge hijau di profil' : 'Green badge on profile',
      uiStore.lang === 'id' ? 'Review lebih cepat (-6 jam)' : 'Faster review (-6 hours)'
    ]
  },
  {
    id: 'Pelepah',
    name: t('badge_pelepah'),
    desc: uiStore.lang === 'id' ? 'Penulis terpercaya & konsisten' : 'Trusted & consistent writer',
    points: uiStore.lang === 'id' ? '2.000 - 7.999 poin' : '2,000 - 7,999 points',
    colorClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400',
    iconColor: 'text-amber-500',
    popular: true,
    benefits: [
      uiStore.lang === 'id' ? 'Submit 8 artikel/minggu' : 'Submit 8 articles/week',
      uiStore.lang === 'id' ? 'Boost ranking: +25%' : 'Ranking boost: +25%',
      uiStore.lang === 'id' ? 'Badge emas + terverifikasi' : 'Gold badge + verified',
      uiStore.lang === 'id' ? 'Artikel masuk "Pilihan Editor"' : 'Featured in "Editor\'s Choice"',
      uiStore.lang === 'id' ? 'Akses analitik artikel' : 'Access to article analytics'
    ]
  },
  {
    id: 'Mahkota',
    name: t('badge_mahkota'),
    desc: uiStore.lang === 'id' ? 'Kontributor elite SawitNews' : 'SawitNews elite contributor',
    points: uiStore.lang === 'id' ? '8.000 - 24.999 poin' : '8,000 - 24,999 points',
    colorClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400',
    iconColor: 'text-purple-650',
    benefits: [
      uiStore.lang === 'id' ? 'Submit tak terbatas' : 'Unlimited submissions',
      uiStore.lang === 'id' ? 'Boost ranking: +50%' : 'Ranking boost: +50%',
      uiStore.lang === 'id' ? 'Badge ungu + label "Elite"' : 'Purple badge + "Elite" label',
      uiStore.lang === 'id' ? 'Artikel di featured homepage' : 'Articles on featured homepage',
      uiStore.lang === 'id' ? 'Revenue share 5% dari iklan' : '5% ad revenue share'
    ]
  },
  {
    id: 'Raja Sawit',
    name: t('badge_raja_sawit'),
    desc: uiStore.lang === 'id' ? 'Top kontributor, diakui industri' : 'Top contributor, industry recognized',
    points: uiStore.lang === 'id' ? '25.000+ poin' : '25,000+ points',
    colorClass: 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400',
    iconColor: 'text-red-500',
    highest: true,
    benefits: [
      uiStore.lang === 'id' ? 'Semua fitur tak terbatas' : 'All features unlimited',
      uiStore.lang === 'id' ? 'Boost ranking: +100%' : 'Ranking boost: +100%',
      uiStore.lang === 'id' ? 'Badge emas + mahkota eksklusif' : 'Gold badge + exclusive crown',
      uiStore.lang === 'id' ? 'Slot iklan pribadi di artikel' : 'Personal ad slot on articles'
    ]
  }
])
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
