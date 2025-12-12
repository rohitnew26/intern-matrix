import{j as e,_ as Nt,F as Ct,a as kt,b as Me,s as $,p as St,u as Pt,g as ue,c as At,R as Et,f as It,d as _t,e as Dt}from"./index-BxTy90uP.js";import{r as n,d as Fe,a as Mt,u as Ft}from"./router-Z28cWG60.js";import{L as zt}from"./LazyImage-DPWcYv9P.js";import{c as ze}from"./phonepeService-06ZOpbw5.js";import{v as Rt,w as Lt,x as Ie,m as Tt,d as Ot}from"./ui-DI8vkpLQ.js";import"./react-Bq7xPAhO.js";const Ut="/assets/1-CIVD34lc.svg",$t="/assets/2-Cqmnlc47.svg",Bt="/assets/3-Ct-_UL6q.svg",Wt=()=>null;function Yt(){return e.jsx("div",{className:"flex items-center justify-center w-full h-full py-10",children:e.jsx("div",{className:"w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"})})}const qt="/assets/firework-BP420dZV.mp3",Ht=({buttonLabel:t="Apply Offer",duration:s=3e3,playSound:a=!0,onApply:l=()=>{},trigger:m=!1,onStart:c=()=>{},discountPercentage:o=25})=>{const[p,i]=n.useState(!1),g=n.useRef(null),x=n.useRef(null),b=n.useRef(null),v=n.useRef(!1),E=n.useRef(null);n.useEffect(()=>{E.current=new Audio(qt),E.current.preload="auto",E.current.volume=1},[]);const j=n.useCallback(()=>{if(!a||v.current)return;const w=E.current;w&&(w.currentTime=0,w.play().catch(()=>{}))},[a]);n.useEffect(()=>{try{const w=window.matchMedia("(prefers-reduced-motion: reduce)");v.current=w.matches,w.addEventListener("change",I=>v.current=I.matches)}catch{}},[]);const C=n.useCallback((w,I=2e3)=>{if(!w)return;const P=w.getContext("2d");let M=w.width=window.innerWidth,R=w.height=window.innerHeight;const D=(k,se)=>Math.random()*(se-k)+k,h=["#ff6b6b","#f8c102","#4ade80","#60a5fa","#a78bfa","#fb923c","#f472b6"],U=Array.from({length:100}).map(()=>({x:D(0,M),y:D(-100,0),vx:D(-2,2),vy:D(2,8),size:D(6,14),color:h[Math.floor(D(0,h.length))]})),B=()=>{P.clearRect(0,0,M,R),U.forEach(k=>{k.x+=k.vx,k.y+=k.vy,k.vy+=.1,P.fillStyle=k.color,P.fillRect(k.x,k.y,k.size,k.size)}),x.current=requestAnimationFrame(B)};x.current=requestAnimationFrame(B),b.current=setTimeout(()=>{cancelAnimationFrame(x.current),P.clearRect(0,0,M,R)},I)},[]),S=n.useCallback(async(w=2e3)=>{if(!v.current)try{const P=(await Nt(()=>import("./confetti.module-C2jkTI5u.js"),[])).default,M=Date.now()+w,R=setInterval(()=>{if(Date.now()>M)return clearInterval(R);P({particleCount:60,spread:70,origin:{x:Math.random(),y:Math.random()*.4}})},200)}catch{C(g.current,w)}},[C]),O=n.useCallback(()=>{i(!0),j(),S(s),b.current=setTimeout(()=>{i(!1),l()},s+2e3)},[s,j,l]);return n.useEffect(()=>{m&&(c(),O())},[m]),n.useEffect(()=>()=>{x.current&&cancelAnimationFrame(x.current),b.current&&clearTimeout(b.current)},[]),e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"oc-btn",onClick:O,children:["🎉 ",t]}),e.jsx("canvas",{ref:g,style:{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:50}}),p&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm",children:e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-xl text-center",children:e.jsxs("h2",{className:"text-2xl font-bold text-yellow-600",children:["🎊 Congratulations! Enjoy your extra ",o,"% discount!"]})})})]})},Vt=({isOpen:t,onClose:s,user:a,course:l,courseIdentifier:m,courseSlug:c,courseName:o,priceCents:p,displayAmount:i})=>{const[g,x]=n.useState(""),[b,v]=n.useState(!1),E=async()=>{x(""),v(!0);try{const j={amount:Number(i)||0,currency:"INR",courseId:l?.id||m,courseSlug:c,userEmail:a?.email,userName:a?.user_metadata?.full_name||a?.email},C=await ze(j),S=C?.redirectUrl||C?.intentUrl;if(S){window.location.href=S;return}x("PhonePe payment link unavailable. Please retry.")}catch(j){x(j?.message||"Unable to start PhonePe payment.")}finally{v(!1)}};return t?e.jsxs("div",{className:"fixed inset-0 z-50",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70",onClick:s}),e.jsxs("div",{className:"relative z-10 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900",children:"Secure Your Seat"}),e.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-900 text-2xl leading-none",children:"×"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2",children:e.jsx("svg",{className:"w-8 h-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})})}),e.jsx("h4",{className:"text-xl font-bold text-gray-900",children:"Complete Your Payment"}),e.jsx("p",{className:"text-sm text-gray-600 max-w-md mx-auto",children:"You will be redirected to PhonePe's secure payment gateway to complete your enrollment."}),e.jsxs("div",{className:"bg-gray-50 rounded-lg px-4 py-3 inline-block",children:[e.jsx("p",{className:"text-xs text-gray-500 uppercase tracking-wide mb-1",children:"Amount to Pay"}),e.jsxs("p",{className:"text-3xl font-bold text-gray-900",children:["₹",i]})]})]}),g&&e.jsx("div",{className:"bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm",children:g}),e.jsx("button",{onClick:E,disabled:b,className:"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2",children:b?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting to PhonePe..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Proceed to Payment"]})}),e.jsx("p",{className:"text-xs text-center text-gray-500",children:"🔒 Secured by PhonePe Payment Gateway"})]})]})]}):null},Jt=()=>e.jsxs("div",{className:"w-full bg-white py-10 px-4 sm:px-8 md:px-16",children:[e.jsx("div",{className:"h-9 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse"}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5,6].map(t=>e.jsx("div",{className:"w-full bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6 animate-pulse",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"h-5 w-64 bg-gray-200 rounded-md mb-3"}),e.jsx("div",{className:"h-4 w-80 bg-gray-200 rounded-md mb-2"}),e.jsx("div",{className:"h-4 w-60 bg-gray-200 rounded-md"})]}),e.jsx("div",{className:"h-6 w-6 bg-gray-200 rounded-full ml-3"})]})},t))})]});let Gt={data:""},Zt=t=>{if(typeof window=="object"){let s=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(t||document.head).appendChild(s),s.firstChild}return t||Gt},Kt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Qt=/\/\*[^]*?\*\/|  +/g,_e=/\n+/g,L=(t,s)=>{let a="",l="",m="";for(let c in t){let o=t[c];c[0]=="@"?c[1]=="i"?a=c+" "+o+";":l+=c[1]=="f"?L(o,c):c+"{"+L(o,c[1]=="k"?"":s)+"}":typeof o=="object"?l+=L(o,s?s.replace(/([^,])+/g,p=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,p):p?p+" "+i:i)):c):o!=null&&(c=/^--/.test(c)?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),m+=L.p?L.p(c,o):c+":"+o+";")}return a+(s&&m?s+"{"+m+"}":m)+l},F={},Re=t=>{if(typeof t=="object"){let s="";for(let a in t)s+=a+Re(t[a]);return s}return t},Xt=(t,s,a,l,m)=>{let c=Re(t),o=F[c]||(F[c]=(i=>{let g=0,x=11;for(;g<i.length;)x=101*x+i.charCodeAt(g++)>>>0;return"go"+x})(c));if(!F[o]){let i=c!==t?t:(g=>{let x,b,v=[{}];for(;x=Kt.exec(g.replace(Qt,""));)x[4]?v.shift():x[3]?(b=x[3].replace(_e," ").trim(),v.unshift(v[0][b]=v[0][b]||{})):v[0][x[1]]=x[2].replace(_e," ").trim();return v[0]})(t);F[o]=L(m?{["@keyframes "+o]:i}:i,a?"":"."+o)}let p=a&&F.g?F.g:null;return a&&(F.g=F[o]),((i,g,x,b)=>{b?g.data=g.data.replace(b,i):g.data.indexOf(i)===-1&&(g.data=x?i+g.data:g.data+i)})(F[o],s,l,p),o},es=(t,s,a)=>t.reduce((l,m,c)=>{let o=s[c];if(o&&o.call){let p=o(a),i=p&&p.props&&p.props.className||/^go/.test(p)&&p;o=i?"."+i:p&&typeof p=="object"?p.props?"":L(p,""):p===!1?"":p}return l+m+(o??"")},"");function te(t){let s=this||{},a=t.call?t(s.p):t;return Xt(a.unshift?a.raw?es(a,[].slice.call(arguments,1),s.p):a.reduce((l,m)=>Object.assign(l,m&&m.call?m(s.p):m),{}):a,Zt(s.target),s.g,s.o,s.k)}let Le,me,pe;te.bind({g:1});let z=te.bind({k:1});function ts(t,s,a,l){L.p=s,Le=t,me=a,pe=l}function T(t,s){let a=this||{};return function(){let l=arguments;function m(c,o){let p=Object.assign({},c),i=p.className||m.className;a.p=Object.assign({theme:me&&me()},p),a.o=/ *go\d+/.test(i),p.className=te.apply(a,l)+(i?" "+i:"");let g=t;return t[0]&&(g=p.as||t,delete p.as),pe&&g[0]&&pe(p),Le(g,p)}return m}}var ss=t=>typeof t=="function",he=(t,s)=>ss(t)?t(s):t,as=(()=>{let t=0;return()=>(++t).toString()})(),rs=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");t=!s||s.matches}return t}})(),ns=20,Te="default",Oe=(t,s)=>{let{toastLimit:a}=t.settings;switch(s.type){case 0:return{...t,toasts:[s.toast,...t.toasts].slice(0,a)};case 1:return{...t,toasts:t.toasts.map(o=>o.id===s.toast.id?{...o,...s.toast}:o)};case 2:let{toast:l}=s;return Oe(t,{type:t.toasts.find(o=>o.id===l.id)?1:0,toast:l});case 3:let{toastId:m}=s;return{...t,toasts:t.toasts.map(o=>o.id===m||m===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return s.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==s.toastId)};case 5:return{...t,pausedAt:s.time};case 6:let c=s.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+c}))}}},os=[],is={toasts:[],pausedAt:void 0,settings:{toastLimit:ns}},q={},Ue=(t,s=Te)=>{q[s]=Oe(q[s]||is,t),os.forEach(([a,l])=>{a===s&&l(q[s])})},$e=t=>Object.keys(q).forEach(s=>Ue(t,s)),ls=t=>Object.keys(q).find(s=>q[s].toasts.some(a=>a.id===t)),fe=(t=Te)=>s=>{Ue(s,t)},cs=(t,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:a?.id||as()}),Z=t=>(s,a)=>{let l=cs(s,t,a);return fe(l.toasterId||ls(l.id))({type:2,toast:l}),l.id},A=(t,s)=>Z("blank")(t,s);A.error=Z("error");A.success=Z("success");A.loading=Z("loading");A.custom=Z("custom");A.dismiss=(t,s)=>{let a={type:3,toastId:t};s?fe(s)(a):$e(a)};A.dismissAll=t=>A.dismiss(void 0,t);A.remove=(t,s)=>{let a={type:4,toastId:t};s?fe(s)(a):$e(a)};A.removeAll=t=>A.remove(void 0,t);A.promise=(t,s,a)=>{let l=A.loading(s.loading,{...a,...a?.loading});return typeof t=="function"&&(t=t()),t.then(m=>{let c=s.success?he(s.success,m):void 0;return c?A.success(c,{id:l,...a,...a?.success}):A.dismiss(l),m}).catch(m=>{let c=s.error?he(s.error,m):void 0;c?A.error(c,{id:l,...a,...a?.error}):A.dismiss(l)}),t};var ds=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,us=z`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ms=z`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ps=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ds} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${us} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ms} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,hs=z`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,fs=T("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${hs} 1s linear infinite;
`,xs=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,gs=z`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ys=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xs} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${gs} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,bs=T("div")`
  position: absolute;
