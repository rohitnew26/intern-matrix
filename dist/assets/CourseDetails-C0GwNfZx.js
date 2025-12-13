import{j as e,_ as jt,F as vt,a as Nt,b as Ct,s as G,p as kt,u as St,g as Ce,c as Pt,R as At,d as Et}from"./index-DaEBHKGl.js";import{r as n,d as Ae,a as _t,u as It}from"./router-Z28cWG60.js";import{L as Mt}from"./LazyImage-CF0WbHTi.js";import{c as Ee}from"./phonepeService-06ZOpbw5.js";import{v as Rt,w as Ft,x as ke,m as Dt,d as zt}from"./ui-BpKHBLDN.js";import"./react-Bq7xPAhO.js";const Ot="/assets/1-CIVD34lc.svg",Lt="/assets/2-Cqmnlc47.svg",Tt="/assets/3-Ct-_UL6q.svg",Ut=()=>null;function $t(){return e.jsx("div",{className:"flex items-center justify-center w-full h-full py-10",children:e.jsx("div",{className:"w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"})})}const Bt="/assets/firework-BP420dZV.mp3",Wt=({buttonLabel:t="Apply Offer",duration:s=3e3,playSound:a=!0,onApply:c=()=>{},trigger:m=!1,onStart:d=()=>{},discountPercentage:i=25})=>{const[p,l]=n.useState(!1),f=n.useRef(null),h=n.useRef(null),x=n.useRef(null),b=n.useRef(!1),C=n.useRef(null),w=n.useRef(c),j=n.useRef(d);n.useEffect(()=>{w.current=c},[c]),n.useEffect(()=>{j.current=d},[d]),n.useEffect(()=>{C.current=new Audio(Bt),C.current.preload="auto",C.current.volume=1},[]);const S=n.useCallback(()=>{if(!a||b.current)return;const g=C.current;g&&(g.currentTime=0,g.play().catch(()=>{}))},[a]);n.useEffect(()=>{try{const g=window.matchMedia("(prefers-reduced-motion: reduce)");b.current=g.matches,g.addEventListener("change",A=>b.current=A.matches)}catch{}},[]);const O=n.useCallback((g,A=2e3)=>{if(!g)return;const E=g.getContext("2d");let M=g.width=window.innerWidth,o=g.height=window.innerHeight;const P=(k,U)=>Math.random()*(U-k)+k,T=["#ff6b6b","#f8c102","#4ade80","#60a5fa","#a78bfa","#fb923c","#f472b6"],L=Array.from({length:100}).map(()=>({x:P(0,M),y:P(-100,0),vx:P(-2,2),vy:P(2,8),size:P(6,14),color:T[Math.floor(P(0,T.length))]})),q=()=>{E.clearRect(0,0,M,o),L.forEach(k=>{k.x+=k.vx,k.y+=k.vy,k.vy+=.1,E.fillStyle=k.color,E.fillRect(k.x,k.y,k.size,k.size)}),h.current=requestAnimationFrame(q)};h.current=requestAnimationFrame(q),x.current=setTimeout(()=>{cancelAnimationFrame(h.current),E.clearRect(0,0,M,o)},A)},[]),_=n.useCallback(async(g=2e3)=>{if(!b.current)try{const E=(await jt(()=>import("./confetti.module-C2jkTI5u.js"),[])).default,M=Date.now()+g,o=setInterval(()=>{if(Date.now()>M)return clearInterval(o);E({particleCount:60,spread:70,origin:{x:Math.random(),y:Math.random()*.4}})},200)}catch{O(f.current,g)}},[O]),I=n.useCallback(()=>{h.current&&cancelAnimationFrame(h.current),x.current&&clearTimeout(x.current),console.debug("OfferCelebration: startCelebration called"),l(!0),S(),_(s),x.current=setTimeout(()=>{l(!1);try{w.current&&w.current()}catch(g){console.error("OfferCelebration onApply error",g)}},s+2e3)},[s,S,c]);return n.useEffect(()=>{if(typeof m=="number"?m>0:m){console.debug("OfferCelebration: trigger changed",m);try{j.current&&j.current()}catch(A){console.error("OfferCelebration onStart error",A)}I()}},[m]),n.useEffect(()=>()=>{h.current&&cancelAnimationFrame(h.current),x.current&&clearTimeout(x.current)},[]),e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"oc-btn",onClick:I,children:["🎉 ",t]}),e.jsx("canvas",{ref:f,style:{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:50}}),p&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm",children:e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-xl text-center",children:e.jsxs("h2",{className:"text-2xl font-bold text-yellow-600",children:["🎊 Congratulations! Enjoy your extra ",i,"% discount!"]})})})]})},Yt=({isOpen:t,onClose:s,user:a,course:c,courseIdentifier:m,courseSlug:d,courseName:i,priceCents:p,displayAmount:l})=>{const[f,h]=n.useState(""),[x,b]=n.useState(!1),C=async()=>{h(""),b(!0);try{const w={amount:Number(l)||0,currency:"INR",courseId:c?.id||m,courseSlug:d,userEmail:a?.email,userName:a?.user_metadata?.full_name||a?.email},j=await Ee(w),S=j?.redirectUrl||j?.intentUrl;if(S){window.location.href=S;return}h("PhonePe payment link unavailable. Please retry.")}catch(w){h(w?.message||"Unable to start PhonePe payment.")}finally{b(!1)}};return t?e.jsxs("div",{className:"fixed inset-0 z-50",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70",onClick:s}),e.jsxs("div",{className:"relative z-10 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-900",children:"Secure Your Seat"}),e.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-900 text-2xl leading-none",children:"×"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2",children:e.jsx("svg",{className:"w-8 h-8 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})})}),e.jsx("h4",{className:"text-xl font-bold text-gray-900",children:"Complete Your Payment"}),e.jsx("p",{className:"text-sm text-gray-600 max-w-md mx-auto",children:"You will be redirected to PhonePe's secure payment gateway to complete your enrollment."}),e.jsxs("div",{className:"bg-gray-50 rounded-lg px-4 py-3 inline-block",children:[e.jsx("p",{className:"text-xs text-gray-500 uppercase tracking-wide mb-1",children:"Amount to Pay"}),e.jsxs("p",{className:"text-3xl font-bold text-gray-900",children:["₹",l]})]})]}),f&&e.jsx("div",{className:"bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm",children:f}),e.jsx("button",{onClick:C,disabled:x,className:"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2",children:x?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting to PhonePe..."]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Proceed to Payment"]})}),e.jsx("p",{className:"text-xs text-center text-gray-500",children:"🔒 Secured by PhonePe Payment Gateway"})]})]})]}):null},qt=()=>e.jsxs("div",{className:"w-full bg-white py-10 px-4 sm:px-8 md:px-16",children:[e.jsx("div",{className:"h-9 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse"}),e.jsx("div",{className:"space-y-4",children:[1,2,3,4,5,6].map(t=>e.jsx("div",{className:"w-full bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6 animate-pulse",children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"h-5 w-64 bg-gray-200 rounded-md mb-3"}),e.jsx("div",{className:"h-4 w-80 bg-gray-200 rounded-md mb-2"}),e.jsx("div",{className:"h-4 w-60 bg-gray-200 rounded-md"})]}),e.jsx("div",{className:"h-6 w-6 bg-gray-200 rounded-full ml-3"})]})},t))})]});let Ht={data:""},Vt=t=>{if(typeof window=="object"){let s=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return s.nonce=window.__nonce__,s.parentNode||(t||document.head).appendChild(s),s.firstChild}return t||Ht},Jt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Gt=/\/\*[^]*?\*\/|  +/g,Se=/\n+/g,D=(t,s)=>{let a="",c="",m="";for(let d in t){let i=t[d];d[0]=="@"?d[1]=="i"?a=d+" "+i+";":c+=d[1]=="f"?D(i,d):d+"{"+D(i,d[1]=="k"?"":s)+"}":typeof i=="object"?c+=D(i,s?s.replace(/([^,])+/g,p=>d.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,p):p?p+" "+l:l)):d):i!=null&&(d=/^--/.test(d)?d:d.replace(/[A-Z]/g,"-$&").toLowerCase(),m+=D.p?D.p(d,i):d+":"+i+";")}return a+(s&&m?s+"{"+m+"}":m)+c},R={},_e=t=>{if(typeof t=="object"){let s="";for(let a in t)s+=a+_e(t[a]);return s}return t},Zt=(t,s,a,c,m)=>{let d=_e(t),i=R[d]||(R[d]=(l=>{let f=0,h=11;for(;f<l.length;)h=101*h+l.charCodeAt(f++)>>>0;return"go"+h})(d));if(!R[i]){let l=d!==t?t:(f=>{let h,x,b=[{}];for(;h=Jt.exec(f.replace(Gt,""));)h[4]?b.shift():h[3]?(x=h[3].replace(Se," ").trim(),b.unshift(b[0][x]=b[0][x]||{})):b[0][h[1]]=h[2].replace(Se," ").trim();return b[0]})(t);R[i]=D(m?{["@keyframes "+i]:l}:l,a?"":"."+i)}let p=a&&R.g?R.g:null;return a&&(R.g=R[i]),((l,f,h,x)=>{x?f.data=f.data.replace(x,l):f.data.indexOf(l)===-1&&(f.data=h?l+f.data:f.data+l)})(R[i],s,c,p),i},Kt=(t,s,a)=>t.reduce((c,m,d)=>{let i=s[d];if(i&&i.call){let p=i(a),l=p&&p.props&&p.props.className||/^go/.test(p)&&p;i=l?"."+l:p&&typeof p=="object"?p.props?"":D(p,""):p===!1?"":p}return c+m+(i??"")},"");function Z(t){let s=this||{},a=t.call?t(s.p):t;return Zt(a.unshift?a.raw?Kt(a,[].slice.call(arguments,1),s.p):a.reduce((c,m)=>Object.assign(c,m&&m.call?m(s.p):m),{}):a,Vt(s.target),s.g,s.o,s.k)}let Ie,le,ce;Z.bind({g:1});let F=Z.bind({k:1});function Qt(t,s,a,c){D.p=s,Ie=t,le=a,ce=c}function z(t,s){let a=this||{};return function(){let c=arguments;function m(d,i){let p=Object.assign({},d),l=p.className||m.className;a.p=Object.assign({theme:le&&le()},p),a.o=/ *go\d+/.test(l),p.className=Z.apply(a,c)+(l?" "+l:"");let f=t;return t[0]&&(f=p.as||t,delete p.as),ce&&f[0]&&ce(p),Ie(f,p)}return m}}var Xt=t=>typeof t=="function",de=(t,s)=>Xt(t)?t(s):t,es=(()=>{let t=0;return()=>(++t).toString()})(),ts=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");t=!s||s.matches}return t}})(),ss=20,Me="default",Re=(t,s)=>{let{toastLimit:a}=t.settings;switch(s.type){case 0:return{...t,toasts:[s.toast,...t.toasts].slice(0,a)};case 1:return{...t,toasts:t.toasts.map(i=>i.id===s.toast.id?{...i,...s.toast}:i)};case 2:let{toast:c}=s;return Re(t,{type:t.toasts.find(i=>i.id===c.id)?1:0,toast:c});case 3:let{toastId:m}=s;return{...t,toasts:t.toasts.map(i=>i.id===m||m===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return s.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(i=>i.id!==s.toastId)};case 5:return{...t,pausedAt:s.time};case 6:let d=s.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+d}))}}},rs=[],as={toasts:[],pausedAt:void 0,settings:{toastLimit:ss}},B={},Fe=(t,s=Me)=>{B[s]=Re(B[s]||as,t),rs.forEach(([a,c])=>{a===s&&c(B[s])})},De=t=>Object.keys(B).forEach(s=>Fe(t,s)),ns=t=>Object.keys(B).find(s=>B[s].toasts.some(a=>a.id===t)),ue=(t=Me)=>s=>{Fe(s,t)},os=(t,s="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:a?.id||es()}),Y=t=>(s,a)=>{let c=os(s,t,a);return ue(c.toasterId||ns(c.id))({type:2,toast:c}),c.id},N=(t,s)=>Y("blank")(t,s);N.error=Y("error");N.success=Y("success");N.loading=Y("loading");N.custom=Y("custom");N.dismiss=(t,s)=>{let a={type:3,toastId:t};s?ue(s)(a):De(a)};N.dismissAll=t=>N.dismiss(void 0,t);N.remove=(t,s)=>{let a={type:4,toastId:t};s?ue(s)(a):De(a)};N.removeAll=t=>N.remove(void 0,t);N.promise=(t,s,a)=>{let c=N.loading(s.loading,{...a,...a?.loading});return typeof t=="function"&&(t=t()),t.then(m=>{let d=s.success?de(s.success,m):void 0;return d?N.success(d,{id:c,...a,...a?.success}):N.dismiss(c),m}).catch(m=>{let d=s.error?de(s.error,m):void 0;d?N.error(d,{id:c,...a,...a?.error}):N.dismiss(c)}),t};var is=F`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ls=F`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,cs=F`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ds=z("div")`
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
`,us=F`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ms=z("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${us} 1s linear infinite;
`,ps=F`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,hs=F`
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
}`,fs=z("div")`
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
`,xs=z("div")`
  position: absolute;
`,gs=z("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ys=F`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,bs=z("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ys} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ws=({toast:t})=>{let{icon:s,type:a,iconTheme:c}=t;return s!==void 0?typeof s=="string"?n.createElement(bs,null,s):s:a==="blank"?null:n.createElement(gs,null,n.createElement(ms,{...c}),a!=="loading"&&n.createElement(xs,null,a==="error"?n.createElement(ds,{...c}):n.createElement(fs,{...c})))},js=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,vs=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ns="0%{opacity:0;} 100%{opacity:1;}",Cs="0%{opacity:1;} 100%{opacity:0;}",ks=z("div")`
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
`,Ss=z("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ps=(t,s)=>{let a=t.includes("top")?1:-1,[c,m]=ts()?[Ns,Cs]:[js(a),vs(a)];return{animation:s?`${F(c)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${F(m)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:t,position:s,style:a,children:c})=>{let m=t.height?Ps(t.position||s||"top-center",t.visible):{opacity:0},d=n.createElement(ws,{toast:t}),i=n.createElement(Ss,{...t.ariaProps},de(t.message,t));return n.createElement(ks,{className:t.className,style:{...m,...a,...t.style}},typeof c=="function"?c({icon:d,message:i}):n.createElement(n.Fragment,null,d,i))});Qt(n.createElement);Z`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;const As=({chapters:t=[]})=>{const[s,a]=n.useState(null),[c,m]=n.useState(Array.isArray(t)?t:[]),d=Ae(),i=d.courseSlug||d.courseId||d.slug||d.courseParam||"";n.useEffect(()=>{if(Array.isArray(t)&&t.length){m(t);return}let l=!1;return(async()=>{if(i)try{let x=(await Ct.get("/api/user/courses")).data||[];if(x&&typeof x=="object"&&!Array.isArray(x)&&(x=x.courses||x.data||[]),!Array.isArray(x)||!x.length)return;const b=G(String(i)),C=x.find(j=>[j?.slug,j?.skillId,j?.id,j?.title,j?.name].filter(Boolean).map(O=>G(String(O))).includes(b));if(!C)return;let w=[];if(Array.isArray(C.chapters))w=C.chapters;else if(typeof C.chapters=="string")try{w=JSON.parse(C.chapters)}catch{w=[]}l||m(w)}catch(h){console.warn("Failed to Load Chapters",h)}})(),()=>l=!0},[t,i]);const p=()=>{N.error("🔐 Enroll to continue watching",{style:{borderRadius:"10px",background:"#1f2937",color:"#fff",fontWeight:"600"}})};return!c||c.length===0?e.jsx("div",{className:"bg-white shadow-md rounded-xl p-6 border",children:e.jsx("p",{className:"text-gray-500 text-center text-lg",children:"No Course Content Available"})}):e.jsx("div",{className:"bg-white shadow-lg  rounded-2xl p-6 w-full",children:e.jsx("div",{className:"space-y-5",children:c.map((l,f)=>{const h=l.chapter_title||l.chapterTitle||l.title||`Chapter ${f+1}`,x=l.chapter_subtittle||l.chapter_subtitle||l.subtitle||"",b=Array.isArray(l.lessons)&&l.lessons.length?l.lessons:Array.isArray(l.content)&&l.content.length?l.content:[],C=l.video_url||l.videoUrl||"";return e.jsxs("div",{className:"border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",children:[e.jsxs("div",{className:"flex justify-between items-center bg-gray-50 hover:bg-gray-100 cursor-pointer p-4",onClick:()=>a(s===f?null:f),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-lg text-gray-900",children:h}),x&&e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:x})]}),e.jsx("span",{className:"text-indigo-600 transition",children:s===f?e.jsx(vt,{}):e.jsx(Nt,{})})]}),s===f&&e.jsx("div",{className:"bg-white p-4 animate-fadeIn space-y-4",children:b.length>0?b.map((w,j)=>e.jsxs("div",{className:"flex items-center justify-between border-b pb-3 last:border-none",children:[e.jsxs("div",{className:"flex items-center gap-3 text-gray-800",children:[w.video_url||w.videoUrl?e.jsx(Rt,{size:20}):e.jsx(Ft,{size:20}),e.jsx("span",{className:"font-medium",children:w.title||w.name||`Lesson ${j+1}`})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-600",children:w.duration||"00:00"}),e.jsx(ke,{size:18,className:"text-gray-600"})]})]},j)):C?e.jsxs("button",{onClick:p,className:"flex items-center justify-between w-full bg-gray-50 p-3 font-medium text-gray-700 rounded-xl shadow-sm hover:shadow transition ",children:[e.jsx("span",{children:"Watch video"}),e.jsx(ke,{size:18,className:"text-gray-600"})]}):e.jsx(qt,{})})]},f)})})})},Pe=["In today's data-driven world, Python is an essential tool for unlocking insights.","This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.","You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.","Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.","You will learn to frame analysis problems using structured thinking and SMART questions.","Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.","Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.","Clean and prepare real-world data, handling missing values and validating data quality.","Summarize and interpret data using descriptive statistics to support business decisions.","By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.","Apply your Python skills through hands-on projects that simulate real data professional workflows."],zs=()=>{const t="Internmatrix@ibl",[s,a]=n.useState(""),[c,m]=n.useState(""),[d,i]=n.useState(""),[p,l]=n.useState(!1),[f,h]=n.useState(""),[x,b]=n.useState(0),C=_t(),w=It(),j=Ae(),S=j.courseSlug||j.courseId||j.slug||j.courseParam||"",O=n.useMemo(()=>kt(S),[S]),_=O.slug||"",I=O.id||"",{user:g,profile:A}=St(),E=n.useMemo(()=>[S,_,I].filter(Boolean).map(r=>G(r)),[I,_,S]),M=n.useCallback((r=[])=>!Array.isArray(r)||!r.length||!E.length?null:r.find(u=>[u?.slug,u?.skillId,u?.id,Ce(u,u?.skillId||u?.id||u?.name||"course"),u?.name,u?.title].filter(Boolean).map(v=>G(v)).some(v=>E.includes(v)))||null,[E]),[o,P]=n.useState(null),[T,L]=n.useState(""),[q,k]=n.useState(!0),[U,ze]=n.useState([]),[Oe,me]=n.useState(0),[Le,Te]=n.useState(!1),[Ue,K]=n.useState(1),[$e,pe]=n.useState(!1),[Q,H]=n.useState(!1),[Be,he]=n.useState({utrNumber:"",fullName:"",collegeName:"",email:"",phone:"",joiningDate:"",endDate:"",isCR:"No",paymentScreenshot:null,course:""}),[We,X]=n.useState(!1),[Ye,fe]=n.useState(!1),$=n.useRef(null),xe=w.state||{},qe=xe.finalOfferPrice,He=xe.course||null,[ee]=n.useState(He),V=n.useMemo(()=>{if(!S&&!_&&!I||!Array.isArray(U)||U.length===0)return null;const r=M(U);if(!r)return null;const u=Ce(r,r.skillId||r.id||r.name);return{...r,slug:u}},[I,_,M,S,U]);n.useEffect(()=>{let r=!1;return(async()=>{L(""),k(!0);try{let y=[],v=null;ee&&(v=ee,console.log("✅ Using passed course from state:",v.title)),r||(Array.isArray(y)&&ze(y),v?P(v):V?(P(V),L("Showing saved course details while live data loads.")):(P(null),L("Course not found.")))}catch(y){r||(console.error("Failed to fetch course and skills",y),V?(P(V),L("Showing saved course details while live data loads.")):(P(null),L("Unable to load this course right now.")))}finally{r||k(!1)}})(),()=>{r=!0}},[I,_,M,S,ee]);const[te,Ve]=n.useState(!1),Je="MEGA99",Ge=.99,Ze=.25,Ke=r=>{if(r==null)return;if(typeof r=="number")return r>1?Math.min(Math.max(r/100,0),.9999):Math.min(Math.max(r,0),.9999);const u=String(r).trim();if(!u)return;if(u.endsWith("%")){const v=parseFloat(u.slice(0,-1));if(!isNaN(v))return Math.min(Math.max(v/100,0),.9999)}const y=parseFloat(u.replace(/[^0-9.\-]/g,""));if(!isNaN(y))return y>1?Math.min(Math.max(y/100,0),.9999):Math.min(Math.max(y,0),.9999)},ge=o?.price??(o?.price_cents?Math.round(o.price_cents/100):0),Qe=qe??o?.offerPrice??ge,ye=parseFloat(String(ge).replace(/[^0-9.]/g,""))||0,be=parseFloat(String(Qe).replace(/[^0-9.]/g,""))||ye||0,se=Math.round(be*100),we=Math.max(Math.round(se*(1-(p?x:0))),1),re=se>0&&p?we:se,Xe=Math.max(Math.round(re/100),1),ae=Math.max(re/100,0),ne=o?.mrp_cents?Math.max(o.mrp_cents/100,0):Math.max(ye,0),oe=Math.max(be,0),et=Math.max(we/100,0),J=r=>typeof r!="number"||!isFinite(r)?"0.00":r.toFixed(2),tt=encodeURIComponent(w.pathname+w.search),W=o?.name||o?.title||"Course",st=o?.subtitle||o?.description||o?.subtitle||"Join this course to enhance your skills and advance your career.",rt=o?.instructor||o?.instructor_name||"Instructor",at=r=>{if(!r||Array.isArray(r)&&(r=r.length?r[0]:null,!r))return null;if(typeof r=="object"&&r!==null&&r.url&&(r=r.url),typeof r=="string"&&/^https?:\/\//i.test(r)||typeof r=="string"&&r.startsWith("/"))return r;try{const{data:u}=Et.storage.from("New2").getPublicUrl(r);if(u&&u.publicUrl)return u.publicUrl}catch{}return typeof r=="string"?r:null},nt=o?.thumbnail_url||o?.banner_url||(Array.isArray(o?.gallery_images)?o.gallery_images[0]:o?.gallery_images)||o?.thumbnail||o?.cover_image||o?.thumbnailUrl,ot=at(nt)||"/placeholder-course.jpg",je=o?.level||"Beginner",it=o?.duration||"Self-paced",lt=o?.rating,ct=o?.ratersCount,dt=Array.isArray(o?.chapters)?o.chapters:[],ut=r=>{const u=String(r||"").replace(/[^0-9]/g,"");return u.length>=8?u.slice(0,10):""};n.useEffect(()=>{g&&he(r=>({...r,fullName:r.fullName||A?.full_name||g.user_metadata?.full_name||"",email:r.email||g.email||"",phone:r.phone||ut(A?.phone||g.user_metadata?.phone||g.phone||""),course:r.course||W||""}))},[A,g,W]),n.useEffect(()=>()=>{$.current&&clearTimeout($.current)},[]);const mt=()=>document.getElementById("phonepe-checkout-js")?Promise.resolve():new Promise((r,u)=>{const y=document.createElement("script");y.id="phonepe-checkout-js",y.src="https://mercury.phonepe.com/web/bundle/checkout.js",y.onload=()=>r(),y.onerror=()=>u(new Error("Failed to load PhonePe checkout")),document.body.appendChild(y)}),pt=async(r,u)=>{const y=`${u}?token=${r}`;try{if(await mt(),window.PhonePeCheckout?.transact){window.PhonePeCheckout.transact({tokenUrl:y,callback:()=>{},type:"IFRAME"});return}}catch(v){console.error("checkout.js load error",v)}window.location.href=y},ht=async()=>{if(!g){a("Please log in to continue your enrollment."),C(`/login?redirect=${tt}`);return}if(!o){a("Course data is still loading. Please try again.");return}if(!Q){H(!0),a("");try{const r=await Ee({amount:Xe,currency:"INR",courseId:o.id||o.skillId,courseSlug:_,userEmail:g.email,userName:A?.fullName||g.email?.split("@")[0]||"Student"}),u=r?.payPageUrl||r?.redirectUrl,y=r?.token,v=r?.checkoutBaseUrl;u?window.location.href=u:y&&v?(await pt(y,v),H(!1)):(a("Failed to initiate payment. Please try again."),H(!1))}catch(r){console.error("Payment error:",r);const u=r?.details?.error||r?.details?.message,y=r?.details?JSON.stringify(r.details):"";a(u||y||r.message||"Failed to create payment. Please try again."),H(!1)}}},ve=()=>{Te(!1),K(1),pe(!1),X(!1),$.current&&(clearTimeout($.current),$.current=null)},ft=(r,u)=>{he(y=>({...y,[r]:r==="phone"?u.replace(/[^0-9]/g,"").slice(0,12):u}))},xt=()=>{X(!0),K("waiting"),$.current=setTimeout(()=>{K(2),X(!1)},2e3)},Ne=()=>{const r=d.trim();if(!r){h("Please enter a coupon code.");return}const u=r.toLowerCase().trim();if(u===Je.toLowerCase()){l(!0),b(Ge),h(""),me(ie=>(Number(ie)||0)+1);return}if(!o?.couponcode){h("No coupon code available for this course."),l(!1);return}const y=o.couponcode.toLowerCase().trim();if(u!==y){h("Invalid coupon code."),l(!1),b(0);return}l(!0);const v=Ke(o?.couponDiscount??o?.coupondiscount??o?.coupon_discount??o?.discount);b(typeof v=="number"?v:Ze),h(""),me(ie=>(Number(ie)||0)+1)},gt=()=>{l(!1),i(""),h(""),b(0)},yt=async()=>{try{await navigator.clipboard.writeText(t),fe(!0),setTimeout(()=>fe(!1),2e3)}catch(r){console.warn("Unable to copy UPI id",r)}},bt=te?Pe:Pe.slice(0,5),wt={Beginner:"bg-green-100 text-green-800",Intermediate:"bg-yellow-100 text-yellow-800",Advanced:"bg-red-100 text-red-800"};return q?e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx($t,{})}):o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-6xl mx-auto mt-10 p-6",children:[e.jsx(Ut,{}),T&&o&&e.jsx("p",{className:"text-center text-sm text-yellow-200 mb-4",children:T}),e.jsxs("div",{className:`mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 \r
  transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 \r
  flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start`,children:[e.jsx("div",{className:"mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative",children:e.jsx(Mt,{src:ot,alt:W,className:"w-full h-full bg-white",imgClassName:"w-full h-auto object-contain p-3 rounded-2xl",placeholderNode:e.jsx("div",{className:"flex items-center justify-center p-6",children:e.jsx("div",{className:"w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"})})})}),e.jsx("div",{className:"hidden md:flex items-center h-64",children:e.jsx("div",{className:"w-px h-full bg-white/40"})}),e.jsxs("div",{className:"flex-1 text-center md:text-left text-white",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold mb-2",children:W}),e.jsx("p",{className:"text-base sm:text-lg mb-3",children:st}),e.jsx("span",{className:`inline-block px-3 py-1 rounded-full text-sm font-medium ${wt[je]||"bg-slate-200 text-slate-800"}`,children:je}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(Dt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Duration:"})," ",it]})]}),e.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-2",children:[e.jsx(zt,{size:18,className:"text-blue-200 shrink-0"}),e.jsxs("span",{className:"text-sm sm:text-base",children:[e.jsx("span",{className:"font-semibold",children:"Instructor:"})," ",rt]})]})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("p",{className:"text-xl sm:text-2xl font-bold flex items-baseline gap-2",children:[ne>0&&ne!==ae&&e.jsxs("span",{className:"text-base sm:text-lg line-through opacity-70",children:["₹",J(ne)]}),e.jsxs("span",{children:["₹",J(ae)]})]}),p&&e.jsxs("span",{className:"text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full",children:[Math.round((x||0)*100),"% OFF Applied"]})]}),p&&oe>0&&oe!==et&&e.jsxs("p",{className:"text-[1rem] text-white line-through decoration-red-300",children:["Offer Price: ₹",J(oe)]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3",children:[e.jsx("button",{onClick:ht,disabled:Q,className:"bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",children:Q?e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"animate-spin h-5 w-5",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",fill:"none"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Redirecting..."]}):"Enroll Now"}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx("input",{type:"text",placeholder:"Enter coupon code",value:d,onChange:r=>{i(r.target.value),f&&h("")},onKeyPress:r=>{r.key==="Enter"&&Ne()},disabled:p,className:"w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"}),p?e.jsx("button",{onClick:gt,className:"px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Remove"}):e.jsx("button",{onClick:Ne,className:"px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap",children:"Apply"})]})]}),f&&e.jsx("p",{className:"text-xs text-red-100 text-left",children:f}),s&&e.jsx("p",{className:"text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left",children:s})]}),c&&e.jsxs("div",{className:`\r
      mt-3 flex items-start sm:items-center gap-2 \r
      bg-green-100 border border-green-300 \r
      text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base\r
      shadow-sm w-full max-w-full\r
    `,children:[e.jsx("span",{className:"font-bold text-green-900 text-lg",children:"✔"}),e.jsxs("p",{className:"leading-tight break-words flex-1",children:[e.jsx("span",{className:"font-semibold",children:"Success:"})," ",c]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center",children:[e.jsx(Pt,{className:"text-yellow-500"}),e.jsxs("span",{className:"font-semibold text-gray-800 text-lg",children:[lt," (",ct," ratings)"]})]}),(o?.overview||o?.description||o?.meta_description||o?.detailed_description&&Array.isArray(o.detailed_description.sections)&&o.detailed_description.sections.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"Course Description"}),o?.detailed_description&&Array.isArray(o.detailed_description.sections)&&o.detailed_description.sections.length>0?e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:o.detailed_description.sections.map((r,u)=>e.jsxs("div",{className:"mb-6",children:[r.title?e.jsx("h3",{className:"text-lg font-semibold mb-2",children:r.title}):null,e.jsx("div",{dangerouslySetInnerHTML:{__html:r.content||r.body||r.text||""}})]},u))}):e.jsx("div",{className:"bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:o.description||o.overview||""}})})]}),e.jsx("h1",{className:"mt-10 font-semibold text-3xl mb-6",children:"Course Content"}),e.jsx(As,{chapters:dt}),e.jsx("div",{className:"mt-10 p-6 bg-gray-100 rounded-2xl",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl",children:[e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Ot,alt:"Image 1",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"You can start NxtWave Academy right after Intermediate/12th"})]}),e.jsxs("div",{className:` h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Lt,alt:"Image 2",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Learn 6 hours a week alongside college"})]}),e.jsxs("div",{className:`w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 \r
                hover:scale-110`,children:[e.jsx("img",{src:Tt,alt:"Image 3",className:"w-full h-40 md:h-48 object-contain rounded-xl mb-3"}),e.jsx("h1",{className:"text-sm md:text-base text-gray-800 font-medium",children:"Land a high-paid software job irrespective of your college/branch"})]})]})}),e.jsx(At,{}),e.jsxs("div",{className:"mt-10 mb-10",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 text-gray-800",children:"What You'll Learn"}),e.jsx("ul",{className:"list-disc list-inside space-y-2 text-gray-700",children:bt.map((r,u)=>e.jsx("li",{children:r},u))}),e.jsx("button",{onClick:()=>Ve(!te),className:"mt-3 text-blue-600 font-medium hover:underline",children:te?"Read Less":"Read More"})]})]}),e.jsx(Yt,{isOpen:Le,onClose:ve,enrollmentStep:Ue,paymentConfirmed:$e,setPaymentConfirmed:pe,proceedToDetailsStep:xt,isAdvancingStep:We,handleCopyUpi:yt,upiCopied:Ye,PAYMENT_UPI_ID:t,displayAmount:J(ae),detailsForm:Be,handleDetailChange:ft,user:g,course:o,courseIdentifier:I,courseSlug:_,courseName:W,priceCents:re,setCheckoutError:a,setCheckoutSuccess:m,onSuccess:ve}),e.jsx(Wt,{trigger:Oe,duration:1400,playSound:!0,discountPercentage:Math.round((x||0)*100),onApply:()=>{}})]}):e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:e.jsx("p",{children:T||"Course not found. Try picking another program from the catalog."})})};export{zs as default};
