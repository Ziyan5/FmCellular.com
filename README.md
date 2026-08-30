[fmcellularwebsite.html](https://github.com/user-attachments/files/31620901/fmcellularwebsite.html)
# FmCellular.com<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport"/>
<title>FM Cellular — Certified Pre-Owned Apple Devices</title>
<meta content="FM Cellular — open box and certified pre-owned iPhone, iPad, Apple Watch, Samsung, Google Pixel and MacBook devices. Unlocked, inspected, and priced below retail." name="description"/>
<meta content="FM Cellular" property="og:title"/>
<meta content="Open box and certified pre-owned Apple, Samsung, and Google devices — unlocked and inspected." property="og:description"/>
<meta content="https://www.fmcellular.com" property="og:url"/>
<meta content="website" property="og:type"/>
<meta content="#ffffff" name="theme-color"/>
<link href="https://www.fmcellular.com" rel="canonical"/>
<link href="fm-cellular-logo.png" rel="icon" type="image/png"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
  /* ============================================================
     FM Cellular
     Light theme from the logo (navy #1b2a5e / blue #29abe2).
     Motion follows Apple's fluid-interface rules: feedback on
     pointer-down, transform+opacity only, gentle springs, and a
     full reduced-motion path.
     ============================================================ */
  :root{
    --bg:#ffffff;
    --bg-alt:#f5f5f7;
    --bg-tile:#f5f5f7;

    --navy:#1b2a5e;
    --navy-deep:#121d42;
    --blue:#29abe2;
    --blue-soft:#e8f5fc;
    --blue-tint:#f2fafd;
    --action:#0a72c4;
    --pink:#e0245e;

    --ink:#1d1d1f;
    --ink-soft:#5b5b60;
    --ink-faint:#86868b;

    --line:rgba(0,0,0,0.10);
    --line-soft:rgba(0,0,0,0.06);
    --shadow-sm:0 1px 3px rgba(16,24,48,.07);
    --shadow-md:0 10px 30px -12px rgba(16,24,48,.22);
    --shadow-lg:0 30px 70px -28px rgba(16,24,48,.38);

    --r-sm:10px; --r-md:14px; --r-lg:20px; --r-xl:28px;

    /* Motion. --ease-out is the settle curve; --spring adds a touch of
       overshoot and is reserved for momentum-ish moments (press release). */
    --ease:cubic-bezier(.4,0,.2,1);
    --ease-out:cubic-bezier(.16,1,.3,1);
    --spring:cubic-bezier(.34,1.4,.5,1);

    --font:-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, "Segoe UI", sans-serif;
    --font-mono:ui-monospace, "SF Mono", SFMono-Regular, Menlo, "Cascadia Mono", monospace;

    --header-h:56px;
  }

  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth; -webkit-text-size-adjust:100%;}
  body{
    background:var(--bg); color:var(--ink);
    font-family:var(--font); font-size:17px; line-height:1.47; letter-spacing:-0.01em;
    -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
    overflow-x:hidden;
  }
  body.locked{overflow:hidden;}
  a{color:inherit; text-decoration:none;}
  img{max-width:100%;}
  button{font-family:inherit; color:inherit;}
  ::selection{background:rgba(41,171,226,.28);}
  /* Tracking is size-specific: tighten as type grows, leave body near zero. */
  h1,h2,h3,h4{font-weight:600; line-height:1.08; color:var(--navy); letter-spacing:-0.024em;}
  .wrap{max-width:1320px; margin:0 auto; padding:0 clamp(20px, 4vw, 48px);}
  :focus-visible{outline:2px solid var(--action); outline-offset:3px; border-radius:8px;}
  :focus:not(:focus-visible){outline:none;}

  .reveal{opacity:0; transform:translateY(20px); transition:opacity .7s var(--ease-out), transform .7s var(--ease-out);}
  .reveal.in{opacity:1; transform:none;}

  /* Reduced motion keeps the feedback, drops the travel. */
  @media (prefers-reduced-motion:reduce){
    html{scroll-behavior:auto;}
    .reveal{opacity:1; transform:none; transition:none;}
    *,*::before,*::after{
      animation-duration:.001ms !important; animation-iteration-count:1 !important;
      transition-duration:.12s !important; scroll-behavior:auto !important;
    }
    .card:hover, .value-card:hover, .check:hover, .contact-card:hover{transform:none !important;}
  }
  @media (prefers-reduced-transparency:reduce){
    header, .flyout, .search-overlay-inner, .quick-links-menu, .mobile-menu{
      backdrop-filter:none !important; -webkit-backdrop-filter:none !important; background:#fff !important;
    }
  }

  /* ---------- Buttons ---------- */
  .btn{
    display:inline-flex; align-items:center; justify-content:center; gap:7px;
    border:none; cursor:pointer; white-space:nowrap;
    font-size:0.94rem; font-weight:500; letter-spacing:-0.01em;
    border-radius:980px; padding:10px 19px;
    transition:background .25s var(--ease), transform .18s var(--ease-out), color .25s var(--ease);
  }
  .btn svg{width:15px; height:15px;}
  .btn:active{transform:scale(.96);}
  .btn-primary{background:var(--navy); color:#fff;}
  .btn-primary:hover{background:var(--navy-deep);}
  .btn-secondary{background:var(--bg-alt); color:var(--navy); box-shadow:inset 0 0 0 1px var(--line-soft);}
  .btn-secondary:hover{background:#eaeaee;}
  .btn-white{background:#fff; color:var(--navy);}
  .btn-white:hover{background:#eef4fb;}
  .btn-ghost-light{background:rgba(255,255,255,.16); color:#fff; box-shadow:inset 0 0 0 1px rgba(255,255,255,.36);}
  .btn-ghost-light:hover{background:rgba(255,255,255,.26);}
  .btn-lg{font-size:1.04rem; padding:13px 28px;}

  /* ---------- Header / Apple-style nav ---------- */
  header{
    position:sticky; top:0; z-index:80;
    background:rgba(255,255,255,.78);
    backdrop-filter:saturate(180%) blur(20px); -webkit-backdrop-filter:saturate(180%) blur(20px);
  }
  /* Scroll edge effect rather than a hard 1px rule under the chrome. */
  header::after{
    content:""; position:absolute; left:0; right:0; top:100%; height:12px; pointer-events:none;
    background:linear-gradient(to bottom, rgba(0,0,0,.05), transparent);
    opacity:0; transition:opacity .3s var(--ease);
  }
  header.scrolled::after{opacity:1;}

  .header-inner{
    display:flex; align-items:center; gap:6px;
    padding:0 clamp(14px,3vw,40px); height:var(--header-h);
    max-width:1320px; margin:0 auto;
  }
  .brand{display:flex; align-items:center; background:none; border:none; padding:0 8px; cursor:pointer; flex-shrink:0;}
  .brand img{height:30px; width:auto; display:block; transition:transform .3s var(--ease-out);}
  .brand:active img{transform:scale(.94);}

  .nav-links{display:flex; align-items:center; gap:2px; margin:0 auto;}
  .nav-link{
    position:relative; background:none; border:none; cursor:pointer;
    font-size:0.83rem; font-weight:400; color:var(--ink); letter-spacing:-0.005em;
    padding:8px 11px; border-radius:8px; white-space:nowrap;
    transition:color .2s var(--ease), background .2s var(--ease);
  }
  .nav-link:hover{color:var(--action);}
  .nav-link.open{color:var(--action);}
  .nav-actions{display:flex; align-items:center; gap:2px; flex-shrink:0;}
  .icon-btn{
    position:relative; width:36px; height:36px; border-radius:50%; border:none; background:none;
    display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink);
    transition:background .2s var(--ease), transform .18s var(--ease-out);
  }
  .icon-btn:hover{background:var(--bg-alt);}
  .icon-btn:active{transform:scale(.9);}
  .icon-btn svg{width:19px; height:19px;}
  .icon-btn .badge{
    position:absolute; top:2px; right:1px; min-width:16px; height:16px; padding:0 4px;
    border-radius:980px; background:var(--pink); color:#fff;
    font-size:0.63rem; font-weight:600; line-height:16px; text-align:center;
    transform:scale(0); transition:transform .35s var(--spring);
  }
  .icon-btn .badge.show{transform:scale(1);}
  .menu-btn{display:none;}

  /* flyout — materialises (blur + scale) rather than plain-fading */
  .flyout{
    position:fixed; left:0; right:0; top:var(--header-h); z-index:75;
    background:rgba(255,255,255,.86);
    backdrop-filter:saturate(180%) blur(24px); -webkit-backdrop-filter:saturate(180%) blur(24px);
    box-shadow:0 20px 40px -24px rgba(16,24,48,.3);
    opacity:0; visibility:hidden; transform:translateY(-8px);
    transition:opacity .28s var(--ease), transform .34s var(--ease-out), visibility .28s;
  }
  .flyout.open{opacity:1; visibility:visible; transform:none;}
  .flyout-inner{
    max-width:1320px; margin:0 auto; padding:26px clamp(20px,4vw,48px) 32px;
    display:flex; gap:clamp(14px,3vw,40px); justify-content:center; flex-wrap:wrap;
  }
  .flyout-item{
    background:none; border:none; cursor:pointer; padding:10px 8px 8px; border-radius:14px;
    display:flex; flex-direction:column; align-items:center; gap:9px; min-width:92px;
    transition:background .2s var(--ease), transform .3s var(--ease-out);
  }
  .flyout-item:hover{background:rgba(0,0,0,.035); transform:translateY(-3px);}
  .flyout-item:active{transform:scale(.95);}
  .flyout-item svg{width:46px; height:46px; color:var(--navy);}
  .flyout-label{font-size:0.76rem; color:var(--action); font-weight:400; text-align:center;}
  .flyout-item .flyout-count{font-size:0.68rem; color:var(--ink-faint); font-family:var(--font-mono);}
  .flyout-scrim{
    position:fixed; inset:0; z-index:70; background:rgba(0,0,0,.12);
    opacity:0; visibility:hidden; transition:opacity .28s var(--ease), visibility .28s;
  }
  .flyout-scrim.open{opacity:1; visibility:visible;}

  /* mobile menu */
  .mobile-menu{
    position:fixed; inset:var(--header-h) 0 0; z-index:76; overflow-y:auto;
    background:rgba(255,255,255,.94);
    backdrop-filter:saturate(180%) blur(24px); -webkit-backdrop-filter:saturate(180%) blur(24px);
    padding:14px clamp(20px,5vw,32px) 40px;
    opacity:0; visibility:hidden; transform:translateY(-10px);
    transition:opacity .3s var(--ease), transform .38s var(--ease-out), visibility .3s;
  }
  .mobile-menu.open{opacity:1; visibility:visible; transform:none;}
  .mm-item{
    display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%;
    background:none; border:none; cursor:pointer; text-align:left;
    padding:15px 4px; font-size:1.28rem; font-weight:600; color:var(--navy);
    letter-spacing:-0.02em; border-bottom:1px solid var(--line-soft);
    transition:opacity .2s var(--ease);
  }
  .mm-item:active{opacity:.55;}
  .mm-item .mm-count{font-size:0.8rem; font-weight:400; color:var(--ink-faint); font-family:var(--font-mono);}
  .mm-sub{font-size:0.98rem; font-weight:400; color:var(--ink-soft); padding:11px 4px;}

  /* ---------- Search overlay ---------- */
  .search-overlay{
    position:fixed; inset:0; z-index:90;
    opacity:0; visibility:hidden; transition:opacity .26s var(--ease), visibility .26s;
  }
  .search-overlay.open{opacity:1; visibility:visible;}
  .search-overlay-scrim{position:absolute; inset:0; background:rgba(0,0,0,.28);}
  .search-overlay-inner{
    position:relative; background:rgba(255,255,255,.94);
    backdrop-filter:saturate(180%) blur(26px); -webkit-backdrop-filter:saturate(180%) blur(26px);
    padding:16px clamp(20px,4vw,48px) 26px; max-height:86vh; overflow-y:auto;
    transform:translateY(-14px) scale(.99);
    transition:transform .36s var(--ease-out);
  }
  .search-overlay.open .search-overlay-inner{transform:none;}
  .search-bar{max-width:800px; margin:0 auto; display:flex; align-items:center; gap:12px;}
  .search-bar svg{width:20px; height:20px; color:var(--ink-faint); flex-shrink:0;}
  .search-bar input{
    flex:1; border:none; background:none; outline:none; font-family:inherit;
    font-size:1.5rem; font-weight:400; letter-spacing:-0.025em; color:var(--ink); padding:10px 0;
  }
  .search-bar input::placeholder{color:var(--ink-faint);}
  .search-bar input::-webkit-search-cancel-button{-webkit-appearance:none;}
  .search-close{
    background:var(--bg-alt); border:none; border-radius:980px; cursor:pointer;
    padding:8px 15px; font-size:0.88rem; font-weight:500; color:var(--navy);
    transition:background .2s var(--ease), transform .18s var(--ease-out);
  }
  .search-close:active{transform:scale(.95);}
  .search-results{max-width:800px; margin:18px auto 0;}
  .sr-group + .sr-group{margin-top:20px;}
  .sr-title{font-size:0.74rem; font-weight:600; letter-spacing:.07em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:8px;}
  .sr-item{
    display:flex; align-items:center; gap:13px; width:100%; text-align:left;
    background:none; border:none; cursor:pointer; padding:9px 10px; border-radius:12px;
    transition:background .18s var(--ease), transform .18s var(--ease-out);
  }
  .sr-item:hover{background:rgba(0,0,0,.04);}
  .sr-item:active{transform:scale(.99);}
  .sr-thumb{
    width:44px; height:44px; border-radius:10px; background:var(--bg-alt); flex-shrink:0;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  .sr-thumb img{width:100%; height:100%; object-fit:contain; padding:3px;}
  .sr-thumb svg{width:24px; height:24px; color:#b9c2d6;}
  .sr-main{flex:1; min-width:0;}
  .sr-name{font-size:0.98rem; font-weight:500; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
  .sr-meta{font-size:0.82rem; color:var(--ink-faint);}
  .sr-price{font-size:0.92rem; font-weight:600; color:var(--navy); white-space:nowrap;}
  .sr-empty{color:var(--ink-faint); padding:20px 10px; font-size:0.95rem;}
  .sr-hint{color:var(--ink-faint); padding:12px 10px; font-size:0.9rem;}

  /* ---------- Hero ---------- */
  .hero-section{position:relative; padding:70px 0 84px; overflow:hidden;}
  .hero-section::before{
    content:""; position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(680px 420px at 78% 26%, var(--blue-soft), transparent 70%),
      linear-gradient(180deg, var(--blue-tint), #fff 62%);
  }
  .hero-section > .wrap{position:relative; z-index:1;}
  .hero-content{display:grid; grid-template-columns:1.02fr .98fr; gap:52px; align-items:center;}
  .hero-eyebrow{
    display:inline-flex; align-items:center; gap:8px; margin-bottom:20px;
    font-size:0.82rem; font-weight:500; color:var(--navy);
    background:#fff; border:1px solid var(--line-soft); box-shadow:var(--shadow-sm);
    padding:6px 14px; border-radius:980px;
  }
  .hero-eyebrow .dot{width:6px; height:6px; border-radius:50%; background:#30c94e; flex-shrink:0;}
  .hero-text h1{font-size:clamp(2.35rem,5.2vw,4.05rem); line-height:1.05; font-weight:700; letter-spacing:-0.035em; margin-bottom:18px;}
  .hero-text h1 em{font-style:normal; color:var(--blue);}
  .hero-text p{font-size:1.12rem; line-height:1.5; color:var(--ink-soft); margin-bottom:28px; max-width:520px; letter-spacing:-0.008em;}
  .hero-actions{display:flex; gap:12px; align-items:center; flex-wrap:wrap;}
  .hero-stats{display:flex; gap:40px; margin-top:44px; flex-wrap:wrap;}
  .hero-stats .num{font-size:1.68rem; font-weight:600; letter-spacing:-0.03em; color:var(--navy);}
  .hero-stats .lbl{font-size:0.82rem; color:var(--ink-faint); margin-top:2px;}

  .hero-art{position:relative; display:flex; align-items:center; justify-content:center; min-height:420px;}
  .hero-art::before{
    content:""; position:absolute; width:74%; aspect-ratio:1; border-radius:50%;
    background:radial-gradient(circle, rgba(41,171,226,.22), transparent 66%);
  }
  /* Cutouts have no background, so they float directly — no card needed.
     Opacity stays at 1 here: the float animation replaces any entry animation,
     so an opacity-0 base would leave the devices permanently invisible. */
  /* Each slot is a wrapper that owns the drifting float, holding two stacked
     image layers that own the crossfade. They are separated deliberately: a
     running CSS animation overrides a transition on the same property, so a
     float animating opacity/transform on the image itself would kill the fade
     and make swaps look like a hard cut. */
  .hero-phone{
    position:absolute; aspect-ratio:1/1;
    animation:heroFloat var(--dur,7s) ease-in-out var(--delay,0s) infinite;
    will-change:transform;
  }
  .hero-phone.lead{width:50%; z-index:3; --rot:0deg; --delay:.05s; --dur:7s;}
  .hero-phone.left{width:38%; left:0; top:6%; z-index:2; --rot:-11deg; --delay:1.1s; --dur:8.3s;}
  .hero-phone.right{width:38%; right:0; top:30%; z-index:2; --rot:11deg; --delay:2.2s; --dur:9.1s;}

  .hero-phone .layer{
    position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
    filter:drop-shadow(0 26px 34px rgba(16,24,48,.26));
    opacity:0; transform:scale(.965);
    transition:opacity 1.5s var(--ease), transform 1.7s var(--ease-out);
    pointer-events:none;
  }
  .hero-phone .layer.on{opacity:1; transform:scale(1);}

  /* ---------- Section headings ---------- */
  .section-head{max-width:680px; margin:0 auto 44px; text-align:center;}
  .section-head.left{margin-left:0; text-align:left;}
  .section-title{font-size:clamp(1.85rem,3.5vw,2.85rem); font-weight:600; letter-spacing:-0.03em;}
  .section-sub{margin-top:12px; font-size:1.05rem; color:var(--ink-soft);}
  .eyebrow-label{
    display:inline-block; font-size:0.77rem; font-weight:600; letter-spacing:0.08em;
    text-transform:uppercase; color:var(--blue); margin-bottom:12px;
  }

  /* ---------- Value grid ---------- */
  .features-section{padding:86px 0; background:var(--bg-alt);}
  .value-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px;}
  .value-card{
    background:#fff; border-radius:var(--r-lg); padding:26px 22px; box-shadow:var(--shadow-sm);
    transition:transform .5s var(--ease-out), box-shadow .5s var(--ease-out);
  }
  .value-card:hover{transform:translateY(-5px); box-shadow:var(--shadow-md);}
  .value-icon{
    color:var(--blue); margin-bottom:14px;
    width:44px; height:44px; border-radius:12px; background:var(--blue-soft);
    display:flex; align-items:center; justify-content:center; font-size:22px;
  }
  .value-card h3{font-size:1.03rem; margin-bottom:7px;}
  .value-card p{font-size:0.92rem; color:var(--ink-soft); line-height:1.45;}

  /* ---------- Credit Key ---------- */
  .creditkey{padding:92px 0;}
  .ck-panel{
    position:relative; overflow:hidden; border-radius:var(--r-xl);
    background:linear-gradient(135deg, var(--navy) 0%, #23407f 52%, #1c6ea8 100%);
    color:#fff; padding:clamp(32px,4.6vw,60px);
    display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(28px,4vw,54px); align-items:center;
    box-shadow:var(--shadow-lg);
  }
  .ck-panel::before{
    content:""; position:absolute; top:-40%; right:-14%; width:62%; aspect-ratio:1; border-radius:50%;
    background:radial-gradient(circle, rgba(41,171,226,.55), transparent 68%);
  }
  .ck-copy{position:relative; z-index:1;}
  .ck-copy .eyebrow-label{color:#7fd4f5;}
  .ck-copy h2{color:#fff; font-size:clamp(1.8rem,3vw,2.55rem); margin-bottom:14px;}
  .ck-copy p{color:rgba(255,255,255,.84); font-size:1.04rem; max-width:460px; margin-bottom:24px;}
  .ck-points{display:flex; flex-wrap:wrap; gap:9px; margin-bottom:26px;}
  .ck-point{
    display:inline-flex; align-items:center; gap:7px; font-size:0.86rem; font-weight:500;
    background:rgba(255,255,255,.13); border:1px solid rgba(255,255,255,.2);
    padding:7px 14px; border-radius:980px;
  }
  .ck-point .material-symbols-outlined{font-size:17px; color:#7fd4f5;}
  .ck-actions{display:flex; gap:11px; flex-wrap:wrap;}
  .ck-visual{position:relative; z-index:1; display:flex; justify-content:center; perspective:1100px;}
  .ck-card{
    width:min(100%,360px); aspect-ratio:1.586; border-radius:20px; padding:24px;
    background:linear-gradient(140deg, rgba(255,255,255,.24), rgba(255,255,255,.07));
    border:1px solid rgba(255,255,255,.34);
    backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    box-shadow:0 30px 60px -24px rgba(0,0,0,.6);
    display:flex; flex-direction:column; justify-content:space-between;
    transform:rotateY(-13deg) rotateX(6deg); transition:transform .7s var(--ease-out);
  }
  .ck-panel:hover .ck-card{transform:rotateY(-5deg) rotateX(2deg) translateY(-8px);}
  .ck-card-top{display:flex; align-items:center; justify-content:space-between;}
  .ck-chip{width:40px; height:29px; border-radius:6px; background:linear-gradient(135deg,#f3dc9e,#c9a227);}
  .ck-brand{font-size:0.8rem; font-weight:600; color:rgba(255,255,255,.9);}
  .ck-terms{font-size:2rem; font-weight:700; letter-spacing:-0.03em; color:#fff; line-height:1;}
  .ck-terms small{display:block; font-size:0.76rem; font-weight:500; letter-spacing:0; color:rgba(255,255,255,.74); margin-top:6px;}
  .ck-card-bottom{display:flex; align-items:flex-end; justify-content:space-between; font-size:0.76rem; color:rgba(255,255,255,.7);}
  .ck-stats{
    position:relative; z-index:1; grid-column:1/-1;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:14px;
    padding-top:26px; border-top:1px solid rgba(255,255,255,.18);
  }
  .ck-stat .n{font-size:1.48rem; font-weight:700; letter-spacing:-0.03em; color:#fff;}
  .ck-stat .l{font-size:0.82rem; color:rgba(255,255,255,.72); margin-top:3px;}
  @media (max-width:880px){ .ck-panel{grid-template-columns:1fr;} .ck-visual{order:-1;} }

  /* ---------- Purple sticker ---------- */
  .sticker-section{padding:92px 0; background:var(--bg-alt);}
  .sticker-layout{display:grid; grid-template-columns:.82fr 1.18fr; gap:clamp(30px,5vw,64px); align-items:center;}
  .sticker-badge-wrap{display:flex; justify-content:center; position:relative;}
  .sticker-badge-wrap::before{
    content:""; position:absolute; width:74%; aspect-ratio:1; border-radius:50%;
    background:radial-gradient(circle, rgba(139,79,214,.20), transparent 68%);
  }
  .sticker-badge{
    width:min(100%,280px); position:relative;
    filter:drop-shadow(0 22px 40px rgba(88,42,150,.32));
    animation:stickerFloat 8s ease-in-out infinite;
  }
  @keyframes stickerFloat{
    0%,100%{transform:translateY(0) rotate(-5deg);}
    50%{transform:translateY(-13px) rotate(-1deg);}
  }
  .checks{display:grid; grid-template-columns:repeat(auto-fit,minmax(224px,1fr)); gap:13px; margin-top:26px;}
  .check{
    display:flex; gap:13px; align-items:flex-start; background:#fff;
    border-radius:var(--r-md); padding:17px 18px; box-shadow:var(--shadow-sm);
    transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
  }
  .check:hover{transform:translateY(-4px); box-shadow:var(--shadow-md);}
  .check-icon{
    flex-shrink:0; width:34px; height:34px; border-radius:10px;
    background:#f3ecfd; color:#7b3fd4; display:flex; align-items:center; justify-content:center;
  }
  .check-icon .material-symbols-outlined{font-size:19px;}
  .check h4{font-size:0.95rem; margin-bottom:3px;}
  .check p{font-size:0.85rem; color:var(--ink-soft); line-height:1.42;}
  @media (max-width:880px){ .sticker-layout{grid-template-columns:1fr;} }

  /* ---------- Recently viewed ---------- */
  .recent-section{padding:0 0 20px;}
  .recent-head{display:flex; align-items:baseline; justify-content:space-between; gap:14px; margin-bottom:16px;}
  .recent-head h3{font-size:1.2rem; letter-spacing:-0.025em;}
  .recent-clear{background:none; border:none; cursor:pointer; font-size:0.86rem; color:var(--action);}
  .recent-rail{
    display:flex; gap:12px; overflow-x:auto; scroll-snap-type:x proximity;
    padding:4px 0 14px; scrollbar-width:none;
    margin:0 calc(-1 * clamp(20px,4vw,48px)); padding-left:clamp(20px,4vw,48px); padding-right:clamp(20px,4vw,48px);
  }
  .recent-rail::-webkit-scrollbar{display:none;}
  .recent-card{
    flex:0 0 auto; width:132px; scroll-snap-align:start; background:#fff; border-radius:var(--r-md);
    box-shadow:var(--shadow-sm); padding:10px; cursor:pointer; text-align:center;
    transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
  }
  .recent-card:hover{transform:translateY(-4px); box-shadow:var(--shadow-md);}
  .recent-card:active{transform:scale(.97);}
  .recent-card .rc-img{height:74px; display:flex; align-items:center; justify-content:center; margin-bottom:7px;}
  .recent-card img{max-height:100%; object-fit:contain;}
  .recent-card svg{width:40px; height:40px; color:#c3cbdb;}
  .recent-card .rc-name{font-size:0.78rem; color:var(--ink); line-height:1.25;}

  /* ---------- Catalog ---------- */
  .catalog-section{padding:84px 0 96px;}
  .catalog-layout{display:grid; grid-template-columns:206px 1fr; gap:40px; align-items:start; margin-top:34px;}
  .category-sidebar{position:sticky; top:calc(var(--header-h) + 20px);}
  .sidebar-title{font-size:0.74rem; font-weight:600; color:var(--ink-faint); margin-bottom:10px; padding-left:12px; text-transform:uppercase; letter-spacing:.05em;}
  .category-scroll{display:flex; flex-direction:column; gap:2px;}
  .chip{
    font-size:0.95rem; padding:9px 12px; border-radius:var(--r-sm); border:none;
    background:transparent; color:var(--ink-soft); cursor:pointer; text-align:left; width:100%;
    display:flex; align-items:center; justify-content:space-between; gap:10px;
    transition:background .2s var(--ease), color .2s var(--ease), transform .18s var(--ease-out);
  }
  .chip:hover{background:var(--bg-alt); color:var(--ink);}
  .chip:active{transform:scale(.97);}
  .chip.active{background:var(--blue-soft); color:var(--navy); font-weight:600;}
  .chip .count{font-family:var(--font-mono); font-size:0.72rem; color:var(--ink-faint); letter-spacing:0;}
  .chip.active .count{color:var(--action);}
  .chip.soon{opacity:.45; cursor:default;}
  .chip.soon:hover{background:transparent; color:var(--ink-soft);}
  .catalog-main{min-width:0;}
  @media (max-width:900px){
    .catalog-layout{grid-template-columns:1fr; gap:18px; margin-top:22px;}
    .category-sidebar{
      position:sticky; top:var(--header-h); z-index:30; overflow-x:auto; scrollbar-width:none;
      margin:0 calc(-1*clamp(20px,4vw,48px)); padding:9px clamp(20px,4vw,48px);
      background:rgba(255,255,255,.86);
      backdrop-filter:saturate(180%) blur(16px); -webkit-backdrop-filter:saturate(180%) blur(16px);
    }
    .category-sidebar::-webkit-scrollbar{display:none;}
    .sidebar-title{display:none;}
    .category-scroll{flex-direction:row; gap:7px;}
    .chip{white-space:nowrap; flex-shrink:0; width:auto; border-radius:980px; background:var(--bg-alt); padding:9px 16px;}
  }

  .catalog-head-area{display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:22px; flex-wrap:wrap; gap:14px;}
  .catalog-title{font-size:1.45rem; font-weight:600; letter-spacing:-0.028em;}
  .result-count{font-family:var(--font-mono); font-size:0.74rem; color:var(--ink-faint); margin-top:5px; letter-spacing:0;}
  .catalog-tools{display:flex; gap:9px; align-items:center; flex-wrap:wrap;}
  .clear-search{
    display:none; align-items:center; gap:6px; background:var(--blue-soft); color:var(--action);
    border:none; border-radius:980px; padding:8px 14px; font-size:0.86rem; font-weight:500; cursor:pointer;
    transition:background .2s var(--ease), transform .18s var(--ease-out);
  }
  .clear-search.show{display:inline-flex;}
  .clear-search:active{transform:scale(.95);}
  .clear-search svg{width:13px; height:13px;}

  /* ---------- Product grid ---------- */
  .grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(212px,1fr)); gap:16px;}
  .card{
    background:#fff; border-radius:var(--r-lg); padding:14px 14px 20px; cursor:pointer; position:relative;
    text-align:center; display:flex; flex-direction:column; box-shadow:var(--shadow-sm);
    transition:transform .55s var(--ease-out), box-shadow .55s var(--ease-out);
    will-change:transform;
  }
  .card:hover{transform:translateY(-8px); box-shadow:var(--shadow-md);}
  /* Feedback lands on pointer-down, per Apple's response rule. */
  .card.pressed{transform:translateY(-3px) scale(.975); transition-duration:.14s;}
  .card-icon{
    width:100%; aspect-ratio:1/1; margin-bottom:12px; border-radius:var(--r-md);
    overflow:visible; display:flex; align-items:center; justify-content:center; position:relative;
  }
  /* Photos are normalised to a uniform canvas, so the tile can show them
     larger without any one device looking oversized next to another. */
  .card-icon img{
    width:96%; height:96%; object-fit:contain;
    filter:drop-shadow(0 8px 14px rgba(16,24,48,.14));
    transition:transform .6s var(--ease-out), filter .6s var(--ease-out);
  }
  /* The device lifts off the card and its shadow grows — it floats. */
  .card:hover .card-icon img{transform:translateY(-8px) scale(1.06); filter:drop-shadow(0 20px 24px rgba(16,24,48,.22));}
  .card.pressed .card-icon img{transform:translateY(-3px) scale(1.01);}
  .card-icon svg{width:72%; height:72%; color:#c3cbdb; transition:color .3s var(--ease);}
  .card:hover .card-icon svg{color:var(--blue);}
  .card h3{font-size:0.97rem; font-weight:500; color:var(--ink); margin-bottom:3px; letter-spacing:-0.015em;}
  .qty-label{font-size:0.8rem; color:var(--ink-faint);}
  .card-price{margin-top:8px; font-size:1rem; font-weight:600; color:var(--navy); letter-spacing:-0.02em;}
  .card-price .from{font-weight:400; color:var(--ink-faint); font-size:0.82rem;}
  .card-price.contact{font-size:0.86rem; font-weight:500; color:var(--ink-faint);}
  .price-drop{
    position:absolute; top:12px; left:12px; z-index:3; background:#0f9d58; color:#fff;
    font-size:0.68rem; font-weight:600; padding:3px 9px; border-radius:980px;
  }
  .save-btn{
    position:absolute; top:8px; right:8px; z-index:3; width:32px; height:32px; border-radius:50%;
    border:none; background:rgba(255,255,255,.7); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink-faint);
    opacity:0; transform:scale(.8); transition:opacity .25s var(--ease), transform .3s var(--ease-out), color .2s var(--ease);
  }
  .card:hover .save-btn, .save-btn.saved{opacity:1; transform:none;}
  .save-btn:hover{color:var(--pink);}
  .save-btn.saved{color:var(--pink); --heart-fill:1;}
  .detail-save.saved svg{--heart-fill:1;}
  .save-btn:active{transform:scale(.82);}
  .save-btn svg{width:17px; height:17px;}
  .save-btn.pop{animation:heartPop .42s var(--spring);}
  .btn.pop{animation:btnPop .38s var(--spring);}
  @keyframes heartPop{0%{transform:scale(1);}40%{transform:scale(1.32);}100%{transform:scale(1);}}
  @keyframes btnPop{0%{transform:scale(1);}40%{transform:scale(1.04);}100%{transform:scale(1);}}
  @media (hover:none){ .save-btn{opacity:1; transform:none;} }
  .empty-state{grid-column:1/-1; text-align:center; padding:64px 20px; color:var(--ink-soft); background:#fff; border-radius:var(--r-lg); box-shadow:var(--shadow-sm);}
  .empty-state .btn{margin-top:16px;}

  /* ---------- Detail: stepped configurator ---------- */
  .detail-page{padding:20px 0 88px;}
  .detail-nav{display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:20px;}
  .back-btn{
    display:inline-flex; align-items:center; gap:5px; background:var(--bg-alt); border:none;
    color:var(--navy); font-size:0.9rem; font-weight:500; padding:8px 15px 8px 11px;
    border-radius:980px; cursor:pointer; transition:background .2s var(--ease), transform .18s var(--ease-out);
  }
  .back-btn:hover{background:#eaeaee;}
  .back-btn:active{transform:scale(.95);}
  .back-btn svg{width:15px; height:15px;}
  .breadcrumb{display:flex; flex-wrap:wrap; align-items:center; gap:7px; font-size:0.83rem; color:var(--ink-faint);}
  .breadcrumb button{background:none; border:none; color:var(--ink-faint); cursor:pointer; font:inherit; padding:0; transition:color .2s var(--ease);}
  .breadcrumb button:hover{color:var(--action);}
  .breadcrumb .crumb-current{color:var(--ink-soft);}
  .breadcrumb .sep{opacity:.4;}

  .detail-head{margin-bottom:22px; display:flex; align-items:flex-start; justify-content:space-between; gap:16px;}
  .detail-sku{font-family:var(--font-mono); font-size:0.73rem; color:var(--ink-faint); margin-bottom:8px; letter-spacing:0;}
  .detail-title{font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:600; letter-spacing:-0.032em;}
  .detail-save{
    flex-shrink:0; display:inline-flex; align-items:center; gap:7px; background:var(--bg-alt);
    border:none; border-radius:980px; padding:9px 16px; cursor:pointer;
    font-size:0.88rem; font-weight:500; color:var(--navy);
    transition:background .2s var(--ease), transform .18s var(--ease-out), color .2s var(--ease);
  }
  .detail-save:active{transform:scale(.95);}
  .detail-save.saved{background:#fdeaf0; color:var(--pink);}
  .detail-save svg{width:16px; height:16px;}

  .config-layout{display:grid; grid-template-columns:1fr 1fr; gap:clamp(26px,4.5vw,60px); align-items:start;}

  /* On desktop the steps get their own scroll container. Page scrolling would
     eventually run past the layout and release the sticky visual, taking the
     device off screen — this way only the right column moves and the phone is
     visible for the entire configuration. */
  @media (min-width:881px){
    /* --cfg-h is measured in JS from where the layout actually starts on the
       page, not from the header — the title above it means a viewport-based
       guess overshoots and pushes the step rail off the bottom. */
    /* A definite height (not just max-height) so flex can hand the leftover
       space to the stage — with max-height alone the image never grows. */
    .config-visual{
      position:sticky; top:calc(var(--header-h) + 16px); z-index:20;
      height:var(--cfg-h, calc(100vh - var(--header-h) - 34px));
      display:flex; flex-direction:column;
    }
    /* The stage takes what is left after the caption and rail, so those two are
       always on screen and the device is as large as the space allows. */
    .config-visual .visual-stage{aspect-ratio:auto; flex:1 1 0%; min-height:120px; max-height:none;}
    .config-steps{
      position:relative;      /* be the offset parent for anything measuring inside */
      max-height:var(--cfg-h, calc(100vh - var(--header-h) - 24px));
      overflow-y:auto; overscroll-behavior:contain; padding-bottom:14px;
      padding-right:10px; scrollbar-width:thin; scrollbar-color:rgba(0,0,0,.18) transparent;
    }
  }

  /* Short desktop windows: claw back vertical space above the layout and
     compact the rail, so the four steps still fit beside the device. */
  @media (min-width:881px) and (max-height:760px){
    .detail-page{padding-top:12px;}
    .detail-nav{margin-bottom:12px;}
    .detail-head{margin-bottom:12px;}
    .detail-sku{margin-bottom:5px;}
    .detail-title{font-size:clamp(1.4rem,2.4vw,1.9rem);}
    .config-visual .visual-stage{min-height:120px;}
    .visual-caption{margin-top:9px;}
    .step-rail{margin-top:10px;}
    .rail-item{padding:3px 0;}
    .rail-dot{width:20px; height:20px; font-size:0.65rem;}
    .rail-item.done .rail-dot .material-symbols-outlined{font-size:13px;}
    .rail-label, .rail-value{font-size:0.81rem;}
    .step-rail::before, .step-rail::after{left:9px;}
    .config-steps::-webkit-scrollbar{width:8px;}
    .config-steps::-webkit-scrollbar-thumb{background:rgba(0,0,0,.16); border-radius:8px;}
    .config-steps::-webkit-scrollbar-track{background:transparent;}
    .step{scroll-margin-top:6px;}
  }
  .visual-stage{
    position:relative; background:var(--bg-tile); border-radius:var(--r-xl);
    aspect-ratio:1/1; max-height:calc(100vh - var(--header-h) - 250px); min-height:200px;
    display:flex; align-items:center; justify-content:center; overflow:hidden; flex:0 1 auto;
  }
  .visual-stage img{
    width:92%; height:92%; object-fit:contain; position:relative; z-index:1;
    filter:drop-shadow(0 14px 22px rgba(16,24,48,.18));
  }
  .visual-stage img.swap{animation:swapIn .55s var(--ease-out);}
  .visual-stage svg{width:66%; height:66%; color:#c3cbdb; position:relative; z-index:1;}
  @keyframes swapIn{from{opacity:0; transform:translateY(14px) scale(.95);}}
  .visual-glow{
    position:absolute; inset:0; pointer-events:none; z-index:0;
    background:radial-gradient(circle at 50% 74%, var(--stage-glow, rgba(41,171,226,.18)), transparent 62%);
    transition:background .7s var(--ease);
  }
  .visual-caption{display:flex; align-items:center; justify-content:space-between; gap:14px; margin-top:14px; min-height:22px;}
  .visual-caption .vc-main{font-size:0.96rem; font-weight:500; color:var(--navy);}
  .visual-caption .vc-sub{font-size:0.84rem; color:var(--ink-faint);}

  .step-rail{list-style:none; display:flex; flex-direction:column; margin-top:16px; position:relative;}
  .step-rail::before{content:""; position:absolute; left:11px; top:var(--rail-top,14px); height:var(--rail-span,0px); width:2px; background:var(--line);}
  .step-rail::after{
    content:""; position:absolute; left:11px; top:var(--rail-top,14px); width:2px; background:var(--blue);
    height:var(--rail-fill,0px); transition:height .6s var(--ease-out);
  }
  .rail-item{display:flex; align-items:center; gap:12px; padding:6px 0; position:relative; z-index:1;}
  .rail-dot{
    width:24px; height:24px; border-radius:50%; flex-shrink:0; background:#fff;
    border:2px solid var(--line); display:flex; align-items:center; justify-content:center;
    font-size:0.7rem; font-weight:600; color:var(--ink-faint);
    transition:border-color .4s var(--ease), background .4s var(--ease), color .4s var(--ease), transform .45s var(--spring);
  }
  .rail-item.active .rail-dot{border-color:var(--blue); color:var(--action); transform:scale(1.16);}
  .rail-item.done .rail-dot{background:var(--blue); border-color:var(--blue); color:#fff;}
  .rail-item.done .rail-dot .material-symbols-outlined{font-size:15px;}
  .rail-label{font-size:0.87rem; color:var(--ink-faint); transition:color .3s var(--ease);}
  .rail-item.active .rail-label{color:var(--navy); font-weight:500;}
  .rail-item.done .rail-label{color:var(--ink-soft);}
  .rail-value{margin-left:auto; font-size:0.83rem; color:var(--ink-soft); text-align:right; max-width:52%;}

  .config-steps{display:flex; flex-direction:column; gap:15px;}
  .step{
    background:#fff; border:1px solid var(--line-soft); border-radius:var(--r-lg);
    padding:22px; scroll-margin-top:calc(var(--header-h) + 16px);
    transition:border-color .4s var(--ease), box-shadow .4s var(--ease);
  }
  .step.is-active{border-color:var(--blue); box-shadow:0 0 0 4px var(--blue-soft);}
  .step-head{display:flex; align-items:center; gap:10px; margin-bottom:6px;}
  .step-num{
    font-family:var(--font-mono); font-size:0.7rem; color:var(--action);
    background:var(--blue-soft); border-radius:980px; padding:3px 9px; letter-spacing:0;
  }
  .step-title{font-size:1.08rem; font-weight:600;}
  .step-hint{font-size:0.85rem; color:var(--ink-faint); margin-bottom:14px;}

  .option-label{font-size:0.81rem; font-weight:600; color:var(--ink-faint); text-transform:uppercase; letter-spacing:.05em;}
  .color-name{font-size:0.93rem; color:var(--ink);}
  .color-note{font-size:0.82rem; color:var(--ink-faint); margin-top:9px;}

  .option-tiles{display:grid; grid-template-columns:repeat(auto-fit,minmax(126px,1fr)); gap:10px;}
  .tile{
    text-align:left; background:#fff; border:1px solid var(--line); border-radius:var(--r-md);
    padding:13px 15px; cursor:pointer; position:relative; min-height:56px;
    transition:border-color .25s var(--ease), box-shadow .25s var(--ease), transform .2s var(--ease-out);
  }
  .tile:hover:not(.unavailable){border-color:#9fb4c9;}
  .tile:active:not(.unavailable){transform:scale(.97);}
  .tile.selected{border-color:var(--blue); box-shadow:0 0 0 3px var(--blue-soft);}
  .tile.unavailable{opacity:.42; cursor:not-allowed;}
  .tile-main{font-size:0.99rem; font-weight:600; color:var(--navy); letter-spacing:-0.015em;}
  .tile-sub{font-size:0.8rem; color:var(--ink-faint); margin-top:3px;}
  .tile-sub.avail{color:#0f9d58;}

  .swatch-row{display:flex; gap:12px; flex-wrap:wrap;}
  .swatch{
    width:40px; height:40px; border-radius:50%; padding:0; cursor:pointer;
    border:1px solid rgba(0,0,0,.16); box-shadow:inset 0 -2px 5px rgba(0,0,0,.10);
    transition:transform .3s var(--spring), box-shadow .25s var(--ease);
  }
  .swatch:hover{transform:scale(1.12);}
  .swatch:active{transform:scale(.94);}
  .swatch.selected{box-shadow:0 0 0 2px #fff, 0 0 0 4px var(--blue); transform:scale(1.08);}
  .swatch.unavailable{opacity:.3;}
  .swatch-meta{display:flex; align-items:baseline; gap:10px; margin-top:12px;}

  .step.summary{background:var(--bg-alt); border-color:transparent;}
  .summary-rows{display:flex; flex-direction:column; gap:9px;}
  .summary-row{display:flex; justify-content:space-between; gap:16px; font-size:0.92rem;}
  .summary-row span:first-child{color:var(--ink-faint);}
  .summary-row span:last-child{color:var(--ink); font-weight:500; text-align:right;}
  .detail-price-row{display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; padding-top:16px; margin-top:14px; border-top:1px solid var(--line); margin-bottom:14px;}
  .detail-price-row .price{font-size:2.15rem; font-weight:700; letter-spacing:-0.035em; color:var(--navy);}
  .detail-price-row .price.contact{font-size:1.4rem; font-weight:600; color:var(--ink-soft);}
  .detail-price-row .msrp{font-size:1rem; color:var(--ink-faint); text-decoration:line-through;}
  .detail-price-row .savings{font-size:0.8rem; font-weight:600; color:#fff; background:#0f9d58; padding:4px 11px; border-radius:980px;}
  .stock-status-detail{font-size:0.9rem; display:flex; align-items:center; gap:7px; margin-bottom:16px;}
  .stock-status-detail .material-symbols-outlined{font-size:19px;}
  .stock-status-detail.in-stock{color:#0f9d58;}
  .stock-status-detail.out-stock{color:var(--ink-soft);}
  .detail-buy{width:100%;}
  .detail-reassure{display:flex; flex-wrap:wrap; gap:14px; margin-top:16px;}
  .detail-reassure span{display:inline-flex; align-items:center; gap:6px; font-size:0.82rem; color:var(--ink-faint);}
  .detail-reassure .material-symbols-outlined{font-size:16px; color:#0f9d58;}

  /* Mobile: the visual becomes a compact sticky bar so the device stays
     on screen the whole way through the flow. */
  @media (max-width:880px){
    .config-layout{grid-template-columns:1fr; gap:16px;}
    .config-visual{
      position:sticky; top:var(--header-h); z-index:30;
      display:flex; align-items:center; gap:13px;
      margin:0 calc(-1*clamp(20px,4vw,48px)); padding:9px clamp(20px,4vw,48px);
      background:rgba(255,255,255,.88);
      backdrop-filter:saturate(180%) blur(18px); -webkit-backdrop-filter:saturate(180%) blur(18px);
      box-shadow:0 6px 18px -14px rgba(16,24,48,.5);
    }
    .visual-stage{
      width:64px; height:64px; min-height:0; max-height:none; aspect-ratio:1;
      border-radius:14px; flex-shrink:0;
    }
    .visual-stage img{width:92%; height:92%; filter:none;}
    .visual-caption{margin-top:0; flex:1; min-width:0; flex-direction:column; align-items:flex-start; gap:1px;}
    .visual-caption .vc-main{font-size:0.9rem;}
    .visual-caption .vc-sub{font-size:0.79rem;}
    .step-rail{display:none;}
    .detail-head{flex-direction:column; gap:12px;}
  }

  /* ---------- Info ---------- */
  .info-section{padding:86px 0; background:var(--bg-alt);}
  .info-list{max-width:820px; margin:0 auto;}
  .terms-block{background:#fff; border-radius:var(--r-md); margin-bottom:10px; overflow:hidden; box-shadow:var(--shadow-sm);}
  .terms-block > summary{
    cursor:pointer; padding:18px 22px; font-size:1rem; font-weight:500; color:var(--navy);
    list-style:none; display:flex; align-items:center; justify-content:space-between; gap:14px;
    transition:background .2s var(--ease);
  }
  .terms-block > summary:hover{background:#fafafc;}
  .terms-block > summary::-webkit-details-marker{display:none;}
  .terms-block > summary::after{
    content:""; flex-shrink:0; width:9px; height:9px;
    border-right:1.7px solid var(--ink-faint); border-bottom:1.7px solid var(--ink-faint);
    transform:rotate(45deg) translate(-2px,-2px); transition:transform .35s var(--ease-out);
  }
  .terms-block[open] > summary::after{transform:rotate(225deg) translate(-2px,-2px);}
  .terms-body{padding:0 22px 22px; color:var(--ink-soft); font-size:0.95rem; line-height:1.55;}
  .terms-body p{margin-bottom:13px;}
  .terms-body p:last-child{margin-bottom:0;}
  .terms-body strong{color:var(--ink); font-weight:600;}
  .terms-block.flash{animation:flashBlock 1.4s var(--ease);}
  @keyframes flashBlock{0%,100%{box-shadow:var(--shadow-sm);}25%{box-shadow:0 0 0 4px var(--blue-soft);}}

  /* ---------- Footer ---------- */
  footer{background:var(--navy); color:rgba(255,255,255,.72); padding:64px clamp(20px,4vw,48px) 30px;}
  .footer-inner{max-width:1320px; margin:0 auto;}
  .footer-top{display:grid; grid-template-columns:1.6fr repeat(3,1fr); gap:36px; margin-bottom:48px;}
  .footer-col h4{font-size:0.84rem; font-weight:600; color:#fff; margin-bottom:14px;}
  .footer-col ul{list-style:none; display:flex; flex-direction:column; gap:10px;}
  .footer-col a{font-size:0.88rem; color:rgba(255,255,255,.72); transition:color .2s var(--ease); cursor:pointer;}
  .footer-col a:hover{color:#fff;}
  .footer-logo{height:50px; width:auto; background:#fff; padding:8px 14px; border-radius:12px;}
  .footer-blurb{font-size:0.88rem; max-width:320px; margin-top:15px; line-height:1.5;}
  .footer-address{
    display:flex; gap:9px; align-items:flex-start; margin-top:16px;
    font-size:0.88rem; line-height:1.5; font-style:normal; max-width:320px;
  }
  .footer-address svg{width:16px; height:16px; flex:none; margin-top:2px; opacity:.72;}
  .footer-address a{color:inherit; text-decoration:none; border-bottom:1px solid rgba(255,255,255,.28);}
  .footer-address a:hover{border-bottom-color:currentColor;}
  @media (max-width:820px){ .footer-top{grid-template-columns:1fr 1fr; gap:30px;} }
  @media (max-width:520px){ .footer-top{grid-template-columns:1fr;} }

  .contact-grid{
    display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:13px;
    margin-bottom:40px; padding-top:40px; border-top:1px solid rgba(255,255,255,.14);
  }
  .contact-card{
    background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.13); border-radius:var(--r-md);
    padding:18px; display:flex; flex-direction:column; gap:15px; justify-content:space-between;
    transition:background .3s var(--ease), transform .45s var(--ease-out);
  }
  .contact-card:hover{background:rgba(255,255,255,.12); transform:translateY(-4px);}
  .contact-role{font-size:0.74rem; color:rgba(255,255,255,.6);}
  .contact-name{font-size:0.97rem; color:#fff; font-weight:500; margin-top:3px;}
  .contact-detail{font-family:var(--font-mono); font-size:0.77rem; color:rgba(255,255,255,.7); margin-top:5px; letter-spacing:0;}
  .contact-actions{display:flex; gap:7px;}
  .contact-btn{flex:1; display:flex; align-items:center; justify-content:center; padding:9px; border-radius:8px; font-size:0.83rem; font-weight:500; transition:background .2s var(--ease), transform .18s var(--ease-out);}
  .contact-btn:active{transform:scale(.96);}
  .btn-wa{background:#25d366; color:#06340f;}
  .btn-wa:hover{background:#3ae07a;}
  .btn-email{background:rgba(255,255,255,.14); color:#fff;}
  .btn-email:hover{background:rgba(255,255,255,.24);}
  .foot-bottom{
    display:flex; justify-content:space-between; align-items:center; gap:16px;
    padding-top:22px; border-top:1px solid rgba(255,255,255,.14);
    font-size:0.78rem; color:rgba(255,255,255,.55); flex-wrap:wrap;
  }

  /* ---------- Back to top ---------- */
  .to-top{
    position:fixed; right:18px; bottom:18px; z-index:60; width:44px; height:44px; border-radius:50%;
    border:none; cursor:pointer; background:rgba(255,255,255,.8); color:var(--navy);
    backdrop-filter:blur(14px) saturate(180%); -webkit-backdrop-filter:blur(14px) saturate(180%);
    box-shadow:var(--shadow-md); display:flex; align-items:center; justify-content:center;
    opacity:0; visibility:hidden; transform:translateY(14px) scale(.9);
    transition:opacity .3s var(--ease), transform .4s var(--ease-out), visibility .3s;
  }
  .to-top.show{opacity:1; visibility:visible; transform:none;}
  .to-top:active{transform:scale(.9);}
  .to-top svg{width:19px; height:19px;}

  /* ---------- Responsive nav ---------- */
  @media (max-width:1080px){
    .nav-links{display:none;}
    .menu-btn{display:flex;}
    .header-inner{gap:4px;}
    .brand{margin-right:auto;}
  }
  @media (min-width:1081px){ .mobile-menu{display:none;} }
  /* ---------- Step icons ---------- */
  .step-icon{
    width:30px; height:30px; border-radius:9px; background:var(--blue-soft); color:var(--action);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .step-icon .material-symbols-outlined{font-size:17px;}
  .summary-row span:first-child{display:inline-flex; align-items:center; gap:8px;}
  .summary-row .material-symbols-outlined{font-size:17px; color:var(--ink-faint);}

  /* ---------- Hero: cycling devices ---------- */
  /* The float lives on the wrapper and only touches transform, so it never
     competes with the layers' opacity crossfade. */
  @keyframes heroFloat{
    0%,100%{transform:translateY(0) rotate(var(--rot));}
    50%{transform:translateY(-16px) rotate(calc(var(--rot) + 1.5deg));}
  }
  @media (prefers-reduced-motion:reduce){
    .hero-phone{animation:none; transform:rotate(var(--rot));}
    .hero-phone .layer{transition:opacity .2s linear; transform:none;}
    .hero-phone .layer.on{transform:none;}
  }

  /* ---------- Cart ---------- */
  .page-section{padding:34px 0 92px;}
  .page-head{margin-bottom:28px;}
  .page-head h1{font-size:clamp(2rem,4vw,3rem); letter-spacing:-0.032em;}
  .page-head p{margin-top:10px; color:var(--ink-soft); font-size:1.05rem; max-width:640px;}
  .cart-layout{display:grid; grid-template-columns:1.6fr .9fr; gap:clamp(22px,3.5vw,44px); align-items:start;}
  @media (max-width:900px){ .cart-layout{grid-template-columns:1fr;} }
  .cart-items{display:flex; flex-direction:column; gap:12px;}
  .cart-item{
    display:grid; grid-template-columns:92px 1fr auto; gap:16px; align-items:center;
    background:#fff; border:1px solid var(--line-soft); border-radius:var(--r-lg); padding:14px 16px;
    animation:cartIn .45s var(--ease-out);
  }
  @keyframes cartIn{from{opacity:0; transform:translateY(10px);}}
  .cart-item.removing{opacity:0; transform:translateX(24px); transition:opacity .3s var(--ease), transform .3s var(--ease);}
  .cart-thumb{
    width:92px; height:92px; border-radius:var(--r-md); background:var(--bg-tile);
    display:flex; align-items:center; justify-content:center; overflow:hidden;
  }
  .cart-thumb img{width:88%; height:88%; object-fit:contain;}
  .cart-thumb svg{width:52%; height:52%; color:#c3cbdb;}
  .cart-name{font-size:1.02rem; font-weight:600; color:var(--navy); letter-spacing:-0.02em;}
  .cart-config{display:flex; flex-wrap:wrap; gap:7px; margin-top:7px;}
  .cart-tag{
    display:inline-flex; align-items:center; gap:5px; font-size:0.78rem; color:var(--ink-soft);
    background:var(--bg-alt); border-radius:980px; padding:4px 10px;
  }
  .cart-tag .material-symbols-outlined{font-size:14px; color:var(--ink-faint);}
  .cart-right{display:flex; flex-direction:column; align-items:flex-end; gap:9px;}
  .cart-price{font-size:1.05rem; font-weight:700; color:var(--navy); letter-spacing:-0.025em; white-space:nowrap;}
  .cart-price.ask{font-size:0.85rem; font-weight:500; color:var(--ink-faint);}
  .qty{display:flex; align-items:center; gap:2px; background:var(--bg-alt); border-radius:980px; padding:3px;}
  .qty button{
    width:28px; height:28px; border-radius:50%; border:none; background:none; cursor:pointer;
    color:var(--navy); font-size:1.05rem; line-height:1; display:flex; align-items:center; justify-content:center;
    transition:background .2s var(--ease), transform .18s var(--ease-out);
  }
  .qty button:hover{background:#e3e3e8;}
  .qty button:active{transform:scale(.88);}
  .qty span{min-width:24px; text-align:center; font-size:0.92rem; font-weight:600; color:var(--navy);}
  .cart-remove{background:none; border:none; cursor:pointer; font-size:0.82rem; color:var(--ink-faint); padding:2px;}
  .cart-remove:hover{color:var(--pink);}
  @media (max-width:560px){
    .cart-item{grid-template-columns:70px 1fr; gap:12px;}
    .cart-thumb{width:70px; height:70px;}
    .cart-right{grid-column:1/-1; flex-direction:row; align-items:center; justify-content:space-between; width:100%;}
  }

  .cart-summary{
    background:var(--bg-alt); border-radius:var(--r-xl); padding:24px;
    position:sticky; top:calc(var(--header-h) + 16px);
  }
  .cart-summary h3{font-size:1.12rem; margin-bottom:16px;}
  .cart-line{display:flex; justify-content:space-between; gap:14px; font-size:0.93rem; margin-bottom:10px;}
  .cart-line span:first-child{color:var(--ink-soft);}
  .cart-line.total{
    font-size:1.3rem; font-weight:700; color:var(--navy); letter-spacing:-0.03em;
    padding-top:14px; margin-top:6px; border-top:1px solid var(--line);
  }
  .cart-note{font-size:0.8rem; color:var(--ink-faint); margin-top:12px; line-height:1.45;}
  .cart-actions{display:flex; flex-direction:column; gap:9px; margin-top:18px;}
  .cart-empty{
    text-align:center; padding:64px 24px; background:#fff; border-radius:var(--r-xl);
    box-shadow:var(--shadow-sm);
  }
  .cart-empty .material-symbols-outlined{font-size:44px; color:#c3cbdb;}
  .cart-empty h3{margin:12px 0 6px; font-size:1.2rem;}
  .cart-empty p{color:var(--ink-soft); margin-bottom:18px;}

  .added-toast{
    position:fixed; left:50%; bottom:26px; transform:translateX(-50%) translateY(20px);
    z-index:95; display:flex; align-items:center; gap:10px;
    background:rgba(27,42,94,.96); color:#fff; padding:12px 20px; border-radius:980px;
    box-shadow:var(--shadow-lg); font-size:0.92rem; font-weight:500;
    opacity:0; visibility:hidden; transition:opacity .3s var(--ease), transform .45s var(--ease-out), visibility .3s;
  }
  .added-toast.show{opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);}
  .added-toast .material-symbols-outlined{font-size:19px; color:#5ce08a;}
  .added-toast button{background:rgba(255,255,255,.18); border:none; color:#fff; border-radius:980px; padding:5px 13px; font-size:0.85rem; cursor:pointer;}
  .added-toast button:hover{background:rgba(255,255,255,.3);}

  /* ---------- About page ---------- */
  .about-hero{
    background:linear-gradient(135deg, var(--navy) 0%, #23407f 55%, #1c6ea8 100%);
    color:#fff; border-radius:var(--r-xl); padding:clamp(34px,5vw,64px); margin-bottom:36px;
    position:relative; overflow:hidden;
  }
  .about-hero::before{
    content:""; position:absolute; top:-40%; right:-12%; width:56%; aspect-ratio:1; border-radius:50%;
    background:radial-gradient(circle, rgba(41,171,226,.5), transparent 68%);
  }
  .about-hero > *{position:relative; z-index:1;}
  .about-hero h1{color:#fff; font-size:clamp(2rem,4vw,3rem); margin-bottom:14px;}
  .about-hero p{color:rgba(255,255,255,.86); font-size:1.08rem; max-width:640px;}
  .about-stats{display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:16px; margin-top:32px;}
  .about-stat .n{font-size:1.9rem; font-weight:700; letter-spacing:-0.03em; color:#fff;}
  .about-stat .l{font-size:0.85rem; color:rgba(255,255,255,.72); margin-top:2px;}
  .about-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px; margin-bottom:36px;}
  .about-card{background:#fff; border:1px solid var(--line-soft); border-radius:var(--r-lg); padding:26px;}
  .about-card .value-icon{margin-bottom:14px;}
  .about-card h3{font-size:1.05rem; margin-bottom:8px;}
  .about-card p{font-size:0.93rem; color:var(--ink-soft); line-height:1.5;}
  .timeline{display:flex; flex-direction:column; gap:0; margin-top:8px;}
  .tl-item{display:grid; grid-template-columns:auto 1fr; gap:18px; padding-bottom:26px; position:relative;}
  .tl-item:not(:last-child)::before{content:""; position:absolute; left:13px; top:30px; bottom:0; width:2px; background:var(--line);}
  .tl-dot{
    width:28px; height:28px; border-radius:50%; background:var(--blue-soft); color:var(--action);
    display:flex; align-items:center; justify-content:center; font-size:0.78rem; font-weight:700; z-index:1;
  }
  .tl-item h4{font-size:1rem; margin-bottom:4px;}
  .tl-item p{font-size:0.92rem; color:var(--ink-soft);}

  /* ---------- Reviews page ---------- */
  .review-banner{
    display:flex; gap:12px; align-items:flex-start;
    background:#fff8e6; border:1px solid #f3dfae; border-radius:var(--r-md);
    padding:14px 16px; margin-bottom:24px; font-size:0.9rem; color:#6b5518;
  }
  .review-banner .material-symbols-outlined{font-size:20px; color:#b8860b; flex-shrink:0;}
  .rating-summary{
    display:flex; align-items:center; gap:22px; flex-wrap:wrap;
    background:var(--bg-alt); border-radius:var(--r-xl); padding:24px 28px; margin-bottom:26px;
  }
  .rating-big{font-size:3rem; font-weight:700; letter-spacing:-0.04em; color:var(--navy); line-height:1;}
  .stars{display:flex; gap:2px; color:#f5a623;}
  .stars .material-symbols-outlined{font-size:20px; font-variation-settings:'FILL' 1;}
  .rating-meta{font-size:0.88rem; color:var(--ink-soft); margin-top:5px;}
  .reviews-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:16px;}
  .review-card{
    background:#fff; border:1px solid var(--line-soft); border-radius:var(--r-lg); padding:22px;
    display:flex; flex-direction:column; gap:12px;
    transition:transform .45s var(--ease-out), box-shadow .45s var(--ease-out);
  }
  .review-card:hover{transform:translateY(-4px); box-shadow:var(--shadow-md);}
  .review-top{display:flex; align-items:center; gap:12px;}
  .review-avatar{
    width:40px; height:40px; border-radius:50%; background:var(--blue-soft); color:var(--action);
    display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.95rem; flex-shrink:0;
  }
  .review-name{font-size:0.95rem; font-weight:600; color:var(--navy);}
  .review-meta{font-size:0.8rem; color:var(--ink-faint);}
  .review-body{font-size:0.94rem; color:var(--ink-soft); line-height:1.55;}
  .review-chip{
    align-self:flex-start; font-size:0.7rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase;
    background:#fff3d1; color:#8a6b12; border-radius:980px; padding:3px 9px;
  }

  /* ---------- Footer socials ---------- */
  .socials{display:flex; gap:9px; flex-wrap:wrap; margin-top:18px;}
  .social{
    width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    background:rgba(255,255,255,.1); color:#fff;
    transition:background .25s var(--ease), transform .3s var(--ease-out);
  }
  .social:hover{background:rgba(255,255,255,.22); transform:translateY(-3px);}
  .social:active{transform:scale(.92);}
  .social svg{width:17px; height:17px;}
  .social.wa:hover{background:#25d366; color:#06340f;}

  @media (max-width:560px){
    .grid{grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px;}
    .card{padding:12px 12px 16px; border-radius:var(--r-md);}
    .card h3{font-size:0.9rem;}
    .card-price{font-size:0.93rem;}
    .hero-art{min-height:320px;}
    .hero-stats{gap:26px;}
    .search-bar input{font-size:1.2rem;}
    .step{padding:18px;}
    .option-tiles{grid-template-columns:repeat(auto-fit,minmax(110px,1fr));}
    .creditkey, .sticker-section, .features-section, .info-section{padding:60px 0;}
    .catalog-section{padding:56px 0 70px;}
  }
</style>
</head>
<body>

<header id="siteHeader">
<div class="header-inner">
<button class="brand" id="brandHome" aria-label="FM Cellular — home">
<img src="fm-cellular-logo-horizontal.png" alt="FM Cellular"/>
</button>
<nav class="nav-links" id="navLinks" aria-label="Primary"></nav>
<div class="nav-actions">
<button class="icon-btn" id="searchBtn" aria-label="Search" title="Search (press /)">
<svg fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.6" stroke="currentColor" stroke-width="1.9"></circle><path d="M20.6 20.6l-4.4-4.4" stroke="currentColor" stroke-linecap="round" stroke-width="1.9"></path></svg>
</button>
<button class="icon-btn" id="savedBtn" aria-label="Saved devices">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.3l-1.5-1.36C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.5 11.44z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
<span class="badge" id="savedBadge">0</span>
</button>
<button class="icon-btn" id="cartBtn" aria-label="Cart">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 8h11l-1 11.2a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8V6.2A3 3 0 0 1 12 3.2a3 3 0 0 1 3 3V8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
<span class="badge" id="cartBadge">0</span>
</button>
<button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
</button>
</div>
</div>
</header>

<div class="flyout-scrim" id="flyoutScrim"></div>
<div class="flyout" id="flyout" role="region" aria-label="Category menu"><div class="flyout-inner" id="flyoutInner"></div></div>
<div class="mobile-menu" id="mobileMenu"><div id="mobileMenuInner"></div></div>

<div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="Search">
<div class="search-overlay-scrim" id="searchScrim"></div>
<div class="search-overlay-inner">
<div class="search-bar">
<svg fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.6" stroke="currentColor" stroke-width="1.9"></circle><path d="M20.6 20.6l-4.4-4.4" stroke="currentColor" stroke-linecap="round" stroke-width="1.9"></path></svg>
<input id="globalSearch" type="search" placeholder="Search everything — devices, prices, policies" aria-label="Search the site" autocomplete="off"/>
<button class="search-close" id="searchClose">Cancel</button>
</div>
<div class="search-results" id="searchResults"></div>
</div>
</div>

<div id="homeSections">
<section class="hero-section" id="home">
<div class="wrap">
<div class="hero-content">
<div class="hero-text">
<div class="hero-eyebrow" id="heroEyebrow"><span class="dot"></span> Open box &amp; certified pre-owned</div>
<h1 id="heroHeadline">Retail-ready devices at <em>wholesale prices.</em></h1>
<p id="heroSub">Sourced direct from the three largest US carriers and leading insurance partners. Inspected, graded, data-wiped, and unlocked — priced well below retail.</p>
<div class="hero-actions">
<a class="btn btn-primary btn-lg" href="#catalog">Browse inventory</a>
<a class="btn btn-secondary btn-lg" href="https://wa.me/17135532222" rel="noopener" target="_blank">Chat on WhatsApp</a>
</div>
<div class="hero-stats">
<div><div class="num" id="stat-count">–</div><div class="lbl">Models listed</div></div>
<div><div class="num" id="stat-variants">–</div><div class="lbl">Configurations</div></div>
<div><div class="num">Unlocked</div><div class="lbl">Every device</div></div>
</div>
</div>
<div class="hero-art" id="heroArt">
<span class="hero-phone left" id="heroLeft"><img class="layer" alt=""/><img class="layer" alt=""/></span>
<span class="hero-phone right" id="heroRight"><img class="layer" alt=""/><img class="layer" alt=""/></span>
<span class="hero-phone lead" id="heroLead"><img class="layer" alt="Featured device"/><img class="layer" alt=""/></span>
</div>
</div>
</div>
</section>

<section class="features-section">
<div class="wrap">
<div class="section-head reveal">
<h2 class="section-title">Built for people who buy in volume.</h2>
<p class="section-sub">Live stock, real grading, and a team that answers.</p>
</div>
<div class="value-grid reveal">
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">inventory</span></div>
<h3>Live stocklist</h3>
<p>The full catalog online 24/7, updated straight from our inventory sheet.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">shopping_cart_checkout</span></div>
<h3>On-demand buying</h3>
<p>Buy at listed prices or send an offer — every listing opens a chat pre-filled with the exact config.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">local_shipping</span></div>
<h3>Next-day shipping</h3>
<p>No waiting weeks. In most cases orders ship the next business day.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">tune</span></div>
<h3>Browse by attribute</h3>
<p>Grades and cosmetic conditions segmented by fully functional, functional fail, and level of damage.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">payments</span></div>
<h3>Flexible payment</h3>
<p>Wire, ACH, and PayPal, plus Credit Key net terms for approved business buyers.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">verified</span></div>
<h3>Reliable source</h3>
<p>150k–200k devices processed monthly from the top three US carriers and other vetted sources.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">build</span></div>
<h3>Ready for repair</h3>
<p>Running a repair shop? We stock screen- and camera-fail units built for exactly that.</p>
</div>
<div class="value-card">
<div class="value-icon"><span class="material-symbols-outlined">support_agent</span></div>
<h3>After-sale support</h3>
<p>A dedicated sales and support team on call, email, or WhatsApp.</p>
</div>
</div>
</div>
</section>

<section class="creditkey">
<div class="wrap">
<div class="ck-panel reveal">
<div class="ck-copy">
<span class="eyebrow-label">Financing</span>
<h2>Buy now, pay on your terms.</h2>
<p>Credit Key gives approved business buyers a real line of credit at checkout — so you can take the stock now and pay later, without tying up working capital.</p>
<div class="ck-points">
<span class="ck-point"><span class="material-symbols-outlined">bolt</span> Decision in minutes</span>
<span class="ck-point"><span class="material-symbols-outlined">event_available</span> Net 30 / 60 / 90</span>
<span class="ck-point"><span class="material-symbols-outlined">shield_person</span> No hard credit pull</span>
</div>
<div class="ck-actions">
<a class="btn btn-white btn-lg" href="https://wa.me/17135532222" rel="noopener" target="_blank">Apply now</a>
<button class="btn btn-ghost-light btn-lg" data-jump="faq">How it works</button>
</div>
</div>
<div class="ck-visual">
<div class="ck-card">
<div class="ck-card-top">
<div class="ck-chip"></div>
<div class="ck-brand">CREDIT KEY</div>
</div>
<div><div class="ck-terms">Net 60<small>Approved business terms</small></div></div>
<div class="ck-card-bottom"><span>FM CELLULAR</span><span>WHOLESALE</span></div>
</div>
</div>
<div class="ck-stats">
<div class="ck-stat"><div class="n">Minutes</div><div class="l">To a credit decision</div></div>
<div class="ck-stat"><div class="n">Up to 90</div><div class="l">Days to pay</div></div>
<div class="ck-stat"><div class="n">$0</div><div class="l">Cost to apply</div></div>
<div class="ck-stat"><div class="n">Soft pull</div><div class="l">Score stays intact</div></div>
</div>
</div>
</div>
</section>

<section class="sticker-section">
<div class="wrap">
<div class="sticker-layout">
<div class="sticker-badge-wrap reveal">
<svg class="sticker-badge" viewBox="0 0 240 240" role="img" aria-label="Purple Sticker Guarantee seal">
<defs>
<linearGradient id="sealGrad" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#9b5de5"/><stop offset="100%" stop-color="#6531c4"/>
</linearGradient>
<path id="sealArc" d="M120 120 m-84 0 a84 84 0 1 1 168 0 a84 84 0 1 1 -168 0" fill="none"/>
</defs>
<circle cx="120" cy="120" r="112" fill="url(#sealGrad)"/>
<circle cx="120" cy="120" r="103" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>
<circle cx="120" cy="120" r="88" fill="rgba(255,255,255,.10)"/>
<text font-size="12.5" font-weight="700" letter-spacing="2" fill="#fff" font-family="-apple-system, Inter, sans-serif">
<textPath href="#sealArc" startOffset="25%" text-anchor="middle">PURPLE STICKER GUARANTEE</textPath>
</text>
<path d="M120 66l11.6 7.4 13.7-1.6 5.3 12.7 11.9 7-2.9 13.5 6.5 12.2-9.6 9.9-1.4 13.8-13.6 2.6-9.5 10-12-6.8-12 6.8-9.5-10-13.6-2.6-1.4-13.8-9.6-9.9 6.5-12.2-2.9-13.5 11.9-7 5.3-12.7 13.7 1.6z" fill="#fff" opacity=".16"/>
<path d="M100 121l14 14 27-30" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<text x="120" y="176" text-anchor="middle" font-size="14" font-weight="700" letter-spacing="1.4" fill="#fff" font-family="-apple-system, Inter, sans-serif">VERIFIED</text>
</svg>
</div>
<div class="reveal">
<span class="eyebrow-label">Our grading standard</span>
<h2 class="section-title">Recognize the purple sticker.</h2>
<p class="section-sub">If it carries the sticker, it cleared every check below. No exceptions, no surprises when the box lands.</p>
<div class="checks">
<div class="check">
<div class="check-icon"><span class="material-symbols-outlined">visibility</span></div>
<div><h4>Cosmetic grading</h4><p>Graded under consistent lighting to a fixed scale, so an A+ means the same thing every time.</p></div>
</div>
<div class="check">
<div class="check-icon"><span class="material-symbols-outlined">lock_reset</span></div>
<div><h4>Certified data wipe</h4><p>Every device is wiped and activation-locked accounts cleared before it's listed.</p></div>
</div>
<div class="check">
<div class="check-icon"><span class="material-symbols-outlined">checklist</span></div>
<div><h4>Full function test</h4><p>Screen, cameras, battery health, speakers, mics, charging, and radios — all bench-tested.</p></div>
</div>
<div class="check">
<div class="check-icon"><span class="material-symbols-outlined">sim_card</span></div>
<div><h4>Carrier unlocked</h4><p>Confirmed clean IMEI and unlocked for any compatible network, day one.</p></div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>

<section class="catalog-section" id="catalog">
<div class="wrap">
<div class="recent-section" id="recentSection" style="display:none;">
<div class="recent-head">
<h3>Recently viewed</h3>
<button class="recent-clear" id="recentClear">Clear</button>
</div>
<div class="recent-rail" id="recentRail"></div>
</div>
<div class="section-head left">
<h2 class="section-title">Live marketplace</h2>
<p class="section-sub">Every device we have listed right now, straight from inventory.</p>
</div>
<div class="catalog-layout">
<aside class="category-sidebar">
<div class="sidebar-title">Categories</div>
<div class="category-scroll" id="categoryBar"></div>
</aside>
<div class="catalog-main">
<div class="catalog-head-area">
<div>
<h3 class="catalog-title" id="catalogTitle">All devices</h3>
<div class="result-count" id="resultCount"></div>
</div>
<div class="catalog-tools">
<button class="clear-search" id="clearSearchBtn">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
<span id="clearSearchLabel">Clear</span>
</button>
<button class="btn btn-secondary" id="exportBtn">Export stock</button>
</div>
</div>
<div class="grid" id="grid"></div>
</div>
</div>
</div>
</section>

<section class="detail-page" id="detailPage" style="display:none;">
<div class="wrap">
<div class="detail-nav">
<button class="back-btn" id="detailBack">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Back
</button>
<nav class="breadcrumb" id="detailBreadcrumb"></nav>
</div>
<div class="detail-head">
<div>
<div class="detail-sku" id="detailSku"></div>
<h1 class="detail-title" id="detailTitle"></h1>
</div>
<button class="detail-save" id="detailSave">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.3l-1.5-1.36C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.5 11.44z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
<span id="detailSaveLabel">Save</span>
</button>
</div>
<div class="config-layout">
<div class="config-visual">
<div class="visual-stage" id="detailImage"><div class="visual-glow"></div></div>
<div class="visual-caption">
<span class="vc-main" id="vcMain"></span>
<span class="vc-sub" id="vcSub"></span>
</div>
<ol class="step-rail" id="stepRail"></ol>
</div>
<div class="config-steps" id="configSteps"></div>
</div>
</div>
</section>

<section class="page-section" id="cartPage" style="display:none;">
<div class="wrap">
<div class="detail-nav">
<button class="back-btn" data-backto="catalog">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Continue shopping
</button>
</div>
<div class="page-head">
<h1>Your cart</h1>
<p id="cartIntro">Review your configuration, then send the order straight to our team.</p>
</div>
<div id="cartBody"></div>
</div>
</section>

<section class="page-section" id="aboutPage" style="display:none;">
<div class="wrap">
<div class="detail-nav">
<button class="back-btn" data-backto="catalog">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Back to shop
</button>
</div>
<div class="about-hero">
<span class="eyebrow-label" style="color:#7fd4f5;">About FM Cellular</span>
<h1>Family owned. Thirty years in.</h1>
<p>We started before smartphones existed, and we're still here for the same reason: people would rather buy from someone who picks up the phone. Every device we list is inspected by people who have been doing this for a lifetime.</p>
<div class="about-stats">
<div class="about-stat"><div class="n">30+</div><div class="l">Years in business</div></div>
<div class="about-stat"><div class="n">150k+</div><div class="l">Devices processed monthly</div></div>
<div class="about-stat"><div class="n">3</div><div class="l">Major US carriers sourced</div></div>
<div class="about-stat"><div class="n">100%</div><div class="l">Unlocked &amp; data-wiped</div></div>
</div>
</div>
<div class="about-grid">
<div class="about-card">
<div class="value-icon"><span class="material-symbols-outlined">handshake</span></div>
<h3>We sell what we'd buy</h3>
<p>If a device wouldn't pass for one of our own, it doesn't get the sticker. Grading is conservative on purpose — we would rather under-promise than argue about a scratch later.</p>
</div>
<div class="about-card">
<div class="value-icon"><span class="material-symbols-outlined">inventory_2</span></div>
<h3>Sourced at the top</h3>
<p>Our stock comes directly from the three largest US carriers and major insurance partners — not from brokers reselling the same pallets three times over.</p>
</div>
<div class="about-card">
<div class="value-icon"><span class="material-symbols-outlined">forum</span></div>
<h3>A real person answers</h3>
<p>No ticket queue. Message us on WhatsApp and you get someone who can actually check a shelf, confirm a grade, and hold a unit for you.</p>
</div>
</div>
<h2 class="section-title" style="font-size:1.6rem; margin-bottom:20px;">How a device reaches you</h2>
<div class="timeline">
<div class="tl-item"><div class="tl-dot">1</div><div><h4>Intake &amp; verification</h4><p>Every unit is checked against carrier and insurance records for a clean IMEI and clear financial status before it enters our inventory.</p></div></div>
<div class="tl-item"><div class="tl-dot">2</div><div><h4>Certified data wipe</h4><p>Devices are wiped to standard and activation-lock accounts are cleared. Nothing from a previous owner ever reaches you.</p></div></div>
<div class="tl-item"><div class="tl-dot">3</div><div><h4>Functional bench test</h4><p>Screen, cameras, battery health, speakers, microphones, charging, Wi-Fi, cellular and Bluetooth are all tested and logged.</p></div></div>
<div class="tl-item"><div class="tl-dot">4</div><div><h4>Cosmetic grading</h4><p>Graded under consistent lighting against a fixed scale, so an A+ from us in January means the same thing in December.</p></div></div>
<div class="tl-item"><div class="tl-dot">5</div><div><h4>Purple sticker &amp; ship</h4><p>Passing units get the sticker, get listed, and in most cases ship the next business day with tracking.</p></div></div>
</div>
<div style="margin-top:34px; display:flex; gap:12px; flex-wrap:wrap;">
<a class="btn btn-primary btn-lg" href="https://wa.me/17135532222" rel="noopener" target="_blank">Talk to our team</a>
<button class="btn btn-secondary btn-lg" data-goview="catalog">Browse inventory</button>
</div>
</div>
</section>

<section class="page-section" id="reviewsPage" style="display:none;">
<div class="wrap">
<div class="detail-nav">
<button class="back-btn" data-backto="catalog">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Back to shop
</button>
</div>
<div class="page-head">
<h1>Customer reviews</h1>
<p>What buyers say after the box lands. Every review here comes from a verified order.</p>
</div>
<div id="reviewsBody"></div>
</div>
</section>

<section class="info-section" id="info">
<div class="wrap">
<div class="section-head">
<h2 class="section-title">Good to know.</h2>
</div>
<div class="info-list">
<details class="terms-block" id="about">
<summary>Our story — family owned for 30+ years</summary>
<div class="terms-body">
<p>FM Cellular is family-owned and operated, and we've been serving customers for more than 30 years. Technology has changed a lot since we started — the way we do business hasn't. Every device is inspected by people who've been doing this for a lifetime, and every customer gets treated like they're part of the family, because to us, that's what you become.</p>
<p>We source directly from the top US mobile carriers and major insurance companies, which is how we keep wholesale pricing on retail-ready stock. Everything is graded, data-wiped, and function-tested before it's listed.</p>
</div>
</details>
<details class="terms-block" id="faq">
<summary>Frequently asked questions</summary>
<div class="terms-body">
<p><strong>What does "Open Box" mean?</strong> The device is unused or very lightly used, typically without the original retail seal — often a returned or display unit. We inspect every one before listing. "Open Box A+" means it passed our full inspection with no functional issues and only very light, if any, cosmetic wear.</p>
<p><strong>Are these devices unlocked?</strong> Yes — every device we sell is carrier-unlocked, so it works with any compatible carrier and SIM. If you're unsure about your specific plan, message us before buying and we'll confirm.</p>
<p><strong>How does Credit Key work?</strong> You apply once through us, get a decision in minutes with only a soft credit check, and if approved you can place orders on net 30, 60, or 90 day terms. There's no cost to apply.</p>
<p><strong>How do I actually buy something?</strong> Configure the device on its product page, then tap "Message to buy" — it opens a chat with the exact model, storage, color, and condition already filled in. We'll confirm availability, walk you through payment, and set up shipping or pickup.</p>
<p><strong>What payment methods do you accept?</strong> Wire, ACH, and PayPal, plus Credit Key for approved business buyers who want net terms.</p>
<p><strong>Do you offer a warranty?</strong> Yes, a limited warranty covering functional defects is included — the exact length is confirmed at time of sale since it varies by device and condition. See our Terms &amp; Conditions for details.</p>
<p><strong>Can I return a device?</strong> Yes, within the return window we confirm at time of sale, as long as it comes back in the condition you received it with all original accessories. Message us if something isn't as described.</p>
<p><strong>Do you ship nationwide?</strong> Yes. Most orders ship the next business day, and we'll send tracking as soon as it leaves.</p>
<p><strong>Why is the price sometimes "Contact for price"?</strong> That combination's price depends on current stock and condition. Message us and we'll give you a real number right away.</p>
<p>Don't see your question here? Message us on WhatsApp — we're quick to respond.</p>
</div>
</details>
<details class="terms-block" id="blog">
<summary>Blog</summary>
<div class="terms-body">
<p>We don't have any posts published yet — check back soon, or message us on WhatsApp if there's something specific you'd like to know (buying tips, device comparisons, grading explainers, trade-in advice) and we may turn it into a post.</p>
</div>
</details>
<details class="terms-block" id="warranty">
<summary>Warranty policy</summary>
<div class="terms-body">
<p><strong>Coverage period.</strong> Eligible devices carry a <strong>30-day limited warranty</strong> from the date of delivery, covering functional defects present at the time of sale. Eligibility is stated on the invoice for every line item. Items sold as <em>functional fail</em>, <em>damaged</em>, <em>for parts</em>, <em>as-is</em>, or in any repair-stock grade are <strong>sold without warranty</strong> and are final sale.</p>
<p><strong>What is covered.</strong> Defects in the device's core functions that were present when it shipped — for example a display that fails, a camera that will not focus or open, speakers or microphones that do not work, charging failure, or a cellular, Wi-Fi or Bluetooth radio that does not connect. Battery health is covered only where the listing stated a specific minimum and the delivered unit falls below it.</p>
<p><strong>What voids the warranty — read carefully.</strong> This warranty is <strong>void immediately if the device has sustained any physical damage or any liquid or water damage after delivery</strong>. This includes cracked or chipped glass, a bent or dented frame, crushed or pried housing, damaged charging ports, and any indication of liquid ingress. Devices contain liquid contact indicators; if any indicator is triggered, the claim is denied. The warranty is also void if the device has been opened, repaired, or modified by anyone other than us, if parts have been substituted, if the IMEI or serial has been altered or made unreadable, or if the device has been re-locked to a carrier or account after delivery.</p>
<p><strong>What is never covered.</strong> Accidental damage, drops, liquid exposure, normal cosmetic wear, scratches or marks consistent with the grade purchased, battery capacity loss through normal use, software or iOS/Android issues, third-party accessories, loss or theft, and any damage caused by misuse or by unauthorized repair.</p>
<p><strong>Making a claim.</strong> Contact us within the 30-day window with your invoice number, the device IMEI, and a clear description plus photos or a short video of the fault. We will confirm next steps in writing. Do not send a device back without written return authorization — unauthorized returns may be refused.</p>
<p><strong>Our remedy.</strong> If a claim is approved, we will at our discretion repair the device, replace it with an equivalent unit of the same model, storage and grade, or refund the purchase price of that unit. Replacement is subject to stock; where no equivalent is available a refund is issued. Shipping for approved warranty claims is covered by us in both directions.</p>
<p><strong>Denied claims.</strong> If an inspection shows physical or liquid damage, unauthorized repair, or a fault outside the covered list, the claim is denied and the device is returned to you at your cost. We will send you the inspection findings and photos.</p>
<p><strong>Relationship to manufacturer warranty.</strong> This is a seller warranty from FM Cellular. It is separate from, and does not extend or replace, any remaining manufacturer warranty. Most open-box and pre-owned devices carry no remaining manufacturer coverage.</p>
</div>
</details>
<details class="terms-block" id="returns">
<summary>Returns &amp; refunds</summary>
<div class="terms-body">
<p><strong>Return window.</strong> Warranty-eligible devices may be returned within <strong>30 days of delivery</strong> if the device is not as described or arrives with a covered functional defect. Items sold as functional fail, damaged, for parts, as-is, or in repair-stock grades are <strong>final sale and non-returnable</strong>.</p>
<p><strong>Condition on return.</strong> Devices must come back in the same condition and grade they were received, with all included accessories and packaging. A device returned with new physical damage, liquid damage, or missing items will be refused or assessed a deduction reflecting the loss in value.</p>
<p><strong>Before you send anything back.</strong> Request a return authorization first. Sign out of all accounts and turn off activation lock (Find My iPhone / Google account lock) before shipping. A device that arrives still account-locked cannot be inspected, and the return clock pauses until it is released.</p>
<p><strong>Restocking.</strong> Returns for a covered defect or a not-as-described device carry <strong>no restocking fee</strong>. Buyer's-remorse returns, where we accept them at our discretion, may carry a restocking fee of up to 15% and outbound shipping is not refunded.</p>
<p><strong>Refund timing.</strong> Approved refunds are issued to the original payment method within 5 business days of the returned device passing inspection. Wire and ACH refunds may take additional time to settle depending on your bank.</p>
<p><strong>Shortages and damage in transit.</strong> Inspect your shipment on arrival. Report any shortage, wrong item, or shipping damage within <strong>48 hours of delivery</strong> with photos of the packaging and contents so we can file a carrier claim. Reports after that window may not be recoverable.</p>
</div>
</details>
<details class="terms-block" id="shipping">
<summary>Shipping &amp; delivery</summary>
<div class="terms-body">
<p><strong>Processing.</strong> Orders confirmed and paid before our daily cut-off ship the next business day in most cases. Large or mixed-grade orders may take an extra day to pick and verify. We will tell you if your order needs longer.</p>
<p><strong>Tracking.</strong> Tracking is sent as soon as the shipment leaves. Every order ships with signature confirmation and insurance appropriate to its value.</p>
<p><strong>Title and risk.</strong> Title and risk of loss pass to you on delivery by the carrier. If a package is lost or damaged in transit, contact us immediately and we will open a carrier claim on your behalf.</p>
<p><strong>Addresses.</strong> We ship to the address you confirm at time of order. Address changes after a label is created may not be possible. We do not ship to freight forwarders without prior written agreement.</p>
<p><strong>Local pickup.</strong> Pickup can be arranged for local buyers by appointment. Bring the order number and photo ID matching the purchaser.</p>
</div>
</details>
<details class="terms-block" id="payments">
<summary>Payment terms</summary>
<div class="terms-body">
<p><strong>Accepted methods.</strong> Wire transfer, ACH, and PayPal. Approved business buyers may use Credit Key for net 30, 60, or 90 day terms, subject to Credit Key's own approval and agreement.</p>
<p><strong>Order confirmation.</strong> Inventory is not held until payment is confirmed or Credit Key terms are approved. Quotes are valid for 24 hours; stock and pricing move quickly.</p>
<p><strong>Taxes.</strong> Listed prices exclude sales tax. Tax is applied where required by law. Resellers must provide a valid resale certificate before invoicing to be billed tax-exempt.</p>
<p><strong>Chargebacks.</strong> Please contact us before disputing a charge — nearly every issue is faster to resolve directly. Chargebacks filed without first contacting us may result in the account being placed on prepay-only terms.</p>
</div>
</details>
<details class="terms-block" id="grading">
<summary>Grading standards</summary>
<div class="terms-body">
<p><strong>New.</strong> Sealed and unused in original manufacturer packaging.</p>
<p><strong>Open Box A+.</strong> Unused or display stock, fully functional, with no or barely perceptible cosmetic wear. Packaging may be original or generic.</p>
<p><strong>Open Box.</strong> Unused or lightly used, fully functional, with light cosmetic wear possible on the frame or back.</p>
<p><strong>Excellent.</strong> Fully functional with light visible wear — fine scratches or minor marks that do not affect use.</p>
<p><strong>Good.</strong> Fully functional with clearly visible cosmetic wear, including scratches or small dings. Screen is free of cracks.</p>
<p><strong>Functional fail / repair stock.</strong> Devices with a disclosed fault such as a failed screen, camera, or battery, sold specifically for repair. These are <strong>sold as-is with no warranty and are final sale</strong>.</p>
<p><strong>What grading does not mean.</strong> A grade describes cosmetic condition and disclosed functional status. It is not a guarantee of remaining battery cycles or of a specific accessory being included. Accessories are listed per item; assume no charger or cable unless stated.</p>
</div>
</details>
<details class="terms-block" id="privacy">
<summary>Privacy &amp; data</summary>
<div class="terms-body">
<p><strong>What we collect.</strong> Only what we need to fill your order: your name, contact details, shipping address, and order history. We do not sell or rent customer information to anyone.</p>
<p><strong>Payment data.</strong> We do not store full card or bank numbers. Payments are handled by our payment providers under their own security standards.</p>
<p><strong>Device data.</strong> Every device is wiped to standard before listing. If you return a device, wipe it and remove all account locks first — we are not responsible for data left on a returned unit.</p>
<p><strong>This website.</strong> Saved devices, recently viewed items, and your cart are stored in your own browser, not on our servers. Clearing your browser data clears them. The catalog loads pricing from our inventory sheet; no personal information is sent when it does.</p>
<p><strong>Contact.</strong> To ask what we hold about you or to request deletion, message us on WhatsApp or call and we will handle it.</p>
</div>
</details>
<details class="terms-block" id="policies">
<summary>Terms &amp; conditions</summary>
<div class="terms-body">
<p><strong>Who these terms cover.</strong> These terms apply to every order placed with FM Cellular, LLC through this site, WhatsApp, or by phone. Placing an order means you accept them.</p>
<p><strong>Device condition.</strong> All devices are inspected before listing and sold as described against the grading standards above. Cosmetic condition may vary slightly within a grade and photographs are representative of the model and finish, not of the exact unit. We disclose known issues at the time of sale — ask for specifics on any listing before you buy.</p>
<p><strong>Pricing.</strong> Prices update from our live inventory and may change without notice. MSRP figures are manufacturer or market reference prices shown for comparison only and are not a guarantee of savings on any unit. Obvious pricing errors may be corrected before an order is confirmed.</p>
<p><strong>Availability.</strong> Inventory moves quickly and listing a device is not a guarantee of stock. If a unit sells before your order is confirmed we will offer the nearest equivalent or refund any payment in full.</p>
<p><strong>Quantities and business buyers.</strong> We may limit quantities per order or per account. Wholesale pricing and terms are for business buyers and may require documentation.</p>
<p><strong>Unlocked devices.</strong> "Unlocked" means the device is not tied to a specific carrier. It does not guarantee compatibility with every network, band, or plan. Confirm compatibility with your carrier before purchase if you are unsure — network incompatibility is not a covered defect.</p>
<p><strong>Warranty and returns.</strong> Governed by the Warranty and Returns policies above, which form part of these terms. In short: 30 days on eligible items, void on physical or liquid damage, and no warranty on repair-grade stock.</p>
<p><strong>Acceptable use of this site.</strong> Do not scrape, republish, or resell our catalog data or photography without written permission.</p>
<p><strong>Limitation of liability.</strong> To the maximum extent permitted by law, FM Cellular is not liable for indirect, incidental, special, or consequential damages, including lost profits, lost data, or business interruption arising from the purchase or use of a device. Our total liability for any claim is limited to the amount you paid for the unit in question.</p>
<p><strong>Governing law.</strong> These terms are governed by the laws of the State of Texas, and any dispute will be handled in the courts serving Harris County, Texas.</p>
<p><strong>Changes.</strong> We may update these terms as our practices evolve. The version posted at the time of your order applies to that order.</p>
<p>Questions? Message us on WhatsApp before you buy — we would rather answer up front than sort it out afterward.</p>
</div>
</details>
</div>
</div>
</section>

<footer id="contact">
<div class="footer-inner">
<div class="footer-top">
<div class="footer-col">
<img class="footer-logo" src="fm-cellular-logo-horizontal.png" alt="FM Cellular"/>
<p class="footer-blurb">Open-box and certified pre-owned devices — inspected, graded, and unlocked. Message us and we'll walk you through condition, availability, and shipping.</p>
<address class="footer-address"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.7"/></svg><span><a href="https://www.google.com/maps/search/?api=1&query=7350+Harwin+Dr+Suite+316+Houston+TX+77036" rel="noopener" target="_blank">7350 Harwin Drive, Suite 316<br/>Houston, TX 77036</a></span></address>
<!-- Social links: replace each href="#" with your real profile URL. -->
<div class="socials">
<a class="social wa" href="https://wa.me/17135532222" rel="noopener" target="_blank" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36c1.36.72 2.9 1.13 4.53 1.13h.01c5.46 0 9.9-4.45 9.9-9.91C21.87 6.45 17.5 2 12.04 2z"/></svg></a>
<a class="social" href="tel:+18328838888" aria-label="Call us"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg></a>
<a class="social" href="#" data-social="instagram" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg></a>
<a class="social" href="#" data-social="facebook" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg></a>
<a class="social" href="#" data-social="tiktok" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.1 1.7 3.5 3.8 3.7v2.6c-1.4.1-2.7-.3-3.9-1v5.9c0 3.6-2.6 6.1-6 6.1-3 0-5.4-2.3-5.4-5.4 0-3.3 2.7-5.7 6.2-5.3v2.8c-.4-.1-.8-.2-1.2-.2-1.5 0-2.6 1.1-2.6 2.6 0 1.5 1.1 2.6 2.6 2.6 1.6 0 2.7-1.1 2.7-2.9V3z"/></svg></a>
<a class="social" href="#" data-social="x" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.7 21h-5.9l-4.3-5.6L6.4 21H3.3l7-8L2.6 3h6l3.9 5.2zm-1 16h1.7L8.1 4.7H6.3z"/></svg></a>
<a class="social" href="#" data-social="youtube" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C18.3 5.2 12 5.2 12 5.2s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.7C22 15.2 22 12 22 12zM10 15V9l5.2 3z"/></svg></a>
</div>
</div>
<div class="footer-col">
<h4>Marketplace</h4>
<ul>
<li><a data-goview="catalog">Live stock</a></li>
<li><a data-jump="grading">Grading specs</a></li>
<li><a data-goview="cart">Your cart</a></li>
<li><a href="https://wa.me/17135532222" rel="noopener" target="_blank">Credit Key</a></li>
</ul>
</div>
<div class="footer-col">
<h4>Shop</h4>
<ul id="footerCats"></ul>
</div>
<div class="footer-col">
<h4>Support</h4>
<ul>
<li><a data-goview="about">About us</a></li>
<li><a data-goview="reviews">Reviews</a></li>
<li><a data-jump="faq">FAQ</a></li>
<li><a data-jump="warranty">Warranty</a></li>
<li><a data-jump="returns">Returns</a></li>
<li><a data-jump="shipping">Shipping</a></li>
<li><a data-jump="privacy">Privacy</a></li>
<li><a data-jump="policies">Terms &amp; conditions</a></li>
</ul>
</div>
</div>
<div class="contact-grid">
<div class="contact-card">
<div>
<div class="contact-role">Sales &amp; wholesale</div>
<div class="contact-name">WhatsApp</div>
<div class="contact-detail">(713) 553-2222</div>
</div>
<div class="contact-actions">
<a class="contact-btn btn-wa" href="https://wa.me/17135532222" rel="noopener" target="_blank">WhatsApp</a>
</div>
</div>
<div class="contact-card">
<div>
<div class="contact-role">Account support</div>
<div class="contact-name">Call us</div>
<div class="contact-detail">(832) 883-8888</div>
</div>
<div class="contact-actions">
<a class="contact-btn btn-email" href="tel:+18328838888">Call</a>
</div>
</div>
<div class="contact-card">
<div>
<div class="contact-role">General inquiries</div>
<div class="contact-name">Message us</div>
<div class="contact-detail">Fastest reply on WhatsApp</div>
</div>
<div class="contact-actions">
<a class="contact-btn btn-wa" href="https://wa.me/17135532222" rel="noopener" target="_blank">WhatsApp</a>
<a class="contact-btn btn-email" href="tel:+18328838888">Call</a>
</div>
</div>
<div class="contact-card">
<div>
<div class="contact-role">Visit our showroom</div>
<div class="contact-name">Houston, TX</div>
<div class="contact-detail">7350 Harwin Dr, Suite 316, 77036</div>
</div>
<div class="contact-actions">
<a class="contact-btn btn-email" href="https://www.google.com/maps/search/?api=1&query=7350+Harwin+Dr+Suite+316+Houston+TX+77036" rel="noopener" target="_blank">Directions</a>
</div>
</div>
<div class="contact-card">
<div>
<div class="contact-role">Hours</div>
<div class="contact-name">Mon – Sat</div>
<div class="contact-detail">Orders ship next business day</div>
</div>
<div class="contact-actions">
<a class="contact-btn btn-email" data-jump="catalog">Browse stock</a>
</div>
</div>
</div>
<div class="foot-bottom">
<span>© 2026 FM Cellular, LLC. All devices sold as described.</span>
<span>Prices update from our live inventory sheet.</span>
</div>
</div>
</footer>

<div class="added-toast" id="toast" role="status" aria-live="polite">
<span class="material-symbols-outlined">check_circle</span>
<span id="toastText">Added to cart</span>
<button id="toastAction">View cart</button>
</div>

<button class="to-top" id="toTop" aria-label="Back to top">
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V6M6 12l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</button>

<script>
/* ============================================================
   FM CELLULAR — catalog engine
   Snapshot inventory below is the offline fallback. On load the
   page tries the live Apps Script endpoint and replaces it.
   ============================================================ */

const SNAPSHOT_PRODUCTS = [{"category":"iPhone","model":"iPhone 17 Pro Max","variants":[{"storage":"256GB","condition":"Open Box","price":1170,"msrp":1189.67},{"storage":"512GB","condition":"New","price":1350,"msrp":1514.42},{"storage":"512GB","condition":"Open Box","price":1290,"msrp":1384.52},{"storage":"1TB","condition":"New","price":1590,"msrp":1730.92},{"storage":"1TB","condition":"Open Box","price":1450,"msrp":1579.37},{"storage":"2TB","condition":"New","price":null,"msrp":1947.42},{"storage":"2TB","condition":"Open Box","price":null,"msrp":1785.04}]},{"category":"iPhone","model":"iPhone 17 Pro","variants":[{"storage":"256GB","condition":"New","price":1070,"msrp":1189.67},{"storage":"256GB","condition":"Open Box","price":1030,"msrp":1081.42},{"storage":"512GB","condition":"New","price":null,"msrp":1406.17},{"storage":"512GB","condition":"Open Box","price":null,"msrp":1276.27},{"storage":"1TB","condition":"New","price":null,"msrp":1622.67},{"storage":"1TB","condition":"Open Box","price":null,"msrp":1471.12}]},{"category":"iPhone","model":"iPhone 17 Air / Slim","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":886.57},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":983.99},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1178.84}]},{"category":"iPhone","model":"iPhone 17","variants":[{"storage":"128GB","condition":"New","price":null,"msrp":864.92},{"storage":"128GB","condition":"Open Box","price":null,"msrp":789.14},{"storage":"256GB","condition":"New","price":null,"msrp":973.17},{"storage":"256GB","condition":"Open Box","price":null,"msrp":886.57},{"storage":"512GB","condition":"New","price":null,"msrp":1189.67},{"storage":"512GB","condition":"Open Box","price":null,"msrp":1081.42}]},{"category":"iPhone","model":"iPhone 16 Pro Max","variants":[{"storage":"256GB","condition":"Open Box A+","price":790,"msrp":1027.29},{"storage":"512GB","condition":"Open Box A+","price":850,"msrp":1135.54},{"storage":"1TB","condition":"Open Box A+","price":925,"msrp":1287.09}]},{"category":"iPhone","model":"iPhone 16 Pro","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":864.92},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":951.52},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1059.77},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":1189.67}]},{"category":"iPhone","model":"iPhone 16 Plus","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":735.02},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":810.79},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":919.04}]},{"category":"iPhone","model":"iPhone 16","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":648.42},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":735.02},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":843.27}]},{"category":"iPhone","model":"iPhone 16e","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":561.82},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":637.59},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":778.32}]},{"category":"iPhone","model":"iPhone 15 Pro Max","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":854.09},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":940.69},{"storage":"1TB","condition":"Open Box A+","price":660,"msrp":1048.94}]},{"category":"iPhone","model":"iPhone 15 Pro","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":724.19},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":799.97},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":897.39},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":994.82}]},{"category":"iPhone","model":"iPhone 15 Plus","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":605.12},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":670.07},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":767.49}]},{"category":"iPhone","model":"iPhone 15","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":540.17},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":605.12},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":702.54}]},{"category":"iPhone","model":"iPhone 14 Pro Max","variants":[{"storage":"128GB","condition":"Open Box A+","price":490,"msrp":637.59},{"storage":"256GB","condition":"Open Box A+","price":550,"msrp":691.72},{"storage":"512GB","condition":"Open Box A+","price":625,"msrp":756.67},{"storage":"1TB","condition":"Open Box A+","price":660,"msrp":832.44}]},{"category":"iPhone","model":"iPhone 14 Pro","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":561.82},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":615.94},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":680.89},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":756.67}]},{"category":"iPhone","model":"iPhone 14 Plus","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":464.39},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":518.52},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":583.47}]},{"category":"iPhone","model":"iPhone 14","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":421.09},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":464.39}]},{"category":"iPhone","model":"iPhone 13 Pro Max","variants":[{"storage":"128GB","condition":"Open Box A+","price":390,"msrp":518.52},{"storage":"256GB","condition":"Open Box A+","price":440,"msrp":561.82},{"storage":"512GB","condition":"Open Box A+","price":490,"msrp":615.94},{"storage":"1TB","condition":"Open Box A+","price":540,"msrp":680.89}]},{"category":"iPhone","model":"iPhone 13 Pro","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":442.74},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":486.04},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":540.17},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":594.29}]},{"category":"iPhone","model":"iPhone 12 Pro Max","variants":[{"storage":"128GB","condition":"Open Box A+","price":325,"msrp":399.44},{"storage":"256GB","condition":"Open Box A+","price":350,"msrp":442.74},{"storage":"512GB","condition":"Open Box A+","price":390,"msrp":496.87}]},{"category":"iPhone","model":"iPhone 12 Pro","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":323.67},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":356.14},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":410.27}]},{"category":"iPhone","model":"iPhone 11 Pro Max","variants":[{"storage":"64GB","condition":"Open Box A+","price":275,"msrp":291.19},{"storage":"256GB","condition":"Open Box A+","price":325,"msrp":323.67},{"storage":"512GB","condition":"Open Box A+","price":350,"msrp":366.97}]},{"category":"iPhone","model":"iPhone 11 Pro","variants":[{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":247.89},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":280.37},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":312.84}]},{"category":"iPhone","model":"iPhone XS Max","variants":[{"storage":"64GB","condition":"Open Box A+","price":190,"msrp":193.77},{"storage":"256GB","condition":"Open Box A+","price":220,"msrp":226.24},{"storage":"512GB","condition":"Open Box A+","price":250,"msrp":258.72}]},{"category":"iPhone","model":"iPhone 8 Plus","variants":[{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":107.17},{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":128.82},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":150.47}]},{"category":"iPhone","model":"iPhone 7 Plus","variants":[{"storage":"32GB","condition":"Open Box A+","price":null,"msrp":74.69},{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":92.01},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":107.17}]},{"category":"iPhone","model":"iPhone 6 Plus","variants":[{"storage":"16GB","condition":"Open Box A+","price":null,"msrp":37.89},{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":48.71},{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":59.54}]},{"category":"iPhone","model":"iPhone 6s Plus","variants":[{"storage":"16/32GB","condition":"Open Box A+","price":null,"msrp":48.71},{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":59.54},{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":70.36}]},{"category":"iPad","model":"iPad Air 13\" (M4, 2026)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":810.79}]},{"category":"iPad","model":"iPad Air 11\" (M4, 2026)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":615.94}]},{"category":"iPad","model":"iPad Pro 13\" (M5, 2025)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1297.92}]},{"category":"iPad","model":"iPad Pro 11\" (M5, 2025)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1027.29}]},{"category":"iPad","model":"iPad 11th Gen (A16, 2025)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":356.14}]},{"category":"iPad","model":"iPad Pro 13\" (M4, 2024)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1081.42}]},{"category":"iPad","model":"iPad Pro 11\" (M4, 2024)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":864.92}]},{"category":"iPad","model":"iPad mini 7 (A17 Pro, 2024)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":486.04}]},{"category":"iPad","model":"iPad Air 13\" (M2, 2024)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":680.89}]},{"category":"iPad","model":"iPad Air 11\" (M2, 2024)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":518.52}]},{"category":"iPad","model":"iPad Pro 12.9\" (6th Gen, M2, 2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":832.44}]},{"category":"iPad","model":"iPad Pro 11\" (4th Gen, M2, 2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":648.42}]},{"category":"iPad","model":"iPad Air 5th Gen (M1, 2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":410.27}]},{"category":"iPad","model":"iPad 10th Gen (2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":280.37}]},{"category":"iPad","model":"iPad Pro 12.9\" (5th Gen, M1, 2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":670.07}]},{"category":"iPad","model":"iPad Pro 11\" (3rd Gen, M1, 2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":540.17}]},{"category":"iPad","model":"iPad mini 6 (2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":366.97}]},{"category":"iPad","model":"iPad 9th Gen (2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":193.77}]},{"category":"iPad","model":"iPad Pro 12.9\" (4th Gen, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":518.52}]},{"category":"iPad","model":"iPad Pro 11\" (2nd Gen, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":431.92}]},{"category":"iPad","model":"iPad Air 4th Gen (2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":323.67}]},{"category":"iPad","model":"iPad 8th Gen (2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":150.47}]},{"category":"iPad","model":"iPad Air 3rd Gen (2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":204.59}]},{"category":"iPad","model":"iPad mini 5 (2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":215.42}]},{"category":"iPad","model":"iPad 7th Gen (2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":124.49}]},{"category":"iPad","model":"iPad Pro 12.9\" (3rd Gen, 2018)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":421.09}]},{"category":"iPad","model":"iPad Pro 11\" (1st Gen, 2018)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":356.14}]},{"category":"iPad","model":"iPad 6th Gen (2018)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":102.84}]},{"category":"iPad","model":"iPad Pro 12.9\" (2nd Gen, 2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":269.54}]},{"category":"iPad","model":"iPad Pro 10.5\" (2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":215.42}]},{"category":"iPad","model":"iPad 5th Gen (2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":81.19}]},{"category":"iPad","model":"iPad Pro 9.7\" (2016)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":150.47}]},{"category":"iPad","model":"iPad Pro 12.9\" (1st Gen, 2015)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":193.77}]},{"category":"iPad","model":"iPad mini 4 (2015)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":107.17}]},{"category":"iPad","model":"iPad Air 2 (2014)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":96.34}]},{"category":"iPad","model":"iPad mini 3 (2014)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":74.69}]},{"category":"iPad","model":"iPad Air 1st Gen (2013)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":63.87}]},{"category":"iPad","model":"iPad mini 2 (2013)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":53.04}]},{"category":"iPad","model":"iPad mini 1st Gen (2012)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":37.89}]},{"category":"iPad","model":"iPad 4th Gen (2012)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":48.71}]},{"category":"iPad","model":"iPad 3rd Gen (2012)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":37.89}]},{"category":"iPad","model":"iPad 2nd Gen (2011)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":31.39}]},{"category":"iPad","model":"iPad 1st Gen (2010)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":27.06}]},{"category":"Apple Watch","model":"Apple Watch Ultra 3","variants":[{"storage":"49mm (Cellular)","condition":"Open Box A+","price":null,"msrp":778.32}]},{"category":"Apple Watch","model":"Apple Watch Ultra 2","variants":[{"storage":"49mm (Cellular)","condition":"Open Box A+","price":null,"msrp":594.29}]},{"category":"Apple Watch","model":"Apple Watch Ultra (1st Gen)","variants":[{"storage":"49mm (Cellular)","condition":"Open Box A+","price":null,"msrp":453.57}]},{"category":"Apple Watch","model":"Apple Watch Series 11","variants":[{"storage":"42mm","condition":"Open Box A+","price":null,"msrp":377.79},{"storage":"46mm","condition":"Open Box A+","price":null,"msrp":410.27}]},{"category":"Apple Watch","model":"Apple Watch Series 10","variants":[{"storage":"42mm","condition":"Open Box A+","price":null,"msrp":302.02},{"storage":"46mm","condition":"Open Box A+","price":null,"msrp":334.49}]},{"category":"Apple Watch","model":"Apple Watch Series 9","variants":[{"storage":"41mm","condition":"Open Box A+","price":null,"msrp":237.07},{"storage":"45mm","condition":"Open Box A+","price":null,"msrp":269.54}]},{"category":"Apple Watch","model":"Apple Watch Series 8","variants":[{"storage":"41mm","condition":"Open Box A+","price":null,"msrp":182.94},{"storage":"45mm","condition":"Open Box A+","price":null,"msrp":204.59}]},{"category":"Apple Watch","model":"Apple Watch Series 7","variants":[{"storage":"41mm","condition":"Open Box A+","price":null,"msrp":150.47},{"storage":"45mm","condition":"Open Box A+","price":null,"msrp":172.12}]},{"category":"Apple Watch","model":"Apple Watch Series 6","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":117.99},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":135.31}]},{"category":"Apple Watch","model":"Apple Watch Series 5","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":96.34},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":107.17}]},{"category":"Apple Watch","model":"Apple Watch Series 4","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":74.69},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":85.52}]},{"category":"Apple Watch","model":"Apple Watch Series 3","variants":[{"storage":"38mm","condition":"Open Box A+","price":null,"msrp":48.71},{"storage":"42mm","condition":"Open Box A+","price":null,"msrp":59.54}]},{"category":"Apple Watch","model":"Apple Watch Series 2","variants":[{"storage":"38mm","condition":"Open Box A+","price":null,"msrp":37.89},{"storage":"42mm","condition":"Open Box A+","price":null,"msrp":43.3}]},{"category":"Apple Watch","model":"Apple Watch Series 1","variants":[{"storage":"38mm","condition":"Open Box A+","price":null,"msrp":31.39},{"storage":"42mm","condition":"Open Box A+","price":null,"msrp":37.89}]},{"category":"Apple Watch","model":"Apple Watch SE 3","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":237.07},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":269.54}]},{"category":"Apple Watch","model":"Apple Watch SE 2","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":139.64},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":161.29}]},{"category":"Apple Watch","model":"Apple Watch SE 1","variants":[{"storage":"40mm","condition":"Open Box A+","price":null,"msrp":85.52},{"storage":"44mm","condition":"Open Box A+","price":null,"msrp":96.34}]},{"category":"Apple Watch","model":"Apple Watch 1st Gen","variants":[{"storage":"38mm / 42mm","condition":"Open Box A+","price":null,"msrp":27.06}]},{"category":"Samsung","model":"Galaxy S26 Ultra","variants":[{"storage":"256GB","condition":"New","price":null,"msrp":1406.17},{"storage":"256GB","condition":"Open Box","price":950,"msrp":1406.17},{"storage":"512GB","condition":"New","price":null,"msrp":1622.67},{"storage":"512GB","condition":"Open Box","price":1050,"msrp":1460.29},{"storage":"1TB","condition":"New","price":null,"msrp":1947.42},{"storage":"1TB","condition":"Open Box","price":1150,"msrp":1730.92}]},{"category":"Samsung","model":"Galaxy S26+","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":1048.94},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1168.02}]},{"category":"Samsung","model":"Galaxy S26","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":864.92},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":929.87},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1048.94}]},{"category":"Samsung","model":"Galaxy S25 Ultra","variants":[{"storage":"256GB","condition":"Open Box A+","price":770,"msrp":1027.29},{"storage":"512GB","condition":"Open Box A+","price":790,"msrp":1135.54},{"storage":"1TB","condition":"Open Box A+","price":850,"msrp":1297.92}]},{"category":"Samsung","model":"Galaxy S25+","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":832.44},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":919.04}]},{"category":"Samsung","model":"Galaxy S25","variants":[{"storage":"128GB","condition":"Open Box A+","price":425,"msrp":670.07},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":724.19},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":821.62}]},{"category":"Samsung","model":"Galaxy S24 Ultra","variants":[{"storage":"256GB","condition":"Open Box A+","price":615,"msrp":778.32},{"storage":"512GB","condition":"Open Box A+","price":650,"msrp":864.92},{"storage":"1TB","condition":"Open Box A+","price":725,"msrp":973.17}]},{"category":"Samsung","model":"Galaxy S24+","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":605.12},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":670.07}]},{"category":"Samsung","model":"Galaxy S24","variants":[{"storage":"128GB","condition":"Open Box A+","price":325,"msrp":464.39},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":518.52}]},{"category":"Samsung","model":"Galaxy S23 Ultra","variants":[{"storage":"256GB","condition":"Open Box A+","price":450,"msrp":550.99},{"storage":"512GB","condition":"Open Box A+","price":490,"msrp":615.94},{"storage":"1TB","condition":"Open Box A+","price":550,"msrp":702.54},{"storage":"128GB","condition":"Open Box A+","price":425,"msrp":525}]},{"category":"Samsung","model":"Galaxy S23+","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":410.27},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":464.39}]},{"category":"Samsung","model":"Galaxy S23","variants":[{"storage":"128GB","condition":"Open Box A+","price":275,"msrp":302.02},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":345.32}]},{"category":"Samsung","model":"Galaxy S22 Ultra","variants":[{"storage":"128GB","condition":"Open Box A+","price":325.14,"msrp":356.14},{"storage":"256GB","condition":"Open Box A+","price":375.44,"msrp":399.44},{"storage":"512GB","condition":"Open Box A+","price":410.74,"msrp":442.74},{"storage":"1TB","condition":"Open Box A+","price":490,"msrp":486.04}]},{"category":"Samsung","model":"Galaxy S22+","variants":[{"storage":"128GB","condition":"Open Box A+","price":210,"msrp":247.89},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":280.37}]},{"category":"Samsung","model":"Galaxy S22","variants":[{"storage":"128GB","condition":"Open Box A+","price":180,"msrp":193.77},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":226.24}]},{"category":"Samsung","model":"Galaxy S21 Ultra","variants":[{"storage":"128GB","condition":"Open Box A+","price":210,"msrp":260},{"storage":"256GB","condition":"Open Box A+","price":250,"msrp":291},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":334.49}]},{"category":"Samsung","model":"Galaxy S21+","variants":[{"storage":"128GB","condition":"Open Box A+","price":190,"msrp":282.94},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":204.59}]},{"category":"Samsung","model":"Galaxy S21","variants":[{"storage":"128GB","condition":"Open Box A+","price":175,"msrp":146.14},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":167.79}]},{"category":"Samsung","model":"Galaxy S20 Ultra","variants":[{"storage":"128GB","condition":"Open Box A+","price":190,"msrp":290.22},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":226.24},{"storage":"256GB","condition":"Open Box","price":250,"msrp":330}]},{"category":"Samsung","model":"Galaxy S20+","variants":[{"storage":"128GB","condition":"Open Box A+","price":170,"msrp":270.14},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":172.12}]},{"category":"Samsung","model":"Galaxy S20","variants":[{"storage":"128GB","condition":"Open Box A+","price":160,"msrp":113.66}]},{"category":"Samsung","model":"Galaxy S10+","variants":[{"storage":"128GB","condition":"Open Box A+","price":180,"msrp":280.49},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":156.96},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":193.77}]},{"category":"Samsung","model":"Galaxy S10","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":102.84},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":128.82}]},{"category":"Samsung","model":"Galaxy S10e","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":81.19},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":102.84}]},{"category":"Samsung","model":"Galaxy S9+","variants":[{"storage":"64GB","condition":"Open Box A+","price":145,"msrp":200.19},{"storage":"128GB / 256GB","condition":"Open Box A+","price":null,"msrp":96.34}]},{"category":"Samsung","model":"Galaxy S9","variants":[{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":63.87},{"storage":"128GB / 256GB","condition":"Open Box A+","price":null,"msrp":81.19}]},{"category":"Samsung","model":"Galaxy S8+","variants":[{"storage":"64GB","condition":"Open Box A+","price":125,"msrp":156.29}]},{"category":"Samsung","model":"Galaxy S8","variants":[{"storage":"64GB","condition":"Open Box A+","price":null,"msrp":45.47}]},{"category":"Samsung","model":"Galaxy S7","variants":[{"storage":"32GB","condition":"Open Box A+","price":null,"msrp":31.39}]},{"category":"Samsung","model":"Galaxy S7 Edge","variants":[{"storage":"32GB","condition":"Open Box A+","price":null,"msrp":42.22}]},{"category":"Samsung","model":"Galaxy Z Fold7","variants":[{"storage":"256GB","condition":"Open Box A+","price":975,"msrp":1839.17},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1969.07},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":2218.04}]},{"category":"Samsung","model":"Galaxy Z Flip7","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":1059.77},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1178.84}]},{"category":"Samsung","model":"Galaxy Z Fold6","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":1222.14},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1330.39},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":1481.94}]},{"category":"Samsung","model":"Galaxy Z Flip6","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":648.42},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":724.19}]},{"category":"Samsung","model":"Galaxy Z Fold5","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":680.89},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":756.67},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":864.92}]},{"category":"Samsung","model":"Galaxy Z Flip5","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":345.32},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":399.44}]},{"category":"Samsung","model":"Galaxy Z Fold4","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":464.39},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":518.52},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":594.29}]},{"category":"Samsung","model":"Galaxy Z Flip4","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":237.07},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":269.54},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":312.84}]},{"category":"Samsung","model":"Galaxy Z Fold3","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":323.67},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":366.97}]},{"category":"Samsung","model":"Galaxy Z Flip3","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":161.29},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":193.77}]},{"category":"Google","model":"Pixel 10 Pro XL","variants":[{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":1168.02},{"storage":"512GB","condition":"Open Box A+","price":null,"msrp":1297.92},{"storage":"1TB","condition":"Open Box A+","price":null,"msrp":1514.42}]},{"category":"Google","model":"Pixel 9","variants":[{"storage":"128GB","condition":"Open Box A+","price":null,"msrp":496.87},{"storage":"256GB","condition":"Open Box A+","price":null,"msrp":561.82}]},{"category":"MacBook","model":"MacBook Pro 16\" (M2 Pro / Max, 2023)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1427.82}]},{"category":"MacBook","model":"MacBook Pro 14\" (M2 Pro / Max, 2023)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1232.97}]},{"category":"MacBook","model":"MacBook Pro 13\" (M2, 2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":778.32}]},{"category":"MacBook","model":"MacBook Pro 16\" (M1 Pro / Max, 2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":1124.72}]},{"category":"MacBook","model":"MacBook Pro 14\" (M1 Pro / Max, 2021)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":919.04}]},{"category":"MacBook","model":"MacBook Pro 13\" (M1, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":572.64}]},{"category":"MacBook","model":"MacBook Pro 13\" 4 Thunderbolt (Intel, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":377.79}]},{"category":"MacBook","model":"MacBook Pro 13\" 2 Thunderbolt (Intel, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":330.16}]},{"category":"MacBook","model":"MacBook Pro 16\" (Intel, 2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":540.17}]},{"category":"MacBook","model":"MacBook Pro 15\" Touch Bar (Intel, 2018–2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":399.44}]},{"category":"MacBook","model":"MacBook Pro 13\" Touch Bar (Intel, 2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":286.86}]},{"category":"MacBook","model":"MacBook Pro 13\" Touch Bar (Intel, 2018)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":254.39}]},{"category":"MacBook","model":"MacBook Pro 15\" Touch Bar (Intel, 2016–2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":297.69}]},{"category":"MacBook","model":"MacBook Pro 13\" Touch Bar (Intel, 2016–2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":215.42}]},{"category":"MacBook","model":"MacBook Pro 13\" Function Keys (Intel, 2016–2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":182.94}]},{"category":"MacBook","model":"MacBook Pro 15\" Retina (Intel, 2012–2015)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":193.77}]},{"category":"MacBook","model":"MacBook Pro 13\" Retina (Intel, 2012–2015)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":150.47}]},{"category":"MacBook","model":"MacBook Pro 13\" Unibody (Intel, 2010–2012)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":92.01}]},{"category":"MacBook","model":"MacBook Air 15\" (M2, 2023)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":832.44}]},{"category":"MacBook","model":"MacBook Air 13.6\" (M2, 2022)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":702.54}]},{"category":"MacBook","model":"MacBook Air 13.3\" (M1, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":529.34}]},{"category":"MacBook","model":"MacBook Air 13\" Retina (Intel, 2020)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":366.97}]},{"category":"MacBook","model":"MacBook Air 13\" Retina (Intel, 2018–2019)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":258.72}]},{"category":"MacBook","model":"MacBook Air 13\" (Intel, 2015–2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":156.96}]},{"category":"MacBook","model":"MacBook Air 11\" (Intel, 2015)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":124.49}]},{"category":"MacBook","model":"MacBook 12\" Retina (Intel, 2015–2017)","variants":[{"storage":"","condition":"Open Box A+","price":null,"msrp":172.12}]}];

