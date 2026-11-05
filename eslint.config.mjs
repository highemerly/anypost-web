import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { neostandard, resolveIgnoresFromGitignore } from 'neostandard'

export default defineConfig([
  // dist・Playwright の出力など、.gitignore にあるものは見ない
  globalIgnores(resolveIgnoresFromGitignore()),

  js.configs.recommended,

  // standard の書式（standard の後継）。.vue の <script> にも当てる
  ...neostandard({ env: ['browser'], files: ['**/*.vue'] }),

  // .vue のパーサーと Vue 3 の基本ルール。neostandard より後に置き、.vue のパーサーをこちらにする
  ...pluginVue.configs['flat/essential'],

  // ビルドの道具の設定ファイル（tailwind・postcss）は CommonJS
  {
    files: ['*.config.js'],
    languageOptions: { sourceType: 'commonjs' }
  },

  // 旧設定（.eslintrc.js）から引き継いだもの
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@stylistic/space-before-function-paren': 'off'
    }
  }
])
