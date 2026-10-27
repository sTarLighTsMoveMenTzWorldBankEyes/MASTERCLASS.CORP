import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, ChevronLeft, ChevronRight, Film, Globe2, Layers3, LockKeyhole, Pause, Play, Presentation as PresentationIcon, ShieldCheck, Volume2, VolumeX, X } from 'lucide-react';
import { narrations } from './narration.js';
import './presentation.css';

const slides = [
  { eyebrow: '01 / A CONNECTED VISION', title: ['Finance without', 'fragmentation.'], subtitle: 'Europäische Finanzinfrastruktur. Neu gedacht.', metric: 'EUROPE → WORLD', visual: 'globe' },
  { eyebrow: '02 / ARCHITECTURE', title: ['Five layers.', 'One shared vision.'], subtitle: 'Modular. Interoperabel. Souverän.', metric: '05 CONNECTED LAYERS', visual: 'layers' },
  { eyebrow: '03 / CAPITAL STRATEGY', title: ['An ambitious vision.', 'A structured model.'], subtitle: 'Indikative Kapitalstruktur · keine Finanzierungszusagen', metric: '€600M PLANNING MODEL', visual: 'funding' },
  { eyebrow: '04 / RESILIENCE BY DESIGN', title: ['Trust is earned.', 'Resilience is built.'], subtitle: 'Security by Design · regulatorische Prüfung erforderlich', metric: 'ZERO TRUST APPROACH', visual: 'security' },
  { eyebrow: '05 / ROADMAP', title: ['Start in Europe.', 'Connect the world.'], subtitle: 'Vier Ausbauphasen. Evidenz vor Expansion.', metric: '04 PROPOSED PHASES', visual: 'roadmap' },
  { eyebrow: '06 / THE ECOSYSTEM', title: ['Better together.', 'Built for connection.'], subtitle: 'Mögliche Partnergruppen · keine bestätigten Partnerschaften', metric: 'OPEN COLLABORATION', visual: 'ecosystem' },
  { eyebrow: '07 / RESPONSIBLE EXECUTION', title: ['Big ambition.', 'Measurable gates.'], subtitle: 'Risiken sichtbar machen. Fortschritt nachweisen.', metric: '06 RISK DOMAINS', visual: 'gates' },
  { eyebrow: '08 / THE NEXT CHAPTER', title: ['From possibility', 'to a proven concept.'], subtitle: 'Machbarkeit. Architektur. Dialog.', metric: 'THE WORK STARTS HERE', visual: 'next' },
];

const layerNames = ['Banking', 'Payments', 'Data', 'Compliance', 'Infrastructure'];
const capital = [
  ['EIB / InvestEU', 210, '#b4f477'], ['Private equity', 180, '#76e4e0'],
  ['Bank consortium', 120, '#818bfa'], ['Development banks', 60, '#bba4e5'], ['Grants & research', 30, '#7a94a9'],
];

