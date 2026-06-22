var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

var fp = path.join(BASE, ".gitignore");
var c = fs.readFileSync(fp, "utf8");
// Remove content/ from gitignore so MDX files are tracked
c = c.replace(/^\s*content\/$\n/m, "");
fs.writeFileSync(fp, c, "utf8");
console.log("Fixed .gitignore");