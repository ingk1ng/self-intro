(function(){
  const root=document.documentElement;
  const STORE_KEY='jj-theme';
  function getStored(){try{return localStorage.getItem(STORE_KEY);}catch(e){return null;}}
  function setStored(v){try{localStorage.setItem(STORE_KEY,v);}catch(e){}}
  function applyTheme(t){
    if(t==='dark'){root.setAttribute('data-theme','dark');}
    else{root.removeAttribute('data-theme');}
  }
  const stored=getStored();
  if(stored==='dark'||stored==='light'){applyTheme(stored);}
  else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){applyTheme('dark');}
  if(window.matchMedia){
    const mq=window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener&&mq.addEventListener('change',e=>{
      if(!getStored()){applyTheme(e.matches?'dark':'light');}
    });
  }
  window.addEventListener('storage',function(e){
    if(e.key===STORE_KEY){
      const v=e.newValue;
      if(v==='dark'||v==='light'){applyTheme(v);}
    }
  });
  let _guard=false;
  new MutationObserver(function(){
    if(_guard)return;
    var s=getStored();
    var shouldDark=s==='dark'||(!s&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
    var isDark=root.getAttribute('data-theme')==='dark';
    if(isDark!==shouldDark){_guard=true;applyTheme(shouldDark?'dark':'light');_guard=false;}
  }).observe(root,{attributes:true,attributeFilter:['data-theme']});

  const nav=document.querySelector('.nav');
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  const top=document.querySelector('.footer-top');
  const themeBtn=document.querySelector('.theme-toggle');

  function onScroll(){
    if(nav){nav.classList.toggle('scrolled',window.scrollY>20);}
    if(top){top.classList.toggle('show',window.scrollY>400);}
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  if(toggle&&links){
    toggle.addEventListener('click',()=>{
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('.nav-link').forEach(a=>{
      a.addEventListener('click',()=>{
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
  if(themeBtn){
    var curMode=stored==='dark'?'dark':stored==='light'?'light':'auto';
    themeBtn.setAttribute('data-mode',curMode);
    themeBtn.setAttribute('title','主题：'+(curMode==='auto'?'跟随系统':curMode==='dark'?'暗色':'亮色'));
    themeBtn.addEventListener('click',()=>{
      var mode=themeBtn.getAttribute('data-mode');
      var next=mode==='auto'?'light':mode==='light'?'dark':'auto';
      themeBtn.setAttribute('data-mode',next);
      themeBtn.setAttribute('title','主题：'+(next==='auto'?'跟随系统':next==='dark'?'暗色':'亮色'));
      if(next==='auto'){
        try{localStorage.removeItem(STORE_KEY);}catch(e){}
        var sysDark=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(sysDark?'dark':'light');
      }else{
        applyTheme(next);
        setStored(next);
      }
    });
  }
  if(top){top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}

  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path){a.classList.add('active');}
  });
})();
