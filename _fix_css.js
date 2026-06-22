var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

var fp = path.join(BASE, "src/app/globals.css");
var c = fs.readFileSync(fp, "utf8");
c = c.replace("@import 'tw-animate-css';\n", "");
fs.writeFileSync(fp, c, "utf8");
console.log("Removed tw-animate-css import from globals.css");