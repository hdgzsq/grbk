var fs = require("fs");
var fp = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站\\wrangler.toml";
var c = [
  '[vars]',
  'NEXT_PUBLIC_SITE_URL = "https://your-domain.pages.dev"',
  '',
  '[build]',
  'command = "npm run build"',
  'output_dir = ".next"',
  '',
  '[build.watch]',
  'dir = "src"',
  'watch_path = ["src", "content"]',
  '',
  '# Next.js specific',
  '[env.production]',
  '[env.production.build]',
  'command = "npm run build"',
  'output_dir = ".next"',
].join("\n");
fs.writeFileSync(fp, c, "utf8");
console.log("Created wrangler.toml");