function SlideVisual({ type }) {
  if (type === 'globe') return <div className="efc-deck-orbit" aria-hidden="true">
    <div className="efc-deck-orbit-ring efc-deck-ring-a" /><div className="efc-deck-orbit-ring efc-deck-ring-b" />
    <div className="efc-deck-globe"><div /><div /><div /><div /><span /><span /><span /><Globe2 size={68} strokeWidth={.7} /></div>
    <span className="efc-deck-orbit-label">DIGITAL SOVEREIGNTY</span><b>EUROPEAN BY VISION.<br />CONNECTED BY DESIGN.</b>
  </div>;

  if (type === 'layers') return <div className="efc-deck-stack" aria-label="Five architecture layers">
    {layerNames.map((name, index) => <div key={name} style={{ '--layer': index }}><span>0{index + 1}</span><b>{name}</b><Layers3 size={18} /></div>)}
    <p><LockKeyhole size={14} /> Separate sovereign infrastructure</p>
  </div>;

  if (type === 'funding') return <div className="efc-deck-capital">
    <div className="efc-deck-donut"><div><span>INDICATIVE</span><strong>€600<span>M</span></strong><small>not committed</small></div></div>
    <div className="efc-deck-capital-legend">{capital.map(([label, amount, color]) => <div key={label}><i style={{ background: color }} /><span>{label}</span><b>€{amount}M</b></div>)}</div>
  </div>;

  if (type === 'security') return <div className="efc-deck-security">
    <div className="efc-deck-shield"><ShieldCheck size={100} strokeWidth={.8} /></div>
    <div className="efc-deck-security-tags">{['ZERO TRUST', 'ENCRYPTION', 'IDENTITY', 'RECOVERY'].map(item => <span key={item}><i />{item}</span>)}</div>
    <p>DORA · GDPR · BCM<br /><span>Design objectives · assessment pending</span></p>
  </div>;

  if (type === 'roadmap') return <div className="efc-deck-roadmap">
    {['European Foundation', 'European Integration', 'Global Interoperability', 'Worldwide Ecosystem'].map((name, index) => <div key={name}><span>0{index + 1}</span><div><small>PROPOSED PHASE</small><b>{name}</b></div><ArrowUpRight size={20} /></div>)}
  </div>;

  if (type === 'ecosystem') return <div className="efc-deck-ecosystem">
    <div className="efc-deck-network-core">EFC<span>OPEN ECOSYSTEM</span></div>
    {['BANKS', 'TECHNOLOGY', 'INVESTORS', 'INSTITUTIONS'].map((name, index) => <div className={`efc-deck-network-node efc-deck-node-${index}`} key={name}>{name}</div>)}
    <span className="efc-deck-network-line efc-deck-line-one" /><span className="efc-deck-network-line efc-deck-line-two" />
    <p>Prospective stakeholder groups</p>
  </div>;

  if (type === 'gates') return <div className="efc-deck-gates">
    {['Capital', 'Regulation', 'Integration', 'Cybersecurity', 'Market adoption', 'Supplier independence'].map((name, index) => <div key={name}><span>0{index + 1}</span><b>{name}</b><small>EVIDENCE REQUIRED</small></div>)}
    <p>ASSESS → VALIDATE → DECIDE</p>
  </div>;

  return <div className="efc-deck-next"><span className="efc-deck-next-mark"><ArrowUpRight size={100} strokeWidth={1} /></span><h3>Build the foundation.<br /><em>Then prove it.</em></h3><div><span>01 FEASIBILITY</span><span>02 ARCHITECTURE</span><span>03 DIALOGUE</span></div></div>;
}

