import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
const routes=['/impressum','/datenschutz','/karriere'];
for(const page of ['index','karriere']){
 const html=await readFile('public/'+page+'.html','utf8');
 for(const m of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)){
  const path=m[1]==='/'?'/index.html':routes.includes(m[1])?m[1]+'.html':m[1];
  await access('public'+path);
 }
 for(const m of html.matchAll(/href="#([^"]+)"/g))assert(html.includes('id="'+m[1]+'"'),'Missing anchor '+m[1]+' in '+page);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert(html.includes('mailto:info@werner-bau.eu'));
 if(page==='index')assert(html.includes('tel:+494035703274'));
}
console.log('Local assets, anchors, contact and careers routes verified');
