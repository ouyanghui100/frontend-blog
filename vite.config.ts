import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import * as reactPlugin from 'vite-plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const target = 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-is'],
  },
  plugins: [
    reactPlugin,
    tailwindcss(),
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
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
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  //配置代理跨域
  server: {
    host: '0.0.0.0',
    port: 5173, //自定义端口
    proxy: {
      '/api': {
        target,
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path,
        secure: true,
        // debug: true,
        bypass: (req, res, options) => {
          const proxyURL = options.target + options.rewrite!(req.url!)
          console.log(proxyURL)
          res!.setHeader('true-url', proxyURL)
        },
      },
    },
  },
})
