import { defineStore } from 'pinia'
import commentsApi from '../api/comments'
import { useUiStore } from './ui'

export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [],
    loading: false
  }),
  actions: {
    async fetchComments(articleId) {
      this.loading = true
      const uiStore = useUiStore()
      try {
        const res = await commentsApi.getComments(articleId)
        // Backend returns comments array under data field
        this.comments = res.data.data || []
      } catch (err) {
        console.error('Failed to fetch comments:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal mengambil komentar.', 'error')
        this.comments = []
      } finally {
        this.loading = false
      }
    },

    async postComment(articleId, content, parentId = null) {
      const uiStore = useUiStore()
      try {
        const res = await commentsApi.postComment(articleId, { content, parentId })
        const newComment = res.data.data
        
        if (parentId) {
          const parent = this.comments.find(c => c.id === parentId)
          if (parent) {
            if (!parent.replies) parent.replies = []
            parent.replies.push(newComment)
          }
        } else {
          this.comments.unshift(newComment) // Insert at the beginning of the list
        }
        uiStore.showNotification('Komentar berhasil dikirim!', 'success')
        return newComment
      } catch (err) {
        console.error('Failed to post comment:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal mengirim komentar.', 'error')
        throw err
      }
    },

    async deleteComment(id) {
      const uiStore = useUiStore()
      try {
        await commentsApi.deleteComment(id)
        this.comments = this.comments.filter(c => c.id !== id)
        // Also check replies in case it's a nested reply
        this.comments.forEach(c => {
          if (c.replies) {
            c.replies = c.replies.filter(r => r.id !== id)
          }
        })
        uiStore.showNotification('Komentar berhasil dihapus.', 'success')
      } catch (err) {
        console.error('Failed to delete comment:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal menghapus komentar.', 'error')
        throw err
      }
    },

    async likeComment(id) {
      try {
        await commentsApi.likeComment(id)
        
        // Find comment or nested reply and increment locally
        const comment = this.comments.find(c => c.id === id)
        if (comment) {
          comment.likes++
        } else {
          for (const c of this.comments) {
            const reply = c.replies?.find(r => r.id === id)
            if (reply) {
              reply.likes++
              break
            }
          }
        }
      } catch (err) {
        console.error('Failed to like comment:', err)
      }
    }
  }
})
