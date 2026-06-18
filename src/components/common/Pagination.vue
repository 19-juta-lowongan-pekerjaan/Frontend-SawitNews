<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 px-4 py-3 sm:px-6 mt-6">
    <!-- Mobile pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button 
        @click="changePage(current - 1)"
        :disabled="current === 1"
        class="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300"
      >
        Sebelumnya
      </button>
      <button 
        @click="changePage(current + 1)"
        :disabled="current === totalPages"
        class="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300"
      >
        Selanjutnya
      </button>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan halaman <span class="font-bold text-gray-700 dark:text-white">{{ current }}</span> dari <span class="font-bold text-gray-700 dark:text-white">{{ totalPages }}</span> halaman
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-xl shadow-sm gap-1" aria-label="Pagination">
          <!-- Prev Button -->
          <button 
            @click="changePage(current - 1)"
            :disabled="current === 1"
            class="relative inline-flex items-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
          >
            <span class="sr-only">Sebelumnya</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Pages -->
          <button 
            v-for="pageNum in totalPages" 
            :key="pageNum"
            @click="changePage(pageNum)"
            :aria-current="current === pageNum ? 'page' : undefined"
            class="relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold border focus:z-20"
            :class="current === pageNum 
              ? 'z-10 bg-primary border-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'"
          >
            {{ pageNum }}
          </button>

          <!-- Next Button -->
          <button 
            @click="changePage(current + 1)"
            :disabled="current === totalPages"
            class="relative inline-flex items-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
          >
            <span class="sr-only">Selanjutnya</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => {
  return Math.ceil(props.total / props.limit)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>
