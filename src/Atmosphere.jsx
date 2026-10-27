import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Volume2, VolumeX, RotateCcw, ChevronRight } from 'lucide-react';
import './atmosphere.css';

const preference=()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedPreference=()=>{try{const v=localStorage.getItem('efc-effects');return v===null?!preference():v==='on';}catch{return !preference();}};

function Weather({enabled,sound,audioRef}){
 const ref=useRef(null);
 useEffect(()=>{
  if(!enabled)return;
  const canvas=ref.current,ctx=canvas?.getContext('2d');if(!ctx)return;
  let width=0,height=0,frame=0,last=0,lastThunder=0;
  const stars=Array.from({length:70},(_,i)=>({x:(i*.6180339887)%1,y:(i*.754877666)%1,s:.5+(i%4)*.25}));
  const resize=()=>{width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio,1.5);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);};resize();window.addEventListener('resize',resize);
  const draw=t=>{
   frame=requestAnimationFrame(draw);if(document.hidden||t-last<33)return;last=t;
   ctx.clearRect(0,0,width,height);
   stars.forEach((p,i)=>{const x=(p.x*width+t*.0015*(1+i%3))%width,y=(p.y*height+t*.0009)%height;ctx.fillStyle=`rgba(171,204,231,${.12+.12*Math.sin(t*.0007+i)})`;ctx.beginPath();ctx.arc(x,y,p.s,0,7);ctx.fill();});
   for(let i=0;i<17;i++){const x=((i*97.3+t*.009)% (width+80))-40,y=((i*173.7+t*.017)%(height+80))-40,s=1.4+(i%4);ctx.save();ctx.translate(x,y);ctx.rotate(t*.00015+i);ctx.strokeStyle=`hsla(${175+i*14},80%,77%,.16)`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(0,-s*1.7);ctx.lineTo(s,0);ctx.lineTo(0,s*1.7);ctx.lineTo(-s,0);ctx.closePath();ctx.stroke();ctx.restore();}
   for(let i=0;i<24;i++){const x=((i*63.7+t*.016)%(width+120))-60,y=((i*71.2+t*.105)%(height+100))-50;ctx.strokeStyle='rgba(129,177,214,.08)';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+4,y+14);ctx.stroke();}
   for(let i=0;i<4;i++){const x=((t*.035+i*310)%(width+300))-300,y=height*(.2+i*.23);ctx.strokeStyle='rgba(163,203,224,.055)';ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+80,y-20,x+120,y+20,x+220,y-7);ctx.stroke();}
   const phase=t%14000;
   if(phase>12200&&phase<12600){const opacity=Math.sin((phase-12200)/400*Math.PI)*.16;ctx.strokeStyle=`rgba(146,183,218,${opacity})`;ctx.lineWidth=1.6;const x=width*.91;ctx.beginPath();ctx.moveTo(x,-10);ctx.lineTo(x-30,45);ctx.lineTo(x-8,45);ctx.lineTo(x-55,120);ctx.stroke();if(sound&&t-lastThunder>12000){lastThunder=t;const ac=audioRef.current;if(ac&&ac.state==='running'){const buffer=ac.createBuffer(1,ac.sampleRate*1.6,ac.sampleRate);const data=buffer.getChannelData(0);for(let j=0;j<data.length;j++)data[j]=(Math.random()*2-1)*Math.exp(-j/(ac.sampleRate*.35));const src=ac.createBufferSource(),filter=ac.createBiquadFilter(),gain=ac.createGain();src.buffer=buffer;filter.type='lowpass';filter.frequency.value=150;gain.gain.value=.16;src.connect(filter).connect(gain).connect(ac.destination);src.start();}}}
  };frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);ctx.clearRect(0,0,width,height);};
 },[enabled,sound,audioRef]);
 return <canvas ref={ref} className="weather-canvas" aria-hidden="true"/>;
}

export function PlanetParade(){
 return <section className="planet-section section-shell" aria-label="Künstlerische Planetenparade"><div className="planet-heading"><span>ORBITAL INTERLUDE / 08 WORLDS · ONE RHYTHM</span><span>KÜNSTLERISCHE KONSTELLATION</span></div><div className="planet-parade"><div className="parade-sun" aria-label="Sonne"/><div className="parade-orbit"/>{[['mercury','Merkur'],['venus','Venus'],['earth','Erde'],['mars','Mars'],['jupiter','Jupiter'],['saturn','Saturn'],['uranus','Uranus'],['neptune','Neptun']].map(([id,label],i)=><div key={id} className={`planet-wrap planet-wrap-${id}`}><div className={`planet planet-${id}`} style={{'--planet-index':i}}>{id==='earth'&&<span className="parade-moon" aria-label="Mond"/>}{id==='saturn'&&<span className="saturn-ring"/>}</div><span>{label}</span></div>)}</div><p>Sonne, Mond und acht Planeten in einer synchronen Designanimation. Keine Darstellung einer tatsächlichen astronomischen Ausrichtung.</p></section>;
}

