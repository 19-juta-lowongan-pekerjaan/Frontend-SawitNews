import api from './axios'

export default {
  getStats() {
    return api.get('/admin/dashboard/stats')
  },
  getUsers(params) {
    return api.get('/admin/users', { params })
  },
  updateUserRank(userId, rankId) {
    return api.put(`/admin/users/${userId}/rank`, { rankId })
  },
  suspendUser(userId, isActive) {
    // Backend body: { isActive }
    // PUT /admin/users/:id/suspend
    return api.put(`/admin/users/${userId}/suspend`, { isActive })
  },
  getTransactions(params) {
    return api.get('/admin/transactions', { params })
  }
}
