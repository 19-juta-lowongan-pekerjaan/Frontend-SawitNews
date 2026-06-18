<template>
  <div class="rich-text-editor">
    <QuillEditor 
      ref="editorRef"
      v-model:content="contentVal" 
      contentType="html"
      theme="snow"
      :options="editorOptions"
      @update:content="onContentChange"
      class="bg-white dark:bg-slate-900 rounded-b-2xl dark:text-white"
    />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start writing your article here...'
  }
})

const emit = defineEmits(['update:modelValue'])

const contentVal = ref(props.modelValue || '')
const editorRef = ref(null)

const editorOptions = {
  placeholder: props.placeholder,
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  }
}

// Sync prop to editor — only if value is actually different
watch(() => props.modelValue, (newVal) => {
  if (newVal !== contentVal.value) {
    contentVal.value = newVal || ''
  }
})

const onContentChange = () => {
  emit('update:modelValue', contentVal.value)
}

// Clean up Quill instance before unmount to prevent vnode null crash
onBeforeUnmount(() => {
  try {
    if (editorRef.value && editorRef.value.getQuill) {
      const quill = editorRef.value.getQuill()
      if (quill) {
        quill.off('text-change')
        quill.off('selection-change')
        quill.off('editor-change')
      }
    }
  } catch (e) {
    // Silently ignore cleanup errors
  }
})
</script>

<style>
/* Adjust toolbar for dark mode */
.dark .ql-toolbar.ql-snow {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}
.dark .ql-container.ql-snow {
  border-color: #334155 !important;
}
.dark .ql-toolbar .ql-stroke {
  stroke: #cbd5e1 !important;
}
.dark .ql-toolbar .ql-fill {
  fill: #cbd5e1 !important;
}
.dark .ql-toolbar .ql-picker {
  color: #cbd5e1 !important;
}
.dark .ql-toolbar .ql-picker-options {
  background-color: #1e293b !important;
  border-color: #334155 !important;
}
</style>
