<template>
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
    <div class="p-6 border-b border-gray-50 dark:border-slate-700">
      <h3 class="font-bold text-base text-accent dark:text-white">Kelola Semua Artikel</h3>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Daftar semua artikel yang ada di portal SawitNews</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-gray-100 text-xxs font-black uppercase text-gray-500 tracking-wider dark:bg-slate-900/50 dark:border-slate-700">
            <th class="py-4 px-6">Berita</th>
            <th class="py-4 px-6">Penulis</th>
            <th class="py-4 px-6">Kategori</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-center">Views</th>
            <th class="py-4 px-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
          <tr 
            v-for="art in articles" 
            :key="art.id"
            class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
          >
            <!-- Title -->
            <td class="py-4 px-6">
              <div class="flex flex-col leading-tight max-w-xs sm:max-w-md">
                <router-link :to="`/berita/${art.slug}`" class="font-bold text-slate-800 hover:text-primary transition-colors dark:text-white truncate">
                  {{ art.title }}
                </router-link>
                <span class="text-xxs text-gray-400 mt-0.5">ID: {{ art.id }}</span>
              </div>
            </td>

            <!-- Author -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-2">
                <img :src="art.author?.avatar" class="h-6 w-6 rounded-full object-cover" />
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {{ art.anonymous ? 'Anonim' : art.author?.name }}
                </span>
              </div>
            </td>

            <!-- Category -->
            <td class="py-4 px-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {{ art.categoryName }}
            </td>

            <!-- Status -->
            <td class="py-4 px-6 text-center">
              <span 
                class="px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider"
                :class="statusClasses(art.status)"
              >
                {{ art.status }}
              </span>
            </td>

            <!-- Views -->
            <td class="py-4 px-6 text-center font-bold text-xs text-slate-600 dark:text-slate-400">
              {{ art.views }}
            </td>

            <!-- Actions -->
            <td class="py-4 px-6 text-right space-x-2">
              <!-- Feature Toggle -->
              <button 
                @click="$emit('feature', art.id)"
                class="inline-flex p-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-gray-200 text-xs font-bold transition-all dark:bg-slate-900 dark:border-slate-800"
                :class="art.featured ? 'text-secondary bg-secondary/10 dark:text-secondary-hover' : 'text-slate-400'"
                title="Tandai Unggulan"
              >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </button>
              
              <!-- Delete -->
              <button 
                @click="$emit('delete', art.id)"
                class="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 border border-transparent hover:border-red-200 transition-all dark:hover:bg-red-950/20"
                title="Hapus Artikel"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
})

defineEmits(['delete', 'feature'])

const statusClasses = (status) => {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400'
    case 'PENDING':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
    case 'DRAFT':
      return 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'
    case 'REJECTED':
      return 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
