import api from './axios'

export default {
  getPlans(type) {
    return api.get('/subscriptions/plans', { params: type ? { type } : {} })
  },
  getBoosters() {
    return api.get('/subscriptions/boosters')
  },
  getMySubscription() {
    return api.get('/subscriptions/my-subscription')
  },
  purchasePlan(subscriptionId, duration = 'monthly') {
    return api.post('/subscriptions/purchase', { subscriptionId, duration })
  },
  purchaseBooster(boosterId, articleId) {
    return api.post('/subscriptions/purchase-booster', { boosterId, articleId })
  },
  cancelSubscription() {
    return api.post('/subscriptions/cancel')
  },
  getTransactionHistory() {
    return api.get('/subscriptions/history')
  }
}
