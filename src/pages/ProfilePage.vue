<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800">
      <h1 class="font-extrabold text-2xl text-accent dark:text-white flex items-center gap-2">
        <span class="h-6 w-1 bg-primary rounded-full"></span>
        {{ uiStore.t('contributor_profile') }}
      </h1>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {{ uiStore.t('profile_subtitle') }}
      </p>
    </div>

    <!-- Main Profile Card -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left Column: Avatar & Basic details -->
      <div class="md:col-span-1 space-y-6">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center space-y-4 dark:bg-slate-800 dark:border-slate-700">
          <!-- Avatar -->
          <div class="relative inline-block group">
            <img 
              :src="previewAvatar || getImageUrl(profileData.avatar) || 'https://www.gravatar.com/avatar/?d=mp'" 
              class="h-28 w-28 rounded-full object-cover mx-auto ring-4 ring-primary/20 shadow-lg"
              alt="Profile Avatar"
            />
            <!-- Actual image change -->
            <input type="file" ref="avatarInput" @change="handleAvatarChange" accept="image/*" class="hidden" />
            <button 
              v-if="isOwnProfile && isEditing"
              @click="triggerAvatarSelection"
              class="absolute bottom-0 right-2 bg-primary hover:bg-primary-hover text-white rounded-full p-2 shadow-md hover:scale-105 transition-all"
              type="button"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <!-- Names -->
          <div class="space-y-1">
            <div v-if="isEditing">
              <input 
                type="text" 
                v-model="profileData.name"
                class="w-full text-center px-3 py-1.5 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white"
              />
              <input 
                type="text" 
                v-model="profileData.username"
                class="w-full text-center px-3 py-1.5 border border-gray-200 rounded-xl text-xs text-gray-400 mt-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800"
              />
            </div>
            
            <div v-else>
              <h3 class="font-extrabold text-lg text-slate-800 dark:text-white">{{ profileData.name }}</h3>
              <p class="text-xs text-gray-400 dark:text-gray-500">@{{ profileData.username }}</p>
            </div>
          </div>

          <!-- Subscription Badge -->
          <div class="pt-2">
            <span 
              v-if="profileData.subscription"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-primary to-green-600 text-white shadow shadow-primary/20"
            >
              <svg class="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                <path d="M3 20h18" />
              </svg>
              Pro Member
            </span>
            <span 
              v-else 
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-50 text-slate-400 dark:bg-slate-900 dark:text-slate-500"
            >
              {{ uiStore.t('free_farmer') }}
            </span>
            <p v-if="profileData.subscription" class="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
              {{ uiStore.t('active_until') }} {{ formatDate(profileData.subscription.expiresAt) }}
            </p>
          </div>

          <!-- Action buttons for own profile -->
          <div v-if="isOwnProfile" class="pt-4 border-t border-gray-50 dark:border-slate-700/50 flex flex-col gap-2">
            <button 
              v-if="!isEditing"
              @click="isEditing = true"
              class="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-gray-100 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300 dark:hover:bg-slate-800 transform active:scale-95"
            >
              {{ uiStore.t('edit_profile') }}
            </button>
            <div v-else class="flex gap-2">
              <button 
                @click="isEditing = false"
                class="flex-1 py-2 bg-white border border-gray-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300"
              >
                {{ uiStore.t('cancel') }}
              </button>
              <button 
                @click="handleSaveProfile"
                class="flex-1 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow transition-all transform active:scale-95"
              >
                {{ uiStore.t('save') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Rank progress, Badges, and stats -->
      <div class="md:col-span-2 space-y-6">
        <!-- User Stats component -->
        <UserStats :stats="profileData.stats" />

        <!-- User Rank component -->
        <UserRank :rank="profileData.rank" :stats="profileData.stats" />

        <!-- User Badges component -->
        <UserBadges :badges="profileData.badges" />

        <!-- Own Articles published by this user -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700 space-y-4">
          <h3 class="font-bold text-base text-accent dark:text-white flex items-center gap-1.5">
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
            </svg>
            {{ uiStore.t('published_articles') }}
          </h3>
          
          <div v-if="publishedArticles.length > 0" class="divide-y divide-gray-50 dark:divide-slate-700/50">
            <router-link 
              v-for="art in publishedArticles" 
              :key="art.id"
              :to="`/berita/${art.slug}`"
              class="block py-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/10 transition-all rounded-xl px-2"
            >
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h4 class="text-sm font-bold text-slate-800 hover:text-primary transition-colors dark:text-white line-clamp-1">
                    {{ art.title }}
                  </h4>
                  <p class="text-xxs text-gray-400 mt-1">{{ uiStore.t('category') }}: {{ art.categoryName }} • {{ formatDate(art.publishedAt) }}</p>
                </div>
                <span class="text-xxs font-bold text-slate-500 flex items-center gap-1 dark:text-slate-400">
                  <svg class="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ art.views }}
                </span>
              </div>
            </router-link>
          </div>
          
          <div v-else class="py-6 text-center text-gray-400 dark:text-gray-500 italic text-xs">
            {{ uiStore.t('no_published_articles') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useArticleStore } from '../stores/articles'
import { useUiStore } from '../stores/ui'
import { formatDate, getImageUrl } from '../utils/formatters'
import UserStats from '../components/users/UserStats.vue'
import UserRank from '../components/users/UserRank.vue'
import UserBadges from '../components/users/UserBadges.vue'
import usersApi from '../api/users'

const route = useRoute()
const authStore = useAuthStore()
const articleStore = useArticleStore()
const uiStore = useUiStore()

const isEditing = ref(false)
const profileData = reactive({
  id: '',
  name: '',
  username: '',
  email: '',
  avatar: '',
  rank: 'Benih',
  badges: [],
  stats: { articles: 0, views: 0, likes: 0 },
  subscription: null
})

const isOwnProfile = computed(() => {
  return authStore.isAuthenticated && authStore.user?.id === profileData.id
})

const publishedArticles = computed(() => {
  return articleStore.articles.filter(a => (a.author?.id === profileData.id || a.authorId === profileData.id) && a.status === 'PUBLISHED')
})

onMounted(() => {
  loadProfile()
  articleStore.fetchArticles() // load articles to filter
})

const loadProfile = async () => {
  const profileId = route.params.id
  uiStore.isLoading = true
  
  try {
    const res = await usersApi.getUserById(profileId)
    const user = res.data.data
    setProfile(user)
  } catch (err) {
    console.error('Failed to load profile from API, using fallback:', err)
    if (authStore.isAuthenticated && authStore.user?.id === profileId) {
      setProfile(authStore.user)
    } else {
      setProfile({
        id: profileId,
        name: 'Kontributor SawitNews',
        username: 'kontributor_sawit',
        avatar: 'https://www.gravatar.com/avatar/?d=mp',
        rank: 'Benih',
        badges: ['Pemula'],
        stats: { articles: 0, views: 0, likes: 0 },
        subscription: null
      })
    }
  } finally {
    uiStore.isLoading = false
  }
}

const setProfile = (u) => {
  if (!u) return
  profileData.id = u.id
  profileData.name = u.displayName || u.name || u.username
  profileData.username = u.username
  profileData.email = u.email || ''
  profileData.avatar = u.avatar || 'https://www.gravatar.com/avatar/?d=mp'
  profileData.rank = u.rank?.name || u.rank || 'Benih'
  
  // Ranks badges mapping helper
  const badgesList = []
  if (u.rank) {
    badgesList.push(u.rank.name || u.rank)
  }
  if (u.subscription) {
    badgesList.push(`${u.subscription.name || u.subscription} Member`)
  }
  
  profileData.badges = badgesList.length > 0 ? badgesList : ['Pemula']
  profileData.stats = {
    articles: u.totalArticles !== undefined ? u.totalArticles : (u.stats?.articles || 0),
    views: u.totalViews !== undefined ? u.totalViews : (u.stats?.views || 0),
    likes: u.totalLikes !== undefined ? u.totalLikes : (u.stats?.likes || 0),
  }
  profileData.subscription = u.subscription || null
}

const avatarInput = ref(null)
const previewAvatar = ref(null)
const selectedAvatarFile = ref(null)

const handleSaveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('displayName', profileData.name);
    // username is not strictly handled by updateProfile in backend, but let's pass it if supported
    // formData.append('username', profileData.username);

    if (selectedAvatarFile.value) {
      formData.append('avatar', selectedAvatarFile.value);
    }

    await authStore.updateProfile(formData)
    
    isEditing.value = false
    selectedAvatarFile.value = null
    previewAvatar.value = null
    await loadProfile()
  } catch (err) {
    console.error(err)
  }
}

const triggerAvatarSelection = () => {
  if (avatarInput.value) {
    avatarInput.value.click()
  }
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedAvatarFile.value = file
    previewAvatar.value = URL.createObjectURL(file)
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
