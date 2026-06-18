<template>
  <div class="comment-form-container">
    <div v-if="authStore.isAuthenticated" class="space-y-3">
      <div class="flex gap-3">
        <!-- Current User Avatar -->
        <img 
          :src="authStore.user?.avatar || 'https://www.gravatar.com/avatar/?d=mp'" 
          class="h-9 w-9 rounded-full object-cover" 
          alt="Current User Avatar"
        />
        
        <!-- Input Area -->
        <div class="flex-1">
          <textarea 
            v-model="commentText"
            rows="3"
            :placeholder="uiStore.t('comment_placeholder')"
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          ></textarea>
        </div>
      </div>
      
      <!-- Submit Actions -->
      <div class="flex justify-end">
        <button 
          @click="handleSubmit"
          :disabled="!commentText.trim()"
          class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95 flex items-center gap-1.5"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {{ uiStore.t('submit_opinion') }}
        </button>
      </div>
    </div>
    
    <div 
      v-else 
      class="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center dark:bg-slate-900 dark:border-slate-800"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ uiStore.t('login_required_comment') }}
      </p>
      <div class="flex gap-3 justify-center mt-3">
        <router-link to="/login" class="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm">
          {{ uiStore.t('login_now') }}
        </router-link>
        <router-link to="/register" class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 transition-all shadow-sm">
          {{ uiStore.t('register_account') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'

const authStore = useAuthStore()
const uiStore = useUiStore()
const commentText = ref('')
const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (commentText.value.trim()) {
    emit('submit', commentText.value)
    commentText.value = ''
  }
}
</script>
