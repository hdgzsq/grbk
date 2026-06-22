var fs = require("fs");
var path = require("path");

// Update global INDEX.md
var indexPath = "C:\\Users\\huang\\Desktop\\workspace\\全局工作台\\03-文档索引\\INDEX.md";
var indexContent = fs.readFileSync(indexPath, "utf8");

// Add project entry to the table
var newEntry = "| 012 | 个人博客网站 | 2026-06-22 | 已完成 | SOP/012-个人博客网站 |";
if (!indexContent.includes("012")) {
  indexContent = indexContent.replace(
    /(## 二、项目列\b[^|]*\|)/,
    "$1\n" + newEntry
  );
  fs.writeFileSync(indexPath, indexContent, "utf8");
  console.log("Updated INDEX.md");
} else {
  console.log("INDEX.md already has 012");
}

// Update numbering record
var numPath = "C:\\Users\\huang\\Desktop\\workspace\\全局工作台\\04-模板库\\template-numbering-record.md";
var numContent = fs.readFileSync(numPath, "utf8");
var numEntry = "| 012 | 个人博客网站 | 2026-06-22 | 已完成 | SOP/012-个人博客网站 |\n";
if (!numContent.includes("| 012 |")) {
  numContent = numContent.replace(
    /(\|------\|.+)/,
    "$1\n" + numEntry
  );
  fs.writeFileSync(numPath, numContent, "utf8");
  console.log("Updated template-numbering-record.md");
} else {
  console.log("Numbering record already has 012");
}

console.log("Done!");