import api from './axios'

export default {
  getArticles(params) {
    return api.get('/articles', { params })
  },
  getTrending(params) {
    return api.get('/articles/trending', { params })
  },
  getFeatured(params) {
    return api.get('/articles/featured', { params })
  },
  getTopArticles(params) {
    return api.get('/articles/top', { params })
  },
  // Backend GET /articles/:id supports both ID and slug
  getArticleBySlug(slug) {
    return api.get(`/articles/${slug}`)
  },
  getArticleById(id) {
    return api.get(`/articles/${id}`)
  },
  createArticle(data) {
    // data may contain FormData for image upload
    const isFormData = data instanceof FormData
    return api.post('/articles', data, isFormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {})
  },
  updateArticle(id, data) {
    const isFormData = data instanceof FormData
    return api.put(`/articles/${id}`, data, isFormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {})
  },
  deleteArticle(id) {
    return api.delete(`/articles/${id}`)
  },
  publishArticle(id) {
    return api.post(`/articles/${id}/publish`)
  },
  likeArticle(id) {
    return api.post(`/articles/${id}/like`)
  },
  // Verify — backend accepts both PUT and POST at /articles/:id/verify
  verifyArticle(id, action, reason) {
    return api.put(`/articles/${id}/verify`, { action, reason })
  },
  getMyArticles(params) {
    return api.get('/articles/my', { params })
  },
  getPendingArticles(params) {
    return api.get('/articles/pending', { params })
  },
  setFeatured(id) {
    return api.post(`/articles/${id}/featured`)
  }
}
