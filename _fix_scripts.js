var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

var fp = path.join(BASE, "package.json");
var pkg = JSON.parse(fs.readFileSync(fp, "utf8"));
// Change build script to use 'out' directory
pkg.scripts.build = "next build && rm -rf .next/cache";
fs.writeFileSync(fp, JSON.stringify(pkg, null, 2), "utf8");
console.log("Updated package.json");