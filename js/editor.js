(function(){
  var PWD='jj2026';
  var ENTERED=false;

  function startEdit(){
    if(ENTERED)return;ENTERED=true;
    document.title='✏️ '+document.title.replace(/^✏️ /,'');
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
  }

  function showPwdDialog(){
    var mask=document.createElement('div');
    mask.id='jj-pwd-mask';
    mask.innerHTML='<style>#jj-pwd-mask{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);backdrop-filter:blur(4px)}#jj-pwd-box{background:var(--card,#fff);border:1px solid var(--border,#e3e9f4);border-radius:16px;padding:32px 28px 24px;width:300px;box-shadow:0 12px 40px rgba(0,0,0,.25);font-family:"Noto Sans SC",sans-serif;animation:jj-pop .25s ease}#jj-pwd-box h3{margin:0 0 6px;font-size:18px;font-weight:700;color:var(--text,#1e2a44)}#jj-pwd-box .hint{font-size:12.5px;color:var(--text-dim,#6b7896);margin:0 0 18px}#jj-pwd-box input{width:100%;padding:10px 14px;border:1.5px solid var(--border,#e0e0ee);border-radius:10px;font-size:15px;font-family:inherit;outline:none;transition:border-color .2s;box-sizing:border-box;color:var(--text,#1e2a44);background:var(--card-2,#fff)}#jj-pwd-box input:focus{border-color:var(--accent,#4f7cff)}#jj-pwd-box .jj-pwd-btns{display:flex;gap:10px;margin-top:16px}#jj-pwd-box .jj-pwd-btns button{flex:1;padding:10px;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;transition:transform .15s}#jj-pwd-box .jj-pwd-btns button:hover{transform:translateY(-1px)}#jj-pwd-box .btn-ok{background:var(--grad);color:#fff}#jj-pwd-box .btn-cancel{background:var(--bg-soft,#f0f0f5);color:var(--text-dim,#666)}#jj-pwd-box .err{color:#e74c3c;font-size:12.5px;margin-top:8px;min-height:18px}@keyframes jj-pop{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}</style><div id="jj-pwd-box"><h3>编辑模式</h3><p class="hint">请输入密码以进入页面编辑</p><input type="password" id="jj-pwd-input" placeholder="输入密码" autocomplete="off"><div class="err" id="jj-pwd-err"></div><div class="jj-pwd-btns"><button class="btn-cancel" id="jj-pwd-cancel">取消</button><button class="btn-ok" id="jj-pwd-ok">确认</button></div></div>';
    document.body.appendChild(mask);
    var input=document.getElementById('jj-pwd-input');
    var err=document.getElementById('jj-pwd-err');
    input.focus();
    function close(){mask.remove();}
    function check(){
      if(input.value===PWD){close();startEdit();}
      else{err.textContent='密码错误，请重试';input.value='';input.focus();}
    }
    document.getElementById('jj-pwd-ok').addEventListener('click',check);
    document.getElementById('jj-pwd-cancel').addEventListener('click',close);
    input.addEventListener('keydown',function(e){if(e.key==='Enter')check();if(e.key==='Escape')close();});
    mask.addEventListener('click',function(e){if(e.target===mask)close();});
  }

  var footer=document.querySelector('.footer .copyright');
  if(footer){
    var entry=document.createElement('span');
    entry.id='jj-edit-entry';
    entry.innerHTML='<style>#jj-edit-entry{display:inline-flex;align-items:center;gap:4px;cursor:pointer;font-size:13px;color:var(--text-dim,#b0b0c0);opacity:.4;transition:opacity .3s ease,transform .2s ease;user-select:none;margin-left:8px;vertical-align:middle}#jj-edit-entry:hover{opacity:.85;transform:translateY(-1px)}</style><span>·</span><span>管理</span>';
    entry.addEventListener('click',showPwdDialog);
    footer.appendChild(entry);
  }

  if(location.search.indexOf('edit=')!==-1){
    var params=new URLSearchParams(location.search);
    if(params.get('edit')==='jj-admin'){startEdit();}
  }
})();