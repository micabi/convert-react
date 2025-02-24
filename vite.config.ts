import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })


export default defineConfig( ( { mode } ) => {

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // other configuration
    esbuild: {
      pure: mode === 'production' ? [ 'console.log' ] : []
    },
    // build: {
    //   sourcemap: true
    // }
  };
} );