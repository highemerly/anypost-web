<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-extrabold text-gray-900">
        {{ $t('contact.title') }}
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        {{ $t('contact.description') }}
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="space-y-8">
        <!-- Administrator Information -->
        <div class="text-center">
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('contact.administrator') }}
            </h2>
            <p class="text-lg text-gray-700">
              はん@highemerly
            </p>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="text-center border-t border-gray-200 pt-8">
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('contact.contactInfo') }}
            </h2>
            <p class="text-gray-600 mb-4">
              {{ $t('contact.contactDescription') }}
            </p>
            <a
              href="https://highemerly.net#contact"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
            >
              {{ $t('contact.visitContactPage') }}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="text-center border-t border-gray-200 pt-8">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              {{ $t('contact.note') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
</script>