let PRODUCTS = SNAPSHOT_PRODUCTS;

/* Live inventory endpoint (Google Apps Script web app). */
const LIVE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxdHKfMN_XQOLZppJMZsuZBgK_uf2oFzsdGzEWhEH7z6ku0CLvJZBafyPSC4ytpJWoJ/exec";

const WHATSAPP_NUMBER = "17135532222";

/* ---------- Colors ---------- */
const COLOR_HEX_MAP = {
  "space black": "#3B3B3D", "space gray": "#535150", "space grey": "#535150",
  "midnight": "#1B1B26", "starlight": "#F0E4D3", "silver": "#E3E4E5", "white": "#F5F5F0",
  "black": "#161616", "jet black": "#0B0B0D", "gold": "#F1E2C9", "rose gold": "#E8C4C0",
  "light gold": "#E7D3AE", "cloud white": "#F2F1EC",
  "natural titanium": "#8E8C84", "blue titanium": "#3A4A5C", "white titanium": "#DCDCD6",
  "black titanium": "#3A3835", "desert titanium": "#B69D7C",
  "product red": "#B1282E", "red": "#B1282E", "burgundy red": "#6E2233",
  "blue": "#4F6D8C", "deep blue": "#2C3E5E", "sky blue": "#B9D3E0", "mist blue": "#AFC6D8",
  "ultramarine": "#3B57C4", "pacific blue": "#1F3C4D", "sierra blue": "#A9C0D3", "icy blue": "#C9DCE6",
  "green": "#5C7A5E", "alpine green": "#5A6A57", "midnight green": "#4E5851", "sage": "#B7C4AE",
  "mint": "#BEDFD0", "wintergreen": "#A9C4B5", "jade": "#6E9C86",
  "purple": "#8B7EA8", "deep purple": "#544A63", "lavender": "#C6C0E0", "cobalt violet": "#5A5470",
  "pink": "#F0C7CE", "peony": "#E8AFB4", "yellow": "#F3E1A4", "amber yellow": "#D8A93E",
  "teal": "#3E6E68", "orange": "#D97B3F", "cosmic orange": "#E1642A",
  "graphite": "#54524F", "cream": "#F4E9D8", "porcelain": "#EDE7DD", "obsidian": "#22242A",
  "moonstone": "#9FB0BE", "navy": "#1F2A44",
  "titanium gray": "#78787A", "titanium black": "#2E2E30", "titanium violet": "#8C7F9A",
  "titanium silver": "#C7C7C9", "titanium whitesilver": "#D8D9DB", "titanium silverblue": "#9BAAB8",
  "silver shadow": "#B8BCC0",
  "phantom black": "#161616", "phantom white": "#EDEDED",

  /* added from the colour sheet */
  "arctic silver": "#C9CDD2",
  "aura blue": "#7E9BC4",
  "black onyx": "#1B1B1D",
  "black pearl": "#16171A",
  "black sapphire": "#1D2433",
  "blue black": "#22304A",
  "blue coral": "#2D6E8E",
  "blue topaz": "#4E7FB5",
  "burgundy": "#6B2434",
  "canary yellow": "#F2D544",
  "ceramic black": "#17181A",
  "ceramic white": "#F1F1EF",
  "cloud blue": "#A9C6DE",
  "cloud pink": "#F0C8CC",
  "coral": "#F08A73",
  "coral blue": "#4C8FBF",
  "coral red": "#E4574F",
  "cosmic black": "#1A1A1C",
  "cosmic gray": "#6E7176",
  "flamingo pink": "#F09FB0",
  "gold platinum": "#D9C08A",
  "green emerald": "#2F7A5C",
  "ice blue": "#C7DCEA",
  "jade green": "#6E9B7C",
  "lilac purple": "#B9A6D4",
  "lime": "#C7E06A",
  "maple gold": "#D8B98A",
  "marble gray": "#9A9B98",
  "midnight black": "#131316",
  "onyx black": "#1C1C1E",
  "orchid gray": "#7C7A85",
  "phantom brown": "#6B4F3F",
  "phantom gold": "#D6C1A1",
  "phantom gray": "#6B6E73",
  "phantom navy": "#2C3A56",
  "phantom pink": "#F0C7C2",
  "phantom red": "#B32A33",
  "phantom silver": "#D3D6D9",
  "phantom titanium": "#7E8489",
  "phantom violet": "#B9AEE0",
  "pink gold": "#E8C3B0",
  "prism black": "#1E1E22",
  "prism blue": "#3E63C8",
  "prism green": "#57B58F",
  "prism white": "#EDEFF2",
  "rose pink": "#E7A9B4",
  "sandstone orange": "#C98A5E",
  "sapphire blue": "#3C5A96",
  "silver titanium": "#A8ACB0",
  "sunrise gold": "#E0C09A",
  "titanium blue": "#5A6E86",
  "titanium green": "#6E7A6A",
  "titanium grey": "#78787A",
  "titanium jadegreen": "#6F8478",
  "titanium jetblack": "#26262A",
  "titanium orange": "#B5754A",
  "titanium pinkgold": "#C9A896",
  "titanium yellow": "#C6B173",
  "violet": "#A78BC9",
  "white pearl": "#F2F1ED",

  /* Galaxy Z Fold / Flip finishes */
  "blue shadow": "#3E4C63",
  "light pink": "#F0CBD5",
  "gray green": "#6F7A6C",
  "beige": "#D8CAB4",
  "bora purple": "#A99BCB",
  "phantom green": "#3F5A4B"
};
function colorHex(name){
  if (!name) return "#CBD5E1";
  return COLOR_HEX_MAP[name.trim().toLowerCase()] || "#9AA7B4";
}

