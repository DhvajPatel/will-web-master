import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { execSync } from 'child_process'

// Function to get git info
function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
    const commitDate = execSync('git log -1 --format=%cd').toString().trim()
    return { commitHash, commitDate }
  } catch (error) {
    return { commitHash: 'unknown', commitDate: 'unknown' }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // So you can use `describe`, `it`, `expect` without importing them
    environment: 'jsdom' // Simulate browser-like environment (use 'node' if not needed)
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __GIT_COMMIT_HASH__: JSON.stringify(getGitInfo().commitHash),
    __GIT_COMMIT_DATE__: JSON.stringify(getGitInfo().commitDate),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
