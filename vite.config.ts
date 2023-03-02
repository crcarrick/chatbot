import reactPlugin from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: { __OPENAI_API_KEY__: JSON.stringify(env.OPENAI_API_KEY) },
    plugins: [reactPlugin()],
  }
})