export default function Presentation({ open, onClose }) {
  const [slide, setSlide] = useState(0);
  const [mode, setMode] = useState('slides');
  const [language, setLanguage] = useState('de');
  const [autoplay, setAutoplay] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const [voices, setVoices] = useState([]);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const videoRef = useRef(null);
  const speechRef = useRef(null);
  const speakingRef = useRef(false);
  const selection = narrations.find(item => item.code === language) || narrations[0];
  const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const voice = voices.find(item => item.lang.toLowerCase() === selection.locale.toLowerCase()) || voices.find(item => item.lang.split(/[-_]/)[0].toLowerCase() === selection.code);
  onCloseRef.current = onClose;

  const stopSpeech = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    speechRef.current = null;
    speakingRef.current = false;
    setSpeaking(false);
  }, []);

  const changeSlide = useCallback((direction) => {
    stopSpeech();
    setVoiceError('');
    setSlide(value => (value + direction + slides.length) % slides.length);
    setProgress(0);
  }, [stopSpeech]);

  useEffect(() => {
    if (!supportsSpeech) return undefined;
    const updateVoices = () => setVoices(window.speechSynthesis.getVoices());
    updateVoices();
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
  }, [supportsSpeech]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
      if (event.key === 'Tab') {
        const focusable = [...(dialogRef.current?.querySelectorAll('button:not([disabled]), a[href], select, input, video[controls], [tabindex="0"]') || [])].filter(item => item.getClientRects().length && item.tabIndex >= 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = priorOverflow;
      previouslyFocused?.focus?.();
      stopSpeech();
      videoRef.current?.pause();
    };
  }, [open, stopSpeech]);

  useEffect(() => {
    if (!open) { setAutoplay(false); setProgress(0); return undefined; }
    const keyboardSlides = event => {
      if (mode !== 'slides' || /^(SELECT|INPUT|TEXTAREA|VIDEO)$/.test(event.target.tagName)) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); changeSlide(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(-1); }
    };
    document.addEventListener('keydown', keyboardSlides);
    return () => document.removeEventListener('keydown', keyboardSlides);
  }, [open, mode, changeSlide]);

  useEffect(() => {
    setProgress(0);
    if (!open || !autoplay || speaking || mode !== 'slides') return undefined;
    const started = performance.now();
    const timer = setInterval(() => {
      const elapsed = performance.now() - started;
      setProgress(Math.min(elapsed / 8000, 1));
      if (elapsed >= 8000) {
        setSlide(value => (value + 1) % slides.length);
        setProgress(0);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [open, autoplay, speaking, slide, mode]);

  const switchMode = next => {
    stopSpeech();
    setAutoplay(false);
    setVoiceError('');
    videoRef.current?.pause();
    setMode(next);
  };

  const speak = () => {
    if (speakingRef.current) { stopSpeech(); return; }
    if (!supportsSpeech || !voice) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selection.texts[slide]);
    utterance.lang = selection.locale;
    utterance.voice = voice;
    utterance.rate = 0.94;
    utterance.onend = () => { speakingRef.current = false; setSpeaking(false); speechRef.current = null; };
    utterance.onerror = event => {
      speakingRef.current = false;
      setSpeaking(false);
      speechRef.current = null;
      if (event.error !== 'canceled' && event.error !== 'interrupted') setVoiceError('Sprachausgabe konnte nicht gestartet werden. Bitte eine andere verfügbare Sprache wählen.');
    };
    setVoiceError('');
    speechRef.current = utterance;
    speakingRef.current = true;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!open) return null;
  const current = slides[slide];

  return <div className="efc-presentation" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="efc-presentation-title">
    <div className="efc-deck-grain" aria-hidden="true" />
    <header className="efc-deck-header">
      <div className="efc-deck-brand"><span>EFC<span>•</span></span><div>EURO FINANCE CORE<small>THE CONCEPT PRESENTATION</small></div></div>
      <div className="efc-deck-tabs" role="tablist" aria-label="Präsentationsformat" onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        const next = event.key === 'Home' ? 'slides' : event.key === 'End' ? 'film' : mode === 'slides' ? 'film' : 'slides';
        switchMode(next);
        document.getElementById(`efc-tab-${next}`)?.focus();
      }}>
        <button type="button" role="tab" id="efc-tab-slides" tabIndex={mode === 'slides' ? 0 : -1} aria-selected={mode === 'slides'} aria-controls="efc-deck-slides" onClick={() => switchMode('slides')}><PresentationIcon size={16} /><span>Präsentation</span></button>
        <button type="button" role="tab" id="efc-tab-film" tabIndex={mode === 'film' ? 0 : -1} aria-selected={mode === 'film'} aria-controls="efc-deck-film" onClick={() => switchMode('film')}><Film size={16} /><span>Konzeptfilm</span><i>40s</i></button>
      </div>
      <button type="button" className="efc-deck-close" ref={closeRef} onClick={onClose} aria-label="Präsentation schließen"><X size={24} /></button>
    </header>

    <h2 className="efc-deck-sr-only" id="efc-presentation-title">Euro Finance Core · Interaktive Konzeptpräsentation</h2>

    {mode === 'slides' ? <>
      <section className="efc-deck-slide" id="efc-deck-slides" role="tabpanel" aria-labelledby="efc-tab-slides" aria-label={`Folie ${slide + 1} von ${slides.length}`}>
        <div className="efc-deck-slide-copy" key={`copy-${slide}`}>
          <p className="efc-deck-eyebrow"><span />{current.eyebrow}</p>
          <h3>{current.title[0]}<br /><em>{current.title[1]}</em></h3>
          <p className="efc-deck-subtitle">{current.subtitle}</p>
          <div className="efc-deck-caption" lang={selection.code} dir={selection.code === 'ar' ? 'rtl' : 'ltr'} aria-live={autoplay ? 'off' : 'polite'}>{selection.texts[slide]}</div>
          <span className="efc-deck-metric"><i />{current.metric}</span>
        </div>
        <div className={`efc-deck-visual efc-deck-visual-${current.visual}`} key={`visual-${slide}`}><SlideVisual type={current.visual} /></div>
      </section>

      <footer className="efc-deck-footer">
        <div className="efc-deck-timeline" aria-label="Folie auswählen">{slides.map((item, index) => <button type="button" key={item.eyebrow} onClick={() => { stopSpeech(); setSlide(index); setProgress(0); }} className={index === slide ? 'active' : ''} aria-label={`Folie ${index + 1}: ${item.title.join(' ')}`} aria-current={index === slide ? 'step' : undefined}><span style={index === slide && autoplay ? { width: `${Math.max(progress * 100, 4)}%` } : undefined} /></button>)}</div>
        <div className="efc-deck-controls">
          <div className="efc-deck-navigation">
            <span><b>{String(slide + 1).padStart(2, '0')}</b> / 08</span>
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Vorherige Folie"><ChevronLeft size={22} /></button>
            <button type="button" onClick={() => changeSlide(1)} aria-label="Nächste Folie"><ChevronRight size={22} /></button>
            <button type="button" className={autoplay ? 'is-playing' : ''} onClick={() => setAutoplay(value => !value)} aria-label={autoplay ? 'Automatische Präsentation pausieren' : 'Automatische Präsentation starten'} aria-pressed={autoplay}>{autoplay ? <Pause size={17} /> : <Play size={17} />}<span>{autoplay ? 'Pause' : 'Auto'}</span></button>
          </div>
          <div className="efc-deck-language-controls">
            <label className="efc-deck-language"><Globe2 size={17} /><span className="efc-deck-sr-only">Sprache der Folientexte und Sprachausgabe</span><select value={language} onChange={event => { stopSpeech(); setLanguage(event.target.value); setVoiceError(''); }}>{narrations.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
            <button type="button" className={`efc-deck-speak ${speaking ? 'is-playing' : ''}`} onClick={speak} disabled={!supportsSpeech || !voice} aria-pressed={speaking} title={!voice ? 'Für diese Sprache ist keine Browserstimme verfügbar' : `Stimme: ${voice.name}`}>{speaking ? <VolumeX size={17} /> : <Volume2 size={17} />}<span>{speaking ? 'Stoppen' : 'Vorlesen'}</span></button>
          </div>
        </div>
        <div className="efc-deck-footnote"><span>Unabhängiges Projektkonzept · keine amtliche EU-Anerkennung</span><span role="status">{voiceError || (speaking && autoplay ? 'Sprachausgabe läuft · automatische Folien pausiert' : !supportsSpeech ? 'Sprachausgabe wird von diesem Browser nicht unterstützt.' : !voice ? `${narrations.length} Textsprachen · keine Browserstimme für ${selection.name} verfügbar` : `${narrations.length} Textsprachen · Stimme für ${selection.name} verfügbar`)}</span></div>
      </footer>
    </> : <section className="efc-deck-film" id="efc-deck-film" role="tabpanel" aria-labelledby="efc-tab-film" aria-label="Euro Finance Core Konzeptfilm">
      <div className="efc-deck-film-heading"><div><p className="efc-deck-eyebrow"><span />THE VISION IN MOTION</p><h3>One concept.<em> A wider horizon.</em></h3></div><span>00:40 / CONCEPT FILM</span></div>
      <video ref={videoRef} controls playsInline preload="metadata" poster="/media/poster.jpg" aria-label="Euro Finance Core Konzeptfilm mit Musik und deutschen Texteinblendungen">
        <source src="/media/euro-finance-core.mp4" type="video/mp4" />
        <track kind="captions" src="/media/captions-de.vtt" srcLang="de" label="Deutsch" />
        Ihr Browser unterstützt dieses Videoformat nicht. Bitte laden Sie den Film herunter.
      </video>
      <div className="efc-deck-film-links"><p>40 Sekunden · 8 Szenen · Originalmusik<br /><span>Deutsche Texteinblendungen. Mehrsprachige Sprachausgabe in der Präsentation, je nach Browserstimme.</span></p><a href="/media/euro-finance-core.mp4" download="Euro-Finance-Core-Konzeptfilm.mp4"><ArrowDownToLine size={17} />Film herunterladen</a></div>
      <p className="efc-deck-film-disclaimer">Ein unabhängiges Infrastrukturkonzept. Finanzierung, Zulassungen und Partnerschaften sind nicht bestätigt.</p>
    </section>}
  </div>;
}
