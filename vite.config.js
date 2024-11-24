import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx", // Pastikan file React Anda berada di sini
            refresh: true, // Otomatis memuat ulang saat ada perubahan
        }),
        react(), // Menambahkan plugin React untuk mendukung JSX
    ],
    server: {
        host: "localhost", // Terima koneksi dari luar container Docker
        port: 5173, // Pastikan port ini sesuai dengan pengaturan di docker-compose.yml
        watch: {
            usePolling: true, // Gunakan polling untuk memantau perubahan file di dalam container
        },
    },
});
