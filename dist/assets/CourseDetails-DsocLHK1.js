import{j as e,_ as wt,F as vt,a as jt,b as Ie,s as $,p as Nt,u as Ct,g as ce,c as kt,R as St,f as Pt,d as At,e as Et}from"./index-DITIZL26.js";import{r as n,d as _e,a as It,u as _t}from"./router-Z28cWG60.js";import{L as Mt}from"./LazyImage-CcOQ2sER.js";import{c as Me}from"./phonepeService-06ZOpbw5.js";import{v as Dt,w as Ft,x as Pe,m as zt,d as Rt}from"./ui-DI8vkpLQ.js";import"./react-Bq7xPAhO.js";const Lt="/assets/1-CIVD34lc.svg",Tt="/assets/2-Cqmnlc47.svg",Ot="/assets/3-Ct-_UL6q.svg",Ut=()=>null;function $t(){return e.jsx("div",{className:"flex items-center justify-center w-full h-full py-10",children:e.jsx("div",{className:"w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"})})}const Bt="/assets/firework-BP420dZV.mp3",Wt=({buttonLabel:t="Apply Offer",duration:s=3e3,playSound:a=!0,onApply:l=()=>{},trigger:m=!1,onStart:c=()=>{},discountPercentage:o=25})=>{const[p,i]=n.useState(!1),g=n.useRef(null),x=n.useRef(null),y=n.useRef(null),v=n.useRef(!1),E=n.useRef(null);n.useEffect(()=>{E.current=new Audio(Bt),E.current.preload="auto",E.current.volume=1},[]);const j=n.useCallback(()=>{if(!a||v.current)return;const w=E.current;w&&(w.currentTime=0,w.play().catch(()=>{}))},[a]);n.useEffect(()=>{try{const w=window.matchMedia("(prefers-reduced-motion: reduce)");v.current=w.matches,w.addEventListener("change",I=>v.current=I.matches)}catch{}},[]);const C=n.useCallback((w,I=2e3)=>{if(!w)return;const P=w.getContext("2d");let D=w.width=window.innerWidth,R=w.height=window.innerHeight;const M=(k,te)=>Math.random()*(te-k)+k,h=["#ff6b6b","#f8c102","#4ade80","#60a5fa","#a78bfa","#fb923c","#f472b6"],U=Array.from({length:100}).map(()=>({x:M(0,D),y:M(-100,0),vx:M(-2,2),vy:M(2,8),size:M(6,14),color:h[Math.floor(M(0,h.length))]})),B=()=>{P.clearRect(0,0,D,R),U.forEach(k=>{k.x+=k.vx,k.y+=k.vy,k.vy+=.1,P.fillStyle=k.color,P.fillRect(k.x,k.y,k.size,k.size)}),x.current=requestAnimationFrame(B)};x.current=requestAnimationFrame(B),y.current=setTimeout(()=>{cancelAnimationFrame(x.current),P.clearRect(0,0,D,R)},I)},[]),S=n.useCallback(async(w=2e3)=>{if(!v.current)try{const P=(await wt(()=>import("./confetti.module-C2jkTI5u.js"),[])).default,D=Date.now()+w,R=setInterval(()=>{if(Date.now()>D)return clearInterval(R);P({particleCount:60,spread:70,origin:{x:Math.random(),y:Math.random()*.4}})},200)}catch{C(g.current,w)}},[C]),O=n.useCallback(()=>{i(!0),j(),S(s),y.current=setTimeout(()=>{i(!1),l()},s+2e3)},[s,j,l]);return n.useEffect(()=>{m&&(c(),O())},[m]),n.useEffect(()=>()=>{x.current&&cancelAnimationFrame(x.current),y.current&&clearTimeout(y.current)},[]),e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"oc-btn",onClick:O,children:["🎉 ",t]}),e.jsx("canvas",{ref:g,style:{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:50}}),p&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm",children:e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-xl text-center",children:e.jsxs("h2",{className:"text-2xl font-bold text-yellow-600",children:["🎊 Congratulations! Enjoy your extra ",o,"% discount!"]})})})]})},Yt=({isOpen:t,onClose:s,user:a,course:l,courseIdentifier:m,courseSlug:c,courseName:o,priceCents:p,displayAmount:i})=>{const[g,x]=n.useState(""),[y,v]=n.useState(!1),E=async()=>{x(""),v(!0);try{const j={amount:Number(i)||0,currency:"INR",courseId:l?.id||m,courseSlug:c,userEmail:a?.email,userName:a?.user_metadata?.full_name||a?.email},C=await Me(j),S=C?.redirectUrl||C?.intentUrl;if(S){window.location.href=S;return}x("PhonePe payment link unavailable. Please retry.")}catch(j){x(j?.message||"Unable to start PhonePe payment.")}finally{v(!1)}};return t?e.jsxs("div",{className:"fixed inset-0 z-50",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70",onClick:s}),e.jsxs("div",{className:"relative z-10 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900",children:"Secure Your Seat"}),e.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-900 text-2xl leading-none",children:"×"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2",children:e.jsx("svg",{className:"w-8 h-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})})}),e.jsx("h4",{className:"text-xl font-bold text-gray-900",children:"Complete Your Payment"}),e.jsx("p",{className:"text-sm text-gray-600 max-w-md mx-auto",children:"You will be redirected to PhonePe's secure payment gateway to complete your enrollment."}),e.jsxs("div",{className:"bg-gray-50 rounded-lg px-4 py-3 inline-block",children:[e.jsx("p",{className:"text-xs text-gray-500 uppercase tracking-wide mb-1",children:"Amount to Pay"}),e.jsxs("p",{className:"text-3xl font-bold text-gray-900",children:["₹",i]})]})]}),g&&e.jsx("div",{className:"bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm",children:g}),e.jsx("button",{onClick:E,disabled:y,className:"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2",children:y?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting to PhonePe..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Proceed to Payment"]})}),e.jsx("p",{className:"text-xs text-center text-gray-500",children:"🔒 Secured by PhonePe Payment Gateway"})]})]})]}):null},qt=()=>e.jsxs("div",{className:"w-full bg-white py-10 px-4 sm:px-8 md:px-16",children:[e.jsx("div",{className:"h-9 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse"}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5,6].map(t=>e.jsx("div",{className:"w-full bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6 animate-pulse",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"h-5 w-64 bg-gray-200 rounded-md mb-3"}),e.jsx("div",{className:"h-4 w-80 bg-gray-200 rounded-md mb-2"}),e.jsx("div",{className:"h-4 w-60 bg-gray-200 rounded-md"})]}),e.jsx("div",{className:"h-6 w-6 bg-gray-200 rounded-full ml-3"})]})},t))})]});let Ht={data:""},Vt=t=>{if(typeof window=="object"){let s=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(t||document.head).appendChild(s),s.firstChild}return t||Ht},Jt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Gt=/\/\*[^]*?\*\/|  +/g,Ae=/\n+/g,L=(t,s)=>{let a="",l="",m="";for(let c in t){let o=t[c];c[0]=="@"?c[1]=="i"?a=c+" "+o+";":l+=c[1]=="f"?L(o,c):c+"{"+L(o,c[1]=="k"?"":s)+"}":typeof o=="object"?l+=L(o,s?s.replace(/([^,])+/g,p=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,p):p?p+" "+i:i)):c):o!=null&&(c=/^--/.test(c)?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),m+=L.p?L.p(c,o):c+":"+o+";")}return a+(s&&m?s+"{"+m+"}":m)+l},F={},De=t=>{if(typeof t=="object"){let s="";for(let a in t)s+=a+De(t[a]);return s}return t},Zt=(t,s,a,l,m)=>{let c=De(t),o=F[c]||(F[c]=(i=>{let g=0,x=11;for(;g<i.length;)x=101*x+i.charCodeAt(g++)>>>0;return"go"+x})(c));if(!F[o]){let i=c!==t?t:(g=>{let x,y,v=[{}];for(;x=Jt.exec(g.replace(Gt,""));)x[4]?v.shift():x[3]?(y=x[3].replace(Ae," ").trim(),v.unshift(v[0][y]=v[0][y]||{})):v[0][x[1]]=x[2].replace(Ae," ").trim();return v[0]})(t);F[o]=L(m?{["@keyframes "+o]:i}:i,a?"":"."+o)}let p=a&&F.g?F.g:null;return a&&(F.g=F[o]),((i,g,x,y)=>{y?g.data=g.data.replace(y,i):g.data.indexOf(i)===-1&&(g.data=x?i+g.data:g.data+i)})(F[o],s,l,p),o},Kt=(t,s,a)=>t.reduce((l,m,c)=>{let o=s[c];if(o&&o.call){let p=o(a),i=p&&p.props&&p.props.className||/^go/.test(p)&&p;o=i?"."+i:p&&typeof p=="object"?p.props?"":L(p,""):p===!1?"":p}return l+m+(o??"")},"");function ee(t){let s=this||{},a=t.call?t(s.p):t;return Zt(a.unshift?a.raw?Kt(a,[].slice.call(arguments,1),s.p):a.reduce((l,m)=>Object.assign(l,m&&m.call?m(s.p):m),{}):a,Vt(s.target),s.g,s.o,s.k)}let Fe,de,ue;ee.bind({g:1});let z=ee.bind({k:1});function Qt(t,s,a,l){L.p=s,Fe=t,de=a,ue=l}function T(t,s){let a=this||{};return function(){let l=arguments;function m(c,o){let p=Object.assign({},c),i=p.className||m.className;a.p=Object.assign({theme:de&&de()},p),a.o=/ *go\d+/.test(i),p.className=ee.apply(a,l)+(i?" "+i:"");let g=t;return t[0]&&(g=p.as||t,delete p.as),ue&&g[0]&&ue(p),Fe(g,p)}return m}}var Xt=t=>typeof t=="function",me=(t,s)=>Xt(t)?t(s):t,es=(()=>{let t=0;return()=>(++t).toString()})(),ts=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");t=!s||s.matches}return t}})(),ss=20,ze="default",Re=(t,s)=>{let{toastLimit:a}=t.settings;switch(s.type){case 0:return{...t,toasts:[s.toast,...t.toasts].slice(0,a)};case 1:return{...t,toasts:t.toasts.map(o=>o.id===s.toast.id?{...o,...s.toast}:o)};case 2:let{toast:l}=s;return Re(t,{type:t.toasts.find(o=>o.id===l.id)?1:0,toast:l});case 3:let{toastId:m}=s;return{...t,toasts:t.toasts.map(o=>o.id===m||m===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return s.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==s.toastId)};case 5:return{...t,pausedAt:s.time};case 6:let c=s.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+c}))}}},as=[],rs={toasts:[],pausedAt:void 0,settings:{toastLimit:ss}},q={},Le=(t,s=ze)=>{q[s]=Re(q[s]||rs,t),as.forEach(([a,l])=>{a===s&&l(q[s])})},Te=t=>Object.keys(q).forEach(s=>Le(t,s)),ns=t=>Object.keys(q).find(s=>q[s].toasts.some(a=>a.id===t)),pe=(t=ze)=>s=>{Le(s,t)},os=(t,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:a?.id||es()}),G=t=>(s,a)=>{let l=os(s,t,a);return pe(l.toasterId||ns(l.id))({type:2,toast:l}),l.id},A=(t,s)=>G("blank")(t,s);A.error=G("error");A.success=G("success");A.loading=G("loading");A.custom=G("custom");A.dismiss=(t,s)=>{let a={type:3,toastId:t};s?pe(s)(a):Te(a)};A.dismissAll=t=>A.dismiss(void 0,t);A.remove=(t,s)=>{let a={type:4,toastId:t};s?pe(s)(a):Te(a)};A.removeAll=t=>A.remove(void 0,t);A.promise=(t,s,a)=>{let l=A.loading(s.loading,{...a,...a?.loading});return typeof t=="function"&&(t=t()),t.then(m=>{let c=s.success?me(s.success,m):void 0;return c?A.success(c,{id:l,...a,...a?.success}):A.dismiss(l),m}).catch(m=>{let c=s.error?me(s.error,m):void 0;c?A.error(c,{id:l,...a,...a?.error}):A.dismiss(l)}),t};var is=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ls=z`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,cs=z`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ds=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${is} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ls} 0.15s ease-out forwards;
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
    animation: ${cs} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,us=z`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ms=T("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${us} 1s linear infinite;
`,ps=z`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,hs=z`
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
}`,fs=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ps} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${hs} 0.2s ease-out forwards;
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
`,xs=T("div")`
  position: absolute;
`,gs=T("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ys=z`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,bs=T("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ys} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ws=({toast:t})=>{let{icon:s,type:a,iconTheme:l}=t;return s!==void 0?typeof s=="string"?n.createElement(bs,null,s):s:a==="blank"?null:n.createElement(gs,null,n.createElement(ms,{...l}),a!=="loading"&&n.createElement(xs,null,a==="error"?n.createElement(ds,{...l}):n.createElement(fs,{...l})))},vs=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,js=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ns="0%{opacity:0;} 100%{opacity:1;}",Cs="0%{opacity:1;} 100%{opacity:0;}",ks=T("div")`
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
`,Ss=T("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ps=(t,s)=>{let a=t.includes("top")?1:-1,[l,m]=ts()?[Ns,Cs]:[vs(a),js(a)];return{animation:s?`${z(l)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${z(m)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:t,position:s,style:a,children:l})=>{let m=t.height?Ps(t.position||s||"top-center",t.visible):{opacity:0},c=n.createElement(ws,{toast:t}),o=n.createElement(Ss,{...t.ariaProps},me(t.message,t));return n.createElement(ks,{className:t.className,style:{...m,...a,...t.style}},typeof l=="function"?l({icon:c,message:o}):n.createElement(n.Fragment,null,c,o))});Qt(n.createElement);ee`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;const As=({chapters:t=[]})=>{const[s,a]=n.useState(null),[l,m]=n.useState(Array.isArray(t)?t:[]),c=_e(),o=c.courseSlug||c.courseId||c.slug||c.courseParam||"";n.useEffect(()=>{if(Array.isArray(t)&&t.length){m(t);return}let i=!1;return(async()=>{if(o)try{let y=(await Ie.get("/api/user/courses")).data||[];if(y&&typeof y=="object"&&!Array.isArray(y)&&(y=y.courses||y.data||[]),!Array.isArray(y)||!y.length)return;const v=$(String(o)),E=y.find(C=>[C?.slug,C?.skillId,C?.id,C?.title,C?.name].filter(Boolean).map(O=>$(String(O))).includes(v));if(!E)return;let j=[];if(Array.isArray(E.chapters))j=E.chapters;else if(typeof E.chapters=="string")try{j=JSON.parse(E.chapters)}catch{j=[]}i||m(j)}catch(x){console.warn("Failed to Load Chapters",x)}})(),()=>i=!0},[t,o]);const p=()=>{A.error("🔐 Enroll to continue watching",{style:{borderRadius:"10px",background:"#1f2937",color:"#fff",fontWeight:"600"}})};return!l||l.length===0?e.jsx("div",{className:"bg-white shadow-md rounded-xl p-6 border",children:e.jsx("p",{className:"text-gray-500 text-center text-lg",children:"No Course Content Available"})}):e.jsx("div",{className:"bg-white shadow-lg  rounded-2xl p-6 w-full",children:e.jsx("div",{className:"space-y-5",children:l.map((i,g)=>{const x=i.chapter_title||i.chapterTitle||i.title||`Chapter ${g+1}`,y=i.chapter_subtittle||i.chapter_subtitle||i.subtitle||"",v=Array.isArray(i.lessons)&&i.lessons.length?i.lessons:Array.isArray(i.content)&&i.content.length?i.content:[],E=i.video_url||i.videoUrl||"";return e.jsxs("div",{className:"border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",children:[e.jsxs("div",{className:"flex justify-between items-center bg-gray-50 hover:bg-gray-100 cursor-pointer p-4",onClick:()=>a(s===g?null:g),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-lg text-gray-900",children:x}),y&&e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:y})]}),e.jsx("span",{className:"text-indigo-600 transition",children:s===g?e.jsx(vt,{}):e.jsx(jt,{})})]}),s===g&&e.jsx("div",{className:"bg-white p-4 animate-fadeIn space-y-4",children:v.length>0?v.map((j,C)=>e.jsxs("div",{className:"flex items-center justify-between border-b pb-3 last:border-none",children:[e.jsxs("div",{className:"flex items-center gap-3 text-gray-800",children:[j.video_url||j.videoUrl?e.jsx(Dt,{size:20}):e.jsx(Ft,{size:20}),e.jsx("span",{className:"font-medium",children:j.title||j.name||`Lesson ${C+1}`})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-600",children:j.duration||"00:00"}),e.jsx(Pe,{size:18,className:"text-gray-600"})]})]},C)):E?e.jsxs("button",{onClick:p,className:"flex items-center justify-between w-full bg-gray-50 p-3 font-medium text-gray-700 rounded-xl shadow-sm hover:shadow transition ",children:[e.jsx("span",{children:"Watch video"}),e.jsx(Pe,{size:18,className:"text-gray-600"})]}):e.jsx(qt,{})})]},g)})})})},Ee=["In today's data-driven world, Python is an essential tool for unlocking insights.","This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.","You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.","Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.","You will learn to frame analysis problems using structured thinking and SMART questions.","Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.","Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.","Clean and prepare real-world data, handling missing values and validating data quality.","Summarize and interpret data using descriptive statistics to support business decisions.","By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.","Apply your Python skills through hands-on projects that simulate real data professional workflows."],Ls=()=>{const t="Internmatrix@ibl",[s,a]=n.useState(""),[l,m]=n.useState(""),[c,o]=n.useState(""),[p,i]=n.useState(!1),[g,x]=n.useState(""),[y,v]=n.useState(0),E=It(),j=_t(),C=_e(),S=C.courseSlug||C.courseId||C.slug||C.courseParam||"",O=n.useMemo(()=>Nt(S),[S]),w=O.slug||"",I=O.id||"",{user:P,profile:D}=Ct(),R=n.useMemo(()=>[S,w,I].filter(Boolean).map(r=>$(r)),[I,w,S]),M=n.useCallback((r=[])=>!Array.isArray(r)||!r.length||!R.length?null:r.find(f=>[f?.slug,f?.skillId,f?.id,ce(f,f?.skillId||f?.id||f?.name||"course"),f?.name,f?.title].filter(Boolean).map(d=>$(d)).some(d=>R.includes(d)))||null,[R]),[h,U]=n.useState(null),[B,k]=n.useState(""),[te,he]=n.useState(!0),[Z,Oe]=n.useState([]),[Ue,fe]=n.useState(!1),[$e,Be]=n.useState(!1),[We,se]=n.useState(1),[Ye,xe]=n.useState(!1),[ae,K]=n.useState(!1),[qe,ge]=n.useState({utrNumber:"",fullName:"",collegeName:"",email:"",phone:"",joiningDate:"",endDate:"",isCR:"No",paymentScreenshot:null,course:""}),[He,re]=n.useState(!1),[Ve,ye]=n.useState(!1),W=n.useRef(null),Je=(j.state||{}).finalOfferPrice,Q=n.useMemo(()=>{if(!S&&!w&&!I||!Array.isArray(Z)||Z.length===0)return null;const r=M(Z);if(!r)return null;const f=ce(r,r.skillId||r.id||r.name);return{...r,slug:f}},[I,w,M,S,Z]);n.useEffect(()=>{let r=!1;return(async()=>{k(""),he(!0);try{let b=[],d=null;try{let _=(await Ie.get("/api/user/courses")).data||[];if(_&&typeof _=="object"&&!Array.isArray(_)&&(_=_.courses||_.data||_.items||[]),Array.isArray(_)&&_.length){b=_;const u=_.find(N=>{const J=$(N.title||N.name||""),bt=$(S||w||"");return J===bt});if(u){const N=Y(u.couponDiscount??u.coupondiscount??u.coupon_discount??u.discount);d={id:u.id,title:u.title,name:u.title,description:u.description,desc:u.description,instructor_name:u.instructor_name||"Instructor",instructor:u.instructor_name||"Instructor",level:u.level||"Beginner",cover_image:u.thumbnail,image:u.thumbnail,price:u.originalprice||0,offerPrice:u.offerprice||u.originalprice||0,price_cents:u.price_cents||0,category:u.category||"General",tags:u.tags?Array.isArray(u.tags)?u.tags:[]:[],rating:u.rating||4.8,duration:u.duration,lessons:u.lessons,slug:u.slug||$(u.title),content:u.content||[],chapters:u.chapters||[],couponcode:u.couponcode,couponDiscount:N}}}}catch(V){console.warn("Failed to fetch from backend API",V)}if(!d){const V=new Set,_=async u=>{const N=(u||"").trim();if(!N||V.has(N))return null;V.add(N);try{return await Pt(N)}catch(J){return console.warn("fetchCourseBySlug failed",N,J),null}};if(S&&(d=await _(S),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))),!d&&w&&w!==S&&(d=await _(w),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))),!d&&I)try{d=await At(I),d&&(d.couponDiscount=Y(d.couponDiscount??d.coupondiscount??d.coupon_discount??d.discount))}catch(u){console.warn("fetchCourseById failed",I,u)}if(!d)try{const u=await Et(),N=M(u);if(N){const J=ce(N,N.skillId||N.id||N.name);d={...N,slug:J},d.couponDiscount=Y(N.couponDiscount??N.coupondiscount??N.coupon_discount??N.discount)}}catch(u){console.warn("Catalog fallback failed",u)}}r||(Array.isArray(b)&&Oe(b),d?U(d):Q?(U(Q),k("Showing saved course details while live data loads.")):(U(null),k("Course not found.")))}catch(b){r||(console.error("Failed to fetch course and skills",b),Q?(U(Q),k("Showing saved course details while live data loads.")):(U(null),k("Unable to load this course right now.")))}finally{r||he(!1)}})(),()=>{r=!0}},[I,w,M,S]);const[ne,Ge]=n.useState(!1),Ze="MEGA99",Ke=.99,Qe=.25,Y=r=>{if(r==null)return;if(typeof r=="number")return r>1?Math.min(Math.max(r/100,0),.9999):Math.min(Math.max(r,0),.9999);const f=String(r).trim();if(!f)return;if(f.endsWith("%")){const d=parseFloat(f.slice(0,-1));if(!isNaN(d))return Math.min(Math.max(d/100,0),.9999)}const b=parseFloat(f.replace(/[^0-9.\-]/g,""));if(!isNaN(b))return b>1?Math.min(Math.max(b/100,0),.9999):Math.min(Math.max(b,0),.9999)},be=h?.price??(h?.price_cents?Math.round(h.price_cents/100):0),Xe=Je??h?.offerPrice??be,we=parseFloat(String(be).replace(/[^0-9.]/g,""))||0,ve=parseFloat(String(Xe).replace(/[^0-9.]/g,""))||we||0,oe=Math.round(ve*100),je=Math.max(Math.round(oe*(1-(p?y:0))),1),Ne=oe>0&&p?je:oe,X=Math.max(Math.round(Ne/100),1),ie=Math.max(Math.round(we),0),le=Math.max(Math.round(ve),0),et=Math.max(Math.round(je/100),1),tt=encodeURIComponent(j.pathname+j.search),H=h?.name||h?.title||"Course",st=h?.subtitle||"Join this course to enhance your skills and advance your career.",at=h?.instructor||h?.instructor_name||"Instructor",rt=h?.image||h?.cover_image||"/placeholder-course.jpg",Ce=h?.level||"Beginner",nt=h?.duration||"Self-paced";h?.updated;const ot=h?.rating,it=h?.ratersCount;Array.isArray(h?.content)&&h.content;const lt=Array.isArray(h?.chapters)?h.chapters:[],ct=r=>{const f=String(r||"").replace(/[^0-9]/g,"");return f.length>=8?f.slice(0,10):""};n.useEffect(()=>{P&&ge(r=>({...r,fullName:r.fullName||D?.full_name||P.user_metadata?.full_name||"",email:r.email||P.email||"",phone:r.phone||ct(D?.phone||P.user_metadata?.phone||P.phone||""),course:r.course||H||""}))},[D,P,H]),n.useEffect(()=>()=>{W.current&&clearTimeout(W.current)},[]);const dt=()=>document.getElementById("phonepe-checkout-js")?Promise.resolve():new Promise((r,f)=>{const b=document.createElement("script");b.id="phonepe-checkout-js",b.src="https://mercury.phonepe.com/web/bundle/checkout.js",b.onload=()=>r(),b.onerror=()=>f(new Error("Failed to load PhonePe checkout")),document.body.appendChild(b)}),ut=async(r,f)=>{const b=`${f}?token=${r}`;try{if(await dt(),window.PhonePeCheckout?.transact){window.PhonePeCheckout.transact({tokenUrl:b,callback:()=>{},type:"IFRAME"});return}}catch(d){console.error("checkout.js load error",d)}window.location.href=b},mt=async()=>{if(!P){a("Please log in to continue your enrollment."),E(`/login?redirect=${tt}`);return}if(!h){a("Course data is still loading. Please try again.");return}if(!ae){K(!0),a("");try{const r=await Me({amount:X,currency:"INR",courseId:h.id||h.skillId,courseSlug:w,userEmail:P.email,userName:D?.fullName||P.email?.split("@")[0]||"Student"}),f=r?.payPageUrl||r?.redirectUrl,b=r?.token,d=r?.checkoutBaseUrl;f?window.location.href=f:b&&d?(await ut(b,d),K(!1)):(a("Failed to initiate payment. Please try again."),K(!1))}catch(r){console.error("Payment error:",r);const f=r?.details?.error||r?.details?.message,b=r?.details?JSON.stringify(r.details):"";a(f||b||r.message||"Failed to create payment. Please try again."),K(!1)}}},ke=()=>{Be(!1),se(1),xe(!1),re(!1),W.current&&(clearTimeout(W.current),W.current=null)},pt=(r,f)=>{ge(b=>({...b,[r]:r==="phone"?f.replace(/[^0-9]/g,"").slice(0,12):f}))},ht=()=>{re(!0),se("waiting"),W.current=setTimeout(()=>{se(2),re(!1)},2e3)},Se=()=>{const r=c.trim();if(!r){x("Please enter a coupon code.");return}const f=r.toLowerCase().trim();if(f===Ze.toLowerCase()){i(!0),v(Ke),x("");return}if(!h?.couponcode){x("No coupon code available for this course."),i(!1);return}const b=h.couponcode.toLowerCase().trim();if(f!==b){x("Invalid coupon code."),i(!1),v(0);return}i(!0);const d=Y(h?.couponDiscount??h?.coupondiscount??h?.coupon_discount??h?.discount);v(typeof d=="number"?d:Qe),x(""),fe(!0),setTimeout(()=>fe(!1),1200)},ft=()=>{i(!1),o(""),x(""),v(0)},xt=async()=>{try{await navigator.clipboard.writeText(t),ye(!0),setTimeout(()=>ye(!1),2e3)}catch(r){console.warn("Unable to copy UPI id",r)}},gt=ne?Ee:Ee.slice(0,5),yt={Beginner:"bg-green-100 text-green-800",Intermediate:"bg-yellow-100 text-yellow-800",Advanced:"bg-red-100 text-red-800"};return te?e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx($t,{})}):h?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-6xl mx-auto mt-10 p-6",children:[e.jsx(Ut,{}),B&&h&&e.jsx("p",{className:"text-center text-sm text-yellow-200 mb-4",children:B}),e.jsxs("div",{className:`mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 \r
  transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 \r
  flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start`,children:[e.jsx("div",{className:"mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative",children:e.jsx(Mt,{src:rt,alt:H,className:"w-full h-full bg-white",imgClassName:"w-full h-auto object-contain p-3 rounded-2xl",placeholderNode:e.jsx("div",{className:"flex items-center justify-center p-6",children:e.jsx("div",{className:"w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"})})})}),e.jsx("div",{className:"hidden md:flex items-center h-64",children:e.jsx("div",{className:"w-px h-full bg-white/40"})}),e.jsxs("div",{className:"flex-1 text-center md:text-left text-white",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold mb-2",children:H}),e.jsx("p",{className:"text-base sm:text-lg mb-3",children:st}),e.jsx("span",{className:`inline-block px-3 py-1 rounded-full text-sm font-medium ${yt[Ce]||"bg-slate-200 text-slate-800"}`,children:Ce}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(zt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Duration:"})," ",nt]})]}),e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Rt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Instructor:"})," ",at]})]})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("p",{className:"text-xl sm:text-2xl font-bold flex items-baseline gap-2",children:[ie>0&&ie!==X&&e.jsxs("span",{className:"text-base sm:text-lg line-through opacity-70",children:["₹",ie]}),e.jsxs("span",{children:["₹",X]})]}),p&&e.jsxs("span",{className:"text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full",children:[Math.round((y||0)*100),"% OFF Applied"]})]}),p&&le>0&&le!==et&&e.jsxs("p",{className:`text-[1rem] text-white line-through decoration-red-300\r
`,children:["Offer Price: ₹",le]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3",children:[e.jsx("button",{onClick:mt,disabled:ae,className:"bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",children:ae?e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting..."]}):"Enroll Now"}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("input",{type:"text",placeholder:"Enter coupon code",value:c,onChange:r=>{o(r.target.value),g&&x("")},onKeyPress:r=>{r.key==="Enter"&&Se()},disabled:p,className:"w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"}),p?e.jsx("button",{onClick:ft,className:"px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Remove"}):e.jsx("button",{onClick:Se,className:"px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Apply"})]})]}),g&&e.jsx("p",{className:"text-xs text-red-100 text-left",children:g}),s&&e.jsx("p",{className:"text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left",children:s})]}),l&&e.jsxs("div",{className:`\r
      mt-3 flex items-start sm:items-center gap-2 \r
      bg-green-100 border border-green-300 \r
      text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base\r
      shadow-sm w-full max-w-full\r
    `,children:[e.jsx("span",{className:"font-bold text-green-900 text-lg",children:"✔"}),e.jsxs("p",{className:"leading-tight break-words flex-1",children:[e.jsx("span",{className:"font-semibold",children:"Success:"})," ",l]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center",children:[e.jsx(kt,{className:"text-yellow-500"}),e.jsxs("span",{className:"font-semibold text-gray-800 text-lg",children:[ot," (",it," ratings)"]})]}),h?.description&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"Course Description"}),e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:h.description}})})]}),e.jsx("h1",{className:"mt-10 font-semibold text-3xl mb-6",children:"Course Content"}),e.jsx(As,{chapters:lt}),e.jsx("div",{className:"mt-10 p-6 bg-gray-100 rounded-2xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl",children:[e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Lt,alt:"Image 1",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"You can start NxtWave Academy right after Intermediate/12th"})]}),e.jsxs("div",{className:` h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Tt,alt:"Image 2",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Learn 6 hours a week alongside college"})]}),e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Ot,alt:"Image 3",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Land a high-paid software job irrespective of your college/branch"})]})]})}),e.jsx(St,{}),e.jsxs("div",{className:"mt-10 mb-10",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"What You'll Learn"}),e.jsx("ul",{className:"list-disc list-inside space-y-2 text-gray-700",children:gt.map((r,f)=>e.jsx("li",{children:r},f))}),e.jsx("button",{onClick:()=>Ge(!ne),className:"mt-3 text-blue-600 font-medium hover:underline",children:ne?"Read Less":"Read More"})]})]}),e.jsx(Yt,{isOpen:$e,onClose:ke,enrollmentStep:We,paymentConfirmed:Ye,setPaymentConfirmed:xe,proceedToDetailsStep:ht,isAdvancingStep:He,handleCopyUpi:xt,upiCopied:Ve,PAYMENT_UPI_ID:t,displayAmount:X,detailsForm:qe,handleDetailChange:pt,user:P,course:h,courseIdentifier:I,courseSlug:w,courseName:H,priceCents:Ne,setCheckoutError:a,setCheckoutSuccess:m,onSuccess:ke}),e.jsx(Wt,{trigger:Ue,duration:1400,playSound:!0,discountPercentage:Math.round((y||0)*100),onApply:()=>{}})]}):e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx("p",{children:B||"Course not found. Try picking another program from the catalog."})})};export{Ls as default};
