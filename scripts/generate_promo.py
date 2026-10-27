#!/usr/bin/env python3
"""Generate the original Euro Finance Core concept film without external assets.

Requires Python, Pillow, NumPy and ffmpeg. Output contains original synthesized
music and German captions; it does not contain a recorded spoken narration.
"""
from pathlib import Path
import math
import random
import subprocess
import tempfile
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'media'
W, H, FPS, DURATION = 1280, 720, 12, 40
CYAN = (112, 237, 242)
LIME = (216, 246, 115)
WHITE = (238, 247, 248)
MUTED = (138, 161, 176)
REGULAR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'

def font(size, bold=False, mono=False):
    return ImageFont.truetype(MONO if mono else BOLD if bold else REGULAR, size)

SCENES = [
    ('01 / THE VISION', ['Finance.', 'Connected.', 'Sovereign.'],
     'Europäische Finanzinfrastruktur neu denken.',
     ['Eine modulare Initiative für Banking, Payments', 'und souveräne digitale Dienste.']),
    ('02 / THE ARCHITECTURE', ['Fünf Layer.', 'Ein Ökosystem.'],
     'Eine gemeinsame Sprache für Finanzsysteme.',
     ['BANKING  /  PAYMENT  /  DATA', 'COMPLIANCE  /  INFRASTRUCTURE']),
    ('03 / DIGITAL SOVEREIGNTY', ['Verbunden.', 'Klar getrennt.'],
     'Zwei Domänen. Eigenständige Verantwortung.',
     ['Kommerzielle Finanzdienste und souveräne', 'öffentliche Infrastruktur bleiben isoliert.']),
    ('04 / THE CAPITAL MODEL', ['600 Mio. €', 'als Zielrahmen.'],
     'Fünf geplante Quellen. Ein indikatives Modell.',
     ['Keine bestätigten Zusagen. Kapitalaufbringung', 'und Tragfähigkeit sind noch nachzuweisen.']),
    ('05 / RESILIENCE BY DESIGN', ['Vertrauen', 'beginnt im Kern.'],
     'Sicherheit und Resilienz als Architekturziele.',
     ['Zero Trust · HSM · Audit Trails · Recovery', 'Regulatorische Prüfung und Nachweise ausstehend.']),
    ('06 / EUROPEAN FOUNDATION', ['Europa zuerst.', 'Schritt für Schritt.'],
     'Pilotieren. Nachweisen. Verantwortlich skalieren.',
     ['Phase I: Foundation  →  Phase II: Integration', 'Partner, Zulassungen und Finanzierung zu klären.']),
    ('07 / A CONNECTED FUTURE', ['Global denken.', 'Lokal verantworten.'],
     'Interoperabilität als langfristige Perspektive.',
     ['Phase III: Interoperability  →  Phase IV: Ecosystem', 'Expansion nur bei lokaler Zulassung und Tragfähigkeit.']),
    ('08 / THE NEXT CHAPTER', ['Aus einer Vision', 'wird ein Prüfpfad.'],
     'Die nächsten Schritte sind konkret.',
     ['Machbarkeit · Referenzarchitektur · Finanzmodell', 'Partnerdialog · Governance · regulatorische Prüfung']),
]

random.seed(27)
STARS = [(random.randrange(W), random.randrange(H), random.choice([1, 1, 1, 2]), random.random()) for _ in range(190)]
yy, xx = np.mgrid[0:H, 0:W]
halo = np.exp(-(((xx-960)/360)**2 + ((yy-350)/340)**2))
BASE = np.zeros((H, W, 3), dtype=np.uint8)
BASE[:, :, 0] = 5 + halo * 4
BASE[:, :, 1] = 10 + halo * 16
BASE[:, :, 2] = 17 + halo * 20
BACKGROUND = Image.fromarray(BASE)

def project(lat, lon, turn, radius=220, cx=969, cy=352):
    la, lo = math.radians(lat), math.radians(lon) + turn
    x = math.cos(la) * math.sin(lo)
    y = math.sin(la)
    z = math.cos(la) * math.cos(lo)
    tilt = -0.15
    return (cx + radius * (x * math.cos(tilt) - y * math.sin(tilt)),
            cy - radius * (x * math.sin(tilt) + y * math.cos(tilt)), z)

