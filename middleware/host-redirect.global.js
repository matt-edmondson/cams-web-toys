// Maps the leftmost subdomain to the in-app page path. Each toy is hosted at
// its own subdomain in the homelab (e.g. artisanal-poker.<domain>) and needs
// to land on the matching page rather than the hub. Server-side rewrites
// can't do this for an SPA — `window.location.pathname` is the canonical
// source for the client router, so the redirect has to happen here.
//
// Implemented as a global route middleware (not a plugin) because
// `navigateTo()` from a Nuxt plugin during the initial app boot is unreliable
// in Nuxt 3.2.x — the plugin runs before the router is fully primed and the
// navigation gets dropped. Middleware run as part of every route navigation,
// including the initial one, so navigateTo() is well-defined here.
//
// Keep in lockstep with the per-toy *_subdomain defaults in
// `terraform/cams-web-toys.tf` in the homelab repo.
const subdomainToPath = {
  wheel: "/the-wheel",
  quiz: "/quizzifier",
  "artisanal-poker": "/planning-poker",
  standup: "/standup",
  folio: "/folio",
  checklist: "/life-checklist",
};

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;
  if (to.path !== "/") return;

  const subdomain = window.location.host.split(".")[0];
  const target = subdomainToPath[subdomain];
  if (target) return navigateTo(target, { replace: true });
});
