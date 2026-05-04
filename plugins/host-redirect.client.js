// Maps the leftmost subdomain to the in-app page path. When the app is hosted
// at a per-toy subdomain (e.g. `artisanal-poker.${domain}`), this plugin sends
// the user to the matching page on first load. Server-side rewrites can't do
// this for an SPA — `window.location.pathname` is the canonical source for the
// client router, so the redirect has to happen here.
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

export default defineNuxtPlugin(() => {
  if (window.location.pathname !== "/") return;

  const subdomain = window.location.host.split(".")[0];
  const target = subdomainToPath[subdomain];
  if (!target) return;

  return navigateTo(target, { replace: true });
});
