<template>
  <div class="space-y-6 py-4">
    <!-- Header -->
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
          <span class="h-6 w-1 bg-red-500 rounded-full"></span>
          {{ uiStore.t('admin_dashboard_title') }}
        </h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {{ uiStore.t('admin_dashboard_desc') }}
        </p>
      </div>
    </div>

    <!-- Stats Card Bar component -->
    <AdminStats :stats="stats" />

    <!-- Tabs Header -->
    <div class="border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-2">
      <button 
        v-for="tab in dashboardTabs" 
        :key="tab.id"
        @click="activeDashboardTab = tab.id"
        class="px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all duration-150 relative border-b-2"
        :class="activeDashboardTab === tab.id 
          ? 'border-red-500 text-red-500 dark:text-white dark:border-white' 
          : 'border-transparent text-gray-400 hover:text-slate-600 dark:hover:text-slate-300'"
      >
        {{ tab.name }}
        <span 
          v-if="tab.id === 'queue' && articleStore.pendingArticles.length > 0" 
          class="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-xxs font-black"
        >
          {{ articleStore.pendingArticles.length }}
        </span>
      </button>
    </div>

    <!-- Active Tab Content -->
    <div class="space-y-6">
      <!-- 1. Verification Queue tab -->
      <div v-show="activeDashboardTab === 'queue'">
        <VerificationQueue 
          :articles="articleStore.pendingArticles" 
          @verify="handleVerify"
        />
      </div>

      <!-- 2. Manage Articles tab -->
      <div v-show="activeDashboardTab === 'articles'">
        <AdminArticles 
          :articles="articleStore.articles" 
          @delete="handleDeleteArticle" 
          @feature="handleToggleFeatured"
        />
      </div>

      <!-- 3. Manage Users tab -->
      <div v-show="activeDashboardTab === 'users'">
        <AdminUsers 
          :users="users" 
          @suspend="handleToggleSuspend"
          @update-rank="handleUpdateUserRank"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import { getDefaultAvatar } from '../utils/formatters'
import adminApi from '../api/admin'
import AdminStats from '../components/admin/AdminStats.vue'
import VerificationQueue from '../components/admin/VerificationQueue.vue'
import AdminArticles from '../components/admin/AdminArticles.vue'
import AdminUsers from '../components/admin/AdminUsers.vue'

const articleStore = useArticleStore()
const uiStore = useUiStore()

const activeDashboardTab = ref('queue')

const dashboardTabs = computed(() => [
  { id: 'queue', name: uiStore.t('admin_tab_queue') },
  { id: 'articles', name: uiStore.t('admin_tab_articles') },
  { id: 'users', name: uiStore.t('admin_tab_users') }
])

const stats = reactive({
  users: 0,
  articles: 0,
  views: 0,
  revenue: 0
})

const users = ref([])

onMounted(async () => {
  articleStore.fetchPendingArticles()
  articleStore.fetchArticles() // fetch all articles
  
  await fetchStats()
  await fetchUsersList()
})

const fetchStats = async () => {
  try {
    const statsRes = await adminApi.getStats()
    const statsData = statsRes.data.data
    stats.users = statsData.totalUsers
    stats.articles = statsData.totalArticles
    stats.views = statsData.totalViews
    stats.revenue = statsData.totalRevenue
  } catch (err) {
    console.error('Failed to fetch admin stats:', err)
  }
}

const fetchUsersList = async () => {
  try {
    const usersRes = await adminApi.getUsers()
    const rawUsers = usersRes.data.data || []
    users.value = rawUsers.map(u => ({
      id: u.id,
      name: u.displayName || u.username,
      email: u.email,
      role: u.role,
      rank: u.rank?.name || 'Benih',
      suspended: !u.isActive,
      avatar: u.avatar || getDefaultAvatar(u.displayName || u.username || '?')
    }))
  } catch (err) {
    console.error('Failed to fetch admin users:', err)
  }
}

const handleVerify = async (id, action, reason) => {
  try {
    await articleStore.verifyArticle(id, action, reason)
    articleStore.fetchPendingArticles()
    articleStore.fetchArticles()
    await fetchStats()
  } catch (err) {
    console.error(err)
  }
}

const handleDeleteArticle = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    try {
      await articleStore.deleteArticle(id)
      articleStore.fetchArticles()
      await fetchStats()
    } catch (err) {
      console.error(err)
    }
  }
}

const handleToggleFeatured = async (id) => {
  const art = articleStore.articles.find(a => a.id === id)
  if (art) {
    try {
      // Backend: PUT /articles/:id/featured
      await articleStore.toggleFeatured(id)
      uiStore.showNotification('Status unggulan artikel berhasil diperbarui.', 'success')
    } catch (err) {
      console.error(err)
      uiStore.showNotification('Gagal memperbarui status unggulan artikel.', 'error')
    }
  }
}

const handleToggleSuspend = async (userId, newStatus) => {
  try {
    // newStatus = true means user is suspended (isActive = false)
    // newStatus = false means user is unsuspended (isActive = true)
    await adminApi.suspendUser(userId, !newStatus)
    await fetchUsersList()
    await fetchStats()
    uiStore.showNotification(
      newStatus ? 'Pengguna berhasil ditangguhkan.' : 'Penangguhan pengguna berhasil dicabut.',
      'success'
    )
  } catch (err) {
    console.error('Failed to toggle user suspend status:', err)
    uiStore.showNotification(err.response?.data?.message || 'Gagal menangguhkan pengguna.', 'error')
  }
}

const handleUpdateUserRank = async (userId, newRankName) => {
  try {
    const rankMapping = {
      'Benih': 1,
      'Tunas': 2,
      'Pelepah': 3,
      'Mahkota': 4,
      'Raja Sawit': 5
    }
    const rankId = rankMapping[newRankName]
    if (!rankId) throw new Error('Pangkat tidak valid')

    await adminApi.updateUserRank(userId, rankId)
    await fetchUsersList()
    uiStore.showNotification(`Pangkat pengguna berhasil diubah menjadi ${newRankName}.`, 'success')
  } catch (err) {
    console.error('Failed to update user rank:', err)
    uiStore.showNotification(err.response?.data?.message || 'Gagal mengubah pangkat pengguna.', 'error')
  }
}
</script>
