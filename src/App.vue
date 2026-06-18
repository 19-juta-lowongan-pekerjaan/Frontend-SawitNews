<template>
  <!-- Premium Entry Splash Screen (Light Mode) -->
  <transition name="splash-fade">
    <div 
      v-if="showSplash" 
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-850 select-none"
    >
      <!-- Background Ambient Glows (Light Mode styling) -->
      <div class="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-12 -left-12 animate-pulse"></div>
      <div class="absolute w-96 h-96 bg-secondary/8 rounded-full blur-3xl -bottom-12 -right-12 animate-pulse" style="animation-delay: 1s"></div>

      <!-- Content Container -->
      <div class="relative z-10 flex flex-col items-center space-y-6 text-center px-4">
        <!-- Logo Container with spinning ring and floating animation -->
        <div class="relative w-32 h-32 flex items-center justify-center animate-bounce-slow">
          <!-- Spinning Dashed Ring -->
          <div class="absolute inset-0 border-4 border-dashed border-primary/35 rounded-full animate-spin-slow"></div>
          <!-- Inner circle shield -->
          <div class="absolute inset-2 border border-slate-100 rounded-full bg-slate-50/50 shadow-inner"></div>
          
          <img 
            src="/Gemini_Generated_Image_bey94kbey94kbey9-removebg-preview.png"
            class="h-16 w-16 object-contain relative z-10 filter drop-shadow-[0_4px_10px_rgba(34,197,94,0.15)]"
            alt="SawitNews Logo"
          />
        </div>

        <!-- Cool capsule badge with Write • Read • Nyawit!! -->
        <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/8 border border-primary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm animate-pulse-slow">
          <span>Write</span>
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          <span>Read</span>
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          <span>Nyawit!!</span>
        </div>

        <!-- Title / Brand -->
        <div class="space-y-1">
          <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Sawit<span class="text-primary drop-shadow-[0_2px_4px_rgba(34,197,94,0.15)]">News</span>
          </h1>
          <p class="text-xs text-slate-500 font-bold tracking-widest uppercase">
            Sawit News & Education Portal
          </p>
        </div>

        <!-- Premium Loading Bar -->
        <div class="w-48 bg-slate-100 rounded-full h-1 p-0.5 overflow-hidden border border-slate-200/50">
          <div class="bg-primary h-full rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Main Website Container -->
  <div 
    class="min-h-screen flex flex-col bg-background dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all duration-700 ease-out"
    :class="{ 'opacity-0 scale-95 pointer-events-none': showSplash, 'opacity-100 scale-100': !showSplash }"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- App-wide Floating Toast Notifications -->
    <Notification />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUiStore } from './stores/ui'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import Notification from './components/common/Notification.vue'

const uiStore = useUiStore()
const showSplash = ref(true)

onMounted(() => {
  uiStore.initTheme()
  setTimeout(() => {
    showSplash.value = false
  }, 1600) // 1.6s splash load time
})
</script>

<style>
/* Spin Slow Animation */
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Bounce Slow Animation */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

/* Pulse Slow Animation */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.75;
  }
}
.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Loading Bar Animation */
@keyframes loading-bar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
.animate-loading-bar {
  animation: loading-bar 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Splash Fade Transition */
.splash-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.splash-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(10px);
}

/* CSS transition for route switching */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
