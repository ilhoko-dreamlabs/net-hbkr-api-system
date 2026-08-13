import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const port = Number(process.env.PORT || 4173);
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8"};
http.createServer((req,res)=>{const pathname=new URL(req.url,"http://localhost").pathname;const target=path.join(process.cwd(),pathname==="/"?"index.html":pathname);if(!target.startsWith(process.cwd())){res.writeHead(403);return res.end("Forbidden");}fs.readFile(target,(error,data)=>{if(error){res.writeHead(404);return res.end("Not found");}res.writeHead(200,{"Content-Type":types[path.extname(target)]||"application/octet-stream"});res.end(data);});}).listen(port,()=>console.log("Local URL: http://localhost:"+port));
