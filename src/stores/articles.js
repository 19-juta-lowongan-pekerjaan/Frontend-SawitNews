import { defineStore } from 'pinia'
import articlesApi from '../api/articles'
import { useUiStore } from './ui'

// Helper: extract response data (backend wraps in res.data.data)
const getData = (res) => res.data.data
const getList = (res) => res.data.data?.articles || res.data.data?.data || res.data.data || []
const getMeta = (res) => ({
  total: res.data.data?.total || res.data.meta?.total || 0,
  page: res.data.data?.page || res.data.meta?.page || 1,
  totalPages: res.data.data?.totalPages || res.data.meta?.totalPages || 1,
})

const mapArticles = (list) => {
  if (!Array.isArray(list)) return []
  return list.map(art => {
    if (!art) return art
    let categoryName = ''
    if (art.categories && art.categories.length > 0) {
      categoryName = art.categories[0]?.category?.name || ''
    }
    return {
      ...art,
      categoryName,
      summary: art.excerpt || art.summary || ''
    }
  })
}

const mapSingleArticle = (art) => {
  if (!art) return null
  let categoryName = ''
  if (art.categories && art.categories.length > 0) {
    categoryName = art.categories[0]?.category?.name || ''
  }
  return {
    ...art,
    categoryName,
    summary: art.excerpt || art.summary || ''
  }
}

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    currentArticle: null,
    trendingArticles: [],
    featuredArticles: [],
    myArticles: [],
    pendingArticles: [],
    loading: false,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 }
  }),

  actions: {
    async fetchArticles(filters = {}) {
      this.loading = true
      const uiStore = useUiStore()
      try {
        const res = await articlesApi.getArticles(filters)
        const data = res.data.data
        // Backend paginate() returns: { data: articles[], meta: { page, limit, total, totalPages } }
        this.articles = mapArticles(data?.data || data?.articles || data || [])
        const meta = data?.meta || res.data.meta || {}
        this.pagination = {
          page: meta.page || 1,
          limit: meta.limit || 10,
          total: meta.total || this.articles.length,
          totalPages: meta.totalPages || 1,
        }
      } catch (err) {
        uiStore.showNotification('Gagal memuat daftar berita.', 'error')
        console.error('fetchArticles error:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchTrending(limit = 10) {
      try {
        const res = await articlesApi.getTrending({ limit })
        const data = res.data.data
        this.trendingArticles = mapArticles(data?.articles || data?.data || data || [])
      } catch (err) {
        console.error('fetchTrending error:', err)
        this.trendingArticles = []
      }
    },

    async fetchFeatured(limit = 6) {
      try {
        const res = await articlesApi.getFeatured({ limit })
        const data = res.data.data
        this.featuredArticles = mapArticles(data?.articles || data?.data || data || [])
      } catch (err) {
        console.error('fetchFeatured error:', err)
        this.featuredArticles = []
      }
    },

    async fetchArticle(slugOrId) {
      this.loading = true
      const uiStore = useUiStore()
      try {
        const res = await articlesApi.getArticleBySlug(slugOrId)
        this.currentArticle = mapSingleArticle(res.data.data)
      } catch (err) {
        uiStore.showNotification('Berita tidak ditemukan.', 'error')
        this.currentArticle = null
        console.error('fetchArticle error:', err)
      } finally {
        this.loading = false
      }
    },

    async createArticle(data) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await articlesApi.createArticle(data)
        const newArticle = mapSingleArticle(res.data.data)
        // Don't push to articles list — user will see it in myArticles
        if (newArticle.status === 'PENDING') {
          uiStore.showNotification('Artikel berhasil dikirim dan menunggu verifikasi moderator.', 'success')
        } else {
          uiStore.showNotification('Draft artikel berhasil disimpan.', 'success')
        }
        return newArticle
      } catch (err) {
        let message = err.response?.data?.message || 'Gagal membuat artikel.'
        if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
          const details = err.response.data.errors.map(e => e.message).join(', ')
          message = `${message}: ${details}`
        }
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async updateArticle(id, data) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await articlesApi.updateArticle(id, data)
        const updatedArticle = mapSingleArticle(res.data.data)

        // Update in local lists if present
        const updateInList = (list) => {
          const idx = list.findIndex(a => a.id === id)
          if (idx !== -1) list[idx] = updatedArticle
        }
        updateInList(this.articles)
        updateInList(this.myArticles)
        if (this.currentArticle?.id === id) this.currentArticle = updatedArticle

        uiStore.showNotification('Artikel berhasil diperbarui.', 'success')
        return updatedArticle
      } catch (err) {
        let message = err.response?.data?.message || 'Gagal memperbarui artikel.'
        if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
          const details = err.response.data.errors.map(e => e.message).join(', ')
          message = `${message}: ${details}`
        }
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async deleteArticle(id) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        await articlesApi.deleteArticle(id)
        this.articles = this.articles.filter(a => a.id !== id)
        this.myArticles = this.myArticles.filter(a => a.id !== id)
        if (this.currentArticle?.id === id) this.currentArticle = null
        uiStore.showNotification('Artikel berhasil dihapus.', 'success')
        return true
      } catch (err) {
        const message = err.response?.data?.message || 'Gagal menghapus artikel.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async publishArticle(id) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await articlesApi.publishArticle(id)
        const updatedArticle = mapSingleArticle(res.data.data)
        
        const updateInList = (list) => {
          const idx = list.findIndex(a => a.id === id)
          if (idx !== -1) list[idx] = updatedArticle
        }
        updateInList(this.articles)
        updateInList(this.myArticles)
        if (this.currentArticle?.id === id) this.currentArticle = updatedArticle

        const msg = updatedArticle.status === 'PUBLISHED'
          ? 'Artikel berhasil diterbitkan!'
          : 'Artikel dikirim untuk verifikasi moderator.'
        uiStore.showNotification(msg, 'success')
        return updatedArticle
      } catch (err) {
        const message = err.response?.data?.message || 'Gagal mempublish artikel.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async verifyArticle(id, action, reason) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await articlesApi.verifyArticle(id, action, reason)
        const article = mapSingleArticle(res.data.data)

        const updateInList = (list) => {
          const idx = list.findIndex(a => a.id === id)
          if (idx !== -1) list[idx] = article
        }
        updateInList(this.articles)
        updateInList(this.pendingArticles)

        const msg = action === 'approve' ? 'Artikel disetujui & diterbitkan!' :
                    action === 'reject' ? 'Artikel ditolak.' : 'Artikel dikembalikan untuk revisi.'
        uiStore.showNotification(msg, 'success')
        return article
      } catch (err) {
        const message = err.response?.data?.message || 'Gagal memverifikasi artikel.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async fetchMyArticles(params = {}) {
      this.loading = true
      try {
        const res = await articlesApi.getMyArticles(params)
        const data = res.data.data
        this.myArticles = mapArticles(data?.data || data?.articles || data || [])
      } catch (err) {
        console.error('fetchMyArticles error:', err)
        this.myArticles = []
      } finally {
        this.loading = false
      }
    },

    async fetchPendingArticles(params = {}) {
      this.loading = true
      try {
        const res = await articlesApi.getPendingArticles(params)
        const data = res.data.data
        this.pendingArticles = mapArticles(data?.data || data?.articles || data || [])
      } catch (err) {
        console.error('fetchPendingArticles error:', err)
        this.pendingArticles = []
      } finally {
        this.loading = false
      }
    },

    async toggleLikeArticle(id) {
      try {
        await articlesApi.toggleLikeArticle(id)
        if (this.currentArticle?.id === id) {
          await this.fetchArticle(id)
        }
      } catch (err) {
        console.error('toggleLikeArticle error:', err)
      }
    },

    async toggleFeatured(id) {
      const uiStore = useUiStore()
      try {
        const res = await articlesApi.setFeatured(id)
        const updatedArticle = res.data.data
        const idx = this.articles.findIndex(a => a.id === id)
        if (idx !== -1) {
          this.articles[idx] = updatedArticle
        }
        return updatedArticle
      } catch (err) {
        console.error('toggleFeatured error:', err)
        uiStore.showNotification('Gagal memperbarui status unggulan artikel.', 'error')
        throw err
      }
    }
  }
})