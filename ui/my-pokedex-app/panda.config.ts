
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {value: '#69bb7b'},
          secondary: { value: '#EE0F0F' },
          danger: {
            value: '#EE0F0F',
            description: 'Color for errors'
          }
        },
        fonts: {
          body: { value: 'system-ui, sans-serif' }
        }
      },
    }
  },
  preflight: true,
  include: ['src/**/*.{ts,tsx,js,jsx}'],
  dependencies: ['src/**/*.{ts,tsx,js,jsx}'],
  outdir: "styled-system",
});
