(function(){
  document.addEventListener('click',function(e){
    var card=e.target.closest('.film-card');
    if(!card) return;
    var href=card.getAttribute('href');
    if(!href) return;
    e.preventDefault();
    window.open(href,'_blank','noopener');
  });
})();
