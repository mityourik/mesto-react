import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mesto-react/',//если убираю base, то проект не разворачивается на ghPages. не находит входные js и css
  plugins: [react()],
});