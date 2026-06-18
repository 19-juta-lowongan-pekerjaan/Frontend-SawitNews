<template>
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
    <div class="p-6 border-b border-gray-50 dark:border-slate-700">
      <h3 class="font-bold text-base text-accent dark:text-white">Kelola Anggota & Kontributor</h3>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Daftar pengguna terdaftar di portal SawitNews</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-gray-100 text-xxs font-black uppercase text-gray-500 tracking-wider dark:bg-slate-900/50 dark:border-slate-700">
            <th class="py-4 px-6">Pengguna</th>
            <th class="py-4 px-6">Role</th>
            <th class="py-4 px-6">Pangkat</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-right">Ubah Pangkat / Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50 dark:divide-slate-700/50">
          <tr 
            v-for="user in users" 
            :key="user.id"
            class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
          >
            <!-- Name & Email -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <img :src="user.avatar" class="h-9 w-9 rounded-full object-cover" />
                <div class="flex flex-col leading-tight">
                  <span class="font-bold text-slate-800 dark:text-white">{{ user.name }}</span>
                  <span class="text-xxs text-gray-400 dark:text-gray-500">{{ user.email }}</span>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td class="py-4 px-6">
              <span 
                class="px-2 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider"
                :class="roleClasses(user.role)"
              >
                {{ user.role }}
              </span>
            </td>

            <!-- Rank -->
            <td class="py-4 px-6">
              <span 
                class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xxs font-bold bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <span class="w-4 h-4 flex items-center justify-center" v-html="getBadge(user.rank || 'Benih').icon"></span>
                <span>{{ user.rank || 'Benih' }}</span>
              </span>
            </td>

            <!-- Status -->
            <td class="py-4 px-6 text-center">
              <span 
                class="px-2.5 py-0.5 rounded-full text-xxs font-bold"
                :class="user.suspended ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'"
              >
                {{ user.suspended ? 'DITANGGUHKAN' : 'AKTIF' }}
              </span>
            </td>

            <!-- Actions -->
            <td class="py-4 px-6 text-right space-x-2">
              <!-- Edit Rank Select dropdown -->
              <select 
                :value="user.rank"
                @change="handleRankChange(user.id, $event.target.value)"
                class="px-2 py-1 bg-slate-50 border border-gray-200 rounded-xl text-xxs font-bold text-gray-700 focus:outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300"
              >
                <option value="Benih">Benih</option>
                <option value="Tunas">Tunas</option>
                <option value="Pelepah">Pelepah</option>
                <option value="Mahkota">Mahkota</option>
                <option value="Raja Sawit">Raja Sawit</option>
              </select>

              <!-- Suspend Action -->
              <button 
                @click="$emit('suspend', user.id, !user.suspended)"
                class="px-2.5 py-1 rounded-xl text-xxs font-bold transition-all border transform active:scale-95"
                :class="user.suspended
                  ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400'
                  : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400'"
              >
                {{ user.suspended ? 'Aktifkan' : 'Tangguhkan' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getBadge } from '../../utils/formatters'

defineProps({
  users: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['suspend', 'update-rank'])

const handleRankChange = (userId, newRank) => {
  emit('update-rank', userId, newRank)
}

const roleClasses = (role) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
    case 'MODERATOR':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-400'
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
