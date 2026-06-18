<template>
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
    <div class="p-6 border-b border-gray-50 dark:border-slate-700 flex justify-between items-center">
      <div>
        <h3 class="font-bold text-base text-accent dark:text-white flex items-center gap-1.5">
          <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Antrean Verifikasi Berita
        </h3>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Artikel dari kontributor yang menunggu peninjauan moderator</p>
      </div>
      <span class="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold text-xxs dark:bg-amber-950/20 dark:text-amber-400">
        {{ articles.length }} Tertunda
      </span>
    </div>

    <!-- Articles list queue -->
    <div class="divide-y divide-gray-50 dark:divide-slate-700/50">
      <div 
        v-for="art in articles" 
        :key="art.id"
        class="p-6 space-y-4"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <!-- Summary info -->
          <div class="space-y-1">
            <h4 class="font-extrabold text-slate-800 dark:text-white hover:text-primary transition-colors text-base leading-snug">
              {{ art.title }}
            </h4>
            <div class="flex items-center gap-4 text-xxs text-gray-400 dark:text-gray-500 font-medium">
              <span class="flex items-center gap-1">
                <img :src="art.author?.avatar" class="h-4 w-4 rounded-full object-cover" />
                {{ art.anonymous ? 'Anonim' : art.author?.name }}
              </span>
              <span>•</span>
              <span>Kategori: {{ art.categoryName }}</span>
              <span>•</span>
              <span>Estimasi: {{ art.readingTime }} mnt baca</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex gap-2 w-full sm:w-auto">
            <!-- Expand Button to read -->
            <button 
              @click="toggleExpand(art.id)"
              class="px-4 py-2 bg-white border border-gray-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300 transition-all flex items-center gap-1"
            >
              {{ expandedId === art.id ? 'Tutup Baca' : 'Baca & Tinjau' }}
            </button>
            
            <!-- Approve -->
            <button 
              @click="handleVerify(art.id, 'approve')"
              class="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 transition-all flex items-center gap-1 transform active:scale-95"
            >
              Setujui
            </button>

            <!-- Reject Dialog Trigger -->
            <button 
              @click="openRejectDialog(art.id)"
              class="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-bold rounded-xl transition-all flex items-center gap-1 transform active:scale-95"
            >
              Tolak
            </button>
          </div>
        </div>

        <!-- Collapsible Article Read Area -->
        <div 
          v-if="expandedId === art.id" 
          class="bg-slate-50 rounded-2xl p-5 border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 space-y-4 animate-slide"
        >
          <!-- Featured Image Preview -->
          <img :src="art.featuredImage" class="w-full h-48 object-cover rounded-xl shadow-sm" />
          
          <div class="space-y-1">
            <span class="text-xxs font-bold text-gray-400 uppercase tracking-wider">Ringkasan</span>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 italic">
              "{{ art.summary }}"
            </p>
          </div>

          <!-- HTML body prose -->
          <div class="prose prose-sm max-w-none pt-4 border-t border-slate-200/50 dark:prose-invert" v-html="art.content"></div>
        </div>

        <!-- Collapsible Reject Dialog (Reason input) -->
        <div 
          v-if="rejectingId === art.id"
          class="bg-red-50/50 border border-red-100 rounded-2xl p-4 space-y-3 dark:bg-red-950/10 dark:border-red-900/50 animate-slide"
        >
          <label class="text-xs font-bold text-red-800 dark:text-red-300">Alasan Penolakan Artikel</label>
          <input 
            type="text" 
            v-model="rejectionReason"
            placeholder="Tulis alasan penolakan (misal: isi kurang relevan, butuh penyuntingan)..." 
            class="w-full px-3 py-2 border border-red-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            @keyup.enter="handleVerify(art.id, 'reject')"
          />
          <div class="flex justify-end gap-2">
            <button @click="rejectingId = null" class="px-3 py-1.5 text-xxs font-bold text-gray-500 bg-white border rounded-lg hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
              Batal
            </button>
            <button @click="handleVerify(art.id, 'reject')" :disabled="!rejectionReason.trim()" class="px-3 py-1.5 text-xxs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow disabled:opacity-50">
              Tolak Artikel
            </button>
          </div>
        </div>
      </div>

      <!-- Empty Queue Fallback -->
      <div v-if="articles.length === 0" class="py-12 text-center flex flex-col items-center justify-center space-y-2">
        <span class="text-primary p-3 bg-green-50 dark:bg-green-950/20 rounded-full">
          <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <h4 class="font-bold text-sm text-slate-800 dark:text-white pt-2">Semua Beres!</h4>
        <p class="text-xs text-gray-400 dark:text-gray-500 max-w-xs leading-normal">
          Tidak ada artikel kontributor yang perlu ditinjau saat ini. Antrean verifikasi kosong.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  articles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['verify'])

const expandedId = ref(null)
const rejectingId = ref(null)
const rejectionReason = ref('')

const toggleExpand = (id) => {
  if (expandedId.value === id) {
    expandedId.value = null
  } else {
    expandedId.value = id
  }
}

const openRejectDialog = (id) => {
  rejectingId.value = id
  rejectionReason.value = ''
}

const handleVerify = (id, action) => {
  if (action === 'approve') {
    emit('verify', id, 'approve')
  } else if (action === 'reject') {
    if (rejectionReason.value.trim()) {
      emit('verify', id, 'reject', rejectionReason.value)
      rejectingId.value = null
      rejectionReason.value = ''
    }
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
.animate-slide {
  animation: slideDown 0.2s ease-out;
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
