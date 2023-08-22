import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// переменная окружения
const isGHPagesDeploy = process.env.DEPLOY_GH_PAGES === 'true';

export default defineConfig({
  base: isGHPagesDeploy ? '/mesto-react/' : '/',
  plugins: [react()],
});
