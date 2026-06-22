var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

var fp = path.join(BASE, ".gitignore");
var c = fs.readFileSync(fp, "utf8");
// Add 'out/' to gitignore
if (!c.includes("out/")) {
  c += "\n# Next.js export output\n/out/\n";
  fs.writeFileSync(fp, c, "utf8");
  console.log("Added out/ to .gitignore");
} else {
  console.log("out/ already in .gitignore");
}