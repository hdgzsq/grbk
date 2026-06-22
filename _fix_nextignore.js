var fs = require("fs");
var fp = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站\\.nextignore";
var c = [
  ".next/cache/",
  ".next/server/webpack-runtime.js",
  ".next/server/interception-route-rewrite-workaround.js",
].join("\n");
fs.writeFileSync(fp, c, "utf8");
console.log("Created .nextignore");