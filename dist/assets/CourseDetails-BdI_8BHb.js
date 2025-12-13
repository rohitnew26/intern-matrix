import{j as e,_ as wt,F as jt,a as vt,b as Nt,s as V,p as Ct,u as kt,g as Ne,c as St,R as Pt,d as At}from"./index-CEeul1G_.js";import{r as n,d as Pe,a as Et,u as _t}from"./router-Z28cWG60.js";import{L as It}from"./LazyImage-DKf3ifzo.js";import{c as Ae}from"./phonepeService-06ZOpbw5.js";import{v as Mt,w as Ft,x as Ce,m as Rt,d as Dt}from"./ui-BpKHBLDN.js";import"./react-Bq7xPAhO.js";const zt="/assets/1-CIVD34lc.svg",Lt="/assets/2-Cqmnlc47.svg",Tt="/assets/3-Ct-_UL6q.svg",Ut=()=>null;function Ot(){return e.jsx("div",{className:"flex items-center justify-center w-full h-full py-10",children:e.jsx("div",{className:"w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"})})}const $t="/assets/firework-BP420dZV.mp3",Bt=({buttonLabel:t="Apply Offer",duration:s=3e3,playSound:a=!0,onApply:c=()=>{},trigger:m=!1,onStart:d=()=>{},discountPercentage:i=25})=>{const[p,l]=n.useState(!1),f=n.useRef(null),h=n.useRef(null),x=n.useRef(null),y=n.useRef(!1),S=n.useRef(null);n.useEffect(()=>{S.current=new Audio($t),S.current.preload="auto",S.current.volume=1},[]);const w=n.useCallback(()=>{if(!a||y.current)return;const b=S.current;b&&(b.currentTime=0,b.play().catch(()=>{}))},[a]);n.useEffect(()=>{try{const b=window.matchMedia("(prefers-reduced-motion: reduce)");y.current=b.matches,b.addEventListener("change",A=>y.current=A.matches)}catch{}},[]);const j=n.useCallback((b,A=2e3)=>{if(!b)return;const C=b.getContext("2d");let E=b.width=window.innerWidth,F=b.height=window.innerHeight;const _=(v,G)=>Math.random()*(G-v)+v,o=["#ff6b6b","#f8c102","#4ade80","#60a5fa","#a78bfa","#fb923c","#f472b6"],L=Array.from({length:100}).map(()=>({x:_(0,E),y:_(-100,0),vx:_(-2,2),vy:_(2,8),size:_(6,14),color:o[Math.floor(_(0,o.length))]})),T=()=>{C.clearRect(0,0,E,F),L.forEach(v=>{v.x+=v.vx,v.y+=v.vy,v.vy+=.1,C.fillStyle=v.color,C.fillRect(v.x,v.y,v.size,v.size)}),h.current=requestAnimationFrame(T)};h.current=requestAnimationFrame(T),x.current=setTimeout(()=>{cancelAnimationFrame(h.current),C.clearRect(0,0,E,F)},A)},[]),P=n.useCallback(async(b=2e3)=>{if(!y.current)try{const C=(await wt(()=>import("./confetti.module-C2jkTI5u.js"),[])).default,E=Date.now()+b,F=setInterval(()=>{if(Date.now()>E)return clearInterval(F);C({particleCount:60,spread:70,origin:{x:Math.random(),y:Math.random()*.4}})},200)}catch{j(f.current,b)}},[j]),z=n.useCallback(()=>{l(!0),w(),P(s),x.current=setTimeout(()=>{l(!1),c()},s+2e3)},[s,w,c]);return n.useEffect(()=>{m&&(d(),z())},[m]),n.useEffect(()=>()=>{h.current&&cancelAnimationFrame(h.current),x.current&&clearTimeout(x.current)},[]),e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"oc-btn",onClick:z,children:["🎉 ",t]}),e.jsx("canvas",{ref:f,style:{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:50}}),p&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm",children:e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-xl text-center",children:e.jsxs("h2",{className:"text-2xl font-bold text-yellow-600",children:["🎊 Congratulations! Enjoy your extra ",i,"% discount!"]})})})]})},Wt=({isOpen:t,onClose:s,user:a,course:c,courseIdentifier:m,courseSlug:d,courseName:i,priceCents:p,displayAmount:l})=>{const[f,h]=n.useState(""),[x,y]=n.useState(!1),S=async()=>{h(""),y(!0);try{const w={amount:Number(l)||0,currency:"INR",courseId:c?.id||m,courseSlug:d,userEmail:a?.email,userName:a?.user_metadata?.full_name||a?.email},j=await Ae(w),P=j?.redirectUrl||j?.intentUrl;if(P){window.location.href=P;return}h("PhonePe payment link unavailable. Please retry.")}catch(w){h(w?.message||"Unable to start PhonePe payment.")}finally{y(!1)}};return t?e.jsxs("div",{className:"fixed inset-0 z-50",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70",onClick:s}),e.jsxs("div",{className:"relative z-10 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900",children:"Secure Your Seat"}),e.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-900 text-2xl leading-none",children:"×"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2",children:e.jsx("svg",{className:"w-8 h-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})})}),e.jsx("h4",{className:"text-xl font-bold text-gray-900",children:"Complete Your Payment"}),e.jsx("p",{className:"text-sm text-gray-600 max-w-md mx-auto",children:"You will be redirected to PhonePe's secure payment gateway to complete your enrollment."}),e.jsxs("div",{className:"bg-gray-50 rounded-lg px-4 py-3 inline-block",children:[e.jsx("p",{className:"text-xs text-gray-500 uppercase tracking-wide mb-1",children:"Amount to Pay"}),e.jsxs("p",{className:"text-3xl font-bold text-gray-900",children:["₹",l]})]})]}),f&&e.jsx("div",{className:"bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm",children:f}),e.jsx("button",{onClick:S,disabled:x,className:"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2",children:x?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting to PhonePe..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Proceed to Payment"]})}),e.jsx("p",{className:"text-xs text-center text-gray-500",children:"🔒 Secured by PhonePe Payment Gateway"})]})]})]}):null},Yt=()=>e.jsxs("div",{className:"w-full bg-white py-10 px-4 sm:px-8 md:px-16",children:[e.jsx("div",{className:"h-9 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse"}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5,6].map(t=>e.jsx("div",{className:"w-full bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6 animate-pulse",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"h-5 w-64 bg-gray-200 rounded-md mb-3"}),e.jsx("div",{className:"h-4 w-80 bg-gray-200 rounded-md mb-2"}),e.jsx("div",{className:"h-4 w-60 bg-gray-200 rounded-md"})]}),e.jsx("div",{className:"h-6 w-6 bg-gray-200 rounded-full ml-3"})]})},t))})]});let qt={data:""},Ht=t=>{if(typeof window=="object"){let s=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(t||document.head).appendChild(s),s.firstChild}return t||qt},Vt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Jt=/\/\*[^]*?\*\/|  +/g,ke=/\n+/g,R=(t,s)=>{let a="",c="",m="";for(let d in t){let i=t[d];d[0]=="@"?d[1]=="i"?a=d+" "+i+";":c+=d[1]=="f"?R(i,d):d+"{"+R(i,d[1]=="k"?"":s)+"}":typeof i=="object"?c+=R(i,s?s.replace(/([^,])+/g,p=>d.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,p):p?p+" "+l:l)):d):i!=null&&(d=/^--/.test(d)?d:d.replace(/[A-Z]/g,"-$&").toLowerCase(),m+=R.p?R.p(d,i):d+":"+i+";")}return a+(s&&m?s+"{"+m+"}":m)+c},I={},Ee=t=>{if(typeof t=="object"){let s="";for(let a in t)s+=a+Ee(t[a]);return s}return t},Gt=(t,s,a,c,m)=>{let d=Ee(t),i=I[d]||(I[d]=(l=>{let f=0,h=11;for(;f<l.length;)h=101*h+l.charCodeAt(f++)>>>0;return"go"+h})(d));if(!I[i]){let l=d!==t?t:(f=>{let h,x,y=[{}];for(;h=Vt.exec(f.replace(Jt,""));)h[4]?y.shift():h[3]?(x=h[3].replace(ke," ").trim(),y.unshift(y[0][x]=y[0][x]||{})):y[0][h[1]]=h[2].replace(ke," ").trim();return y[0]})(t);I[i]=R(m?{["@keyframes "+i]:l}:l,a?"":"."+i)}let p=a&&I.g?I.g:null;return a&&(I.g=I[i]),((l,f,h,x)=>{x?f.data=f.data.replace(x,l):f.data.indexOf(l)===-1&&(f.data=h?l+f.data:f.data+l)})(I[i],s,c,p),i},Zt=(t,s,a)=>t.reduce((c,m,d)=>{let i=s[d];if(i&&i.call){let p=i(a),l=p&&p.props&&p.props.className||/^go/.test(p)&&p;i=l?"."+l:p&&typeof p=="object"?p.props?"":R(p,""):p===!1?"":p}return c+m+(i??"")},"");function J(t){let s=this||{},a=t.call?t(s.p):t;return Gt(a.unshift?a.raw?Zt(a,[].slice.call(arguments,1),s.p):a.reduce((c,m)=>Object.assign(c,m&&m.call?m(s.p):m),{}):a,Ht(s.target),s.g,s.o,s.k)}let _e,oe,ie;J.bind({g:1});let M=J.bind({k:1});function Kt(t,s,a,c){R.p=s,_e=t,oe=a,ie=c}function D(t,s){let a=this||{};return function(){let c=arguments;function m(d,i){let p=Object.assign({},d),l=p.className||m.className;a.p=Object.assign({theme:oe&&oe()},p),a.o=/ *go\d+/.test(l),p.className=J.apply(a,c)+(l?" "+l:"");let f=t;return t[0]&&(f=p.as||t,delete p.as),ie&&f[0]&&ie(p),_e(f,p)}return m}}var Qt=t=>typeof t=="function",le=(t,s)=>Qt(t)?t(s):t,Xt=(()=>{let t=0;return()=>(++t).toString()})(),es=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");t=!s||s.matches}return t}})(),ts=20,Ie="default",Me=(t,s)=>{let{toastLimit:a}=t.settings;switch(s.type){case 0:return{...t,toasts:[s.toast,...t.toasts].slice(0,a)};case 1:return{...t,toasts:t.toasts.map(i=>i.id===s.toast.id?{...i,...s.toast}:i)};case 2:let{toast:c}=s;return Me(t,{type:t.toasts.find(i=>i.id===c.id)?1:0,toast:c});case 3:let{toastId:m}=s;return{...t,toasts:t.toasts.map(i=>i.id===m||m===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return s.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(i=>i.id!==s.toastId)};case 5:return{...t,pausedAt:s.time};case 6:let d=s.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+d}))}}},ss=[],rs={toasts:[],pausedAt:void 0,settings:{toastLimit:ts}},O={},Fe=(t,s=Ie)=>{O[s]=Me(O[s]||rs,t),ss.forEach(([a,c])=>{a===s&&c(O[s])})},Re=t=>Object.keys(O).forEach(s=>Fe(t,s)),as=t=>Object.keys(O).find(s=>O[s].toasts.some(a=>a.id===t)),ce=(t=Ie)=>s=>{Fe(s,t)},ns=(t,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:a?.id||Xt()}),B=t=>(s,a)=>{let c=ns(s,t,a);return ce(c.toasterId||as(c.id))({type:2,toast:c}),c.id},k=(t,s)=>B("blank")(t,s);k.error=B("error");k.success=B("success");k.loading=B("loading");k.custom=B("custom");k.dismiss=(t,s)=>{let a={type:3,toastId:t};s?ce(s)(a):Re(a)};k.dismissAll=t=>k.dismiss(void 0,t);k.remove=(t,s)=>{let a={type:4,toastId:t};s?ce(s)(a):Re(a)};k.removeAll=t=>k.remove(void 0,t);k.promise=(t,s,a)=>{let c=k.loading(s.loading,{...a,...a?.loading});return typeof t=="function"&&(t=t()),t.then(m=>{let d=s.success?le(s.success,m):void 0;return d?k.success(d,{id:c,...a,...a?.success}):k.dismiss(c),m}).catch(m=>{let d=s.error?le(s.error,m):void 0;d?k.error(d,{id:c,...a,...a?.error}):k.dismiss(c)}),t};var os=M`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,is=M`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ls=M`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,cs=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${os} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${is} 0.15s ease-out forwards;
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
    animation: ${ls} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ds=M`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,us=D("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${ds} 1s linear infinite;
`,ms=M`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ps=M`
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
}`,hs=D("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ms} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ps} 0.2s ease-out forwards;
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
`,fs=D("div")`
  position: absolute;
`,xs=D("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,gs=M`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ys=D("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${gs} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,bs=({toast:t})=>{let{icon:s,type:a,iconTheme:c}=t;return s!==void 0?typeof s=="string"?n.createElement(ys,null,s):s:a==="blank"?null:n.createElement(xs,null,n.createElement(us,{...c}),a!=="loading"&&n.createElement(fs,null,a==="error"?n.createElement(cs,{...c}):n.createElement(hs,{...c})))},ws=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,js=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,vs="0%{opacity:0;} 100%{opacity:1;}",Ns="0%{opacity:1;} 100%{opacity:0;}",Cs=D("div")`
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
`,ks=D("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ss=(t,s)=>{let a=t.includes("top")?1:-1,[c,m]=es()?[vs,Ns]:[ws(a),js(a)];return{animation:s?`${M(c)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${M(m)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:t,position:s,style:a,children:c})=>{let m=t.height?Ss(t.position||s||"top-center",t.visible):{opacity:0},d=n.createElement(bs,{toast:t}),i=n.createElement(ks,{...t.ariaProps},le(t.message,t));return n.createElement(Cs,{className:t.className,style:{...m,...a,...t.style}},typeof c=="function"?c({icon:d,message:i}):n.createElement(n.Fragment,null,d,i))});Kt(n.createElement);J`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;const Ps=({chapters:t=[]})=>{const[s,a]=n.useState(null),[c,m]=n.useState(Array.isArray(t)?t:[]),d=Pe(),i=d.courseSlug||d.courseId||d.slug||d.courseParam||"";n.useEffect(()=>{if(Array.isArray(t)&&t.length){m(t);return}let l=!1;return(async()=>{if(i)try{let x=(await Nt.get("/api/user/courses")).data||[];if(x&&typeof x=="object"&&!Array.isArray(x)&&(x=x.courses||x.data||[]),!Array.isArray(x)||!x.length)return;const y=V(String(i)),S=x.find(j=>[j?.slug,j?.skillId,j?.id,j?.title,j?.name].filter(Boolean).map(z=>V(String(z))).includes(y));if(!S)return;let w=[];if(Array.isArray(S.chapters))w=S.chapters;else if(typeof S.chapters=="string")try{w=JSON.parse(S.chapters)}catch{w=[]}l||m(w)}catch(h){console.warn("Failed to Load Chapters",h)}})(),()=>l=!0},[t,i]);const p=()=>{k.error("🔐 Enroll to continue watching",{style:{borderRadius:"10px",background:"#1f2937",color:"#fff",fontWeight:"600"}})};return!c||c.length===0?e.jsx("div",{className:"bg-white shadow-md rounded-xl p-6 border",children:e.jsx("p",{className:"text-gray-500 text-center text-lg",children:"No Course Content Available"})}):e.jsx("div",{className:"bg-white shadow-lg  rounded-2xl p-6 w-full",children:e.jsx("div",{className:"space-y-5",children:c.map((l,f)=>{const h=l.chapter_title||l.chapterTitle||l.title||`Chapter ${f+1}`,x=l.chapter_subtittle||l.chapter_subtitle||l.subtitle||"",y=Array.isArray(l.lessons)&&l.lessons.length?l.lessons:Array.isArray(l.content)&&l.content.length?l.content:[],S=l.video_url||l.videoUrl||"";return e.jsxs("div",{className:"border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",children:[e.jsxs("div",{className:"flex justify-between items-center bg-gray-50 hover:bg-gray-100 cursor-pointer p-4",onClick:()=>a(s===f?null:f),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-lg text-gray-900",children:h}),x&&e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:x})]}),e.jsx("span",{className:"text-indigo-600 transition",children:s===f?e.jsx(jt,{}):e.jsx(vt,{})})]}),s===f&&e.jsx("div",{className:"bg-white p-4 animate-fadeIn space-y-4",children:y.length>0?y.map((w,j)=>e.jsxs("div",{className:"flex items-center justify-between border-b pb-3 last:border-none",children:[e.jsxs("div",{className:"flex items-center gap-3 text-gray-800",children:[w.video_url||w.videoUrl?e.jsx(Mt,{size:20}):e.jsx(Ft,{size:20}),e.jsx("span",{className:"font-medium",children:w.title||w.name||`Lesson ${j+1}`})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-600",children:w.duration||"00:00"}),e.jsx(Ce,{size:18,className:"text-gray-600"})]})]},j)):S?e.jsxs("button",{onClick:p,className:"flex items-center justify-between w-full bg-gray-50 p-3 font-medium text-gray-700 rounded-xl shadow-sm hover:shadow transition ",children:[e.jsx("span",{children:"Watch video"}),e.jsx(Ce,{size:18,className:"text-gray-600"})]}):e.jsx(Yt,{})})]},f)})})})},Se=["In today's data-driven world, Python is an essential tool for unlocking insights.","This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.","You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.","Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.","You will learn to frame analysis problems using structured thinking and SMART questions.","Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.","Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.","Clean and prepare real-world data, handling missing values and validating data quality.","Summarize and interpret data using descriptive statistics to support business decisions.","By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.","Apply your Python skills through hands-on projects that simulate real data professional workflows."],Ds=()=>{const t="Internmatrix@ibl",[s,a]=n.useState(""),[c,m]=n.useState(""),[d,i]=n.useState(""),[p,l]=n.useState(!1),[f,h]=n.useState(""),[x,y]=n.useState(0),S=Et(),w=_t(),j=Pe(),P=j.courseSlug||j.courseId||j.slug||j.courseParam||"",z=n.useMemo(()=>Ct(P),[P]),b=z.slug||"",A=z.id||"",{user:C,profile:E}=kt(),F=n.useMemo(()=>[P,b,A].filter(Boolean).map(r=>V(r)),[A,b,P]),_=n.useCallback((r=[])=>!Array.isArray(r)||!r.length||!F.length?null:r.find(u=>[u?.slug,u?.skillId,u?.id,Ne(u,u?.skillId||u?.id||u?.name||"course"),u?.name,u?.title].filter(Boolean).map(N=>V(N)).some(N=>F.includes(N)))||null,[F]),[o,L]=n.useState(null),[T,v]=n.useState(""),[G,de]=n.useState(!0),[W,De]=n.useState([]),[ze,ue]=n.useState(!1),[Le,Te]=n.useState(!1),[Ue,Z]=n.useState(1),[Oe,me]=n.useState(!1),[K,Y]=n.useState(!1),[$e,pe]=n.useState({utrNumber:"",fullName:"",collegeName:"",email:"",phone:"",joiningDate:"",endDate:"",isCR:"No",paymentScreenshot:null,course:""}),[Be,Q]=n.useState(!1),[We,he]=n.useState(!1),U=n.useRef(null),fe=w.state||{},Ye=fe.finalOfferPrice,qe=fe.course||null,[X]=n.useState(qe),q=n.useMemo(()=>{if(!P&&!b&&!A||!Array.isArray(W)||W.length===0)return null;const r=_(W);if(!r)return null;const u=Ne(r,r.skillId||r.id||r.name);return{...r,slug:u}},[A,b,_,P,W]);n.useEffect(()=>{let r=!1;return(async()=>{v(""),de(!0);try{let g=[],N=null;X&&(N=X,console.log("✅ Using passed course from state:",N.title)),r||(Array.isArray(g)&&De(g),N?L(N):q?(L(q),v("Showing saved course details while live data loads.")):(L(null),v("Course not found.")))}catch(g){r||(console.error("Failed to fetch course and skills",g),q?(L(q),v("Showing saved course details while live data loads.")):(L(null),v("Unable to load this course right now.")))}finally{r||de(!1)}})(),()=>{r=!0}},[A,b,_,P,X]);const[ee,He]=n.useState(!1),Ve="MEGA99",Je=.99,Ge=.25,Ze=r=>{if(r==null)return;if(typeof r=="number")return r>1?Math.min(Math.max(r/100,0),.9999):Math.min(Math.max(r,0),.9999);const u=String(r).trim();if(!u)return;if(u.endsWith("%")){const N=parseFloat(u.slice(0,-1));if(!isNaN(N))return Math.min(Math.max(N/100,0),.9999)}const g=parseFloat(u.replace(/[^0-9.\-]/g,""));if(!isNaN(g))return g>1?Math.min(Math.max(g/100,0),.9999):Math.min(Math.max(g,0),.9999)},xe=o?.price??(o?.price_cents?Math.round(o.price_cents/100):0),Ke=Ye??o?.offerPrice??xe,ge=parseFloat(String(xe).replace(/[^0-9.]/g,""))||0,ye=parseFloat(String(Ke).replace(/[^0-9.]/g,""))||ge||0,te=Math.round(ye*100),be=Math.max(Math.round(te*(1-(p?x:0))),1),se=te>0&&p?be:te,Qe=Math.max(Math.round(se/100),1),re=Math.max(se/100,0),ae=o?.mrp_cents?Math.max(o.mrp_cents/100,0):Math.max(ge,0),ne=Math.max(ye,0),Xe=Math.max(be/100,0),H=r=>typeof r!="number"||!isFinite(r)?"0.00":r.toFixed(2),et=encodeURIComponent(w.pathname+w.search),$=o?.name||o?.title||"Course",tt=o?.subtitle||o?.description||o?.subtitle||"Join this course to enhance your skills and advance your career.",st=o?.instructor||o?.instructor_name||"Instructor",rt=r=>{if(!r||Array.isArray(r)&&(r=r.length?r[0]:null,!r))return null;if(typeof r=="object"&&r!==null&&r.url&&(r=r.url),typeof r=="string"&&/^https?:\/\//i.test(r)||typeof r=="string"&&r.startsWith("/"))return r;try{const{data:u}=At.storage.from("New2").getPublicUrl(r);if(u&&u.publicUrl)return u.publicUrl}catch{}return typeof r=="string"?r:null},at=o?.thumbnail_url||o?.banner_url||(Array.isArray(o?.gallery_images)?o.gallery_images[0]:o?.gallery_images)||o?.thumbnail||o?.cover_image||o?.thumbnailUrl,nt=rt(at)||"/placeholder-course.jpg",we=o?.level||"Beginner",ot=o?.duration||"Self-paced",it=o?.rating,lt=o?.ratersCount,ct=Array.isArray(o?.chapters)?o.chapters:[],dt=r=>{const u=String(r||"").replace(/[^0-9]/g,"");return u.length>=8?u.slice(0,10):""};n.useEffect(()=>{C&&pe(r=>({...r,fullName:r.fullName||E?.full_name||C.user_metadata?.full_name||"",email:r.email||C.email||"",phone:r.phone||dt(E?.phone||C.user_metadata?.phone||C.phone||""),course:r.course||$||""}))},[E,C,$]),n.useEffect(()=>()=>{U.current&&clearTimeout(U.current)},[]);const ut=()=>document.getElementById("phonepe-checkout-js")?Promise.resolve():new Promise((r,u)=>{const g=document.createElement("script");g.id="phonepe-checkout-js",g.src="https://mercury.phonepe.com/web/bundle/checkout.js",g.onload=()=>r(),g.onerror=()=>u(new Error("Failed to load PhonePe checkout")),document.body.appendChild(g)}),mt=async(r,u)=>{const g=`${u}?token=${r}`;try{if(await ut(),window.PhonePeCheckout?.transact){window.PhonePeCheckout.transact({tokenUrl:g,callback:()=>{},type:"IFRAME"});return}}catch(N){console.error("checkout.js load error",N)}window.location.href=g},pt=async()=>{if(!C){a("Please log in to continue your enrollment."),S(`/login?redirect=${et}`);return}if(!o){a("Course data is still loading. Please try again.");return}if(!K){Y(!0),a("");try{const r=await Ae({amount:Qe,currency:"INR",courseId:o.id||o.skillId,courseSlug:b,userEmail:C.email,userName:E?.fullName||C.email?.split("@")[0]||"Student"}),u=r?.payPageUrl||r?.redirectUrl,g=r?.token,N=r?.checkoutBaseUrl;u?window.location.href=u:g&&N?(await mt(g,N),Y(!1)):(a("Failed to initiate payment. Please try again."),Y(!1))}catch(r){console.error("Payment error:",r);const u=r?.details?.error||r?.details?.message,g=r?.details?JSON.stringify(r.details):"";a(u||g||r.message||"Failed to create payment. Please try again."),Y(!1)}}},je=()=>{Te(!1),Z(1),me(!1),Q(!1),U.current&&(clearTimeout(U.current),U.current=null)},ht=(r,u)=>{pe(g=>({...g,[r]:r==="phone"?u.replace(/[^0-9]/g,"").slice(0,12):u}))},ft=()=>{Q(!0),Z("waiting"),U.current=setTimeout(()=>{Z(2),Q(!1)},2e3)},ve=()=>{const r=d.trim();if(!r){h("Please enter a coupon code.");return}const u=r.toLowerCase().trim();if(u===Ve.toLowerCase()){l(!0),y(Je),h("");return}if(!o?.couponcode){h("No coupon code available for this course."),l(!1);return}const g=o.couponcode.toLowerCase().trim();if(u!==g){h("Invalid coupon code."),l(!1),y(0);return}l(!0);const N=Ze(o?.couponDiscount??o?.coupondiscount??o?.coupon_discount??o?.discount);y(typeof N=="number"?N:Ge),h(""),ue(!0),setTimeout(()=>ue(!1),1200)},xt=()=>{l(!1),i(""),h(""),y(0)},gt=async()=>{try{await navigator.clipboard.writeText(t),he(!0),setTimeout(()=>he(!1),2e3)}catch(r){console.warn("Unable to copy UPI id",r)}},yt=ee?Se:Se.slice(0,5),bt={Beginner:"bg-green-100 text-green-800",Intermediate:"bg-yellow-100 text-yellow-800",Advanced:"bg-red-100 text-red-800"};return G?e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx(Ot,{})}):o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-6xl mx-auto mt-10 p-6",children:[e.jsx(Ut,{}),T&&o&&e.jsx("p",{className:"text-center text-sm text-yellow-200 mb-4",children:T}),e.jsxs("div",{className:`mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 \r
  transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 \r
  flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start`,children:[e.jsx("div",{className:"mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative",children:e.jsx(It,{src:nt,alt:$,className:"w-full h-full bg-white",imgClassName:"w-full h-auto object-contain p-3 rounded-2xl",placeholderNode:e.jsx("div",{className:"flex items-center justify-center p-6",children:e.jsx("div",{className:"w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"})})})}),e.jsx("div",{className:"hidden md:flex items-center h-64",children:e.jsx("div",{className:"w-px h-full bg-white/40"})}),e.jsxs("div",{className:"flex-1 text-center md:text-left text-white",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold mb-2",children:$}),e.jsx("p",{className:"text-base sm:text-lg mb-3",children:tt}),e.jsx("span",{className:`inline-block px-3 py-1 rounded-full text-sm font-medium ${bt[we]||"bg-slate-200 text-slate-800"}`,children:we}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Rt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Duration:"})," ",ot]})]}),e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Dt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Instructor:"})," ",st]})]})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("p",{className:"text-xl sm:text-2xl font-bold flex items-baseline gap-2",children:[ae>0&&ae!==re&&e.jsxs("span",{className:"text-base sm:text-lg line-through opacity-70",children:["₹",H(ae)]}),e.jsxs("span",{children:["₹",H(re)]})]}),p&&e.jsxs("span",{className:"text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full",children:[Math.round((x||0)*100),"% OFF Applied"]})]}),p&&ne>0&&ne!==Xe&&e.jsxs("p",{className:"text-[1rem] text-white line-through decoration-red-300",children:["Offer Price: ₹",H(ne)]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3",children:[e.jsx("button",{onClick:pt,disabled:K,className:"bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",children:K?e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting..."]}):"Enroll Now"}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("input",{type:"text",placeholder:"Enter coupon code",value:d,onChange:r=>{i(r.target.value),f&&h("")},onKeyPress:r=>{r.key==="Enter"&&ve()},disabled:p,className:"w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"}),p?e.jsx("button",{onClick:xt,className:"px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Remove"}):e.jsx("button",{onClick:ve,className:"px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Apply"})]})]}),f&&e.jsx("p",{className:"text-xs text-red-100 text-left",children:f}),s&&e.jsx("p",{className:"text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left",children:s})]}),c&&e.jsxs("div",{className:`\r
      mt-3 flex items-start sm:items-center gap-2 \r
      bg-green-100 border border-green-300 \r
      text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base\r
      shadow-sm w-full max-w-full\r
    `,children:[e.jsx("span",{className:"font-bold text-green-900 text-lg",children:"✔"}),e.jsxs("p",{className:"leading-tight break-words flex-1",children:[e.jsx("span",{className:"font-semibold",children:"Success:"})," ",c]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center",children:[e.jsx(St,{className:"text-yellow-500"}),e.jsxs("span",{className:"font-semibold text-gray-800 text-lg",children:[it," (",lt," ratings)"]})]}),(o?.description||o?.meta_description||o?.overview||o?.detailed_description&&Array.isArray(o.detailed_description.sections)&&o.detailed_description.sections.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"Course Description"}),o?.detailed_description&&Array.isArray(o.detailed_description.sections)&&o.detailed_description.sections.length>0?e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:o.detailed_description.sections.map((r,u)=>e.jsxs("div",{className:"mb-6",children:[r.title?e.jsx("h3",{className:"text-lg font-semibold mb-2",children:r.title}):null,e.jsx("div",{dangerouslySetInnerHTML:{__html:r.content||r.body||r.text||""}})]},u))}):e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:o.description||o.overview||""}})})]}),e.jsx("h1",{className:"mt-10 font-semibold text-3xl mb-6",children:"Course Content"}),e.jsx(Ps,{chapters:ct}),e.jsx("div",{className:"mt-10 p-6 bg-gray-100 rounded-2xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl",children:[e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:zt,alt:"Image 1",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"You can start NxtWave Academy right after Intermediate/12th"})]}),e.jsxs("div",{className:` h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Lt,alt:"Image 2",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Learn 6 hours a week alongside college"})]}),e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Tt,alt:"Image 3",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Land a high-paid software job irrespective of your college/branch"})]})]})}),e.jsx(Pt,{}),e.jsxs("div",{className:"mt-10 mb-10",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"What You'll Learn"}),e.jsx("ul",{className:"list-disc list-inside space-y-2 text-gray-700",children:yt.map((r,u)=>e.jsx("li",{children:r},u))}),e.jsx("button",{onClick:()=>He(!ee),className:"mt-3 text-blue-600 font-medium hover:underline",children:ee?"Read Less":"Read More"})]})]}),e.jsx(Wt,{isOpen:Le,onClose:je,enrollmentStep:Ue,paymentConfirmed:Oe,setPaymentConfirmed:me,proceedToDetailsStep:ft,isAdvancingStep:Be,handleCopyUpi:gt,upiCopied:We,PAYMENT_UPI_ID:t,displayAmount:H(re),detailsForm:$e,handleDetailChange:ht,user:C,course:o,courseIdentifier:A,courseSlug:b,courseName:$,priceCents:se,setCheckoutError:a,setCheckoutSuccess:m,onSuccess:je}),e.jsx(Bt,{trigger:ze,duration:1400,playSound:!0,discountPercentage:Math.round((x||0)*100),onApply:()=>{}})]}):e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx("p",{children:T||"Course not found. Try picking another program from the catalog."})})};export{Ds as default};
