// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.kaito.botdroid';

export default defineConfig({
	site: 'https://botdroid.app',
	integrations: [
		starlight({
			title: 'BotDroid',
			description: 'Run chat bots and AI agents on your Android phone — no server needed.',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				vi: { label: 'Tiếng Việt', lang: 'vi' },
			},
			social: [
				{ icon: 'email', label: 'Support', href: 'mailto:kaiteam@proton.me' },
				{ icon: 'reddit', label: 'Reddit', href: 'https://www.reddit.com/r/BotDroid/' },
			],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://botdroid.app/favicon.svg' } },
			],
			sidebar: [
				{
					label: 'Start here',
					translations: { vi: 'Bắt đầu' },
					items: [
						{ slug: 'guide/getting-started' },
						{ slug: 'guide/bot-types' },
						{ slug: 'guide/keep-bots-running' },
					],
				},
				{
					label: 'Set up',
					translations: { vi: 'Thiết lập' },
					items: [
						{ slug: 'setup/channels' },
						{ slug: 'setup/ai-providers' },
						{ slug: 'setup/on-device' },
						{ slug: 'setup/mcp-tools' },
					],
				},
				{
					label: 'Use',
					translations: { vi: 'Sử dụng' },
					items: [{ slug: 'guide/chat' }, { slug: 'templates' }, { slug: 'guide/managing-bots' }],
				},
				{
					label: 'Help',
					translations: { vi: 'Trợ giúp' },
					items: [
						{ slug: 'help/troubleshooting' },
						{ slug: 'help/faq' },
						{ label: 'Privacy policy', translations: { vi: 'Chính sách quyền riêng tư' }, link: '/privacy' },
						{ label: 'Get it on Google Play', translations: { vi: 'Tải trên Google Play' }, link: PLAY_URL, attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
