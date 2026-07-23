import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server renders the OZ Visions temporary site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>OZ Visions USA \| Film, Media &amp; Production<\/title>/i);
  assert.match(html, /Independent productions and creative media/);
  assert.match(html, /Original stories and production craft under one roof\./);
  assert.match(html, /id="vision"/);
  assert.match(html, /id="productions"/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="world"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/ozpictures/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|\[pending\]|placeholder/i);
});

test("keeps the final site responsive and self contained", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /The Four Quarters/);
  assert.match(page, /sizes=/);
  assert.match(layout, /OZ Visions USA/);
  assert.match(css, /min-height:\s*100dvh/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*860px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/assets/oz-horizon.webp", import.meta.url)),
    access(new URL("../public/assets/production-still.webp", import.meta.url)),
    access(new URL("../public/assets/services-still.webp", import.meta.url)),
    access(new URL("../public/assets/noise.webp", import.meta.url)),
    access(new URL("../public/favicon.ico", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