/* Reference colour lineups per model — the full range each manufacturer
   offered, not a live stock count. Sourced from the FM Cellular colour sheet. */
const MODEL_COLOR_MAP = {
  "iPhone 17 Pro Max": ["Cosmic Orange", "Deep Blue", "Silver"],
  "iPhone 17 Pro": ["Cosmic Orange", "Deep Blue", "Silver"],
  "iPhone 17 Air / Slim": ["Sky Blue", "Light Gold", "Cloud White", "Space Black"],
  "iPhone 17": ["Lavender", "Sage", "Mist Blue", "White", "Black"],
  "iPhone 16e": ["Black", "White"],
  "iPhone 16 Pro Max": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
  "iPhone 16 Pro": ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
  "iPhone 16 Plus": ["Ultramarine", "Teal", "Pink", "White", "Black"],
  "iPhone 16": ["Ultramarine", "Teal", "Pink", "White", "Black"],
  "iPhone 15 Pro Max": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  "iPhone 15 Pro": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  "iPhone 15 Plus": ["Pink", "Yellow", "Green", "Blue", "Black"],
  "iPhone 15": ["Pink", "Yellow", "Green", "Blue", "Black"],
  "iPhone 14 Pro Max": ["Deep Purple", "Gold", "Silver", "Space Black"],
  "iPhone 14 Pro": ["Deep Purple", "Gold", "Silver", "Space Black"],
  "iPhone 14 Plus": ["Blue", "Purple", "Yellow", "Midnight", "Starlight", "Red"],
  "iPhone 14": ["Blue", "Purple", "Yellow", "Midnight", "Starlight", "Red"],
  "iPhone SE (3rd Gen)": ["Midnight", "Starlight", "Red"],
  "iPhone 13 Pro Max": ["Alpine Green", "Silver", "Gold", "Graphite", "Sierra Blue"],
  "iPhone 13 Pro": ["Alpine Green", "Silver", "Gold", "Graphite", "Sierra Blue"],
  "iPhone 13 mini": ["Green", "Pink", "Blue", "Midnight", "Starlight", "Red"],
  "iPhone 13": ["Green", "Pink", "Blue", "Midnight", "Starlight", "Red"],
  "iPhone 12 Pro Max": ["Pacific Blue", "Gold", "Graphite", "Silver"],
  "iPhone 12 Pro": ["Pacific Blue", "Gold", "Graphite", "Silver"],
  "iPhone 12 mini": ["Purple", "Blue", "Green", "Red", "White", "Black"],
  "iPhone 12": ["Purple", "Blue", "Green", "Red", "White", "Black"],
  "iPhone SE (2nd Gen)": ["Black", "White", "Red"],
  "iPhone 11 Pro Max": ["Midnight Green", "Space Gray", "Silver", "Gold"],
  "iPhone 11 Pro": ["Midnight Green", "Space Gray", "Silver", "Gold"],
  "iPhone 11": ["Black", "Green", "Yellow", "Purple", "Red", "White"],
  "iPhone XR": ["Blue", "White", "Black", "Yellow", "Coral", "Red"],
  "iPhone XS Max": ["Space Gray", "Silver", "Gold"],
  "iPhone XS": ["Space Gray", "Silver", "Gold"],
  "iPhone X": ["Space Gray", "Silver"],
  "iPhone 8 Plus": ["Space Gray", "Silver", "Gold", "Red"],
  "iPhone 8": ["Space Gray", "Silver", "Gold", "Red"],
  "iPhone 7 Plus": ["Jet Black", "Black", "Silver", "Gold", "Rose Gold", "Red"],
  "iPhone 7": ["Jet Black", "Black", "Silver", "Gold", "Rose Gold", "Red"],
  "iPhone 6s Plus": ["Space Gray", "Silver", "Gold", "Rose Gold"],
  "iPhone 6s": ["Space Gray", "Silver", "Gold", "Rose Gold"],
  "iPhone 6 Plus": ["Space Gray", "Silver", "Gold"],
  "iPhone 6": ["Space Gray", "Silver", "Gold"],
  "Galaxy S26 Ultra": ["Cobalt Violet", "Sky Blue", "Black", "White", "Silver Shadow", "Pink Gold"],
  "Galaxy S25 Ultra": ["Titanium Black", "Titanium Grey", "Titanium Whitesilver", "Titanium Silverblue", "Titanium Jetblack", "Titanium Jadegreen", "Titanium Pinkgold"],
  "Galaxy S24 Ultra": ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow", "Titanium Green", "Titanium Orange", "Titanium Blue"],
  "Galaxy S23 Ultra": ["Phantom Black", "Green", "Cream", "Lavender", "Lime", "Sky Blue", "Red", "Graphite"],
  "Galaxy S22 Ultra": ["Phantom Black", "Phantom White", "Green", "Burgundy", "Red", "Sky Blue", "Graphite"],
  "Galaxy S21 Ultra": ["Phantom Black", "Phantom Silver", "Phantom Titanium", "Phantom Navy", "Phantom Brown"],
  "Galaxy S20 Ultra": ["Cosmic Black", "Cosmic Gray", "Cloud White"],
  "Galaxy S26 Plus": ["Cobalt Violet", "Sky Blue", "Black", "White", "Silver Shadow", "Pink Gold"],
  "Galaxy S25 Plus": ["Icy Blue", "Mint", "Navy", "Silver Shadow", "Blue Black", "Pink Gold", "Coral Red"],
  "Galaxy S24 Plus": ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sandstone Orange", "Sapphire Blue"],
  "Galaxy S23 Plus": ["Phantom Black", "Green", "Cream", "Lavender", "Graphite", "Lime"],
  "Galaxy S22 Plus": ["Phantom Black", "Phantom White", "Green", "Pink Gold", "Violet", "Sky Blue", "Graphite", "Cream"],
  "Galaxy S21 Plus": ["Phantom Black", "Phantom Silver", "Phantom Violet", "Phantom Pink", "Phantom Gold", "Phantom Red"],
  "Galaxy S20 Plus": ["Cosmic Black", "Cosmic Gray", "Cloud Blue", "Aura Blue"],
  "Galaxy S10 Plus": ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink", "Ceramic White", "Ceramic Black"],
  "Galaxy S9 Plus": ["Midnight Black", "Coral Blue", "Titanium Gray", "Lilac Purple", "Burgundy Red", "Sunrise Gold", "Ice Blue"],
  "Galaxy S8 Plus": ["Midnight Black", "Orchid Gray", "Arctic Silver", "Coral Blue", "Maple Gold", "Rose Pink"],
  "Galaxy S26": ["Cobalt Violet", "Sky Blue", "Black", "White", "Silver Shadow", "Pink Gold"],
  "Galaxy S25": ["Icy Blue", "Mint", "Navy", "Silver Shadow", "Blue Black", "Pink Gold", "Coral Red"],
  "Galaxy S24": ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sandstone Orange", "Sapphire Blue"],
  "Galaxy S23": ["Phantom Black", "Cream", "Green", "Lavender", "Graphite", "Lime"],
  "Galaxy S22": ["Phantom Black", "Phantom White", "Green", "Pink Gold", "Violet", "Sky Blue", "Graphite", "Cream"],
  "Galaxy S21": ["Phantom Gray", "Phantom White", "Phantom Violet", "Phantom Pink"],
  "Galaxy S20": ["Cosmic Gray", "Cloud Blue", "Cloud Pink"],
  "Galaxy S10": ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink"],
  "Galaxy S10e": ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink"],
  "Galaxy S9": ["Midnight Black", "Coral Blue", "Titanium Gray", "Lilac Purple", "Burgundy Red", "Sunrise Gold", "Ice Blue"],
  "Galaxy S8": ["Midnight Black", "Orchid Gray", "Arctic Silver", "Coral Blue", "Maple Gold", "Rose Pink"],
  "Galaxy S7 Edge": ["Black Onyx", "Gold Platinum", "White Pearl", "Silver Titanium", "Pink Gold", "Blue Coral", "Black Pearl"],
  "Galaxy S7": ["Black Onyx", "Gold Platinum", "White Pearl", "Silver Titanium", "Pink Gold"],
  "Galaxy S6 Edge": ["White Pearl", "Black Sapphire", "Gold Platinum", "Green Emerald"],
  "Galaxy S6": ["White Pearl", "Black Sapphire", "Gold Platinum", "Blue Topaz"],
  "MacBook Air 15\" (M2, 2023)": ["Midnight", "Starlight", "Space Gray", "Silver"],
  "MacBook Air 13.6\" (M2, 2022)": ["Midnight", "Starlight", "Space Gray", "Silver"],
  "MacBook Air 13.3\" (M1, 2020)": ["Space Gray", "Silver", "Gold"],
  "MacBook Air 13\" Retina (Intel, 2020)": ["Space Gray", "Silver", "Gold"],
  "MacBook Air 13\" Retina (Intel, 2018–2019)": ["Space Gray", "Silver", "Gold"],
  "MacBook Air 13\" (Intel, 2015–2017)": ["Silver"],
  "MacBook Air 11\" (Intel, 2015)": ["Silver"],
  "MacBook 12\" Retina (Intel, 2015–2017)": ["Rose Gold", "Space Gray", "Gold", "Silver"],
  "MacBook Pro 16\" (M2 Pro / Max, 2023)": ["Space Gray", "Silver"],
  "MacBook Pro 14\" (M2 Pro / Max, 2023)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" (M2, 2022)": ["Space Gray", "Silver"],
  "MacBook Pro 16\" (M1 Pro / Max, 2021)": ["Space Gray", "Silver"],
  "MacBook Pro 14\" (M1 Pro / Max, 2021)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" (M1, 2020)": ["Space Gray", "Silver"],
  "MacBook Pro 16\" (Intel, 2019)": ["Space Gray", "Silver"],
  "MacBook Pro 15\" Touch Bar (Intel, 2018–2019)": ["Space Gray", "Silver"],
  "MacBook Pro 15\" Touch Bar (Intel, 2016–2017)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" 4 Thunderbolt (Intel, 2020)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" 2 Thunderbolt (Intel, 2020)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" Touch Bar (Intel, 2019)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" Touch Bar (Intel, 2018)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" Touch Bar (Intel, 2016–2017)": ["Space Gray", "Silver"],
  "MacBook Pro 13\" Function Keys (Intel, 2016–2017)": ["Space Gray", "Silver"],
  "MacBook Pro 15\" Retina (Intel, 2012–2015)": ["Silver"],
  "MacBook Pro 13\" Retina (Intel, 2012–2015)": ["Silver"],
  "MacBook Pro 13\" Unibody (Intel, 2010–2012)": ["Silver"],
  "Pixel 10 Pro XL": ["Jade", "Moonstone", "Obsidian", "Porcelain"],
  "Pixel 9": ["Obsidian", "Peony", "Porcelain", "Wintergreen"],
  "Galaxy S26+": ["Cobalt Violet", "Sky Blue", "Black", "White", "Silver Shadow", "Pink Gold"],
  "Galaxy S25+": ["Icy Blue", "Mint", "Navy", "Silver Shadow", "Blue Black", "Pink Gold", "Coral Red"],
  "Galaxy S24+": ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sandstone Orange", "Sapphire Blue"],
  "Galaxy S23+": ["Phantom Black", "Green", "Cream", "Lavender", "Graphite", "Lime"],
  "Galaxy S22+": ["Phantom Black", "Phantom White", "Green", "Pink Gold", "Violet", "Sky Blue", "Graphite", "Cream"],
  "Galaxy S21+": ["Phantom Black", "Phantom Silver", "Phantom Violet", "Phantom Pink", "Phantom Gold", "Phantom Red"],
  "Galaxy S20+": ["Cosmic Black", "Cosmic Gray", "Cloud Blue", "Aura Blue"],
  "Galaxy S10+": ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink", "Ceramic White", "Ceramic Black"],
  "Galaxy S9+": ["Midnight Black", "Coral Blue", "Titanium Gray", "Lilac Purple", "Burgundy Red", "Sunrise Gold", "Ice Blue"],
  "Galaxy S8+": ["Midnight Black", "Orchid Gray", "Arctic Silver", "Coral Blue", "Maple Gold", "Rose Pink"],
  "iPhone Air": ["Sky Blue", "Light Gold", "Cloud White", "Space Black"],
  "iPhone 17e": ["Black", "White", "Pink"],
  "iPhone SE": ["Black", "White"],

  /* Galaxy Z foldables */
  "Galaxy Z Fold7": ["Jet Black", "Blue Shadow", "Silver Shadow"],
  "Galaxy Z Flip7": ["Coral Red", "Blue Shadow", "Jet Black"],
  "Galaxy Z Fold6": ["Navy", "Light Pink", "Silver Shadow"],
  "Galaxy Z Flip6": ["Blue", "Mint", "Yellow", "Silver Shadow"],
  "Galaxy Z Fold5": ["Icy Blue", "Phantom Black", "Cream"],
  "Galaxy Z Flip5": ["Mint", "Graphite", "Cream", "Lavender"],
  "Galaxy Z Fold4": ["Gray Green", "Beige", "Phantom Black"],
  "Galaxy Z Flip4": ["Bora Purple", "Graphite", "Pink Gold", "Blue"],
  "Galaxy Z Fold3": ["Phantom Black", "Phantom Green", "Phantom Silver"],
  "Galaxy Z Flip3": ["Cream", "Green", "Lavender", "Phantom Black"]
};
function getReferenceColors(model){
  return MODEL_COLOR_MAP[model] || [];
}

