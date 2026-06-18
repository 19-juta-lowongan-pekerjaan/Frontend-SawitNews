<template>
  <div 
    class="bg-white rounded-3xl border p-6 md:p-8 flex flex-col justify-between h-full relative transition-all duration-300 transform hover:-translate-y-2 dark:bg-slate-800"
    :class="[
      plan.popular 
        ? plan.tag === 'Terlaris'
          ? 'border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/5 dark:shadow-none ring-2 ring-blue-500/10 scale-[1.02]' 
          : 'border-amber-500 dark:border-amber-400 shadow-xl shadow-amber-500/5 dark:shadow-none ring-2 ring-amber-500/10 scale-[1.02]'
        : 'border-gray-100 shadow-sm hover:shadow-lg dark:border-slate-700'
    ]"
  >
    <!-- Popular badge tag -->
    <span 
      v-if="plan.popular || plan.tag" 
      class="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 text-white text-xxs font-black tracking-widest uppercase px-3 py-1 rounded-full shadow"
      :class="plan.tag === 'Terlaris' ? 'bg-blue-600' : 'bg-red-600'"
    >
      {{ translatePlanTag(plan.tag || 'Terlaris') }}
    </span>

    <div class="space-y-6">
      <!-- Plan Header -->
      <div class="space-y-2 text-center sm:text-left">
        <h3 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ translatePlanName(plan.name) }}</h3>
        <div class="flex flex-col items-center sm:items-start leading-none">
          <span class="text-3xl font-black text-slate-800 dark:text-white">{{ displayPrice }}</span>
          <span class="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-1">{{ translatePlanBilling(plan.billingText) }}</span>
        </div>
      </div>

      <!-- Feature list -->
      <ul class="space-y-2.5">
        <li 
          v-for="(feature, idx) in plan.features" 
          :key="idx"
          class="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-300 leading-normal"
        >
          <span class="text-primary flex-shrink-0 mt-0.5">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span>{{ translatePlanFeature(feature) }}</span>
        </li>
      </ul>
    </div>

    <!-- Actions CTA -->
    <div class="pt-6 mt-auto">
      <button 
        v-if="current"
        disabled
        class="w-full py-3 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 font-bold text-xs rounded-2xl cursor-not-allowed select-none text-center"
      >
        {{ uiStore.t('sub_plan_active') }}
      </button>
      <button 
        v-else
        @click="$emit('select', plan)"
        class="w-full py-3 text-xs font-bold rounded-2xl shadow transition-all duration-200 transform active:scale-95 text-center flex items-center justify-center gap-1.5"
        :class="[
          plan.popular
            ? plan.tag === 'Terlaris'
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              : 'bg-amber-500 hover:bg-amber-650 text-white shadow-amber-500/20'
            : 'bg-white border border-gray-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
        ]"
      >
        {{ translatePlanCta(plan.ctaText) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const props = defineProps({
  plan: {
    type: Object,
    required: true
  },
  current: {
    type: Boolean,
    default: false
  }
})

const translatePlanName = (name) => {
  const mapping = {
    'Gratis': uiStore.lang === 'id' ? 'Gratis' : 'Free',
    'Starter': 'Starter',
    'Premium': 'Premium',
    'Pro': 'Pro',
    'Boost Artikel': uiStore.lang === 'id' ? 'Boost Artikel' : 'Boost Article',
    'Fast Review': 'Fast Review',
    'Poin Instan': uiStore.lang === 'id' ? 'Poin Instan' : 'Instant Points',
    'Pembaca Pro': uiStore.lang === 'id' ? 'Pembaca Pro' : 'Reader Pro',
    'Korporat': uiStore.lang === 'id' ? 'Korporat' : 'Corporate'
  }
  return mapping[name] || name
}

const translatePlanBilling = (text) => {
  if (!text) return ''
  const mapping = {
    'selamanya': uiStore.lang === 'id' ? 'selamanya' : 'forever',
    '/bulan': uiStore.lang === 'id' ? '/bulan' : '/month',
    'per artikel': uiStore.lang === 'id' ? 'per artikel' : '/article',
    '= 500 poin': uiStore.lang === 'id' ? '= 500 poin' : '= 500 points',
    '/tahun': uiStore.lang === 'id' ? '/tahun' : '/year'
  }
  return mapping[text] || text
}

const translatePlanFeature = (feature) => {
  if (!feature) return ''
  const mapping = {
    'Submit 2 artikel/minggu': uiStore.lang === 'id' ? 'Submit 2 artikel/minggu' : 'Submit 2 articles/week',
    'Rank Benih/Tunas': uiStore.lang === 'id' ? 'Rank Benih/Tunas' : 'Rank Seed/Sprout',
    'Tidak ada boost': uiStore.lang === 'id' ? 'Tidak ada boost' : 'No boost',
    'Fitur dasar': uiStore.lang === 'id' ? 'Fitur dasar' : 'Basic features',
    'Submit 5 artikel/minggu': uiStore.lang === 'id' ? 'Submit 5 artikel/minggu' : 'Submit 5 articles/week',
    '+150 poin/bulan': uiStore.lang === 'id' ? '+150 poin/bulan' : '+150 points/month',
    'Review dipercepat': uiStore.lang === 'id' ? 'Review dipercepat' : 'Accelerated review',
    'Badge Starter': uiStore.lang === 'id' ? 'Badge Starter' : 'Starter Badge',
    'Submit tak terbatas': uiStore.lang === 'id' ? 'Submit tak terbatas' : 'Unlimited submissions',
    '+350 poin/bulan': uiStore.lang === 'id' ? '+350 poin/bulan' : '+350 points/month',
    'Boost +20%': 'Boost +20%',
    'Analitik artikel': uiStore.lang === 'id' ? 'Analitik artikel' : 'Article analytics',
    'Badge Premium emas': uiStore.lang === 'id' ? 'Badge Premium emas' : 'Gold Premium Badge',
    'Semua Premium + boost +45%': uiStore.lang === 'id' ? 'Semua Premium + boost +45%' : 'All Premium + boost +45%',
    'Revenue share 5% iklan': uiStore.lang === 'id' ? 'Revenue share 5% iklan' : '5% ad revenue share',
    'Slot featured': 'Featured slot',
    'Prioritas review utama': uiStore.lang === 'id' ? 'Prioritas review utama' : 'Main review priority',
    'Dorong 1 artikel ke top trending selama 48 jam': uiStore.lang === 'id' ? 'Dorong 1 artikel ke top trending selama 48 jam' : 'Push 1 article to top trending for 48 hours',
    'Antrian review dalam <2 jam, prioritas moderator': uiStore.lang === 'id' ? 'Antrian review dalam <2 jam, prioritas moderator' : 'Review queue in <2 hours, moderator priority',
    'Tambah 500 poin langsung ke akun, percepat naik rank': uiStore.lang === 'id' ? 'Tambah 500 poin langsung ke akun, percepat naik rank' : 'Add 500 points directly to account, speed up level up',
    'Akses seluruh artikel arsip': uiStore.lang === 'id' ? 'Akses seluruh artikel arsip' : 'Access all archived articles',
    'Membaca tanpa iklan (Ad-free)': uiStore.lang === 'id' ? 'Membaca tanpa iklan (Ad-free)' : 'Read ad-free',
    'Badge Pembaca Pro': uiStore.lang === 'id' ? 'Badge Pembaca Pro' : 'Reader Pro Badge',
    'Akses tim (Hingga 10 akun)': uiStore.lang === 'id' ? 'Akses tim (Hingga 10 akun)' : 'Team access (Up to 10 accounts)',
    'Dashboard analitik korporat': uiStore.lang === 'id' ? 'Dashboard analitik korporat' : 'Corporate analytics dashboard',
    'Laporan riset pasar mingguan': uiStore.lang === 'id' ? 'Laporan riset pasar mingguan' : 'Weekly market research reports'
  }
  return mapping[feature] || feature
}

const translatePlanTag = (tag) => {
  if (!tag) return ''
  const mapping = {
    'Terlaris': uiStore.lang === 'id' ? 'Terlaris' : 'Best Seller',
    'Populer': uiStore.lang === 'id' ? 'Populer' : 'Popular'
  }
  return mapping[tag] || tag
}

const translatePlanCta = (cta) => {
  if (!cta) return ''
  const mapping = {
    'Gunakan Gratis': uiStore.lang === 'id' ? 'Gunakan Gratis' : 'Use Free',
    'Pilih Starter': uiStore.lang === 'id' ? 'Pilih Starter' : 'Choose Starter',
    'Pilih Premium': uiStore.lang === 'id' ? 'Pilih Premium' : 'Choose Premium',
    'Pilih Pro': uiStore.lang === 'id' ? 'Pilih Pro' : 'Choose Pro',
    'Beli Boost': uiStore.lang === 'id' ? 'Beli Boost' : 'Buy Boost',
    'Beli Fast Review': uiStore.lang === 'id' ? 'Beli Fast Review' : 'Buy Fast Review',
    'Beli Poin': uiStore.lang === 'id' ? 'Beli Poin' : 'Buy Points',
    'Pilih Pembaca Pro': uiStore.lang === 'id' ? 'Pilih Pembaca Pro' : 'Choose Reader Pro',
    'Pilih Korporat': uiStore.lang === 'id' ? 'Pilih Korporat' : 'Choose Corporate'
  }
  return mapping[cta] || cta
}

const displayPrice = computed(() => {
  if (props.plan.price === 0) return 'Rp 0'
  return `Rp ${props.plan.price / 1000}K`
})

defineEmits(['select'])
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
