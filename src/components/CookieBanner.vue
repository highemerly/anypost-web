<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ $t('cookies.title') }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            {{ $t('cookies.description') }}
          </p>
          <p class="text-sm text-gray-600 mb-2">
            {{ $t('cookies.essential') }}
          </p>
          <p class="text-sm text-blue-600 font-medium">
            {{ $t('cookies.serverSaveFeature') }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            @click="$emit('decline')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            {{ $t('cookies.decline') }}
          </button>
          <button
            @click="$emit('accept')"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {{ $t('cookies.accept') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['accept', 'decline'])
</script>
