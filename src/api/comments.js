import api from './axios'

export default {
  getComments(articleId) {
    return api.get(`/articles/${articleId}/comments`)
  },
  postComment(articleId, data) {
    return api.post(`/articles/${articleId}/comments`, data)
  },
  updateComment(id, data) {
    return api.put(`/comments/${id}`, data)
  },
  deleteComment(id) {
    return api.delete(`/comments/${id}`)
  },
  likeComment(id) {
    return api.post(`/comments/${id}/toggle-like`)
  }
}