/* ---------- Local product photography ----------
   Files live in the "phone images" folder next to this HTML file.
   A row's own image_url from the live sheet always wins over these. */
const PHOTO_BASE = "phone images/transparent/";
const PHOTO_MAP = {
  "Galaxy S10+": { "Prism Black": "samsung_s10_plus_black.png", "Prism White": "samsung_s10_plus_white.png", "Canary Yellow": "samsung_s10+_canary_yellow.png", "Ceramic Black": "samsung_s10+_ceramic_black.png", "Ceramic White": "samsung_s10+_ceramic_white.png", "Flamingo Pink": "samsung_s10+_flamingo_pink.png", "Prism Blue": "samsung_s10+_prism_blue.png", "Prism Green": "samsung_s10+_prism_green.png" },
  "Galaxy S20": { "Cloud Blue": "samsung_s20_cloud_blue.png", "Cloud Pink": "samsung_s20_cloud_pink.png", "Cosmic Gray": "samsung_s20_cosmic_gray.png" },
  "Galaxy S20 Ultra": { "Cloud White": "samsung_s20_ultra_cloud_white.png", "Cosmic Black": "samsung_s20_ultra_cosmic_black.png", "Cosmic Gray": "samsung_s20_ultra_cosmic_gray.png" },
  "Galaxy S20+": { "Cosmic Black": "samsung_s20 plus black.png", "Aura Blue": "samsung_s20+_aura_blue.png", "Cloud Blue": "samsung_s20+_cloud_blue.png", "Cosmic Gray": "samsung_s20+_cosmic_gray.png" },
  "Galaxy S21": { "Phantom Gray": "samsung_s21_grey.png", "Phantom Violet": "samsung_s21_purple.png", "Phantom Pink": "samsung_s21 pink.png", "Phantom White": "samsung_s21_phantom_white.png" },
  "Galaxy S21 Ultra": { "Phantom Black": "samsung_s21_ultra_black.png", "Phantom Brown": "samsung_s21_ultra_phantom_brown.png", "Phantom Navy": "samsung_s21_ultra_phantom_navy.png", "Phantom Silver": "samsung_s21_ultra_phantom_silver.png", "Phantom Titanium": "samsung_s21_ultra_phantom_titanium.png" },
  "Galaxy S21+": { "Phantom Black": "samsung_s21_plus black.png", "Phantom Silver": "samsung_s21_plus_silver.png", "Phantom Gold": "samsung_s21+_phantom_gold.png", "Phantom Pink": "samsung_s21+_phantom_pink.png", "Phantom Red": "samsung_s21+_phantom_red.png", "Phantom Violet": "samsung_s21+_phantom_violet.png" },
  "Galaxy S22": { "Phantom Black": "samsung_s22_black.png", "Phantom White": "samsung_s22 white.png", "Green": "samsung_s22_green.png", "Pink Gold": "samsung_s22_pink.png", "Cream": "samsung_s22_cream.png", "Graphite": "samsung_s22_graphite.png", "Sky Blue": "samsung_s22_sky_blue.png", "Violet": "samsung_s22_violet.png" },
  "Galaxy S22 Ultra": { "Phantom Black": "samsung_s22_ultra_black.png", "Phantom White": "samsung_s22_ultra_white.png", "Green": "samsung_s22_ultra_green_mint.png", "Burgundy": "samsung_s22_ultra_burgundy.png", "Sky Blue": "samsung_s22U blue.png", "Graphite": "samsung_s22U graphite.png", "Red": "samsung_s22U red.png" },
  "Galaxy S22+": { "Phantom Black": "samsung_s22_plus_black.png", "Cream": "samsung_s22+_cream.png", "Graphite": "samsung_s22+_graphite.png", "Green": "samsung_s22+_green.png", "Pink Gold": "samsung_s22+_pink_gold.png", "Sky Blue": "samsung_s22+_sky_blue.png", "Violet": "samsung_s22+_violet.png", "Phantom White": "samsung_s22+_white.png" },
  "Galaxy S23": { "Phantom Black": "samsung_s23_black.png", "Cream": "samsung_s23_cream.png", "Lavender": "samsung_s23_purple.png", "Graphite": "samsung_s23_graphite.png", "Green": "samsung_s23_green.png", "Lime": "samsung_s23_lime.png" },
  "Galaxy S23 Ultra": { "Phantom Black": "samsung_s23_ultra_black.png", "Green": "samsung_s23_ultra_green.png", "Lavender": "samsung_s23_ultra_purple.png", "Cream": "samsung_s23_ultra_white.png", "Sky Blue": "samsung_s23U blue.png", "Graphite": "samsung_s23U gray.png", "Lime": "samsung_s23U lime.png", "Red": "samsung_s23U red.png" },
  "Galaxy S23+": { "Phantom Black": "samsung_s23+_black.png", "Cream": "samsung_s23+_cream.png", "Graphite": "samsung_s23+_graphite.png", "Green": "samsung_s23+_green.png", "Lavender": "samsung_s23+_lavender.png", "Lime": "samsung_s23+_lime.png" },
  "Galaxy S24": { "Onyx Black": "samsung_s24_black.png", "Cobalt Violet": "samsung_s24_cobalt_violet.png", "Marble Gray": "samsung_s24_gray.png", "Jade Green": "samsung_s24_green.png", "Sandstone Orange": "samsung_s24_orange.png", "Sapphire Blue": "samsung_s24_sapphire_blue.png", "Amber Yellow": "samsung_s24_yellow.png" },
  "Galaxy S24 Ultra": { "Titanium Gray": "samsung_s24U grey.png", "Titanium Violet": "samsung_s24U purple.png", "Titanium Black": "samsung_s24U black.png", "Titanium Blue": "samsung_s24U blue.png", "Titanium Green": "samsung_s24U green.png", "Titanium Orange": "samsung_s24U orange.png", "Titanium Yellow": "samsung_s24 Ultra titanium-yellow.png" },
  "Galaxy S24+": { "Jade Green": "samsung_s24+_green.png", "Marble Gray": "samsung_s24+_marble_grey.png", "Onyx Black": "samsung_s24+_onyx_black.png", "Sandstone Orange": "samsung_s24+_orange.png", "Cobalt Violet": "samsung_s24+_purple.png", "Sapphire Blue": "samsung_s24+_sapphire_blue.png", "Amber Yellow": "samsung_s24+_yellow.png" },
  "Galaxy S25": { "Icy Blue": "samsung_s25blue.png", "Navy": "samsung_s25_navy.png", "Blue Black": "samsung_s25_blue_black.png", "Coral Red": "samsung_s25_coral_red.png", "Mint": "samsung_s25_mint.png", "Pink Gold": "samsung_s25_pink_gold.png", "Silver Shadow": "samsung_s25_silver_shadow.png" },
  "Galaxy S25 Ultra": { "Titanium Black": "samsung_black s25U.png", "Titanium Silverblue": "samsung_blue s25U.png", "Titanium Whitesilver": "samsung_s25U silver.png", "Titanium Grey": "samsung_s25U grey.png", "Titanium Jetblack": "samsung_s25U jetblack.png", "Titanium Jadegreen": "samsung_s25U green.png", "Titanium Pinkgold": "samsung_s25U rose gold.png" },
  "Galaxy S25+": { "Coral Red": "samsung_s25+  red.png", "Navy": "samsung_s25+ blue.png", "Mint": "samsung_s25+ green.png", "Icy Blue": "samsung_s25+ icy blue.png", "Blue Black": "samsung_s25+_blue_black.png", "Pink Gold": "samsung_s25+_pink_gold.png", "Silver Shadow": "samsung_s25+_silver_shadow.png" },
  "Galaxy S26": { "Black": "samsung_s26 black.png", "Sky Blue": "samsung_s26 blue.png", "Cobalt Violet": "samsung_s26 purple.png", "Pink Gold": "samsung_s26 rose gold.png", "Silver Shadow": "samsung_s26 silver.png", "White": "samsung_s26 white.png" },
  "Galaxy S26 Ultra": { "Black": "samsung_S26-Ultra_Black.png", "Cobalt Violet": "samsung_S26-Ultra_CobaltViolet.png", "Sky Blue": "samsung_S26-Ultra_Skyblue.png", "White": "samsung_S26-Ultra_White_.png", "Silver Shadow": "samsung_s26U grey.png", "Pink Gold": "samsung_s26U Pink.png" },
  "Galaxy S26+": { "Black": "samsung_s26+_black.png", "Cobalt Violet": "samsung_s26+_cobalt_violet.png", "Pink Gold": "samsung_s26+_pink_gold.png", "Silver Shadow": "samsung_s26+_silver_shadow.png", "Sky Blue": "samsung_s26+_sky_blue.png", "White": "samsung_s26+_white.png" },
  "Galaxy S9+": { "Lilac Purple": "samsung_s9_plus_purple.png", "Burgundy Red": "samsung_s9_plus_pink.png" },
  "MacBook Pro 13\" (M1, 2020)": { "Space Gray": "MacBook Pro 13_m1_space_gray.png", "Silver": "Macbook-Pro-M1-13-inch-2020-silver.png" },
  "MacBook Pro 13\" (M2, 2022)": { "Silver": "MacBook Pro 13_m2_silver.png", "Space Gray": "MacBook Pro 13_m2_space_gray.png" },
  "MacBook Pro 14\" (M1 Pro / Max, 2021)": { "Silver": "MacBook Pro 14_m1_silver.png", "Space Gray": "MacBook Pro 14_m1_space_gray.png" },
  "MacBook Pro 14\" (M2 Pro / Max, 2023)": { "Silver": "MacBook Pro 14_m2_silver.png", "Space Gray": "MacBook Pro 14_m2_space_gray.png" },
  "MacBook Pro 16\" (M1 Pro / Max, 2021)": { "Silver": "MacBook Pro 16_m1_silver.png", "Space Gray": "MacBook Pro 16_m1_space_gray.png" },
  "MacBook Pro 16\" (M2 Pro / Max, 2023)": { "Silver": "MacBook Pro 16_m2_silver.png", "Space Gray": "MacBook Pro 16_m2_space_gray.png" },
  "Pixel 10 Pro XL": { "Jade": "Pixel 10 Pro XL jade.png", "Moonstone": "Pixel 10 Pro XL_moonstone.png", "Obsidian": "Pixel 10 Pro XL_obsidian.png", "Porcelain": "Pixel 10 Pro XL_porcelain.png" },
  "Pixel 9": { "Obsidian": "pixel_9_obsidian.png", "Peony": "pixel_9_peony.png", "Porcelain": "pixel_9_porcelain.png", "Wintergreen": "pixel_9_wintergreen.png" },
  "iPhone 11": { "Black": "iphone_11_black.png", "Green": "iphone_11_green.png", "Purple": "iphone_11_purple.png", "Red": "iphone_11_red.png", "White": "iphone_11_white.png", "Yellow": "iphone_11_yellow.png" },
  "iPhone 11 Pro": { "Gold": "iphone_11_pro_gold.png", "Midnight Green": "iphone_11_pro_green.png", "Silver": "iphone_11_pro_silver.png", "Space Gray": "iphone_11_pro_space_gray.png" },
  "iPhone 11 Pro Max": { "Midnight Green": "11_pro_max_green.png", "Gold": "iphone_11_pro_max_gold.png", "Silver": "iphone_11_pro_max_silver.png" },
  "iPhone 12": { "Black": "iphone_12_black.png", "Blue": "iphone_12_blue.png", "Green": "iphone_12_green.png", "Purple": "iphone_12_purple.png", "Red": "iphone_12_red.png", "White": "iphone_12_white.png" },
  "iPhone 12 Pro": { "Pacific Blue": "iphone_12_pro_blue_5.png", "Gold": "iphone_12_pro_gold.png", "Graphite": "iphone_12_pro_gray.png", "Silver": "iphone_12_pro_silver.png" },
  "iPhone 12 Pro Max": { "Pacific Blue": "iphone_12_pro_max_blue.png", "Gold": "iphone_12_pro_max_gold.png", "Silver": "iphone_12_pro_max_silver.png", "Graphite": "iphone_12_pro_max_graphite.png" },
  "iPhone 12 mini": { "Black": "iphone_12_black_mini.png", "White": "iphone_12_white_mini.png" },
  "iPhone 13": { "Midnight": "iphone_13_black.png", "Blue": "iphone_13_blue.png", "Green": "iphone_13_green.png", "Pink": "iphone_13_pink.png", "Red": "iphone_13_red.png", "Starlight": "iphone_13_white_7.png" },
  "iPhone 13 Pro": { "Sierra Blue": "iphone_13_pro_blue_copy_3.png", "Graphite": "iphone_13_pro_gray.png", "Alpine Green": "iphone_13_pro_green.png", "Silver": "iphone_13_pro_silver.png", "Gold": "13_pro_gold_1_2.png" },
  "iPhone 13 Pro Max": { "Sierra Blue": "iphone_13_pro_max_blue.png", "Gold": "iphone_13_pro_max_gold.png", "Graphite": "iphone_13_pro_max_graphite.png", "Alpine Green": "iphone_13_pro_max_green.png", "Silver": "iphone_13_pro_max_silver.png" },
  "iPhone 13 mini": { "Blue": "iphone_13_blue_mini.png", "Pink": "iphone_13_pink_mini.png", "Red": "iphone_13_red_mini.png" },
  "iPhone 14": { "Yellow": "14_yellow_1.png", "Midnight": "iphone-14-midnight.png", "Purple": "iphone-14-purple.png", "Red": "iphone_14_red.png", "Starlight": "iphone_14_white.png", "Blue": "iphone_14_blue.png" },
  "iPhone 14 Plus": { "Midnight": "iphone_14_plus_black_1.png", "Blue": "iphone_14_plus_blue_9.png", "Red": "iphone_14_plus_red_1.png", "Starlight": "iphone_14_plus_white_5.png", "Purple": "iphone_14_plus_purple.png", "Yellow": "iphone_14_plus_yellow.png" },
  "iPhone 14 Pro": { "Space Black": "iphone_14_pro_black_3.png", "Gold": "iphone_14_pro_gold_13.png", "Deep Purple": "iphone_14_pro_purple_2.png", "Silver": "14pro silver.png" },
  "iPhone 14 Pro Max": { "Space Black": "iphone_14_pro_max_black_1.png", "Gold": "iphone_14_pro_max_gold.png", "Deep Purple": "iphone_14_pro_max_purple_2.png", "Silver": "14pm silver.png" },
  "iPhone 15": { "Blue": "iphone_15_blue_.png", "Green": "iphone_15_green_3.png", "Pink": "iphone_15_pink_3.png", "Yellow": "iphone_15_yellow__3.png", "Black": "iphone_15_black.png" },
  "iPhone 15 Plus": { "Black": "15_plus_black_1.png", "Green": "15_plus_green.png", "Pink": "15_plus_pink.png", "Yellow": "iphone_15+_yellow.png", "Blue": "iphone_15plus_blue.png" },
  "iPhone 15 Pro": { "Blue Titanium": "15_pro_blue_1.png", "Natural Titanium": "15_pro_nat_titanium.png", "White Titanium": "15_pro_white_6.png", "Black Titanium": "15pro black.png" },
  "iPhone 15 Pro Max": { "Blue Titanium": "15_pro_max_blue_5.png", "White Titanium": "15_pro_max_white.png", "Natural Titanium": "15pm titanium.png", "Black Titanium": "15pm black.png" },
  "iPhone 16": { "Black": "16 blck.png", "Ultramarine": "16 blue.png", "Pink": "iphone_16_pink.png", "Teal": "16 teal.png", "White": "16 white.png" },
  "iPhone 16 Plus": { "Ultramarine": "blue 16 +.png", "Teal": "teal 16+.png", "Pink": "pink 16+.png", "White": "white 16 +.png", "Black": "16 plus blck.png" },
  "iPhone 16 Pro": { "Black Titanium": "16 pro blck.png", "White Titanium": "16 pro white.png", "Natural Titanium": "16pro natural.png", "Desert Titanium": "iphone_16_pro_desert_titanium.png" },
  "iPhone 16 Pro Max": { "Black Titanium": "16pm blck.png", "Desert Titanium": "16pm desert.png", "Natural Titanium": "16pm natural.png", "White Titanium": "16pm white.png" },
  "iPhone 16e": { "Black": "iphone_16e_black.png", "White": "iphone_16e_white.png" },
  "iPhone 17": { "Black": "iphone_17_black.png", "Lavender": "iphone_17_lavender.png", "Mist Blue": "iphone_17_mistblue.png", "Sage": "iphone_17_sage.png", "White": "iphone_17_white.png" },
  "iPhone 17 Air / Slim": { "Sky Blue": "iphone_air_blue.png", "Light Gold": "iphone_air_gold.png", "Cloud White": "iphone_air_white.png", "Space Black": "iphone_air_black.png" },
  "iPhone 17 Pro": { "Cosmic Orange": "iphone_17_pro_orange.png", "Deep Blue": "iphone_17_pro_blue.png", "Silver": "17_pro_silver_1.png" },
  "iPhone 17 Pro Max": { "Cosmic Orange": "17_pm_orange_1.png", "Deep Blue": "17 pm blue_1_15.png", "Silver": "iphone_17_pm_silver.png" },
  "iPhone 17e": { "Black": "iphone_17e_black.png", "White": "iphone_17e_white.png", "Pink": "iphone_17e_pink.png" },
  "iPhone 6 Plus": { "Gold": "iphone_6+_gold.png", "Silver": "iphone_6+_silver.png", "Space Gray": "iphone_6+_space_gray.png" },
  "iPhone 6s Plus": { "Gold": "iphone_6s+_gold.png", "Silver": "iphone_6s+_silver.png", "Space Gray": "iphone_6s+_space_gray.png" },
  "iPhone 7": { "Black": "iphone_7_black.png", "Gold": "iphone_7_gold.png", "Silver": "iphone-7-silver.png" },
  "iPhone 7 Plus": { "Black": "iphone_7+_black.png", "Gold": "iphone_7+_gold.png", "Jet Black": "iphone_7+_jet_black.png", "Red": "iphone_7+_red.png", "Rose Gold": "iphone_7+_rose_gold.png", "Silver": "iphone_7+_silver.png" },
  "iPhone 8": { "Gold": "iphone_8_gold_2.png", "Space Gray": "iphone_8_grey.png", "Silver": "iphone_8_silver.png" },
  "iPhone 8 Plus": { "Gold": "iphone_8_plus_gold.png", "Space Gray": "iphone_8_plus_grey.png", "Red": "iphone_8+_red.png", "Silver": "iphone_8+_silver.png" },
  "iPhone Air": { "Sky Blue": "iphone_air_blue.png", "Light Gold": "iphone_air_gold.png", "Cloud White": "iphone_air_white.png", "Space Black": "iphone_air_black.png" },
  "iPhone SE": { "Black": "iphone_se_black.png", "White": "iphone_se_white.png" },
  "iPhone SE (2nd Gen)": { "Black": "iphone_se_2nd_black.png", "Red": "iphone_se_2nd_red.png", "White": "iphone_se_2nd_white.png" },
  "iPhone XS": { "Space Gray": "iphone_xs_grey.png" },
  "iPhone XS Max": { "Space Gray": "iphone_xs_grey.png", "Gold": "iphone_xs_max_gold.png", "Silver": "iphone_xs_max_silver.png" }
};

