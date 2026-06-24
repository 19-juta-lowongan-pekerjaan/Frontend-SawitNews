<template>
  <div class="comment-section space-y-6">
    <div class="border-b border-gray-100 pb-3 dark:border-slate-800 flex items-center justify-between">
      <h3 class="font-bold text-lg text-accent dark:text-white flex items-center gap-2">
        <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        {{ uiStore.t('palm_discussion') }} ({{ totalCommentsCount }})
      </h3>
      <span class="text-xs font-semibold text-gray-400 dark:text-gray-500">{{ uiStore.t('comment_rules') }}</span>
    </div>

    <!-- Comment Form -->
    <CommentForm @submit="handlePostComment" />

    <!-- Loading Spinner -->
    <LoadingSpinner :visible="commentStore.loading" />

    <!-- Comments List -->
    <div v-if="!commentStore.loading" class="space-y-6">
      <div 
        v-for="comment in commentStore.comments" 
        :key="comment.id"
        class="bg-white rounded-3xl border border-gray-50 p-5 space-y-4 dark:bg-slate-800 dark:border-slate-700/50 shadow-sm"
      >
        <!-- Comment Card Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img :src="getImageUrl(comment.author?.avatar) || getDefaultAvatar(comment.author?.name || '?')" class="h-9 w-9 rounded-full object-cover ring-2 ring-primary/5" @error="(e) => e.target.src = getDefaultAvatar(comment.author?.name || '?')" />
            <div class="flex flex-col leading-tight">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-sm text-slate-800 dark:text-white">{{ comment.author?.name }}</span>
                <span class="w-4 h-4 flex items-center justify-center" :title="translateRank(comment.author?.rank)" v-if="comment.author?.rank && !comment.isDeleted" v-html="getBadge(comment.author.rank).icon"></span>
              </div>
              <span class="text-xxs text-gray-400 dark:text-gray-500">@{{ comment.author?.username }}</span>
            </div>
          </div>
          <span class="text-xxs text-gray-400 dark:text-gray-500 font-medium">
            {{ formatRelativeDate(comment.createdAt) }}
            <span v-if="comment.isEdited" class="italic"> (edited)</span>
          </span>
        </div>

        <!-- Comment content -->
        <div v-if="editingCommentId !== comment.id">
          <p class="text-sm text-slate-700 dark:text-slate-300 pl-1" :class="{ 'italic text-gray-400': comment.isDeleted }">
            {{ comment.isDeleted ? '[Komentar ini telah dihapus]' : comment.content }}
          </p>
        </div>
        <div v-else class="space-y-2">
          <input type="text" v-model="editingText" class="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
          <div class="flex justify-end gap-2">
            <button @click="cancelEdit" class="px-2.5 py-1 text-xxs font-bold text-gray-500 bg-gray-50 border rounded-lg hover:bg-gray-100 dark:bg-slate-900 dark:border-slate-800">Cancel</button>
            <button @click="submitEdit(comment.id)" class="px-2.5 py-1 text-xxs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow">Save</button>
          </div>
        </div>

        <!-- Actions Footer -->
        <div v-if="!comment.isDeleted" class="flex items-center gap-4 text-xs font-semibold pl-1">
          <button @click="likeComment(comment.id)" :class="['flex items-center gap-1 transition-colors', comment.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500']">
            <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>{{ comment.likes }}</span>
          </button>
          <button v-if="authStore.isAuthenticated" @click="toggleReplyForm(comment.id)" class="text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span>{{ uiStore.t('reply_btn') }}</span>
          </button>
          <div class="ml-auto flex items-center gap-2">
            <button v-if="canEdit(comment)" @click="startEdit(comment)" class="text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-1">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
            </button>
            <button v-if="canDelete(comment)" @click="deleteComment(comment.id)" class="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>

        <!-- Reply form and replies -->
        <div v-if="activeReplyId === comment.id" class="pt-2 pl-4 border-l-2 border-primary/20 space-y-2">
          <input type="text" v-model="replyText" :placeholder="uiStore.t('reply_placeholder')" class="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white" @keyup.enter="handlePostReply(comment)" />
          <div class="flex justify-end gap-2">
            <button @click="activeReplyId = null" class="px-2.5 py-1 text-xxs font-bold text-gray-500 bg-gray-50 border rounded-lg hover:bg-gray-100 dark:bg-slate-900 dark:border-slate-800">{{ uiStore.t('cancel_btn') }}</button>
            <button @click="handlePostReply(comment)" :disabled="!replyText.trim()" class="px-2.5 py-1 text-xxs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow disabled:opacity-50">{{ uiStore.t('reply_btn') }}</button>
          </div>
        </div>

        <div v-if="comment.replies && comment.replies.length > 0" class="pl-6 pt-3 border-t border-gray-50 space-y-4 dark:border-slate-700/50">
          <div v-for="reply in comment.replies" :key="reply.id" class="bg-slate-50/50 rounded-2xl p-4 space-y-2 dark:bg-slate-900/30">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="getImageUrl(reply.author?.avatar) || getDefaultAvatar(reply.author?.name || '?')" class="h-7 w-7 rounded-full object-cover" @error="(e) => e.target.src = getDefaultAvatar(reply.author?.name || '?')" />
                <div class="flex flex-col leading-none">
                  <div class="flex items-center gap-1">
                    <span class="font-bold text-xs text-slate-800 dark:text-white">{{ reply.author?.name }}</span>
                    <span class="w-3.5 h-3.5 flex items-center justify-center text-gray-500" :title="translateRank(reply.author?.rank)" v-if="reply.author?.rank && !reply.isDeleted" v-html="getBadge(reply.author?.rank || 'Pemula').icon"></span>
                  </div>
                  <span class="text-xxs text-gray-400">@{{ reply.isDeleted ? 'deleted' : reply.author?.username }}</span>
                </div>
              </div>
              <span class="text-xxs text-gray-400">
                {{ formatRelativeDate(reply.createdAt) }}
                <span v-if="reply.isEdited" class="italic">(edited)</span>
              </span>
            </div>
            
            <div v-if="editingCommentId !== reply.id">
              <p class="text-xs text-slate-600 pl-1 dark:text-slate-300" :class="{ 'italic text-gray-400': reply.isDeleted }">
                {{ reply.isDeleted ? '[Komentar ini telah dihapus]' : reply.content }}
              </p>
            </div>
            <div v-else class="space-y-2">
              <input type="text" v-model="editingText" class="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
              <div class="flex justify-end gap-2">
                <button @click="cancelEdit" class="px-2.5 py-1 text-xxs font-bold text-gray-500 bg-gray-50 border rounded-lg hover:bg-gray-100 dark:bg-slate-900 dark:border-slate-800">Cancel</button>
                <button @click="submitEdit(reply.id)" class="px-2.5 py-1 text-xxs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow">Save</button>
              </div>
            </div>

            <div v-if="!reply.isDeleted" class="flex items-center gap-3 text-xxs font-semibold pl-1">
              <button @click="likeComment(reply.id)" :class="['flex items-center gap-1 transition-colors', reply.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500']">
                <svg class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span>{{ reply.likes }}</span>
              </button>
              <div class="ml-auto flex items-center gap-2">
                <button v-if="canEdit(reply)" @click="startEdit(reply)" class="text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                </button>
                <button v-if="canDelete(reply)" @click="deleteComment(reply.id)" class="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1">
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="commentStore.comments.length === 0" class="py-10 text-center text-gray-400 dark:text-gray-500 italic">
        {{ uiStore.t('no_comments_yet') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCommentStore } from '../../stores/comments'
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { formatRelativeDate, getBadge, getImageUrl, getDefaultAvatar } from '../../utils/formatters'
import CommentForm from './CommentForm.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const commentStore = useCommentStore()
const authStore = useAuthStore()
const uiStore = useUiStore()

const activeReplyId = ref(null)
const replyText = ref('')
const editingCommentId = ref(null)
const editingText = ref('')

const translateRank = (name) => {
  if (!name) return ''
  const key = `badge_${name.toLowerCase().replace(/ /g, '_')}`
  return uiStore.t(key)
}

const totalCommentsCount = computed(() => {
  let count = commentStore.comments.length
  for (const c of commentStore.comments) {
    count += (c.replies?.length || 0)
  }
  return count
})

onMounted(() => {
  commentStore.fetchComments(props.articleId)
})

const handlePostComment = (text) => {
  commentStore.postComment(props.articleId, text)
}

const toggleReplyForm = (commentId) => {
  if (activeReplyId.value === commentId) {
    activeReplyId.value = null
  } else {
    activeReplyId.value = commentId
    replyText.value = ''
  }
}

const handlePostReply = async (comment) => {
  if (!replyText.value.trim()) return
  try {
    await commentStore.postComment(props.articleId, replyText.value, comment.id)
    activeReplyId.value = null
    replyText.value = ''
  } catch (err) {
    console.error('Failed to post reply:', err)
  }
}

const likeComment = (commentId) => {
  commentStore.likeComment(commentId)
}

const deleteComment = (commentId) => {
  commentStore.deleteComment(commentId)
}

const startEdit = (comment) => {
  editingCommentId.value = comment.id
  editingText.value = comment.content
}

const cancelEdit = () => {
  editingCommentId.value = null
  editingText.value = ''
}

const submitEdit = (commentId) => {
  commentStore.updateComment(commentId, editingText.value)
  cancelEdit()
}

const canEdit = (comment) => {
  if (!authStore.isAuthenticated || comment.isDeleted) return false
  return authStore.user?.username === comment.author?.username
}

const canDelete = (comment) => {
  if (!authStore.isAuthenticated || comment.isDeleted) return false
  if (authStore.isAdmin || authStore.isModerator) return true
  return authStore.user?.username === comment.author?.username
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>