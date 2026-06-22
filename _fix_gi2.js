var fs = require("fs");
var fp = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站\\.gitignore";
var c = fs.readFileSync(fp, "utf8");
c = c.replace(/#\s*Content\s*\n\s*content\/\s*\n/, "");
fs.writeFileSync(fp, c, "utf8");
console.log("Done: " + c.includes("content/"));