/* Returns a photo for this exact model+color, or the model's first
   available photo so a card always looks like the real device. */
function localPhotoFor(model, color){
  const entry = PHOTO_MAP[model];
  if (!entry) return "";
  const file = (color && entry[color]) || entry[Object.keys(entry)[0]];
  return file ? encodeURI(PHOTO_BASE + file) : "";
}
/* A photo that fails to load drops back to the drawn icon, and the light
   photo plate goes with it so we never leave an empty white tile. */
function onPhotoError(img){
  const tile = img.parentNode;
  if (!tile) return;
  tile.classList.remove("has-photo");
  const wrap = tile.closest(".detail-image-wrap");
  if (wrap) wrap.classList.remove("has-photo");
  tile.innerHTML = img.dataset.fb || "";
}

function exactPhotoFor(model, color){
  const entry = PHOTO_MAP[model];
  if (!entry || !color || !entry[color]) return "";
  return encodeURI(PHOTO_BASE + entry[color]);
}

/* ---------- Data shaping ---------- */
function groupFlatProducts(flatRows){
  const groups = [];
  const index = {};
  flatRows.forEach(row => {
    if (!row.model) return;
    const key = (row.category || "") + "||" + row.model;
    if (!(key in index)){
      index[key] = groups.length;
      groups.push({ category: row.category || "", model: row.model, variants: [] });
    }
    groups[index[key]].variants.push({
      storage: row.storage || "",
      condition: row.condition || "",
      color: row.color || "",
      price: row.price || null,
      msrp: row.msrp || null,
      imageUrl: row.image_url || ""
    });
  });
  return groups;
}

