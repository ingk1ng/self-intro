(function(){
  const DICT={
    '爱玩游戏':['爱玩游戏','FPS / 单机 / 独立游戏通吃，猛攻3000+小时不嫌腻'],
    '南方人北漂求学':['南方人·北漂求学','跨越上千公里奔赴冰城哈理工，零下二十度还能出门逛gai'],
    '喜欢科学技术':['喜欢科学技术','通信技术/半导体/AI前沿资讯重度爱好者，数码论坛常驻'],
    '资深游戏佬':['资深游戏佬','每次死亡都是成长，攻略经验与心态双双满级，死磕到底'],
    '宅男属性':['宅男属性','周末不挪窝星人，番剧/游戏/外卖三件套即可高质量续命'],
    '通信技术':['通信技术','通信工程专业，正在啃基带信号与通信原理，向往搞懂5G每一层'],
    '编程实践':['编程实践','高三起自学编程，Hello World到独立开发网站，一步步打怪升级'],
    '基带参数':['基带参数','手机党硬核玩家，日常扒Soc基带与射频参数，研究信号玄学'],
    '自学能力':['自学能力','AI工具+官方文档+实战三步走，新技能一般一周内入门做Demo'],
    '科技探索':['科技探索','爱折腾新数码、新芯片、新模型，蹲发布会是年度仪式感'],
    'Python':['Python','最顺手的主力语言，数据处理/自动化脚本/爬虫开发样样行'],
    '爬虫开发':['爬虫开发','用Requests/Scrapy扒过电影/数码/房源，限速礼仪+反爬经验点满'],
    'AI 工具':['AI工具','TraeCode/Work深度用户，把AI融入编程/润色/头脑风暴全流程'],
    '网络协议':['网络协议','TCP/IP+无线接入流程，实战涉及 ARP、路由协议字段校验'],
    'Pandas':['Pandas','数据清洗/透视/聚合的瑞士军刀，处理大表比Excel快十倍'],
    'DrissionPage':['DrissionPage','轻量浏览器自动化+请求二合一，小红书/12306 实战利器'],
    '问题排查':['问题排查','分治定位+最小复现+逐层验证，抽丝剥茧揪Bug根源'],
    '信号处理':['信号处理','滤波/采样/FFT频谱分析基础，MATLAB+Python 双向实战'],
    'Requests':['Requests','Python最稳HTTP库，接口调用+数据采集一把梭，带会话/代理/重试全技能'],
    '电子电路':['电子电路','模电数电基础入门，焊接过面包板，能看懂基础原理图并搭建简单电路'],
    'API 调用':['API调用','RESTful/官方接口全场景实战，12306余票、天气、翻译接口都跑通过'],
    'Word/Excel 自动化':['办公文档自动化','openpyxl + python-docx 批量生成试卷答案，省掉重复手工操作'],
    '数据清洗':['数据清洗','爬虫原始数据去重/补字段/转格式一条龙，脏数据秒变结构化CSV']
  };
  const DIRS=['top','bottom','left','right'];
  const MARGIN=10;
  const HIDE_DELAY=300;
  let tip=null;
  let hideTimer=null;
  function build(){
    if(tip)return;
    tip=document.createElement('div');
    tip.className='p5-tooltip';
    tip.innerHTML='<div class="p5-stripes"></div><div class="p5-title"></div><div class="p5-desc"></div>';
    tip.addEventListener('mouseenter',()=>{clearTimeout(hideTimer);hideTimer=null;});
    tip.addEventListener('mouseleave',hide);
    document.body.appendChild(tip);
  }
  function pickDir(r,w,h){
    const first=Math.floor(Math.random()*4);
    const vw=window.innerWidth,vh=window.innerHeight;
    for(let i=0;i<4;i++){
      const d=DIRS[(first+i)%4];
      let ok=true;
      if(d==='top'){
        const y=r.top-h-MARGIN;
        if(y<0)ok=false;
      }else if(d==='bottom'){
        const y=r.bottom+MARGIN+h;
        if(y>vh)ok=false;
      }else if(d==='left'){
        const x=r.left-w-MARGIN;
        if(x<0)ok=false;
      }else if(d==='right'){
        const x=r.right+MARGIN+w;
        if(x>vw)ok=false;
      }
      if(ok)return d;
    }
    return DIRS[first];
  }
  function show(tag){
    const key=tag.textContent.trim();
    const info=DICT[key];
    if(!info)return;
    clearTimeout(hideTimer);hideTimer=null;
    build();
    tip.querySelector('.p5-title').textContent=info[0];
    tip.querySelector('.p5-desc').textContent=info[1];
    tip.classList.remove('p5-in','dir-top','dir-bottom','dir-left','dir-right');
    tip.style.visibility='hidden';
    tip.style.left='0px';tip.style.top='0px';
    requestAnimationFrame(()=>{
      const tw=tip.offsetWidth,th=tip.offsetHeight;
      const r=tag.getBoundingClientRect();
      const dir=pickDir(r,tw,th);
      let left=0,top=0;
      const vw=window.innerWidth;
      if(dir==='top'||dir==='bottom'){
        left=r.left+(r.width/2)-(tw/2);
        if(left<MARGIN)left=MARGIN;
        if(left+tw+MARGIN>vw)left=vw-tw-MARGIN;
      }else{
        top=r.top+(r.height/2)-(th/2);
        if(top<MARGIN)top=MARGIN;
        if(top+th+MARGIN>window.innerHeight)top=window.innerHeight-th-MARGIN;
      }
      if(dir==='top')top=r.top-th-MARGIN;
      else if(dir==='bottom')top=r.bottom+MARGIN;
      else if(dir==='left')left=r.left-tw-MARGIN;
      else if(dir==='right')left=r.right+MARGIN;
      tip.classList.add('dir-'+dir);
      tip.style.left=left+'px';
      tip.style.top=top+'px';
      tip.style.visibility='visible';
      requestAnimationFrame(()=>{tip.classList.add('p5-in');});
    });
  }
  function hide(){
    if(!tip)return;
    clearTimeout(hideTimer);
    hideTimer=setTimeout(()=>{
      if(tip)tip.classList.remove('p5-in');
      setTimeout(()=>{if(tip)tip.style.visibility='hidden';},240);
    },HIDE_DELAY);
  }
  function initTags(){
    const tags=document.querySelectorAll('.hero-tags .tag, .tag-cloud .tag');
    tags.forEach(t=>{
      t.addEventListener('mouseenter',()=>show(t));
      t.addEventListener('mouseleave',hide);
      t.addEventListener('focus',()=>show(t));
      t.addEventListener('blur',hide);
    });
  }
  function reveal(){
    const els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
    },{threshold:.15});
    els.forEach(e=>io.observe(e));
  }
  function ripples(){
    const bg=document.querySelector('.hero-bg');
    if(!bg)return;
    const count=7;
    const colors=['','green','purple'];
    for(let i=0;i<count;i++){
      const r=document.createElement('span');
      r.className='ripple '+colors[Math.floor(Math.random()*colors.length)];
      r.style.left=Math.random()*100+'%';
      r.style.top=Math.random()*100+'%';
      r.style.animationDelay=(Math.random()*4)+'s';
      r.style.animationDuration=(3+Math.random()*3)+'s';
      bg.appendChild(r);
    }
  }
  function initMindmap(){
    const wrap=document.querySelector('.mindmap');
    if(!wrap)return;
    const svg=wrap.querySelector('.mm-lines');
    if(!svg)return;
    const NS='http://www.w3.org/2000/svg';
    const strokeColors=['#4f7cff','#109e7d','#8b3fd1','#e0573f'];
    function draw(){
      const w=wrap.scrollWidth,h=wrap.scrollHeight;
      svg.setAttribute('viewBox','0 0 '+w+' '+h);
      svg.setAttribute('width',w);svg.setAttribute('height',h);
      while(svg.firstChild)svg.removeChild(svg.firstChild);
      const defs=document.createElementNS(NS,'defs');
      defs.innerHTML='<linearGradient id="mmGrad" x1="0" y1="0" x2="1" y2="1">'+
        '<stop offset="0%" stop-color="#4f7cff"/>'+
        '<stop offset="50%" stop-color="#a855f7"/>'+
        '<stop offset="100%" stop-color="#1ec39a"/>'+
        '</linearGradient>';
      svg.appendChild(defs);
      const wrapRect=wrap.getBoundingClientRect();
      const center=wrap.querySelector('.mm-center');
      const branches=wrap.querySelectorAll('.mm-grid .mm-branch');
      if(!center||!branches.length)return;
      const cRect=center.getBoundingClientRect();
      const sx=cRect.left+cRect.width/2-wrapRect.left;
      const sy=cRect.bottom-wrapRect.top+4;
      branches.forEach((br,idx)=>{
        const bRect=br.getBoundingClientRect();
        const ex=bRect.left+bRect.width/2-wrapRect.left;
        const ey=bRect.top-wrapRect.top-4;
        const dy=Math.max(40,ey-sy);
        const cp1y=sy+dy*0.55;
        const cp2y=ey-dy*0.35;
        const d='M'+sx+' '+sy+' C'+sx+' '+cp1y+','+ex+' '+cp2y+','+ex+' '+ey;
        const color=strokeColors[idx]||'url(#mmGrad)';
        const g=document.createElementNS(NS,'path');
        g.setAttribute('class','glow');g.setAttribute('d',d);
        g.setAttribute('stroke',color);svg.appendChild(g);
        const p=document.createElementNS(NS,'path');
        p.setAttribute('d',d);p.setAttribute('stroke',color);svg.appendChild(p);
      });
    }
    draw();
    if('ResizeObserver'in window){
      const ro=new ResizeObserver(()=>{requestAnimationFrame(draw);});
      ro.observe(wrap);
      ro.observe(wrap.querySelector('.mm-grid'));
      const c=wrap.querySelector('.mm-center');if(c)ro.observe(c);
      wrap.querySelectorAll('.mm-branch').forEach(b=>ro.observe(b));
    }
    let rAF=null;
    window.addEventListener('resize',()=>{if(rAF)cancelAnimationFrame(rAF);rAF=requestAnimationFrame(draw);});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
    setTimeout(draw,100);setTimeout(draw,400);setTimeout(draw,900);
  }
  function initSectionSwitch(){
    const main=document.querySelector('main');if(!main)return;
    const sections=Array.from(main.children).filter(function(el){return el.tagName==='SECTION';});
    if(sections.length<2)return;
    const ind=document.createElement('div');
    ind.className='section-indicator';
    document.body.appendChild(ind);
    let curIdx=0,isSwitching=false,osTop=0,osBot=0,resetTimer=null;
    function getTitle(s){
      var h=s.querySelector('h1,h2,h3');if(!h)return '板块';
      var t=h.textContent.trim();return t.length>12?t.slice(0,12)+'…':t;
    }
    function updateCur(){
      var center=window.scrollY+innerHeight/2,min=Infinity,idx=0;
      sections.forEach(function(s,i){
        var r=s.getBoundingClientRect(),sc=r.top+scrollY+r.height/2,d=Math.abs(center-sc);
        if(d<min){min=d;idx=i;}
      });curIdx=idx;
    }
    function show(dir){
      var i=curIdx+dir;if(i<0||i>=sections.length)return;
      var t=getTitle(sections[i]);
      ind.textContent=(dir<0?'↑ 上一板块 · ':'↓ 下一板块 · ')+t;
      ind.classList.add('show');
      setTimeout(function(){ind.classList.remove('show');},850);
    }
    function go(dir){
      if(isSwitching)return;
      var i=curIdx+dir;if(i<0||i>=sections.length)return;
      isSwitching=true;curIdx=i;show(dir);
      sections[i].scrollIntoView({behavior:'smooth',block:'start'});
      osTop=0;osBot=0;
      setTimeout(function(){isSwitching=false;},850);
    }
    window.addEventListener('wheel',function(e){
      updateCur();
      if(resetTimer)clearTimeout(resetTimer);
      resetTimer=setTimeout(function(){osTop=0;osBot=0;},160);
      if(isSwitching)return;
      var cur=sections[curIdx],r=cur.getBoundingClientRect();
      var top=r.top>=-20&&r.top<=40;
      var bot=r.bottom<=innerHeight+20&&r.bottom>=innerHeight-40;
      if(e.deltaY<0&&top){osTop+=Math.abs(e.deltaY);if(osTop>240)go(-1);}
      else if(e.deltaY>0&&bot){osBot+=e.deltaY;if(osBot>240)go(1);}
    },{passive:true});
    setTimeout(updateCur,100);
    window.addEventListener('scroll',updateCur,{passive:true});
  }
  function init(){
    reveal();
    ripples();
    initTags();
    initMindmap();
    initSectionSwitch();
  }
  if(document.readyState!=='loading'){init();}
  else{document.addEventListener('DOMContentLoaded',init);}
})();
