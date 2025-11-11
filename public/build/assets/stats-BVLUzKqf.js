import{r as o,b as _,P as z,C as A,c as B,d as x,O as k,j as e,a as W}from"./app-Be-BbCJ9.js";import{A as X}from"./avatar.esm-Bz6TVc3k.js";import{P as Q}from"./chart.esm-DK7qr91p.js";import{C as Y}from"./confirmdialog.esm-C7-lX0BQ.js";import{U as q}from"./users-1sJR1bK-.js";import{C as G}from"./circle-check-big-DXTmi2S5.js";import{C as Z}from"./circle-x-Df-mb8Y4.js";import{C as ee}from"./calendar-BIcYsTpC.js";import{C as D}from"./clock-BO99rE2v.js";import{M as te}from"./map-pin-PBeZmFlz.js";import{F as ne}from"./file-text-DG0s4-X3.js";/* empty css            */import"./button.esm-BlQ1tocl.js";import"./dialog.esm-CHMTKjCA.js";import"./overlayservice.esm-C5nQhSZb.js";import"./createLucideIcon-CQUV6PbP.js";function C(){return C=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)({}).hasOwnProperty.call(n,s)&&(r[s]=n[s])}return r},C.apply(null,arguments)}function N(r){"@babel/helpers - typeof";return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N(r)}function re(r,t){if(N(r)!="object"||!r)return r;var n=r[Symbol.toPrimitive];if(n!==void 0){var s=n.call(r,t);if(N(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function ae(r){var t=re(r,"string");return N(t)=="symbol"?t:t+""}function ie(r,t,n){return(t=ae(t))in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}var se={root:function(t){var n=t.props;return n.mode==="indeterminate"?x("p-progressbar p-component p-progressbar-indeterminate"):x("p-progressbar p-component p-progressbar-determinate")},value:"p-progressbar-value p-progressbar-value-animate",label:"p-progressbar-label",container:"p-progressbar-indeterminate-container"},le=`
@layer primereact {
  .p-progressbar {
      position: relative;
      overflow: hidden;
  }
  
  .p-progressbar-determinate .p-progressbar-value {
      height: 100%;
      width: 0%;
      position: absolute;
      display: none;
      border: 0 none;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
  }
  
  .p-progressbar-determinate .p-progressbar-label {
      display: inline-flex;
  }
  
  .p-progressbar-determinate .p-progressbar-value-animate {
      transition: width 1s ease-in-out;
  }
  
  .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background-color: inherit;
        top: 0;
        left: 0;
        bottom: 0;
        will-change: left, right;
        -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
                animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }
  
  .p-progressbar-indeterminate .p-progressbar-value::after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
              animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      -webkit-animation-delay: 1.15s;
              animation-delay: 1.15s;
  }
}

@-webkit-keyframes p-progressbar-indeterminate-anim {
  0% {
    left: -35%;
    right: 100%; }
  60% {
    left: 100%;
    right: -90%; }
  100% {
    left: 100%;
    right: -90%; }
}
@keyframes p-progressbar-indeterminate-anim {
  0% {
    left: -35%;
    right: 100%; }
  60% {
    left: 100%;
    right: -90%; }
  100% {
    left: 100%;
    right: -90%; }
}

@-webkit-keyframes p-progressbar-indeterminate-anim-short {
  0% {
    left: -200%;
    right: 100%; }
  60% {
    left: 107%;
    right: -8%; }
  100% {
    left: 107%;
    right: -8%; }
}
@keyframes p-progressbar-indeterminate-anim-short {
  0% {
    left: -200%;
    right: 100%; }
  60% {
    left: 107%;
    right: -8%; }
  100% {
    left: 107%;
    right: -8%; }
}
`,oe={value:function(t){var n=t.props,s=Math.max(n.value,2),a=n.value?n.color:"transparent";return n.mode==="indeterminate"?{backgroundColor:n.color}:{width:s+"%",display:"flex",backgroundColor:a}}},j=A.extend({defaultProps:{__TYPE:"ProgressBar",__parentMetadata:null,id:null,value:null,showValue:!0,unit:"%",style:null,className:null,mode:"determinate",displayValueTemplate:null,color:null,children:void 0},css:{classes:se,styles:le,inlineStyles:oe}});function E(r,t){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(r);t&&(s=s.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),n.push.apply(n,s)}return n}function me(r){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?E(Object(n),!0).forEach(function(s){ie(r,s,n[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach(function(s){Object.defineProperty(r,s,Object.getOwnPropertyDescriptor(n,s))})}return r}var M=o.memo(o.forwardRef(function(r,t){var n=_(),s=o.useContext(z),a=j.getProps(r,s),d=j.setMetaData(me({props:a},a.__parentMetadata)),p=d.ptm,m=d.cx,P=d.isUnstyled;B(j.css.styles,P,{name:"progressbar"});var c=o.useRef(null),v=function(){if(a.showValue&&a.value!=null){var u=a.displayValueTemplate?a.displayValueTemplate(a.value):a.value+a.unit;return u}return null},b=function(){var u=v(),g=n({className:x(a.className,m("root")),style:a.style,role:"progressbar","aria-valuemin":"0","aria-valuenow":a.value,"aria-valuemax":"100"},j.getOtherProps(a),p("root")),i=n({className:m("value"),style:{width:a.value+"%",display:"flex",backgroundColor:a.color}},p("value")),l=n({className:m("label")},p("label"));return o.createElement("div",C({id:a.id,ref:c},g),o.createElement("div",i,u!=null&&o.createElement("div",l,u)))},f=function(){var u=n({className:x(a.className,m("root")),style:a.style,role:"progressbar","aria-valuemin":"0","aria-valuenow":a.value,"aria-valuemax":"100"},j.getOtherProps(a),p("root")),g=n({className:m("container")},p("container")),i=n({className:m("value"),style:{backgroundColor:a.color}},p("value"));return o.createElement("div",C({id:a.id,ref:c},u),o.createElement("div",g,o.createElement("div",i)))};if(o.useImperativeHandle(t,function(){return{props:a,getElement:function(){return c.current}}}),a.mode==="determinate")return b();if(a.mode==="indeterminate")return f();throw new Error(a.mode+" is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'")}));M.displayName="ProgressBar";function O(){return O=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)({}).hasOwnProperty.call(n,s)&&(r[s]=n[s])}return r},O.apply(null,arguments)}function w(r){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(r)}function ce(r,t){if(w(r)!="object"||!r)return r;var n=r[Symbol.toPrimitive];if(n!==void 0){var s=n.call(r,t);if(w(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function de(r){var t=ce(r,"string");return w(t)=="symbol"?t:t+""}function T(r,t,n){return(t=de(t))in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}var S=A.extend({defaultProps:{__TYPE:"Timeline",align:"left",className:null,content:null,dataKey:null,layout:"vertical",marker:null,opposite:null,value:null,children:void 0},css:{classes:{marker:"p-timeline-event-marker",connector:"p-timeline-event-connector",event:"p-timeline-event",opposite:"p-timeline-event-opposite",separator:"p-timeline-event-separator",content:"p-timeline-event-content",root:function(t){var n=t.props;return x("p-timeline p-component",T(T({},"p-timeline-".concat(n.align),!0),"p-timeline-".concat(n.layout),!0),n.className)}},styles:`
        @layer primereact {
            .p-timeline {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
            }
        
            .p-timeline-left .p-timeline-event-opposite {
                text-align: right;
            }
        
            .p-timeline-left .p-timeline-event-content {
                text-align: left;
            }
        
            .p-timeline-right .p-timeline-event {
                flex-direction: row-reverse;
            }
        
            .p-timeline-right .p-timeline-event-opposite {
                text-align: left;
            }
        
            .p-timeline-right .p-timeline-event-content {
                text-align: right;
            }
        
            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
                flex-direction: row-reverse;
            }
        
            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
                text-align: right;
            }
        
            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
                text-align: left;
            }
        
            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
                text-align: left;
            }
        
            .p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
                text-align: right;
            }
        
            .p-timeline-event {
                display: flex;
                position: relative;
                min-height: 70px;
            }
        
            .p-timeline-event:last-child {
                min-height: 0;
            }
        
            .p-timeline-event-opposite {
                flex: 1;
                padding: 0 1rem;
            }
        
            .p-timeline-event-content {
                flex: 1;
                padding: 0 1rem;
            }
        
            .p-timeline-event-separator {
                flex: 0;
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        
            .p-timeline-event-marker {
                display: flex;
                align-self: baseline;
            }
        
            .p-timeline-event-connector {
                flex-grow: 1;
            }
        
            .p-timeline-horizontal {
                flex-direction: row;
            }
        
            .p-timeline-horizontal .p-timeline-event {
                flex-direction: column;
                flex: 1;
            }
        
            .p-timeline-horizontal .p-timeline-event:last-child {
                flex: 0;
            }
        
            .p-timeline-horizontal .p-timeline-event-separator {
                flex-direction: row;
            }
        
            .p-timeline-horizontal .p-timeline-event-connector  {
                width: 100%;
            }
        
            .p-timeline-bottom .p-timeline-event {
                flex-direction: column-reverse;
            }
        
            .p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
                flex-direction: column-reverse;
            }
        }
    `}}),R=o.memo(o.forwardRef(function(r,t){var n=_(),s=o.useContext(z),a=S.getProps(r,s),d=S.setMetaData({props:a}),p=d.ptm,m=d.cx,P=d.isUnstyled;B(S.css.styles,P,{name:"timeline"});var c=function(i,l){return p(i,{context:{index:l}})},v=o.useRef(null),b=function(i,l){return a.dataKey?k.resolveFieldData(i,a.dataKey):"pr_id__".concat(l)},f=function(){return a.value&&a.value.map(function(i,l){var y=k.getJSXElement(a.opposite,i,l),K=n({className:m("marker")},c("marker",l)),L=k.getJSXElement(a.marker,i,l)||o.createElement("div",K),H=n({className:m("connector")},c("connector",l)),V=l!==a.value.length-1&&o.createElement("div",H),I=k.getJSXElement(a.content,i,l),U=n({className:m("event")},c("event",l)),$=n({className:m("opposite")},c("opposite",l)),J=n({className:m("separator")},c("separator",l)),F=n({className:m("content")},c("content",l));return o.createElement("div",O({key:b(i,l)},U),o.createElement("div",$,y),o.createElement("div",J,L,V),o.createElement("div",F,I))})};o.useImperativeHandle(t,function(){return{props:a,getElement:function(){return v.current}}});var h=f(),u=n({ref:v,className:x(a.className,m("root"))},S.getOtherProps(a),p("root"));return o.createElement("div",u,h)}));R.displayName="Timeline";const pe={id:2,title:"Rapat Dewan Pengawas",date:"2025-11-21",time_start:"14:00",time_end:"16:00",location:"Ruang Angsana",description:"Rapat koordinasi dewan pengawas untuk membahas program kerja tahun 2025",status:"ongoing"},ue=[{status:"Ordered",date:"15/10/2020 10:30"},{status:"Processing",date:"15/10/2020 14:00"},{status:"Shipped",date:"15/10/2020 16:15"},{status:"Delivered",date:"16/10/2020 10:00"}],ge=[{id:1,user:{id:1,name:"Arsyad Muhammad",phone:"081234567801",code:"ABC001",office:{name:"DPW Jawa Tengah"},employment:{name:"Pembina"}},attend:"2025-11-21T14:05:00"},{id:2,user:{id:2,name:"Amhar Aziz",phone:"081234567802",code:"ABC002",office:{name:"DPD Semarang"},employment:{name:"Pengurus"}},attend:null},{id:3,user:{id:3,name:"Aslam Hakim",phone:"081234567803",code:"ABC003",office:{name:"DPD Solo"},employment:{name:"Pengurus"}},attend:"2025-11-21T14:12:00"},{id:4,user:{id:4,name:"Ahmad Fauzi",phone:"081234567804",code:"ABC004",office:{name:"DPW Jawa Timur"},employment:{name:"Anggota"}},attend:null},{id:5,user:{id:5,name:"Budi Santoso",phone:"081234567805",code:"ABC005",office:{name:"DMW Jakarta"},employment:{name:"Anggota"}},attend:"2025-11-21T14:18:00"}],Te=({meetingId:r=2})=>{const[t,n]=o.useState(pe),[s,a]=o.useState(ge),[d,p]=o.useState(""),[m,P]=o.useState(null),c=s.length,v=s.filter(i=>i.attend!==null).length,b=c-v,f=c>0?Math.round(v/c*100):0,h={labels:["Hadir","Belum Hadir"],datasets:[{data:[v,b],backgroundColor:["#10b981","#f97316"],hoverBackgroundColor:["#059669","#ea580c"]}]},u={plugins:{legend:{position:"bottom"}}};s.filter(i=>{const l=i.user.name.toLowerCase().includes(d.toLowerCase())||i.user.phone.includes(d)||i.user.office.name.toLowerCase().includes(d.toLowerCase());let y=!0;return m&&(m.value==="attended"?y=i.attend!==null:m.value==="not_attended"&&(y=i.attend===null)),l&&y}).sort((i,l)=>i.attend&&!l.attend?-1:!i.attend&&l.attend?1:i.attend&&l.attend?new Date(i.attend)-new Date(l.attend):i.user.name.localeCompare(l.user.name));const g=s.filter(i=>i.attend!==null).sort((i,l)=>new Date(i.attend)-new Date(l.attend)).slice(0,5);return e.jsxs("div",{className:"p-6",children:[e.jsx(Y,{}),e.jsxs("div",{className:"grid grid-cols-4 gap-6",children:[e.jsxs("div",{className:"col-span-1 flex flex-col gap-y-6",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:[e.jsx("h3",{className:"mb-4 text-lg font-semibold text-gray-800",children:"Visualisasi Kehadiran"}),e.jsx(Q,{type:"doughnut",data:h,options:u})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-3",children:[e.jsx("p",{className:"mb-3 text-sm text-gray-600",children:"Persentase Kehadiran"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"flex-1",children:e.jsx(M,{value:f,showValue:!1,style:{height:"24px"},color:f>=80?"#10b981":f>=50?"#f97316":"#ef4444"})}),e.jsxs("p",{className:"text-3xl font-bold text-purple-600",children:[f,"%"]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-2",children:[e.jsx("div",{className:"rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Total Peserta"}),e.jsx("p",{className:"text-3xl font-bold text-gray-800",children:c})]}),e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100",children:e.jsx(q,{className:"text-blue-600",size:24})})]})}),e.jsx("div",{className:"rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Sudah Hadir"}),e.jsx("p",{className:"text-3xl font-bold text-emerald-600",children:v})]}),e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(G,{className:"text-emerald-600",size:24})})]})}),e.jsx("div",{className:"rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Belum Hadir"}),e.jsx("p",{className:"text-3xl font-bold text-orange-600",children:b})]}),e.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100",children:e.jsx(Z,{className:"text-orange-600",size:24})})]})})]})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsxs("div",{onClick:()=>W.get("/admin/kegiatan/assign"),className:"mb-6 cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-3",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ee,{className:"mt-1 text-emerald-600",size:20}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Tanggal"}),e.jsx("p",{className:"font-semibold text-gray-800",children:new Date(t.date).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(D,{className:"mt-1 text-emerald-600",size:20}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Waktu"}),e.jsxs("p",{className:"font-semibold text-gray-800",children:[t.time_start," - ",t.time_end]})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(te,{className:"mt-1 text-emerald-600",size:20}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Lokasi"}),e.jsx("p",{className:"font-semibold text-gray-800",children:t.location})]})]})]}),t.description&&e.jsx("div",{className:"mt-4 border-t border-gray-200 pt-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(ne,{className:"mt-1 text-gray-500",size:20}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm text-gray-600",children:"Deskripsi"}),e.jsx("p",{className:"text-gray-800",children:t.description})]})]})})]}),g.length>0&&e.jsxs("div",{className:"mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm",children:[e.jsxs("h3",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800",children:[e.jsx(D,{className:"text-purple-600",size:20}),"Timeline Presensi Terakhir"]}),e.jsx("div",{className:"space-y-3",children:g.map(i=>e.jsxs("div",{className:"flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3",children:[e.jsx(X,{label:i.user.name.charAt(0),size:"normal",shape:"circle",className:"bg-emerald-600 text-white"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-semibold text-gray-800",children:i.user.name}),e.jsx("p",{className:"text-sm text-gray-600",children:i.user.office.name})]}),e.jsx("div",{className:"text-right",children:e.jsx("p",{className:"text-sm font-semibold text-emerald-600",children:new Date(i.attend).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})})})]},i.id))})]})]}),e.jsx("div",{className:"col-span-1",children:e.jsx("div",{className:"rounded-lg border border-gray-200 bg-white shadow-sm",children:e.jsx(R,{value:ue,separarator:i=>e.jsx("h1",{children:i.status}),content:i=>i.status})})})]})]})};export{Te as default};
