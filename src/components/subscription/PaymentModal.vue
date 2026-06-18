<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <!-- Backdrop Close Clicker -->
    <div class="absolute inset-0" @click="$emit('close')"></div>

    <!-- Modal Content -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden relative z-10 dark:bg-slate-800 dark:border-slate-700 animate-scale">
      <!-- Header -->
      <div class="p-6 border-b border-gray-50 flex items-center justify-between dark:border-slate-700">
        <h3 class="font-bold text-lg text-accent dark:text-white flex items-center gap-1.5">
          <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{ uiStore.t('checkout_title') }}
        </h3>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6">
        <!-- Plan Summary -->
        <div class="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2 dark:bg-slate-900/50">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <span class="text-xxs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ uiStore.t('checkout_plan_summary') }}</span>
              <h4 class="font-bold text-slate-800 dark:text-white">{{ translatePlanName(plan.name) }}</h4>
            </div>
            <span class="text-sm font-bold text-slate-800 dark:text-white">{{ formatPrice(plan.price) }}</span>
          </div>
          
          <div class="border-t border-gray-200 dark:border-slate-700 my-1"></div>
          
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Biaya Admin / Admin Fee</span>
            <span>{{ formatPrice(adminFee) }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Pajak / Tax (11%)</span>
            <span>{{ formatPrice(tax) }}</span>
          </div>

          <div class="border-t border-gray-200 dark:border-slate-700 my-1"></div>

          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-slate-800 dark:text-white">Total</span>
            <div class="text-right">
              <div class="text-xl font-black text-primary">{{ formatPrice(totalIDR) }}</div>
              <div class="text-xs text-gray-400 font-medium">~ ${{ totalUSD }} USD</div>
            </div>
          </div>
        </div>

        <!-- Payment Method Selection -->
        <div class="space-y-3">
          <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ uiStore.t('checkout_select_method') }}</label>
          <div class="grid grid-cols-2 gap-3">
            <button 
              v-for="method in paymentMethods" 
              :key="method.id"
              @click="selectedMethod = method.id"
              class="p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200"
              :class="selectedMethod === method.id 
                ? 'border-primary bg-primary/5 text-primary dark:bg-primary/20 dark:text-primary-light font-bold ring-2 ring-primary/10' 
                : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'"
            >
              <span class="flex items-center justify-center" v-html="method.icon"></span>
              <span class="text-xs">{{ method.name }}</span>
            </button>
          </div>
        </div>

        <!-- QRIS simulator view if QRIS selected -->
        <div v-if="selectedMethod === 'qris'" class="bg-slate-50 border rounded-2xl p-5 flex flex-col items-center justify-center space-y-3 dark:bg-slate-900/50">
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SawitNewsSubscriptionQRIS" 
            class="h-32 w-32 object-contain border-4 border-white rounded shadow-sm" 
            alt="Simulated QRIS QR Code" 
          />
          <p class="text-xxs text-gray-400 dark:text-gray-500 text-center max-w-[200px]">
            {{ uiStore.t('checkout_qris_desc') }}
          </p>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="p-6 border-t border-gray-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/10 flex gap-4">
        <button 
          @click="$emit('close')"
          class="flex-1 py-3 text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-slate-50 rounded-2xl shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700"
        >
          {{ uiStore.t('checkout_cancel') }}
        </button>
        <button 
          @click="handlePay"
          :disabled="loading"
          class="flex-1 py-3 text-sm font-bold bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
          <span v-else>{{ uiStore.t('checkout_pay') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPrice } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const props = defineProps({
  plan: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const selectedMethod = ref('qris')
const loading = ref(false)

const translatePlanName = (name) => {
  const mapping = {
    'Gratis': uiStore.lang === 'id' ? 'Gratis' : 'Free',
    'Starter': 'Starter',
    'Premium': 'Premium',
    'Pro': 'Pro',
    'Boost Artikel': uiStore.lang === 'id' ? 'Boost Artikel' : 'Boost Article',
    'Fast Review': 'Fast Review',
    'Poin Instan': uiStore.t('plan_instant_points'),
    'Poin Bundel': uiStore.t('plan_point_bundle'),
    'Pembaca Pro': uiStore.t('plan_reader_pro'),
    'Korporat': uiStore.t('plan_corporate')
  }
  return mapping[name] || name
}

const adminFee = 2500
const taxRate = 0.11
const tax = computed(() => Math.round((props.plan.price + adminFee) * taxRate))
const totalIDR = computed(() => props.plan.price + adminFee + tax.value)
const totalUSD = computed(() => (totalIDR.value / 16000).toFixed(2))

const paymentMethods = computed(() => [
  { 
    id: 'qris', 
    name: 'QRIS (Gopay/OVO)', 
    icon: `<svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>` 
  },
  { 
    id: 'va', 
    name: 'Virtual Account', 
    icon: `<svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18M6 22V10M10 22V10M14 22V10M18 22V10M12 2L2 7h20L12 2z"></path></svg>` 
  },
  { 
    id: 'cc', 
    name: uiStore.lang === 'id' ? 'Kartu Kredit' : 'Credit Card', 
    icon: `<svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>` 
  },
  { 
    id: 'gopay', 
    name: 'Gopay Clickpay', 
    icon: `<svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>` 
  }
])

const handlePay = () => {
  loading.value = true
  // simulate payment process delay
  setTimeout(() => {
    loading.value = false
    emit('success')
  }, 2000)
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
.animate-scale {
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
