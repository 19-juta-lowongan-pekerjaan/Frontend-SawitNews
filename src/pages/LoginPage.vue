<template>
  <div class="relative min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Ambient Background Glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[85px] pointer-events-none dark:bg-primary/5"></div>
    <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[85px] pointer-events-none dark:bg-secondary/5"></div>

    <div class="relative w-full max-w-md space-y-6">
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-2xl p-8 space-y-6 dark:bg-slate-800/80 dark:border-slate-700/80 transition-all duration-300">
        
        <!-- Header / Logo -->
        <div class="text-center space-y-3">
          <div class="inline-flex p-3 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl dark:from-primary/20 dark:to-secondary/20 shadow-inner">
            <img src="/icon-sawit.svg" alt="SawitNews" class="w-12 h-12 object-contain" />
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-black text-accent dark:text-white tracking-tight">
              {{ uiStore.t('login_welcome') }}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
              {{ uiStore.t('login_subtitle') }}
            </p>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="loginError" class="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 dark:bg-rose-950/30 dark:border-rose-900/50">
          <div class="p-2 bg-rose-100 text-rose-600 rounded-xl shrink-0 dark:bg-rose-500/20 dark:text-rose-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-bold text-rose-800 dark:text-rose-400">Login Gagal</h3>
            <p class="text-xs text-rose-600 mt-0.5 dark:text-rose-300 leading-relaxed">{{ loginError }}</p>
          </div>
          <button type="button" @click="loginError = ''" class="p-1 text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors rounded-lg hover:bg-rose-100/50 dark:hover:bg-rose-900/20">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4" novalidate>
          <!-- Email -->
          <div class="space-y-1.5">
            <label for="email" class="text-xs font-bold text-slate-800 dark:text-gray-300 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ uiStore.t('label_email') }}
            </label>
            <input 
              id="email"
              v-model="email" 
              @blur="touchEmail"
              type="email" 
              placeholder="nama@email.com" 
              :class="[
                'w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-all duration-200',
                errors.email ? 'border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900'
              ]"
            />
            <p v-if="errors.email" class="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
              <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div class="space-y-1.5">
            <label for="password" class="text-xs font-bold text-slate-800 dark:text-gray-300 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {{ uiStore.t('label_password') }}
            </label>
            <div class="relative">
              <input 
                id="password"
                v-model="password" 
                @blur="touchPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••" 
                :class="[
                  'w-full px-4 py-3 pr-11 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-all duration-200',
                  errors.password ? 'border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900'
                ]"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                tabindex="-1"
              >
                <svg v-if="showPassword" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
              <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me Check & Forgot Password -->
          <div class="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary dark:bg-slate-900 dark:border-slate-800 transition-colors" />
              <span class="group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">{{ uiStore.t('remember_me') }}</span>
            </label>
            <a href="#" class="hover:text-primary transition-colors">{{ uiStore.t('forgot_password') }}</a>
          </div>

          <!-- Submit (No Loading Animation, just regular disabled state) -->
          <button 
            type="submit" 
            :disabled="uiStore.isLoading"
            class="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>{{ uiStore.t('login_btn') }}</span>
          </button>
        </form>

        <!-- Links -->
        <div class="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
          <span>{{ uiStore.t('no_account_yet') }} </span>
          <router-link to="/register" class="text-primary hover:underline font-bold">{{ uiStore.t('register_now') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loginError = ref('')
const touched = reactive({ email: false, password: false })

const errors = reactive({
  email: '',
  password: ''
})

const validateEmail = () => {
  if (!email.value.trim()) {
    errors.email = 'Email wajib diisi.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.email = 'Format email tidak valid.'
  } else {
    errors.email = ''
  }
}

const validatePassword = () => {
  if (!password.value) {
    errors.password = 'Password wajib diisi.'
  } else if (password.value.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  } else {
    errors.password = ''
  }
}

const touchEmail = () => { touched.email = true; validateEmail() }
const touchPassword = () => { touched.password = true; validatePassword() }

const handleLogin = async () => {
  touched.email = true
  touched.password = true
  validateEmail()
  validatePassword()

  if (errors.email || errors.password) return

  loginError.value = ''

  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      router.push('/')
    }
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Email atau password yang Anda masukkan salah. Silakan coba lagi.'
    console.error(err)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
