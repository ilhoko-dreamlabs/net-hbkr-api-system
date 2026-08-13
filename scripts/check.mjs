import fs from "node:fs";
const files = ["index.html", "styles.css", "app.js", "CNAME", ".nojekyll", "404.html"];
for (const file of files) {
  if (!fs.existsSync(file)) throw new Error("Missing required file: " + file);
}
const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const js = fs.readFileSync("app.js", "utf8");
for (const expected of ["HBKR API | Domain Contract Explorer", "PROTOTYPE", "https://api.hbkr.net/", "styles.css", "app.js"]) {
  if (!html.includes(expected)) throw new Error("index.html missing: " + expected);
}
if (fs.readFileSync("CNAME", "utf8").trim() !== "api.hbkr.net") throw new Error("CNAME mismatch");
if (css.length < 12000) throw new Error("styles.css unexpectedly small");
if (js.length < 2500) throw new Error("app.js unexpectedly small");
if (!html.includes('id="main"')) throw new Error("Missing main landmark");
console.log("net-hbkr-api-system: static prototype check passed");
