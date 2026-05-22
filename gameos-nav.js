/**
 * GameOS Navigation + Shared UI Layer
 * Gives every game:
 *   • A beautiful "← GameOS" back button
 *   • Swipe-right / Escape to go back
 *   • Page-in animation
 *   • window.drawGameOSReady(ctx, opts) — premium ready screen
 *   • window.drawGameOSEnd(ctx, opts)   — premium end screen
 *
 * Include ONCE per game file: <script src="gameos-nav.js"></script>
 */

/* ══ SHARED CANVAS UTILITIES ══════════════════════════════════ */

/**
 * Draw a premium "ready to play" overlay.
 * Call from your game's ready/home state draw loop.
 *
 * opts: { W, H, SAFE, emoji, name, tagline, hiScore, hue,
 *         accentA, accentB, tip }
 */
window.drawGameOSReady = function(ctx, opts){
  const {W=540, H=960, SAFE={x:25,y:90,w:390,h:630},
         emoji='🎮', name='GAME', tagline='Play with your hands',
         hiScore=0, hue=260, accentA, accentB, tip=''} = opts;
  const ca = accentA || `hsl(${hue},80%,55%)`;
  const cb = accentB || `hsl(${(hue+40)%360},75%,50%)`;
  const t = Date.now();

  /* dark overlay */
  ctx.fillStyle='rgba(4,2,12,.78)';ctx.fillRect(0,0,W,H);

  /* radial spotlight behind emoji */
  const sg=ctx.createRadialGradient(W/2,SAFE.y+220,0,W/2,SAFE.y+220,130);
  sg.addColorStop(0,`hsla(${hue},70%,30%,.35)`);
  sg.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);

  /* animated ring */
  const ring=ctx.createRadialGradient(W/2,SAFE.y+220,78,W/2,SAFE.y+220,90);
  ring.addColorStop(0,'rgba(0,0,0,0)');
  ring.addColorStop(.5,`hsla(${hue},80%,55%,.2)`);
  ring.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=ring;ctx.beginPath();ctx.arc(W/2,SAFE.y+220,85+3*Math.sin(t/700),0,Math.PI*2);ctx.fill();

  /* emoji */
  ctx.save();
  ctx.textAlign='center';ctx.textBaseline='middle';
  const eScale=1+0.03*Math.sin(t/800);
  ctx.translate(W/2,SAFE.y+222);ctx.scale(eScale,eScale);
  ctx.font='84px Arial';ctx.fillText(emoji,0,0);
  ctx.restore();

  /* name gradient */
  ctx.save();
  ctx.textAlign='center';ctx.textBaseline='middle';
  const grd=ctx.createLinearGradient(W/2-120,0,W/2+120,0);
  grd.addColorStop(0,ca);grd.addColorStop(1,cb);
  ctx.font='900 44px -apple-system,Arial';
  ctx.fillStyle=grd;
  ctx.shadowColor=ca;ctx.shadowBlur=22;
  ctx.fillText(name.toUpperCase(),W/2,SAFE.y+305);
  ctx.shadowBlur=0;

  /* tagline */
  ctx.font='13px -apple-system,Arial';
  ctx.fillStyle='rgba(255,255,255,.65)';
  ctx.fillText(tagline,W/2,SAFE.y+342);

  /* tip */
  if(tip){
    ctx.font='12px Arial';ctx.fillStyle=`hsla(${hue},70%,72%,.8)`;
    ctx.fillText(tip,W/2,SAFE.y+368);
  }
  ctx.restore();

  /* hi score */
  if(hiScore>0){
    ctx.save();
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font='bold 15px Arial';ctx.fillStyle='#fbbf24';
    ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=6;
    ctx.fillText(`🏆 Best: ${hiScore}`,W/2,SAFE.y+SAFE.h-90);
    ctx.restore();
  }

  /* pulsing START cta */
  const cta_a=0.75+0.25*Math.sin(t/450);
  ctx.save();
  ctx.textAlign='center';ctx.textBaseline='middle';
  /* pill bg */
  ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(W/2-65,SAFE.y+SAFE.h-58,130,34,17);
  else ctx.rect(W/2-65,SAFE.y+SAFE.h-58,130,34);
  const pillG=ctx.createLinearGradient(W/2-65,0,W/2+65,0);
  pillG.addColorStop(0,`hsla(${hue},70%,30%,${cta_a})`);
  pillG.addColorStop(1,`hsla(${(hue+40)%360},65%,28%,${cta_a})`);
  ctx.fillStyle=pillG;ctx.fill();
  ctx.strokeStyle=`hsla(${hue},80%,60%,${cta_a})`;ctx.lineWidth=1.5;ctx.stroke();
  ctx.font=`bold 14px Arial`;ctx.fillStyle=`rgba(255,255,255,${cta_a})`;
  ctx.fillText('▶  PRESS START',W/2,SAFE.y+SAFE.h-41);
  ctx.restore();

  /* GameOS watermark */
  ctx.save();
  ctx.textAlign='center';ctx.textBaseline='bottom';
  ctx.font='700 10px Arial';ctx.fillStyle='rgba(255,255,255,.22)';
  ctx.fillText('GameOS · kyadav2270.github.io/gameos',W/2,H-8);
  ctx.restore();
};

