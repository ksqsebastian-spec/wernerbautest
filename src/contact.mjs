const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const clean=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';
export async function contact(request,env,send=(...args)=>fetch(...args)){
 const path=new URL(request.url).pathname;
 const enabled=env.CONTACT_ENABLED!=='false'&&!!(env.RESEND_API_KEY&&env.CONTACT_FROM&&env.CONTACT_TO&&env.CONTACT_LIMITER);
 if(path==='/api/contact/config'&&request.method==='GET')return json({enabled,test:env.CONTACT_TEST==='true'});
 if(path!=='/api/contact')return json({error:'Nicht gefunden.'},404);
 if(request.method!=='POST')return json({error:'Methode nicht erlaubt.'},405);
 if(request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'Bitte senden Sie Ihre Anfrage über die Website.'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Ungültiges Anfrageformat.'},415);
 if(!enabled)return json({error:'Der Versand ist derzeit nicht eingerichtet. Bitte nutzen Sie E-Mail oder Telefon.'},503);
 if(Number(request.headers.get('Content-Length'))>24000)return json({error:'Die Anfrage ist zu lang.'},413);
 let limit;try{limit=await env.CONTACT_LIMITER.limit({key:request.headers.get('CF-Connecting-IP')||'unknown'});}catch{return json({error:'Der Versand ist vorübergehend nicht verfügbar. Bitte nutzen Sie Telefon / E-Mail.'},503);}
 if(!limit.success)return json({error:'Bitte warten Sie kurz, bevor Sie eine weitere Anfrage senden.'},429);
 let body;try{const reader=request.body.getReader();const parts=[];let size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>24000){await reader.cancel();return json({error:'Die Anfrage ist zu lang.'},413);}parts.push(value);}const bytes=new Uint8Array(size);let at=0;for(const part of parts){bytes.set(part,at);at+=part.length;}body=JSON.parse(new TextDecoder().decode(bytes));}catch{return json({error:'Bitte prüfen Sie Ihre Angaben.'},400);}
 if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'Bitte prüfen Sie Ihre Angaben.'},400);
 if(clean(body.website,100))return json({error:'Bitte versuchen Sie es erneut oder rufen Sie uns an.'},400);
 const mode=body.mode==='callback'?'callback':'inquiry';const name=clean(body.name,100),email=clean(body.email,150),phone=clean(body.phone,40),message=clean(body.message,6000),building=clean(body.building,200);
 if(!name)return json({error:'Bitte geben Sie Ihren Namen an.'},400);
 if(mode==='inquiry'&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!message))return json({error:'Bitte geben Sie eine gültige E-Mail-Adresse und Ihr Anliegen an.'},400);
 if(mode==='callback'&&!/^[+\d\s()./-]{5,40}$/.test(phone))return json({error:'Bitte geben Sie eine gültige Telefonnummer an.'},400);
 const allowed=['Sanierungsprojekt','Instandhaltung / Schaden','Referenzen / Eignungsnachweise'];const kind=allowed.includes(body.kind)?body.kind:'Sanierungsprojekt';
 const timing=['Nach Absprache','Vormittags','Nachmittags','Wunschzeit'].includes(body.timing)?body.timing:'Nach Absprache';const preferred=clean(body.preferred,120);
 if(mode==='callback'&&timing==='Wunschzeit'&&!preferred)return json({error:'Bitte ergänzen Sie Ihren Zeitwunsch.'},400);
 const text=`${env.CONTACT_TEST==='true'?'TESTWEBSITE — keine Anfrage an Werner Bau\n\n':''}Anfrage über die Werner-Bau-Testwebsite\n\nName: ${name}\n${mode==='callback'?`Telefon: ${phone}\nZeitwunsch: ${timing==='Wunschzeit'?preferred:timing}`:`E-Mail: ${email}\nAnliegen: ${kind}\n${building?'Gebäude / Standort: '+building+'\n':''}\n${message}`}\n\nQuelle: ${new URL(request.url).origin}`;
 try{const response=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],subject:(env.CONTACT_TEST==='true'?'[Werner Bau Test] ':'')+(mode==='callback'?'Rückrufwunsch':kind),text,...(mode==='inquiry'?{reply_to:email}:{})}),signal:AbortSignal.timeout(15000)});const result=await response.json();if(!response.ok||!result.id)return json({error:'Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut oder nutzen Sie Telefon / E-Mail.'},502);return json({ok:true,id:result.id},201);}catch{return json({error:'Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut oder nutzen Sie Telefon / E-Mail.'},502);}
}
