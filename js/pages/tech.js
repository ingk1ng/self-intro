(function(){
  function init(){
    document.querySelectorAll('.mm-leaf').forEach(function(leaf){
      leaf.addEventListener('click',function(){
        var open=leaf.classList.toggle('open');
        if(open){
          var sibs=leaf.parentNode.children;
          for(var i=0;i<sibs.length;i++){if(sibs[i]!==leaf){sibs[i].classList.remove('open');}}
        }
      });
    });
    document.querySelectorAll('.pj-toggle').forEach(function(btn){
      btn.addEventListener('click',function(){
        var card=btn.closest('.project-card');
        var code=card.querySelector('.pj-code');
        var open=code.classList.toggle('open');
        btn.textContent=open?'收起代码 ▴':'查看核心代码 ▾';
      });
    });
  }
  if(document.readyState!=='loading'){init();}
  else{document.addEventListener('DOMContentLoaded',init);}
})();
