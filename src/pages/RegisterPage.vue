<template>
  <div class="max-w-md mx-auto py-8">
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6 dark:bg-slate-800 dark:border-slate-700">
      <!-- Title -->
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-accent dark:text-white">{{ uiStore.t('register_welcome') }}</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ uiStore.t('register_subtitle') }}</p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name -->
        <div class="space-y-1">
          <label for="name" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_fullname') }}</label>
          <input 
            id="name"
            v-model="name" 
            type="text" 
            required 
            placeholder="Budi Rahardjo" 
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>

        <!-- Username -->
        <div class="space-y-1">
          <label for="username" class="text-xs font-bold text-slate-800 dark:text-gray-300">Username</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            required 
            placeholder="budi_rahardjo" 
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>

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

        <!-- Terms agreement -->
        <label class="flex items-start gap-2 cursor-pointer select-none text-xxs text-gray-500 font-bold dark:text-gray-400">
          <input type="checkbox" required class="rounded border-gray-300 text-primary focus:ring-primary mt-0.5 dark:bg-slate-900" />
          <span>{{ uiStore.t('agree_terms') }}</span>
        </label>

        <!-- Submit -->
        <button 
          type="submit" 
          :disabled="uiStore.isLoading"
          class="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span v-if="uiStore.isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
          <span v-else>{{ uiStore.t('register_btn') }}</span>
        </button>
      </form>

      <!-- Links -->
      <div class="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-50 dark:border-slate-700">
        <span>{{ uiStore.t('already_have_account') }} </span>
        <router-link to="/login" class="text-primary hover:underline font-bold">{{ uiStore.t('login_here') }}</router-link>
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

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const success = await authStore.register({
      name: name.value,
      username: username.value,
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
