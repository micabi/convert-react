import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import license from 'rollup-plugin-license';
import path from 'node:path';

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
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    },
    esbuild: {
      banner: '/*! licenses: /assets/vendor.LICENSE.txt */',
      legalComments: 'external',
      pure: mode === 'production' ? [ 'console.log' ] : []
    },
    build: {
      // sourcemap: true,
      rollupOptions: {
        plugins: [
          license( {
            sourcemap: true,
            thirdParty: {
              includePrivate: true,
              multipleVersions: true,
              // output: './dist/assets/vendor.LICENSE.txt',
              output: {
                file: path.join(__dirname, 'dist', 'assets', 'vendor.LICENSE.txt'),
                encoding: 'utf-8'
              }
            }
          } ),
        ]
      }
    }
  };
} );