var x={prefix:"ax-",root:"ax-load",src:"ax-load-src",defaultStrategy:"immediate",alpine:{prefix:"x-",data:"x-data",cloak:"x-cloak"}},r=x;var d=t=>[...t.attributes].map(e=>e.name).filter(e=>e.startsWith(r.alpine.prefix)).filter(e=>e!==r.alpine.cloak),l=t=>{for(let e of t.attributes)t.node.setAttribute(r.prefix+e,t.node.getAttribute(e)),t.node.removeAttribute(e)},c=t=>{for(let e of t.attributes)t.node.setAttribute(e,t.node.getAttribute(r.prefix+e)),t.node.removeAttribute(r.prefix+e)};var h=class{constructor(t,e){this.status="unloaded",this.src=t.getAttribute(r.src),this.strategy=t.getAttribute(r.root)||r.defaultStrategy,this.name=t.getAttribute(r.alpine.data).split("(")[0],this.id=t.id||r.prefix+e,this.root={node:t,attributes:d(t)},t.id=this.root,this.children=[...t.querySelectorAll("*")].filter(i=>d(i).length).filter(i=>!i.hasAttribute(r.root)).filter(i=>i.closest(`[${r.root}]`)===t).map(i=>({node:i,attributes:d(i)}))}deactivate(){l(this.root);for(let t of this.children)l(t)}async download(t){this.status="loading";let e=await import(this.src),i=e[this.name]||e.default||Object.values(e)[0]||!1;!i||(t.data(this.name,i),this.activate())}activate(){c(this.root);for(let t of this.children)c(t);this.root.node.removeAttribute(r.alpine.cloak);for(let t of this.children)t.node.removeAttribute(r.alpine.cloak);this.status="loaded"}};var g=t=>new Promise(e=>{window.addEventListener("alpine-async:load",i=>{i.detail.id===t.id&&t.status==="unloaded"&&e()})}),u=g;var A=()=>new Promise(t=>{window.requestIdleCallback(()=>{t()})}),f=A;var v=(t,e)=>new Promise(i=>{let o=e.indexOf("("),a=e.slice(o),s=window.matchMedia(a);if(s.matches){i();return}s.addEventListener("change",n=>{!n.matches||t.status==="unloaded"&&i()})}),m=v;var w=(t,e)=>new Promise(i=>{let o="0px 0px 0px 0px";if(e.indexOf("(")!==-1){let s=e.indexOf("(")+1;o=e.slice(s,-1)}let a=new IntersectionObserver(s=>{!s[0].isIntersecting||(a.unobserve(t.root.node),i())},{rootMargin:o});a.observe(t.root.node)}),p=w;var y=1,b=t=>{let e=document.querySelectorAll(`[${r.root}]`);if(!!e)for(let i of e){let o=new h(i,y++);o.deactivate();let a=o.strategy.split("|").map(n=>n.trim()).filter(n=>n!=="immediate");if(!a.length){o.download(t);continue}let s=[];for(let n of a){if(n==="idle"){s.push(f());continue}if(n.startsWith("visible")){s.push(p(o,n));continue}if(n.startsWith("media")){s.push(m(o,n));continue}n==="event"&&s.push(u(o))}Promise.all(s).then(()=>{o.download(t)})}};document.addEventListener("alpine:init",()=>{b(Alpine)});
