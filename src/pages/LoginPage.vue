<template>
  <div class="max-w-md mx-auto py-8">
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6 dark:bg-slate-800 dark:border-slate-700">
      <!-- Title -->
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-accent dark:text-white">{{ uiStore.t('login_welcome') }}</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ uiStore.t('login_subtitle') }}</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div class="space-y-1">
          <label for="email" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_email') }}</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            required 
            placeholder="nama@email.com" 
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>

        <!-- Password -->
        <div class="space-y-1">
          <label for="password" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_password') }}</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>

        <!-- Remember Me Check -->
        <div class="flex items-center justify-between text-xxs font-bold text-slate-500 dark:text-slate-400">
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary dark:bg-slate-900" />
            <span>{{ uiStore.t('remember_me') }}</span>
          </label>
          <a href="#" class="hover:text-primary transition-colors">{{ uiStore.t('forgot_password') }}</a>
        </div>

        <!-- Submit -->
        <button 
          type="submit" 
          :disabled="uiStore.isLoading"
          class="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span v-if="uiStore.isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
          <span v-else>{{ uiStore.t('login_btn') }}</span>
        </button>
      </form>

      <!-- Testing Credentials Box (Extremely helpful for user preview!) -->
      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800 space-y-2.5">
        <h4 class="text-xxs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12.5 2.5 5.5 5.5 0 0 0 7 8c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
          {{ uiStore.t('demo_account_title') }}
        </h4>
        <ul class="text-[10px] text-gray-500 space-y-1 leading-normal dark:text-gray-400">
          <li><strong>Admin:</strong> <code class="bg-white px-1 py-0.5 rounded border dark:bg-slate-800 dark:border-slate-700">admin@sawitnews.com</code> (pass: password)</li>
          <li><strong>Moderator:</strong> <code class="bg-white px-1 py-0.5 rounded border dark:bg-slate-800 dark:border-slate-700">moderator@sawitnews.com</code> (pass: password)</li>
          <li><strong>User:</strong> <code class="bg-white px-1 py-0.5 rounded border dark:bg-slate-800 dark:border-slate-700">user@sawitnews.com</code> (pass: password)</li>
        </ul>
      </div>

      <!-- Links -->
      <div class="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-50 dark:border-slate-700">
        <span>{{ uiStore.t('no_account_yet') }} </span>
        <router-link to="/register" class="text-primary hover:underline font-bold">{{ uiStore.t('register_now') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      router.push('/')
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
