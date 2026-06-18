import { defineStore } from 'pinia'
import authApi from '../api/auth'
import { useUiStore } from './ui'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('token') || null
    const refreshToken = localStorage.getItem('refreshToken') || null
    let user = null
    try {
      user = JSON.parse(localStorage.getItem('user') || 'null')
    } catch (e) {
      user = null
    }

    return {
      user,
      token,
      refreshToken,
      isAuthenticated: !!token
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isModerator: (state) => state.user?.role === 'MODERATOR' || state.user?.role === 'ADMIN',
    userRank: (state) => state.user?.rank?.name || 'Benih',
    userRankData: (state) => state.user?.rank || null,
    userSubscription: (state) => state.user?.subscription || null,
  },

  actions: {
    async login(credentials) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await authApi.login(credentials)
        // Backend returns: { success, message, data: { user, token, refreshToken } }
        const data = res.data.data
        const responseUser = data.user
        const responseToken = data.token
        const responseRefreshToken = data.refreshToken

        this.token = responseToken
        this.refreshToken = responseRefreshToken
        this.user = responseUser
        this.isAuthenticated = true

        localStorage.setItem('token', responseToken)
        if (responseRefreshToken) localStorage.setItem('refreshToken', responseRefreshToken)
        localStorage.setItem('user', JSON.stringify(responseUser))

        uiStore.showNotification(`Selamat datang kembali, ${responseUser.displayName || responseUser.username}!`, 'success')
        return true
      } catch (err) {
        const message = err.response?.data?.message || 'Login gagal, periksa email dan password Anda.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async register(userData) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await authApi.register(userData)
        // Registration returns user without token — need to login after
        const data = res.data.data
        uiStore.showNotification('Pendaftaran berhasil! Silakan login.', 'success')
        return data
      } catch (err) {
        const message = err.response?.data?.message || 'Pendaftaran gagal. Email atau username mungkin sudah digunakan.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async logout() {
      const uiStore = useUiStore()
      try {
        await authApi.logout()
      } catch (err) {
        // Ignore API errors during logout (token may already be invalid)
        console.warn('Logout API call failed, clearing local session anyway', err.message)
      } finally {
        this.token = null
        this.refreshToken = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        uiStore.showNotification('Anda berhasil keluar.', 'success')
      }
    },

    async fetchProfile() {
      if (!this.token) return
      try {
        const res = await authApi.getProfile()
        const user = res.data.data
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
      } catch (err) {
        console.warn('Failed to fetch profile from server', err.message)
      }
    },

    async updateProfile(data) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        // Support FormData for avatar upload
        const res = await authApi.updateProfile(data)
        const updatedUser = res.data.data?.user || res.data.data
        this.user = { ...this.user, ...updatedUser }
        localStorage.setItem('user', JSON.stringify(this.user))
        uiStore.showNotification('Profil berhasil diperbarui!', 'success')
        return true
      } catch (err) {
        const message = err.response?.data?.message || 'Gagal memperbarui profil.'
        uiStore.showNotification(message, 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    }
  }
})
