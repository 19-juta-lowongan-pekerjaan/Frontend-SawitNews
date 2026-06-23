<template>
  <div class="max-w-md mx-auto py-8">
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6 dark:bg-slate-800 dark:border-slate-700">
      <!-- Title -->
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-accent dark:text-white">{{ uiStore.t('register_welcome') }}</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ uiStore.t('register_subtitle') }}</p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="handleRegister" class="space-y-4" novalidate>
        <!-- Name -->
        <div class="space-y-1">
          <label for="name" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_fullname') }}</label>
          <input 
            id="name"
            v-model="name" 
            @blur="touch('name')"
            type="text" 
            placeholder="Budi Rahardjo" 
            :class="[
              'w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-colors',
              errors.name ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-800'
            ]"
          />
          <p v-if="errors.name" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {{ errors.name }}
          </p>
        </div>

        <!-- Username -->
        <div class="space-y-1">
          <label for="username" class="text-xs font-bold text-slate-800 dark:text-gray-300">Username</label>
          <input 
            id="username"
            v-model="username" 
            @blur="touch('username')"
            type="text" 
            placeholder="budi_rahardjo" 
            :class="[
              'w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-colors',
              errors.username ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-800'
            ]"
          />
          <p v-if="errors.username" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {{ errors.username }}
          </p>
        </div>

        <!-- Email -->
        <div class="space-y-1">
          <label for="email" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_email') }}</label>
          <input 
            id="email"
            v-model="email" 
            @blur="touch('email')"
            type="email" 
            placeholder="nama@email.com" 
            :class="[
              'w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-colors',
              errors.email ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-800'
            ]"
          />
          <p v-if="errors.email" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="space-y-1">
          <label for="password" class="text-xs font-bold text-slate-800 dark:text-gray-300">{{ uiStore.t('label_password') }}</label>
          <div class="relative">
            <input 
              id="password"
              v-model="password" 
              @blur="touch('password')"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••" 
              :class="[
                'w-full px-4 py-3 pr-11 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-colors',
                errors.password ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-800'
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
          <!-- Password strength indicator -->
          <div v-if="password.length > 0" class="flex gap-1 mt-1.5">
            <div v-for="i in 4" :key="i"
              class="h-1 flex-1 rounded-full transition-all duration-300"
              :class="passwordStrength >= i ? strengthColor : 'bg-gray-100 dark:bg-slate-700'"
            ></div>
          </div>
          <p v-if="password.length > 0 && !errors.password" class="text-xxs mt-0.5" :class="strengthTextColor">{{ strengthLabel }}</p>
          <p v-if="errors.password" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-1">
          <label for="confirmPassword" class="text-xs font-bold text-slate-800 dark:text-gray-300">Konfirmasi Password</label>
          <input 
            id="confirmPassword"
            v-model="confirmPassword" 
            @blur="touch('confirmPassword')"
            type="password"
            placeholder="••••••••" 
            :class="[
              'w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:text-white transition-colors',
              errors.confirmPassword ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-800'
            ]"
          />
          <p v-if="errors.confirmPassword" class="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Terms agreement -->
        <label class="flex items-start gap-2 cursor-pointer select-none text-xxs text-gray-500 font-bold dark:text-gray-400">
          <input type="checkbox" v-model="agreedTerms" class="rounded border-gray-300 text-primary focus:ring-primary mt-0.5 dark:bg-slate-900" />
          <span>{{ uiStore.t('agree_terms') }}</span>
        </label>
        <p v-if="errors.terms" class="text-xs text-red-500 flex items-center gap-1 -mt-2">
          <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {{ errors.terms }}
        </p>

        <!-- Submit -->
        <button 
          type="submit" 
          :disabled="uiStore.isLoading"
          class="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
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
import { ref, reactive, computed } from 'vue'
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
const confirmPassword = ref('')
const agreedTerms = ref(false)
const showPassword = ref(false)

const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

// Password strength
const passwordStrength = computed(() => {
  const pw = password.value
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
})

const strengthColor = computed(() => {
  const s = passwordStrength.value
  if (s <= 1) return 'bg-red-400'
  if (s === 2) return 'bg-orange-400'
  if (s === 3) return 'bg-yellow-400'
  return 'bg-green-500'
})

const strengthTextColor = computed(() => {
  const s = passwordStrength.value
  if (s <= 1) return 'text-red-500'
  if (s === 2) return 'text-orange-500'
  if (s === 3) return 'text-yellow-600'
  return 'text-green-600'
})

const strengthLabel = computed(() => {
  const s = passwordStrength.value
  if (s <= 1) return 'Password sangat lemah'
  if (s === 2) return 'Password lemah'
  if (s === 3) return 'Password cukup kuat'
  return 'Password sangat kuat'
})

const validators = {
  name: () => {
    if (!name.value.trim()) return 'Nama lengkap wajib diisi.'
    if (name.value.trim().length < 2) return 'Nama minimal 2 karakter.'
    return ''
  },
  username: () => {
    if (!username.value.trim()) return 'Username wajib diisi.'
    if (username.value.length < 3) return 'Username minimal 3 karakter.'
    if (!/^[a-z0-9_]+$/.test(username.value)) return 'Username hanya boleh huruf kecil, angka, dan underscore.'
    return ''
  },
  email: () => {
    if (!email.value.trim()) return 'Email wajib diisi.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Format email tidak valid.'
    return ''
  },
  password: () => {
    if (!password.value) return 'Password wajib diisi.'
    if (password.value.length < 6) return 'Password minimal 6 karakter.'
    return ''
  },
  confirmPassword: () => {
    if (!confirmPassword.value) return 'Konfirmasi password wajib diisi.'
    if (confirmPassword.value !== password.value) return 'Konfirmasi password tidak cocok.'
    return ''
  },
  terms: () => {
    if (!agreedTerms.value) return 'Anda harus menyetujui syarat & ketentuan.'
    return ''
  }
}

const touch = (field) => {
  errors[field] = validators[field]()
}

const validateAll = () => {
  for (const field in validators) {
    errors[field] = validators[field]()
  }
  return Object.values(errors).every(e => !e)
}

const handleRegister = async () => {
  if (!validateAll()) return

  try {
    const success = await authStore.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    if (success) {
      router.push('/login')
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
