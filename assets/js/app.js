/* ============================================================
   HAREC Leerplatform — app.js  (UBA-structuur, v2)
   - Structuur uit data/structuur.json (15 hfst, subhoofdstukken)
   - Login lokaal, voortgang lokaal (localStorage)
   - Theorie per subhoofdstuk (aparte pagina), vragen aparte pagina
   - Interactieve quiz met directe feedback + detailpaneel
   ============================================================ */

const HAREC = (() => {
  const LS_USER = 'harec_user';
  const LS_PROGRESS = 'harec_progress_v2';

  let STRUCT = null; // ingeladen structuur

  // ---------- pad-helper ----------
  function rel(p){
    const depth = (location.pathname.match(/\/(chapters|quiz)\//)) ? '../' : '';
    return depth + p;
  }

  // ---------- structuur laden ----------
  async function loadStructure(){
    if(STRUCT) return STRUCT;
    STRUCT = await (await fetch(rel('data/structuur.json'))).json();
    return STRUCT;
  }
  function chapters(){ return STRUCT ? STRUCT.hoofdstukken : []; }
  function chapById(id){ return chapters().find(c=>c.id===id); }

  // ---------- session ----------
  function getUser(){ try { return JSON.parse(localStorage.getItem(LS_USER)); } catch { return null; } }
  function setUser(u){ localStorage.setItem(LS_USER, JSON.stringify(u)); }
  function logout(){ localStorage.removeItem(LS_USER); location.href = rel('index.html'); }
  function requireLogin(){ if(!getUser()){ location.href = rel('login.html'); return false; } return true; }

  // ---------- voortgang ----------
  // progress = { seenSubs:{ "2.1":true }, answered:{ "h02": { "12":{picked,ok} } }, doneSubs:{ "2.1":true } }
  function loadProgress(){ try { return JSON.parse(localStorage.getItem(LS_PROGRESS)) || {}; } catch { return {}; } }
  function saveProgress(p){ localStorage.setItem(LS_PROGRESS, JSON.stringify(p)); }
  function markSubSeen(subId){ const p=loadProgress(); p.seenSubs=p.seenSubs||{}; if(!p.seenSubs[subId]){ p.seenSubs[subId]=true; saveProgress(p);} }
  function isSubSeen(subId){ const p=loadProgress(); return !!(p.seenSubs&&p.seenSubs[subId]); }
  function toggleSubDone(subId){ const p=loadProgress(); p.doneSubs=p.doneSubs||{}; p.doneSubs[subId]=!p.doneSubs[subId]; saveProgress(p); return p.doneSubs[subId]; }
  function isSubDone(subId){ const p=loadProgress(); return !!(p.doneSubs&&p.doneSubs[subId]); }
  function recordAnswer(chapId, qid, picked, ok){
    const p=loadProgress(); p.answered=p.answered||{}; p.answered[chapId]=p.answered[chapId]||{};
    p.answered[chapId][qid]={picked,ok}; saveProgress(p);
  }
  function getAnswers(chapId){ const p=loadProgress(); return (p.answered&&p.answered[chapId])||{}; }

  // hoofdstuk voltooid = alle subs gezien/afgevinkt
  function chapDone(chap){
    if(!chap.subs||!chap.subs.length) return false;
    return chap.subs.every(s=>isSubDone(s.id));
  }
  function chapProgressPct(chap){
    if(!chap.subs||!chap.subs.length) return 0;
    const done = chap.subs.filter(s=>isSubDone(s.id)).length;
    return Math.round(done/chap.subs.length*100);
  }

  // ---------- markdown-lite ----------
  function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function mdInline(s){
    if(!s) return '';
    s = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    s = s.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    s = s.replace(/(^|[^\*])\*([^\*]+?)\*/g,'$1<em>$2</em>');
    s = s.replace(/`([^`]+?)`/g,'<code>$1</code>');
    s = s.replace(/\n/g,'<br>');
    return s;
  }

  // ---------- theorie-blokken ----------
  function renderBlock(b){
    switch(b.type){
      case 'text': return `<div class="block"><p>${mdInline(b.inhoud)}</p></div>`;
      case 'keybox': return `<div class="box box-key"><div class="box-title">${escapeHtml(b.titel||'Onthoud')}</div><div>${mdInline(b.inhoud)}</div></div>`;
      case 'warning': return `<div class="box box-warn"><div class="box-title">${escapeHtml(b.titel||'Let op')}</div><div>${mdInline(b.inhoud)}</div></div>`;
      case 'info': return `<div class="box box-info"><div class="box-title">${escapeHtml(b.titel||'')}</div><div>${mdInline(b.inhoud)}</div></div>`;
      case 'formula': return `<div class="formula">
          <div class="f-name">${escapeHtml(b.naam)}</div>
          <div class="f-eq">$$${b.latex}$$</div>
          <div class="f-meta"><b>Symbolen:</b> ${mdInline(b.symbolen)}</div>
          ${b.voorbeeld?`<div class="f-ex">${mdInline(b.voorbeeld)}</div>`:''}
        </div>`;
      case 'grid2': return `<div class="grid2">${b.titel?`<div class="g-title">${escapeHtml(b.titel)}</div>`:''}
          <div class="g-cols">
            <div class="g-card"><h4>${escapeHtml(b.kolommen[0])}</h4><p>${mdInline(b.inhoud[0])}</p></div>
            <div class="g-card"><h4>${escapeHtml(b.kolommen[1])}</h4><p>${mdInline(b.inhoud[1])}</p></div>
          </div></div>`;
      case 'table': {
        const head=b.header.map(h=>`<th>${mdInline(h)}</th>`).join('');
        const body=b.rijen.map(r=>`<tr>${r.map(c=>`<td>${mdInline(c)}</td>`).join('')}</tr>`).join('');
        return `<table class="dtable"><caption>${escapeHtml(b.titel||'')}</caption><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
      }
      case 'figure': return `<figure class="fig"><img src="${rel(b.src)}" alt="${escapeHtml(b.alt||'')}" loading="lazy">${b.bijschrift?`<figcaption>${mdInline(b.bijschrift)}</figcaption>`:''}</figure>`;
      case 'example': return `<div class="worked"><div class="worked-title">Uitgewerkt voorbeeld</div><div>${mdInline(b.inhoud)}</div></div>`;
      case 'concept': {
        const payload=encodeURIComponent(JSON.stringify({
          titel:b.titel, eyebrow:b.eyebrow||'Meer uitleg',
          uitleg:b.detail?.uitleg||'', voorbeeld:b.detail?.voorbeeld||'', analogie:b.detail?.analogie||''
        }));
        return `<button class="concept" data-concept="${payload}">
          <span class="c-body"><span class="c-title">${escapeHtml(b.titel)}</span><span class="c-essence">${mdInline(b.essentie)}</span></span>
          <span class="c-more">meer uitleg</span></button>`;
      }
      default: return '';
    }
  }

  // ---------- quiz ----------
  function renderQuestion(chapId, q){
    const prev = getAnswers(chapId)[q.id];
    const optsHtml=q.opties.map(o=>`<button class="q-opt" data-letter="${o.letter}"><span class="opt-letter">${o.letter}</span><span class="opt-text">${mdInline(o.text)}</span><span class="opt-mark"></span></button>`).join('');
    const figHtml=q.figuur?`<div class="q-fig"><img src="${rel(q.figuur)}" alt="Figuur bij vraag ${q.id}" loading="lazy"></div>`:'';
    const notaHtml=q.figuur_nota?`<div class="q-fignote warn">⚠ ${escapeHtml(q.figuur_nota)}</div>`:'';
    const card=document.createElement('div');
    card.className='q-card'; card.dataset.qid=q.id; card.dataset.sub=q.sub||'';
    card.innerHTML=`
      <div class="q-head"><span class="q-num">Vraag ${q.id}</span>${q.sub?`<span class="q-sub">&sect;${q.sub}</span>`:''}</div>
      <div class="q-text">${mdInline(q.vraag)}</div>${figHtml}${notaHtml}
      <div class="q-opts">${optsHtml}</div>
      <div class="q-explain"><span class="verdict"></span> <span class="etext">${mdInline(q.uitleg)}</span></div>`;
    const opts=card.querySelectorAll('.q-opt');
    const explain=card.querySelector('.q-explain');
    const verdict=card.querySelector('.verdict');
    function reveal(picked){
      opts.forEach(btn=>{ btn.disabled=true; const L=btn.dataset.letter;
        if(L===q.correct) btn.classList.add('correct');
        if(L===picked && picked!==q.correct) btn.classList.add('wrong'); });
      const ok=picked===q.correct;
      explain.classList.add('show', ok?'ok':'bad');
      verdict.textContent = ok?'Juist!':`Fout \u2014 juiste antwoord: ${q.correct}.`;
      card.classList.add(ok?'answered-ok':'answered-bad');
    }
    opts.forEach(btn=>btn.addEventListener('click',()=>{
      const picked=btn.dataset.letter; reveal(picked);
      recordAnswer(chapId,q.id,picked,picked===q.correct);
      if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([explain]);
      const ev=new CustomEvent('harec:answered'); document.dispatchEvent(ev);
    }));
    if(prev) reveal(prev.picked);
    return card;
  }

  // ---------- rechtermenu ----------
  function buildSidebar(activeChapId, activeSubId){
    const nav=document.getElementById('nav-list'); if(!nav) return;
    nav.innerHTML = chapters().map(ch=>{
      const isActive = ch.id===activeChapId;
      const done = chapDone(ch);
      const cls=['nav-chapter']; if(isActive) cls.push('active'); if(done) cls.push('done');
      let subsHtml='';
      if(isActive && ch.subs){
        subsHtml=`<div class="nav-subs">`+ch.subs.map(s=>{
          const seen=isSubSeen(s.id), sdone=isSubDone(s.id), cur=s.id===activeSubId;
          const c=['']; if(cur)c.push('current'); if(seen||sdone)c.push('seen');
          return `<a href="${rel('chapters/'+ch.id+'-'+s.id+'.html')}" class="${c.join(' ')}" data-sub="${s.id}">
            <span class="sub-dot ${sdone?'sub-done':''}"></span>${s.id} · ${escapeHtml(s.titel)}</a>`;
        }).join('')+
        `<a href="${rel('quiz/'+ch.id+'.html')}" class="nav-quiz-link">📝 Oefenvragen</a>`+
        `</div>`;
      }
      return `<div class="${cls.join(' ')}">
        <a class="chap-link" href="${rel('chapters/'+ch.id+'.html')}">
          <span class="chap-num">${ch.nr}</span><span>${escapeHtml(ch.titel)}</span>
          ${done?'<span class="chap-check">✓</span>':''}
        </a>${subsHtml}</div>`;
    }).join('');
    updateGlobalProgress();
  }

  function updateGlobalProgress(){
    const chs=chapters(); if(!chs.length) return;
    const totalSubs=chs.reduce((a,c)=>a+(c.subs?c.subs.length:0),0);
    let doneSubs=0; chs.forEach(c=>(c.subs||[]).forEach(s=>{ if(isSubDone(s.id)) doneSubs++; }));
    const bar=document.getElementById('global-bar'), lbl=document.getElementById('global-label');
    if(bar) bar.style.width=`${totalSubs?Math.round(doneSubs/totalSubs*100):0}%`;
    if(lbl) lbl.textContent=`${doneSubs} / ${totalSubs} subhoofdstukken voltooid`;
  }

  // ---------- header ----------
  function wireHeader(){
    const u=getUser();
    const chip=document.querySelector('[data-callsign-chip]'); if(chip&&u) chip.textContent=u.call||u.name||'gast';
    const lo=document.querySelector('[data-logout]'); if(lo) lo.addEventListener('click',logout);
    const mt=document.querySelector('.menu-toggle'); const sb=document.querySelector('.sidebar'); const bd=document.querySelector('.sidebar-backdrop');
    if(mt&&sb){ mt.addEventListener('click',()=>{sb.classList.toggle('open'); if(bd)bd.classList.toggle('open');});
      if(bd) bd.addEventListener('click',()=>{sb.classList.remove('open'); bd.classList.remove('open');}); }
  }

  // ---------- detailpaneel ----------
  function ensureDetailPane(){
    if(document.querySelector('.detail-pane')) return;
    const bd=document.createElement('div'); bd.className='detail-backdrop';
    const pane=document.createElement('div'); pane.className='detail-pane';
    pane.innerHTML=`<div class="detail-head"><div style="flex:1"><div class="dh-eyebrow" id="dp-eyebrow">Meer uitleg</div><h3 id="dp-title"></h3></div><button class="detail-close" aria-label="Sluiten">×</button></div><div class="detail-body" id="dp-body"></div>`;
    document.body.appendChild(bd); document.body.appendChild(pane);
    const close=()=>{pane.classList.remove('open'); bd.classList.remove('open');};
    bd.addEventListener('click',close); pane.querySelector('.detail-close').addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
  function openDetail(data){
    ensureDetailPane();
    const pane=document.querySelector('.detail-pane'), bd=document.querySelector('.detail-backdrop');
    document.getElementById('dp-eyebrow').textContent=data.eyebrow||'Meer uitleg';
    document.getElementById('dp-title').textContent=data.titel||'';
    let html='';
    if(data.uitleg) html+=`<h4>Uitleg</h4><div class="d-uitleg">${mdInline(data.uitleg)}</div>`;
    if(data.voorbeeld) html+=`<h4>Voorbeeld</h4><div class="d-voorbeeld">${mdInline(data.voorbeeld)}</div>`;
    if(data.analogie) html+=`<h4>Zo kan je het zien</h4><div class="d-analogie">${mdInline(data.analogie)}</div>`;
    const body=document.getElementById('dp-body'); body.innerHTML=html;
    pane.classList.add('open'); bd.classList.add('open');
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([body]);
  }
  function wireConcepts(root){
    (root||document).querySelectorAll('[data-concept]').forEach(btn=>{
      if(btn._wired)return; btn._wired=true;
      btn.addEventListener('click',()=>{try{openDetail(JSON.parse(decodeURIComponent(btn.dataset.concept)));}catch(e){}});
    });
  }

  return {
    rel, loadStructure, chapters, chapById,
    getUser, setUser, logout, requireLogin,
    loadProgress, markSubSeen, isSubSeen, toggleSubDone, isSubDone,
    recordAnswer, getAnswers, chapDone, chapProgressPct,
    escapeHtml, mdInline, renderBlock, renderQuestion,
    buildSidebar, updateGlobalProgress, wireHeader, wireConcepts, openDetail
  };
})();
