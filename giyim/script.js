(() => {
  const cfg = window.HYS_CONFIG || {};
  const pages = (cfg.catalogImages || []).map((src,i)=>({src,i}));
  let current = 0; // desktop: two-page spread, mobile: one page
  const book=document.getElementById("book"), thumbStrip=document.getElementById("thumbStrip");
  const pageLabel=document.getElementById("pageLabel"), count=document.getElementById("pageCountLabel");
  const prevBtn=document.getElementById("prevBtn"), nextBtn=document.getElementById("nextBtn");
  const prevMini=document.getElementById("prevMini"), nextMini=document.getElementById("nextMini");

  function perView(){ return window.innerWidth <= 800 ? 1 : 2; }

  function render(){
    book.innerHTML="";
    const n=perView();
    for(let k=0;k<n;k++){
      const idx=current+k;
      if(idx>=pages.length) break;
      const sh=document.createElement("div"); sh.className="page-shell";
      const img=document.createElement("img"); img.src=pages[idx].src; img.alt=`Katalog sayfası ${idx+1}`;
      sh.appendChild(img); book.appendChild(sh);
    }
    const end=Math.min(current+n,pages.length);
    pageLabel.textContent = pages.length ? `${current+1}${end>current+1 ? "–"+end : ""} / ${pages.length}` : "0 / 0";
    count.textContent = pages.length ? `${pages.length} sayfa` : "Görsel bulunamadı";
    prevBtn.disabled=prevMini.disabled=current===0;
    nextBtn.disabled=nextMini.disabled=end>=pages.length;
    [...thumbStrip.children].forEach((el,i)=>el.classList.toggle("active",i>=current && i<end));
  }
  function go(delta){
    const n=perView();
    current=Math.max(0,Math.min(current+delta*n,Math.max(0,pages.length-n)));
    render();
  }
  prevBtn.onclick=prevMini.onclick=()=>go(-1);
  nextBtn.onclick=nextMini.onclick=()=>go(1);

  pages.forEach((p,i)=>{
    const b=document.createElement("button"); b.className="thumb";
    b.innerHTML=`<img src="${p.src}" alt="Sayfa ${i+1}">`;
    b.onclick=()=>{current=perView()===2?i-(i%2):i;render();};
    thumbStrip.appendChild(b);
  });

  let tx=null;
  book.addEventListener("touchstart",e=>tx=e.changedTouches[0].clientX,{passive:true});
  book.addEventListener("touchend",e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>45)go(dx<0?1:-1);tx=null},{passive:true});
  window.addEventListener("resize",()=>{ current=Math.min(current,Math.max(0,pages.length-perView())); render(); });

  const fsBtn=document.getElementById("fullscreenBtn");
  fsBtn.onclick=()=>{document.body.classList.toggle("fullscreen-catalog");fsBtn.textContent=document.body.classList.contains("fullscreen-catalog")?"Kapat":"Tam Ekran"};

  const modal=document.getElementById("waModal"), waGo=document.getElementById("waGo"), miss=document.getElementById("waMissing");
  function openWA(){
    if(cfg.whatsappNumber){waGo.href=`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.whatsappMessage||"")}`;waGo.style.pointerEvents="auto";waGo.style.opacity=1;miss.hidden=true}
    else{waGo.href="#";waGo.style.pointerEvents="none";waGo.style.opacity=.45;miss.hidden=false}
    modal.classList.add("open");
  }
  document.getElementById("openWhatsAppTop").onclick=openWA;
  document.getElementById("openWhatsAppFloat").onclick=openWA;
  document.getElementById("waClose").onclick=()=>modal.classList.remove("open");
  modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};

  render();
})();