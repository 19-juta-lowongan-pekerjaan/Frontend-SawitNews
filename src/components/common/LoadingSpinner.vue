<template>
  <div class="flex justify-center items-center py-12" :style="visible ? '' : 'display:none'">
    <div class="relative flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
      <span class="sr-only">Memuat...</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
</script>
