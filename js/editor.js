(function(){
  var KEY='jj-admin';
  var params=new URLSearchParams(location.search);
  if(params.get('edit')!==KEY)return;
  document.title='✏️ '+document.title;
  var SELECTORS='h1,h2,h3,h4,p,span.tag,span.g-name,span.g-meta,span.g-desc,span.g-tag,div.subtitle,div.nickname,div.hero-page-title,div.cc-value,div.cc-action,div.ec-tag,div.entry-arrow,div.tn-label,div.tn-city,div.tn-desc,div.tc-city,div.tc-date,div.tc-title,div.tc-body,div.mc-title,div.mc-sub,div.mb-icon,div.lf-desc,div.pj-cat,div.pj-desc,div.mm-tip,div.ot-quote,div.ot-name,div.fc-name small,div.qr-title,div.qr-sub,div.qr-wx,div.contact-note,div.block-head .sub,div.section-head p,div.th-eyebrow,div.th-desc,div.th-stats strong,div.th-stats span,div.tc-meta span,span.mini-tag,span.tm-ico,div.tc-story p';
  document.querySelectorAll(SELECTORS).forEach(function(el){
    el.setAttribute('contenteditable','true');
    el.style.outline='1px dashed rgba(79,124,255,.35)';
    el.style.outlineOffset='2px';
    el.style.cursor='text';
    el.addEventListener('focus',function(){el.style.outline='2px solid #4f7cff';el.style.background='rgba(79,124,255,.06)';});
    el.addEventListener('blur',function(){el.style.outline='1px dashed rgba(79,124,255,.35)';el.style.background='';});
  });
  var bar=document.createElement('div');
  bar.id='jj-editor-bar';
  bar.innerHTML='<style>#jj-editor-bar{position:fixed;bottom:0;left:0;right:0;z-index:99999;display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 20px;background:rgba(18,22,32,.92);backdrop-filter:blur(10px);color:#fff;font-family:"Noto Sans SC",sans-serif;font-size:14px;box-shadow:0 -4px 20px rgba(0,0,0,.15)}#jj-editor-bar button{padding:8px 18px;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:transform .2s,box-shadow .2s}#jj-editor-bar button:hover{transform:translateY(-1px)}#jj-editor-bar .btn-export{background:linear-gradient(135deg,#4f7cff,#a855f7);color:#fff;box-shadow:0 4px 14px rgba(79,124,255,.35)}#jj-editor-bar .btn-exit{background:rgba(255,255,255,.12);color:#fff}#jj-editor-bar .info{color:#a7afc3;font-size:12.5px}#jj-editor-bar .dot{width:8px;height:8px;border-radius:50%;background:#1ec39a;animation:jj-pulse 1.5s infinite}@keyframes jj-pulse{0%,100%{opacity:1}50%{opacity:.4}}</style><span class="dot"></span><span>编辑模式</span><span class="info">点击任意文本直接修改 · 导出后替换对应 HTML 文件推送即可</span><button class="btn-export" id="jj-export">导出 HTML</button><button class="btn-exit" id="jj-exit">退出</button>';
  document.body.appendChild(bar);
  document.body.style.paddingBottom='52px';
  document.getElementById('jj-exit').addEventListener('click',function(){
    var u=location.pathname+location.hash;
    location.href=u;
  });
  document.getElementById('jj-export').addEventListener('click',function(){
    document.querySelectorAll('[contenteditable]').forEach(function(el){
      el.removeAttribute('contenteditable');
      el.style.outline='';el.style.outlineOffset='';el.style.cursor='';el.style.background='';
    });
    var bar2=document.getElementById('jj-editor-bar');
    if(bar2)bar2.remove();
    document.body.style.paddingBottom='';
    var html='<!DOCTYPE html>\n'+document.documentElement.outerHTML;
    var blob=new Blob([html],{type:'text/html;charset=utf-8'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=location.pathname.split('/').pop()||'index.html';
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(a.href);},1000);
  });
})();