def globe(draw, t):
    turn = t * .075 - .6
    for lat in range(-75, 76, 15):
        pts = [project(lat, lon, turn) for lon in range(0, 363, 3)]
        for a,b in zip(pts, pts[1:]):
            fade = .17 + .44 * max(0, (a[2]+b[2])/2)
            draw.line([a[:2], b[:2]], fill=tuple(int(c*fade) for c in CYAN), width=1)
    for lon in range(0, 360, 20):
        pts=[project(lat,lon,turn) for lat in range(-90, 91, 3)]
        for a,b in zip(pts,pts[1:]):
            fade = .13 + .48 * max(0, (a[2]+b[2])/2)
            draw.line([a[:2],b[:2]],fill=tuple(int(c*fade) for c in CYAN),width=1)
    # Reference nodes illustrate a proposed network, not live service locations.
    for lat,lon in [(49,7),(51,-1),(48,18),(39,24),(44,-6),(36,139),(1,104),(40,-74),(-24,-46),(25,55),(-26,28)]:
        x,y,z=project(lat,lon,turn)
        if z>0:
            pulse=4+2*math.sin(t*2+lon)
            draw.ellipse((x-pulse-5,y-pulse-5,x+pulse+5,y+pulse+5),outline=(39,95,94),width=1)
            draw.ellipse((x-3,y-3,x+3,y+3),fill=LIME)
    # Orbital arcs in a tilted three-dimensional plane.
    for ring in [0,1]:
        pts=[]
        for k in range(151):
            a=k/150*math.pi*1.75+t*.16+ring*1.5
            x=math.cos(a)*(270+ring*20)
            y=math.sin(a)*(90+ring*12)
            angle=-.4+ring*.9
            pts.append((969+x*math.cos(angle)-y*math.sin(angle),352+x*math.sin(angle)+y*math.cos(angle)))
        draw.line(pts,fill=(61,104,112) if ring else (83,146,150),width=1)
        px,py=pts[-1]
        draw.ellipse((px-4,py-4,px+4,py+4),fill=CYAN)