function uniq(arr){ return [...new Set(arr)]; }
function money(n){ return "$" + Number(n).toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0}); }

/* ---------- Live sync ---------- */
function setSyncStatus(state){
  const dot = document.getElementById("syncDot");
  const label = document.getElementById("syncLabel");
  if (!dot || !label) return;
  if (state === "live"){
    dot.style.background = "var(--green)";
    label.textContent = "Live inventory";
  } else if (state === "error"){
    dot.style.background = "var(--red)";
    label.textContent = "Showing saved inventory";
  } else {
    dot.style.background = "var(--ink-soft)";
    label.textContent = "Loading…";
  }
}

function updateStats(){
  const models = PRODUCTS.length;
  const configs = PRODUCTS.reduce((n, g) => n + g.variants.length, 0);
  document.getElementById("stat-count").textContent = models;
  document.getElementById("stat-variants").textContent = configs;
}

async function loadLiveInventory(){
  if (!LIVE_SHEET_URL){ setSyncStatus("error"); return; }
  try {
    const res = await fetch(LIVE_SHEET_URL);
    const flat = await res.json();
    if (!Array.isArray(flat)) throw new Error("Unexpected response shape");
    const grouped = groupFlatProducts(flat);
    if (!grouped.length) throw new Error("Empty inventory");
    PRODUCTS = grouped;
    setSyncStatus("live");
    updateStats();
    if (activeCategory !== "All" && !PRODUCTS.some(p => p.category === activeCategory)) activeCategory = "All";
    buildCategoryBar();
    render();
  } catch (err){
    console.error("Live inventory fetch failed, using saved snapshot:", err);
    PRODUCTS = SNAPSHOT_PRODUCTS;
    setSyncStatus("error");
  }
}

/* ---------- Category-aware hero copy ---------- */
const HERO_COPY = {
  "All": {
    eyebrow: "Open box &amp; certified pre-owned",
    headline: 'Retail-ready devices at <em>wholesale prices.</em>',
    sub: "Sourced direct from the three largest US carriers and leading insurance partners. Inspected, graded, data-wiped, and unlocked — priced well below retail."
  },
  "iPhone": {
    eyebrow: "iPhone · open box &amp; certified pre-owned",
    headline: 'Every iPhone, <em>priced right.</em>',
    sub: "From the latest 17 series back to the classics — inspected, unlocked, and ready to ship. Pick your storage and condition, see the price instantly."
  },
  "iPad": {
    eyebrow: "iPad · open box &amp; certified pre-owned",
    headline: 'iPad, for work or <em>anything else.</em>',
    sub: "Pro, Air, mini, and base models — Wi-Fi and cellular, inspected, and priced well below retail."
  },
  "Apple Watch": {
    eyebrow: "Apple Watch · open box &amp; certified pre-owned",
    headline: 'Apple Watch, <em>for less.</em>',
    sub: "Ultra, Series, and SE — every generation, inspected and ready to pair."
  },
  "Samsung": {
    eyebrow: "Samsung Galaxy · open box &amp; certified pre-owned",
    headline: 'Galaxy phones, <em>real savings.</em>',
    sub: "S series and Z Fold/Flip foldables — unlocked, inspected, and priced well below retail."
  },
  "Google": {
    eyebrow: "Google Pixel · open box &amp; certified pre-owned",
    headline: 'Pixel, <em>picked for you.</em>',
    sub: "Pixel Pro and standard models, inspected and unlocked for any carrier."
  },
  "MacBook": {
    eyebrow: "MacBook · open box &amp; certified pre-owned",
    headline: 'MacBooks that <em>just work.</em>',
    sub: "Pro and Air, Intel and Apple Silicon — inspected and ready for your next project."
  }
};
function updateHero(cat){
  const copy = HERO_COPY[cat] || HERO_COPY["All"];
  document.getElementById("heroEyebrow").innerHTML = '<span class="dot"></span> ' + copy.eyebrow;
  document.getElementById("heroHeadline").innerHTML = copy.headline;
  document.getElementById("heroSub").textContent = copy.sub;
}

/* ---------- Drawn fallbacks (used only when no photo exists) ---------- */
const tripleCam = '<g transform="translate(107,20)"><rect width="20" height="20" rx="6" fill="#0E2036" opacity="0.9"/><circle cx="6" cy="6" r="3.4" fill="#37567A"/><circle cx="14" cy="6" r="3.4" fill="#37567A"/><circle cx="6" cy="14" r="3.4" fill="#37567A"/></g>';
const dualCamDiag = '<g transform="translate(108,22)"><circle cx="5" cy="5" r="5.2" fill="#0E2036" opacity="0.9"/><circle cx="14" cy="14" r="5.2" fill="#0E2036" opacity="0.9"/><circle cx="5" cy="5" r="2.2" fill="#37567A"/><circle cx="14" cy="14" r="2.2" fill="#37567A"/></g>';
const singleCam = '<circle cx="115" cy="26" r="5" fill="#0E2036" opacity="0.9"/><circle cx="115" cy="26" r="2" fill="#37567A"/>';
const dynamicIsland = '<rect x="112" y="17" width="16" height="5" rx="2.5" fill="#0E2036"/>';
const notchClassic = '<path d="M108 14h24v6a4 4 0 0 1-4 4h-16a4 4 0 0 1-4-4z" fill="#0E2036"/>';

function svgWrap(inner, uid){
  return '<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet">' +
    '<defs><linearGradient id="scr-' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#2c5a8a"/><stop offset="100%" stop-color="#0b192c"/>' +
    '</linearGradient></defs>' +
    inner.split('url(#scr)').join('url(#scr-' + uid + ')') +
    '</svg>';
}
function phoneBody(cam, notch){
  return '<rect x="97" y="10" width="46" height="120" rx="13" fill="currentColor" opacity="0.85"/>' +
    '<rect x="101" y="14" width="38" height="112" rx="9" fill="url(#scr)"/>' + notch + cam;
}
function iphoneIcon(model, uid){
  let cam, notch;
  if (/Pro Max|XS Max|Pro/.test(model)){ cam = tripleCam; notch = dynamicIsland; }
  else if (/Plus|Air|Slim/.test(model)){ cam = dualCamDiag; notch = /1[4-7]|16e|17e/.test(model) ? dynamicIsland : notchClassic; }
  else { cam = /1[5-7]|16e|17e/.test(model) ? dualCamDiag : singleCam; notch = /1[5-7]|16e|17e/.test(model) ? dynamicIsland : notchClassic; }
  return svgWrap(phoneBody(cam, notch), uid);
}
function ipadIcon(uid){
  return svgWrap(
    '<rect x="75" y="14" width="90" height="112" rx="10" fill="currentColor" opacity="0.85"/>' +
    '<rect x="80.5" y="19.5" width="79" height="101" rx="5.5" fill="url(#scr)"/>' +
    '<rect x="88" y="34" width="52" height="5" rx="2.5" fill="#ffffff" opacity="0.2"/>' +
    '<rect x="88" y="43" width="38" height="5" rx="2.5" fill="#ffffff" opacity="0.14"/>', uid);
}
function watchIcon(model, uid){
  const big = /Ultra/.test(model);
  const w = big ? 76 : 68, h = big ? 96 : 88, x = 120 - w/2, y = 70 - h/2;
  return svgWrap(
    '<rect x="93" y="6" width="54" height="24" rx="9" fill="currentColor" opacity="0.4"/>' +
    '<rect x="93" y="104" width="54" height="24" rx="9" fill="currentColor" opacity="0.4"/>' +
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (big?24:18) + '" fill="currentColor" opacity="0.85"/>' +
    '<rect x="' + (x+6) + '" y="' + (y+6) + '" width="' + (w-12) + '" height="' + (h-12) + '" rx="' + (big?18:13) + '" fill="url(#scr)"/>' +
    '<circle cx="120" cy="70" r="15" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3"/>', uid);
}
function galaxySIcon(model, uid){
  const ultra = /Ultra/.test(model);
  const cam = ultra
    ? '<g transform="translate(109,18)"><rect width="22" height="34" rx="9" fill="#0E2036" opacity="0.9"/><circle cx="11" cy="9" r="3.6" fill="#5D4FA8"/><circle cx="11" cy="19" r="3.6" fill="#5D4FA8"/><circle cx="11" cy="29" r="3" fill="#5D4FA8"/></g>'
    : '<g transform="translate(110,20)"><rect width="20" height="26" rx="8" fill="#0E2036" opacity="0.9"/><circle cx="10" cy="8" r="3.4" fill="#5D4FA8"/><circle cx="10" cy="18" r="3" fill="#5D4FA8"/></g>';
  return svgWrap(
    '<rect x="101" y="16" width="38" height="108" rx="11" fill="currentColor" opacity="0.85"/>' +
    '<rect x="104.5" y="20.5" width="31" height="99" rx="7" fill="url(#scr)"/>' + cam, uid);
}
function galaxyZIcon(model, uid){
  if (/Fold/.test(model)){
    return svgWrap(
      '<g transform="translate(120,66) rotate(-8)"><rect x="-58" y="-42" width="56" height="84" rx="8" fill="currentColor" opacity="0.85"/><rect x="-54" y="-38" width="48" height="76" rx="5" fill="url(#scr)"/></g>' +
      '<g transform="translate(120,66) rotate(8)"><rect x="2" y="-42" width="56" height="84" rx="8" fill="currentColor" opacity="0.85"/><rect x="6" y="-38" width="48" height="76" rx="5" fill="url(#scr)"/></g>', uid);
  }
  return svgWrap(
    '<rect x="88" y="38" width="64" height="60" rx="10" fill="currentColor" opacity="0.85"/>' +
    '<rect x="93" y="43" width="54" height="50" rx="6" fill="url(#scr)"/>' +
    '<rect x="88" y="66" width="64" height="4" fill="#0E2036" opacity="0.4"/>', uid);
}
function pixelIcon(model, uid){
  const pro = /Pro/.test(model);
  return svgWrap(
    '<rect x="102" y="17" width="36" height="106" rx="10" fill="currentColor" opacity="0.85"/>' +
    '<rect x="105.5" y="30" width="29" height="86" rx="5.5" fill="url(#scr)"/>' +
    '<rect x="102" y="21" width="36" height="9" rx="4" fill="#0E2036" opacity="0.8"/>' +
    '<circle cx="112" cy="25.5" r="3" fill="#37567A"/>' +
    (pro ? '<circle cx="124" cy="25.5" r="3" fill="#37567A"/>' : ''), uid);
}
function macbookIcon(model, uid){
  const pro = /Pro/.test(model);
  return svgWrap(
    '<rect x="62" y="24" width="116" height="76" rx="5" fill="currentColor" opacity="0.85"/>' +
    '<rect x="66" y="28" width="108" height="68" rx="2.5" fill="url(#scr)"/>' +
    (pro ? '<rect x="112" y="28" width="16" height="6" rx="3" fill="#0E2036"/>' : '') +
    '<path d="M48 100h144l10 16a4 4 0 0 1-3.6 5.8H41.6A4 4 0 0 1 38 116z" fill="currentColor" opacity="0.55"/>', uid);
}
function getIcon(group, uid){
  switch(group.category){
    case "iPhone": return iphoneIcon(group.model, uid);
    case "iPad": return ipadIcon(uid);
    case "Apple Watch": return watchIcon(group.model, uid);
    case "Samsung": return /Fold|Flip/.test(group.model) ? galaxyZIcon(group.model, uid) : galaxySIcon(group.model, uid);
    case "Google": return pixelIcon(group.model, uid);
    case "MacBook": return macbookIcon(group.model, uid);
    default: return iphoneIcon(group.model, uid);
  }
}

/* ---------- Categories ---------- */
const CATEGORY_ORDER = ["iPhone", "iPad", "Apple Watch", "Samsung", "Google", "MacBook"];
const COMING_SOON = ["OnePlus", "Motorola", "Windows Laptops"];
let activeCategory = "All";

function buildCategoryBar(){
  const bar = document.getElementById("categoryBar");
  const footerCats = document.getElementById("footerCats");
  bar.innerHTML = "";
  footerCats.innerHTML = "";

  const allChip = document.createElement("button");
  allChip.className = "chip" + (activeCategory === "All" ? " active" : "");
  allChip.dataset.cat = "All";
  allChip.innerHTML = 'All Devices <span class="count">' + PRODUCTS.length + '</span>';
  bar.appendChild(allChip);

  const savedCount = savedList().length;
  if (savedCount){
    const savedChip = document.createElement("button");
    savedChip.className = "chip" + (activeCategory === "Saved" ? " active" : "");
    savedChip.dataset.cat = "Saved";
    savedChip.innerHTML = 'Saved <span class="count">' + savedCount + '</span>';
    bar.appendChild(savedChip);
  }

  CATEGORY_ORDER.forEach(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length;
    if (!count) return;
    const chip = document.createElement("button");
    chip.className = "chip" + (activeCategory === cat ? " active" : "");
    chip.dataset.cat = cat;
    chip.innerHTML = cat + ' <span class="count">' + count + '</span>';
    bar.appendChild(chip);

    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#catalog";
    link.textContent = cat;
    link.addEventListener("click", () => { hideDetail(); setCategory(cat); });
    li.appendChild(link);
    footerCats.appendChild(li);
  });

  COMING_SOON.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip soon";
    chip.disabled = true;
    chip.innerHTML = cat + ' <span class="count">soon</span>';
    bar.appendChild(chip);
  });

  bar.querySelectorAll(".chip:not(.soon)").forEach(chip => {
    chip.addEventListener("click", () => setCategory(chip.dataset.cat));
  });
}

function setCategory(cat, keepSearch){
  activeCategory = cat;
  // Picking a category is a fresh start — a stale query would silently hide
  // most of what the shopper just asked to see.
  if (!keepSearch) clearSearch(true);
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === cat));
  document.getElementById("catalogTitle").textContent =
    cat === "All" ? "All devices" : (cat === "Saved" ? "Saved devices" : cat);
  updateHero(cat === "Saved" ? "All" : cat);
  syncNavState();
  render();
  // Keep the catalog history entry in step with the filter, so backing out of a
  // product returns to the category the shopper was actually browsing.
  if (history.state && history.state.view === "catalog" && history.state.category !== cat){
    history.replaceState({ view: "catalog", category: cat }, "");
  }
}

/* ---------- Cards ---------- */
function bestDefaultVariant(group){
  return group.variants.find(v => v.price) || group.variants[0];
}
function lowestPrice(group){
  const priced = group.variants.filter(v => v.price).map(v => v.price);
  return priced.length ? Math.min(...priced) : null;
}
function bestSavings(group){
  let best = 0;
  group.variants.forEach(v => {
    if (v.price && v.msrp && v.msrp > v.price) best = Math.max(best, v.msrp - v.price);
  });
  return Math.round(best);
}

