import api from './axios'

export default {
  getUsers(params) {
    return api.get('/users', { params })
  },
  getUserById(id) {
    return api.get(`/users/profile/${id}`)
  },
  updateRank(id, data) {
    return api.put(`/users/${id}/rank`, data)
  },
  suspendUser(id, data) {
    return api.post(`/users/${id}/suspend`, data)
  },
  getLeaderboard(params) {
    return api.get('/users/leaderboard', { params })
  }
}