def draw_frame(t):
    scene=min(7,int(t//5))
    phase=(t%5)/5
    frame=BACKGROUND.copy()
    d=ImageDraw.Draw(frame)
    for x,y,r,p in STARS:
        brightness=int(35+50*(.5+.5*math.sin(t*.8+p*7)))
        d.ellipse((x,y,x+r,y+r),fill=(brightness,brightness+12,brightness+19))
    # restrained perspective grid
    for a in range(-4,8):
        d.line([(950+a*35,510),(950+a*210,720)],fill=(13,31,40),width=1)
    for y in [540,580,640,710]:
        d.line((660,y,1280,y),fill=(13,31,40),width=1)
    globe(d,t)
    d.rounded_rectangle((54,37,91,74),radius=9,outline=CYAN,width=1)
    d.text((66,42),'E',font=font(21,True),fill=CYAN)
    d.text((105,39),'EURO FINANCE CORE',font=font(19,True),fill=WHITE)
    d.text((106,65),'INDEPENDENT INFRASTRUCTURE INITIATIVE',font=font(9,mono=True),fill=MUTED)
    d.text((1010,48),'CONCEPT FILM / 2026',font=font(12,mono=True),fill=MUTED)
    d.line((54,98,1226,98),fill=(30,47,56),width=1)
    label,title,subtitle,body=SCENES[scene]
    # Fade/slide the text on scene transitions, leaving the ambient globe continuous.
    layer=Image.new('RGBA',(W,H),(0,0,0,0))
    ld=ImageDraw.Draw(layer)
    appear=min(1,phase*9)
    leave=min(1,(1-phase)*13)
    opacity=int(255*min(appear,leave))
    offset=int((1-appear)*18)
    ld.text((57,151+offset),label,font=font(12,mono=True),fill=(*LIME,255))
    top=193+offset
    size=57 if scene==0 else 51
    for line in title:
        ld.text((53,top),line,font=font(size,True),fill=(*WHITE,255))
        top+=size+10
    sy=max(397,top+23)
    ld.text((57,sy+offset),subtitle,font=font(19),fill=(*CYAN,255))
    for i,line in enumerate(body):
        ld.text((57,sy+43+i*27+offset),line,font=font(15),fill=(*MUTED,255))
    # Bespoke lower information strip for each narrative section.
    if scene==3:
        values=[210,180,120,60,30]
        cols=[CYAN,LIME,(133,161,248),(147,135,191),(89,117,135)]
        x=57
        for amount,col in zip(values,cols):
            width=amount/600*540
            ld.rectangle((x,534,x+width-4,544),fill=(*col,255))
            ld.text((x,553),str(amount),font=font(12,mono=True),fill=(*col,255))
            x+=width
        ld.text((57,580),'EIB/InvestEU · Private · Banken · Förderbanken · F&E',font=font(11),fill=(*MUTED,255))
    else:
        small = ['API-FIRST  /  EUROPEAN BY VISION',
                 'ISOLIERBARE KOMPONENTEN · OFFENE SCHNITTSTELLEN',
                 'FINANCE DOMAIN  ≠  SOVEREIGN DOMAIN',
                 '',
                 'DORA · DATENSCHUTZ · BUSINESS CONTINUITY',
                 'I  FOUNDATION  →  II  INTEGRATION',
                 'III  INTEROPERABILITY  →  IV  ECOSYSTEM',
                 'VOM KONZEPT ZUM NACHWEIS'][scene]
        ld.rounded_rectangle((57,539,635,582),radius=6,fill=(10,25,32,230),outline=(39,65,72,255))
        ld.text((72,553),small,font=font(11,mono=True),fill=(*LIME,255))
    layer.putalpha(layer.getchannel('A').point(lambda v: int(v*opacity/255)))
    frame=Image.alpha_composite(frame.convert('RGBA'),layer).convert('RGB')
    d=ImageDraw.Draw(frame)
    d.text((846,611),'INTEROPERABILITY / CONCEPT MAP',font=font(10,mono=True),fill=(91,142,151))
    for i in range(8):
        x=57+i*146
        d.rounded_rectangle((x,650,x+133,653),radius=1,fill=(32,48,58))
        fill=1 if i<scene else phase if i==scene else 0
        if fill:
            d.rounded_rectangle((x,650,x+133*fill,653),radius=1,fill=CYAN)
    d.text((57,676),'Konzeptstudie · Finanzierung indikativ · keine amtliche Anerkennung',font=font(11),fill=MUTED)
    d.text((1120,674),f'{scene+1:02d} / 08',font=font(12,mono=True),fill=CYAN)
    return frame

def create_music(path):
    rate=44100
    t=np.arange(int(DURATION*rate))/rate
    signal=np.zeros_like(t)
    # Original slow ambient harmony, no sampled recordings.
    for i,chord in enumerate([(130.81,196.00,261.63),(110.00,164.81,220.00),
                              (87.31,130.81,174.61),(98.00,146.83,196.00)]*2):
        start=i*5
        local=t-start
        envelope=np.clip(local/1.2,0,1)*np.clip((5.8-local)/1.5,0,1)
        envelope*=((local>=0)&(local<5.8))
        for j,note in enumerate(chord):
            signal+=.035*envelope*np.sin(2*np.pi*note*t+.2*j)
            signal+=.009*envelope*np.sin(2*np.pi*note*2.003*t)
        for beat in range(5):
            dt=local-beat
            env=np.exp(-np.maximum(dt,0)*3.4)*((dt>=0)&(dt<1.8))
            note=chord[beat%3]*4
            signal+=.015*env*np.sin(2*np.pi*note*t)
    signal*=np.minimum(t/2,1)*np.minimum((DURATION-t)/3,1)
    stereo=np.column_stack([signal,signal*.97+np.roll(signal,441)*.03])
    pcm=(np.clip(stereo,-1,1)*32767).astype('<i2')
    with wave.open(str(path),'wb') as out:
        out.setnchannels(2);out.setsampwidth(2);out.setframerate(rate);out.writeframes(pcm.tobytes())

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    draw_frame(1.7).save(OUT/'poster.jpg',quality=94)
    with tempfile.TemporaryDirectory(prefix='efc-film-') as temp:
        audio=Path(temp)/'ambient.wav'
        create_music(audio)
        command=['ffmpeg','-y','-loglevel','warning','-f','rawvideo','-vcodec','rawvideo',
                 '-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-',
                 '-i',str(audio),'-vf','fps=24','-c:v','libx264','-preset','fast',
                 '-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k',
                 '-t',str(DURATION),'-movflags','+faststart',str(OUT/'euro-finance-core.mp4')]
        proc=subprocess.Popen(command,stdin=subprocess.PIPE)
        try:
            for n in range(FPS*DURATION):
                proc.stdin.write(draw_frame(n/FPS).tobytes())
                if n%(FPS*5)==0:
                    print(f'Rendered scene {n//(FPS*5)+1}/8',flush=True)
            proc.stdin.close()
            if proc.wait()!=0:
                raise RuntimeError('ffmpeg failed')
        except Exception:
            proc.kill(); raise
    captions=['WEBVTT','']
    for i,(_,title,subtitle,body) in enumerate(SCENES):
        captions.extend([str(i+1),f'00:00:{i*5:02d}.000 --> 00:00:{(i+1)*5:02d}.000',
                         ' '.join(title)+' '+subtitle+' '+' '.join(body),''])
    (OUT/'captions-de.vtt').write_text('\n'.join(captions),encoding='utf-8')
    (OUT/'README.md').write_text(
        '# Euro Finance Core concept film\n\n'
        'Original 40-second animated concept film, 1280 × 720, H.264 / AAC, 24 fps.\n'
        'Eight scenes, German on-screen captions, original procedurally synthesized ambient music. '
        'No recorded voice track. Browser speech narration is provided separately by the website.\n\n'
        'All diagrams are conceptual; no live banking infrastructure, official endorsement, '
        'committed financing or established partnership is claimed. Source: user-supplied '
        'Euro Finance Core pasted text, 27 October 2026. The oversized Masterbook PDF was not read.\n\n'
        'Regenerate: `python3 scripts/generate_promo.py` (Pillow, NumPy and ffmpeg required).\n',encoding='utf-8')
    print(OUT/'euro-finance-core.mp4')

if __name__=='__main__':
    main()
