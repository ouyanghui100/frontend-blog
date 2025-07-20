import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import * as reactPlugin from 'vite-plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 解决报The requested module 'react-is/index.js' does not provide an export named 'ForwardRef'的问题
  optimizeDeps: {
    include: [
     'react-is',
    ]
  },
  plugins: [
     // 解决报The requested module 'react-is/index.js' does not provide an export named 'ForwardRef'的问题
    reactPlugin,
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: name => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff', // 主题颜色配置
        },
      },
    },
  },
  base: '/',
});
