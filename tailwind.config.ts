import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink: '#080808', charcoal: '#151311', gold: '#C6A16C', champagne: '#E8D4AC', ivory: '#F5F0E8' } } }, plugins: [] };
export default config;
