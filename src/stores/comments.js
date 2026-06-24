import { defineStore } from 'pinia'
import commentsApi from '../api/comments'
import { useUiStore } from './ui'

const formatComment = (comment) => {
  if (!comment) return null
  
  const mapUserToAuthor = (user) => {
    if (!user) return null
    return {
      avatar: user.avatar || '',
      name: user.displayName || user.username || '',
      username: user.username || '',
      rank: user.rank?.name || user.rank || 'Pemula'
    }
  }

  return {
    ...comment,
    author: mapUserToAuthor(comment.user),
    replies: Array.isArray(comment.replies) ? comment.replies.map(r => ({
      ...r,
      author: mapUserToAuthor(r.user)
    })) : []
  }
}

export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [],
    loading: false,
    articleId: null,
  }),
  actions: {
    async fetchComments(articleId) {
      this.loading = true
      this.articleId = articleId
      const uiStore = useUiStore()
      try {
        const res = await commentsApi.getComments(articleId)
        this.comments = (res.data.data || []).map(formatComment)
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
        const payload = { content }
        if (parentId) {
          payload.parentId = parentId
        }
        const res = await commentsApi.postComment(articleId, payload)
        const newComment = formatComment(res.data.data)
        
        if (parentId) {
          const parent = this.comments.find(c => c.id === parentId)
          if (parent) {
            if (!parent.replies) parent.replies = []
            parent.replies.push(newComment)
          }
        } else {
          this.comments.unshift(newComment)
        }
        uiStore.showNotification('Komentar berhasil dikirim!', 'success')
        return newComment
      } catch (err) {
        console.error('Failed to post comment:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal mengirim komentar.', 'error')
        throw err
      }
    },

    async updateComment(id, content) {
      const uiStore = useUiStore()
      try {
        const res = await commentsApi.updateComment(id, { content })
        const updatedComment = formatComment(res.data.data)
        
        const comment = this.comments.find(c => c.id === id)
        if (comment) {
          Object.assign(comment, updatedComment)
        } else {
          for (const c of this.comments) {
            const reply = c.replies.find(r => r.id === id)
            if (reply) {
              Object.assign(reply, updatedComment)
              break
            }
          }
        }
        uiStore.showNotification('Komentar berhasil diperbarui.', 'success')
      } catch (err) {
        console.error('Failed to update comment:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal memperbarui komentar.', 'error')
        throw err
      }
    },

    async deleteComment(id) {
      const uiStore = useUiStore()
      try {
        await commentsApi.deleteComment(id)
        
        const comment = this.comments.find(c => c.id === id)
        if (comment) {
          comment.isDeleted = true
        } else {
          for (const c of this.comments) {
            const reply = c.replies.find(r => r.id === id)
            if (reply) {
              reply.isDeleted = true
              break
            }
          }
        }
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
        if (this.articleId) {
          await this.fetchComments(this.articleId)
        }
      } catch (err) {
        console.error('Failed to like comment:', err)
      }
    }
  }
})