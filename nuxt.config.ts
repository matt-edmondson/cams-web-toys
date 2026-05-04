// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
	],
	ssr: false
})
// socket.io is wired via `server/plugins/socket.io.js` (Nitro plugin), which
// runs in both `nuxt dev` and the production `node .output/server/index.mjs`
// entry. The legacy `~/io/index.js` Nuxt module hooked `listen`, but that hook
// never fires in the production build, so it's been removed from `modules`.
// `io/poker.js` and `io/standup.js` are still imported from the server plugin.
