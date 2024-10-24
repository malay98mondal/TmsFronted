import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    optimizeDeps: {
        include: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/material/Tooltip'
        ],
    },
    plugins: [react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        })],

    // Additional build optimizations
    build: {
        rollupOptions: {
            output: {
                // Code-splitting: Separating vendor libraries (like node_modules) into a separate chunk
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';  // Moves third-party libraries to a vendor chunk
                    }
                },
            },
        },
        // Raise the chunk size warning limit to avoid warnings during build
        chunkSizeWarningLimit: 1000,  // Set limit to 1000KB (or a suitable value for your app)
    },
});
