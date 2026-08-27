(function(){
  var overlay=null,img=null,caption=null;

  function build(){
    overlay=document.createElement('div');
    overlay.id='jj-lightbox';
    overlay.innerHTML='<style>#jj-lightbox{position:fixed;inset:0;z-index:100001;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);opacity:0;transition:opacity .3s ease;cursor:zoom-out}#jj-lightbox.open{opacity:1}#jj-lightbox .lb-img{max-width:90vw;max-height:85vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);transform:scale(.9);transition:transform .3s cubic-bezier(.2,.7,.2,1);object-fit:contain}#jj-lightbox.open .lb-img{transform:scale(1)}#jj-lightbox .lb-close{position:fixed;top:18px;right:22px;width:42px;height:42px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,transform .2s;z-index:2}#jj-lightbox .lb-close:hover{background:rgba(255,255,255,.25);transform:rotate(90deg)}#jj-lightbox .lb-caption{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);color:#d0d5e8;font-size:14px;font-family:"Noto Sans SC",sans-serif;text-shadow:0 2px 8px rgba(0,0,0,.6);max-width:80vw;text-align:center;opacity:0;transition:opacity .3s ease .1s}#jj-lightbox.open .lb-caption{opacity:1}#jj-lightbox .lb-counter{position:fixed;top:20px;left:50%;transform:translateX(-50%);color:#a7afc3;font-size:13px;font-family:"Noto Sans SC",sans-serif}#jj-lightbox .lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;border:none;background:rgba(255,255,255,.1);color:#fff;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,transform .2s;opacity:.7}#jj-lightbox .lb-nav:hover{background:rgba(255,255,255,.22);transform:translateY(-50%) scale(1.1);opacity:1}#jj-lightbox .lb-prev{left:20px}#jj-lightbox .lb-next{right:20px}</style><button class="lb-close" aria-label="关闭">&times;</button><div class="lb-counter" id="lb-counter"></div><button class="lb-nav lb-prev" aria-label="上一张">&#8249;</button><img class="lb-img" id="lb-img" alt=""><button class="lb-nav lb-next" aria-label="下一张">&#8250;</button><div class="lb-caption" id="lb-caption"></div>';
    document.body.appendChild(overlay);
    img=overlay.querySelector('#lb-img');
    caption=overlay.querySelector('#lb-caption');
    var counter=overlay.querySelector('#lb-counter');
    var prevBtn=overlay.querySelector('.lb-prev');
    var nextBtn=overlay.querySelector('.lb-next');
    var closeBtn=overlay.querySelector('.lb-close');

    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
    closeBtn.addEventListener('click',close);
    prevBtn.addEventListener('click',function(e){e.stopPropagation();navigate(-1);});
    nextBtn.addEventListener('click',function(e){e.stopPropagation();navigate(1);});

    document.addEventListener('keydown',function(e){
      if(!overlay.classList.contains('open'))return;
      if(e.key==='Escape')close();
      else if(e.key==='ArrowLeft')navigate(-1);
      else if(e.key==='ArrowRight')navigate(1);
    });
  }

  var currentList=[];
  var currentIdx=0;

  function show(src,alt,list,idx){
    if(!overlay)build();
    if(list&&list.length){currentList=list;currentIdx=idx;}
    else{currentList=[src];currentIdx=0;}
    updateView();
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
  }

  function updateView(){
    var item=currentList[currentIdx];
    img.src=item.src;
    img.alt=item.alt||'';
    caption.textContent=item.alt||'';
    var counter=overlay.querySelector('#lb-counter');
    counter.textContent=currentList.length>1?(currentIdx+1)+' / '+currentList.length:'';
    overlay.querySelector('.lb-prev').style.display=currentList.length>1?'flex':'none';
    overlay.querySelector('.lb-next').style.display=currentList.length>1?'flex':'none';
  }

  function navigate(dir){
    if(currentList.length<=1)return;
    currentIdx=(currentIdx+dir+currentList.length)%currentList.length;
    img.style.opacity='0';
    setTimeout(function(){updateView();img.style.opacity='1';},150);
  }

  function close(){
    if(!overlay)return;
    overlay.classList.remove('open');
    document.body.style.overflow='';
    setTimeout(function(){img.src='';},300);
  }

  function init(){
    var gid=0;
    var imgs=document.querySelectorAll('main img[src]');
    imgs.forEach(function(im){
      var parent=im.closest('.tc-photo-wall,.trip-card,.photo-wall,.gallery,.film-wall');
      var group=parent||im;
      if(!group._lbGroup){
        group._lbGroup={imgs:[]};
        if(parent)group.setAttribute('data-lb-group',++gid);
      }
      var g=group._lbGroup;
      var myIdx=g.imgs.length;
      g.imgs.push({src:im.src,alt:im.alt});
      im.style.cursor='zoom-in';
      im.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        show(im.src,im.alt,g.imgs,myIdx);
      });
    });
  }

  if(document.readyState!=='loading'){init();}
  else{document.addEventListener('DOMContentLoaded',init);}
})();