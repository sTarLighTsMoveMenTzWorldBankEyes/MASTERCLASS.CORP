import { useEffect, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';

export default function MediaLibrary(){
 const [items,setItems]=useState([]),[error,setError]=useState(''),[selected,setSelected]=useState(null);
 const inputRef=useRef(null),urls=useRef(new Set()),dialogRef=useRef(null);
 useEffect(()=>()=>{urls.current.forEach(u=>URL.revokeObjectURL(u));},[]);
 useEffect(()=>{if(selected)dialogRef.current?.showModal();else dialogRef.current?.close();},[selected]);
 const load=async files=>{
  const accepted=[];let rejected=0;
  for(const f of files){if(!/^(image\/(jpeg|png|webp|gif|avif)|video\/(mp4|webm|ogg))$/.test(f.type)){rejected++;continue;}const url=URL.createObjectURL(f);urls.current.add(url);accepted.push({id:url,url,name:f.name,type:f.type.startsWith('video')?'video':'image'});}
  setItems(v=>[...v,...accepted]);setError(rejected?'Einige Dateien konnten nicht übernommen werden. Unterstützt: JPG, PNG, WebP, GIF, AVIF, MP4, WebM und Ogg. Archive bitte vorher entpacken.':'');
 };
 const remove=id=>{setItems(v=>v.filter(f=>f.id!==id));URL.revokeObjectURL(id);urls.current.delete(id);};
 return <div className="media-library"><div className="media-library-heading"><span><ImageIcon size={18}/><span><b>Ihre Bilder & Ihr Masterbook-Video</b><small>Lokale Vorschau mit weichen Plasma-Rändern. Nur für diese Sitzung; kein Upload und keine Veröffentlichung.</small></span></span><button className="text-link" onClick={()=>inputRef.current?.click()}><Upload size={15}/>Medien auswählen</button><input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/ogg" aria-label="Bilder oder Masterbook-Video lokal auswählen" className="file-input" onChange={e=>{load(e.target.files);e.target.value='';}}/></div>{error&&<p className="media-error" role="alert">{error}</p>}{items.length>0&&<div className="local-media-grid">{items.map(item=><article key={item.id}><div className="media-tile"><button className="media-open" onClick={()=>setSelected(item)} aria-label={`${item.name} groß öffnen`}>{item.type==='image'?<img src={item.url} alt={item.name} loading="lazy"/>:<><video src={item.url} muted playsInline preload="metadata"/><span className="video-tile-label"><Film size={18}/>Video öffnen</span></>}</button></div><div className="media-item-caption"><span>{item.name}</span><button onClick={()=>remove(item.id)} aria-label={`${item.name} entfernen`}><X size={14}/></button></div></article>)}</div>}<dialog ref={dialogRef} className="local-media-dialog" aria-label="Lokale Medienvorschau" onCancel={()=>setSelected(null)} onClose={()=>setSelected(null)}><div className="movie-heading"><span>{selected?.name}</span><button className="icon-btn" onClick={()=>setSelected(null)} aria-label="Medienvorschau schließen"><X size={19}/></button></div>{selected&&(selected.type==='image'?<img src={selected.url} alt={selected.name}/>:<video src={selected.url} controls playsInline autoPlay/>)}<p>Lokale Datei · nicht auf der Website veröffentlicht</p></dialog></div>;
}
