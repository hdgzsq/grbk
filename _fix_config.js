var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

// Fix next.config.mjs to use output: 'export'
var fp = path.join(BASE, "next.config.mjs");
var c = fs.readFileSync(fp, "utf8");
c = c.replace(
  "const nextConfig = {",
  "const nextConfig = {\n  output: 'export',"
);
fs.writeFileSync(fp, c, "utf8");
console.log("Fixed next.config.mjs");

// Fix wrangler.toml output_dir to point to 'out' instead of '.next'
fp = path.join(BASE, "wrangler.toml");
c = fs.readFileSync(fp, "utf8");
c = c.replace('output_dir = ".next"', 'output_dir = "out"');
c = c.replace('pages_build_output_dir = ".next"', 'pages_build_output_dir = "out"');
fs.writeFileSync(fp, c, "utf8");
console.log("Fixed wrangler.toml");