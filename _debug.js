var fs = require("fs");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";
var c = fs.readFileSync(BASE + "/src/app/page.tsx", "utf8");
var lines = c.split("\n");
lines.forEach(function(line, i) {
  if (line.indexOf("className") >= 0 && line.indexOf("'") >= 0) {
    console.log((i+1) + ": " + JSON.stringify(line));
  }
});