import { defineStore } from 'pinia'
import categoriesApi from '../api/categories'
import { useUiStore } from './ui'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    selectedCategory: null
  }),
  actions: {
    async fetchCategories() {
      const uiStore = useUiStore()
      try {
        const res = await categoriesApi.getCategories()
        // Backend returns: success(res, 'Kategori berhasil diambil', categories)
        // So it is at res.data.data
        this.categories = res.data.data || []
      } catch (err) {
        console.error('Failed to fetch categories:', err)
        uiStore.showNotification(err.response?.data?.message || 'Gagal mengambil kategori.', 'error')
      }
    },

    async createCategory(data) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await categoriesApi.createCategory(data)
        const newCategory = res.data.data
        this.categories.push(newCategory)
        uiStore.showNotification('Kategori berhasil dibuat!', 'success')
        return newCategory
      } catch (err) {
        uiStore.showNotification(err.response?.data?.message || 'Gagal membuat kategori.', 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async updateCategory(id, data) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        const res = await categoriesApi.updateCategory(id, data)
        const updatedCategory = res.data.data
        const idx = this.categories.findIndex(c => c.id === id || c.id === parseInt(id))
        if (idx !== -1) {
          this.categories[idx] = updatedCategory
        } else {
          // fetch categories again if not found locally
          await this.fetchCategories()
        }
        uiStore.showNotification('Kategori berhasil diperbarui!', 'success')
        return updatedCategory
      } catch (err) {
        uiStore.showNotification(err.response?.data?.message || 'Gagal memperbarui kategori.', 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    async deleteCategory(id) {
      const uiStore = useUiStore()
      uiStore.isLoading = true
      try {
        await categoriesApi.deleteCategory(id)
        this.categories = this.categories.filter(c => c.id !== id && c.id !== parseInt(id))
        uiStore.showNotification('Kategori berhasil dihapus.', 'success')
        return true
      } catch (err) {
        uiStore.showNotification(err.response?.data?.message || 'Gagal menghapus kategori.', 'error')
        throw err
      } finally {
        uiStore.isLoading = false
      }
    },

    selectCategory(category) {
      this.selectedCategory = category
    }
  }
})
