var fs = require("fs");
var fp = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站\\wrangler.toml";
var c = [
  "# Cloudflare Pages configuration",
  'name = "grbk"',
  'compatibility_date = "2026-06-22"',
  '',
  '[vars]',
  'NEXT_PUBLIC_SITE_URL = "https://your-domain.pages.dev"',
  '',
  '# Next.js build',
  '[build]',
  'command = "npm run build"',
  'output_dir = ".next"',
  '',
  '# Tell Cloudflare Pages this is a Next.js static site',
  'pages_build_output_dir = ".next"',
].join("\n");
fs.writeFileSync(fp, c, "utf8");
console.log("Updated wrangler.toml with pages_build_output_dir");