/**
 * Draw a premium end screen.
 * opts: { W, H, SAFE, emoji, name, score, hiScore, hue, accentA, accentB,
 *         label, subLabel }
 */
window.drawGameOSEnd = function(ctx, opts){
  const {W=540, H=960, SAFE={x:25,y:90,w:390,h:630},
         emoji='🎮', name='GAME', score=0, hiScore=0, hue=260,
         accentA, accentB, label='GREAT GAME!', subLabel=''} = opts;
  const ca = accentA || `hsl(${hue},80%,55%)`;
  const cb = accentB || `hsl(${(hue+40)%360},75%,50%)`;

  ctx.fillStyle='rgba(4,2,12,.88)';ctx.fillRect(0,0,W,H);

  /* card */
  const cw=SAFE.w-24, ch=320;
  const cx=SAFE.x+12, cy=SAFE.y+(SAFE.h-ch)/2-10;
  ctx.save();
  ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(cx,cy,cw,ch,22);else ctx.rect(cx,cy,cw,ch);
  ctx.fillStyle='rgba(8,4,20,.9)';ctx.fill();
  ctx.strokeStyle=`hsla(${hue},60%,45%,.35)`;ctx.lineWidth=1.5;ctx.stroke();
  ctx.restore();

  const ccx=cx+cw/2;
  let y=cy+52;
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='70px Arial';ctx.fillText(emoji,ccx,y);y+=58;
  ctx.font='900 24px Arial';
  const grd=ctx.createLinearGradient(ccx-80,0,ccx+80,0);
  grd.addColorStop(0,ca);grd.addColorStop(1,cb);
  ctx.fillStyle=grd;ctx.fillText(label,ccx,y);y+=36;
  ctx.font='900 30px Arial';ctx.fillStyle='#fff';
  ctx.fillText(`${score} pts`,ccx,y);y+=36;
  if(subLabel){ctx.font='bold 14px Arial';ctx.fillStyle='rgba(255,255,255,.55)';ctx.fillText(subLabel,ccx,y);y+=28;}
  if(score>=hiScore&&score>0){
    ctx.font='900 16px Arial';ctx.fillStyle='#fbbf24';ctx.fillText('🏆 NEW RECORD!',ccx,y);
  }else if(hiScore>0){
    ctx.font='12px Arial';ctx.fillStyle='rgba(255,255,255,.4)';ctx.fillText(`Best: ${hiScore}`,ccx,y);
  }
  ctx.font='bold 12px Arial';ctx.fillStyle=ca;
  ctx.fillText('🎬 #GameOS · Share your reel',ccx,cy+ch-40);
  ctx.font='10px Arial';ctx.fillStyle='rgba(255,255,255,.4)';
  ctx.fillText('▶ Press Start to play again',ccx,cy+ch-20);
  ctx.restore();
};
(function(){
  const HUB = 'index.html';

  /* ── inject nav styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #gameos-nav-btn {
      position: fixed;
      top: max(env(safe-area-inset-top, 0px) + 10px, 12px);
      left: 12px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px 6px 8px;
      border-radius: 20px;
      background: rgba(10, 6, 20, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.85);
      font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.18s, transform 0.12s, border-color 0.18s;
      box-shadow: 0 2px 12px rgba(0,0,0,0.4);
      user-select: none;
      -webkit-user-select: none;
    }
    #gameos-nav-btn:hover {
      background: rgba(168,85,247,0.35);
      border-color: rgba(168,85,247,0.55);
      transform: scale(1.05);
    }
    #gameos-nav-btn:active { transform: scale(0.95); }
    #gameos-nav-btn .arrow { font-size: 14px; line-height: 1; }
    #gameos-nav-btn .label { line-height: 1; }

    /* page-in animation */
    @keyframes gameos-fadein {
      from { opacity:0; transform: scale(0.97); }
      to   { opacity:1; transform: scale(1); }
    }
    body { animation: gameos-fadein 0.28s ease-out both; }
  `;
  document.head.appendChild(style);

  /* ── create button ── */
  const btn = document.createElement('a');
  btn.id = 'gameos-nav-btn';
  btn.href = HUB;
  btn.innerHTML = '<span class="arrow">‹</span><span class="label">GameOS</span>';
  btn.title = 'Back to GameOS Hub (Esc)';

  /* don't block on mobile if panel sits on top */
  btn.addEventListener('click', e => {
    e.preventDefault();
    ping_nav();
    window.location.href = HUB;
  });

  /* keyboard shortcut */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { ping_nav(); window.location.href = HUB; }
  });

  /* swipe-right to go back */
  let _sx = 0, _sy = 0;
  document.addEventListener('touchstart', e => {
    _sx = e.touches[0].clientX;
    _sy = e.touches[0].clientY;
  }, {passive: true});
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - _sx;
    const dy = Math.abs(e.changedTouches[0].clientY - _sy);
    /* right-swipe: more than 80px horizontal, less than 40px vertical drift */
    if (dx > 80 && dy < 40) { ping_nav(); window.location.href = HUB; }
  }, {passive: true});

  function ping_nav(){
    try { fetch(`https://abacus.jasoncameron.dev/hit/gameos-kyadav2270/nav_back`).catch(()=>{}); } catch(_){}
  }

  /* append after DOM is ready */
  if (document.body) {
    document.body.appendChild(btn);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
  }
})();
