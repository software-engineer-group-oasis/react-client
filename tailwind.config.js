export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    // 根据你的项目实际路径补充内容匹配规则
  ],
  theme: {
    extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        gridTemplateColumns: {
          '70 / 30' : '70% 28%',
        }
    },
  },
  plugins: [],
}