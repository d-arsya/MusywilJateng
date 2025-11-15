import{r,b as R,P as T,C as B,c as E,d as M,u as U,j as e}from"./app-OPenZNUM.js";import{H as _}from"./help-Bvk2T7gc.js";import{A as H}from"./auth-y6GvBvyM.js";import{C as Q,g as F}from"./index.module-B_aoBtv8.js";import{A as K}from"./avatar.esm-rF-3CbzG.js";import{T as k}from"./tag.esm-C9RobA6r.js";import{Q as L}from"./index-R0XufqEl.js";import{c as N}from"./createLucideIcon-DlFh2Rtp.js";import{U as $}from"./upload-1BTkppxF.js";import{C as O}from"./circle-check-big-DY-FLrYa.js";import{C}from"./clock-BYN6OtfH.js";import{U as J}from"./user-JDyX7Tel.js";import{P as W}from"./phone-BlJ9le91.js";import{B as Z}from"./building-2-DWBY3AQT.js";import{B as G}from"./briefcase-D6HWDFWd.js";import{C as V}from"./calendar-days-DavYJCDx.js";import{C as P}from"./calendar-47mQTNwD.js";import{H as z}from"./house-lBuC-7-S.js";import{Q as Y}from"./qr-code-sGqXKi-b.js";/* empty css            *//**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],X=N("award",q);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],ae=N("hash",ee);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],se=N("loader-circle",te);var re={root:function(n){var t=n.props,o=n.horizontal,s=n.vertical;return M("p-divider p-component p-divider-".concat(t.layout," p-divider-").concat(t.type),{"p-divider-left":o&&(!t.align||t.align==="left"),"p-divider-right":o&&t.align==="right","p-divider-center":o&&t.align==="center"||s&&(!t.align||t.align==="center"),"p-divider-top":s&&t.align==="top","p-divider-bottom":s&&t.align==="bottom"},t.className)},content:"p-divider-content"},ne=`
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
`,ie={root:function(n){var t=n.props;return{justifyContent:t.layout==="horizontal"?t.align==="center"||t.align===null?"center":t.align==="left"?"flex-start":t.align==="right"?"flex-end":null:null,alignItems:t.layout==="vertical"?t.align==="center"||t.align===null?"center":t.align==="top"?"flex-start":t.align==="bottom"?"flex-end":null:null}}},g=B.extend({defaultProps:{__TYPE:"Divider",align:null,layout:"horizontal",type:"solid",style:null,className:null,children:void 0},css:{classes:re,styles:ne,inlineStyles:ie}}),f=r.forwardRef(function(a,n){var t=R(),o=r.useContext(T),s=g.getProps(a,o),d=g.setMetaData({props:s}),p=d.ptm,x=d.cx,v=d.sx,u=d.isUnstyled;E(g.css.styles,u,{name:"divider"});var m=r.useRef(null),h=s.layout==="horizontal",b=s.layout==="vertical";r.useImperativeHandle(n,function(){return{props:s,getElement:function(){return m.current}}});var j=t({ref:m,style:v("root"),className:x("root",{horizontal:h,vertical:b}),"aria-orientation":s.layout,role:"separator"},g.getOtherProps(s),p("root")),y=t({className:x("content")},p("content"));return r.createElement("div",j,r.createElement("div",y,s.children))});f.displayName="Divider";function De({user:a}){const{data:n,setData:t,post:o,processing:s}=U({avatar:null}),d=i=>new Date(i).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),p=()=>{const i=new Date(a.arrive),l=new Date(a.depart),c=Math.abs(l-i);return Math.ceil(c/(1e3*60*60*24))},x={Pembina:"bg-purple-100 text-purple-700 border-purple-200",Pengurus:"bg-blue-100 text-blue-700 border-blue-200",Pengawas:"bg-amber-100 text-amber-700 border-amber-200",Anggota:"bg-gray-100 text-gray-700 border-gray-200"},v={DPW:"info",DPD:"success",DMW:"warning",Kampus:"help",Orpen:"danger"},[u,m]=r.useState(!1),[h,b]=r.useState(null),[j,y]=r.useState({x:0,y:0}),[w,D]=r.useState(1),[S,A]=r.useState(null),I=(i,l)=>{A(l)};return r.useEffect(()=>{n.avatar&&(n.avatar,o("/profile",{forceFormData:!0,onError:i=>console.log(i)}))},[n.avatar]),e.jsxs(H,{children:[e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4",children:e.jsxs("div",{className:"mx-auto max-w-4xl space-y-6",children:[e.jsxs("div",{className:"relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 shadow-xl",children:[e.jsx("div",{className:"absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"}),e.jsx("div",{className:"absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center",children:[e.jsxs("div",{className:"relative mb-4",children:[e.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full bg-white/20 blur-xl"}),e.jsx(K,{image:a.avatar||void 0,label:a.avatar?void 0:a.name.charAt(0),size:"xlarge",shape:"circle",className:"relative h-32 w-32 border-4 border-white/30 shadow-2xl backdrop-blur-sm [&_img]:object-cover",style:{width:"80px",height:"80px",fontSize:"32px"}}),e.jsx("label",{htmlFor:"avatar-upload",className:"absolute -right-2 -bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700",children:s?e.jsx(se,{className:"h-5 w-5 animate-spin"}):e.jsx($,{className:"h-5 w-5"})})]}),e.jsx("input",{id:"avatar-upload",type:"file",accept:"image/jpeg,image/jpg,image/png,image/webp",onChange:i=>{const l=i.target.files?.[0];if(l){const c=new FileReader;c.onload=()=>{b(c.result),m(!0)},c.readAsDataURL(l)}},className:"hidden"}),u&&e.jsxs("div",{className:"fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60",children:[e.jsx("div",{className:"relative h-80 w-80 bg-black",children:e.jsx(Q,{image:h,crop:j,zoom:w,aspect:1,onCropChange:y,onZoomChange:D,onCropComplete:I})}),e.jsxs("div",{className:"mt-4 flex gap-4",children:[e.jsx("button",{onClick:()=>m(!1),className:"rounded bg-gray-300 px-4 py-2",children:"Batal"}),e.jsx("button",{onClick:async()=>{const i=await F(h,S),c=await(await fetch(i)).blob();t("avatar",c),m(!1)},className:"rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700",children:"Pilih"})]})]}),e.jsx("h1",{className:"mb-2 text-center text-xl font-bold text-white",children:a.name}),e.jsx("div",{className:"mb-4 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ae,{className:"h-4 w-4 text-white"}),e.jsx("span",{className:"font-mono text-lg font-bold text-white",children:a.code})]})}),e.jsx(k,{value:a.paid?"Terverifikasi":"Menunggu Verifikasi",severity:a.paid?"success":"warning",icon:a.paid?e.jsx(O,{className:"mr-1 h-3 w-3"}):e.jsx(C,{className:"mr-1 h-3 w-3"}),className:"rounded-md bg-white/20 p-2 font-semibold backdrop-blur-sm"})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(J,{className:"mr-2 h-5 w-5 text-emerald-600"}),"Informasi Peserta"]})}),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Nomor Telepon"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(W,{className:"h-5 w-5 text-emerald-600"})}),e.jsx("span",{className:"font-semibold text-gray-800",children:a.phone})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Ukuran Peci"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100",children:e.jsx(X,{className:"h-5 w-5 text-blue-600"})}),e.jsx("span",{className:"text-2xl font-bold text-gray-800",children:a.capsize})]})]})]}),e.jsx(f,{}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(Z,{className:"mr-2 h-4 w-4"}),"Informasi Organisasi"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Utusan"}),e.jsxs("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:[e.jsx(k,{value:a.office.type,severity:v[a.office.type]||"info",className:"mb-2 font-semibold"}),e.jsx("p",{className:"font-semibold text-gray-800",children:a.office.name})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Jabatan"}),e.jsx("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:e.jsxs("span",{className:`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold ${x[a.employment.name]||x.Anggota}`,children:[e.jsx(G,{className:"mr-2 h-4 w-4"}),a.employment.name]})})]})]})]}),e.jsx(f,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(V,{className:"mr-2 h-4 w-4"}),"Jadwal Kehadiran"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kedatangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-emerald-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(P,{className:"h-5 w-5 text-emerald-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:d(a.arrive)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-in"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kepulangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-red-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-red-100",children:e.jsx(P,{className:"h-5 w-5 text-red-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:d(a.depart)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-out"})]})]})]})]}),e.jsx("div",{className:"mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(C,{className:"h-5 w-5 text-purple-600"}),e.jsx("span",{className:"font-medium text-gray-700",children:"Durasi Menginap"})]}),e.jsxs("span",{className:"text-xl font-bold text-purple-600",children:[p()," Hari"]})]})})]}),a.room&&e.jsxs(e.Fragment,{children:[e.jsx(f,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(z,{className:"mr-2 h-4 w-4"}),"Informasi Penginapan"]}),e.jsx("div",{className:"rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Gedung & Kamar"}),e.jsxs("p",{className:"text-md font-bold text-gray-800",children:[a.room.building.name," - ",a.room.name]})]}),e.jsx(z,{className:"h-12 w-12 text-blue-300"})]})})]})]})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(Y,{className:"mr-2 h-5 w-5 text-emerald-600"}),"QR Code Presensi"]})}),e.jsxs("div",{className:"py-6 text-center",children:[e.jsx("div",{className:"mx-auto mb-4 flex h-60 w-60 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100",children:e.jsx(L,{value:app.url+"/s/"+a.code,size:128,className:"h-52 w-52 bg-none text-emerald-600",bgColor:"none"})}),e.jsx("p",{className:"text-sm text-gray-600",children:"Tunjukkan QR code ini untuk presensi kegiatan"}),e.jsx("p",{className:"mt-1 font-mono text-xs text-gray-400",children:a.code})]})]})]})}),e.jsx(_,{})]})}export{De as default};