function cardHTML(group, groupIdx){
  const variantColors = uniq(group.variants.map(v => v.color)).filter(Boolean);
  const colors = variantColors.length ? variantColors : getReferenceColors(group.model);
  const initial = bestDefaultVariant(group);
  const initialColor = variantColors.length ? (initial.color || "") : (colors[0] || "");
  const photoUrl = initial.imageUrl || localPhotoFor(group.model, initialColor);

  const fallbackSvg = getIcon(group, groupIdx);
  const media = photoUrl
    ? '<img src="' + photoUrl + '" alt="' + group.model + '" loading="lazy" decoding="async" onerror="onPhotoError(this)" data-fb="' + fallbackSvg.replace(/"/g, "&quot;") + '">'
    : fallbackSvg;

  const configs = group.variants.length;
  const low = lowestPrice(group);
  const savings = bestSavings(group);

  const key = savedKey(group);
  const isSaved = isSavedModel(key);

  return '' +
    '<div class="card" data-group="' + groupIdx + '">' +
      (savings >= 50 ? '<div class="price-drop">Save ' + money(savings) + '</div>' : '') +
      '<button class="save-btn' + (isSaved ? ' saved' : '') + '" data-save="' + escAttr(key) + '" ' +
        'aria-label="' + (isSaved ? 'Remove from saved' : 'Save') + ' ' + escAttr(group.model) + '" ' +
        'aria-pressed="' + isSaved + '">' + HEART_SVG + '</button>' +
      '<div class="card-icon' + (photoUrl ? ' has-photo' : '') + '">' + media + '</div>' +
      '<h3>' + group.model + '</h3>' +
      '<div class="qty-label">' + configs + ' configuration' + (configs === 1 ? '' : 's') + '</div>' +
      (low
        ? '<div class="card-price"><span class="from">from </span>' + money(low) + '</div>'
        : '<div class="card-price contact">Contact for price</div>') +
    '</div>';
}

const HEART_SVG = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.3l-1.5-1.36C5.4 14.36 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.86-8.5 11.44z" fill="currentColor" fill-opacity="var(--heart-fill,0)" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

function escAttr(s){
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/* ---------- Product detail: stepped configurator ----------
   Left column holds a sticky visual and a progress rail that advances as the
   shopper works down the steps on the right. Choosing an option marks the step
   complete and scrolls the next one into view. */
let renderedList = [];
let detailGroup = null;
let detailSteps = [];
let detailSelection = { storage: "", condition: "", color: "", colorMode: "reference" };
let stepObserver = null;

function slugify(s){
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function findVariant(group, storage, condition, color){
  return group.variants.find(v =>
    v.storage === storage && v.condition === condition && (color ? v.color === color : true));
}

/* Restores a product view from a history entry. A stored index would go stale
   whenever the category or search changed, so we look the model up by name. */
function showDetailFromState(state){
  if (state.from && state.from !== activeCategory) setCategory(state.from);
  let idx = renderedList.findIndex(g => g.model === state.model && g.category === state.category);
  if (idx === -1){
    clearSearch(true);
    setCategory(state.category, true);
    idx = renderedList.findIndex(g => g.model === state.model && g.category === state.category);
  }
  if (idx === -1){ hideDetail(); return; }
  showDetail(idx, true);
}

function isDetailOpen(){
  return document.getElementById("detailPage").style.display === "block";
}

/* Build the ordered list of steps this model actually needs. */
function buildSteps(group){
  const storages = uniq(group.variants.map(v => v.storage)).filter(Boolean);
  const conditions = uniq(group.variants.map(v => v.condition)).filter(Boolean);
  const variantColors = uniq(group.variants.map(v => v.color)).filter(Boolean);
  const colors = variantColors.length ? variantColors : getReferenceColors(group.model);

  const steps = [];
  if (storages.length) steps.push({ key: "storage", icon: "sd_card", label: "Capacity", title: "Choose your capacity.", hint: "How much storage do you need?", options: storages });
  if (colors.length)   steps.push({ key: "color",   icon: "palette", label: "Finish",   title: "Pick a finish.",        hint: "Colors this model was produced in.", options: colors });
  if (conditions.length) steps.push({ key: "condition", icon: "verified", label: "Condition", title: "Choose a grade.",  hint: "Every device ships carrier-unlocked and data-wiped.", options: conditions });
  steps.push({ key: "summary", icon: "receipt_long", label: "Summary", title: "Your configuration.", hint: "", options: [] });
  return steps;
}

/* Capacity is step one, so every listed capacity stays selectable. Condition
   comes later and is filtered against the capacity already chosen. */
function storageAvailable(group, storage){
  return group.variants.some(v => v.storage === storage);
}
function conditionAvailable(group, condition){
  if (!detailSelection.storage) return group.variants.some(v => v.condition === condition);
  return group.variants.some(v => v.condition === condition && v.storage === detailSelection.storage);
}

function stepBodyHTML(group, step, index){
  if (step.key === "storage"){
    return '<div class="option-tiles" data-role="d-storage">' + step.options.map(s => {
      const exists = group.variants.some(v => v.storage === s);
      const priced = group.variants.filter(v => v.storage === s && v.price).map(v => v.price);
      const sub = priced.length ? "from " + money(Math.min(...priced)) : "Contact for price";
      return '<button type="button" class="tile' + (s === detailSelection.storage ? " selected" : "") + (exists ? "" : " unavailable") + '" data-storage="' + s + '">' +
        '<div class="tile-main">' + s + '</div><div class="tile-sub' + (priced.length ? " avail" : "") + '">' + sub + '</div></button>';
    }).join("") + '</div>';
  }
  if (step.key === "color"){
    const note = detailSelection.colorMode === "reference"
      ? '<div class="color-note">Full factory color lineup — message us to confirm which are in stock right now.</div>' : "";
    return '<div class="swatch-row" data-role="d-color">' + step.options.map(c =>
      '<button type="button" class="swatch' + (c === detailSelection.color ? " selected" : "") + '" data-color="' + c + '" title="' + c + '" aria-label="' + c + '" style="background:' + colorHex(c) + ';"></button>'
    ).join("") + '</div>' +
    '<div class="swatch-meta"><span class="color-name" data-role="d-color-name">' + (detailSelection.color || "") + '</span></div>' + note;
  }
  if (step.key === "condition"){
    return '<div class="option-tiles" data-role="d-condition">' + step.options.map(c => {
      const exists = group.variants.some(v => v.condition === c);
      return '<button type="button" class="tile' + (c === detailSelection.condition ? " selected" : "") + (exists ? "" : " unavailable") + '" data-condition="' + c + '">' +
        '<div class="tile-main">' + c + '</div><div class="tile-sub">' + CONDITION_BLURB(c) + '</div></button>';
    }).join("") + '</div>';
  }
  // summary
  return '<div class="summary-rows" id="summaryRows"></div>' +
    '<div class="detail-price-row" id="detailPriceRow"></div>' +
    '<div class="stock-status-detail" id="detailStock"></div>' +
    '<button class="btn btn-primary btn-lg detail-buy" id="addToCartBtn">' +
      '<span class="material-symbols-outlined" style="font-size:19px;">add_shopping_cart</span>' +
      '<span id="addBtnText">Add to cart</span></button>' +
    '<a class="btn btn-secondary btn-lg detail-buy" href="#" id="detailBuyBtn" rel="noopener" target="_blank" style="margin-top:9px;">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36c1.36.72 2.9 1.13 4.53 1.13h.01c5.46 0 9.9-4.45 9.9-9.91C21.87 6.45 17.5 2 12.04 2z"></path></svg>' +
      '<span id="buyBtnText">Ask on WhatsApp</span></a>' +
    '<div class="detail-reassure">' +
      '<span><span class="material-symbols-outlined">verified_user</span>30-day warranty on eligible items</span>' +
      '<span><span class="material-symbols-outlined">local_shipping</span>Ships next business day</span>' +
      '<span><span class="material-symbols-outlined">sim_card</span>Carrier unlocked</span>' +
    '</div>';
}

function CONDITION_BLURB(c){
  const k = String(c).toLowerCase();
  if (k === "new") return "Sealed, unused";
  if (k.indexOf("a+") !== -1) return "Inspected, minimal wear";
  if (k.indexOf("open box") !== -1) return "Unused or lightly used";
  if (k.indexOf("excellent") !== -1) return "Light cosmetic wear";
  if (k.indexOf("good") !== -1) return "Visible wear, fully working";
  return "Graded &amp; function-tested";
}

function showDetail(idx, fromHistory){
  const group = renderedList[idx];
  if (!group) return;
  detailGroup = group;

  if (!fromHistory){
    history.pushState(
      { view: "detail", category: group.category, model: group.model, from: activeCategory },
      "", "#" + slugify(group.model)
    );
  }

  const variantColors = uniq(group.variants.map(v => v.color)).filter(Boolean);
  const hasVariantColors = variantColors.length > 0;
  const colors = hasVariantColors ? variantColors : getReferenceColors(group.model);
  const initial = bestDefaultVariant(group);
  // Open on a colour we hold a photo of, so the stage shows a real device.
  const photographed = colors.find(c => exactPhotoFor(group.model, c));

  detailSelection = {
    storage: initial.storage || "",
    condition: initial.condition || "",
    color: hasVariantColors ? (initial.color || "") : (photographed || colors[0] || ""),
    colorMode: hasVariantColors ? "variant" : "reference"
  };

  detailSteps = buildSteps(group);

  const breadcrumb = document.getElementById("detailBreadcrumb");
  breadcrumb.innerHTML =
    '<button type="button" data-nav="home">Home</button> <span class="sep">/</span> ' +
    '<button type="button" data-nav="all">Devices</button> <span class="sep">/</span> ' +
    '<button type="button" data-nav="category" data-category="' + group.category + '">' + group.category + '</button> <span class="sep">/</span> ' +
    '<span class="crumb-current">' + group.model + '</span>';
  breadcrumb.querySelectorAll("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.nav === "category" ? btn.dataset.category : "All";
      history.replaceState({ view: "catalog", category: cat }, "");
      hideDetail();
      setCategory(cat);
      if (btn.dataset.nav === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const skuBase = group.model.toLowerCase().startsWith(group.category.toLowerCase())
    ? group.model : group.category + " " + group.model;
  document.getElementById("detailSku").textContent =
    "SKU: " + skuBase.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  document.getElementById("detailTitle").textContent = group.model;

  // steps
  document.getElementById("configSteps").innerHTML = detailSteps.map((step, i) =>
    '<section class="step" id="step-' + step.key + '" data-step="' + step.key + '" data-index="' + i + '">' +
      '<div class="step-head">' +
        '<span class="step-icon"><span class="material-symbols-outlined">' + step.icon + '</span></span>' +
        '<span class="step-num">Step ' + (i + 1) + '</span>' +
        '<h2 class="step-title">' + step.title + '</h2></div>' +
      (step.hint ? '<div class="step-hint">' + step.hint + '</div>' : '') +
      stepBodyHTML(group, step, i) +
    '</section>'
  ).join("");

  // rail
  document.getElementById("stepRail").innerHTML = detailSteps.map((step, i) =>
    '<li class="rail-item" data-rail="' + step.key + '">' +
      '<span class="rail-dot">' + (i + 1) + '</span>' +
      '<span class="rail-label">' + step.label + '</span>' +
      '<span class="rail-value" data-rail-value="' + step.key + '"></span>' +
    '</li>'
  ).join("");

  wireSteps(group);
  updateDetailView(group);
  syncDetailSaveButton();
  pushRecent(group);

  setView("detail");
  window.scrollTo(0, 0);
  // Measured only once the page is on screen — a hidden element reports zero
  // height, which would pick the wrong scroll root for the step observer.
  sizeConfigLayout();
  observeSteps();
  setActiveStep(0);
  const scroller = stepsScroller();
  if (scroller) scroller.scrollTop = 0;
}

function hideDetail(){
  if (stepObserver){ stepObserver.disconnect(); stepObserver = null; }
  if (currentView === "detail") setView("catalog");
}

function stepIndex(key){
  return detailSteps.findIndex(s => s.key === key);
}

/* Advance to the next step the way Apple's buy flow does. The rail moves on the
   selection itself, not just on scroll, so it still advances when every step
   already fits on screen.

   On desktop the steps column is its own scroll container, so advancing scrolls
   *inside* it and the page never moves — the device on the left stays fully
   visible for the whole configuration. Page scrolling would eventually run past
   the layout and release the sticky visual. */
function stepsScroller(){
  const el = document.getElementById("configSteps");
  return el && el.scrollHeight > el.clientHeight + 4 ? el : null;
}

/* Sizes both configurator columns to the space actually left below the point
   where the layout begins. Measuring from the viewport alone ignores the
   breadcrumb and title above it, which made the column overrun the fold and
   hide the step rail. */
function sizeConfigLayout(){
  const layout = document.querySelector(".config-layout");
  if (!layout) return;
  if (window.innerWidth <= 880){ layout.style.removeProperty("--cfg-h"); return; }
  const docTop = layout.getBoundingClientRect().top + window.scrollY;
  const avail = window.innerHeight - docTop - 20;
  layout.style.setProperty("--cfg-h", Math.max(280, Math.round(avail)) + "px");
}

/* Scrolls a step into view inside whichever container is actually scrolling.

   Measured with getBoundingClientRect, never offsetTop: the steps column is not
   a positioned element, so offsetTop reports a distance from <body> and
   overshoots badly. And when a step is taller than the container (the summary
   usually is), its bottom is aligned instead of its top — otherwise the buy
   buttons sit below the fold and have to be hunted for. */
function scrollStepIntoView(el, isLast){
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = smooth ? "smooth" : "auto";
  const scroller = stepsScroller();
  if (!scroller){
    el.scrollIntoView({ behavior: behavior, block: isLast ? "end" : "start" });
    return;
  }
  const pad = 8;
  const cRect = scroller.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const delta = eRect.top - cRect.top;               // step position within the container
  const overflows = eRect.height > cRect.height - pad * 2;
  const max = scroller.scrollHeight - scroller.clientHeight;
  // The final step runs to the very end, so the buy buttons land clear of the
  // fold rather than sitting right on it.
  let target = isLast
    ? max
    : (overflows
        ? scroller.scrollTop + delta + eRect.height - cRect.height + pad   // bottom-align
        : scroller.scrollTop + delta - pad);                               // top-align
  target = Math.max(0, Math.min(target, max));
  scroller.scrollTo({ top: target, behavior: behavior });
}

function advanceFrom(key){
  const nextIndex = stepIndex(key) + 1;
  const next = detailSteps[nextIndex];
  if (!next) return;
  setActiveStep(nextIndex);
  const el = document.getElementById("step-" + next.key);
  if (!el) return;
  const isLast = nextIndex === detailSteps.length - 1;
  setTimeout(() => scrollStepIntoView(el, isLast), 120);
}

function wireSteps(group){
  document.querySelectorAll('#configSteps [data-storage]').forEach(tile => {
    tile.addEventListener("click", () => {
      if (tile.classList.contains("unavailable")) return;
      detailSelection.storage = tile.dataset.storage;
      // Keep the configuration valid: a capacity change can rule out the grade
      // that was selected, so fall to the first grade this capacity comes in.
      if (!conditionAvailable(group, detailSelection.condition)){
        const firstOk = group.variants.find(v => v.storage === detailSelection.storage && v.condition);
        if (firstOk) detailSelection.condition = firstOk.condition;
      }
      updateDetailView(group);
      advanceFrom("storage");
    });
  });
  document.querySelectorAll('#configSteps [data-condition]').forEach(tile => {
    tile.addEventListener("click", () => {
      if (tile.classList.contains("unavailable")) return;
      detailSelection.condition = tile.dataset.condition;
      updateDetailView(group);
      advanceFrom("condition");
    });
  });
  document.querySelectorAll('#configSteps .swatch[data-color]').forEach(sw => {
    sw.addEventListener("click", () => {
      detailSelection.color = sw.dataset.color;
      updateDetailView(group);
      advanceFrom("color");
    });
  });
  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) addBtn.addEventListener("click", () => addCurrentToCart(group));
}

/* Highlights the step in view and slides the rail fill alongside it. */
function observeSteps(){
  if (stepObserver) stepObserver.disconnect();
  if (!("IntersectionObserver" in window)) return;
  // Observe against the steps scroller when there is one, so the active step
  // tracks the column's own scrolling rather than the window's.
  const root = stepsScroller();
  stepObserver = new IntersectionObserver((entries) => {
    let best = null;
    entries.forEach(e => {
      if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
    });
    if (best) setActiveStep(parseInt(best.target.dataset.index, 10));
  }, { root: root, rootMargin: root ? "-10% 0px -60% 0px" : "-18% 0px -55% 0px", threshold: [0.1, 0.5, 1] });
  document.querySelectorAll("#configSteps .step").forEach(el => stepObserver.observe(el));
}

let activeStepIndex = 0;

function setActiveStep(index){
  activeStepIndex = index;
  document.querySelectorAll("#configSteps .step").forEach(el => {
    el.classList.toggle("is-active", parseInt(el.dataset.index, 10) === index);
  });
  const items = [...document.querySelectorAll("#stepRail .rail-item")];
  items.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    el.classList.toggle("done", i < index);
    const dot = el.querySelector(".rail-dot");
    if (i < index) dot.innerHTML = '<span class="material-symbols-outlined">check</span>';
    else dot.textContent = String(i + 1);
  });
  measureRail(index);
}

/* Positions the rail track and its fill against the real dot centres.
   offsetTop is unusable here because each .rail-item is itself positioned. */
function measureRail(index){
  const rail = document.getElementById("stepRail");
  const items = [...document.querySelectorAll("#stepRail .rail-item")];
  if (!rail || items.length < 2) return;
  const centre = (el) => {
    const r = el.querySelector(".rail-dot").getBoundingClientRect();
    return r.top + r.height / 2;
  };
  const railTop = rail.getBoundingClientRect().top;
  const first = centre(items[0]);
  const last = centre(items[items.length - 1]);
  const target = centre(items[Math.max(0, Math.min(index, items.length - 1))]);
  rail.style.setProperty("--rail-top", (first - railTop) + "px");
  rail.style.setProperty("--rail-span", (last - first) + "px");
  rail.style.setProperty("--rail-fill", Math.max(0, target - first) + "px");
}

function updateDetailView(group){
  const { storage, condition, color, colorMode } = detailSelection;
  const colorForMatch = colorMode === "variant" ? color : null;
  let variant = findVariant(group, storage, condition, colorForMatch);
  const available = !!variant;

  if (!variant){
    variant = group.variants.find(v => v.storage === storage && v.condition === condition)
      || group.variants.find(v => v.storage === storage)
      || group.variants.find(v => v.condition === condition)
      || group.variants[0];
  }

  const displayColor = colorMode === "variant" ? (variant.color || "") : color;
  // Exact colour match only — another colour's photo would misrepresent the pick.
  const photoUrl = variant.imageUrl || exactPhotoFor(group.model, displayColor);
  const fallbackSvg = getIcon(group, "detail");
  const stage = document.getElementById("detailImage");
  stage.innerHTML = '<div class="visual-glow"></div>' + (photoUrl
    ? '<img class="swap" decoding="async" src="' + photoUrl + '" alt="' + group.model + ' ' + displayColor + '" onerror="onPhotoError(this)" data-fb="' + fallbackSvg.replace(/"/g, "&quot;") + '">'
    : fallbackSvg);
  stage.classList.toggle("has-photo", !!photoUrl);
  stage.style.setProperty("--stage-glow", hexToGlow(colorHex(displayColor)));

  document.getElementById("vcMain").textContent = displayColor || group.model;
  document.getElementById("vcSub").textContent = [storage, condition].filter(Boolean).join(" · ");

  const colorNameEl = document.querySelector('[data-role="d-color-name"]');
  if (colorNameEl) colorNameEl.textContent = displayColor;

  // rail values
  const railVal = (k, v) => {
    const el = document.querySelector('[data-rail-value="' + k + '"]');
    if (el) el.textContent = v || "";
  };
  railVal("storage", storage);
  railVal("color", displayColor);
  railVal("condition", condition);

  // summary
  const rows = document.getElementById("summaryRows");
  if (rows){
    const row = (icon, label, value) =>
      '<div class="summary-row"><span><span class="material-symbols-outlined">' + icon + '</span>' + label + '</span><span>' + value + '</span></div>';
    rows.innerHTML =
      row("smartphone", "Model", group.model) +
      (storage ? row("sd_card", "Capacity", storage) : '') +
      (displayColor ? row("palette", "Finish", displayColor) : '') +
      (condition ? row("verified", "Condition", condition) : '') +
      row("sim_card", "Carrier", "Unlocked");
  }

  const priceRow = document.getElementById("detailPriceRow");
  if (priceRow){
    if (variant.price){
      const savings = variant.msrp && variant.msrp > variant.price ? Math.round(variant.msrp - variant.price) : 0;
      priceRow.innerHTML =
        '<div class="price">' + money(variant.price) + '</div>' +
        // Only show a struck-through MSRP when it is genuinely above the price;
        // a reference price below what we charge reads as an error to a buyer.
        (variant.msrp && variant.msrp > variant.price ? '<div class="msrp">' + money(variant.msrp) + '</div>' : '') +
        (savings > 0 ? '<div class="savings">Save ' + money(savings) + '</div>' : '');
    } else {
      priceRow.innerHTML = '<div class="price contact">Contact for price</div>';
    }
  }

  const stockEl = document.getElementById("detailStock");
  const buyBtn = document.getElementById("detailBuyBtn");
  const buyBtnText = document.getElementById("buyBtnText");
  if (stockEl){
    if (available){
      stockEl.innerHTML = '<span class="material-symbols-outlined">check_circle</span> In stock &amp; ready to ship';
      stockEl.className = "stock-status-detail in-stock";
      if (buyBtnText) buyBtnText.textContent = "Ask on WhatsApp";
    } else {
      const missing = (colorMode === "variant" ? [storage, condition, color] : [storage, condition]).filter(Boolean).join(" / ");
      stockEl.innerHTML = '<span class="material-symbols-outlined">help</span> Not listed in ' + missing + ' — ask us';
      stockEl.className = "stock-status-detail out-stock";
      if (buyBtnText) buyBtnText.textContent = "Ask about this config";
    }
  }
  if (buyBtn){
    const parts = [group.model, storage, displayColor].filter(Boolean).join(" ");
    const msg = encodeURIComponent("Hi! I'm interested in the " + parts + " (" + (condition || "any condition") + ") listed on the FM Cellular site.");
    buyBtn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
  }

  // selection + availability states
  document.querySelectorAll('#configSteps [data-storage]').forEach(tile => {
    tile.classList.toggle("unavailable", !storageAvailable(group, tile.dataset.storage));
    tile.classList.toggle("selected", tile.dataset.storage === detailSelection.storage);
  });
  document.querySelectorAll('#configSteps [data-condition]').forEach(tile => {
    tile.classList.toggle("unavailable", !conditionAvailable(group, tile.dataset.condition));
    tile.classList.toggle("selected", tile.dataset.condition === detailSelection.condition);
  });
  document.querySelectorAll('#configSteps .swatch[data-color]').forEach(sw => {
    if (colorMode === "variant"){
      const exists = group.variants.some(v => v.color === sw.dataset.color && v.storage === detailSelection.storage && v.condition === detailSelection.condition);
      sw.classList.toggle("unavailable", !exists);
    } else {
      sw.classList.remove("unavailable");
    }
    sw.classList.toggle("selected", sw.dataset.color === detailSelection.color);
  });
}

/* Tints the stage glow toward the selected finish. */
function hexToGlow(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex));
  if (!m) return "rgba(41,171,226,.18)";
  return "rgba(" + parseInt(m[1],16) + "," + parseInt(m[2],16) + "," + parseInt(m[3],16) + ",.26)";
}
/* ---------- Render ---------- */
let searchTerm = "";

/* One matcher for every search surface. Colours are matched against the
   model's reference lineup as well as variant data, because the inventory
   sheet often carries no colour column but the site still advertises them. */
function productMatches(p, term){
  if (p.model.toLowerCase().includes(term)) return true;
  if (p.category.toLowerCase().includes(term)) return true;
  if (p.variants.some(v =>
    (v.storage || "").toLowerCase().includes(term) ||
    (v.condition || "").toLowerCase().includes(term) ||
    (v.color || "").toLowerCase().includes(term))) return true;
  return getReferenceColors(p.model).some(c => c.toLowerCase().includes(term));
}

/* Search deliberately ignores the active category: a query should be able to
   find anything on the site, not just what is on screen. */
function currentList(){
  const q = searchTerm.trim().toLowerCase();
  if (q) return PRODUCTS.filter(p => productMatches(p, q));
  if (activeCategory === "Saved") return PRODUCTS.filter(p => isSavedModel(savedKey(p)));
  if (activeCategory === "All") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === activeCategory);
}

function render(){
  const grid = document.getElementById("grid");
  const list = currentList();
  renderedList = list;

  const q = searchTerm.trim();
  document.getElementById("catalogTitle").textContent = q
    ? 'Results for "' + q + '"'
    : (activeCategory === "All" ? "All devices" : (activeCategory === "Saved" ? "Saved devices" : activeCategory));

  document.getElementById("resultCount").textContent =
    list.length + " model" + (list.length === 1 ? "" : "s") +
    " · " + list.reduce((n, g) => n + g.variants.length, 0) + " configurations" +
    (q ? " · searching all categories" : "");

  const clearBtn = document.getElementById("clearSearchBtn");
  clearBtn.classList.toggle("show", !!q);
  document.getElementById("clearSearchLabel").textContent = "Clear search";

  if (!list.length){
    grid.innerHTML = '<div class="empty-state">' +
      (activeCategory === "Saved" && !q
        ? "Nothing saved yet. Tap the heart on any device to keep it here."
        : "No matches for that search.") +
      '<br><button class="btn btn-secondary" id="emptyReset">Show all devices</button></div>';
    const reset = document.getElementById("emptyReset");
    if (reset) reset.addEventListener("click", () => { clearSearch(); setCategory("All"); });
    return;
  }
  grid.innerHTML = list.map((g, i) => cardHTML(g, i)).join("");
  wireCards(grid);
}

/* Press feedback fires on pointer-down, not click — waiting for release
   reads as lag. Cancelling the press if the pointer leaves keeps taps
   escapable, the way native controls behave. */
function wireCards(scope){
  scope.querySelectorAll(".card").forEach(cardEl => {
    const release = () => cardEl.classList.remove("pressed");
    cardEl.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".save-btn")) return;
      cardEl.classList.add("pressed");
    });
    cardEl.addEventListener("pointerup", release);
    cardEl.addEventListener("pointerleave", release);
    cardEl.addEventListener("pointercancel", release);
    cardEl.addEventListener("click", (e) => {
      if (e.target.closest(".save-btn")) return;
      release();
      showDetail(parseInt(cardEl.dataset.group, 10));
    });
  });
  scope.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const nowSaved = toggleSaved(btn.dataset.save);
      btn.classList.toggle("saved", nowSaved);
      btn.setAttribute("aria-pressed", String(nowSaved));
      btn.classList.remove("pop");
      void btn.offsetWidth;
      if (nowSaved) btn.classList.add("pop");
    });
  });
}

/* ---------- Saved devices (this browser only) ---------- */
const SAVED_STORE = "fm.saved.v1";
let savedSet = null;

function savedKey(group){ return group.category + "|" + group.model; }

function savedList(){
  if (savedSet) return [...savedSet];
  savedSet = new Set();
  try {
    const raw = localStorage.getItem(SAVED_STORE);
    if (raw) JSON.parse(raw).forEach(k => savedSet.add(k));
  } catch (err){ /* private mode or storage disabled — stay in memory */ }
  return [...savedSet];
}
function isSavedModel(key){ savedList(); return savedSet.has(key); }
function persistSaved(){
  try { localStorage.setItem(SAVED_STORE, JSON.stringify([...savedSet])); }
  catch (err){ /* non-fatal: the session still works, it just will not persist */ }
}
function toggleSaved(key){
  savedList();
  const nowSaved = !savedSet.has(key);
  if (nowSaved) savedSet.add(key); else savedSet.delete(key);
  persistSaved();
  updateSavedBadge();
  buildCategoryBar();
  if (activeCategory === "Saved") render();
  syncDetailSaveButton();
  return nowSaved;
}
function updateSavedBadge(){
  const n = savedList().length;
  const badge = document.getElementById("savedBadge");
  badge.textContent = n;
  badge.classList.toggle("show", n > 0);
}

/* ---------- Recently viewed ---------- */
const RECENT_STORE = "fm.recent.v1";
/* Mirrored in memory so the feature still works for the session when storage
   is unavailable (private windows, blocked site data). */
let recentMem = null;
function recentList(){
  if (recentMem) return recentMem;
  recentMem = [];
  try {
    const raw = localStorage.getItem(RECENT_STORE);
    if (raw) recentMem = JSON.parse(raw) || [];
  } catch (err){ /* storage blocked — stay in memory */ }
  return recentMem;
}
function pushRecent(group){
  const key = savedKey(group);
  recentMem = recentList().filter(k => k !== key);
  recentMem.unshift(key);
  recentMem = recentMem.slice(0, 12);
  try { localStorage.setItem(RECENT_STORE, JSON.stringify(recentMem)); } catch (err){}
  renderRecent();
}
function renderRecent(){
  const section = document.getElementById("recentSection");
  const rail = document.getElementById("recentRail");
  const keys = recentList();
  const items = keys.map(k => PRODUCTS.find(p => savedKey(p) === k)).filter(Boolean);
  if (!items.length){ section.style.display = "none"; return; }
  section.style.display = "";
  rail.innerHTML = items.map(g => {
    const colors = uniq(g.variants.map(v => v.color)).filter(Boolean);
    const c = colors.length ? colors[0] : (getReferenceColors(g.model)[0] || "");
    const photo = localPhotoFor(g.model, c);
    return '<button class="recent-card" data-recent="' + escAttr(savedKey(g)) + '">' +
      '<div class="rc-img">' + (photo
        ? '<img src="' + photo + '" alt="" loading="lazy" decoding="async">'
        : getIcon(g, "r" + slugify(g.model))) + '</div>' +
      '<div class="rc-name">' + g.model + '</div></button>';
  }).join("");
  rail.querySelectorAll("[data-recent]").forEach(btn => {
    btn.addEventListener("click", () => openByKey(btn.dataset.recent));
  });
}

/* Opens a product from anywhere by its stable key, regardless of the
   category or search currently applied. */
function openByKey(key){
  const group = PRODUCTS.find(p => savedKey(p) === key);
  if (!group) return;
  clearSearch(true);
  if (activeCategory !== "All" && activeCategory !== group.category) setCategory("All", true);
  render();
  const idx = renderedList.findIndex(p => savedKey(p) === key);
  if (idx > -1) showDetail(idx);
}

/* ---------- Category icons for the nav flyout ---------- */
const CAT_ICONS = {
  "iPhone": '<svg viewBox="0 0 48 48" fill="none"><rect x="16" y="6" width="16" height="36" rx="4" stroke="currentColor" stroke-width="2"/><rect x="21" y="8.5" width="6" height="2" rx="1" fill="currentColor"/></svg>',
  "iPad": '<svg viewBox="0 0 48 48" fill="none"><rect x="11" y="7" width="26" height="34" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="37.5" r="1.2" fill="currentColor"/></svg>',
  "Apple Watch": '<svg viewBox="0 0 48 48" fill="none"><rect x="16" y="14" width="16" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M19 14V9h10v5M19 34v5h10v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M33 21v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  "Samsung": '<svg viewBox="0 0 48 48" fill="none"><rect x="15" y="6" width="18" height="36" rx="4" stroke="currentColor" stroke-width="2"/><rect x="19" y="11" width="5" height="9" rx="2.5" stroke="currentColor" stroke-width="1.6"/></svg>',
  "Google": '<svg viewBox="0 0 48 48" fill="none"><rect x="15" y="6" width="18" height="36" rx="4" stroke="currentColor" stroke-width="2"/><path d="M15 13h18" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="10" r="1.4" fill="currentColor"/></svg>',
  "MacBook": '<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="12" width="28" height="19" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 35h38l-2 3H7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  "Saved": '<svg viewBox="0 0 48 48" fill="none"><path d="M24 39l-3-2.7C13.4 29.5 8 24.6 8 18.6 8 13.7 11.9 10 16.8 10c2.8 0 5.4 1.3 7.2 3.3 1.8-2 4.4-3.3 7.2-3.3 4.9 0 8.8 3.7 8.8 8.6 0 6-5.4 10.9-13 17.7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  "All": '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2"/><rect x="26" y="8" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2"/><rect x="8" y="26" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2"/><rect x="26" y="26" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2"/></svg>',
  "Support": '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="15" stroke="currentColor" stroke-width="2"/><path d="M20 20a4 4 0 1 1 5 3.9V27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="32" r="1.4" fill="currentColor"/></svg>'
};

const NAV_SECTIONS = [
  { id: "about", label: "About Us", view: true, icon: "storefront" },
  { id: "reviews", label: "Reviews", view: true, icon: "reviews" },
  { id: "faq", label: "FAQ", icon: "help" },
  { id: "warranty", label: "Warranty", icon: "verified_user" },
  { id: "returns", label: "Returns", icon: "assignment_return" },
  { id: "shipping", label: "Shipping", icon: "local_shipping" },
  { id: "policies", label: "Terms", icon: "gavel" },
  { id: "contact", label: "Contact", icon: "forum" }
];

/* ---------- Nav: links, flyout, mobile menu ---------- */
function catCount(cat){ return PRODUCTS.filter(p => p.category === cat).length; }

function buildNav(){
  const nav = document.getElementById("navLinks");
  const cats = CATEGORY_ORDER.filter(c => catCount(c) > 0);
  nav.innerHTML =
    '<button class="nav-link" data-flyout="shop">Shop</button>' +
    cats.map(c => '<button class="nav-link" data-cat="' + escAttr(c) + '">' + c + '</button>').join("") +
    '<button class="nav-link" data-flyout="support">Support</button>';

  nav.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => { closeFlyout(); goToCategory(btn.dataset.cat); });
  });
  nav.querySelectorAll("[data-flyout]").forEach(btn => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); openFlyout(btn.dataset.flyout, btn); });
  });

  // mobile menu mirrors the same destinations
  const mm = document.getElementById("mobileMenuInner");
  mm.innerHTML =
    '<button class="mm-item" data-cat="All">All devices <span class="mm-count">' + PRODUCTS.length + '</span></button>' +
    cats.map(c => '<button class="mm-item" data-cat="' + escAttr(c) + '">' + c + ' <span class="mm-count">' + catCount(c) + '</span></button>').join("") +
    '<button class="mm-item" data-cat="Saved">Saved <span class="mm-count" id="mmSaved">' + savedList().length + '</span></button>' +
    '<button class="mm-item" data-view="cart">Cart <span class="mm-count">' + cartCount() + '</span></button>' +
    '<div class="mm-sub" style="margin-top:18px;">Support</div>' +
    NAV_SECTIONS.map(s => '<button class="mm-item" ' + (s.view ? 'data-view="' + s.id + '"' : 'data-jump="' + s.id + '"') +
      ' style="font-size:1rem;font-weight:500;">' + s.label + '</button>').join("");
  mm.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => { closeMobileMenu(); goToCategory(btn.dataset.cat); });
  });
  mm.querySelectorAll("[data-jump]").forEach(btn => {
    btn.addEventListener("click", () => { closeMobileMenu(); jumpTo(btn.dataset.jump); });
  });
  mm.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => { closeMobileMenu(); goView(btn.dataset.view); });
  });
  syncNavState();
}

