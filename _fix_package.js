var fs = require("fs");
var fp = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站\\package.json";
var pkg = JSON.parse(fs.readFileSync(fp, "utf8"));
pkg.scripts.clean = "rm -rf .next/cache";
pkg.scripts.build = "next build && rm -rf .next/cache";
fs.writeFileSync(fp, JSON.stringify(pkg, null, 2), "utf8");
console.log("Updated package.json");