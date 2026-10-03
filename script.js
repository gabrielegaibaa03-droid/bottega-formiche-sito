(function(){
  // ---------- Dati del negozio usati dallo script ----------
  // Devono restare uguali a quelli scritti in index.html e in CLAUDE.md.
  // TODO: numero di telefono/WhatsApp DA CONFERMARE con Andrea e Laura (anche in index.html).
  const PHONE='393498594477';
  // Orari in minuti dalla mezzanotte (510 = 8:30). [] = chiuso, null = non ancora deciso.
  // TODO: orario del sabato DA CONFERMARE. Finché è null il sabato compare come "da confermare".
  const HOURS={1:[[510,780],[900,1140]],2:[[510,780],[900,1140]],3:[[510,780],[900,1140]],4:[[510,780],[900,1140]],5:[[510,780],[900,1140]],6:null,0:[]};

  // ---------- Dimensione del testo (su tutte le pagine) ----------
  const root=document.documentElement, bN=document.getElementById('sz-normal'), bB=document.getElementById('sz-big');
  function setSize(big){root.classList.toggle('big',big);bN.setAttribute('aria-pressed',String(!big));bB.setAttribute('aria-pressed',String(big));try{localStorage.setItem('bdf-big',big?'1':'0')}catch(e){}}
  if(bN&&bB){
    try{if(localStorage.getItem('bdf-big')==='1')setSize(true)}catch(e){}
    bN.addEventListener('click',()=>setSize(false));bB.addEventListener('click',()=>setSize(true));
  }

  // Le parti qui sotto esistono solo nella pagina principale
  const tb=document.getElementById('hours');
  if(!tb)return;

  // ---------- Orari e stato aperto/chiuso (ora di Bologna) ----------
  const DAYS=['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
  const fmt=m=>{const h=Math.floor(m/60),mm=m%60;return h+(mm?':'+String(mm).padStart(2,'0'):'')};
  function romeNow(){
    const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    const g=t=>p.find(x=>x.type===t).value;
    const map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
    return {d:map[g('weekday')],m:(parseInt(g('hour'),10)%24)*60+parseInt(g('minute'),10)};
  }
  const now=romeNow();
  [1,2,3,4,5,6,0].forEach(d=>{
    const tr=document.createElement('tr');if(d===now.d)tr.className='today';
    const s=HOURS[d]===null?'Da confermare':HOURS[d].length?HOURS[d].map(r=>fmt(r[0])+'–'+fmt(r[1])).join(' · '):'Chiuso';
    const a=document.createElement('td'),b=document.createElement('td');a.textContent=DAYS[d];b.textContent=s;
    tr.append(a,b);tb.appendChild(tr);
  });
  const st=document.getElementById('status'),stt=document.getElementById('status-text');
  // Se l'orario di oggi non è ancora deciso, lasciamo il testo fisso scritto nell'HTML
  if(HOURS[now.d]!==null){
    const openR=HOURS[now.d].find(r=>now.m>=r[0]&&now.m<r[1]);
    if(openR){st.classList.add('open');stt.textContent='Aperto ora · chiude alle '+fmt(openR[1]);}
    else{
      st.classList.add('closed');
      const later=HOURS[now.d].find(r=>now.m<r[0]);
      if(later){stt.textContent='Chiuso ora · riapre alle '+fmt(later[0]);}
      else{
        stt.textContent='Chiuso ora';
        for(let i=1;i<=7;i++){
          const d=(now.d+i)%7;
          if(HOURS[d]===null)break; // giorno con orario non deciso: meglio non promettere nulla
          if(HOURS[d].length){stt.textContent='Chiuso ora · riapre '+(i===1?'domani':DAYS[d].toLowerCase())+' alle '+fmt(HOURS[d][0][0]);break;}
        }
      }
    }
  }

  // ---------- Quaderno personalizzabile ----------
  const nb=document.getElementById('notebook'),nbName=document.getElementById('nb-name'),inp=document.getElementById('nome');
  let t;
  inp.addEventListener('input',()=>{
    nbName.textContent=inp.value.trim()||'Il tuo nome';
    nbName.classList.remove('inked');clearTimeout(t);t=setTimeout(()=>{void nbName.offsetWidth;nbName.classList.add('inked')},10);
  });
  const coverNames={1:'carta naturale',2:'blu notte',3:'rosso Bologna',4:'verde salvia'};
  let cover=1;
  document.querySelectorAll('.cover').forEach(b=>b.addEventListener('click',()=>{
    cover=b.dataset.cv;
    document.querySelectorAll('.cover').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    nb.style.setProperty('--cv','var(--cover-'+cover+')');nb.style.setProperty('--cvi','var(--cover-'+cover+'-ink)');
  }));
  document.getElementById('use-name').addEventListener('click',()=>{
    const n=inp.value.trim();
    pick('cosa','Quaderni personalizzati');
    if(n)document.getElementById('dettagli').value='Il nome "'+n+'" sulla copertina, colore '+coverNames[cover]+'.';
    update();
  });

  // ---------- Preventivo su WhatsApp ----------
  const state={cosa:'Quaderni personalizzati',quanti:'1',quando:'Entro due settimane'};
  function pick(group,val){
    state[group]=val;
    document.querySelectorAll('[data-group="'+group+'"] .chip').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.v===val)));
  }
  document.querySelectorAll('[data-group]').forEach(g=>g.addEventListener('click',e=>{
    const c=e.target.closest('.chip');if(!c)return;pick(g.dataset.group,c.dataset.v);update();
  }));
  const det=document.getElementById('dettagli'),msg=document.getElementById('msg'),wa=document.getElementById('wa');
  function text(){
    let s='Buongiorno! Vorrei un preventivo.\nCosa: '+state.cosa+'\nQuanti: '+state.quanti+'\nPer quando: '+state.quando;
    const d=det.value.trim();if(d)s+='\nDettagli: '+d;
    return s;
  }
  function update(){
    document.getElementById('s-cosa').textContent=state.cosa;
    document.getElementById('s-quanti').textContent=state.quanti;
    document.getElementById('s-quando').textContent=state.quando;
    const s=text();msg.textContent=s;wa.href='https://wa.me/'+PHONE+'?text='+encodeURIComponent(s);
  }
  det.addEventListener('input',update);
  document.getElementById('quote').addEventListener('submit',e=>e.preventDefault());
  update();

  const toast=document.getElementById('toast');
  function copy(str,el,ok){
    const done=()=>{toast.textContent=ok;setTimeout(()=>toast.textContent='',2500)};
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);toast.textContent='Testo selezionato: ora puoi copiarlo.'};
    try{navigator.clipboard.writeText(str).then(done,fallback)}catch(e){fallback()}
  }
  document.getElementById('copy').addEventListener('click',()=>copy(text(),msg,'Messaggio copiato.'));
  document.getElementById('copy-phone').addEventListener('click',e=>{
    const el=document.getElementById('phone'),btn=e.currentTarget;
    const select=()=>{const r=document.createRange();r.selectNodeContents(el);getSelection().removeAllRanges();getSelection().addRange(r)};
    try{navigator.clipboard.writeText(el.textContent).then(()=>{btn.textContent='Copiato';setTimeout(()=>btn.textContent='Copia numero',2000)},select)}catch(err){select()}
  });
})();
