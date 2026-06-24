<template>
  <div class="space-y-6">
    <!-- Filters Header -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4 items-center justify-between dark:bg-slate-800 dark:border-slate-700">
      <!-- Search -->
      <div class="relative w-full sm:max-w-xs">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          type="text" 
          v-model="searchQuery"
          :placeholder="uiStore.t('search_contributor')" 
          class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white"
        />
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span class="font-bold text-gray-500 dark:text-gray-400">{{ uiStore.t('sort_by') }}</span>
        <select 
          v-model="sortBy"
          @change="fetchLeaderboard"
          class="px-3 py-1.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300"
        >
          <option value="totalArticles">{{ uiStore.t('total_articles') }}</option>
          <option value="totalViews">{{ uiStore.t('total_readers') }}</option>
          <option value="totalLikes">{{ uiStore.t('total_likes') }}</option>
          <option value="totalComments">{{ uiStore.t('total_comments') }}</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary/20 border-t-primary"></div>
    </div>

    <!-- Table Card -->
    <div v-else class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-gray-100 text-xxs font-black uppercase text-gray-500 tracking-wider dark:bg-slate-900/50 dark:border-slate-700">
              <th class="py-4 px-6 text-center w-16">{{ uiStore.t('table_rank') }}</th>
              <th class="py-4 px-6">{{ uiStore.t('table_contributor') }}</th>
              <th class="py-4 px-6">{{ uiStore.t('table_badge') }}</th>
              <th class="py-4 px-6 text-center">{{ uiStore.t('table_articles') }}</th>
              <th class="py-4 px-6 text-center">{{ uiStore.t('table_readers') }}</th>
              <th class="py-4 px-6 text-center">{{ uiStore.t('table_likes') }}</th>
              <th class="py-4 px-6 text-center">{{ uiStore.t('table_comments') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <tr 
              v-for="(user, index) in paginatedUsers" 
              :key="user.id"
              class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
            >
              <!-- Rank position -->
              <td class="py-4 px-6 text-center font-black text-slate-700 dark:text-slate-200">
                <span 
                  v-if="index === 0 && page === 1" 
                  class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100 shadow-sm dark:bg-yellow-950/20 dark:border-yellow-900/50"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="6"/><path stroke-linecap="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
                </span>
                <span 
                  v-else-if="index === 1 && page === 1" 
                  class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-500 border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="6"/><path stroke-linecap="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
                </span>
                <span 
                  v-else-if="index === 2 && page === 1" 
                  class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-700 border border-amber-100 shadow-sm dark:bg-amber-950/20 dark:border-amber-900/50"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="6"/><path stroke-linecap="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
                </span>
                <span v-else class="text-gray-400">{{ (page - 1) * limit + index + 1 }}</span>
              </td>

              <!-- Profile -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <img 
                    :src="getImageUrl(user.avatar) || getDefaultAvatar(user.displayName || user.username || '?')" 
                    class="h-9 w-9 rounded-full object-cover shadow-inner"
                    @error="(e) => e.target.src = getDefaultAvatar(user.displayName || user.username || '?')"
                  />
                  <div class="flex flex-col leading-tight">
                    <router-link :to="`/profil/${user.id}`" class="font-bold text-slate-800 hover:text-primary transition-colors dark:text-white">
                      {{ user.displayName || user.username }}
                    </router-link>
                    <span class="text-xxs text-gray-400 dark:text-gray-500">@{{ user.username }}</span>
                  </div>
                </div>
              </td>

              <!-- Badge / Rank -->
              <td class="py-4 px-6">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xxs font-bold shadow-sm"
                  :class="[getBadge(user.rank?.name).bg, getBadge(user.rank?.name).text]"
                >
                  <span class="w-4 h-4 flex items-center justify-center" v-html="getBadge(user.rank?.name).icon"></span>
                  <span>{{ user.rank?.name || '-' }}</span>
                </span>
              </td>

              <!-- Articles Count -->
              <td class="py-4 px-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                {{ user.totalArticles || 0 }}
              </td>

              <!-- Views Count -->
              <td class="py-4 px-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                {{ formatNumber(user.totalViews || 0) }}
              </td>

              <!-- Likes Count -->
              <td class="py-4 px-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                {{ formatNumber(user.totalLikes || 0) }}
              </td>

              <!-- Comments Count -->
              <td class="py-4 px-6 text-center font-semibold text-slate-600 dark:text-slate-300">
                {{ formatNumber(user.totalComments || 0) }}
              </td>
            </tr>

            <!-- Empty state -->
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="7" class="py-16 text-center text-gray-400 dark:text-gray-500 italic text-sm">
                {{ searchQuery ? 'No contributors found for your search.' : 'No contributors yet.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between dark:bg-slate-900/30 dark:border-slate-700">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ uiStore.t('showing_contributors_prefix') }} {{ filteredUsers.length }} {{ uiStore.t('showing_contributors_suffix') }}
        </span>
        <div class="flex gap-2">
          <button 
            @click="page = Math.max(1, page - 1)" 
            :disabled="page === 1"
            class="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300"
          >
            {{ uiStore.t('prev') }}
          </button>
          <button 
            @click="page = Math.min(totalPages, page + 1)" 
            :disabled="page === totalPages"
            class="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300"
          >
            {{ uiStore.t('next') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getBadge, getImageUrl, getDefaultAvatar } from '../../utils/formatters'
import { useUiStore } from '../../stores/ui'
import usersApi from '../../api/users'

const uiStore = useUiStore()

const searchQuery = ref('')
const sortBy = ref('totalArticles')
const page = ref(1)
const limit = ref(10)
const loading = ref(false)
const allUsers = ref([])

const fetchLeaderboard = async () => {
  loading.value = true
  try {
    const params = {
      limit: 100, // Fetch more to allow for client-side search
      sortBy: sortBy.value,
      sortOrder: 'desc',
    }
    const res = await usersApi.getLeaderboard(params)
    const data = res.data?.data || res.data || []
    allUsers.value = Array.isArray(data) ? data : (data.data || data.users || [])
  } catch (err) {
    console.error('Failed to load leaderboard:', err)
    allUsers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchLeaderboard)

watch(sortBy, fetchLeaderboard)

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return allUsers.value
  }
  const q = searchQuery.value.toLowerCase()
  return allUsers.value.filter(u =>
    (u.displayName || '').toLowerCase().includes(q) ||
    (u.username || '').toLowerCase().includes(q)
  )
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / limit.value) || 1)

const paginatedUsers = computed(() => {
  const start = (page.value - 1) * limit.value
  return filteredUsers.value.slice(start, start + limit.value)
})

const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num || 0)
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
