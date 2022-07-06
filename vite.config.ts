import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src/'),
      "@api": path.resolve(__dirname, './src/api/index'),
      "@assets": path.resolve(__dirname, './src/assets/'),
      "@styles": path.resolve(__dirname, './src/styles/'),
      "@hooks": path.resolve(__dirname, './src/hooks/index'),
      "@store": path.resolve(__dirname, './src/store/index'),
      "@pages": path.resolve(__dirname, './src/pages/index'),
      "@consts": path.resolve(__dirname, './src/consts/index'),
      "@routes": path.resolve(__dirname, './src/routes/index'),
      "@services": path.resolve(__dirname, './src/services/index'),
      "@components": path.resolve(__dirname, './src/components/index'),

    }
  }
})
