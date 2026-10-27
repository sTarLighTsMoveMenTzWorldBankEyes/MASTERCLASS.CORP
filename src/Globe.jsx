import { useEffect, useRef } from 'react';

// Stylized geographic silhouettes, used only as a concept visualization.
const land = [
  [[-168,72],[-130,72],[-120,58],[-105,52],[-80,55],[-52,48],[-66,40],[-81,25],[-96,18],[-112,30],[-125,48],[-165,60]],
  [[-81,12],[-65,10],[-50,0],[-35,-9],[-44,-23],[-52,-35],[-69,-55],[-76,-35],[-80,-8]],
  [[-18,35],[5,38],[33,31],[51,12],[43,-12],[32,-30],[18,-35],[9,-20],[-5,5],[-17,15]],
  [[-10,36],[-7,55],[7,59],[17,72],[35,70],[42,52],[30,40],[22,36],[12,44],[1,43]],
  [[32,70],[70,77],[110,73],[170,60],[153,47],[130,32],[122,5],[106,-5],[96,16],[78,7],[65,25],[43,30],[33,48]],
  [[113,-22],[130,-12],[145,-15],[154,-29],[145,-40],[123,-35]],
  [[-52,60],[-42,61],[-20,77],[-40,84],[-65,79]],
  [[46,-13],[50,-16],[49,-25],[44,-24]],
  [[129,31],[142,45],[146,43],[137,32]],
];
function inside(x,y,p){let b=false; for(let i=0,j=p.length-1;i<p.length;j=i++){const [xi,yi]=p[i],[xj,yj]=p[j]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))b=!b;}return b;}
const pts=[];
for(let lat=-62;lat<81;lat+=2.25)for(let lon=-180;lon<180;lon+=2.25/Math.max(.22,Math.cos(lat*Math.PI/180)))if(land.some(p=>inside(lon,lat,p)))pts.push([lat,lon]);

export default function Globe(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');if(!ctx)return;
    let w=0,h=0,frame=0,angle=0,start=performance.now();
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize=()=>{const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);};
    const obs=new ResizeObserver(resize);obs.observe(canvas);resize();
    const project=(lat,lon,r)=>{const a=lat*Math.PI/180,b=(lon-15)*Math.PI/180+angle;let x=Math.cos(a)*Math.sin(b),y=-Math.sin(a),z=Math.cos(a)*Math.cos(b);const tilt=.13;return [w*.51+x*r,h*.49+(y*Math.cos(tilt)-z*Math.sin(tilt))*r,z*Math.cos(tilt)+y*Math.sin(tilt)];};
    const draw=(time)=>{
      angle=reduced?0:Math.sin((time-start)*.00006)*.25;
      ctx.clearRect(0,0,w,h);const r=Math.min(w*.34,h*.39),cx=w*.51,cy=h*.49;
      const glow=ctx.createRadialGradient(cx,cy,r*.6,cx,cy,r*1.55);glow.addColorStop(0,'rgba(26,143,151,.01)');glow.addColorStop(.52,'rgba(32,148,158,.09)');glow.addColorStop(1,'rgba(6,10,17,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
      for(let i=0;i<75;i++){const x=((i*147.31)%100)/100*w,y=((i*67.83)%100)/100*h;ctx.fillStyle=`rgba(153,213,225,${.12+(i%4)*.09})`;ctx.beginPath();ctx.arc(x,y,i%8===0?1.2:.6,0,7);ctx.fill();}
      const bg=ctx.createRadialGradient(cx-r*.3,cy-r*.4,0,cx,cy,r);bg.addColorStop(0,'rgba(17,57,65,.7)');bg.addColorStop(1,'rgba(4,15,25,.95)');ctx.fillStyle=bg;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
      ctx.lineWidth=.55;
      const trace=(list)=>{ctx.beginPath();let active=false;list.forEach(([a,b])=>{const[x,y,z]=project(a,b,r);if(z>0){if(!active)ctx.moveTo(x,y);else ctx.lineTo(x,y);active=true;}else active=false;});ctx.stroke();};
      ctx.strokeStyle='rgba(90,182,186,.14)';for(let a=-60;a<=60;a+=20){const list=[];for(let b=-180;b<=180;b+=3)list.push([a,b]);trace(list);}for(let b=-180;b<180;b+=20){const list=[];for(let a=-89;a<=89;a+=3)list.push([a,b]);trace(list);}
      for(const [a,b]of pts){const[x,y,z]=project(a,b,r);if(z>0){ctx.fillStyle=`rgba(87,211,206,${.25+z*.6})`;ctx.beginPath();ctx.arc(x,y,Math.max(.5,r*.004)*(0.6+z*.4),0,7);ctx.fill();}}
      ctx.strokeStyle='rgba(89,211,210,.45)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
      const cities=[[50,8],[49,2],[52,13],[51,-.1],[40,-74],[25,55],[1,104]];
      for(let i=1;i<cities.length;i++){const p=project(...cities[0],r),q=project(...cities[i],r);if(q[2]<0)continue;const ctrl=[(p[0]+q[0])/2,(p[1]+q[1])/2-r*.35];ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.quadraticCurveTo(...ctrl,q[0],q[1]);ctx.strokeStyle='rgba(198,247,120,.32)';ctx.lineWidth=.8;ctx.stroke();const t=reduced?.5:((time-start)*.00012+i*.17)%1,x=(1-t)**2*p[0]+2*(1-t)*t*ctrl[0]+t*t*q[0],y=(1-t)**2*p[1]+2*(1-t)*t*ctrl[1]+t*t*q[1];ctx.fillStyle='#d5ff9b';ctx.shadowBlur=12;ctx.shadowColor='#b8fd7a';ctx.beginPath();ctx.arc(x,y,2,0,7);ctx.fill();ctx.shadowBlur=0;}
      cities.forEach(([a,b])=>{const[x,y,z]=project(a,b,r);if(z<0)return;ctx.strokeStyle='rgba(198,247,120,.35)';ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.stroke();ctx.fillStyle='#d0ff94';ctx.beginPath();ctx.arc(x,y,2.4,0,7);ctx.fill();});
      ctx.save();ctx.translate(cx,cy);ctx.rotate(-.32);ctx.strokeStyle='rgba(126,186,193,.18)';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(0,0,r*1.3,r*.38,0,0,7);ctx.stroke();ctx.rotate(.85);ctx.beginPath();ctx.ellipse(0,0,r*1.18,r*.83,0,0,7);ctx.stroke();ctx.restore();
      if(!reduced)frame=requestAnimationFrame(draw);
    };frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);obs.disconnect();};
  },[]);
  return <canvas className="globe-canvas" ref={ref} role="img" aria-label="Animierter dreidimensionaler Globus mit konzeptionellen Verbindungen zwischen europäischen und internationalen Märkten"/>;
}
