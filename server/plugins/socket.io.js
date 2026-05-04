import { Server as SocketIOServer } from "socket.io";
import poker from "../../io/poker";
import standup from "../../io/standup";

// Nitro server plugin: attaches socket.io to the underlying http server when
// Nitro starts listening. Replaces the old `~/io/index.js` Nuxt module, whose
// `nuxt.hook("listen", ...)` callback only fires in `nuxt dev` and never runs
// against the production `node .output/server/index.mjs` entry.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hookOnce("listen", (httpServer) => {
    console.log("[socket.io] attaching to nitro http server");
    const io = new SocketIOServer(httpServer);
    poker.setup(io);
    standup.setup(io);
  });
});