function syncNavState(){
  document.querySelectorAll("#navLinks [data-cat]").forEach(b => {
    b.classList.toggle("open", b.dataset.cat === activeCategory);
  });
}

function goToCategory(cat){
  if (currentView !== "catalog"){ history.pushState({ view: "catalog", category: cat }, "", "#catalog"); }
  setView("catalog");
  setCategory(cat);
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
}

let flyoutKey = null;
function openFlyout(kind, trigger){
  const inner = document.getElementById("flyoutInner");
  if (flyoutKey === kind){ closeFlyout(); return; }
  flyoutKey = kind;

  let items;
  if (kind === "support"){
    items = NAV_SECTIONS.map(s =>
      '<button class="flyout-item" ' + (s.view ? 'data-view="' + s.id + '"' : 'data-jump="' + s.id + '"') + '>' +
      '<svg viewBox="0 0 48 48" style="display:none"></svg>' +
      '<span class="material-symbols-outlined" style="font-size:34px;color:var(--navy);">' + (s.icon || "help") + '</span>' +
      '<span class="flyout-label">' + s.label + '</span></button>');
  } else {
    const cats = ["All"].concat(CATEGORY_ORDER.filter(c => catCount(c) > 0));
    items = cats.map(c =>
      '<button class="flyout-item" data-cat="' + escAttr(c) + '">' + (CAT_ICONS[c] || CAT_ICONS.All) +
      '<span class="flyout-label">' + (c === "All" ? "All devices" : c) + '</span>' +
      '<span class="flyout-count">' + (c === "All" ? PRODUCTS.length : catCount(c)) + '</span></button>');
    if (savedList().length){
      items.push('<button class="flyout-item" data-cat="Saved">' + CAT_ICONS.Saved +
        '<span class="flyout-label">Saved</span><span class="flyout-count">' + savedList().length + '</span></button>');
    }
  }
  inner.innerHTML = items.join("");
  inner.querySelectorAll("[data-cat]").forEach(b => b.addEventListener("click", () => { closeFlyout(); goToCategory(b.dataset.cat); }));
  inner.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => { closeFlyout(); jumpTo(b.dataset.jump); }));
  inner.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => { closeFlyout(); goView(b.dataset.view); }));

  document.getElementById("flyout").classList.add("open");
  document.getElementById("flyoutScrim").classList.add("open");
  document.querySelectorAll("#navLinks [data-flyout]").forEach(b => b.classList.toggle("open", b === trigger));
}
function closeFlyout(){
  flyoutKey = null;
  document.getElementById("flyout").classList.remove("open");
  document.getElementById("flyoutScrim").classList.remove("open");
  document.querySelectorAll("#navLinks [data-flyout]").forEach(b => b.classList.remove("open"));
}
document.getElementById("flyoutScrim").addEventListener("click", closeFlyout);

function openMobileMenu(){
  document.getElementById("mobileMenu").classList.add("open");
  document.getElementById("menuBtn").setAttribute("aria-expanded", "true");
  document.body.classList.add("locked");
}
function closeMobileMenu(){
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
  document.body.classList.remove("locked");
}
document.getElementById("menuBtn").addEventListener("click", () => {
  const open = document.getElementById("mobileMenu").classList.contains("open");
  if (open) closeMobileMenu(); else openMobileMenu();
});

/* ---------- Jump to an info section ---------- */
function jumpTo(id){
  const el = document.getElementById(id);
  if (!el) return;
  if (currentView !== "catalog"){ history.pushState({ view: "catalog", category: activeCategory }, "", "#" + id); }
  setView("catalog");
  if (el.tagName === "DETAILS"){
    el.open = true;
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll("[data-jump]").forEach(el => {
  if (el.closest("#mobileMenuInner") || el.closest("#flyoutInner")) return;
  el.addEventListener("click", (e) => { e.preventDefault(); jumpTo(el.dataset.jump); });
});

/* ---------- Global search ---------- */
const overlay = document.getElementById("searchOverlay");
const globalInput = document.getElementById("globalSearch");

/* Page content is indexed from the DOM so the results stay in sync with the
   copy that is actually on the page. */
let PAGE_INDEX = [];
function buildPageIndex(){
  PAGE_INDEX = [...document.querySelectorAll(".terms-block")].map(el => ({
    id: el.id,
    title: el.querySelector("summary").textContent.trim(),
    text: el.querySelector(".terms-body").textContent.toLowerCase()
  }));
}

function openSearch(){
  overlay.classList.add("open");
  document.body.classList.add("locked");
  globalInput.value = searchTerm;
  renderSearchResults(globalInput.value);
  setTimeout(() => globalInput.focus(), 60);
}
function closeSearch(){
  overlay.classList.remove("open");
  document.body.classList.remove("locked");
}

function renderSearchResults(q){
  const box = document.getElementById("searchResults");
  const term = q.trim().toLowerCase();
  if (!term){
    box.innerHTML = '<div class="sr-hint">Try “17 Pro Max”, “512GB”, “open box”, “titanium”, “returns”, or “credit key”.</div>';
    return;
  }
  const products = PRODUCTS.filter(p => productMatches(p, term)).slice(0, 8);

  const pages = PAGE_INDEX.filter(s =>
    s.title.toLowerCase().includes(term) || s.text.includes(term)).slice(0, 4);

  let html = "";
  if (products.length){
    html += '<div class="sr-group"><div class="sr-title">Devices</div>' + products.map(g => {
      const colors = uniq(g.variants.map(v => v.color)).filter(Boolean);
      const c = colors.length ? colors[0] : (getReferenceColors(g.model)[0] || "");
      const photo = localPhotoFor(g.model, c);
      const low = lowestPrice(g);
      return '<button class="sr-item" data-open="' + escAttr(savedKey(g)) + '">' +
        '<span class="sr-thumb">' + (photo ? '<img src="' + photo + '" alt="" loading="lazy" decoding="async">' : getIcon(g, "s" + slugify(g.model))) + '</span>' +
        '<span class="sr-main"><span class="sr-name">' + g.model + '</span>' +
        '<span class="sr-meta">' + g.category + ' · ' + g.variants.length + ' configurations</span></span>' +
        '<span class="sr-price">' + (low ? "from " + money(low) : "Ask") + '</span></button>';
    }).join("") + '</div>';
  }
  if (pages.length){
    html += '<div class="sr-group"><div class="sr-title">On this site</div>' + pages.map(s =>
      '<button class="sr-item" data-page="' + s.id + '">' +
      '<span class="sr-thumb"><span class="material-symbols-outlined" style="color:#86868b;font-size:20px;">description</span></span>' +
      '<span class="sr-main"><span class="sr-name">' + s.title + '</span>' +
      '<span class="sr-meta">Information</span></span></button>').join("") + '</div>';
  }
  if (!html){
    html = '<div class="sr-empty">No matches for “' + q + '”. Message us on WhatsApp and we will check stock directly.</div>';
  } else if (products.length){
    html += '<div class="sr-group"><button class="sr-item" data-all="1">' +
      '<span class="sr-thumb"><span class="material-symbols-outlined" style="color:#86868b;font-size:20px;">grid_view</span></span>' +
      '<span class="sr-main"><span class="sr-name">See all results for “' + q + '”</span>' +
      '<span class="sr-meta">In the marketplace</span></span></button></div>';
  }
  box.innerHTML = html;

  box.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => {
    closeSearch(); openByKey(b.dataset.open);
  }));
  box.querySelectorAll("[data-page]").forEach(b => b.addEventListener("click", () => {
    closeSearch(); jumpTo(b.dataset.page);
  }));
  box.querySelectorAll("[data-all]").forEach(b => b.addEventListener("click", () => {
    closeSearch(); applySearch(globalInput.value);
  }));
}

function applySearch(value){
  searchTerm = value;
  if (isDetailOpen()){
    if (history.state && history.state.view === "detail") history.back();
    else hideDetail();
  }
  render();
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearSearch(quiet){
  if (!searchTerm) { document.getElementById("clearSearchBtn").classList.remove("show"); return; }
  searchTerm = "";
  globalInput.value = "";
  document.getElementById("clearSearchBtn").classList.remove("show");
  if (!quiet) render();
}

document.getElementById("searchBtn").addEventListener("click", openSearch);
document.getElementById("searchClose").addEventListener("click", closeSearch);
document.getElementById("searchScrim").addEventListener("click", closeSearch);
document.getElementById("clearSearchBtn").addEventListener("click", () => { clearSearch(); render(); });
globalInput.addEventListener("input", (e) => renderSearchResults(e.target.value));
globalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){ e.preventDefault(); closeSearch(); applySearch(globalInput.value); }
});
document.getElementById("savedBtn").addEventListener("click", () => {
  if (!savedList().length){
    openSearch();
    return;
  }
  goToCategory("Saved");
});

/* ---------- Export current view to CSV ---------- */
function csvCell(v){
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function exportStock(){
  const rows = [["Category", "Model", "Storage", "Condition", "Color", "Price", "MSRP"]];
  currentList().forEach(g => {
    g.variants.forEach(v => {
      rows.push([g.category, g.model, v.storage, v.condition, v.color || "", v.price || "", v.msrp || ""]);
    });
  });
  const csv = rows.map(r => r.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = "fm-cellular-stock-" + (activeCategory === "All" ? "all" : activeCategory.toLowerCase().replace(/\s+/g, "-")) + "-" + stamp + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.getElementById("exportBtn").addEventListener("click", exportStock);

/* ---------- Detail save button ---------- */
function syncDetailSaveButton(){
  const btn = document.getElementById("detailSave");
  if (!detailGroup) return;
  const on = isSavedModel(savedKey(detailGroup));
  btn.classList.toggle("saved", on);
  document.getElementById("detailSaveLabel").textContent = on ? "Saved" : "Save";
  btn.setAttribute("aria-pressed", String(on));
}
document.getElementById("detailSave").addEventListener("click", () => {
  if (!detailGroup) return;
  toggleSaved(savedKey(detailGroup));
});

/* ---------- View router ----------
   The shop (hero + catalog + info) is one view; product, cart, about and
   reviews each replace it. Kept deliberately small so back/forward stays
   predictable. */
let currentView = "catalog";
const VIEW_NODES = {
  shop: ["homeSections", "catalog", "info"],
  detail: ["detailPage"],
  cart: ["cartPage"],
  about: ["aboutPage"],
  reviews: ["reviewsPage"]
};
function setView(view){
  currentView = view;
  const showShop = (view === "catalog");
  VIEW_NODES.shop.forEach(id => { document.getElementById(id).style.display = showShop ? "" : "none"; });
  ["detail", "cart", "about", "reviews"].forEach(v => {
    VIEW_NODES[v].forEach(id => {
      document.getElementById(id).style.display = (view === v) ? "block" : "none";
    });
  });
}

function goView(view, push){
  closeFlyout(); closeMobileMenu();
  if (view === "cart") renderCart();
  if (view === "reviews") renderReviews();
  setView(view);
  if (push !== false) history.pushState({ view: view }, "", "#" + view);
  window.scrollTo({ top: 0, behavior: "auto" });
}

document.querySelectorAll("[data-goview]").forEach(el => {
  el.addEventListener("click", (e) => { e.preventDefault(); goView(el.dataset.goview); });
});
document.querySelectorAll("[data-backto]").forEach(el => {
  el.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else { goView("catalog", false); history.replaceState({ view: "catalog", category: activeCategory }, "", "#catalog"); }
  });
});

/* ---------- Cart ---------- */
const CART_STORE = "fm.cart.v1";
let cartMem = null;

function cartList(){
  if (cartMem) return cartMem;
  cartMem = [];
  try {
    const raw = localStorage.getItem(CART_STORE);
    if (raw) cartMem = JSON.parse(raw) || [];
  } catch (err){ /* storage blocked — session only */ }
  return cartMem;
}
function persistCart(){
  try { localStorage.setItem(CART_STORE, JSON.stringify(cartMem)); } catch (err){}
  updateCartBadge();
}
function cartCount(){ return cartList().reduce((n, i) => n + i.qty, 0); }
function updateCartBadge(){
  const n = cartCount();
  const badge = document.getElementById("cartBadge");
  badge.textContent = n;
  badge.classList.toggle("show", n > 0);
}
function cartLineKey(i){
  return [i.category, i.model, i.storage, i.color, i.condition].join("|");
}

function addCurrentToCart(group){
  const { storage, condition, color, colorMode } = detailSelection;
  const variant = findVariant(group, storage, condition, colorMode === "variant" ? color : null)
    || group.variants.find(v => v.storage === storage && v.condition === condition)
    || group.variants[0];
  const item = {
    category: group.category, model: group.model,
    storage: storage || "", condition: condition || "", color: color || "",
    price: variant && variant.price ? variant.price : null,
    msrp: variant && variant.msrp ? variant.msrp : null,
    qty: 1
  };
  const list = cartList();
  const key = cartLineKey(item);
  const existing = list.find(i => cartLineKey(i) === key);
  if (existing) existing.qty += 1; else list.push(item);
  cartMem = list;
  persistCart();
  showToast(existing ? "Quantity updated" : "Added to cart");
  const btn = document.getElementById("addToCartBtn");
  if (btn){ btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
}

function setQty(key, delta){
  const list = cartList();
  const item = list.find(i => cartLineKey(i) === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) return removeLine(key);
  cartMem = list; persistCart(); renderCart();
}
function removeLine(key){
  const row = document.querySelector('[data-line="' + CSS.escape(key) + '"]');
  const finish = () => {
    cartMem = cartList().filter(i => cartLineKey(i) !== key);
    persistCart(); renderCart();
  };
  if (row){ row.classList.add("removing"); setTimeout(finish, 260); } else finish();
}

function cartTotals(){
  const list = cartList();
  let priced = 0, units = 0, ask = 0, msrp = 0;
  list.forEach(i => {
    units += i.qty;
    // count MSRP toward "off MSRP" only where it is actually above the price
    if (i.price){ priced += i.price * i.qty; msrp += (i.msrp && i.msrp > i.price ? i.msrp : i.price) * i.qty; }
    else ask += i.qty;
  });
  return { priced: priced, units: units, ask: ask, msrp: msrp };
}

function renderCart(){
  const body = document.getElementById("cartBody");
  const list = cartList();
  updateCartBadge();

  if (!list.length){
    body.innerHTML = '<div class="cart-empty">' +
      '<span class="material-symbols-outlined">shopping_bag</span>' +
      '<h3>Your cart is empty</h3>' +
      '<p>Configure any device and add it here to build an order.</p>' +
      '<button class="btn btn-primary btn-lg" data-goview="catalog">Browse inventory</button></div>';
    body.querySelector("[data-goview]").addEventListener("click", () => goView("catalog"));
    document.getElementById("cartIntro").textContent = "Nothing here yet — add a device to start an order.";
    return;
  }
  document.getElementById("cartIntro").textContent =
    "Review your configuration, then send the order straight to our team.";

  const t = cartTotals();
  const items = list.map(i => {
    const photo = exactPhotoFor(i.model, i.color) || localPhotoFor(i.model, i.color);
    const g = PRODUCTS.find(p => p.model === i.model && p.category === i.category);
    const key = cartLineKey(i);
    return '<div class="cart-item" data-line="' + escAttr(key) + '">' +
      '<div class="cart-thumb">' + (photo
        ? '<img src="' + photo + '" alt="" loading="lazy" decoding="async">'
        : (g ? getIcon(g, "c" + slugify(i.model)) : '')) + '</div>' +
      '<div><div class="cart-name">' + i.model + '</div><div class="cart-config">' +
        (i.storage ? '<span class="cart-tag"><span class="material-symbols-outlined">sd_card</span>' + i.storage + '</span>' : '') +
        (i.color ? '<span class="cart-tag"><span class="material-symbols-outlined">palette</span>' + i.color + '</span>' : '') +
        (i.condition ? '<span class="cart-tag"><span class="material-symbols-outlined">verified</span>' + i.condition + '</span>' : '') +
        '<span class="cart-tag"><span class="material-symbols-outlined">sim_card</span>Unlocked</span>' +
      '</div></div>' +
      '<div class="cart-right">' +
        (i.price ? '<div class="cart-price">' + money(i.price * i.qty) + '</div>'
                 : '<div class="cart-price ask">Contact for price</div>') +
        '<div class="qty"><button data-dec="' + escAttr(key) + '" aria-label="Decrease quantity">−</button>' +
        '<span>' + i.qty + '</span>' +
        '<button data-inc="' + escAttr(key) + '" aria-label="Increase quantity">+</button></div>' +
        '<button class="cart-remove" data-rm="' + escAttr(key) + '">Remove</button>' +
      '</div></div>';
  }).join("");

  const savings = t.msrp > t.priced ? Math.round(t.msrp - t.priced) : 0;
  body.innerHTML =
    '<div class="cart-layout"><div class="cart-items">' + items + '</div>' +
    '<aside class="cart-summary"><h3>Order summary</h3>' +
      '<div class="cart-line"><span>Devices</span><span>' + t.units + '</span></div>' +
      '<div class="cart-line"><span>Priced items</span><span>' + money(t.priced) + '</span></div>' +
      (savings > 0 ? '<div class="cart-line"><span>Off MSRP</span><span style="color:#0f9d58;">− ' + money(savings) + '</span></div>' : '') +
      (t.ask ? '<div class="cart-line"><span>Quote on request</span><span>' + t.ask + ' item' + (t.ask === 1 ? '' : 's') + '</span></div>' : '') +
      '<div class="cart-line total"><span>Subtotal</span><span>' + money(t.priced) + '</span></div>' +
      '<div class="cart-actions">' +
        '<button class="btn btn-primary btn-lg" id="checkoutBtn">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36c1.36.72 2.9 1.13 4.53 1.13h.01c5.46 0 9.9-4.45 9.9-9.91C21.87 6.45 17.5 2 12.04 2z"></path></svg>' +
        'Send order on WhatsApp</button>' +
        '<button class="btn btn-secondary" id="copyOrderBtn">Copy order details</button>' +
        '<button class="btn btn-secondary" id="clearCartBtn">Clear cart</button>' +
      '</div>' +
      '<p class="cart-note">Subtotal excludes tax and shipping. Items marked “quote on request” are priced when we confirm stock. Sending the order does not charge you — we reply to confirm availability and payment.</p>' +
    '</aside></div>';

  body.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => setQty(b.dataset.inc, 1)));
  body.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => setQty(b.dataset.dec, -1)));
  body.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => removeLine(b.dataset.rm)));
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(orderText()), "_blank", "noopener");
  });
  document.getElementById("copyOrderBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(orderText()); showToast("Order details copied", true); }
    catch (err){ showToast("Copy not available in this browser", true); }
  });
  document.getElementById("clearCartBtn").addEventListener("click", () => {
    cartMem = []; persistCart(); renderCart(); showToast("Cart cleared", true);
  });
}

function orderText(){
  const list = cartList();
  const t = cartTotals();
  const lines = list.map((i, n) => {
    const bits = [i.model, i.storage, i.color, i.condition].filter(Boolean).join(" · ");
    return (n + 1) + ". " + bits + " — qty " + i.qty + (i.price ? " — " + money(i.price * i.qty) : " — price on request");
  });
  return "Hi FM Cellular, I'd like to order:\n\n" + lines.join("\n") +
    "\n\nDevices: " + t.units + "\nSubtotal (priced items): " + money(t.priced) +
    (t.ask ? "\nItems needing a quote: " + t.ask : "") +
    "\n\nPlease confirm availability and payment.";
}

function showToast(text, noAction){
  const el = document.getElementById("toast");
  document.getElementById("toastText").textContent = text;
  document.getElementById("toastAction").style.display = noAction ? "none" : "";
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("show"), 3600);
}
document.getElementById("toastAction").addEventListener("click", () => {
  document.getElementById("toast").classList.remove("show");
  goView("cart");
});
document.getElementById("cartBtn").addEventListener("click", () => goView("cart"));

/* ---------- Reviews ----------
   REVIEWS starts with clearly-flagged samples so the layout is visible.
   Replace them with real, verified customer reviews before publishing —
   delete the entries below and drop your own in, or set REVIEWS = [] to show
   the "collecting reviews" state instead. */
const REVIEWS = [
  { name: "Sample Review", meta: "Replace with a real customer", stars: 5, sample: true,
    body: "This card shows how a review will look. Swap this text for a real quote from a verified order — keep it in the customer's own words." },
  { name: "Sample Review", meta: "Replace with a real customer", stars: 5, sample: true,
    body: "Add the customer's first name and city, the device they bought, and what stood out. Short and specific beats long and general." },
  { name: "Sample Review", meta: "Replace with a real customer", stars: 4, sample: true,
    body: "Keep a few four-star reviews in the mix. A wall of perfect scores reads as fake to buyers and to review platforms." }
];

function starRow(n){
  let s = '<div class="stars">';
  for (let i = 0; i < 5; i++) s += '<span class="material-symbols-outlined">' + (i < n ? "star" : "star_border") + '</span>';
  return s + '</div>';
}

function renderReviews(){
  const body = document.getElementById("reviewsBody");
  const real = REVIEWS.filter(r => !r.sample);
  const showing = REVIEWS.length ? REVIEWS : [];
  const anySample = REVIEWS.some(r => r.sample);

  if (!showing.length){
    body.innerHTML = '<div class="cart-empty">' +
      '<span class="material-symbols-outlined">rate_review</span>' +
      '<h3>We are collecting reviews right now</h3>' +
      '<p>Bought from us? Tell us how it went — it helps the next buyer.</p>' +
      '<a class="btn btn-primary btn-lg" href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" rel="noopener">Leave a review</a></div>';
    return;
  }

  const avg = real.length
    ? (real.reduce((s, r) => s + r.stars, 0) / real.length)
    : (showing.reduce((s, r) => s + r.stars, 0) / showing.length);

  body.innerHTML =
    (anySample
      ? '<div class="review-banner"><span class="material-symbols-outlined">edit_note</span>' +
        '<div><strong>These are placeholder reviews.</strong> They show the layout only — no real customer wrote them. ' +
        'Replace the <code>REVIEWS</code> list in this page\'s script with genuine reviews before you publish, or empty it to show the “collecting reviews” state.</div></div>'
      : '') +
    '<div class="rating-summary">' +
      '<div><div class="rating-big">' + avg.toFixed(1) + '</div>' + starRow(Math.round(avg)) +
      '<div class="rating-meta">' + (real.length ? real.length + " verified review" + (real.length === 1 ? "" : "s") : "Sample data — not real reviews") + '</div></div>' +
      '<div style="margin-left:auto; display:flex; gap:10px; flex-wrap:wrap;">' +
        '<a class="btn btn-primary" href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" rel="noopener">Leave a review</a>' +
        '<button class="btn btn-secondary" data-goview-inline="catalog">Browse inventory</button>' +
      '</div>' +
    '</div>' +
    '<div class="reviews-grid">' + showing.map(r =>
      '<article class="review-card">' +
        (r.sample ? '<span class="review-chip">Sample</span>' : '') +
        '<div class="review-top"><div class="review-avatar">' + r.name.charAt(0) + '</div>' +
        '<div><div class="review-name">' + r.name + '</div><div class="review-meta">' + r.meta + '</div></div></div>' +
        starRow(r.stars) +
        '<p class="review-body">' + r.body + '</p>' +
      '</article>').join("") + '</div>';

  body.querySelectorAll("[data-goview-inline]").forEach(b =>
    b.addEventListener("click", () => goView(b.dataset.goviewInline)));
}

/* ---------- Hero: cycling devices ----------
   The pool is every photo we hold, built straight from PHOTO_MAP so any image
   added later joins the rotation automatically. Three are shown at a time,
   picked at random and never repeating what is already on screen. Held still
   for reduced-motion users. */
const HERO_POOL = (function buildHeroPool(){
  const files = [];
  Object.keys(PHOTO_MAP).forEach(model => {
    Object.keys(PHOTO_MAP[model]).forEach(color => files.push(PHOTO_MAP[model][color]));
  });
  return [...new Set(files)];
})();

const heroSlots = ["heroLead", "heroLeft", "heroRight"];
let heroShowing = [];

function heroSrc(name){ return encodeURI(PHOTO_BASE + name); }

/* Three distinct picks, none of them currently on screen. */
function pickHeroTrio(){
  const avoid = new Set(heroShowing);
  const pool = HERO_POOL.length > 6 ? HERO_POOL.filter(f => !avoid.has(f)) : HERO_POOL.slice();
  const out = [];
  while (out.length < 3 && pool.length){
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  while (out.length < 3) out.push(HERO_POOL[out.length % HERO_POOL.length]);
  return out;
}

/* True crossfade: the incoming photo is decoded first, then faded up on the
   spare layer while the outgoing one fades down. Nothing is ever swapped on a
   visible element, so there is no blink and no gap. */
function swapSlot(slotId, name, immediate){
  const slot = document.getElementById(slotId);
  if (!slot || !name) return;
  const layers = slot.querySelectorAll(".layer");
  if (layers.length < 2) return;
  const current = slot.querySelector(".layer.on");
  const incoming = (current === layers[0]) ? layers[1] : layers[0];

  const show = () => {
    incoming.src = heroSrc(name);
    // one frame so the browser registers the starting state before transitioning
    requestAnimationFrame(() => requestAnimationFrame(() => {
      incoming.classList.add("on");
      if (current && current !== incoming) current.classList.remove("on");
    }));
  };

  if (immediate) return show();

  // Only begin the fade once the bytes are decoded — fading up a blank element
  // is exactly what reads as a "pop".
  const pre = new Image();
  pre.onload = show;
  pre.onerror = () => {};      // leave the current photo in place
  pre.src = heroSrc(name);
}

function paintHero(trio, immediate){
  heroShowing = trio;
  heroSlots.forEach((id, s) => swapSlot(id, trio[s], immediate));
}

/* Warms the next set while the current one is on screen. */
function preloadTrio(trio){
  trio.forEach(name => { const img = new Image(); img.src = heroSrc(name); });
}

function initHero(){
  const art = document.getElementById("heroArt");
  if (!art || !HERO_POOL.length) return;

  paintHero(pickHeroTrio());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // The three slots change one at a time rather than together, so the hero is
  // always settling somewhere instead of blinking all at once.
  const STAGGER = 1400, HOLD_MS = 5200;
  let next = pickHeroTrio();
  preloadTrio(next);
  let slot = 0;

  setInterval(() => {
    const id = heroSlots[slot % heroSlots.length];
    const name = next[slot % heroSlots.length];
    swapSlot(id, name);
    heroShowing = heroShowing.slice();
    heroShowing[slot % heroSlots.length] = name;
    slot++;
    if (slot % heroSlots.length === 0){
      next = pickHeroTrio();
      preloadTrio(next);
    }
  }, HOLD_MS + STAGGER);
}

/* ---------- Chrome ---------- */
document.getElementById("brandHome").addEventListener("click", () => {
  closeFlyout(); closeMobileMenu(); clearSearch();
  if (currentView !== "catalog") history.replaceState({ view: "catalog", category: activeCategory }, "", "#");
  setView("catalog");
  setCategory("All");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("detailBack").addEventListener("click", () => {
  if (history.state && history.state.view === "detail") history.back();
  else { hideDetail(); document.getElementById("catalog").scrollIntoView({ block: "start" }); }
});

window.addEventListener("popstate", (e) => {
  const state = e.state || { view: "catalog" };
  closeFlyout(); closeMobileMenu();
  if (state.view === "detail"){ showDetailFromState(state); return; }
  if (state.view === "cart" || state.view === "about" || state.view === "reviews"){
    goView(state.view, false);
    return;
  }
  const wasAway = currentView !== "catalog";
  if (stepObserver){ stepObserver.disconnect(); stepObserver = null; }
  setView("catalog");
  if (state.category && state.category !== activeCategory) setCategory(state.category, true);
  if (wasAway) document.getElementById("catalog").scrollIntoView({ block: "start" });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    if (overlay.classList.contains("open")) return closeSearch();
    if (document.getElementById("mobileMenu").classList.contains("open")) return closeMobileMenu();
    if (flyoutKey) return closeFlyout();
    if (isDetailOpen()) document.getElementById("detailBack").click();
    return;
  }
  // "/" jumps to search, the way Apple and most catalogs behave
  if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)){
    e.preventDefault();
    openSearch();
  }
});

// Scroll edge effect + back-to-top
const header = document.getElementById("siteHeader");
const toTop = document.getElementById("toTop");
let lastScroll = -1;
function onScroll(){
  const y = window.scrollY;
  if (y === lastScroll) return;
  lastScroll = y;
  header.classList.toggle("scrolled", y > 8);
  toTop.classList.toggle("show", y > 900);
}
window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("recentClear").addEventListener("click", () => {
  recentMem = [];
  try { localStorage.removeItem(RECENT_STORE); } catch (err){}
  renderRecent();
});

// The rail is measured in pixels, so re-measure when the layout changes.
window.addEventListener("resize", () => {
  if (!isDetailOpen()) return;
  sizeConfigLayout();
  measureRail(activeStepIndex);
});

/* ---------- Scroll reveal ---------- */
function revealAll(){
  document.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in"));
}
if ("IntersectionObserver" in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  // Failsafe: content must never be left invisible if the observer never fires.
  setTimeout(revealAll, 2500);
  window.addEventListener("beforeprint", revealAll);
} else {
  revealAll();
}

/* ---------- Boot ---------- */
history.replaceState({ view: "catalog", category: "All" }, "", location.hash || "");
buildPageIndex();
updateStats();
updateHero("All");
setSyncStatus("loading");
updateSavedBadge();
updateCartBadge();
buildCategoryBar();
buildNav();
render();
renderRecent();
initHero();
setView("catalog");
loadLiveInventory();

// Deep links: /#cart, /#about, /#reviews open straight to that page.
(function openFromHash(){
  const h = (location.hash || "").replace("#", "");
  if (h === "cart" || h === "about" || h === "reviews") goView(h, false);
})();

</script>
</body>
</html>
