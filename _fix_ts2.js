var fs = require("fs");
var path = require("path");
var BASE = "C:\\Users\\huang\\Desktop\\workspace\\SOP\\012-个人博客网站";

function fixType(rel) {
  var fp = path.join(BASE, rel);
  var c = fs.readFileSync(fp, "utf8");
  c = c.replace(
    '.filter(Boolean)\n            .slice(0, 4)\n            .map((p) => (<ArticleCard',
    '.filter(Boolean) as any)\n            .slice(0, 4)\n            .map((p: any) => (<ArticleCard'
  );
  fs.writeFileSync(fp, c, "utf8");
  console.log("Fixed: " + rel);
}

fixType("src/app/diary/[slug]/page.tsx");

console.log("Done!");