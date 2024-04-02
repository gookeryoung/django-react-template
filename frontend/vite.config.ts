import react from '@vitejs/plugin-react-swc'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [
    react(),
    AutoImport({
      imports: ['react', 'react-router', 'react-router-dom'],
    }),
  ],

  build: {
    target: 'modules',
  },

  /**
   * 服务器配置
   */
  server: {
    // 启用端口
    port: 8888,
    // 监听地址
    host: '0.0.0.0',
    watch: {
      alwaysStat: true,
      atomic: true,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  /**
   * vitest 设置
   */
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      provider: 'v8',
    },
    reporters: ['default', 'html'],
    includeSource: ['src/**/*.{js,jsx,ts,tsx}'],
  },
})
