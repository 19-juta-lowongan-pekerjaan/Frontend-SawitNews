<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6 dark:bg-slate-800 dark:border-slate-700">
      <!-- Title -->
      <div class="space-y-2">
        <label for="title" class="text-sm font-bold text-slate-800 dark:text-white">{{ uiStore.t('form_article_title') }}</label>
        <input 
          id="title"
          v-model="formData.title" 
          type="text" 
          required 
          :placeholder="uiStore.t('form_article_title_placeholder')" 
          class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          :class="{'border-red-500 focus:ring-red-500': errors.title}"
        />
        <p v-if="errors.title" class="text-xs text-red-500 font-semibold">{{ errors.title }}</p>
      </div>

      <!-- Category & Image URL Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Category -->
        <div class="space-y-2">
          <label for="category" class="text-sm font-bold text-slate-800 dark:text-white">{{ uiStore.t('form_article_category') }}</label>
          <select 
            id="category"
            v-model="formData.categoryId" 
            required 
            @change="handleCategoryChange"
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            :class="{'border-red-500 focus:ring-red-500': errors.categoryId}"
          >
            <option value="" disabled>{{ uiStore.t('form_article_category_placeholder') }}</option>
            <option 
              v-for="cat in categoryStore.categories" 
              :key="cat.id" 
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
            <option value="NEW_CATEGORY" class="font-bold text-primary dark:text-primary-light">{{ uiStore.t('form_article_new_category') }}</option>
          </select>
          <p v-if="errors.categoryId" class="text-xs text-red-500 font-semibold">{{ errors.categoryId }}</p>

          <!-- Custom Category Name input -->
          <div v-if="showNewCategoryInput" class="pt-2 space-y-2 animate-slide">
            <label for="new-category" class="text-xs font-bold text-slate-500 dark:text-slate-400">{{ uiStore.t('form_article_new_category_label') }}</label>
            <div class="flex gap-2">
              <input 
                id="new-category"
                v-model="newCategoryName" 
                type="text" 
                :placeholder="uiStore.t('form_article_new_category_placeholder')" 
                class="flex-1 px-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                @keyup.enter="handleCreateCustomCategory"
              />
              <button 
                type="button" 
                @click="handleCreateCustomCategory"
                :disabled="!newCategoryName.trim()"
                class="px-4 py-2 text-xs font-bold bg-primary hover:bg-primary-hover text-white rounded-xl shadow disabled:opacity-50 transition-all"
              >
                {{ uiStore.t('form_article_new_category_add') }}
              </button>
              <button 
                type="button" 
                @click="cancelNewCategory"
                class="px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl dark:bg-slate-700 dark:text-gray-300 transition-all"
              >
                {{ uiStore.t('form_article_new_category_cancel') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Gambar Utama (Upload Lokal) -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-800 dark:text-white">{{ uiStore.t('form_article_image') }}</label>
          <div class="flex items-center gap-4">
            <input 
              id="image-file"
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleImageUpload"
            />
            <label 
              for="image-file"
              class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary rounded-2xl p-5 cursor-pointer hover:bg-slate-50 transition-all dark:border-slate-700 dark:hover:border-primary dark:hover:bg-slate-900/50"
            >
              <svg class="h-6 w-6 text-gray-400 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-bold text-slate-700 dark:text-gray-300">{{ uiStore.t('form_article_image_desc') }}</span>
              <span class="text-[10px] text-gray-400 mt-0.5">{{ uiStore.t('form_article_image_hint') }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Image Preview -->
      <div v-if="formData.featuredImage" class="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 relative">
        <img :src="formData.featuredImage" class="w-full h-full object-cover" alt="Featured Image Preview" />
        <button 
          type="button" 
          @click="formData.featuredImage = ''" 
          class="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full p-2 backdrop-blur-md"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Short Summary -->
      <div class="space-y-2">
        <label for="summary" class="text-sm font-bold text-slate-800 dark:text-white">{{ uiStore.t('form_article_summary') }}</label>
        <textarea 
          id="summary"
          v-model="formData.summary" 
          required 
          rows="3" 
          :placeholder="uiStore.t('form_article_summary_placeholder')" 
          class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-900 dark:border-slate-800 dark:text-white"
        ></textarea>
      </div>

      <!-- Rich Text Content Editor -->
      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-800 dark:text-white">{{ uiStore.t('form_article_content') }}</label>
        <div :class="{'border border-red-500 rounded-2xl overflow-hidden': errors.content}">
          <RichTextEditor v-model="formData.content" />
        </div>
        <p v-if="errors.content" class="text-xs text-red-500 font-semibold">{{ errors.content }}</p>
      </div>

      <!-- Settings Panel (Anonymous Toggle & Draft Option) -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50 dark:border-slate-700/50">
        <!-- Anonymous Toggle -->
        <label class="flex items-center gap-3 cursor-pointer select-none">
          <input 
            type="checkbox" 
            v-model="formData.anonymous" 
            class="h-5 w-5 rounded-md border-gray-300 text-primary focus:ring-primary focus:ring-2 dark:bg-slate-950 dark:border-slate-800"
          />
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-slate-800 dark:text-white">{{ uiStore.t('form_article_anonymous') }}</span>
            <span class="text-xxs text-gray-400 dark:text-gray-500">{{ uiStore.t('form_article_anonymous_desc') }}</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Actions Footer -->
    <div class="flex gap-4 items-center justify-end">
      <button 
        type="button"
        @click="submitForm(true)"
        class="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-slate-50 rounded-2xl shadow-sm transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 active:scale-95"
      >
        {{ uiStore.t('form_article_save_draft') }}
      </button>
      <button 
        type="submit"
        class="px-6 py-3 text-sm font-bold bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-md shadow-primary/20 transition-all duration-200 transform active:scale-95 flex items-center gap-2"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        {{ uiStore.t('form_article_submit') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useCategoryStore } from '../../stores/categories'
import { useUiStore } from '../../stores/ui'
import RichTextEditor from './RichTextEditor.vue'

const uiStore = useUiStore()

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['submit'])

const categoryStore = useCategoryStore()

const showNewCategoryInput = ref(false)
const newCategoryName = ref('')

const formData = reactive({
  title: '',
  categoryId: '',
  featuredImage: '',
  featuredImageFile: null,
  summary: '',
  content: '',
  anonymous: false
})

const errors = reactive({
  title: '',
  categoryId: '',
  content: ''
})

onMounted(() => {
  if (props.initialData) {
    formData.title = props.initialData.title || ''
    formData.categoryId = props.initialData.categoryId || ''
    formData.featuredImage = props.initialData.featuredImage || ''
    formData.summary = props.initialData.summary || props.initialData.excerpt || ''
    formData.content = props.initialData.content || ''
    formData.anonymous = props.initialData.anonymous || false
  }
  categoryStore.fetchCategories()
})

const handleCategoryChange = () => {
  if (formData.categoryId === 'NEW_CATEGORY') {
    showNewCategoryInput.value = true
    formData.categoryId = ''
  } else {
    showNewCategoryInput.value = false
  }
}

const handleCreateCustomCategory = async () => {
  if (!newCategoryName.value.trim()) return
  try {
    const newCat = await categoryStore.createCategory({
      name: newCategoryName.value.trim(),
      description: 'Dibuat oleh kontributor'
    })
    if (newCat) {
      formData.categoryId = newCat.id
    }
    showNewCategoryInput.value = false
    newCategoryName.value = ''
  } catch (err) {
    console.error(err)
  }
}

const cancelNewCategory = () => {
  showNewCategoryInput.value = false
  newCategoryName.value = ''
  formData.categoryId = ''
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran file melebihi 5MB!')
    return
  }
  
  formData.featuredImageFile = file

  const reader = new FileReader()
  reader.onload = (e) => {
    formData.featuredImage = e.target.result // Base64 data URL
  }
  reader.readAsDataURL(file)
}

const getPlainTextLength = (html) => {
  if (!html) return 0
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length
}

const validateForm = () => {
  let isValid = true
  errors.title = ''
  errors.categoryId = ''
  errors.content = ''

  if (!formData.title.trim()) {
    errors.title = uiStore.lang === 'id' ? 'Judul wajib diisi' : 'Title is required'
    isValid = false
  } else if (formData.title.trim().length < 5) {
    errors.title = uiStore.lang === 'id' ? 'Judul minimal 5 karakter' : 'Title must be at least 5 characters'
    isValid = false
  }

  if (!formData.categoryId) {
    errors.categoryId = uiStore.lang === 'id' ? 'Kategori wajib dipilih' : 'Category is required'
    isValid = false
  }

  const plainTextLen = getPlainTextLength(formData.content)
  if (plainTextLen === 0) {
    errors.content = uiStore.lang === 'id' ? 'Konten wajib diisi' : 'Content is required'
    isValid = false
  } else if (plainTextLen < 50) {
    errors.content = uiStore.lang === 'id' 
      ? `Konten minimal 50 karakter (saat ini ${plainTextLen} karakter)` 
      : `Content must be at least 50 characters (currently ${plainTextLen} characters)`
    isValid = false
  }

  return isValid
}

watch(() => formData.title, (newVal) => {
  if (newVal.trim().length >= 5) {
    errors.title = ''
  }
})

watch(() => formData.categoryId, (newVal) => {
  if (newVal) {
    errors.categoryId = ''
  }
})

watch(() => formData.content, (newVal) => {
  if (getPlainTextLength(newVal) >= 50) {
    errors.content = ''
  }
})

const submitForm = (isDraft) => {
  if (!validateForm()) {
    uiStore.showNotification(
      uiStore.lang === 'id' 
        ? 'Mohon periksa kembali form input Anda.' 
        : 'Please check your form inputs.', 
      'error'
    )
    return
  }
  emit('submit', {
    ...formData,
    isDraft: isDraft === true
  })
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
