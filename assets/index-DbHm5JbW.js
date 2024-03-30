import{R as e,r as te,i as ne,u as re,l as z,a as o}from"./index-CBhupnk4.js";/**
 * router-devtools
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function w(){return w=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},w.apply(this,arguments)}const oe=t=>{try{const n=localStorage.getItem(t);return typeof n=="string"?JSON.parse(n):void 0}catch{return}};function B(t,n){const[r,a]=e.useState();e.useEffect(()=>{const d=oe(t);a(typeof d>"u"||d===null?typeof n=="function"?n():n:d)},[n,t]);const i=e.useCallback(d=>{a(h=>{let b=d;typeof d=="function"&&(b=d(h));try{localStorage.setItem(t,JSON.stringify(b))}catch{}return b})},[t]);return[r,i]}const c={background:"#0b1521",backgroundAlt:"#132337",foreground:"white",gray:"#3f4e60",grayAlt:"#222e3e",inputBackgroundColor:"#fff",inputTextColor:"#000",success:"#00ab52",danger:"#ff0085",active:"#006bff",warning:"#ffb200"},U=e.createContext(c);function K({theme:t,...n}){return e.createElement(U.Provider,w({value:t},n))}function ae(){return e.useContext(U)}function le(t){const[n,r]=e.useState(()=>{if(typeof window<"u")return window.matchMedia&&window.matchMedia(t).matches});return e.useEffect(()=>{if(typeof window<"u"){if(!window.matchMedia)return;const a=window.matchMedia(t),i=({matches:d})=>r(d);return a.addListener(i),()=>{a.removeListener(i)}}},[n,t,r]),n}const ie=typeof window>"u";function W(t,n){return t.state.status==="pending"?n.active:t.state.status==="error"?n.danger:t.state.status==="success"?n.success:n.gray}function k(t,n,r={}){return e.forwardRef(({style:a,...i},d)=>{const h=ae(),b=Object.entries(r).reduce((g,[l,f])=>le(l)?{...g,...typeof f=="function"?f(i,h):f}:g,{});return e.createElement(t,{...i,style:{...typeof n=="function"?n(i,h):n,...a,...b},ref:d})})}function Q(){const t=e.useRef(!1),n=e.useCallback(()=>t.current,[]);return e[ie?"useEffect":"useLayoutEffect"](()=>(t.current=!0,()=>{t.current=!1}),[]),n}const se=t=>{const n=Object.getOwnPropertyNames(Object(t)),r=typeof t=="bigint"?`${t.toString()}n`:t;return JSON.stringify(r,n)};function Y(t){const n=Q(),[r,a]=e.useState(t),i=e.useCallback(d=>{ce(()=>{n()&&a(d)})},[n]);return[r,i]}function ce(t){Promise.resolve().then(t).catch(n=>setTimeout(()=>{throw n}))}const de=k("div",(t,n)=>({fontSize:"clamp(12px, 1.5vw, 14px)",fontFamily:"sans-serif",display:"flex",backgroundColor:n.background,color:n.foreground}),{"(max-width: 700px)":{flexDirection:"column"},"(max-width: 600px)":{fontSize:".9em"}}),ue=k("div",()=>({flex:"1 1 500px",display:"flex",flexDirection:"column",overflow:"auto",height:"100%"}),{"(max-width: 700px)":(t,n)=>({borderTop:`2px solid ${n.gray}`})}),G=k("button",(t,n)=>({appearance:"none",fontSize:".9em",fontWeight:"bold",background:n.gray,border:"0",borderRadius:".3em",color:"white",padding:".5em",opacity:t.disabled?".5":void 0,cursor:"pointer"})),H=k("code",{fontSize:".9em"}),F=k("div",{fontFamily:"Menlo, monospace",fontSize:".7rem",lineHeight:"1.7",outline:"none",wordBreak:"break-word"}),V=k("span",{color:"white"}),me=k("button",{cursor:"pointer",color:"white"}),ge=k("button",{cursor:"pointer",color:"inherit",font:"inherit",outline:"inherit",background:"transparent",border:"none",padding:0}),fe=k("span",(t,n)=>({color:n.danger})),j=k("div",{marginLeft:".1em",paddingLeft:"1em",borderLeft:"2px solid rgba(0,0,0,.15)"}),pe=k("span",{color:"grey",fontSize:".7em"}),J=({expanded:t,style:n={}})=>o.createElement("span",{style:{display:"inline-block",transition:"all .1s ease",transform:`rotate(${t?90:0}deg) ${n.transform||""}`,...n}},"▶");function be(t,n){if(n<1)return[];let r=0;const a=[];for(;r<t.length;)a.push(t.slice(r,r+n)),r=r+n;return a}const ye=({handleEntry:t,label:n,value:r,subEntries:a=[],subEntryPages:i=[],type:d,expanded:h=!1,toggleExpanded:b,pageSize:g,renderer:l})=>{const[f,R]=o.useState([]),[p,u]=o.useState(void 0),v=()=>{u(r())};return o.createElement(F,null,i.length?o.createElement(o.Fragment,null,o.createElement(ge,{onClick:()=>b()},o.createElement(J,{expanded:h})," ",n," ",o.createElement(pe,null,String(d).toLowerCase()==="iterable"?"(Iterable) ":"",a.length," ",a.length>1?"items":"item")),h?i.length===1?o.createElement(j,null,a.map((y,E)=>t(y))):o.createElement(j,null,i.map((y,E)=>o.createElement("div",{key:E},o.createElement(F,null,o.createElement(me,{onClick:()=>R(x=>x.includes(E)?x.filter(T=>T!==E):[...x,E])},o.createElement(J,{expanded:h})," [",E*g," ..."," ",E*g+g-1,"]"),f.includes(E)?o.createElement(j,null,y.map(x=>t(x))):null)))):null):d==="function"?o.createElement(o.Fragment,null,o.createElement(P,{renderer:l,label:o.createElement("button",{onClick:v,style:{appearance:"none",border:"0",background:"transparent"}},o.createElement(V,null,n)," 🔄"," "),value:p,defaultExpanded:{}})):o.createElement(o.Fragment,null,o.createElement(V,null,n,":")," ",o.createElement(fe,null,se(r))))};function he(t){return Symbol.iterator in t}function P({value:t,defaultExpanded:n,renderer:r=ye,pageSize:a=100,...i}){const[d,h]=o.useState(!!n),b=o.useCallback(()=>h(p=>!p),[]);let g=typeof t,l=[];const f=p=>{const u=n===!0?{[p.label]:!0}:n==null?void 0:n[p.label];return{...p,defaultExpanded:u}};Array.isArray(t)?(g="array",l=t.map((p,u)=>f({label:u.toString(),value:p}))):t!==null&&typeof t=="object"&&he(t)&&typeof t[Symbol.iterator]=="function"?(g="Iterable",l=Array.from(t,(p,u)=>f({label:u.toString(),value:p}))):typeof t=="object"&&t!==null&&(g="object",l=Object.entries(t).map(([p,u])=>f({label:p,value:u})));const R=be(l,a);return r({handleEntry:p=>o.createElement(P,w({key:p.label,value:t,renderer:r},i,p)),type:g,subEntries:l,subEntryPages:R,value:t,expanded:d,toggleExpanded:b,pageSize:a,...i})}const Ee=typeof window>"u";function X(t){return e.createElement("div",w({},t,{style:{...t.style??{},display:"flex",alignItems:"center",flexDirection:"column",fontSize:"0.8rem",fontWeight:"bolder",lineHeight:"1"}}),e.createElement("div",{style:{letterSpacing:"-0.05rem"}},"TANSTACK"),e.createElement("div",{style:{backgroundImage:"linear-gradient(to right, var(--tw-gradient-stops))","--tw-gradient-from":"#84cc16","--tw-gradient-stops":"var(--tw-gradient-from), var(--tw-gradient-to)","--tw-gradient-to":"#10b981",WebkitBackgroundClip:"text",color:"transparent",letterSpacing:"0.1rem",marginRight:"-0.2rem"}},"ROUTER"))}function xe({initialIsOpen:t,panelProps:n={},closeButtonProps:r={},toggleButtonProps:a={},position:i="bottom-left",containerElement:d="footer",router:h}){const b=e.useRef(null),g=e.useRef(null),[l,f]=B("tanstackRouterDevtoolsOpen",t),[R,p]=B("tanstackRouterDevtoolsHeight",null),[u,v]=Y(!1),[y,E]=Y(!1),x=Q(),T=(m,C)=>{if(C.button!==0)return;E(!0);const S={originalHeight:(m==null?void 0:m.getBoundingClientRect().height)??0,pageY:C.pageY},A=L=>{const $=S.pageY-L.pageY,N=(S==null?void 0:S.originalHeight)+$;p(N),N<70?f(!1):f(!0)},I=()=>{E(!1),document.removeEventListener("mousemove",A),document.removeEventListener("mouseUp",I)};document.addEventListener("mousemove",A),document.addEventListener("mouseup",I)};e.useEffect(()=>{v(l??!1)},[l,u,v]),e.useEffect(()=>{const m=g.current;if(m){const C=()=>{m&&u&&(m.style.visibility="visible")},S=()=>{m&&!u&&(m.style.visibility="hidden")};return m.addEventListener("transitionstart",C),m.addEventListener("transitionend",S),()=>{m.removeEventListener("transitionstart",C),m.removeEventListener("transitionend",S)}}},[u]),e[Ee?"useEffect":"useLayoutEffect"](()=>{var m,C;if(u){const S=(C=(m=b.current)==null?void 0:m.parentElement)==null?void 0:C.style.paddingBottom,A=()=>{var L,$;const I=(L=g.current)==null?void 0:L.getBoundingClientRect().height;($=b.current)!=null&&$.parentElement&&(b.current.parentElement.style.paddingBottom=`${I}px`)};if(A(),typeof window<"u")return window.addEventListener("resize",A),()=>{var I;window.removeEventListener("resize",A),(I=b.current)!=null&&I.parentElement&&typeof S=="string"&&(b.current.parentElement.style.paddingBottom=S)}}},[u]);const{style:M={},...O}=n,{style:s={},onClick:D,...Z}=r,{style:q={},onClick:_,...ee}=a;return x()?e.createElement(d,{ref:b,className:"TanStackRouterDevtools"},e.createElement(K,{theme:c},e.createElement(ve,w({ref:g},O,{router:h,style:{position:"fixed",bottom:"0",right:"0",zIndex:99999,width:"100%",height:R??500,maxHeight:"90%",boxShadow:"0 0 20px rgba(0,0,0,.3)",borderTop:`1px solid ${c.gray}`,transformOrigin:"top",visibility:l?"visible":"hidden",...M,...y?{transition:"none"}:{transition:"all .2s ease"},...u?{opacity:1,pointerEvents:"all",transform:"translateY(0) scale(1)"}:{opacity:0,pointerEvents:"none",transform:"translateY(15px) scale(1.02)"}},isOpen:u,setIsOpen:f,handleDragStart:m=>T(g.current,m)})),u?e.createElement(G,w({type:"button","aria-label":"Close TanStack Router Devtools"},Z,{onClick:m=>{f(!1),D&&D(m)},style:{position:"fixed",zIndex:99999,margin:".5em",bottom:0,...i==="top-right"?{right:"0"}:i==="top-left"?{left:"0"}:i==="bottom-right"?{right:"0"}:{left:"0"},...s}}),"Close"):null),u?null:e.createElement("button",w({type:"button"},ee,{"aria-label":"Open TanStack Router Devtools",onClick:m=>{f(!0),_&&_(m)},style:{appearance:"none",background:"none",border:0,padding:0,position:"fixed",zIndex:99999,display:"inline-flex",fontSize:"1.5em",margin:".5em",cursor:"pointer",width:"fit-content",...i==="top-right"?{top:"0",right:"0"}:i==="top-left"?{top:"0",left:"0"}:i==="bottom-right"?{bottom:"0",right:"0"}:{bottom:"0",left:"0"},...q}}),e.createElement(X,{"aria-hidden":!0}))):null}const ve=e.forwardRef(function(n,r){var E,x,T,M,O;const{isOpen:a=!0,setIsOpen:i,handleDragStart:d,router:h,...b}=n,g=e.useContext(te),l=h??(g==null?void 0:g.router);ne(l),re(l.__store);const[f,R]=B("tanstackRouterDevtoolsActiveRouteId",""),[p,u]=B("tanstackRouterDevtoolsActiveMatchId","");e.useEffect(()=>{u("")},[f]);const v=e.useMemo(()=>[...Object.values(l.state.currentMatches),...Object.values(l.state.pendingMatches??[])],[l.state.currentMatches,l.state.pendingMatches]),y=(v==null?void 0:v.find(s=>s.id===p))||(v==null?void 0:v.find(s=>s.route.id===f));return e.createElement(K,{theme:c},e.createElement(de,w({ref:r,className:"TanStackRouterDevtoolsPanel"},b),e.createElement("style",{dangerouslySetInnerHTML:{__html:`

            .TanStackRouterDevtoolsPanel * {
              scrollbar-color: ${c.backgroundAlt} ${c.gray};
            }

            .TanStackRouterDevtoolsPanel *::-webkit-scrollbar, .TanStackRouterDevtoolsPanel scrollbar {
              width: 1em;
              height: 1em;
            }

            .TanStackRouterDevtoolsPanel *::-webkit-scrollbar-track, .TanStackRouterDevtoolsPanel scrollbar-track {
              background: ${c.backgroundAlt};
            }

            .TanStackRouterDevtoolsPanel *::-webkit-scrollbar-thumb, .TanStackRouterDevtoolsPanel scrollbar-thumb {
              background: ${c.gray};
              border-radius: .5em;
              border: 3px solid ${c.backgroundAlt};
            }

            .TanStackRouterDevtoolsPanel table {
              width: 100%;
            }

            .TanStackRouterDevtoolsPanel table tr {
              border-bottom: 2px dotted rgba(255, 255, 255, .2);
            }

            .TanStackRouterDevtoolsPanel table tr:last-child {
              border-bottom: none
            }

            .TanStackRouterDevtoolsPanel table td {
              padding: .25rem .5rem;
              border-right: 2px dotted rgba(255, 255, 255, .05);
            }

            .TanStackRouterDevtoolsPanel table td:last-child {
              border-right: none
            }

          `}}),e.createElement("div",{style:{position:"absolute",left:0,top:0,width:"100%",height:"4px",marginBottom:"-4px",cursor:"row-resize",zIndex:1e5},onMouseDown:d}),e.createElement("div",{style:{flex:"1 1 500px",minHeight:"40%",maxHeight:"100%",overflow:"auto",borderRight:`1px solid ${c.grayAlt}`,display:"flex",flexDirection:"column"}},e.createElement("div",{style:{display:"flex",justifyContent:"start",gap:"1rem",padding:"1rem",alignItems:"center",background:c.backgroundAlt}},e.createElement(X,{"aria-hidden":!0}),e.createElement("div",{style:{fontSize:"clamp(.8rem, 2vw, 1.3rem)",fontWeight:"bold"}},e.createElement("span",{style:{fontWeight:100}},"Devtools"))),e.createElement("div",{style:{overflowY:"auto",flex:"1"}},e.createElement("div",{style:{padding:".5em"}},e.createElement(P,{label:"Router",value:l,defaultExpanded:{}})))),e.createElement("div",{style:{flex:"1 1 500px",minHeight:"40%",maxHeight:"100%",overflow:"auto",borderRight:`1px solid ${c.grayAlt}`,display:"flex",flexDirection:"column"}},e.createElement("div",{style:{padding:".5em",background:c.backgroundAlt,position:"sticky",top:0,zIndex:1}},"Active Matches"),l.state.currentMatches.map((s,D)=>e.createElement("div",{key:s.route.id||D,role:"button","aria-label":`Open match details for ${s.route.id}`,onClick:()=>R(f===s.route.id?"":s.route.id),style:{display:"flex",borderBottom:`solid 1px ${c.grayAlt}`,cursor:"pointer",alignItems:"center",background:s===y?"rgba(255,255,255,.1)":void 0}},e.createElement("div",{style:{flex:"0 0 auto",width:"1.3rem",height:"1.3rem",marginLeft:".25rem",background:W(s,c),alignItems:"center",justifyContent:"center",fontWeight:"bold",borderRadius:".25rem",transition:"all .2s ease-out"}}),e.createElement(H,{style:{padding:".5em"}},`${s.id}`))),(E=l.state.pendingMatches)!=null&&E.length?e.createElement(e.Fragment,null,e.createElement("div",{style:{marginTop:"2rem",padding:".5em",background:c.backgroundAlt,position:"sticky",top:0,zIndex:1}},"Pending Matches"),(x=l.state.pendingMatches)==null?void 0:x.map((s,D)=>e.createElement("div",{key:s.route.id||D,role:"button","aria-label":`Open match details for ${s.route.id}`,onClick:()=>R(f===s.route.id?"":s.route.id),style:{display:"flex",borderBottom:`solid 1px ${c.grayAlt}`,cursor:"pointer",background:s===y?"rgba(255,255,255,.1)":void 0}},e.createElement("div",{style:{flex:"0 0 auto",width:"1.3rem",height:"1.3rem",marginLeft:".25rem",background:W(s,c),alignItems:"center",justifyContent:"center",fontWeight:"bold",borderRadius:".25rem",transition:"all .2s ease-out"}}),e.createElement(H,{style:{padding:".5em"}},`${s.id}`)))):null),y?e.createElement(ue,null,e.createElement("div",{style:{padding:".5em",background:c.backgroundAlt,position:"sticky",top:0,bottom:0,zIndex:1}},"Match Details"),e.createElement("div",null,e.createElement("table",null,e.createElement("tbody",null,e.createElement("tr",null,e.createElement("td",{style:{opacity:".5"}},"ID"),e.createElement("td",null,e.createElement(H,{style:{lineHeight:"1.8em"}},JSON.stringify(y.id,null,2)))),e.createElement("tr",null,e.createElement("td",{style:{opacity:".5"}},"Status"),e.createElement("td",null,y.state.status)),e.createElement("tr",null,e.createElement("td",{style:{opacity:".5"}},"Last Updated"),e.createElement("td",null,y.state.updatedAt?new Date(y.state.updatedAt).toLocaleTimeString():"N/A"))))),e.createElement("div",{style:{background:c.backgroundAlt,padding:".5em",position:"sticky",top:0,bottom:0,zIndex:1}},"Actions"),e.createElement("div",{style:{padding:"0.5em"}},e.createElement(G,{type:"button",onClick:()=>y.load(),style:{background:c.gray}},"Reload")),e.createElement("div",{style:{background:c.backgroundAlt,padding:".5em",position:"sticky",top:0,bottom:0,zIndex:1}},"Explorer"),e.createElement("div",{style:{padding:".5em"}},e.createElement(P,{label:"Match",value:y,defaultExpanded:{}}))):null,e.createElement("div",{style:{flex:"1 1 500px",minHeight:"40%",maxHeight:"100%",overflow:"auto",borderRight:`1px solid ${c.grayAlt}`,display:"flex",flexDirection:"column"}},e.createElement("div",{style:{padding:".5em",background:c.backgroundAlt,position:"sticky",top:0,bottom:0,zIndex:1}},"Search Params"),e.createElement("div",{style:{padding:".5em"}},Object.keys(((T=z(l.state.currentMatches))==null?void 0:T.state.search)||{}).length?e.createElement(P,{value:((M=z(l.state.currentMatches))==null?void 0:M.state.search)||{},defaultExpanded:Object.keys(((O=z(l.state.currentMatches))==null?void 0:O.state.search)||{}).reduce((s,D)=>(s[D]={},s),{})}):e.createElement("em",{style:{opacity:.5}},"{ }")))))});export{xe as TanStackRouterDevtools,ve as TanStackRouterDevtoolsPanel};