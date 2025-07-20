/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // 禁用默认样式
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
