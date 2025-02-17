import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  envPrefix: 'APP_',
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    AutoImport({
      dts: './src/types/imports.d.ts',
      imports: [
        'react',
        {
          '@tanstack/react-router': ['Link', 'useRouter', 'createFileRoute'],
        },
        {
          '@tanstack/react-table': [
            'flexRender',
            'getCoreRowModel',
            'getSortedRowModel',
            'useReactTable',
          ],
        },
        {
          '@tanstack/react-query': [
            'useQuery',
            'useMutation',
            'useIsMutating',
            'useQueryClient',
          ],
        },
        // {
        //   'react-hook-form': [
        //     'useForm',
        //     'useFormContext',
        //     'useFieldArray',
        //     'Controller',
        //   ],
        // },
        // {
        //   '@hookform/resolvers/zod': ['zodResolver'],
        // },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
