<template>
  <div class="space-y-12 py-4">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      <h1 class="font-black text-3xl md:text-4xl text-accent dark:text-white">{{ uiStore.t('subscription_title') }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ uiStore.t('subscription_subtitle') }}
      </p>
    </div>

    <!-- Active Subscription Overview (if subscribed) -->
    <div 
      v-if="subscriptionStore.mySubscription"
      class="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-hover text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
    >
      <div class="space-y-2 relative z-10">
        <span class="text-xxs font-black tracking-widest uppercase bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1 w-max">
          <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {{ uiStore.t('sub_status_active') }}
        </span>
        <h3 class="text-2xl font-black">{{ translatePlanName(subscriptionStore.mySubscription.name) }}</h3>
        <p class="text-xs text-green-100">
          {{ uiStore.t('sub_expires_at') }} {{ formatDate(subscriptionStore.mySubscription.expiresAt) }}
        </p>
      </div>
      <div class="relative z-10 flex gap-3">
        <button 
          @click="handleCancelSubscription"
          class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-2xl shadow transition-all transform active:scale-95"
        >
          {{ uiStore.t('sub_cancel_btn') }}
        </button>
      </div>
    </div>

    <!-- Section 1: Writer Plans -->
    <div class="space-y-6 max-w-6xl mx-auto">
      <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex items-center gap-2">
        <span class="h-6 w-1 bg-primary rounded-full"></span>
        <h2 class="font-extrabold text-lg text-accent dark:text-white uppercase tracking-wider">
          {{ uiStore.t('sub_writer_plans') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SubscriptionCard 
          v-for="plan in subscriptionStore.writerPlans" 
          :key="plan.id"
          :plan="plan"
          :current="subscriptionStore.mySubscription?.id === plan.id"
          @select="handleSelectPlan"
        />
      </div>
    </div>

    <!-- Section 2: Booster Plans -->
    <div class="space-y-6 max-w-6xl mx-auto">
      <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex items-center gap-2">
        <span class="h-6 w-1 bg-amber-500 rounded-full"></span>
        <h2 class="font-extrabold text-lg text-accent dark:text-white uppercase tracking-wider">
          {{ uiStore.t('sub_booster_plans') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SubscriptionCard 
          v-for="plan in subscriptionStore.boosterPlans" 
          :key="plan.id"
          :plan="plan"
          @select="handleSelectPlan"
        />
      </div>
    </div>

    <!-- Section 3: Reader Plans -->
    <div class="space-y-6 max-w-6xl mx-auto">
      <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex items-center gap-2">
        <span class="h-6 w-1 bg-blue-500 rounded-full"></span>
        <h2 class="font-extrabold text-lg text-accent dark:text-white uppercase tracking-wider">
          {{ uiStore.t('sub_reader_plans') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl sm:mx-0">
        <SubscriptionCard 
          v-for="plan in subscriptionStore.readerPlans" 
          :key="plan.id"
          :plan="plan"
          :current="subscriptionStore.mySubscription?.id === plan.id"
          @select="handleSelectPlan"
        />
      </div>
    </div>

    <!-- Plans Comparison Table -->
    <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 space-y-6">
      <h3 class="font-extrabold text-lg text-accent dark:text-white text-center sm:text-left">
        {{ uiStore.t('sub_compare_title') }}
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-gray-100 dark:border-slate-700 text-xxs font-black uppercase text-gray-400 pb-2">
              <th class="py-3">{{ uiStore.t('sub_th_feature') }}</th>
              <th class="py-3 text-center">{{ uiStore.t('plan_free') }}</th>
              <th class="py-3 text-center">{{ uiStore.t('plan_starter') }}</th>
              <th class="py-3 text-center text-primary">{{ uiStore.t('plan_premium') }}</th>
              <th class="py-3 text-center">{{ uiStore.t('plan_pro') }}</th>
              <th class="py-3 text-center">{{ uiStore.t('plan_reader_pro') }}</th>
              <th class="py-3 text-center">{{ uiStore.t('plan_corporate') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <tr>
              <td class="py-4 font-semibold text-slate-700 dark:text-white">{{ uiStore.t('sub_feature_articles') }}</td>
              <td class="py-4 text-center text-slate-500">{{ uiStore.lang === 'id' ? '2 Artikel' : '2 Articles' }}</td>
              <td class="py-4 text-center text-slate-500">{{ uiStore.lang === 'id' ? '5 Artikel' : '5 Articles' }}</td>
              <td class="py-4 text-center text-primary font-bold">{{ uiStore.t('sub_unlimited') }}</td>
              <td class="py-4 text-center text-primary font-bold">{{ uiStore.t('sub_unlimited') }}</td>
              <td class="py-4 text-center text-slate-400">-</td>
              <td class="py-4 text-center text-slate-400">-</td>
            </tr>
            <tr>
              <td class="py-4 font-semibold text-slate-700 dark:text-white">{{ uiStore.t('sub_feature_xp') }}</td>
              <td class="py-4 text-center text-slate-500">-</td>
              <td class="py-4 text-center text-slate-500">+150 XP</td>
              <td class="py-4 text-center text-primary font-bold">+350 XP</td>
              <td class="py-4 text-center text-primary font-bold">+350 XP</td>
              <td class="py-4 text-center text-slate-400">-</td>
              <td class="py-4 text-center text-slate-400">-</td>
            </tr>
            <tr>
              <td class="py-4 font-semibold text-slate-700 dark:text-white">{{ uiStore.t('sub_feature_boost') }}</td>
              <td class="py-4 text-center text-slate-500">{{ uiStore.t('sub_no_boost') }}</td>
              <td class="py-4 text-center text-slate-500">{{ uiStore.t('sub_no_boost') }}</td>
              <td class="py-4 text-center text-primary font-bold">+20%</td>
              <td class="py-4 text-center text-primary font-bold">+45%</td>
              <td class="py-4 text-center text-slate-400">-</td>
              <td class="py-4 text-center text-slate-400">-</td>
            </tr>
            <tr>
              <td class="py-4 font-semibold text-slate-700 dark:text-white">{{ uiStore.t('sub_feature_adfree') }}</td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </td>
              <td class="py-4 text-center">
                <svg class="w-4 h-4 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div class="p-6 border-b border-gray-50 dark:border-slate-700">
        <h3 class="font-bold text-base text-accent dark:text-white">{{ uiStore.t('sub_history_title') }}</h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ uiStore.t('sub_history_desc') }}</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50 border-b border-gray-100 text-xxs font-black uppercase text-gray-500 tracking-wider dark:bg-slate-900/50 dark:border-slate-700">
              <th class="py-3 px-6">{{ uiStore.t('sub_th_tx_id') }}</th>
              <th class="py-3 px-6">{{ uiStore.t('sub_th_plan') }}</th>
              <th class="py-3 px-6 text-center">{{ uiStore.t('sub_th_method') }}</th>
              <th class="py-3 px-6 text-center">{{ uiStore.t('sub_th_date') }}</th>
              <th class="py-3 px-6 text-right">{{ uiStore.t('sub_th_amount') }}</th>
              <th class="py-3 px-6 text-center">{{ uiStore.t('sub_th_status') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <tr v-for="tx in subscriptionStore.transactionHistory" :key="tx.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
              <td class="py-3.5 px-6 font-bold text-slate-700 dark:text-white">{{ tx.id }}</td>
              <td class="py-3.5 px-6">{{ translatePlanName(tx.planName) }}</td>
              <td class="py-3.5 px-6 text-center">{{ tx.paymentType }}</td>
              <td class="py-3.5 px-6 text-center text-xxs text-gray-400">{{ formatDate(tx.date) }}</td>
              <td class="py-3.5 px-6 text-right font-bold text-slate-700 dark:text-white">{{ formatPrice(tx.amount) }}</td>
              <td class="py-3.5 px-6 text-center">
                <span class="px-2 py-0.5 rounded-full font-bold text-xxs bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400">
                  {{ tx.status === 'SUCCESS' ? (uiStore.lang === 'id' ? 'Berhasil' : 'Success') : tx.status }}
                </span>
              </td>
            </tr>
            <tr v-if="subscriptionStore.transactionHistory.length === 0">
              <td colspan="6" class="py-8 text-center text-gray-400 dark:text-gray-500 italic">
                {{ uiStore.t('sub_no_history') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Simulated Payment Modal -->
    <PaymentModal 
      v-if="selectedPlan"
      :plan="selectedPlan"
      @close="selectedPlan = null"
      @success="handlePaymentSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSubscriptionStore } from '../stores/subscriptions'
import { useUiStore } from '../stores/ui'
import { formatDate, formatPrice } from '../utils/formatters'
import SubscriptionCard from '../components/subscription/SubscriptionCard.vue'
import PaymentModal from '../components/subscription/PaymentModal.vue'

const subscriptionStore = useSubscriptionStore()
const uiStore = useUiStore()

const selectedPlan = ref(null)

onMounted(() => {
  subscriptionStore.fetchPlans()
  subscriptionStore.fetchMySubscription()
  subscriptionStore.fetchTransactionHistory()
})

const translatePlanName = (name) => {
  const mapping = {
    'Gratis': uiStore.t('plan_free'),
    'Starter': uiStore.t('plan_starter'),
    'Premium': uiStore.t('plan_premium'),
    'Pro': uiStore.t('plan_pro'),
    'Boost Artikel': uiStore.t('plan_boost_article'),
    'Fast Review': uiStore.t('plan_fast_review'),
    'Poin Instan': uiStore.t('plan_instant_points'),
    'Poin Bundel': uiStore.t('plan_point_bundle'),
    'Pembaca Pro': uiStore.t('plan_reader_pro'),
    'Korporat': uiStore.t('plan_corporate')
  }
  return mapping[name] || name
}

const handleSelectPlan = (plan) => {
  // If free plan, activate directly without payment modal
  if (plan.price === 0) {
    handleFreePlanActivation(plan.id)
  } else {
    selectedPlan.value = plan
  }
}

const handleFreePlanActivation = async (planId) => {
  try {
    await subscriptionStore.purchasePlan(planId)
  } catch (err) {
    console.error(err)
  }
}

const handlePaymentSuccess = async () => {
  const plan = selectedPlan.value
  selectedPlan.value = null
  
  if (plan) {
    try {
      await subscriptionStore.purchasePlan(plan.id)
    } catch (err) {
      console.error(err)
    }
  }
}

const handleCancelSubscription = async () => {
  if (confirm(uiStore.t('sub_cancel_confirm'))) {
    try {
      await subscriptionStore.cancelSubscription()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
