<template>
  <transition name="toast">
    <div 
      v-if="uiStore.notification" 
      class="fixed bottom-5 right-5 z-50 max-w-md w-full sm:w-auto p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md transition-all duration-300 transform"
      :class="toastClasses"
    >
      <!-- Icon -->
      <span class="p-2 rounded-xl text-white shadow-sm" :class="iconBgClass">
        <svg v-if="uiStore.notification.type === 'success'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else-if="uiStore.notification.type === 'error'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else-if="uiStore.notification.type === 'warning'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>

      <!-- Content -->
      <div class="flex-1">
        <p class="text-sm font-semibold text-slate-800 dark:text-white">
          {{ uiStore.notification.message }}
        </p>
      </div>

      <!-- Close Button -->
      <button 
        @click="uiStore.clearNotification()"
        class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const toastClasses = computed(() => {
  const type = uiStore.notification?.type
  switch (type) {
    case 'success':
      return 'bg-green-50/95 border-green-200 dark:bg-green-950/95 dark:border-green-800 text-green-800 dark:text-green-100'
    case 'error':
      return 'bg-red-50/95 border-red-200 dark:bg-red-950/95 dark:border-red-800 text-red-800 dark:text-red-100'
    case 'warning':
      return 'bg-amber-50/95 border-amber-200 dark:bg-amber-950/95 dark:border-amber-800 text-amber-800 dark:text-amber-100'
    case 'info':
    default:
      return 'bg-sky-50/95 border-sky-200 dark:bg-slate-900/95 dark:border-slate-800 text-sky-800 dark:text-sky-100'
  }
})

const iconBgClass = computed(() => {
  const type = uiStore.notification?.type
  switch (type) {
    case 'success': return 'bg-green-600 dark:bg-green-500'
    case 'error': return 'bg-red-600 dark:bg-red-500'
    case 'warning': return 'bg-amber-500'
    case 'info':
    default:
      return 'bg-primary'
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
