import{r as l,b as k,P,C as z,c as D,d as C,j as e}from"./app-BhOyqKaQ.js";import{H as T}from"./help-CXOd9AZk.js";import{A}from"./auth-DI7amm2X.js";import{A as B}from"./avatar.esm-Bv2PR9OZ.js";import{T as h}from"./tag.esm-DinKANs9.js";import{Q as H}from"./index-BXY015K9.js";import{c as u}from"./createLucideIcon-ByOhP9qe.js";import{C as M}from"./circle-check-big-DXFhZM_9.js";import{C as g}from"./clock-B-Vks3lu.js";import{U as R}from"./user-ofnYGOmi.js";import{P as _}from"./phone-B_xbPqNn.js";import{B as E}from"./building-2-dKHE7oz7.js";import{B as I}from"./briefcase-CTIzw6HY.js";import{C as S}from"./calendar-days-BLYUcH1U.js";import{C as f}from"./calendar-DpgMjMoU.js";import{H as v}from"./house-DVdaOHbn.js";import{Q}from"./qr-code-D0jAYp0L.js";/* empty css            *//**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],K=u("award",U);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],O=u("hash",L);var $={root:function(r){var a=r.props,n=r.horizontal,s=r.vertical;return C("p-divider p-component p-divider-".concat(a.layout," p-divider-").concat(a.type),{"p-divider-left":n&&(!a.align||a.align==="left"),"p-divider-right":n&&a.align==="right","p-divider-center":n&&a.align==="center"||s&&(!a.align||a.align==="center"),"p-divider-top":s&&a.align==="top","p-divider-bottom":s&&a.align==="bottom"},a.className)},content:"p-divider-content"},J=`
@layer primereact {
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
    }
    
    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        top: 50%;
        left: 0;
        width: 100%;
        content: "";
    }
    
    .p-divider-horizontal.p-divider-left {
        justify-content: flex-start;
    }
    
    .p-divider-horizontal.p-divider-right {
        justify-content: flex-end;
    }
    
    .p-divider-horizontal.p-divider-center {
        justify-content: center;
    }
    
    .p-divider-content {
        z-index: 1;
    }
    
    .p-divider-vertical {
        min-height: 100%;
        margin: 0 1rem;
        display: flex;
        position: relative;
        justify-content: center;
    }
    
    .p-divider-vertical:before {
        position: absolute;
        display: block;
        top: 0;
        left: 50%;
        height: 100%;
        content: "";
    }
    
    .p-divider-vertical.p-divider-top {
        align-items: flex-start;
    }
    
    .p-divider-vertical.p-divider-center {
        align-items: center;
    }
    
    .p-divider-vertical.p-divider-bottom {
        align-items: flex-end;
    }
    
    .p-divider-solid.p-divider-horizontal:before {
        border-top-style: solid;
    }
    
    .p-divider-solid.p-divider-vertical:before {
        border-left-style: solid;
    }
    
    .p-divider-dashed.p-divider-horizontal:before {
        border-top-style: dashed;
    }
    
    .p-divider-dashed.p-divider-vertical:before {
        border-left-style: dashed;
    }
    
    .p-divider-dotted.p-divider-horizontal:before {
        border-top-style: dotted;
    }
    
    .p-divider-dotted.p-divider-horizontal:before {
        border-left-style: dotted;
    }
}
`,W={root:function(r){var a=r.props;return{justifyContent:a.layout==="horizontal"?a.align==="center"||a.align===null?"center":a.align==="left"?"flex-start":a.align==="right"?"flex-end":null:null,alignItems:a.layout==="vertical"?a.align==="center"||a.align===null?"center":a.align==="top"?"flex-start":a.align==="bottom"?"flex-end":null:null}}},c=z.extend({defaultProps:{__TYPE:"Divider",align:null,layout:"horizontal",type:"solid",style:null,className:null,children:void 0},css:{classes:$,styles:J,inlineStyles:W}}),m=l.forwardRef(function(t,r){var a=k(),n=l.useContext(P),s=c.getProps(t,n),i=c.setMetaData({props:s}),d=i.ptm,o=i.cx,x=i.sx,b=i.isUnstyled;D(c.css.styles,b,{name:"divider"});var p=l.useRef(null),y=s.layout==="horizontal",j=s.layout==="vertical";l.useImperativeHandle(r,function(){return{props:s,getElement:function(){return p.current}}});var N=a({ref:p,style:x("root"),className:o("root",{horizontal:y,vertical:j}),"aria-orientation":s.layout,role:"separator"},c.getOtherProps(s),d("root")),w=a({className:o("content")},d("content"));return l.createElement("div",N,l.createElement("div",w,s.children))});m.displayName="Divider";function xe({user:t}){console.log(t);const r=i=>new Date(i).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),a=()=>{const i=new Date(t.arrive),d=new Date(t.depart),o=Math.abs(d-i);return Math.ceil(o/(1e3*60*60*24))},n={Pembina:"bg-purple-100 text-purple-700 border-purple-200",Pengurus:"bg-blue-100 text-blue-700 border-blue-200",Pengawas:"bg-amber-100 text-amber-700 border-amber-200",Anggota:"bg-gray-100 text-gray-700 border-gray-200"},s={DPW:"info",DPD:"success",DMW:"warning",Kampus:"help",Orpen:"danger"};return e.jsxs(A,{children:[e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4",children:e.jsxs("div",{className:"mx-auto max-w-4xl space-y-6",children:[e.jsxs("div",{className:"relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 shadow-xl",children:[e.jsx("div",{className:"absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"}),e.jsx("div",{className:"absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center",children:[e.jsxs("div",{className:"relative mb-4",children:[e.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full bg-white/20 blur-xl"}),e.jsx(B,{image:t.avatar||void 0,label:t.avatar?void 0:t.name.charAt(0),size:"xlarge",shape:"circle",className:"relative h-32 w-32 border-4 border-white/30 shadow-2xl backdrop-blur-sm",style:{width:"80px",height:"80px",fontSize:"32px"}})]}),e.jsx("h1",{className:"mb-2 text-center text-3xl font-bold text-white",children:t.name}),e.jsx("div",{className:"mb-4 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(O,{className:"h-4 w-4 text-white"}),e.jsx("span",{className:"font-mono text-lg font-bold text-white",children:t.code})]})}),e.jsx(h,{value:t.payment_verified?"Terverifikasi":"Menunggu Verifikasi",severity:t.payment_verified?"success":"warning",icon:t.payment_verified?e.jsx(M,{className:"mr-1 h-3 w-3"}):e.jsx(g,{className:"mr-1 h-3 w-3"}),className:"rounded-md bg-white/20 p-2 font-semibold backdrop-blur-sm"})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(R,{className:"mr-2 h-5 w-5 text-emerald-600"}),"Informasi Peserta"]})}),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Nomor Telepon"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(_,{className:"h-5 w-5 text-emerald-600"})}),e.jsx("span",{className:"font-semibold text-gray-800",children:t.phone})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Ukuran Peci"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100",children:e.jsx(K,{className:"h-5 w-5 text-blue-600"})}),e.jsx("span",{className:"text-2xl font-bold text-gray-800",children:t.capsize})]})]})]}),e.jsx(m,{}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(E,{className:"mr-2 h-4 w-4"}),"Informasi Organisasi"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Utusan"}),e.jsxs("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:[e.jsx(h,{value:t.office.type,severity:s[t.office.type]||"info",className:"mb-2 font-semibold"}),e.jsx("p",{className:"font-semibold text-gray-800",children:t.office.name})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Jabatan"}),e.jsx("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:e.jsxs("span",{className:`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold ${n[t.employment.name]||n.Anggota}`,children:[e.jsx(I,{className:"mr-2 h-4 w-4"}),t.employment.name]})})]})]})]}),e.jsx(m,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(S,{className:"mr-2 h-4 w-4"}),"Jadwal Kehadiran"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kedatangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-emerald-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(f,{className:"h-5 w-5 text-emerald-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:r(t.arrive)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-in"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kepulangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-red-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-red-100",children:e.jsx(f,{className:"h-5 w-5 text-red-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:r(t.depart)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-out"})]})]})]})]}),e.jsx("div",{className:"mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(g,{className:"h-5 w-5 text-purple-600"}),e.jsx("span",{className:"font-medium text-gray-700",children:"Durasi Menginap"})]}),e.jsxs("span",{className:"text-2xl font-bold text-purple-600",children:[a()," Hari"]})]})})]}),t.room&&e.jsxs(e.Fragment,{children:[e.jsx(m,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(v,{className:"mr-2 h-4 w-4"}),"Informasi Penginapan"]}),e.jsx("div",{className:"rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Gedung & Kamar"}),e.jsxs("p",{className:"text-xl font-bold text-gray-800",children:[t.room.building.name," - ",t.room.name]})]}),e.jsx(v,{className:"h-12 w-12 text-blue-300"})]})})]})]})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(Q,{className:"mr-2 h-5 w-5 text-emerald-600"}),"QR Code Presensi"]})}),e.jsxs("div",{className:"p-6 text-center",children:[e.jsx("div",{className:"mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100",children:e.jsx(H,{value:app.url+"/s/"+t.code,size:128,className:"h-32 w-32 bg-none text-emerald-600",bgColor:"none"})}),e.jsx("p",{className:"text-sm text-gray-600",children:"Tunjukkan QR code ini untuk presensi kegiatan"}),e.jsx("p",{className:"mt-1 font-mono text-xs text-gray-400",children:t.code})]})]})]})}),e.jsx(T,{})]})}export{xe as default};
