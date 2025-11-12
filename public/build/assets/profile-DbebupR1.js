import{r as o,b as k,P,C as z,c as D,d as C,u as M,j as e}from"./app-Djs60LFF.js";import{H as T}from"./help-Bg3JBfGf.js";import{A as _}from"./auth-CBckZJR8.js";import{A as B}from"./avatar.esm-CVw3mBqy.js";import{T as u}from"./tag.esm-C-wzSItE.js";import{Q as E}from"./index-D9pXE6Ld.js";import{c as f}from"./createLucideIcon-CQDTXXfE.js";import{U}from"./upload-D3bw44BL.js";import{C as A}from"./circle-check-big-Da2Q5yNL.js";import{C as b}from"./clock-DsGd8-Pi.js";import{U as H}from"./user-ZSiBcOwd.js";import{P as R}from"./phone-CdO5U8sD.js";import{B as I}from"./building-2-DjPdRjDo.js";import{B as S}from"./briefcase-CvVir1sr.js";import{C as Q}from"./calendar-days-oJZPxHaA.js";import{C as y}from"./calendar-CyXmJG-y.js";import{H as j}from"./house-BYcKT_CR.js";import{Q as F}from"./qr-code-o-jwlC5v.js";/* empty css            *//**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],L=f("award",K);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],G=f("hash",$);/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],O=f("loader-circle",J);var W={root:function(r){var t=r.props,n=r.horizontal,s=r.vertical;return C("p-divider p-component p-divider-".concat(t.layout," p-divider-").concat(t.type),{"p-divider-left":n&&(!t.align||t.align==="left"),"p-divider-right":n&&t.align==="right","p-divider-center":n&&t.align==="center"||s&&(!t.align||t.align==="center"),"p-divider-top":s&&t.align==="top","p-divider-bottom":s&&t.align==="bottom"},t.className)},content:"p-divider-content"},V=`
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
`,Y={root:function(r){var t=r.props;return{justifyContent:t.layout==="horizontal"?t.align==="center"||t.align===null?"center":t.align==="left"?"flex-start":t.align==="right"?"flex-end":null:null,alignItems:t.layout==="vertical"?t.align==="center"||t.align===null?"center":t.align==="top"?"flex-start":t.align==="bottom"?"flex-end":null:null}}},x=z.extend({defaultProps:{__TYPE:"Divider",align:null,layout:"horizontal",type:"solid",style:null,className:null,children:void 0},css:{classes:W,styles:V,inlineStyles:Y}}),p=o.forwardRef(function(a,r){var t=k(),n=o.useContext(P),s=x.getProps(a,n),l=x.setMetaData({props:s}),m=l.ptm,c=l.cx,h=l.sx,i=l.isUnstyled;D(x.css.styles,i,{name:"divider"});var d=o.useRef(null),g=s.layout==="horizontal",v=s.layout==="vertical";o.useImperativeHandle(r,function(){return{props:s,getElement:function(){return d.current}}});var N=t({ref:d,style:h("root"),className:c("root",{horizontal:g,vertical:v}),"aria-orientation":s.layout,role:"separator"},x.getOtherProps(s),m("root")),w=t({className:c("content")},m("content"));return o.createElement("div",N,o.createElement("div",w,s.children))});p.displayName="Divider";function ve({user:a}){const{data:r,setData:t,post:n,processing:s}=M({avatar:null}),l=i=>new Date(i).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),m=()=>{const i=new Date(a.arrive),d=new Date(a.depart),g=Math.abs(d-i);return Math.ceil(g/(1e3*60*60*24))},c={Pembina:"bg-purple-100 text-purple-700 border-purple-200",Pengurus:"bg-blue-100 text-blue-700 border-blue-200",Pengawas:"bg-amber-100 text-amber-700 border-amber-200",Anggota:"bg-gray-100 text-gray-700 border-gray-200"},h={DPW:"info",DPD:"success",DMW:"warning",Kampus:"help",Orpen:"danger"};return o.useEffect(()=>{if(!r.avatar)return;const i=r.avatar;if(i.size>2*1024*1024){alert("Ukuran file maksimal 2MB");return}if(!["image/jpeg","image/jpg","image/png","image/webp"].includes(i.type)){alert("Format file harus JPG, PNG, atau WebP");return}n("/profile",{forceFormData:!0,onError:d=>console.log(d)})},[r.avatar]),e.jsxs(_,{children:[e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4",children:e.jsxs("div",{className:"mx-auto max-w-4xl space-y-6",children:[e.jsxs("div",{className:"relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 shadow-xl",children:[e.jsx("div",{className:"absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"}),e.jsx("div",{className:"absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center",children:[e.jsxs("div",{className:"relative mb-4",children:[e.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full bg-white/20 blur-xl"}),e.jsx(B,{image:a.avatar||void 0,label:a.avatar?void 0:a.name.charAt(0),size:"xlarge",shape:"circle",className:"relative h-32 w-32 border-4 border-white/30 shadow-2xl backdrop-blur-sm",style:{width:"80px",height:"80px",fontSize:"32px"}}),e.jsx("label",{htmlFor:"avatar-upload",className:"absolute -right-2 -bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700",children:s?e.jsx(O,{className:"h-5 w-5 animate-spin"}):e.jsx(U,{className:"h-5 w-5"})})]}),e.jsx("input",{id:"avatar-upload",type:"file",accept:"image/jpeg,image/jpg,image/png,image/webp",onChange:i=>{t("avatar",i.target.files?.[0])},className:"hidden"}),e.jsx("h1",{className:"mb-2 text-center text-3xl font-bold text-white",children:a.name}),e.jsx("div",{className:"mb-4 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(G,{className:"h-4 w-4 text-white"}),e.jsx("span",{className:"font-mono text-lg font-bold text-white",children:a.code})]})}),e.jsx(u,{value:a.payment_verified?"Terverifikasi":"Menunggu Verifikasi",severity:a.payment_verified?"success":"warning",icon:a.payment_verified?e.jsx(A,{className:"mr-1 h-3 w-3"}):e.jsx(b,{className:"mr-1 h-3 w-3"}),className:"rounded-md bg-white/20 p-2 font-semibold backdrop-blur-sm"})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(H,{className:"mr-2 h-5 w-5 text-emerald-600"}),"Informasi Peserta"]})}),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Nomor Telepon"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(R,{className:"h-5 w-5 text-emerald-600"})}),e.jsx("span",{className:"font-semibold text-gray-800",children:a.phone})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Ukuran Peci"}),e.jsxs("div",{className:"flex items-center gap-3 rounded-xl bg-gray-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100",children:e.jsx(L,{className:"h-5 w-5 text-blue-600"})}),e.jsx("span",{className:"text-2xl font-bold text-gray-800",children:a.capsize})]})]})]}),e.jsx(p,{}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(I,{className:"mr-2 h-4 w-4"}),"Informasi Organisasi"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Utusan"}),e.jsxs("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:[e.jsx(u,{value:a.office.type,severity:h[a.office.type]||"info",className:"mb-2 font-semibold"}),e.jsx("p",{className:"font-semibold text-gray-800",children:a.office.name})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Jabatan"}),e.jsx("div",{className:"rounded-xl border-2 border-gray-100 p-4",children:e.jsxs("span",{className:`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold ${c[a.employment.name]||c.Anggota}`,children:[e.jsx(S,{className:"mr-2 h-4 w-4"}),a.employment.name]})})]})]})]}),e.jsx(p,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(Q,{className:"mr-2 h-4 w-4"}),"Jadwal Kehadiran"]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kedatangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-emerald-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100",children:e.jsx(y,{className:"h-5 w-5 text-emerald-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:l(a.arrive)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-in"})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs font-medium tracking-wide text-gray-500 uppercase",children:"Tanggal Kepulangan"}),e.jsxs("div",{className:"flex items-start gap-3 rounded-xl bg-red-50 p-4",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-red-100",children:e.jsx(y,{className:"h-5 w-5 text-red-600"})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-gray-800",children:l(a.depart)}),e.jsx("p",{className:"text-xs text-gray-500",children:"Check-out"})]})]})]})]}),e.jsx("div",{className:"mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(b,{className:"h-5 w-5 text-purple-600"}),e.jsx("span",{className:"font-medium text-gray-700",children:"Durasi Menginap"})]}),e.jsxs("span",{className:"text-2xl font-bold text-purple-600",children:[m()," Hari"]})]})})]}),a.room&&e.jsxs(e.Fragment,{children:[e.jsx(p,{}),e.jsxs("div",{children:[e.jsxs("h3",{className:"mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase",children:[e.jsx(j,{className:"mr-2 h-4 w-4"}),"Informasi Penginapan"]}),e.jsx("div",{className:"rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Gedung & Kamar"}),e.jsxs("p",{className:"text-xl font-bold text-gray-800",children:[a.room.building.name," - ",a.room.name]})]}),e.jsx(j,{className:"h-12 w-12 text-blue-300"})]})})]})]})]})]}),e.jsxs("div",{className:"overflow-hidden rounded-2xl bg-white shadow-xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4",children:e.jsxs("h2",{className:"flex items-center text-lg font-bold text-gray-800",children:[e.jsx(F,{className:"mr-2 h-5 w-5 text-emerald-600"}),"QR Code Presensi"]})}),e.jsxs("div",{className:"p-6 text-center",children:[e.jsx("div",{className:"mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100",children:e.jsx(E,{value:app.url+"/s/"+a.code,size:128,className:"h-32 w-32 bg-none text-emerald-600",bgColor:"none"})}),e.jsx("p",{className:"text-sm text-gray-600",children:"Tunjukkan QR code ini untuk presensi kegiatan"}),e.jsx("p",{className:"mt-1 font-mono text-xs text-gray-400",children:a.code})]})]})]})}),e.jsx(T,{})]})}export{ve as default};
