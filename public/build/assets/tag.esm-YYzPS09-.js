import{r as o,c as $,P as D,C as R,e as k,D as J,m as h,O as w,s as C}from"./app-CDoqvrB_.js";function f(e){"@babel/helpers - typeof";return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(e)}function X(e,t){if(f(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(f(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function q(e){var t=X(e,"string");return f(t)=="symbol"?t:t+""}function L(e,t,r){return(t=q(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _(){return _=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_.apply(null,arguments)}function Y(e){if(Array.isArray(e))return e}function W(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,a,l,i,s=[],c=!0,u=!1;try{if(l=(r=r.call(e)).next,t!==0)for(;!(c=(n=l.call(r)).done)&&(s.push(n.value),s.length!==t);c=!0);}catch(p){u=!0,a=p}finally{try{if(!c&&r.return!=null&&(i=r.return(),Object(i)!==i))return}finally{if(u)throw a}}return s}}function A(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function G(e,t){if(e){if(typeof e=="string")return A(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?A(e,t):void 0}}function Q(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(e,t){return Y(e)||W(e,t)||G(e,t)||Q()}var V={root:function(t){var r=t.props,n=t.state;return h("p-avatar p-component",{"p-avatar-image":w.isNotEmpty(r.image)&&!n.imageFailed,"p-avatar-circle":r.shape==="circle","p-avatar-lg":r.size==="large","p-avatar-xl":r.size==="xlarge","p-avatar-clickable":!!r.onClick})},label:"p-avatar-text",icon:"p-avatar-icon"},Z=`
@layer primereact {
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }
    
    .p-avatar.p-avatar-image {
        background-color: transparent;
    }
    
    .p-avatar.p-avatar-circle {
        border-radius: 50%;
    }
    
    .p-avatar.p-avatar-circle img {
        border-radius: 50%;
    }
    
    .p-avatar .p-avatar-icon {
        font-size: 1rem;
    }
    
    .p-avatar img {
        width: 100%;
        height: 100%;
    }
    
    .p-avatar-clickable {
        cursor: pointer;
    }
}
`,P=R.extend({defaultProps:{__TYPE:"Avatar",className:null,icon:null,image:null,imageAlt:"avatar",imageFallback:"default",label:null,onImageError:null,shape:"square",size:"normal",style:null,template:null,children:void 0},css:{classes:V,styles:Z}});function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function ee(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?I(Object(r),!0).forEach(function(n){L(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var te=o.forwardRef(function(e,t){var r=$(),n=o.useContext(D),a=P.getProps(e,n),l=o.useRef(null),i=o.useState(!1),s=N(i,2),c=s[0],u=s[1],p=o.useState(!1),v=N(p,2),j=v[0],S=v[1],g=P.setMetaData({props:a,state:{imageFailed:c,nested:j}}),b=g.ptm,E=g.cx,F=g.isUnstyled;k(P.css.styles,F,{name:"avatar"});var U=function(){if(w.isNotEmpty(a.image)&&!c){var m=r({src:a.image,onError:M},b("image"));return o.createElement("img",_({alt:a.imageAlt},m))}else if(a.label){var H=r({className:E("label")},b("label"));return o.createElement("span",H,a.label)}else if(a.icon){var K=r({className:E("icon")},b("icon"));return C.getJSXIcon(a.icon,ee({},K),{props:a})}return null},M=function(m){a.imageFallback==="default"?a.onImageError||(u(!0),m.target.src=null):m.target.src=a.imageFallback,a.onImageError&&a.onImageError(m)};o.useEffect(function(){var d=J.isAttributeEquals(l.current.parentElement,"data-pc-name","avatargroup");S(d)},[]),o.useImperativeHandle(t,function(){return{props:a,getElement:function(){return l.current}}});var z=r({ref:l,style:a.style,className:h(a.className,E("root",{imageFailed:c}))},P.getOtherProps(a),b("root")),B=a.template?w.getJSXElement(a.template,a):U();return o.createElement("div",z,B,a.children)});te.displayName="Avatar";function y(e){"@babel/helpers - typeof";return y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(e)}function re(e,t){if(y(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(y(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ne(e){var t=re(e,"string");return y(t)=="symbol"?t:t+""}function x(e,t,r){return(t=ne(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ae={value:"p-tag-value",icon:"p-tag-icon",root:function(t){var r=t.props;return h("p-tag p-component",x(x({},"p-tag-".concat(r.severity),r.severity!==null),"p-tag-rounded",r.rounded))}},oe=`
@layer primereact {
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    
    .p-tag-icon,
    .p-tag-value,
    .p-tag-icon.pi {
        line-height: 1.5;
    }
    
    .p-tag.p-tag-rounded {
        border-radius: 10rem;
    }
}
`,O=R.extend({defaultProps:{__TYPE:"Tag",value:null,severity:null,rounded:!1,icon:null,style:null,className:null,children:void 0},css:{classes:ae,styles:oe}});function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function le(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?T(Object(r),!0).forEach(function(n){x(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var se=o.forwardRef(function(e,t){var r=$(),n=o.useContext(D),a=O.getProps(e,n),l=O.setMetaData({props:a}),i=l.ptm,s=l.cx,c=l.isUnstyled;k(O.css.styles,c,{name:"tag"});var u=o.useRef(null),p=r({className:s("icon")},i("icon")),v=C.getJSXIcon(a.icon,le({},p),{props:a});o.useImperativeHandle(t,function(){return{props:a,getElement:function(){return u.current}}});var j=r({ref:u,className:h(a.className,s("root")),style:a.style},O.getOtherProps(a),i("root")),S=r({className:s("value")},i("value"));return o.createElement("span",j,v,o.createElement("span",S,a.value),o.createElement("span",null,a.children))});se.displayName="Tag";export{te as A,se as T};
