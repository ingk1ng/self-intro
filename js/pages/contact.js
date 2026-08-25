(function(){
  function init(){
    var modal=document.getElementById('qrModal');
    var card=document.getElementById('wechatCard');
    var close=document.getElementById('qrClose');
    if(!modal||!card)return;
    function open(){modal.classList.add('open');document.body.style.overflow='hidden';}
    function hide(){modal.classList.remove('open');document.body.style.overflow='';}
    card.addEventListener('click',open);
    close.addEventListener('click',hide);
    modal.addEventListener('click',function(e){if(e.target===modal){hide();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){hide();}});
  }
  if(document.readyState!=='loading'){init();}
  else{document.addEventListener('DOMContentLoaded',init);}
})();