export default function Atmosphere(){
 const [enabled,setEnabled]=useState(savedPreference),[panel,setPanel]=useState(false),[sound,setSound]=useState(false),[wiper,setWiper]=useState(true),[curtain,setCurtain]=useState(false),[opening,setOpening]=useState(false);
 const audioRef=useRef(null),panelRef=useRef(null),triggerRef=useRef(null);
 useEffect(()=>{document.documentElement.classList.toggle('atmosphere-enabled',enabled);try{localStorage.setItem('efc-effects',enabled?'on':'off');}catch{}if(!enabled){setSound(false);audioRef.current?.suspend();}return()=>document.documentElement.classList.remove('atmosphere-enabled');},[enabled]);
 useEffect(()=>{try{if(!sessionStorage.getItem('efc-curtain-seen')&&!preference()){setCurtain(true);sessionStorage.setItem('efc-curtain-seen','1');}}catch{}return()=>{audioRef.current?.close();};},[]);
 useEffect(()=>{if(!curtain)return;setOpening(false);const a=setTimeout(()=>setOpening(true),450),b=setTimeout(()=>setCurtain(false),4700);return()=>{clearTimeout(a);clearTimeout(b);};},[curtain]);
 useEffect(()=>{if(!panel)return;const key=e=>{if(e.key==='Escape'){setPanel(false);triggerRef.current?.focus();}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[panel]);
 const toggleSound=async()=>{if(sound){setSound(false);await audioRef.current?.suspend();return;}try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audioRef.current??=new C();await audioRef.current.resume();setSound(true);}catch{setSound(false);}};
 return <>
  <div className={`atmosphere ${enabled?'is-enabled':''}`} aria-hidden="true"><Weather enabled={enabled} sound={sound} audioRef={audioRef}/><div className="plasma-frame"/><div className="ambient-cloud cloud-left"/><div className="ambient-cloud cloud-right"/>{wiper&&<div className="light-wiper"/>}</div>
  {curtain&&<div className={`theatre ${opening?'theatre-open':''}`}><div className="theatre-valance"/><div className="theatre-curtain theatre-left"/><div className="theatre-curtain theatre-right"/><div className="theatre-title" aria-hidden="true"><span>EURO FINANCE CORE</span><b>A new perspective.</b><small>THE CONCEPT EXPERIENCE</small></div><button className="theatre-skip" onClick={()=>setCurtain(false)}>Intro überspringen <ChevronRight size={15}/></button></div>}
  <div className="effects-controls" ref={panelRef}>{panel&&<div className="effects-panel" role="region" aria-label="Animationseinstellungen"><div className="effects-title"><b>Atmosphäre</b><button aria-label="Effekteinstellungen schließen" onClick={()=>{setPanel(false);triggerRef.current?.focus();}}><X size={16}/></button></div><p>Licht, Wetter und kosmische Bewegung.</p><label><span>Animationen & Plasma</span><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/></label><label><span>Lichtwischer · 1,3 Sekunden</span><input type="checkbox" checked={wiper} disabled={!enabled} onChange={e=>setWiper(e.target.checked)}/></label><button className="effect-action" disabled={!enabled} onClick={toggleSound}>{sound?<Volume2 size={15}/>:<VolumeX size={15}/>}Donner {sound?'ausschalten':'einschalten'}</button><button className="effect-action" onClick={()=>{setPanel(false);setCurtain(true);}}><RotateCcw size={15}/>Theaterauftakt wiederholen</button><small>Dezente Wetteranimation. Audio nur nach Aktivierung. Die Systemeinstellung für reduzierte Bewegung wird beim ersten Besuch berücksichtigt.</small></div>}<button className="effects-trigger" ref={triggerRef} aria-expanded={panel} aria-label="Effekte einstellen" onClick={()=>setPanel(!panel)}><Sparkles size={14}/><span>Effekte</span><i className={enabled?'on':''}/></button></div>
 </>;
}