`,ws=T("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,vs=z`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,js=T("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${vs} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ns=({toast:t})=>{let{icon:s,type:a,iconTheme:l}=t;return s!==void 0?typeof s=="string"?n.createElement(js,null,s):s:a==="blank"?null:n.createElement(ws,null,n.createElement(fs,{...l}),a!=="loading"&&n.createElement(bs,null,a==="error"?n.createElement(ps,{...l}):n.createElement(ys,{...l})))},Cs=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ks=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ss="0%{opacity:0;} 100%{opacity:1;}",Ps="0%{opacity:1;} 100%{opacity:0;}",As=T("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Es=T("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Is=(t,s)=>{let a=t.includes("top")?1:-1,[l,m]=rs()?[Ss,Ps]:[Cs(a),ks(a)];return{animation:s?`${z(l)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${z(m)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:t,position:s,style:a,children:l})=>{let m=t.height?Is(t.position||s||"top-center",t.visible):{opacity:0},c=n.createElement(Ns,{toast:t}),o=n.createElement(Es,{...t.ariaProps},he(t.message,t));return n.createElement(As,{className:t.className,style:{...m,...a,...t.style}},typeof l=="function"?l({icon:c,message:o}):n.createElement(n.Fragment,null,c,o))});ts(n.createElement);te`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;const _s=({chapters:t=[]})=>{const[s,a]=n.useState(null),[l,m]=n.useState(Array.isArray(t)?t:[]),c=Fe(),o=c.courseSlug||c.courseId||c.slug||c.courseParam||"";n.useEffect(()=>{if(Array.isArray(t)&&t.length){m(t);return}let i=!1;return(async()=>{if(o)try{let b=(await Me.get("/api/user/courses")).data||[];if(b&&typeof b=="object"&&!Array.isArray(b)&&(b=b.courses||b.data||[]),!Array.isArray(b)||!b.length)return;const v=$(String(o)),E=b.find(C=>[C?.slug,C?.skillId,C?.id,C?.title,C?.name].filter(Boolean).map(O=>$(String(O))).includes(v));if(!E)return;let j=[];if(Array.isArray(E.chapters))j=E.chapters;else if(typeof E.chapters=="string")try{j=JSON.parse(E.chapters)}catch{j=[]}i||m(j)}catch(x){console.warn("Failed to Load Chapters",x)}})(),()=>i=!0},[t,o]);const p=()=>{A.error("🔐 Enroll to continue watching",{style:{borderRadius:"10px",background:"#1f2937",color:"#fff",fontWeight:"600"}})};return!l||l.length===0?e.jsx("div",{className:"bg-white shadow-md rounded-xl p-6 border",children:e.jsx("p",{className:"text-gray-500 text-center text-lg",children:"No Course Content Available"})}):e.jsx("div",{className:"bg-white shadow-lg  rounded-2xl p-6 w-full",children:e.jsx("div",{className:"space-y-5",children:l.map((i,g)=>{const x=i.chapter_title||i.chapterTitle||i.title||`Chapter ${g+1}`,b=i.chapter_subtittle||i.chapter_subtitle||i.subtitle||"",v=Array.isArray(i.lessons)&&i.lessons.length?i.lessons:Array.isArray(i.content)&&i.content.length?i.content:[],E=i.video_url||i.videoUrl||"";return e.jsxs("div",{className:"border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",children:[e.jsxs("div",{className:"flex justify-between items-center bg-gray-50 hover:bg-gray-100 cursor-pointer p-4",onClick:()=>a(s===g?null:g),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-lg text-gray-900",children:x}),b&&e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:b})]}),e.jsx("span",{className:"text-indigo-600 transition",children:s===g?e.jsx(Ct,{}):e.jsx(kt,{})})]}),s===g&&e.jsx("div",{className:"bg-white p-4 animate-fadeIn space-y-4",children:v.length>0?v.map((j,C)=>e.jsxs("div",{className:"flex items-center justify-between border-b pb-3 last:border-none",children:[e.jsxs("div",{className:"flex items-center gap-3 text-gray-800",children:[j.video_url||j.videoUrl?e.jsx(Rt,{size:20}):e.jsx(Lt,{size:20}),e.jsx("span",{className:"font-medium",children:j.title||j.name||`Lesson ${C+1}`})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-600",children:j.duration||"00:00"}),e.jsx(Ie,{size:18,className:"text-gray-600"})]})]},C)):E?e.jsxs("button",{onClick:p,className:"flex items-center justify-between w-full bg-gray-50 p-3 font-medium text-gray-700 rounded-xl shadow-sm hover:shadow transition ",children:[e.jsx("span",{children:"Watch video"}),e.jsx(Ie,{size:18,className:"text-gray-600"})]}):e.jsx(Jt,{})})]},g)})})})},De=["In today's data-driven world, Python is an essential tool for unlocking insights.","This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.","You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.","Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.","You will learn to frame analysis problems using structured thinking and SMART questions.","Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.","Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.","Clean and prepare real-world data, handling missing values and validating data quality.","Summarize and interpret data using descriptive statistics to support business decisions.","By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.","Apply your Python skills through hands-on projects that simulate real data professional workflows."],Os=()=>{const t="Internmatrix@ibl",[s,a]=n.useState(""),[l,m]=n.useState(""),[c,o]=n.useState(""),[p,i]=n.useState(!1),[g,x]=n.useState(""),[b,v]=n.useState(0),E=Mt(),j=Ft(),C=Fe(),S=C.courseSlug||C.courseId||C.slug||C.courseParam||"",O=n.useMemo(()=>St(S),[S]),w=O.slug||"",I=O.id||"",{user:P,profile:M}=Pt(),R=n.useMemo(()=>[S,w,I].filter(Boolean).map(r=>$(r)),[I,w,S]),D=n.useCallback((r=[])=>!Array.isArray(r)||!r.length||!R.length?null:r.find(f=>[f?.slug,f?.skillId,f?.id,ue(f,f?.skillId||f?.id||f?.name||"course"),f?.name,f?.title].filter(Boolean).map(d=>$(d)).some(d=>R.includes(d)))||null,[R]),[h,U]=n.useState(null),[B,k]=n.useState(""),[se,xe]=n.useState(!0),[K,Be]=n.useState([]),[We,ge]=n.useState(!1),[Ye,qe]=n.useState(!1),[He,ae]=n.useState(1),[Ve,ye]=n.useState(!1),[re,Q]=n.useState(!1),[Je,be]=n.useState({utrNumber:"",fullName:"",collegeName:"",email:"",phone:"",joiningDate:"",endDate:"",isCR:"No",paymentScreenshot:null,course:""}),[Ge,ne]=n.useState(!1),[Ze,we]=n.useState(!1),W=n.useRef(null),ve=j.state||{},Ke=ve.finalOfferPrice,H=ve.course||null,[oe]=n.useState(H),X=n.useMemo(()=>{if(!S&&!w&&!I||!Array.isArray(K)||K.length===0)return null;const r=D(K);if(!r)return null;const f=ue(r,r.skillId||r.id||r.name);return{...r,slug:f}},[I,w,D,S,K]);n.useEffect(()=>{let r=!1;return(async()=>{k(""),xe(!0);try{let y=[],d=null;oe&&(d=oe,console.log("✅ Using passed course from state:",d.title));try{H&&(d=H,y=Array.isArray(y)?[H,...y]:[H]);let _=(await Me.get("/api/user/courses")).data||[];if(_&&typeof _=="object"&&!Array.isArray(_)&&(_=_.courses||_.data||_.items||[]),Array.isArray(_)&&_.length){y=_;const u=_.find(N=>{const G=$(N.title||N.name||""),jt=$(S||w||"");return G===jt});if(u){const N=Y(u.couponDiscount??u.coupondiscount??u.coupon_discount??u.discount);d={id:u.id,title:u.title,name:u.title,description:u.description,desc:u.description,instructor_name:u.instructor_name||"Instructor",instructor:u.instructor_name||"Instructor",level:u.level||"Beginner",cover_image:u.thumbnail,image:u.thumbnail,price:u.originalprice||0,offerPrice:u.offerprice||u.originalprice||0,price_cents:u.price_cents||0,category:u.category||"General",tags:u.tags?Array.isArray(u.tags)?u.tags:[]:[],rating:u.rating||4.8,duration:u.duration,lessons:u.lessons,slug:u.slug||$(u.title),content:u.content||[],chapters:u.chapters||[],couponcode:u.couponcode,couponDiscount:N}}}}catch(J){console.warn("Failed to fetch from backend API",J)}if(!d){const J=new Set,_=async u=>{const N=(u||"").trim();if(!N||J.has(N))return null;J.add(N);try{return await It(N)}catch(G){return console.warn("fetchCourseBySlug failed",N,G),null}};if(S&&(d=await _(S),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))),!d&&w&&w!==S&&(d=await _(w),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))),!d&&I)try{d=await _t(I),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))}catch(u){console.warn("fetchCourseById failed",I,u)}if(!d)try{const u=await Dt(),N=D(u);if(N){const G=ue(N,N.skillId||N.id||N.name);d={...N,slug:G},d.couponDiscount=Y(N.couponDiscount??N.coupondiscount??N.coupon_discount??N.discount)}}catch(u){console.warn("Catalog fallback failed",u)}}r||(Array.isArray(y)&&Be(y),d?U(d):X?(U(X),k("Showing saved course details while live data loads.")):(U(null),k("Course not found.")))}catch(y){r||(console.error("Failed to fetch course and skills",y),X?(U(X),k("Showing saved course details while live data loads.")):(U(null),k("Unable to load this course right now.")))}finally{r||xe(!1)}})(),()=>{r=!0}},[I,w,D,S,oe]);const[ie,Qe]=n.useState(!1),Xe="MEGA99",et=.99,tt=.25,Y=r=>{if(r==null)return;if(typeof r=="number")return r>1?Math.min(Math.max(r/100,0),.9999):Math.min(Math.max(r,0),.9999);const f=String(r).trim();if(!f)return;if(f.endsWith("%")){const d=parseFloat(f.slice(0,-1));if(!isNaN(d))return Math.min(Math.max(d/100,0),.9999)}const y=parseFloat(f.replace(/[^0-9.\-]/g,""));if(!isNaN(y))return y>1?Math.min(Math.max(y/100,0),.9999):Math.min(Math.max(y,0),.9999)},je=h?.price??(h?.price_cents?Math.round(h.price_cents/100):0),st=Ke??h?.offerPrice??je,Ne=parseFloat(String(je).replace(/[^0-9.]/g,""))||0,Ce=parseFloat(String(st).replace(/[^0-9.]/g,""))||Ne||0,le=Math.round(Ce*100),ke=Math.max(Math.round(le*(1-(p?b:0))),1),Se=le>0&&p?ke:le,ee=Math.max(Math.round(Se/100),1),ce=Math.max(Math.round(Ne),0),de=Math.max(Math.round(Ce),0),at=Math.max(Math.round(ke/100),1),rt=encodeURIComponent(j.pathname+j.search),V=h?.name||h?.title||"Course",nt=h?.subtitle||"Join this course to enhance your skills and advance your career.",ot=h?.instructor||h?.instructor_name||"Instructor",it=h?.image||h?.cover_image||"/placeholder-course.jpg",Pe=h?.level||"Beginner",lt=h?.duration||"Self-paced";h?.updated;const ct=h?.rating,dt=h?.ratersCount;Array.isArray(h?.content)&&h.content;const ut=Array.isArray(h?.chapters)?h.chapters:[],mt=r=>{const f=String(r||"").replace(/[^0-9]/g,"");return f.length>=8?f.slice(0,10):""};n.useEffect(()=>{P&&be(r=>({...r,fullName:r.fullName||M?.full_name||P.user_metadata?.full_name||"",email:r.email||P.email||"",phone:r.phone||mt(M?.phone||P.user_metadata?.phone||P.phone||""),course:r.course||V||""}))},[M,P,V]),n.useEffect(()=>()=>{W.current&&clearTimeout(W.current)},[]);const pt=()=>document.getElementById("phonepe-checkout-js")?Promise.resolve():new Promise((r,f)=>{const y=document.createElement("script");y.id="phonepe-checkout-js",y.src="https://mercury.phonepe.com/web/bundle/checkout.js",y.onload=()=>r(),y.onerror=()=>f(new Error("Failed to load PhonePe checkout")),document.body.appendChild(y)}),ht=async(r,f)=>{const y=`${f}?token=${r}`;try{if(await pt(),window.PhonePeCheckout?.transact){window.PhonePeCheckout.transact({tokenUrl:y,callback:()=>{},type:"IFRAME"});return}}catch(d){console.error("checkout.js load error",d)}window.location.href=y},ft=async()=>{if(!P){a("Please log in to continue your enrollment."),E(`/login?redirect=${rt}`);return}if(!h){a("Course data is still loading. Please try again.");return}if(!re){Q(!0),a("");try{const r=await ze({amount:ee,currency:"INR",courseId:h.id||h.skillId,courseSlug:w,userEmail:P.email,userName:M?.fullName||P.email?.split("@")[0]||"Student"}),f=r?.payPageUrl||r?.redirectUrl,y=r?.token,d=r?.checkoutBaseUrl;f?window.location.href=f:y&&d?(await ht(y,d),Q(!1)):(a("Failed to initiate payment. Please try again."),Q(!1))}catch(r){console.error("Payment error:",r);const f=r?.details?.error||r?.details?.message,y=r?.details?JSON.stringify(r.details):"";a(f||y||r.message||"Failed to create payment. Please try again."),Q(!1)}}},Ae=()=>{qe(!1),ae(1),ye(!1),ne(!1),W.current&&(clearTimeout(W.current),W.current=null)},xt=(r,f)=>{be(y=>({...y,[r]:r==="phone"?f.replace(/[^0-9]/g,"").slice(0,12):f}))},gt=()=>{ne(!0),ae("waiting"),W.current=setTimeout(()=>{ae(2),ne(!1)},2e3)},Ee=()=>{const r=c.trim();if(!r){x("Please enter a coupon code.");return}const f=r.toLowerCase().trim();if(f===Xe.toLowerCase()){i(!0),v(et),x("");return}if(!h?.couponcode){x("No coupon code available for this course."),i(!1);return}const y=h.couponcode.toLowerCase().trim();if(f!==y){x("Invalid coupon code."),i(!1),v(0);return}i(!0);const d=Y(h?.couponDiscount??h?.coupondiscount??h?.coupon_discount??h?.discount);v(typeof d=="number"?d:tt),x(""),ge(!0),setTimeout(()=>ge(!1),1200)},yt=()=>{i(!1),o(""),x(""),v(0)},bt=async()=>{try{await navigator.clipboard.writeText(t),we(!0),setTimeout(()=>we(!1),2e3)}catch(r){console.warn("Unable to copy UPI id",r)}},wt=ie?De:De.slice(0,5),vt={Beginner:"bg-green-100 text-green-800",Intermediate:"bg-yellow-100 text-yellow-800",Advanced:"bg-red-100 text-red-800"};return se?e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx(Yt,{})}):h?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-6xl mx-auto mt-10 p-6",children:[e.jsx(Wt,{}),B&&h&&e.jsx("p",{className:"text-center text-sm text-yellow-200 mb-4",children:B}),e.jsxs("div",{className:`mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 \r
  transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 \r
  flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start`,children:[e.jsx("div",{className:"mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative",children:e.jsx(zt,{src:it,alt:V,className:"w-full h-full bg-white",imgClassName:"w-full h-auto object-contain p-3 rounded-2xl",placeholderNode:e.jsx("div",{className:"flex items-center justify-center p-6",children:e.jsx("div",{className:"w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"})})})}),e.jsx("div",{className:"hidden md:flex items-center h-64",children:e.jsx("div",{className:"w-px h-full bg-white/40"})}),e.jsxs("div",{className:"flex-1 text-center md:text-left text-white",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold mb-2",children:V}),e.jsx("p",{className:"text-base sm:text-lg mb-3",children:nt}),e.jsx("span",{className:`inline-block px-3 py-1 rounded-full text-sm font-medium ${vt[Pe]||"bg-slate-200 text-slate-800"}`,children:Pe}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Tt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Duration:"})," ",lt]})]}),e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Ot,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Instructor:"})," ",ot]})]})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("p",{className:"text-xl sm:text-2xl font-bold flex items-baseline gap-2",children:[ce>0&&ce!==ee&&e.jsxs("span",{className:"text-base sm:text-lg line-through opacity-70",children:["₹",ce]}),e.jsxs("span",{children:["₹",ee]})]}),p&&e.jsxs("span",{className:"text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full",children:[Math.round((b||0)*100),"% OFF Applied"]})]}),p&&de>0&&de!==at&&e.jsxs("p",{className:`text-[1rem] text-white line-through decoration-red-300\r
`,children:["Offer Price: ₹",de]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3",children:[e.jsx("button",{onClick:ft,disabled:re,className:"bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",children:re?e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting..."]}):"Enroll Now"}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("input",{type:"text",placeholder:"Enter coupon code",value:c,onChange:r=>{o(r.target.value),g&&x("")},onKeyPress:r=>{r.key==="Enter"&&Ee()},disabled:p,className:"w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"}),p?e.jsx("button",{onClick:yt,className:"px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Remove"}):e.jsx("button",{onClick:Ee,className:"px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Apply"})]})]}),g&&e.jsx("p",{className:"text-xs text-red-100 text-left",children:g}),s&&e.jsx("p",{className:"text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left",children:s})]}),l&&e.jsxs("div",{className:`\r
      mt-3 flex items-start sm:items-center gap-2 \r
      bg-green-100 border border-green-300 \r
      text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base\r
      shadow-sm w-full max-w-full\r
    `,children:[e.jsx("span",{className:"font-bold text-green-900 text-lg",children:"✔"}),e.jsxs("p",{className:"leading-tight break-words flex-1",children:[e.jsx("span",{className:"font-semibold",children:"Success:"})," ",l]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center",children:[e.jsx(At,{className:"text-yellow-500"}),e.jsxs("span",{className:"font-semibold text-gray-800 text-lg",children:[ct," (",dt," ratings)"]})]}),h?.description&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"Course Description"}),e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:h.description}})})]}),e.jsx("h1",{className:"mt-10 font-semibold text-3xl mb-6",children:"Course Content"}),e.jsx(_s,{chapters:ut}),e.jsx("div",{className:"mt-10 p-6 bg-gray-100 rounded-2xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl",children:[e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Ut,alt:"Image 1",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"You can start NxtWave Academy right after Intermediate/12th"})]}),e.jsxs("div",{className:` h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:$t,alt:"Image 2",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Learn 6 hours a week alongside college"})]}),e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Bt,alt:"Image 3",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Land a high-paid software job irrespective of your college/branch"})]})]})}),e.jsx(Et,{}),e.jsxs("div",{className:"mt-10 mb-10",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"What You'll Learn"}),e.jsx("ul",{className:"list-disc list-inside space-y-2 text-gray-700",children:wt.map((r,f)=>e.jsx("li",{children:r},f))}),e.jsx("button",{onClick:()=>Qe(!ie),className:"mt-3 text-blue-600 font-medium hover:underline",children:ie?"Read Less":"Read More"})]})]}),e.jsx(Vt,{isOpen:Ye,onClose:Ae,enrollmentStep:He,paymentConfirmed:Ve,setPaymentConfirmed:ye,proceedToDetailsStep:gt,isAdvancingStep:Ge,handleCopyUpi:bt,upiCopied:Ze,PAYMENT_UPI_ID:t,displayAmount:ee,detailsForm:Je,handleDetailChange:xt,user:P,course:h,courseIdentifier:I,courseSlug:w,courseName:V,priceCents:Se,setCheckoutError:a,setCheckoutSuccess:m,onSuccess:Ae}),e.jsx(Ht,{trigger:We,duration:1400,playSound:!0,discountPercentage:Math.round((b||0)*100),onApply:()=>{}})]}):e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx("p",{children:B||"Course not found. Try picking another program from the catalog."})})};export{Os as default};
