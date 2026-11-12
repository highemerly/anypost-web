<template>
  <!-- ネイティブの <dialog>。showModal() で開くと Esc で閉じ、フォーカスも中に閉じ込められる -->
  <dialog
    ref="dialogRef"
    aria-labelledby="supported-services-title"
    class="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[85vh] rounded-lg bg-white p-0 shadow-xl backdrop:bg-black/50"
    @click="handleBackdropClick"
    @close="isOpen = false"
  >
    <!-- 開いたときだけ中身を描画する（共有画面を開いただけでアイコンを読み込まないため） -->
    <div v-if="isOpen" class="flex max-h-[85vh] flex-col">
      <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 id="supported-services-title" class="text-lg font-bold text-gray-900">
          {{ $t('services.title') }}
        </h2>
        <button
          type="button"
          class="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          :aria-label="$t('share.close')"
          @click="close"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="overflow-y-auto px-5 py-4">
        <section v-for="group in groups" :key="group.key" class="mb-5 last:mb-0">
          <h3 class="mb-2 text-sm font-semibold text-gray-700">{{ $t(group.titleKey) }}</h3>
          <ul class="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
            <li v-for="service in group.services" :key="service.name" class="flex min-w-0 items-center">
              <img
                :src="service.icon"
                alt=""
                class="h-5 w-5 shrink-0 object-contain"
                @error="handleImageError"
              />
              <span class="ml-2 truncate text-sm text-gray-800">{{ service.displayName }}</span>
            </li>
          </ul>
        </section>
      </div>

      <div class="flex justify-end border-t border-gray-200 px-5 py-3">
        <router-link
          to="/services"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          {{ $t('share.seeMoreServices') }}
          <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { fediverseServices, traditionalServices } from '@/data/services'

const groups = [
  { key: 'fediverse', titleKey: 'services.fediverse.title', services: fediverseServices },
  { key: 'traditional', titleKey: 'services.traditional.title', services: traditionalServices }
]

const dialogRef = ref(null)
const isOpen = ref(false)

const open = async () => {
  if (dialogRef.value?.open) return
  isOpen.value = true
  // 中身を描画してから開く（showModal() が中の最初のボタンにフォーカスを置けるように）
  await nextTick()
  dialogRef.value?.showModal()
}

const close = () => {
  dialogRef.value?.close()
}

// 枠の外（::backdrop）を押したときは、クリックの対象が <dialog> 自身になる
const handleBackdropClick = (event) => {
  if (event.target === dialogRef.value) close()
}

const handleImageError = (event) => {
  event.target.src = '/assets/brand/other.png'
}

defineExpose({ open, close })
</script>
