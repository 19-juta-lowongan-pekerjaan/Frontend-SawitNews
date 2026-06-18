import { defineStore } from 'pinia'
import subscriptionsApi from '../api/subscriptions'
import { useUiStore } from './ui'
import { useAuthStore } from './auth'

export const useSubscriptionStore = defineStore('subscriptions', {
  state: () => ({
    writerPlans: [],
    boosterPlans: [],
    readerPlans: [],
    mySubscription: null,
    transactionHistory: [],
    loading: false
  }),
  actions: {
    async fetchPlans() {
      this.loading = true
      const uiStore = useUiStore()
      try {
        const res = await subscriptionsApi.getPlans()
        const allPlans = res.data.data || []
        
        this.writerPlans = allPlans.filter(p => p.planType === 'WRITER').map(p => ({
          id: p.id,
          name: p.name,
          price: p.priceMonthly,
          billingText: '/bulan',
          features: p.benefits || [],
          popular: p.isBestseller,
          tag: p.isBestseller ? 'Terlaris' : '',
          ctaText: p.name === 'Gratis' ? 'Gunakan Gratis' : 'Pilih ' + p.name,
          ...p
        }))

        this.readerPlans = allPlans.filter(p => p.planType === 'READER' || p.planType === 'CORPORATE').map(p => ({
          id: p.id,
          name: p.name,
          price: p.priceMonthly,
          billingText: p.planType === 'CORPORATE' ? '/bulan (5 user)' : '/bulan',
          features: p.benefits || [],
          popular: false,
          ctaText: 'Pilih ' + p.name,
          ...p
        }))

        // Also fetch boosters automatically when plans are loaded
        await this.fetchBoosters()
      } catch (err) {
        console.error('Failed to fetch subscription plans:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal mengambil paket subscription.', 'error')
      } finally {
        this.loading = false
      }
    },

    async fetchBoosters() {
      try {
        const res = await subscriptionsApi.getBoosters()
        const boosters = res.data.data || []
        
        this.boosterPlans = boosters.map(b => ({
          id: b.id,
          name: b.name,
          price: b.price,
          billingText: b.boostType === 'trending' ? 'per artikel' 
                      : (b.boostType === 'fast_review' ? 'per artikel' 
                      : (b.boostType === 'points_instant' ? '= 500 poin' : '= 2.000 poin')),
          features: [b.description],
          popular: b.isPopular,
          tag: b.isPopular ? 'Populer' : '',
          ctaText: b.name === 'Boost Artikel' ? 'Beli Boost' : (b.name === 'Fast Review' ? 'Beli Fast Review' : 'Beli Poin'),
          ...b
        }))
      } catch (err) {
        console.error('Failed to fetch booster plans:', err)
      }
    },

    async fetchMySubscription() {
      const authStore = useAuthStore()
      try {
        const res = await subscriptionsApi.getMySubscription()
        const data = res.data.data
        if (data && data.isActive && data.subscription) {
          this.mySubscription = {
            id: data.subscription.id,
            name: data.subscription.name,
            expiresAt: data.expiry
          }
        } else {
          this.mySubscription = null
        }
      } catch (err) {
        console.warn('Failed to fetch active subscription, falling back to auth state:', err.message)
        this.mySubscription = authStore.user?.subscription || null
      }
    },

    async purchasePlan(planId, articleId = null) {
      const uiStore = useUiStore()
      const authStore = useAuthStore()
      uiStore.isLoading = true
      
      try {
        const isBooster = this.boosterPlans.some(p => p.id === planId)
        let response
        
        if (isBooster) {
          response = await subscriptionsApi.purchaseBooster(planId, articleId)
        } else {
          response = await subscriptionsApi.purchasePlan(planId)
        }
        
        const payload = response.data.data
        
        // Show notification from API
        uiStore.showNotification(payload.message || 'Transaksi berhasil diproses!', 'success')
        
        // Refresh stores data
        await this.fetchMySubscription()
        await this.fetchTransactionHistory()
        await authStore.fetchProfile()
        
        return true
      } catch (err) {
        console.error('Purchase plan error:', err)
        uiStore.showNotification(err.response?.data?.message || 'Pembayaran gagal, silakan coba lagi.', 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async cancelSubscription() {
      const uiStore = useUiStore()
      const authStore = useAuthStore()
      uiStore.isLoading = true
      try {
        await subscriptionsApi.cancelSubscription()
        this.mySubscription = null
        
        await authStore.fetchProfile()
        uiStore.showNotification('Langganan Anda berhasil dibatalkan. Anda sekarang menggunakan paket Gratis.', 'info')
        return true
      } catch (err) {
        console.error('Cancel subscription error:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal membatalkan langganan.', 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async fetchTransactionHistory() {
      try {
        const res = await subscriptionsApi.getTransactionHistory()
        const list = res.data.data || []
        
        this.transactionHistory = list.map(tx => ({
          id: tx.transactionId || tx.id,
          planName: tx.subscription?.name || tx.booster?.name || 'Paket',
          amount: tx.amount,
          status: tx.paymentStatus,
          date: tx.createdAt,
          paymentType: tx.paymentMethod || 'Mock Payment'
        }))
      } catch (err) {
        console.error('Failed to fetch transaction history:', err)
      }
    }
  }
})
