import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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

test("server renders the OZ Visions home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>OZ Visions USA \| Film, Media &amp; Production<\/title>/i);
  assert.match(html, /Independent productions and creative media/);
  assert.match(html, /Original stories and production craft under one roof\./);
  assert.match(html, /\/assets\/oz-ghost-banner\.webp/);
  assert.match(html, /href="\/vision"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/productions"/);
  assert.match(html, /href="\/services"/);
  assert.match(html, /href="\/four-quarters"/);
  assert.match(html, /href="\/contact"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|\[pending\]|placeholder/i);
});

test("renders every primary route and production detail", async (t) => {
  const routes = [
    ["/vision", "Make the image mean something."],
    ["/about", "An independent studio with two connected practices."],
    ["/productions", "Four titles. One growing slate."],
    ["/productions/manhood", "Manhood"],
    ["/productions/exegesis", "Exegesis"],
    ["/productions/ideophobia", "Ideophobia"],
    ["/productions/the-primus-voyage", "The Primus Voyage"],
    ["/services", "A focused production partner"],
    ["/four-quarters", "The Four Quarters"],
    ["/contact", "Bring us the idea."],
  ];

  for (const [pathname, expected] of routes) {
    await t.test(pathname, async () => {
      const response = await render(pathname);
      assert.equal(response.status, 200);

      const html = await response.text();
      assert.match(html, new RegExp(expected.replaceAll(".", "\\."), "i"));
      assert.match(html, /<header class="site-header">/);
      assert.match(html, /<footer class="site-footer">/);
      assert.doesNotMatch(
        html,
        /codex-preview|react-loading-skeleton|\[pending\]|placeholder/i,
      );
    });
  }
});

test("renders a branded not-found page", async () => {
  const response = await render("/not-a-real-page");
  assert.equal(response.status, 404);
  assert.match(await response.text(), /This page is outside the frame\./);
});

test("keeps the final site responsive and self contained", async () => {
  const [page, layout, shader, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HeroShader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /The Four Quarters/);
  assert.match(page, /sizes=/);
  assert.match(layout, /OZ Visions USA/);
  assert.match(css, /min-height:\s*100dvh/);
  assert.match(css, /--shell:\s*calc\(100%\s*-\s*120px\)/);
  assert.match(layout, /Cabinet Grotesk|cabinet-grotesk/);
  assert.match(layout, /DM_Sans/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*860px\)/);
  assert.match(shader, /getContext\("webgl"/);
  assert.match(shader, /edgeGradient/);
  assert.match(shader, /uniform vec2 u_tail/);
  assert.match(shader, /trailDistance/);
  assert.match(shader, /elasticBend/);
  assert.match(shader, /prefers-reduced-motion:\s*reduce/);
  assert.match(shader, /pointer:\s*coarse/);
  assert.match(shader, /webglcontextlost/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/assets/oz-horizon.webp", import.meta.url)),
    access(new URL("../public/assets/oz-ghost-banner.webp", import.meta.url)),
    access(new URL("../public/assets/production-still.webp", import.meta.url)),
    access(new URL("../public/assets/services-still.webp", import.meta.url)),
    access(new URL("../public/assets/noise.webp", import.meta.url)),
    access(new URL("../public/favicon.ico", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
