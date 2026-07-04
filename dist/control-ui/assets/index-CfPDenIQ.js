(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const on=globalThis,Os=on.ShadowRoot&&(on.ShadyCSS===void 0||on.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ds=Symbol(),Wi=new WeakMap;let ur=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==Ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Os&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=Wi.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Wi.set(n,t))}return t}toString(){return this.cssText}};const ul=e=>new ur(typeof e=="string"?e:e+"",void 0,Ds),pl=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new ur(n,e,Ds)},fl=(e,t)=>{if(Os)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=on.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},Gi=Os?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return ul(n)})(e):e;const{is:hl,defineProperty:gl,getOwnPropertyDescriptor:ml,getOwnPropertyNames:vl,getOwnPropertySymbols:yl,getPrototypeOf:bl}=Object,gn=globalThis,Yi=gn.trustedTypes,wl=Yi?Yi.emptyScript:"",$l=gn.reactiveElementPolyfillSupport,It=(e,t)=>e,an={toAttribute(e,t){switch(t){case Boolean:e=e?wl:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Fs=(e,t)=>!hl(e,t),Qi={attribute:!0,type:String,converter:an,reflect:!1,useDefault:!1,hasChanged:Fs};Symbol.metadata??=Symbol("metadata"),gn.litPropertyMetadata??=new WeakMap;let st=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Qi){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&gl(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:o}=ml(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:i,set(r){const c=i?.call(this);o?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qi}static _$Ei(){if(this.hasOwnProperty(It("elementProperties")))return;const t=bl(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(It("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(It("properties"))){const n=this.properties,s=[...vl(n),...yl(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(Gi(i))}else t!==void 0&&n.push(Gi(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fl(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:an).toAttribute(n,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:an;this._$Em=i;const c=r.fromAttribute(n,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,n,s,i=!1,o){if(t!==void 0){const r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??Fs)(o,n)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:r}=o,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};st.elementStyles=[],st.shadowRootOptions={mode:"open"},st[It("elementProperties")]=new Map,st[It("finalized")]=new Map,$l?.({ReactiveElement:st}),(gn.reactiveElementVersions??=[]).push("2.1.2");const Bs=globalThis,Ji=e=>e,ln=Bs.trustedTypes,Xi=ln?ln.createPolicy("lit-html",{createHTML:e=>e}):void 0,pr="$lit$",Te=`lit$${Math.random().toFixed(9).slice(2)}$`,fr="?"+Te,kl=`<${fr}>`,je=document,Lt=()=>je.createComment(""),Mt=e=>e===null||typeof e!="object"&&typeof e!="function",Us=Array.isArray,Sl=e=>Us(e)||typeof e?.[Symbol.iterator]=="function",Qn=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zi=/-->/g,eo=/>/g,De=RegExp(`>|${Qn}(?:([^\\s"'>=/]+)(${Qn}*=${Qn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),to=/'/g,no=/"/g,hr=/^(?:script|style|textarea|title)$/i,xl=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=xl(1),Re=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),so=new WeakMap,He=je.createTreeWalker(je,129);function gr(e,t){if(!Us(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xi!==void 0?Xi.createHTML(t):t}const Al=(e,t)=>{const n=e.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",r=wt;for(let c=0;c<n;c++){const a=e[c];let f,l,p=-1,h=0;for(;h<a.length&&(r.lastIndex=h,l=r.exec(a),l!==null);)h=r.lastIndex,r===wt?l[1]==="!--"?r=Zi:l[1]!==void 0?r=eo:l[2]!==void 0?(hr.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=De):l[3]!==void 0&&(r=De):r===De?l[0]===">"?(r=i??wt,p=-1):l[1]===void 0?p=-2:(p=r.lastIndex-l[2].length,f=l[1],r=l[3]===void 0?De:l[3]==='"'?no:to):r===no||r===to?r=De:r===Zi||r===eo?r=wt:(r=De,i=void 0);const v=r===De&&e[c+1].startsWith("/>")?" ":"";o+=r===wt?a+kl:p>=0?(s.push(f),a.slice(0,p)+pr+a.slice(p)+Te+v):a+Te+(p===-2?c:v)}return[gr(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class Pt{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let o=0,r=0;const c=t.length-1,a=this.parts,[f,l]=Al(t,n);if(this.el=Pt.createElement(f,s),He.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=He.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(pr)){const h=l[r++],v=i.getAttribute(p).split(Te),w=/([.?@])?(.*)/.exec(h);a.push({type:1,index:o,name:w[2],strings:v,ctor:w[1]==="."?Tl:w[1]==="?"?El:w[1]==="@"?Cl:vn}),i.removeAttribute(p)}else p.startsWith(Te)&&(a.push({type:6,index:o}),i.removeAttribute(p));if(hr.test(i.tagName)){const p=i.textContent.split(Te),h=p.length-1;if(h>0){i.textContent=ln?ln.emptyScript:"";for(let v=0;v<h;v++)i.append(p[v],Lt()),He.nextNode(),a.push({type:2,index:++o});i.append(p[h],Lt())}}}else if(i.nodeType===8)if(i.data===fr)a.push({type:2,index:o});else{let p=-1;for(;(p=i.data.indexOf(Te,p+1))!==-1;)a.push({type:7,index:o}),p+=Te.length-1}o++}}static createElement(t,n){const s=je.createElement("template");return s.innerHTML=t,s}}function at(e,t,n=e,s){if(t===Re)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const o=Mt(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=at(e,i._$AS(e,t.values),i,s)),t}class _l{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??je).importNode(n,!0);He.currentNode=i;let o=He.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let f;a.type===2?f=new mn(o,o.nextSibling,this,t):a.type===1?f=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(f=new Il(o,this,t)),this._$AV.push(f),a=s[++c]}r!==a?.index&&(o=He.nextNode(),r++)}return He.currentNode=je,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let mn=class mr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=at(this,t,n),Mt(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==Re&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Sl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&Mt(this._$AH)?this._$AA.nextSibling.data=t:this.T(je.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Pt.createElement(gr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const o=new _l(i,this),r=o.u(this.options);o.p(n),this.T(r),this._$AH=o}}_$AC(t){let n=so.get(t.strings);return n===void 0&&so.set(t.strings,n=new Pt(t)),n}k(t){Us(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const o of t)i===n.length?n.push(s=new mr(this.O(Lt()),this.O(Lt()),this,this.options)):s=n[i],s._$AI(o),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=Ji(t).nextSibling;Ji(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},vn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,n=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=at(this,t,n,0),r=!Mt(t)||t!==this._$AH&&t!==Re,r&&(this._$AH=t);else{const c=t;let a,f;for(t=o[0],a=0;a<o.length-1;a++)f=at(this,c[s+a],n,a),f===Re&&(f=this._$AH[a]),r||=!Mt(f)||f!==this._$AH[a],f===g?t=g:t!==g&&(t+=(f??"")+o[a+1]),this._$AH[a]=f}r&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Tl=class extends vn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}},El=class extends vn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}},Cl=class extends vn{constructor(t,n,s,i,o){super(t,n,s,i,o),this.type=5}_$AI(t,n=this){if((t=at(this,t,n,0)??g)===Re)return;const s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};class Il{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}}const Rl={I:mn},Ll=Bs.litHtmlPolyfillSupport;Ll?.(Pt,mn),(Bs.litHtmlVersions??=[]).push("3.3.3");const Ml=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const o=n?.renderBefore??null;s._$litPart$=i=new mn(t.insertBefore(Lt(),o),o,void 0,n??{})}return i._$AI(e),i};const Ks=globalThis;let rt=class extends st{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ml(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Re}};rt._$litElement$=!0,rt.finalized=!0,Ks.litElementHydrateSupport?.({LitElement:rt});const Pl=Ks.litElementPolyfillSupport;Pl?.({LitElement:rt});(Ks.litElementVersions??=[]).push("4.2.2");const vr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Nl={attribute:!0,type:String,converter:an,reflect:!1,hasChanged:Fs},Ol=(e=Nl,t,n)=>{const{kind:s,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),s==="accessor"){const{name:r}=n;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,a,e,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,e,c),c}}}if(s==="setter"){const{name:r}=n;return function(c){const a=this[r];t.call(this,c),this.requestUpdate(r,a,e,!0,c)}}throw Error("Unsupported decorator location: "+s)};function yn(e){return(t,n)=>typeof n=="object"?Ol(e,t,n):((s,i,o)=>{const r=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(i,o):void 0})(e,t,n)}function $(e){return yn({...e,state:!0,attribute:!1})}const Dl=50,Fl=200,Bl="Assistant";function io(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function hs(e){const t=io(e?.name,Dl)??Bl,n=io(e?.avatar??void 0,Fl)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function Ul(){return hs(typeof window>"u"?{}:{name:window.__CLAWDBOT_ASSISTANT_NAME__,avatar:window.__CLAWDBOT_ASSISTANT_AVATAR__})}const yr="clawdbot.control.settings.v1";function Kl(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(yr);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed}}catch{return t}}function zl(e){localStorage.setItem(yr,JSON.stringify(e))}function br(e){const t=e?.trim();if(!t)return null;if(t==="main")return{raw:t,agentId:"main",channel:"main"};const n=t.split(":").filter(i=>i.length>0);if(n.length===0)return null;if(n[0]==="agent"){const i=n[1]?.trim();return i?{raw:t,agentId:i,channel:n[2],peer:n.length>3?n.slice(3).join(":"):void 0}:null}const s=n[0]?.trim();return s?{raw:t,agentId:s,channel:n[1],peer:n.length>2?n.slice(2).join(":"):void 0}:null}const Hl=[{label:"Chat",tabs:["chat"]},{label:"Control",tabs:["overview","channels","instances","sessions","cron"]},{label:"Agent",tabs:["skills","nodes"]},{label:"Settings",tabs:["config","debug","logs"]}],wr={overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},$r=new Map(Object.entries(wr).map(([e,t])=>[t,e]));function bn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function Nt(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function zs(e,t=""){const n=bn(t),s=wr[e];return n?`${n}${s}`:s}function kr(e,t=""){const n=bn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=Nt(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":$r.get(i)??null}function jl(e){let t=Nt(e);if(t.endsWith("/index.html")&&(t=Nt(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if($r.has(i)){const o=n.slice(0,s);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function ql(e){switch(e){case"chat":return"💬";case"overview":return"📊";case"channels":return"🔗";case"instances":return"📡";case"sessions":return"📄";case"cron":return"⏰";case"skills":return"⚡️";case"nodes":return"🖥️";case"config":return"⚙️";case"debug":return"🐞";case"logs":return"🧾";default:return"📁"}}function gs(e){switch(e){case"overview":return"Overview";case"channels":return"Channels";case"instances":return"Instances";case"sessions":return"Sessions";case"cron":return"Cron Jobs";case"skills":return"Skills";case"nodes":return"Nodes";case"chat":return"Chat";case"config":return"Config";case"debug":return"Debug";case"logs":return"Logs";default:return"Control"}}function Vl(e){switch(e){case"overview":return"Gateway status, entry points, and a fast health read.";case"channels":return"Manage channels and settings.";case"instances":return"Presence beacons from connected clients and nodes.";case"sessions":return"Inspect active sessions and adjust per-session defaults.";case"cron":return"Schedule wakeups and recurring agent runs.";case"skills":return"Manage skill availability and API key injection.";case"nodes":return"Paired devices, capabilities, and command exposure.";case"chat":return"Direct gateway chat session for quick interventions.";case"config":return"Edit ~/.clawdbot/clawdbot.json safely.";case"debug":return"Gateway snapshots, events, and manual RPC calls.";case"logs":return"Live tail of the gateway file logs.";default:return""}}function Ot(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function B(e){if(!e&&e!==0)return"n/a";const t=Date.now()-e;if(t<0)return"just now";const n=Math.round(t/1e3);if(n<60)return`${n}s ago`;const s=Math.round(n/60);if(s<60)return`${s}m ago`;const i=Math.round(s/60);return i<48?`${i}h ago`:`${Math.round(i/24)}d ago`}function Sr(e){if(!e&&e!==0)return"n/a";if(e<1e3)return`${e}ms`;const t=Math.round(e/1e3);if(t<60)return`${t}s`;const n=Math.round(t/60);if(n<60)return`${n}m`;const s=Math.round(n/60);return s<48?`${s}h`:`${Math.round(s/24)}d`}function ms(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function vs(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function xr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function cn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}const Jn=/<\s*\/?\s*think(?:ing)?\s*>/gi,oo=/<\s*think(?:ing)?\s*>/i,ro=/<\s*\/\s*think(?:ing)?\s*>/i;function Xn(e){if(!e)return e;const t=oo.test(e),n=ro.test(e);if(!t&&!n)return e;if(t!==n)return t?e.replace(oo,"").trimStart():e.replace(ro,"").trimStart();if(!Jn.test(e))return e;Jn.lastIndex=0;let s="",i=0,o=!1;for(const r of e.matchAll(Jn)){const c=r.index??0;o||(s+=e.slice(i,c)),o=!r[0].toLowerCase().includes("/"),i=c+r[0].length}return o||(s+=e.slice(i)),s.trimStart()}const Wl=/^\[([^\]]+)\]\s*/,Gl=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"];function Yl(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:Gl.some(t=>e.startsWith(`${t} `))}function Zn(e){const t=e.match(Wl);if(!t)return e;const n=t[1]??"";return Yl(n)?e.slice(t[0].length):e}function wn(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?Xn(s):Zn(s);if(Array.isArray(s)){const i=s.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(i.length>0){const o=i.join(`
`);return n==="assistant"?Xn(o):Zn(o)}}return typeof t.text=="string"?n==="assistant"?Xn(t.text):Zn(t.text):null}function Ql(e){const n=e.content,s=[];if(Array.isArray(n))for(const c of n){const a=c;if(a.type==="thinking"&&typeof a.thinking=="string"){const f=a.thinking.trim();f&&s.push(f)}}if(s.length>0)return s.join(`
`);const i=Jl(e);if(!i)return null;const r=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(c=>(c[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Jl(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function Xl(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}function ao(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Zl(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Hs(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),ao(t)}return ao(Zl())}async function lt(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}async function ec(e,t){if(!e.client||!e.connected)return!1;const n=t.trim();if(!n)return!1;const s=Date.now();e.chatMessages=[...e.chatMessages,{role:"user",content:[{type:"text",text:n}],timestamp:s}],e.chatSending=!0,e.lastError=null;const i=Hs();e.chatRunId=i,e.chatStream="",e.chatStreamStartedAt=s;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:n,deliver:!1,idempotencyKey:i}),!0}catch(o){const r=String(o);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=r,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+r}],timestamp:Date.now()}],!1}finally{e.chatSending=!1}}async function tc(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function nc(e,t){if(!t||t.sessionKey!==e.sessionKey||t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return null;if(t.state==="delta"){const n=wn(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}async function pt(e){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const t={includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown},n=cn(e.sessionsFilterActive,0),s=cn(e.sessionsFilterLimit,0);n>0&&(t.activeMinutes=n),s>0&&(t.limit=s);const i=await e.client.request("sessions.list",t);i&&(e.sessionsResult=i)}catch(t){e.sessionsError=String(t)}finally{e.sessionsLoading=!1}}}async function sc(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await pt(e)}catch(i){e.sessionsError=String(i)}}async function ic(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await pt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}const lo=50,oc=80,rc=12e4;function ac(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function co(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=ac(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=xr(n,rc);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function lc(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function cc(e){if(e.toolStreamOrder.length<=lo)return;const t=e.toolStreamOrder.length-lo,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function dc(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function ys(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),dc(e)}function uc(e,t=!1){if(t){ys(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>ys(e),oc))}function js(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],ys(e)}const pc=5e3;function fc(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},pc))}function hc(e,t){if(!t)return;if(t.stream==="compaction"){fc(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const o=typeof s.name=="string"?s.name:"tool",r=typeof s.phase=="string"?s.phase:"",c=r==="start"?s.args:void 0,a=r==="update"?co(s.partialResult):r==="result"?co(s.result):void 0,f=Date.now();let l=e.toolStreamById.get(i);l?(l.name=o,c!==void 0&&(l.args=c),a!==void 0&&(l.output=a),l.updatedAt=f):(l={toolCallId:i,runId:t.runId,sessionKey:n,name:o,args:c,output:a,startedAt:typeof t.ts=="number"?t.ts:f,updatedAt:f,message:{}},e.toolStreamById.set(i,l),e.toolStreamOrder.push(i)),l.message=lc(l),cc(e),uc(e,r==="result")}function $n(e,t=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const n=()=>{const s=e.querySelector(".chat-thread");if(s){const i=getComputedStyle(s).overflowY;if(i==="auto"||i==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=n();if(!s)return;const i=s.scrollHeight-s.scrollTop-s.clientHeight;if(!(t||e.chatUserNearBottom||i<200))return;t&&(e.chatHasAutoScrolled=!0),s.scrollTop=s.scrollHeight,e.chatUserNearBottom=!0;const r=t?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const c=n();if(!c)return;const a=c.scrollHeight-c.scrollTop-c.clientHeight;(t||e.chatUserNearBottom||a<200)&&(c.scrollTop=c.scrollHeight,e.chatUserNearBottom=!0)},r)})})}function Ar(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function gc(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<200}function mc(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function vc(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0}function yc(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`clawdbot-logs-${t}-${o}.log`,i.click(),URL.revokeObjectURL(s)}function bc(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}function qe(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function ct(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function _r(e,t,n){if(t.length===0)return;let s=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],c=t[o+1];if(typeof r=="number"){if(!Array.isArray(s))return;s[r]==null&&(s[r]=typeof c=="number"?[]:{}),s=s[r]}else{if(typeof s!="object"||s==null)return;const a=s;a[r]==null&&(a[r]=typeof c=="number"?[]:{}),s=a[r]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function Tr(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const o=t[i];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function we(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});$c(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Er(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});wc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function wc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function $c(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?ct(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=ct(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=qe(t.config??{}),e.configFormOriginal=qe(t.config??{}))}async function bs(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?ct(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await we(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function kc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?ct(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await we(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function Sc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function Jt(e,t,n){const s=qe(e.configForm??e.configSnapshot?.config??{});_r(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=ct(s))}function uo(e,t){const n=qe(e.configForm??e.configSnapshot?.config??{});Tr(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=ct(n))}async function Bt(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function kn(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function xc(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",atMs:n}}if(e.scheduleKind==="every"){const n=cn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function Ac(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t};e.deliver&&(n.deliver=!0),e.channel&&(n.channel=e.channel),e.to.trim()&&(n.to=e.to.trim());const s=cn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function _c(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=xc(e.cronForm),n=Ac(e.cronForm),s=e.cronForm.agentId.trim(),i={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:s||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,isolation:e.cronForm.postToMainPrefix.trim()&&e.cronForm.sessionTarget==="isolated"?{postToMainPrefix:e.cronForm.postToMainPrefix.trim()}:void 0};if(!i.name)throw new Error("Name required.");await e.client.request("cron.add",i),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await kn(e),await Bt(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function Tc(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await kn(e),await Bt(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function Ec(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await Cr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Cc(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await kn(e),await Bt(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Cr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}async function de(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Ic(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Rc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Lc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}async function Sn(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=s;e.debugModels=Array.isArray(o?.models)?o?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Mc(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Pc=2e3,Nc=new Set(["trace","debug","info","warn","error","fatal"]);function Oc(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Dc(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Nc.has(t)?t:null}function Fc(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=Dc(n?.logLevelName??n?.level),o=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,r=Oc(o);let c=null;r&&(typeof r.subsystem=="string"?c=r.subsystem:typeof r.module=="string"&&(c=r.module)),!c&&o&&o.length<120&&(c=o);let a=null;return typeof t[1]=="string"?a=t[1]:!r&&typeof t[0]=="string"?a=t[0]:typeof t.message=="string"&&(a=t.message),{raw:e,time:s,level:i,subsystem:c,message:a??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function qs(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(s.lines)?s.lines.filter(c=>typeof c=="string"):[]).map(Fc),r=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-Pc),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}const Ir={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:Z,n:rn,Gx:po,Gy:fo,a:es,d:ts,h:Bc}=Ir,Ve=32,Vs=64,Uc=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},Y=(e="")=>{const t=new Error(e);throw Uc(t,Y),t},Kc=e=>typeof e=="bigint",zc=e=>typeof e=="string",Hc=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Le=(e,t,n="")=>{const s=Hc(e),i=e?.length,o=t!==void 0;if(!s||o&&i!==t){const r=n&&`"${n}" `,c=o?` of length ${t}`:"",a=s?`length=${i}`:`type=${typeof e}`;Y(r+"expected Uint8Array"+c+", got "+a)}return e},xn=e=>new Uint8Array(e),Rr=e=>Uint8Array.from(e),Lr=(e,t)=>e.toString(16).padStart(t,"0"),Mr=e=>Array.from(Le(e)).map(t=>Lr(t,2)).join(""),be={_0:48,_9:57,A:65,F:70,a:97,f:102},ho=e=>{if(e>=be._0&&e<=be._9)return e-be._0;if(e>=be.A&&e<=be.F)return e-(be.A-10);if(e>=be.a&&e<=be.f)return e-(be.a-10)},Pr=e=>{const t="hex invalid";if(!zc(e))return Y(t);const n=e.length,s=n/2;if(n%2)return Y(t);const i=xn(s);for(let o=0,r=0;o<s;o++,r+=2){const c=ho(e.charCodeAt(r)),a=ho(e.charCodeAt(r+1));if(c===void 0||a===void 0)return Y(t);i[o]=c*16+a}return i},Nr=()=>globalThis?.crypto,jc=()=>Nr()?.subtle??Y("crypto.subtle must be defined, consider polyfill"),Dt=(...e)=>{const t=xn(e.reduce((s,i)=>s+Le(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},qc=(e=Ve)=>Nr().getRandomValues(xn(e)),dn=BigInt,Ke=(e,t,n,s="bad number: out of range")=>Kc(e)&&t<=e&&e<n?e:Y(s),T=(e,t=Z)=>{const n=e%t;return n>=0n?n:t+n},Or=e=>T(e,rn),Vc=(e,t)=>{(e===0n||t<=0n)&&Y("no inverse n="+e+" mod="+t);let n=T(e,t),s=t,i=0n,o=1n;for(;n!==0n;){const r=s/n,c=s%n,a=i-o*r;s=n,n=c,i=o,o=a}return s===1n?T(i,t):Y("no inverse")},Wc=e=>{const t=Ur[e];return typeof t!="function"&&Y("hashes."+e+" not set"),t},ns=e=>e instanceof oe?e:Y("Point expected"),ws=2n**256n;class oe{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const o=ws;this.X=Ke(t,0n,o),this.Y=Ke(n,0n,o),this.Z=Ke(s,1n,o),this.T=Ke(i,0n,o),Object.freeze(this)}static CURVE(){return Ir}static fromAffine(t){return new oe(t.x,t.y,1n,T(t.x*t.y))}static fromBytes(t,n=!1){const s=ts,i=Rr(Le(t,Ve)),o=t[31];i[31]=o&-129;const r=Fr(i);Ke(r,0n,n?ws:Z);const a=T(r*r),f=T(a-1n),l=T(s*a+1n);let{isValid:p,value:h}=Yc(f,l);p||Y("bad point: y not sqrt");const v=(h&1n)===1n,w=(o&128)!==0;return!n&&h===0n&&w&&Y("bad point: x==0, isLastByteOdd"),w!==v&&(h=T(-h)),new oe(h,r,1n,T(h*r))}static fromHex(t,n){return oe.fromBytes(Pr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=es,n=ts,s=this;if(s.is0())return Y("bad point: ZERO");const{X:i,Y:o,Z:r,T:c}=s,a=T(i*i),f=T(o*o),l=T(r*r),p=T(l*l),h=T(a*t),v=T(l*T(h+f)),w=T(p+T(n*T(a*f)));if(v!==w)return Y("bad point: equation left != right (1)");const k=T(i*o),S=T(r*c);return k!==S?Y("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:o,Y:r,Z:c}=ns(t),a=T(n*c),f=T(o*i),l=T(s*c),p=T(r*i);return a===f&&l===p}is0(){return this.equals(ot)}negate(){return new oe(T(-this.X),this.Y,this.Z,T(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=es,o=T(t*t),r=T(n*n),c=T(2n*T(s*s)),a=T(i*o),f=t+n,l=T(T(f*f)-o-r),p=a+r,h=p-c,v=a-r,w=T(l*h),k=T(p*v),S=T(l*v),C=T(h*p);return new oe(w,k,C,S)}add(t){const{X:n,Y:s,Z:i,T:o}=this,{X:r,Y:c,Z:a,T:f}=ns(t),l=es,p=ts,h=T(n*r),v=T(s*c),w=T(o*p*f),k=T(i*a),S=T((n+s)*(r+c)-h-v),C=T(k-w),I=T(k+w),O=T(v-l*h),R=T(S*C),_=T(I*O),M=T(S*O),ee=T(C*I);return new oe(R,_,ee,M)}subtract(t){return this.add(ns(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return ot;if(Ke(t,1n,rn),t===1n)return this;if(this.equals(We))return rd(t).p;let s=ot,i=We;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?s=s.add(o):n&&(i=i.add(o));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(ot))return{x:0n,y:1n};const i=Vc(s,Z);T(s*i)!==1n&&Y("invalid inverse");const o=T(t*i),r=T(n*i);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=Dr(n);return s[31]|=t&1n?128:0,s}toHex(){return Mr(this.toBytes())}clearCofactor(){return this.multiply(dn(Bc),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(rn/2n,!1).double();return rn%2n&&(t=t.add(this)),t.is0()}}const We=new oe(po,fo,1n,T(po*fo)),ot=new oe(0n,1n,1n,0n);oe.BASE=We;oe.ZERO=ot;const Dr=e=>Pr(Lr(Ke(e,0n,ws),Vs)).reverse(),Fr=e=>dn("0x"+Mr(Rr(Le(e)).reverse())),fe=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=Z;return n},Gc=e=>{const n=e*e%Z*e%Z,s=fe(n,2n)*n%Z,i=fe(s,1n)*e%Z,o=fe(i,5n)*i%Z,r=fe(o,10n)*o%Z,c=fe(r,20n)*r%Z,a=fe(c,40n)*c%Z,f=fe(a,80n)*a%Z,l=fe(f,80n)*a%Z,p=fe(l,10n)*o%Z;return{pow_p_5_8:fe(p,2n)*e%Z,b2:n}},go=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Yc=(e,t)=>{const n=T(t*t*t),s=T(n*n*t),i=Gc(e*s).pow_p_5_8;let o=T(e*n*i);const r=T(t*o*o),c=o,a=T(o*go),f=r===e,l=r===T(-e),p=r===T(-e*go);return f&&(o=c),(l||p)&&(o=a),(T(o)&1n)===1n&&(o=T(-o)),{isValid:f||l,value:o}},$s=e=>Or(Fr(e)),Ws=(...e)=>Ur.sha512Async(Dt(...e)),Qc=(...e)=>Wc("sha512")(Dt(...e)),Br=e=>{const t=e.slice(0,Ve);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(Ve,Vs),s=$s(t),i=We.multiply(s),o=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:o}},Gs=e=>Ws(Le(e,Ve)).then(Br),Jc=e=>Br(Qc(Le(e,Ve))),Xc=e=>Gs(e).then(t=>t.pointBytes),Zc=e=>Ws(e.hashable).then(e.finish),ed=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,o=$s(t),r=We.multiply(o).toBytes();return{hashable:Dt(r,s,n),finish:f=>{const l=Or(o+$s(f)*i);return Le(Dt(r,Dr(l)),Vs)}}},td=async(e,t)=>{const n=Le(e),s=await Gs(t),i=await Ws(s.prefix,n);return Zc(ed(s,i,n))},Ur={sha512Async:async e=>{const t=jc(),n=Dt(e);return xn(await t.digest("SHA-512",n.buffer))},sha512:void 0},nd=(e=qc(Ve))=>e,sd={getExtendedPublicKeyAsync:Gs,getExtendedPublicKey:Jc,randomSecretKey:nd},un=8,id=256,Kr=Math.ceil(id/un)+1,ks=2**(un-1),od=()=>{const e=[];let t=We,n=t;for(let s=0;s<Kr;s++){n=t,e.push(n);for(let i=1;i<ks;i++)n=n.add(t),e.push(n);t=n.double()}return e};let mo;const vo=(e,t)=>{const n=t.negate();return e?n:t},rd=e=>{const t=mo||(mo=od());let n=ot,s=We;const i=2**un,o=i,r=dn(i-1),c=dn(un);for(let a=0;a<Kr;a++){let f=Number(e&r);e>>=c,f>ks&&(f-=o,e+=1n);const l=a*ks,p=l,h=l+Math.abs(f)-1,v=a%2!==0,w=f<0;f===0?s=s.add(vo(v,t[p])):n=n.add(vo(w,t[h]))}return e!==0n&&Y("invalid wnaf"),{p:n,f:s}},ss="clawdbot-device-identity-v1";function Ss(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function zr(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let o=0;o<s.length;o+=1)i[o]=s.charCodeAt(o);return i}function ad(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Hr(e){const t=await crypto.subtle.digest("SHA-256",e);return ad(new Uint8Array(t))}async function ld(){const e=sd.randomSecretKey(),t=await Xc(e);return{deviceId:await Hr(t),publicKey:Ss(t),privateKey:Ss(e)}}async function Ys(){try{const n=localStorage.getItem(ss);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await Hr(zr(s.publicKey));if(i!==s.deviceId){const o={...s,deviceId:i};return localStorage.setItem(ss,JSON.stringify(o)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await ld(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(ss,JSON.stringify(t)),e}async function cd(e,t){const n=zr(e),s=new TextEncoder().encode(t),i=await td(s,n);return Ss(i)}const jr="clawdbot.device.auth.v1";function Qs(e){return e.trim()}function dd(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].sort()}function Js(){try{const e=window.localStorage.getItem(jr);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function qr(e){try{window.localStorage.setItem(jr,JSON.stringify(e))}catch{}}function ud(e){const t=Js();if(!t||t.deviceId!==e.deviceId)return null;const n=Qs(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function Vr(e){const t=Qs(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=Js();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:dd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,qr(n),i}function Wr(e){const t=Js();if(!t||t.deviceId!==e.deviceId)return;const n=Qs(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],qr(s)}async function Me(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function pd(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Me(e)}catch(n){e.devicesError=String(n)}}async function fd(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Me(e)}catch(s){e.devicesError=String(s)}}async function hd(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await Ys(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&Vr({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Me(e)}catch(n){e.devicesError=String(n)}}async function gd(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await Ys();t.deviceId===s.deviceId&&Wr({deviceId:s.deviceId,role:t.role}),await Me(e)}catch(s){e.devicesError=String(s)}}async function An(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function md(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function vd(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Xs(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=md(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);yd(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function yd(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=qe(t.file??{}))}async function bd(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=vd(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await Xs(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function wd(e,t,n){const s=qe(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});_r(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function $d(e,t){const n=qe(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Tr(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function Zs(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}function dt(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function _n(e){return e instanceof Error?e.message:String(e)}async function Ut(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=_n(n)}finally{e.skillsLoading=!1}}}function kd(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function Sd(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await Ut(e),dt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=_n(s);e.skillsError=i,dt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function xd(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await Ut(e),dt(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=_n(n);e.skillsError=s,dt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Ad(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await Ut(e),dt(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const o=_n(i);e.skillsError=o,dt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function _d(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function ei(e){return e==="system"?_d():e}const Xt=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Td=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Zt=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Ed=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const o=i.documentElement,r=i,c=Td();if(!!r.startViewTransition&&!c){let f=.5,l=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")f=Xt(n.pointerClientX/window.innerWidth),l=Xt(n.pointerClientY/window.innerHeight);else if(n?.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(f=Xt((p.left+p.width/2)/window.innerWidth),l=Xt((p.top+p.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${f*100}%`),o.style.setProperty("--theme-switch-y",`${l*100}%`),o.classList.add("theme-transition");try{const p=r.startViewTransition?.(()=>{t()});p?.finished?p.finished.finally(()=>Zt(o)):Zt(o)}catch{Zt(o),t()}return}t(),Zt(o)};function Cd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{An(e,{quiet:!0})},5e3))}function Id(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function ti(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&qs(e,{quiet:!0})},2e3))}function ni(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function si(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Sn(e)},3e3))}function ii(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}function Ce(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,zl(n),t.theme!==e.theme&&(e.theme=t.theme,Tn(e,ei(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function Gr(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Ce(e,{...e.settings,lastActiveSessionKey:n})}function Rd(e){if(!window.location.search)return;const t=new URLSearchParams(window.location.search),n=t.get("token"),s=t.get("password"),i=t.get("session"),o=t.get("gatewayUrl");let r=!1;if(n!=null){const a=n.trim();a&&a!==e.settings.token&&Ce(e,{...e.settings,token:a}),t.delete("token"),r=!0}if(s!=null){const a=s.trim();a&&(e.password=a),t.delete("password"),r=!0}if(i!=null){const a=i.trim();a&&(e.sessionKey=a,Ce(e,{...e.settings,sessionKey:a,lastActiveSessionKey:a}))}if(o!=null){const a=o.trim();a&&a!==e.settings.gatewayUrl&&Ce(e,{...e.settings,gatewayUrl:a}),t.delete("gatewayUrl"),r=!0}if(!r)return;const c=new URL(window.location.href);c.search=t.toString(),window.history.replaceState({},"",c.toString())}function Ld(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ti(e):ni(e),t==="debug"?si(e):ii(e),oi(e),Qr(e,t,!1)}function Md(e,t,n){Ed({nextTheme:t,applyTheme:()=>{e.theme=t,Ce(e,{...e.settings,theme:t}),Tn(e,ei(t))},context:n,currentTheme:e.theme})}async function oi(e){e.tab==="overview"&&await Jr(e),e.tab==="channels"&&await Kd(e),e.tab==="instances"&&await Zs(e),e.tab==="sessions"&&await pt(e),e.tab==="cron"&&await ri(e),e.tab==="skills"&&await Ut(e),e.tab==="nodes"&&(await An(e),await Me(e),await we(e),await Xs(e)),e.tab==="chat"&&(await Vd(e),$n(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Er(e),await we(e)),e.tab==="debug"&&(await Sn(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await qs(e,{reset:!0}),Ar(e,!0))}function Pd(){if(typeof window>"u")return"";const e=window.__CLAWDBOT_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?bn(e):jl(window.location.pathname)}function Nd(e){e.theme=e.settings.theme??"system",Tn(e,ei(e.theme))}function Tn(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Od(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&Tn(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Dd(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Fd(e,t){if(typeof window>"u")return;const n=kr(window.location.pathname,e.basePath)??"chat";Yr(e,n),Qr(e,n,t)}function Bd(e){if(typeof window>"u")return;const t=kr(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,Ce(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),Yr(e,t)}function Yr(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ti(e):ni(e),t==="debug"?si(e):ii(e),e.connected&&oi(e)}function Qr(e,t,n){if(typeof window>"u")return;const s=Nt(zs(t,e.basePath)),i=Nt(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),i!==s&&(o.pathname=s),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Ud(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function Jr(e){await Promise.all([de(e,!1),Zs(e),pt(e),Bt(e),Sn(e)])}async function Kd(e){await Promise.all([de(e,!0),Er(e),we(e)])}async function ri(e){await Promise.all([de(e,!1),Bt(e),kn(e)])}function Xr(e){return e.chatSending||!!e.chatRunId}function zd(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}async function Zr(e){e.connected&&(e.chatMessage="",await tc(e))}function Hd(e,t){const n=t.trim();n&&(e.chatQueue=[...e.chatQueue,{id:Hs(),text:n,createdAt:Date.now()}])}async function ea(e,t,n){js(e);const s=await ec(e,t);return!s&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),s&&Gr(e,e.sessionKey),s&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),$n(e),s&&!e.chatRunId&&ta(e),s}async function ta(e){if(!e.connected||Xr(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await ea(e,t.text)||(e.chatQueue=[t,...e.chatQueue])}function jd(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function qd(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim();if(i){if(zd(i)){await Zr(e);return}if(t==null&&(e.chatMessage=""),Xr(e)){Hd(e,i);return}await ea(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft)})}}async function Vd(e){await Promise.all([lt(e),pt(e),xs(e)]),$n(e,!0)}const Wd=ta;function Gd(e){const t=br(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function Yd(e,t){const n=bn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function xs(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Gd(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Yd(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),o=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const na={CHILD:2},sa=e=>(...t)=>({_$litDirective$:e,values:t});let ia=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:Qd}=Rl,yo=e=>e,bo=()=>document.createComment(""),$t=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const o=s.insertBefore(bo(),i),r=s.insertBefore(bo(),i);n=new Qd(o,r,e,e.options)}else{const o=n._$AB.nextSibling,r=n._$AM,c=r!==e;if(c){let a;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(a=e._$AU)!==r._$AU&&n._$AP(a)}if(o!==i||c){let a=n._$AA;for(;a!==o;){const f=yo(a).nextSibling;yo(s).insertBefore(a,i),a=f}}}return n},Fe=(e,t,n=e)=>(e._$AI(t,n),e),Jd={},Xd=(e,t=Jd)=>e._$AH=t,Zd=e=>e._$AH,is=e=>{e._$AR(),e._$AA.remove()};const wo=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},oa=sa(class extends ia{constructor(e){if(super(e),e.type!==na.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],o=[];let r=0;for(const c of e)i[r]=s?s(c,r):r,o[r]=n(c,r),r++;return{values:o,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=Zd(e),{values:o,keys:r}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=r,o;const c=this.ut??=[],a=[];let f,l,p=0,h=i.length-1,v=0,w=o.length-1;for(;p<=h&&v<=w;)if(i[p]===null)p++;else if(i[h]===null)h--;else if(c[p]===r[v])a[v]=Fe(i[p],o[v]),p++,v++;else if(c[h]===r[w])a[w]=Fe(i[h],o[w]),h--,w--;else if(c[p]===r[w])a[w]=Fe(i[p],o[w]),$t(e,a[w+1],i[p]),p++,w--;else if(c[h]===r[v])a[v]=Fe(i[h],o[v]),$t(e,i[p],i[h]),h--,v++;else if(f===void 0&&(f=wo(r,v,w),l=wo(c,p,h)),f.has(c[p]))if(f.has(c[h])){const k=l.get(r[v]),S=k!==void 0?i[k]:null;if(S===null){const C=$t(e,i[p]);Fe(C,o[v]),a[v]=C}else a[v]=Fe(S,o[v]),$t(e,i[p],S),i[k]=null;v++}else is(i[h]),h--;else is(i[p]),p++;for(;v<=w;){const k=$t(e,a[w+1]);Fe(k,o[v]),a[v++]=k}for(;p<=h;){const k=i[p++];k!==null&&is(k)}return this.ut=r,Xd(e,a),Re}});function ra(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,o=Array.isArray(i)?i:null,r=Array.isArray(o)&&o.some(h=>{const v=h;return String(v.type??"").toLowerCase()==="text"&&typeof v.text=="string"&&v.text.trim().length>0}),c=Array.isArray(o)&&o.some(h=>{const v=h,w=String(v.type??"").toLowerCase();return w==="toolcall"||w==="tool_call"||w==="tooluse"||w==="tool_use"||w==="toolresult"||w==="tool_result"||w==="tool_call"||w==="tool_result"||typeof v.name=="string"&&v.arguments!=null}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||a||c&&!r)&&(n="toolResult");let f=[];typeof t.content=="string"?f=[{type:"text",text:t.content}]:Array.isArray(t.content)?f=t.content.map(h=>({type:h.type||"text",text:h.text,name:h.name,args:h.args||h.arguments})):typeof t.text=="string"&&(f=[{type:"text",text:t.text}]);const l=typeof t.timestamp=="number"?t.timestamp:Date.now(),p=typeof t.id=="string"?t.id:void 0;return{role:n,content:f,timestamp:l,id:p}}function ai(e){const t=e.toLowerCase();return t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"||t==="toolresult"?"tool":t==="assistant"?"assistant":t==="user"?"user":t==="system"?"system":e}function aa(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}class As extends ia{constructor(t){if(super(t),this.it=g,t.type!==na.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===g||t==null)return this._t=void 0,this.it=t;if(t===Re)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}As.directiveName="unsafeHTML",As.resultType=1;const _s=sa(As);function $o(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,s=Array(t);n<t;n++)s[n]=e[n];return s}function eu(e){if(Array.isArray(e))return e}function tu(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var s,i,o,r,c=[],a=!0,f=!1;try{if(o=(n=n.call(e)).next,t!==0)for(;!(a=(s=o.call(n)).done)&&(c.push(s.value),c.length!==t);a=!0);}catch(l){f=!0,i=l}finally{try{if(!a&&n.return!=null&&(r=n.return(),Object(r)!==r))return}finally{if(f)throw i}}return c}}function nu(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function su(e,t){return eu(e)||tu(e,t)||iu(e,t)||nu()}function iu(e,t){if(e){if(typeof e=="string")return $o(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$o(e,t):void 0}}const la=Object.entries,ko=Object.setPrototypeOf,ou=Object.isFrozen,ru=Object.getPrototypeOf,au=Object.getOwnPropertyDescriptor;let J=Object.freeze,X=Object.seal,it=Object.create,ca=typeof Reflect<"u"&&Reflect,Ts=ca.apply,Es=ca.construct;J||(J=function(t){return t});X||(X=function(t){return t});Ts||(Ts=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),o=2;o<s;o++)i[o-2]=arguments[o];return t.apply(n,i)});Es||(Es=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const kt=V(Array.prototype.forEach),lu=V(Array.prototype.lastIndexOf),So=V(Array.prototype.pop),nt=V(Array.prototype.push),cu=V(Array.prototype.splice),Ee=Array.isArray,Tt=V(String.prototype.toLowerCase),os=V(String.prototype.toString),xo=V(String.prototype.match),St=V(String.prototype.replace),Ao=V(String.prototype.indexOf),du=V(String.prototype.trim),uu=V(Number.prototype.toString),pu=V(Boolean.prototype.toString),_o=typeof BigInt>"u"?null:V(BigInt.prototype.toString),To=typeof Symbol>"u"?null:V(Symbol.prototype.toString),G=V(Object.prototype.hasOwnProperty),xt=V(Object.prototype.toString),Q=V(RegExp.prototype.test),Be=fu(TypeError);function V(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Ts(e,t,s)}}function fu(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Es(e,n)}}function P(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Tt;if(ko&&ko(e,null),!Ee(t))return e;let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const o=n(i);o!==i&&(ou(t)||(t[s]=o),i=o)}e[i]=!0}return e}function hu(e){for(let t=0;t<e.length;t++)G(e,t)||(e[t]=null);return e}function ne(e){const t=it(null);for(const s of la(e)){var n=su(s,2);const i=n[0],o=n[1];G(e,i)&&(Ee(o)?t[i]=hu(o):o&&typeof o=="object"&&o.constructor===Object?t[i]=ne(o):t[i]=o)}return t}function gu(e){switch(typeof e){case"string":return e;case"number":return uu(e);case"boolean":return pu(e);case"bigint":return _o?_o(e):"0";case"symbol":return To?To(e):"Symbol()";case"undefined":return xt(e);case"function":case"object":{if(e===null)return xt(e);const t=e,n=ge(t,"toString");if(typeof n=="function"){const s=n(t);return typeof s=="string"?s:xt(s)}return xt(e)}default:return xt(e)}}function ge(e,t){for(;e!==null;){const s=au(e,t);if(s){if(s.get)return V(s.get);if(typeof s.value=="function")return V(s.value)}e=ru(e)}function n(){return null}return n}function mu(e){try{return Q(e,""),!0}catch{return!1}}const Eo=J(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),rs=J(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),as=J(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),vu=J(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ls=J(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),yu=J(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Co=J(["#text"]),Io=J(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),cs=J(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ro=J(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),en=J(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),bu=X(/{{[\w\W]*|^[\w\W]*}}/g),wu=X(/<%[\w\W]*|^[\w\W]*%>/g),$u=X(/\${[\w\W]*/g),ku=X(/^data-[\-\w.\u00B7-\uFFFF]+$/),Su=X(/^aria-[\-\w]+$/),Lo=X(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xu=X(/^(?:\w+script|data):/i),Au=X(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_u=X(/^html$/i),Tu=X(/^[a-z][.\w]*(-[.\w]+)+$/i),Mo=X(/<[/\w!]/g),Eu=X(/<[/\w]/g),Cu=X(/<\/no(script|embed|frames)/i),Iu=X(/\/>/i),he={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ru=function(){return typeof window>"u"?null:window},Lu=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const o="dompurify"+(s?"#"+s:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Po=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},_e=function(t,n,s,i){return G(t,n)&&Ee(t[n])?P(i.base?ne(i.base):{},t[n],i.transform):s};function da(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ru();const t=A=>da(A);if(t.version="3.4.11",t.removed=[],!e||!e.document||e.document.nodeType!==he.document||!e.Element)return t.isSupported=!1,t;let n=e.document;const s=n,i=s.currentScript;e.DocumentFragment;const o=e.HTMLTemplateElement,r=e.Node,c=e.Element,a=e.NodeFilter,f=e.NamedNodeMap;f===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const l=e.DOMParser,p=e.trustedTypes,h=c.prototype,v=ge(h,"cloneNode"),w=ge(h,"remove"),k=ge(h,"nextSibling"),S=ge(h,"childNodes"),C=ge(h,"parentNode"),I=ge(h,"shadowRoot"),O=ge(h,"attributes"),R=r&&r.prototype?ge(r.prototype,"nodeType"):null,_=r&&r.prototype?ge(r.prototype,"nodeName"):null;if(typeof o=="function"){const A=n.createElement("template");A.content&&A.content.ownerDocument&&(n=A.content.ownerDocument)}let M,ee="",ht,zt=!1,gt=0;const bi=function(){if(gt>0)throw Be('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Qe=function(u){bi(),gt++;try{return M.createHTML(u)}finally{gt--}},Da=function(u){bi(),gt++;try{return M.createScriptURL(u)}finally{gt--}},Fa=function(){return zt||(ht=Lu(p,i),zt=!0),ht},Ht=n,Ln=Ht.implementation,wi=Ht.createNodeIterator,Ba=Ht.createDocumentFragment,Ua=Ht.getElementsByTagName,Ka=s.importNode;let j=Po();t.isSupported=typeof la=="function"&&typeof C=="function"&&Ln&&Ln.createHTMLDocument!==void 0;const za=bu,Ha=wu,ja=$u,qa=ku,Va=Su,Wa=xu,$i=Au,Ga=Tu;let ki=Lo,U=null;const Si=P({},[...Eo,...rs,...as,...ls,...Co]);let K=null;const xi=P({},[...Io,...cs,...Ro,...en]);let z=Object.seal(it(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),mt=null,Ai=null;const Se=Object.seal(it(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let _i=!0,Mn=!0,Ti=!1,Ei=!0,xe=!1,vt=!0,Ne=!1,Pn=!1,Nn=null,On=null,Dn=!1,Je=!1,jt=!1,qt=!1,Ci=!0,Ii=!1;const Ri="user-content-";let Fn=!0,Bn=!1,Xe={},ue=null;const Un=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Li=null;const Mi=P({},["audio","video","img","source","image","track"]);let Kn=null;const Pi=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vt="http://www.w3.org/1998/Math/MathML",Wt="http://www.w3.org/2000/svg",pe="http://www.w3.org/1999/xhtml";let Ze=pe,zn=!1,Hn=null;const Ya=P({},[Vt,Wt,pe],os),Ni=J(["mi","mo","mn","ms","mtext"]);let jn=P({},Ni);const Oi=J(["annotation-xml"]);let qn=P({},Oi);const Qa=P({},["title","style","font","a","script"]);let yt=null;const Ja=["application/xhtml+xml","text/html"],Xa="text/html";let H=null,et=null;const Za=n.createElement("form"),Di=function(u){return u instanceof RegExp||u instanceof Function},Vn=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(et&&et===u)return;(!u||typeof u!="object")&&(u={}),u=ne(u),yt=Ja.indexOf(u.PARSER_MEDIA_TYPE)===-1?Xa:u.PARSER_MEDIA_TYPE,H=yt==="application/xhtml+xml"?os:Tt,U=_e(u,"ALLOWED_TAGS",Si,{transform:H}),K=_e(u,"ALLOWED_ATTR",xi,{transform:H}),Hn=_e(u,"ALLOWED_NAMESPACES",Ya,{transform:os}),Kn=_e(u,"ADD_URI_SAFE_ATTR",Pi,{transform:H,base:Pi}),Li=_e(u,"ADD_DATA_URI_TAGS",Mi,{transform:H,base:Mi}),ue=_e(u,"FORBID_CONTENTS",Un,{transform:H}),mt=_e(u,"FORBID_TAGS",ne({}),{transform:H}),Ai=_e(u,"FORBID_ATTR",ne({}),{transform:H}),Xe=G(u,"USE_PROFILES")?u.USE_PROFILES&&typeof u.USE_PROFILES=="object"?ne(u.USE_PROFILES):u.USE_PROFILES:!1,_i=u.ALLOW_ARIA_ATTR!==!1,Mn=u.ALLOW_DATA_ATTR!==!1,Ti=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Ei=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=u.SAFE_FOR_TEMPLATES||!1,vt=u.SAFE_FOR_XML!==!1,Ne=u.WHOLE_DOCUMENT||!1,Je=u.RETURN_DOM||!1,jt=u.RETURN_DOM_FRAGMENT||!1,qt=u.RETURN_TRUSTED_TYPE||!1,Dn=u.FORCE_BODY||!1,Ci=u.SANITIZE_DOM!==!1,Ii=u.SANITIZE_NAMED_PROPS||!1,Fn=u.KEEP_CONTENT!==!1,Bn=u.IN_PLACE||!1,ki=mu(u.ALLOWED_URI_REGEXP)?u.ALLOWED_URI_REGEXP:Lo,Ze=typeof u.NAMESPACE=="string"?u.NAMESPACE:pe,jn=G(u,"MATHML_TEXT_INTEGRATION_POINTS")&&u.MATHML_TEXT_INTEGRATION_POINTS&&typeof u.MATHML_TEXT_INTEGRATION_POINTS=="object"?ne(u.MATHML_TEXT_INTEGRATION_POINTS):P({},Ni),qn=G(u,"HTML_INTEGRATION_POINTS")&&u.HTML_INTEGRATION_POINTS&&typeof u.HTML_INTEGRATION_POINTS=="object"?ne(u.HTML_INTEGRATION_POINTS):P({},Oi);const m=G(u,"CUSTOM_ELEMENT_HANDLING")&&u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING=="object"?ne(u.CUSTOM_ELEMENT_HANDLING):it(null);if(z=it(null),G(m,"tagNameCheck")&&Di(m.tagNameCheck)&&(z.tagNameCheck=m.tagNameCheck),G(m,"attributeNameCheck")&&Di(m.attributeNameCheck)&&(z.attributeNameCheck=m.attributeNameCheck),G(m,"allowCustomizedBuiltInElements")&&typeof m.allowCustomizedBuiltInElements=="boolean"&&(z.allowCustomizedBuiltInElements=m.allowCustomizedBuiltInElements),X(z),xe&&(Mn=!1),jt&&(Je=!0),Xe&&(U=P({},Co),K=it(null),Xe.html===!0&&(P(U,Eo),P(K,Io)),Xe.svg===!0&&(P(U,rs),P(K,cs),P(K,en)),Xe.svgFilters===!0&&(P(U,as),P(K,cs),P(K,en)),Xe.mathMl===!0&&(P(U,ls),P(K,Ro),P(K,en))),Se.tagCheck=null,Se.attributeCheck=null,G(u,"ADD_TAGS")&&(typeof u.ADD_TAGS=="function"?Se.tagCheck=u.ADD_TAGS:Ee(u.ADD_TAGS)&&(U===Si&&(U=ne(U)),P(U,u.ADD_TAGS,H))),G(u,"ADD_ATTR")&&(typeof u.ADD_ATTR=="function"?Se.attributeCheck=u.ADD_ATTR:Ee(u.ADD_ATTR)&&(K===xi&&(K=ne(K)),P(K,u.ADD_ATTR,H))),G(u,"ADD_URI_SAFE_ATTR")&&Ee(u.ADD_URI_SAFE_ATTR)&&P(Kn,u.ADD_URI_SAFE_ATTR,H),G(u,"FORBID_CONTENTS")&&Ee(u.FORBID_CONTENTS)&&(ue===Un&&(ue=ne(ue)),P(ue,u.FORBID_CONTENTS,H)),G(u,"ADD_FORBID_CONTENTS")&&Ee(u.ADD_FORBID_CONTENTS)&&(ue===Un&&(ue=ne(ue)),P(ue,u.ADD_FORBID_CONTENTS,H)),Fn&&(U["#text"]=!0),Ne&&P(U,["html","head","body"]),U.table&&(P(U,["tbody"]),delete mt.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const x=M;M=u.TRUSTED_TYPES_POLICY;try{ee=Qe("")}catch(E){throw M=x,E}}else u.TRUSTED_TYPES_POLICY===null?(M=void 0,ee=""):(M===void 0&&(M=Fa()),M&&typeof ee=="string"&&(ee=Qe("")));J&&J(u),et=u},Fi=P({},[...rs,...as,...vu]),Bi=P({},[...ls,...yu]),el=function(u,m,x){return m.namespaceURI===pe?u==="svg":m.namespaceURI===Vt?u==="svg"&&(x==="annotation-xml"||jn[x]):!!Fi[u]},tl=function(u,m,x){return m.namespaceURI===pe?u==="math":m.namespaceURI===Wt?u==="math"&&qn[x]:!!Bi[u]},nl=function(u,m,x){return m.namespaceURI===Wt&&!qn[x]||m.namespaceURI===Vt&&!jn[x]?!1:!Bi[u]&&(Qa[u]||!Fi[u])},sl=function(u){let m=C(u);(!m||!m.tagName)&&(m={namespaceURI:Ze,tagName:"template"});const x=Tt(u.tagName),E=Tt(m.tagName);return Hn[u.namespaceURI]?u.namespaceURI===Wt?el(x,m,E):u.namespaceURI===Vt?tl(x,m,E):u.namespaceURI===pe?nl(x,m,E):!!(yt==="application/xhtml+xml"&&Hn[u.namespaceURI]):!1},Ae=function(u){nt(t.removed,{element:u});try{C(u).removeChild(u)}catch{if(w(u),!C(u))throw Be("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ui=function(u){const m=S(u);if(m){const E=[];kt(m,L=>{nt(E,L)}),kt(E,L=>{try{w(L)}catch{}})}const x=O(u);if(x)for(let E=x.length-1;E>=0;--E){const L=x[E],D=L&&L.name;if(typeof D=="string")try{u.removeAttribute(D)}catch{}}},Oe=function(u,m){try{nt(t.removed,{attribute:m.getAttributeNode(u),from:m})}catch{nt(t.removed,{attribute:null,from:m})}if(m.removeAttribute(u),u==="is")if(Je||jt)try{Ae(m)}catch{}else try{m.setAttribute(u,"")}catch{}},il=function(u){const m=O(u);if(m)for(let x=m.length-1;x>=0;--x){const E=m[x],L=E&&E.name;if(!(typeof L!="string"||K[H(L)]))try{u.removeAttribute(L)}catch{}}},ol=function(u){const m=[u];for(;m.length>0;){const x=m.pop();(R?R(x):x.nodeType)===he.element&&il(x);const L=S(x);if(L)for(let D=L.length-1;D>=0;--D)m.push(L[D])}},Ki=function(u){let m=null,x=null;if(Dn)u="<remove></remove>"+u;else{const D=xo(u,/^[\r\n\t ]+/);x=D&&D[0]}yt==="application/xhtml+xml"&&Ze===pe&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const E=M?Qe(u):u;if(Ze===pe)try{m=new l().parseFromString(E,yt)}catch{}if(!m||!m.documentElement){m=Ln.createDocument(Ze,"template",null);try{m.documentElement.innerHTML=zn?ee:E}catch{}}const L=m.body||m.documentElement;return u&&x&&L.insertBefore(n.createTextNode(x),L.childNodes[0]||null),Ze===pe?Ua.call(m,Ne?"html":"body")[0]:Ne?m.documentElement:L},zi=function(u){return wi.call(u.ownerDocument||u,u,a.SHOW_ELEMENT|a.SHOW_COMMENT|a.SHOW_TEXT|a.SHOW_PROCESSING_INSTRUCTION|a.SHOW_CDATA_SECTION,null)},Gt=function(u){return u=St(u,za," "),u=St(u,Ha," "),u=St(u,ja," "),u},Wn=function(u){var m;u.normalize();const x=wi.call(u.ownerDocument||u,u,a.SHOW_TEXT|a.SHOW_COMMENT|a.SHOW_CDATA_SECTION|a.SHOW_PROCESSING_INSTRUCTION,null);let E=x.nextNode();for(;E;)E.data=Gt(E.data),E=x.nextNode();const L=(m=u.querySelectorAll)===null||m===void 0?void 0:m.call(u,"template");L&&kt(L,D=>{tt(D.content)&&Wn(D.content)})},Yt=function(u){const m=_?_(u):null;return typeof m!="string"||H(m)!=="form"?!1:typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||u.attributes!==O(u)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function"||u.nodeType!==R(u)||u.childNodes!==S(u)},tt=function(u){if(!R||typeof u!="object"||u===null)return!1;try{return R(u)===he.documentFragment}catch{return!1}},bt=function(u){if(!R||typeof u!="object"||u===null)return!1;try{return typeof R(u)=="number"}catch{return!1}};function ye(A,u,m){A.length!==0&&kt(A,x=>{x.call(t,u,m,et)})}const rl=function(u,m){return!!(vt&&u.hasChildNodes()&&!bt(u.firstElementChild)&&Q(Mo,u.textContent)&&Q(Mo,u.innerHTML)||vt&&u.namespaceURI===pe&&m==="style"&&bt(u.firstElementChild)||u.nodeType===he.processingInstruction||vt&&u.nodeType===he.comment&&Q(Eu,u.data))},al=function(u,m){if(!mt[m]&&qi(m)&&(z.tagNameCheck instanceof RegExp&&Q(z.tagNameCheck,m)||z.tagNameCheck instanceof Function&&z.tagNameCheck(m)))return!1;if(Fn&&!ue[m]){const x=C(u),E=S(u);if(E&&x){const L=E.length;for(let D=L-1;D>=0;--D){const W=Bn?E[D]:v(E[D],!0);x.insertBefore(W,k(u))}}}return Ae(u),!0},Hi=function(u){if(ye(j.beforeSanitizeElements,u,null),Yt(u))return Ae(u),!0;const m=H(_?_(u):u.nodeName);if(ye(j.uponSanitizeElement,u,{tagName:m,allowedTags:U}),rl(u,m))return Ae(u),!0;if(mt[m]||!(Se.tagCheck instanceof Function&&Se.tagCheck(m))&&!U[m])return al(u,m);if((R?R(u):u.nodeType)===he.element&&!sl(u)||(m==="noscript"||m==="noembed"||m==="noframes")&&Q(Cu,u.innerHTML))return Ae(u),!0;if(xe&&u.nodeType===he.text){const E=Gt(u.textContent);u.textContent!==E&&(nt(t.removed,{element:u.cloneNode()}),u.textContent=E)}return ye(j.afterSanitizeElements,u,null),!1},ji=function(u,m,x){if(Ai[m]||Ci&&(m==="id"||m==="name")&&(x in n||x in Za))return!1;const E=K[m]||Se.attributeCheck instanceof Function&&Se.attributeCheck(m,u);if(!(Mn&&Q(qa,m))){if(!(_i&&Q(Va,m))){if(E){if(!Kn[m]){if(!Q(ki,St(x,$i,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&u!=="script"&&Ao(x,"data:")===0&&Li[u])){if(!(Ti&&!Q(Wa,St(x,$i,"")))){if(x)return!1}}}}}else if(!(qi(u)&&(z.tagNameCheck instanceof RegExp&&Q(z.tagNameCheck,u)||z.tagNameCheck instanceof Function&&z.tagNameCheck(u))&&(z.attributeNameCheck instanceof RegExp&&Q(z.attributeNameCheck,m)||z.attributeNameCheck instanceof Function&&z.attributeNameCheck(m,u))||m==="is"&&z.allowCustomizedBuiltInElements&&(z.tagNameCheck instanceof RegExp&&Q(z.tagNameCheck,x)||z.tagNameCheck instanceof Function&&z.tagNameCheck(x))))return!1}}return!0},ll=P({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),qi=function(u){return!ll[Tt(u)]&&Q(Ga,u)},cl=function(u,m,x,E){if(M&&typeof p=="object"&&typeof p.getAttributeType=="function"&&!x)switch(p.getAttributeType(u,m)){case"TrustedHTML":return Qe(E);case"TrustedScriptURL":return Da(E)}return E},dl=function(u,m,x,E){try{x?u.setAttributeNS(x,m,E):u.setAttribute(m,E),Yt(u)?Ae(u):So(t.removed)}catch{Oe(m,u)}},Vi=function(u){ye(j.beforeSanitizeAttributes,u,null);const m=u.attributes;if(!m||Yt(u))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0};let E=m.length;const L=H(u.nodeName);for(;E--;){const D=m[E],W=D.name,q=D.namespaceURI,ie=D.value,ae=H(W),Yn=ie;let te=W==="value"?Yn:du(Yn);if(x.attrName=ae,x.attrValue=te,x.keepAttr=!0,x.forceKeepAttr=void 0,ye(j.uponSanitizeAttribute,u,x),te=x.attrValue,Ii&&(ae==="id"||ae==="name")&&Ao(te,Ri)!==0&&(Oe(W,u),te=Ri+te),vt&&Q(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,te)){Oe(W,u);continue}if(ae==="attributename"&&xo(te,"href")){Oe(W,u);continue}if(!x.forceKeepAttr){if(!x.keepAttr){Oe(W,u);continue}if(!Ei&&Q(Iu,te)){Oe(W,u);continue}if(xe&&(te=Gt(te)),!ji(L,ae,te)){Oe(W,u);continue}te=cl(L,ae,q,te),te!==Yn&&dl(u,W,q,te)}}ye(j.afterSanitizeAttributes,u,null)},Qt=function(u){let m=null;const x=zi(u);for(ye(j.beforeSanitizeShadowDOM,u,null);m=x.nextNode();)if(ye(j.uponSanitizeShadowNode,m,null),Hi(m),Vi(m),tt(m.content)&&Qt(m.content),(R?R(m):m.nodeType)===he.element){const L=I(m);tt(L)&&(Gn(L),Qt(L))}ye(j.afterSanitizeShadowDOM,u,null)},Gn=function(u){const m=[{node:u,shadow:null}];for(;m.length>0;){const x=m.pop();if(x.shadow){Qt(x.shadow);continue}const E=x.node,D=(R?R(E):E.nodeType)===he.element,W=S(E);if(W)for(let q=W.length-1;q>=0;--q)m.push({node:W[q],shadow:null});if(D){const q=_?_(E):null;if(typeof q=="string"&&H(q)==="template"){const ie=E.content;tt(ie)&&m.push({node:ie,shadow:null})}}if(D){const q=I(E);tt(q)&&m.push({node:null,shadow:q},{node:q,shadow:null})}}};return t.sanitize=function(A){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,x=null,E=null,L=null;if(zn=!A,zn&&(A="<!-->"),typeof A!="string"&&!bt(A)&&(A=gu(A),typeof A!="string"))throw Be("dirty is not a string, aborting");if(!t.isSupported)return A;Pn?(U=Nn,K=On):Vn(u),(j.uponSanitizeElement.length>0||j.uponSanitizeAttribute.length>0)&&(U=ne(U)),j.uponSanitizeAttribute.length>0&&(K=ne(K)),t.removed=[];const D=Bn&&typeof A!="string"&&bt(A);if(D){const ie=_?_(A):A.nodeName;if(typeof ie=="string"){const ae=H(ie);if(!U[ae]||mt[ae])throw Be("root node is forbidden and cannot be sanitized in-place")}if(Yt(A))throw Be("root node is clobbered and cannot be sanitized in-place");try{Gn(A)}catch(ae){throw Ui(A),ae}}else if(bt(A))m=Ki("<!---->"),x=m.ownerDocument.importNode(A,!0),x.nodeType===he.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?m=x:m.appendChild(x),Gn(x);else{if(!Je&&!xe&&!Ne&&A.indexOf("<")===-1)return M&&qt?Qe(A):A;if(m=Ki(A),!m)return Je?null:qt?ee:""}m&&Dn&&Ae(m.firstChild);const W=zi(D?A:m);try{for(;E=W.nextNode();)Hi(E),Vi(E),tt(E.content)&&Qt(E.content)}catch(ie){throw D&&Ui(A),ie}if(D)return kt(t.removed,ie=>{ie.element&&ol(ie.element)}),xe&&Wn(A),A;if(Je){if(xe&&Wn(m),jt)for(L=Ba.call(m.ownerDocument);m.firstChild;)L.appendChild(m.firstChild);else L=m;return(K.shadowroot||K.shadowrootmode)&&(L=Ka.call(s,L,!0)),L}let q=Ne?m.outerHTML:m.innerHTML;return Ne&&U["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Q(_u,m.ownerDocument.doctype.name)&&(q="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+q),xe&&(q=Gt(q)),M&&qt?Qe(q):q},t.setConfig=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Vn(A),Pn=!0,Nn=U,On=K},t.clearConfig=function(){et=null,Pn=!1,Nn=null,On=null,M=ht,ee=""},t.isValidAttribute=function(A,u,m){et||Vn({});const x=H(A),E=H(u);return ji(x,E,m)},t.addHook=function(A,u){typeof u=="function"&&G(j,A)&&nt(j[A],u)},t.removeHook=function(A,u){if(G(j,A)){if(u!==void 0){const m=lu(j[A],u);return m===-1?void 0:cu(j[A],m,1)[0]}return So(j[A])}},t.removeHooks=function(A){G(j,A)&&(j[A]=[])},t.removeAllHooks=function(){j=Po()},t}var Cs=da();function li(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ye=li();function ua(e){Ye=e}var ze={exec:()=>null};function N(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(se.caret,"$1"),n=n.replace(i,r),s},getRegex:()=>new RegExp(n,t)};return s}var Mu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),se={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},Pu=/^(?:[ \t]*(?:\n|$))+/,Nu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ou=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Du=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ci=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,pa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fa=N(pa).replace(/bull/g,ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fu=N(pa).replace(/bull/g,ci).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),di=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Bu=/^[^\n]+/,ui=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Uu=N(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ui).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ku=N(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ci).getRegex(),En="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",pi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zu=N("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",pi).replace("tag",En).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ha=N(di).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex(),Hu=N(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ha).getRegex(),fi={blockquote:Hu,code:Nu,def:Uu,fences:Ou,heading:Du,hr:Kt,html:zu,lheading:fa,list:Ku,newline:Pu,paragraph:ha,table:ze,text:Bu},No=N("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex(),ju={...fi,lheading:Fu,table:No,paragraph:N(di).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",No).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",En).getRegex()},qu={...fi,html:N(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",pi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ze,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:N(di).replace("hr",Kt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ga=/^( {2,}|\\)\n(?!\s*$)/,Gu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ft=/[\p{P}\p{S}]/u,Cn=/[\s\p{P}\p{S}]/u,hi=/[^\s\p{P}\p{S}]/u,Yu=N(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Cn).getRegex(),ma=/(?!~)[\p{P}\p{S}]/u,Qu=/(?!~)[\s\p{P}\p{S}]/u,Ju=/(?:[^\s\p{P}\p{S}]|~)/u,Xu=N(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),va=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Zu=N(va,"u").replace(/punct/g,ft).getRegex(),ep=N(va,"u").replace(/punct/g,ma).getRegex(),ya="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tp=N(ya,"gu").replace(/notPunctSpace/g,hi).replace(/punctSpace/g,Cn).replace(/punct/g,ft).getRegex(),np=N(ya,"gu").replace(/notPunctSpace/g,Ju).replace(/punctSpace/g,Qu).replace(/punct/g,ma).getRegex(),sp=N("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hi).replace(/punctSpace/g,Cn).replace(/punct/g,ft).getRegex(),ip=N(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,ft).getRegex(),op="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",rp=N(op,"gu").replace(/notPunctSpace/g,hi).replace(/punctSpace/g,Cn).replace(/punct/g,ft).getRegex(),ap=N(/\\(punct)/,"gu").replace(/punct/g,ft).getRegex(),lp=N(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),cp=N(pi).replace("(?:-->|$)","-->").getRegex(),dp=N("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",cp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),pn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,up=N(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",pn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ba=N(/^!?\[(label)\]\[(ref)\]/).replace("label",pn).replace("ref",ui).getRegex(),wa=N(/^!?\[(ref)\](?:\[\])?/).replace("ref",ui).getRegex(),pp=N("reflink|nolink(?!\\()","g").replace("reflink",ba).replace("nolink",wa).getRegex(),Oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gi={_backpedal:ze,anyPunctuation:ap,autolink:lp,blockSkip:Xu,br:ga,code:Wu,del:ze,delLDelim:ze,delRDelim:ze,emStrongLDelim:Zu,emStrongRDelimAst:tp,emStrongRDelimUnd:sp,escape:Vu,link:up,nolink:wa,punctuation:Yu,reflink:ba,reflinkSearch:pp,tag:dp,text:Gu,url:ze},fp={...gi,link:N(/^!?\[(label)\]\((.*?)\)/).replace("label",pn).getRegex(),reflink:N(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",pn).getRegex()},Is={...gi,emStrongRDelimAst:np,emStrongLDelim:ep,delLDelim:ip,delRDelim:rp,url:N(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:N(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Oo).getRegex()},hp={...Is,br:N(ga).replace("{2,}","*").getRegex(),text:N(Is.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},tn={normal:fi,gfm:ju,pedantic:qu},At={normal:gi,gfm:Is,breaks:hp,pedantic:fp},gp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Do=e=>gp[e];function me(e,t){if(t){if(se.escapeTest.test(e))return e.replace(se.escapeReplace,Do)}else if(se.escapeTestNoEncode.test(e))return e.replace(se.escapeReplaceNoEncode,Do);return e}function Fo(e){try{e=encodeURI(e).replace(se.percentDecode,"%")}catch{return null}return e}function Bo(e,t){let n=e.replace(se.findPipe,(o,r,c)=>{let a=!1,f=r;for(;--f>=0&&c[f]==="\\";)a=!a;return a?"|":" |"}),s=n.split(se.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(se.slashPipe,"|");return s}function _t(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function mp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function vp(e,t=0){let n=t,s="";for(let i of e)if(i==="	"){let o=4-n%4;s+=" ".repeat(o),n+=o}else s+=i,n++;return s}function Uo(e,t,n,s,i){let o=t.href,r=t.title||null,c=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,a}function yp(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[c]=r;return c.length>=i.length?o.slice(i.length):o}).join(`
`)}var fn=class{options;rules;lexer;constructor(e){this.options=e||Ye}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_t(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=yp(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=_t(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:_t(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=_t(t[0],`
`).split(`
`),s="",i="",o=[];for(;n.length>0;){let r=!1,c=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))c.push(n[a]),r=!0;else if(!r)c.push(n[a]);else break;n=n.slice(a);let f=c.join(`
`),l=f.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${f}`:f,i=i?`${i}
${l}`:l;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,o,!0),this.lexer.state.top=p,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let v=h,w=v.raw+`
`+n.join(`
`),k=this.blockquote(w);o[o.length-1]=k,s=s.substring(0,s.length-v.raw.length)+k.raw,i=i.substring(0,i.length-v.text.length)+k.text;break}else if(h?.type==="list"){let v=h,w=v.raw+`
`+n.join(`
`),k=this.list(w);o[o.length-1]=k,s=s.substring(0,s.length-h.raw.length)+k.raw,i=i.substring(0,i.length-v.raw.length)+k.raw,n=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let o=this.rules.other.listItemRegex(n),r=!1;for(;e;){let a=!1,f="",l="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;f=t[0],e=e.substring(f.length);let p=vp(t[2].split(`
`,1)[0],t[1].length),h=e.split(`
`,1)[0],v=!p.trim(),w=0;if(this.options.pedantic?(w=2,l=p.trimStart()):v?w=t[1].length+1:(w=p.search(this.rules.other.nonSpaceChar),w=w>4?1:w,l=p.slice(w),w+=t[1].length),v&&this.rules.other.blankLine.test(h)&&(f+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let k=this.rules.other.nextBulletRegex(w),S=this.rules.other.hrRegex(w),C=this.rules.other.fencesBeginRegex(w),I=this.rules.other.headingBeginRegex(w),O=this.rules.other.htmlBeginRegex(w),R=this.rules.other.blockquoteBeginRegex(w);for(;e;){let _=e.split(`
`,1)[0],M;if(h=_,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),M=h):M=h.replace(this.rules.other.tabCharGlobal,"    "),C.test(h)||I.test(h)||O.test(h)||R.test(h)||k.test(h)||S.test(h))break;if(M.search(this.rules.other.nonSpaceChar)>=w||!h.trim())l+=`
`+M.slice(w);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||C.test(p)||I.test(p)||S.test(p))break;l+=`
`+h}v=!h.trim(),f+=_+`
`,e=e.substring(_.length+1),p=M.slice(w)}}i.loose||(r?i.loose=!0:this.rules.other.doubleBlankLine.test(f)&&(r=!0)),i.items.push({type:"list_item",raw:f,task:!!this.options.gfm&&this.rules.other.listIsTask.test(l),loose:!1,text:l,tokens:[]}),i.raw+=f}let c=i.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let a of i.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let l=this.lexer.inlineQueue.length-1;l>=0;l--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[l].src)){this.lexer.inlineQueue[l].src=this.lexer.inlineQueue[l].src.replace(this.rules.other.listReplaceTask,"");break}}let f=this.rules.other.listTaskCheckbox.exec(a.raw);if(f){let l={type:"checkbox",raw:f[0]+" ",checked:f[0]!=="[ ]"};a.checked=l.checked,i.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=l.raw+a.tokens[0].raw,a.tokens[0].text=l.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(l)):a.tokens.unshift({type:"paragraph",raw:l.raw,text:l.raw,tokens:[l]}):a.tokens.unshift(l)}}if(!i.loose){let f=a.tokens.filter(p=>p.type==="space"),l=f.length>0&&f.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=l}}if(i.loose)for(let a of i.items){a.loose=!0;for(let f of a.tokens)f.type==="text"&&(f.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Bo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let r of s)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(let r of i)o.rows.push(Bo(r,o.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=_t(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=mp(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(s);o&&(s=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Uo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Uo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,o,r,c=i,a=0,f=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+i);(s=f.exec(t))!==null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&i%3&&!((i+r)%3)){a+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+a);let l=[...s[0]][0].length,p=e.slice(0,i+s.index+l+r);if(Math.min(i,r)%2){let v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let s=this.rules.inline.delLDelim.exec(e);if(s&&(!s[1]||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,o,r,c=i,a=this.rules.inline.delRDelim;for(a.lastIndex=0,t=t.slice(-1*e.length+i);(s=a.exec(t))!==null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o||(r=[...o].length,r!==i))continue;if(s[3]||s[4]){c+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c);let f=[...s[0]][0].length,l=e.slice(0,i+s.index+f+r),p=l.slice(i,-i);return{type:"del",raw:l,text:p,tokens:this.lexer.inlineTokens(p)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},le=class Rs{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ye,this.options.tokenizer=this.options.tokenizer||new fn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:se,block:tn.normal,inline:At.normal};this.options.pedantic?(n.block=tn.pedantic,n.inline=At.pedantic):this.options.gfm&&(n.block=tn.gfm,this.options.breaks?n.inline=At.breaks:n.inline=At.gfm),this.tokenizer.rules=n}static get rules(){return{block:tn,inline:At}}static lex(t,n){return new Rs(n).lex(t)}static lexInline(t,n){return new Rs(n).inlineTokens(t)}lex(t){t=t.replace(se.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(se.tabCharGlobal,"    ").replace(se.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(r=>(i=r.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let r=n.at(-1);i.raw.length===1&&r!==void 0?r.raw+=`
`:n.push(i);continue}if(i=this.tokenizer.code(t)){t=t.substring(i.raw.length);let r=n.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.at(-1).src=r.text):n.push(i);continue}if(i=this.tokenizer.fences(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.heading(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.hr(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.blockquote(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.list(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.html(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.def(t)){t=t.substring(i.raw.length);let r=n.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},n.push(i));continue}if(i=this.tokenizer.table(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.lheading(t)){t=t.substring(i.raw.length),n.push(i);continue}let o=t;if(this.options.extensions?.startBlock){let r=1/0,c=t.slice(1),a;this.options.extensions.startBlock.forEach(f=>{a=f.call({lexer:this},c),typeof a=="number"&&a>=0&&(r=Math.min(r,a))}),r<1/0&&r>=0&&(o=t.substring(0,r+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){let r=n.at(-1);s&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):n.push(i),s=o.length!==t.length,t=t.substring(i.raw.length);continue}if(i=this.tokenizer.text(t)){t=t.substring(i.raw.length);let r=n.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):n.push(i);continue}if(t){let r="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){this.tokenizer.lexer=this;let s=t,i=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!==null;)a.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!==null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!==null;)o=i[2]?i[2].length:0,s=s.slice(0,i.index+o)+"["+"a".repeat(i[0].length-o-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let r=!1,c="";for(;t;){r||(c=""),r=!1;let a;if(this.options.extensions?.inline?.some(l=>(a=l.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let l=n.at(-1);a.type==="text"&&l?.type==="text"?(l.raw+=a.raw,l.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,s,c)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t,s,c)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let f=t;if(this.options.extensions?.startInline){let l=1/0,p=t.slice(1),h;this.options.extensions.startInline.forEach(v=>{h=v.call({lexer:this},p),typeof h=="number"&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(f=t.substring(0,l+1))}if(a=this.tokenizer.inlineText(f)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),r=!0;let l=n.at(-1);l?.type==="text"?(l.raw+=a.raw,l.text+=a.text):n.push(a);continue}if(t){let l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return n}},hn=class{options;parser;constructor(e){this.options=e||Ye}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(se.notSpaceStart)?.[0],i=e.replace(se.endingNewline,"")+`
`;return s?'<pre><code class="language-'+me(s)+'">'+(n?i:me(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:me(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let r=0;r<e.items.length;r++){let c=e.items[r];s+=this.listitem(c)}let i=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+i+o+`>
`+s+"</"+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){let o=e.rows[i];n="";for(let r=0;r<o.length;r++)n+=this.tablecell(o[r]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${me(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=Fo(e);if(i===null)return s;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+me(t)+'"'),o+=">"+s+"</a>",o}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=Fo(e);if(i===null)return me(n);e=i;let o=`<img src="${e}" alt="${me(n)}"`;return t&&(o+=` title="${me(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:me(e.text)}},mi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ce=class Ls{options;renderer;textRenderer;constructor(t){this.options=t||Ye,this.options.renderer=this.options.renderer||new hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new mi}static parse(t,n){return new Ls(n).parse(t)}static parseInline(t,n){return new Ls(n).parseInline(t)}parse(t){this.renderer.parser=this;let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let r=i,c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){n+=c||"";continue}}let o=i;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let r='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(t,n=this.renderer){this.renderer.parser=this;let s="";for(let i=0;i<t.length;i++){let o=t[i];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){s+=c||"";continue}}let r=o;switch(r.type){case"escape":{s+=n.text(r);break}case"html":{s+=n.html(r);break}case"link":{s+=n.link(r);break}case"image":{s+=n.image(r);break}case"checkbox":{s+=n.checkbox(r);break}case"strong":{s+=n.strong(r);break}case"em":{s+=n.em(r);break}case"codespan":{s+=n.codespan(r);break}case"br":{s+=n.br(r);break}case"del":{s+=n.del(r);break}case"text":{s+=n.text(r);break}default:{let c='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},Et=class{options;block;constructor(e){this.options=e||Ye}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?le.lex:le.lexInline}provideParser(e=this.block){return e?ce.parse:ce.parseInline}},bp=class{defaults=li();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ce;Renderer=hn;TextRenderer=mi;Lexer=le;Tokenizer=fn;Hooks=Et;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let o of i.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of i.rows)for(let r of o)n=n.concat(this.walkTokens(r.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(o=>{let r=i[o].flat(1/0);n=n.concat(this.walkTokens(r,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let o=t.renderers[i.name];o?t.renderers[i.name]=function(...r){let c=i.renderer.apply(this,r);return c===!1&&(c=o.apply(this,r)),c}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new hn(this.defaults);for(let o in n.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,c=n.renderer[r],a=i[r];i[r]=(...f)=>{let l=c.apply(i,f);return l===!1&&(l=a.apply(i,f)),l||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new fn(this.defaults);for(let o in n.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,c=n.tokenizer[r],a=i[r];i[r]=(...f)=>{let l=c.apply(i,f);return l===!1&&(l=a.apply(i,f)),l}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new Et;for(let o in n.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,c=n.hooks[r],a=i[r];Et.passThroughHooks.has(o)?i[r]=f=>{if(this.defaults.async&&Et.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await c.call(i,f);return a.call(i,p)})();let l=c.call(i,f);return a.call(i,l)}:i[r]=(...f)=>{if(this.defaults.async)return(async()=>{let p=await c.apply(i,f);return p===!1&&(p=await a.apply(i,f)),p})();let l=c.apply(i,f);return l===!1&&(l=a.apply(i,f)),l}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,o=n.walkTokens;s.walkTokens=function(r){let c=[];return c.push(o.call(this,r)),i&&(c=c.concat(i.call(this,r))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return le.lex(e,t??this.defaults)}parser(e,t){return ce.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},o=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let r=i.hooks?await i.hooks.preprocess(t):t,c=await(i.hooks?await i.hooks.provideLexer(e):e?le.lex:le.lexInline)(r,i),a=i.hooks?await i.hooks.processAllTokens(c):c;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let f=await(i.hooks?await i.hooks.provideParser(e):e?ce.parse:ce.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(f):f})().catch(o);try{i.hooks&&(t=i.hooks.preprocess(t));let r=(i.hooks?i.hooks.provideLexer(e):e?le.lex:le.lexInline)(t,i);i.hooks&&(r=i.hooks.processAllTokens(r)),i.walkTokens&&this.walkTokens(r,i.walkTokens);let c=(i.hooks?i.hooks.provideParser(e):e?ce.parse:ce.parseInline)(r,i);return i.hooks&&(c=i.hooks.postprocess(c)),c}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+me(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Ge=new bp;function F(e,t){return Ge.parse(e,t)}F.options=F.setOptions=function(e){return Ge.setOptions(e),F.defaults=Ge.defaults,ua(F.defaults),F};F.getDefaults=li;F.defaults=Ye;F.use=function(...e){return Ge.use(...e),F.defaults=Ge.defaults,ua(F.defaults),F};F.walkTokens=function(e,t){return Ge.walkTokens(e,t)};F.parseInline=Ge.parseInline;F.Parser=ce;F.parser=ce.parse;F.Renderer=hn;F.TextRenderer=mi;F.Lexer=le;F.lexer=le.lex;F.Tokenizer=fn;F.Hooks=Et;F.parse=F;F.options;F.setOptions;F.use;F.walkTokens;F.parseInline;ce.parse;le.lex;F.setOptions({gfm:!0,breaks:!0,mangle:!1});const Ko=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul"],zo=["class","href","rel","target","title","start"];let Ho=!1;const wp=14e4,$p=4e4;function kp(){Ho||(Ho=!0,Cs.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Ms(e){const t=e.trim();if(!t)return"";kp();const n=xr(t,wp),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>$p){const r=`<pre class="code-block">${Sp(`${n.text}${s}`)}</pre>`;return Cs.sanitize(r,{ALLOWED_TAGS:Ko,ALLOWED_ATTR:zo})}const i=F.parse(`${n.text}${s}`);return Cs.sanitize(i,{ALLOWED_TAGS:Ko,ALLOWED_ATTR:zo})}function Sp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xp(e,t){return d`<span class=${t} aria-hidden="true">${e}</span>`}function nn(e,t){e&&(e.textContent=t)}const Ap=1500,_p=2e3,$a="Copy as markdown",Tp="Copied",Ep="Copy failed",ds="📋",Cp="✓",Ip="!";async function Rp(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function sn(e,t){e.title=t,e.setAttribute("aria-label",t)}function Lp(e){const t=e.label??$a;return d`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget,i=s?.querySelector(".chat-copy-btn__icon");if(!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const o=await Rp(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!o){s.dataset.error="1",sn(s,Ep),nn(i,Ip),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,sn(s,t),nn(i,ds))},_p);return}s.dataset.copied="1",sn(s,Tp),nn(i,Cp),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,sn(s,t),nn(i,ds))},Ap)}}}
    >
      ${xp(ds,"chat-copy-btn__icon")}
    </button>
  `}function Mp(e){return Lp({text:()=>e,label:$a})}const Pp={emoji:"🧩",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Np={bash:{emoji:"🛠️",title:"Bash",detailKeys:["command"]},process:{emoji:"🧰",title:"Process",detailKeys:["sessionId"]},read:{emoji:"📖",title:"Read",detailKeys:["path"]},write:{emoji:"✍️",title:"Write",detailKeys:["path"]},edit:{emoji:"📝",title:"Edit",detailKeys:["path"]},attach:{emoji:"📎",title:"Attach",detailKeys:["path","url","fileName"]},browser:{emoji:"🌐",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{emoji:"🖼️",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{emoji:"📱",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{emoji:"⏰",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{emoji:"🔌",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{emoji:"🟢",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{emoji:"💬",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{emoji:"💬",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Op={fallback:Pp,tools:Np},ka=Op,jo=ka.fallback??{emoji:"🧩"},Dp=ka.tools??{};function Fp(e){return(e??"tool").trim()}function Bp(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function Up(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function Sa(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>Sa(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function Kp(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function zp(e,t){for(const n of t){const s=Kp(e,n),i=Sa(s);if(i)return i}}function Hp(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function jp(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function qp(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function Vp(e){const t=Fp(e.name),n=t.toLowerCase(),s=Dp[n],i=s?.emoji??jo.emoji??"🧩",o=s?.title??Bp(t),r=s?.label??t,c=e.args&&typeof e.args=="object"?e.args.action:void 0,a=typeof c=="string"?c.trim():void 0,f=qp(s,a),l=Up(f?.label??a);let p;n==="read"&&(p=Hp(e.args)),!p&&(n==="write"||n==="edit"||n==="attach")&&(p=jp(e.args));const h=f?.detailKeys??s?.detailKeys??jo.detailKeys??[];return!p&&h.length>0&&(p=zp(e.args,h)),!p&&e.meta&&(p=e.meta),p&&(p=Gp(p)),{name:t,emoji:i,title:o,label:r,verb:l,detail:p}}function Wp(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function Gp(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const Yp=80,Qp=2,qo=100;function Jp(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Xp(e){const t=e.split(`
`),n=t.slice(0,Qp),s=n.join(`
`);return s.length>qo?s.slice(0,qo)+"…":n.length<t.length?s+"…":s}function Zp(e){const t=e,n=ef(t.content),s=[];for(const i of n){const o=String(i.type??"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:tf(i.arguments??i.args)})}for(const i of n){const o=String(i.type??"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=nf(i),c=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:c,text:r})}if(aa(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=wn(e)??void 0;s.push({kind:"result",name:i,text:o})}return s}function Vo(e,t){const n=Vp({name:e.name,args:e.args}),s=Wp(n),i=!!e.text?.trim(),o=!!t,r=o?()=>{if(i){t(Jp(e.text));return}const p=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(p)}:void 0,c=i&&(e.text?.length??0)<=Yp,a=i&&!c,f=i&&c,l=!i;return d`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":g}
      tabindex=${o?"0":g}
      @keydown=${o?p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),r?.())}:g}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${n.emoji}</span>
          <span>${n.label}</span>
        </div>
        ${o?d`<span class="chat-tool-card__action">${i?"View ›":"›"}</span>`:g}
        ${l&&!o?d`<span class="chat-tool-card__status">✓</span>`:g}
      </div>
      ${s?d`<div class="chat-tool-card__detail">${s}</div>`:g}
      ${l?d`<div class="chat-tool-card__status-text muted">Completed</div>`:g}
      ${a?d`<div class="chat-tool-card__preview mono">${Xp(e.text)}</div>`:g}
      ${f?d`<div class="chat-tool-card__inline mono">${e.text}</div>`:g}
    </div>
  `}function ef(e){return Array.isArray(e)?e.filter(Boolean):[]}function tf(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function nf(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function sf(e){return d`
    <div class="chat-group assistant">
      ${vi("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function of(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=s?.name??"Assistant";return d`
    <div class="chat-group assistant">
      ${vi("assistant",s)}
      <div class="chat-group-messages">
        ${xa({role:"assistant",content:[{type:"text",text:e}]},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function rf(e,t){const n=ai(e.role),s=t.assistantName??"Assistant",i=n==="user"?"You":n==="assistant"?s:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return d`
    <div class="chat-group ${o}">
      ${vi(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((c,a)=>xa(c.message,{isStreaming:e.isStreaming&&a===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function vi(e,t){const n=ai(e),s=t?.name?.trim()||"Assistant",i=t?.avatar?.trim()||"",o=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?af(i)?d`<img
        class="chat-avatar ${r}"
        src="${i}"
        alt="${s}"
      />`:d`<div class="chat-avatar ${r}">${i}</div>`:d`<div class="chat-avatar ${r}">${o}</div>`}function af(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||/^\//.test(e)}function xa(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",o=aa(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",r=Zp(e),c=r.length>0,a=wn(e),f=t.showReasoning&&i==="assistant"?Ql(e):null,l=a?.trim()?a:null,p=f?Xl(f):null,h=l,v=i==="assistant"&&!!h?.trim(),w=["chat-bubble",v?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!h&&c&&o?d`${r.map(k=>Vo(k,n))}`:!h&&!c?g:d`
    <div class="${w}">
      ${v?Mp(h):g}
      ${p?d`<div class="chat-thinking">${_s(Ms(p))}</div>`:g}
      ${h?d`<div class="chat-text">${_s(Ms(h))}</div>`:g}
      ${r.map(k=>Vo(k,n))}
    </div>
  `}function lf(e){return d`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ✕
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?d`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?d`<div class="sidebar-markdown">${_s(Ms(e.content))}</div>`:d`<div class="muted">No content available</div>`}
      </div>
    </div>
  `}var cf=Object.defineProperty,df=Object.getOwnPropertyDescriptor,In=(e,t,n,s)=>{for(var i=s>1?void 0:s?df(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(s?r(t,n,i):r(i))||i);return s&&i&&cf(t,n,i),i};let ut=class extends rt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let o=this.startRatio+i;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return d``}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};ut.styles=pl`
    :host {
      width: 4px;
      cursor: col-resize;
      background: var(--border, #333);
      transition: background 150ms ease-out;
      flex-shrink: 0;
      position: relative;
    }

    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      bottom: 0;
    }

    :host(:hover) {
      background: var(--accent, #007bff);
    }

    :host(.dragging) {
      background: var(--accent, #007bff);
    }
  `;In([yn({type:Number})],ut.prototype,"splitRatio",2);In([yn({type:Number})],ut.prototype,"minRatio",2);In([yn({type:Number})],ut.prototype,"maxRatio",2);ut=In([vr("resizable-divider")],ut);const uf=5e3;function pf(e){return e?e.active?d`
      <div class="callout info compaction-indicator compaction-indicator--active">
        🧹 Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<uf?d`
        <div class="callout success compaction-indicator compaction-indicator--complete">
          🧹 Context compacted
        </div>
      `:g:g}function ff(e){const t=e.connected,n=e.sending||e.stream!==null,i=e.sessions?.sessions?.find(l=>l.key===e.sessionKey)?.reasoningLevel??"off",o=e.showThinking&&i!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},c=e.connected?"Message (↩ to send, Shift+↩ for line breaks)":"Connect to the gateway to start chatting…",a=e.splitRatio??.6,f=!!(e.sidebarOpen&&e.onCloseSidebar);return d`
    <section class="card chat">
      ${e.disabledReason?d`<div class="callout">${e.disabledReason}</div>`:g}

      ${e.error?d`<div class="callout danger">${e.error}</div>`:g}

      ${pf(e.compactionStatus)}

      ${e.focusMode?d`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ✕
            </button>
          `:g}

      <div
        class="chat-split-container ${f?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${f?`0 0 ${a*100}%`:"1 1 100%"}"
        >
          <div
            class="chat-thread"
            role="log"
            aria-live="polite"
            @scroll=${e.onChatScroll}
          >
            ${e.loading?d`<div class="muted">Loading chat…</div>`:g}
            ${oa(gf(e),l=>l.key,l=>l.kind==="reading-indicator"?sf(r):l.kind==="stream"?of(l.text,l.startedAt,e.onOpenSidebar,r):l.kind==="group"?rf(l,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:r.avatar}):g)}
          </div>
        </div>

        ${f?d`
              <resizable-divider
                .splitRatio=${a}
                @resize=${l=>e.onSplitRatioChange?.(l.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${lf({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:g}
      </div>

      ${e.queue.length?d`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(l=>d`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">${l.text}</div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(l.id)}
                      >
                        ✕
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:g}

      <div class="chat-compose">
        <label class="field chat-compose__field">
          <span>Message</span>
          <textarea
            .value=${e.draft}
            ?disabled=${!e.connected}
            @keydown=${l=>{l.key==="Enter"&&(l.isComposing||l.keyCode===229||l.shiftKey||e.connected&&(l.preventDefault(),t&&e.onSend()))}}
            @input=${l=>e.onDraftChange(l.target.value)}
            placeholder=${c}
          ></textarea>
        </label>
        <div class="chat-compose__actions">
          <button
            class="btn"
            ?disabled=${!e.connected||e.sending}
            @click=${e.onNewSession}
          >
            New session
          </button>
          <button
            class="btn primary"
            ?disabled=${!e.connected}
            @click=${e.onSend}
          >
            ${n?"Queue":"Send"}
          </button>
        </div>
      </div>
    </section>
  `}const Wo=200;function hf(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=ra(s.message),o=ai(i.role),r=i.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${s.key}`,role:o,messages:[{message:s.message,key:s.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function gf(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[],i=Math.max(0,n.length-Wo);i>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Wo} messages (${i} hidden).`,timestamp:Date.now()}});for(let o=i;o<n.length;o++){const r=n[o],c=ra(r);!e.showThinking&&c.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Go(r,o),message:r})}if(e.showThinking)for(let o=0;o<s.length;o++)t.push({kind:"message",key:Go(s[o],o+n.length),message:s[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return hf(t)}function Go(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,c=typeof n.role=="string"?n.role:"unknown",f=wn(e)??(typeof n.content=="string"?n.content:null)??mf(e)??String(t),l=vf(f);return r?`msg:${c}:${r}:${l}`:`msg:${c}:${l}`}function mf(e){try{return JSON.stringify(e)}catch{return null}}function vf(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0).toString(36)}const yf=[{id:"kimi-k2-0905-preview",name:"Kimi K2 0905 Preview",alias:"Kimi K2",reasoning:!1},{id:"kimi-k2-turbo-preview",name:"Kimi K2 Turbo",alias:"Kimi K2 Turbo",reasoning:!1},{id:"kimi-k2-thinking",name:"Kimi K2 Thinking",alias:"Kimi K2 Thinking",reasoning:!0},{id:"kimi-k2-thinking-turbo",name:"Kimi K2 Thinking Turbo",alias:"Kimi K2 Thinking Turbo",reasoning:!0}];function ve(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Aa(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(ve(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Rn(e){return e.filter(t=>typeof t=="string").join(".")}function re(e,t){const n=Rn(e),s=t[n];if(s)return s;const i=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const c=o.split(".");if(c.length!==i.length)continue;let a=!0;for(let f=0;f<i.length;f+=1)if(c[f]!=="*"&&c[f]!==i[f]){a=!1;break}if(a)return r}}function ke(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function bf(e){const t=Rn(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const wf=new Set(["title","description","default","nullable"]);function $f(e){return Object.keys(e??{}).filter(n=>!wf.has(n)).length===0}function kf(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const Ft={chevronDown:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,plus:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,minus:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,trash:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,edit:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`};function $e(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:r,onPatch:c}=e,a=e.showLabel??!0,f=ve(t),l=re(s,i),p=l?.label??t.title??ke(String(s.at(-1))),h=l?.help??t.description,v=Rn(s);if(o.has(v))return d`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${p}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(_=>!(_.type==="null"||Array.isArray(_.type)&&_.type.includes("null")));if(k.length===1)return $e({...e,schema:k[0]});const S=_=>{if(_.const!==void 0)return _.const;if(_.enum&&_.enum.length===1)return _.enum[0]},C=k.map(S),I=C.every(_=>_!==void 0);if(I&&C.length>0&&C.length<=5){const _=n??t.default;return d`
        <div class="cfg-field">
          ${a?d`<label class="cfg-field__label">${p}</label>`:g}
          ${h?d`<div class="cfg-field__help">${h}</div>`:g}
          <div class="cfg-segmented">
            ${C.map((M,ee)=>d`
              <button
                type="button"
                aria-label=${`Set ${p} to ${String(M)}`}
                class="cfg-segmented__btn ${M===_||String(M)===String(_)?"active":""}"
                ?disabled=${r}
                @click=${()=>c(s,M)}
              >
                ${String(M)}
              </button>
            `)}
          </div>
        </div>
      `}if(I&&C.length>5)return Qo({...e,options:C,value:n??t.default});const O=new Set(k.map(_=>ve(_)).filter(Boolean)),R=new Set([...O].map(_=>_==="integer"?"number":_));if([...R].every(_=>["string","number","boolean"].includes(_))){const _=R.has("string"),M=R.has("number");if(R.has("boolean")&&R.size===1)return $e({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(_||M)return Yo({...e,inputType:M&&!_?"number":"text"})}}if(t.enum){const w=t.enum;if(w.length<=5){const k=n??t.default;return d`
        <div class="cfg-field">
          ${a?d`<label class="cfg-field__label">${p}</label>`:g}
          ${h?d`<div class="cfg-field__help">${h}</div>`:g}
          <div class="cfg-segmented">
            ${w.map(S=>d`
              <button
                type="button"
                aria-label=${`Set ${p} to ${String(S)}`}
                class="cfg-segmented__btn ${S===k||String(S)===String(k)?"active":""}"
                ?disabled=${r}
                @click=${()=>c(s,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return Qo({...e,options:w,value:n??t.default})}if(f==="object")return xf(e);if(f==="array")return Af(e);if(f==="boolean"){const w=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return d`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${p}</span>
          ${h?d`<span class="cfg-toggle-row__help">${h}</span>`:g}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${w}
            ?disabled=${r}
            @change=${k=>c(s,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return f==="number"||f==="integer"?Sf(e):f==="string"?Yo({...e,inputType:"text"}):d`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${p}</div>
      <div class="cfg-field__error">Unsupported type: ${f}. Use Raw mode.</div>
    </div>
  `}function Yo(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:r,inputType:c}=e,a=e.showLabel??!0,f=re(s,i),l=f?.label??t.title??ke(String(s.at(-1))),p=f?.help??t.description,h=f?.sensitive??bf(s),v=f?.placeholder??(h?"••••":t.default!==void 0?`Default: ${t.default}`:""),w=n??"";return d`
    <div class="cfg-field">
      ${a?d`<label class="cfg-field__label">${l}</label>`:g}
      ${p?d`<div class="cfg-field__help">${p}</div>`:g}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":c}
          class="cfg-input"
          placeholder=${v}
          .value=${w==null?"":String(w)}
          ?disabled=${o}
          @input=${k=>{const S=k.target.value;if(c==="number"){if(S.trim()===""){r(s,void 0);return}const C=Number(S);r(s,Number.isNaN(C)?S:C);return}r(s,S)}}
        />
        ${t.default!==void 0?d`
          <button
            type="button"
            class="cfg-input__reset"
            aria-label=${`Reset ${l} to default`}
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>r(s,t.default)}
          >↺</button>
        `:g}
      </div>
    </div>
  `}function Sf(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:r}=e,c=e.showLabel??!0,a=re(s,i),f=a?.label??t.title??ke(String(s.at(-1))),l=a?.help??t.description,p=n??t.default??"",h=typeof p=="number"?p:0;return d`
    <div class="cfg-field">
      ${c?d`<label class="cfg-field__label">${f}</label>`:g}
      ${l?d`<div class="cfg-field__help">${l}</div>`:g}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(s,h-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${p==null?"":String(p)}
          ?disabled=${o}
          @input=${v=>{const w=v.target.value,k=w===""?void 0:Number(w);r(s,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(s,h+1)}
        >+</button>
      </div>
    </div>
  `}function Qo(e){const{schema:t,value:n,path:s,hints:i,disabled:o,options:r,onPatch:c}=e,a=e.showLabel??!0,f=re(s,i),l=f?.label??t.title??ke(String(s.at(-1))),p=f?.help??t.description,h=n??t.default,v=r.findIndex(k=>k===h||String(k)===String(h)),w="__unset__";return d`
    <div class="cfg-field">
      ${a?d`<label class="cfg-field__label">${l}</label>`:g}
      ${p?d`<div class="cfg-field__help">${p}</div>`:g}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${v>=0?String(v):w}
        @change=${k=>{const S=k.target.value;c(s,S===w?void 0:r[Number(S)])}}
      >
        <option value=${w}>Select...</option>
        ${r.map((k,S)=>d`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function xf(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:r,onPatch:c}=e;e.showLabel;const a=re(s,i),f=a?.label??t.title??ke(String(s.at(-1))),l=a?.help??t.description,p=n??t.default,h=p&&typeof p=="object"&&!Array.isArray(p)?p:{},v=t.properties??{},k=Object.entries(v).sort((O,R)=>{const _=re([...s,O[0]],i)?.order??0,M=re([...s,R[0]],i)?.order??0;return _!==M?_-M:O[0].localeCompare(R[0])}),S=new Set(Object.keys(v)),C=t.additionalProperties,I=!!C&&typeof C=="object";return s.length===1?d`
      <div class="cfg-fields">
        ${k.map(([O,R])=>$e({schema:R,value:h[O],path:[...s,O],hints:i,unsupported:o,disabled:r,onPatch:c}))}
        ${I?Jo({schema:C,value:h,path:s,hints:i,unsupported:o,disabled:r,reservedKeys:S,onPatch:c}):g}
      </div>
    `:d`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${f}</span>
        <span class="cfg-object__chevron">${Ft.chevronDown}</span>
      </summary>
      ${l?d`<div class="cfg-object__help">${l}</div>`:g}
      <div class="cfg-object__content">
        ${k.map(([O,R])=>$e({schema:R,value:h[O],path:[...s,O],hints:i,unsupported:o,disabled:r,onPatch:c}))}
        ${I?Jo({schema:C,value:h,path:s,hints:i,unsupported:o,disabled:r,reservedKeys:S,onPatch:c}):g}
      </div>
    </details>
  `}function Af(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:r,onPatch:c}=e,a=e.showLabel??!0,f=re(s,i),l=f?.label??t.title??ke(String(s.at(-1))),p=f?.help??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return d`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${l}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const v=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return d`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${a?d`<span class="cfg-array__label">${l}</span>`:g}
        <span class="cfg-array__count">${v.length} item${v.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          aria-label=${`Add ${l} item`}
          ?disabled=${r}
          @click=${()=>{const w=[...v,Aa(h)];c(s,w)}}
        >
          <span class="cfg-array__add-icon">${Ft.plus}</span>
          Add
        </button>
      </div>
      ${p?d`<div class="cfg-array__help">${p}</div>`:g}
      
      ${v.length===0?d`
        <div class="cfg-array__empty">
          No items yet. Click "Add" to create one.
        </div>
      `:d`
        <div class="cfg-array__items">
          ${v.map((w,k)=>d`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${k+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  aria-label="Remove item"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const S=[...v];S.splice(k,1),c(s,S)}}
                >
                  ${Ft.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${$e({schema:h,value:w,path:[...s,k],hints:i,unsupported:o,disabled:r,showLabel:!1,onPatch:c})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function Jo(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:r,reservedKeys:c,onPatch:a}=e,f=$f(t),l=Object.entries(n??{}).filter(([p])=>!c.has(p));return d`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          aria-label="Add custom entry"
          ?disabled=${r}
          @click=${()=>{const p={...n??{}};let h=1,v=`custom-${h}`;for(;v in p;)h+=1,v=`custom-${h}`;p[v]=f?{}:Aa(t),a(s,p)}}
        >
          <span class="cfg-map__add-icon">${Ft.plus}</span>
          Add Entry
        </button>
      </div>
      
      ${l.length===0?d`
        <div class="cfg-map__empty">No custom entries.</div>
      `:d`
        <div class="cfg-map__items">
          ${l.map(([p,h])=>{const v=[...s,p],w=kf(h);return d`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${p}
                    ?disabled=${r}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===p)return;const C={...n??{}};S in C||(C[S]=C[p],delete C[p],a(s,C))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${f?d`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${w}
                          ?disabled=${r}
                          @change=${k=>{const S=k.target,C=S.value.trim();if(!C){a(v,void 0);return}try{a(v,JSON.parse(C))}catch{S.value=w}}}
                        ></textarea>
                      `:$e({schema:t,value:h,path:v,hints:i,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  aria-label=${`Remove entry ${p}`}
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const k={...n??{}};delete k[p],a(s,k)}}
                >
                  ${Ft.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Xo={env:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,update:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,agents:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><circle cx="8" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle></svg>`,auth:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,channels:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,messages:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,commands:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,hooks:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,skills:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,tools:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,gateway:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,wizard:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8 19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2 19 5"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 11 5"></path></svg>`,meta:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,logging:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,browser:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`,ui:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,models:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,bindings:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,broadcast:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>`,audio:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,session:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,cron:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,web:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,discovery:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,canvasHost:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,talk:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,plugins:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6"></path><path d="m4.93 10.93 4.24 4.24"></path><path d="M2 12h6"></path><path d="m4.93 13.07 4.24-4.24"></path><path d="M12 22v-6"></path><path d="m19.07 13.07-4.24-4.24"></path><path d="M22 12h-6"></path><path d="m19.07 10.93-4.24 4.24"></path></svg>`,default:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`},yi={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Zo(e){return Xo[e]??Xo.default}function _f(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=yi[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:Ct(t,s)}function Ct(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||Ct(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&Ct(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Ct(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&Ct(s,t))return!0}return!1}function Tf(e){if(!e.schema)return d`<div class="muted">Schema unavailable.</div>`;const t=e.schema,n=e.value??{};if(ve(t)!=="object"||!t.properties)return d`<div class="callout danger">Unsupported schema. Use Raw.</div>`;const s=new Set(e.unsupportedPaths??[]),i=t.properties,o=e.searchQuery??"",r=e.activeSection,c=e.activeSubsection??null;let a=Object.entries(i);r&&(a=a.filter(([l])=>l===r)),o&&(a=a.filter(([l,p])=>_f(l,p,o))),a.sort((l,p)=>{const h=re([l[0]],e.uiHints)?.order??50,v=re([p[0]],e.uiHints)?.order??50;return h!==v?h-v:l[0].localeCompare(p[0])});let f=null;if(r&&c&&a.length===1){const l=a[0]?.[1];l&&ve(l)==="object"&&l.properties&&l.properties[c]&&(f={sectionKey:r,subsectionKey:c,schema:l.properties[c]})}return a.length===0?d`
      <div class="config-empty">
        <div class="config-empty__icon">🔍</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:d`
    <div class="config-form config-form--modern">
      ${f?(()=>{const{sectionKey:l,subsectionKey:p,schema:h}=f,v=re([l,p],e.uiHints),w=v?.label??h.title??ke(p),k=v?.help??h.description??"",S=n[l],C=S&&typeof S=="object"?S[p]:void 0,I=`config-section-${l}-${p}`;return d`
              <section class="config-section-card" id=${I}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Zo(l)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${w}</h3>
                    ${k?d`<p class="config-section-card__desc">${k}</p>`:g}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${$e({schema:h,value:C,path:[l,p],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():a.map(([l,p])=>{const h=yi[l]??{label:l.charAt(0).toUpperCase()+l.slice(1),description:p.description??""};return d`
              <section class="config-section-card" id="config-section-${l}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Zo(l)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${h.label}</h3>
                    ${h.description?d`<p class="config-section-card__desc">${h.description}</p>`:g}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${$e({schema:p,value:n[l],path:[l],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const Ef=new Set(["title","description","default","nullable"]);function Cf(e){return Object.keys(e??{}).filter(n=>!Ef.has(n)).length===0}function _a(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(o=>Object.is(o,i))||s.push(i);return{enumValues:s,nullable:n}}function Ta(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Rt(e,[])}function Rt(e,t){const n=new Set,s={...e},i=Rn(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const c=If(e,t);return c||{schema:e,unsupportedPaths:[i]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=ve(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=r??e.type,s.nullable=o||e.nullable,s.enum){const{enumValues:c,nullable:a}=_a(s.enum);s.enum=c,a&&(s.nullable=!0),c.length===0&&n.add(i)}if(r==="object"){const c=e.properties??{},a={};for(const[f,l]of Object.entries(c)){const p=Rt(l,[...t,f]);p.schema&&(a[f]=p.schema);for(const h of p.unsupportedPaths)n.add(h)}if(s.properties=a,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Cf(e.additionalProperties)){const f=Rt(e.additionalProperties,[...t,"*"]);s.additionalProperties=f.schema??e.additionalProperties,f.unsupportedPaths.length>0&&n.add(i)}}else if(r==="array"){const c=Array.isArray(e.items)?e.items[0]:e.items;if(!c)n.add(i);else{const a=Rt(c,[...t,"*"]);s.items=a.schema??c,a.unsupportedPaths.length>0&&n.add(i)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function If(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let o=!1;for(const c of n){if(!c||typeof c!="object")return null;if(Array.isArray(c.enum)){const{enumValues:a,nullable:f}=_a(c.enum);s.push(...a),f&&(o=!0);continue}if("const"in c){if(c.const==null){o=!0;continue}s.push(c.const);continue}if(ve(c)==="null"){o=!0;continue}i.push(c)}if(s.length>0&&i.length===0){const c=[];for(const a of s)c.some(f=>Object.is(f,a))||c.push(a);return{schema:{...e,enum:c,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const c=Rt(i[0],t);return c.schema&&(c.schema.nullable=o||c.schema.nullable),c}const r=["string","number","integer","boolean"];return i.length>0&&s.length===0&&i.every(c=>c.type&&r.includes(String(c.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const Ps={all:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,env:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,update:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,agents:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><circle cx="8" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle></svg>`,auth:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,channels:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,messages:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,commands:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,hooks:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,skills:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,tools:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,gateway:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,wizard:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8 19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2 19 5"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 11 5"></path></svg>`,meta:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`,logging:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,browser:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`,ui:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,models:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,bindings:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,broadcast:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>`,audio:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,session:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,cron:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,web:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,discovery:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,canvasHost:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,talk:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,plugins:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6"></path><path d="m4.93 10.93 4.24 4.24"></path><path d="M2 12h6"></path><path d="m4.93 13.07 4.24-4.24"></path><path d="M12 22v-6"></path><path d="m19.07 13.07-4.24-4.24"></path><path d="M22 12h-6"></path><path d="m19.07 10.93-4.24 4.24"></path></svg>`,default:d`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`},er=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],tr="__all__",Rf=[{label:"MiniMax M2.1",providerKey:"minimax",providerName:"MiniMax",baseURL:"https://api.minimax.io/anthropic",protocol:"anthropic-messages",apiKeyEnv:"MINIMAX_API_KEY",primaryModel:"minimax/MiniMax-M2.1",models:[{id:"minimax/MiniMax-M2.1",name:"MiniMax M2.1",alias:"MiniMax M2.1",reasoning:!0}]},{label:"GLM 4.7",providerKey:"zai",providerName:"Z.AI",baseURL:"https://open.bigmodel.cn/api/paas/v4",protocol:"openai-chat-completions",apiKeyEnv:"ZAI_API_KEY",primaryModel:"zai/glm-4.7",models:[{id:"zai/glm-4.7",name:"GLM 4.7",alias:"GLM 4.7",reasoning:!0}]},{label:"Kimi K2",providerKey:"moonshot",providerName:"Moonshot",baseURL:"https://api.moonshot.ai/v1",protocol:"openai-chat-completions",apiKeyEnv:"MOONSHOT_API_KEY",primaryModel:"moonshot/kimi-k2-0905-preview",models:yf.map(e=>({id:`moonshot/${e.id}`,name:e.name,alias:e.alias,reasoning:e.reasoning}))}];function nr(e){return Ps[e]??Ps.default}function Lf(e,t){const n=yi[e];return n||{label:t?.title??ke(e),description:t?.description??""}}function Mf(e){const{key:t,schema:n,uiHints:s}=e;if(!n||ve(n)!=="object"||!n.properties)return[];const i=Object.entries(n.properties).map(([o,r])=>{const c=re([t,o],s),a=c?.label??r.title??ke(o),f=c?.help??r.description??"",l=c?.order??50;return{key:o,label:a,description:f,order:l}});return i.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),i}function Pf(e,t){if(!e||!t)return[];const n=[];function s(i,o,r){if(i===o)return;if(typeof i!=typeof o){n.push({path:r,from:i,to:o});return}if(typeof i!="object"||i===null||o===null){i!==o&&n.push({path:r,from:i,to:o});return}if(Array.isArray(i)&&Array.isArray(o)){JSON.stringify(i)!==JSON.stringify(o)&&n.push({path:r,from:i,to:o});return}const c=i,a=o,f=new Set([...Object.keys(c),...Object.keys(a)]);for(const l of f)s(c[l],a[l],r?`${r}.${l}`:l)}return s(e,t,""),n}function sr(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function Nf(e){return e?typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e)):{}}function Of(e){try{const t=JSON.parse(e);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}return{}}function Df(e,t){let n=e;for(const s of t){if(!n||typeof n!="object"||Array.isArray(n))return;n=n[s]}return n}function us(e,t,n){let s=e;for(const i of t.slice(0,-1)){const o=s[i];(!o||typeof o!="object"||Array.isArray(o))&&(s[i]={}),s=s[i]}s[t[t.length-1]]=n}function Ff(e,t){const n=Df(e,["models","providers",t.providerKey]),s=n&&typeof n=="object"&&!Array.isArray(n)?n:{},i=typeof s.apiKey=="string"&&s.apiKey.trim()?s.apiKey:`\${${t.apiKeyEnv}}`;return{...s,name:t.providerName,baseURL:t.baseURL,protocol:t.protocol,apiKey:i,models:t.models}}function Bf(e,t){const n=e.formValue!=null?Nf(e.formValue):Of(e.raw),s=Ff(n,t);us(n,["models","mode"],"merge"),us(n,["models","providers",t.providerKey],s),us(n,["agents","defaults","model","primary"],t.primaryModel),e.onRawChange(`${JSON.stringify(n,null,2).trimEnd()}
`),e.onFormPatch(["models","mode"],"merge"),e.onFormPatch(["models","providers",t.providerKey],s),e.onFormPatch(["agents","defaults","model","primary"],t.primaryModel)}function Uf(e){return d`
    <div class="config-presets" aria-label="Model presets">
      <div class="config-presets__title">Model Presets</div>
      <div class="config-presets__actions">
        ${Rf.map(t=>d`
            <button
              type="button"
              class="btn btn--sm"
              ?disabled=${e.loading||e.saving||e.applying}
              @click=${()=>Bf(e,t)}
            >
              ${t.label}
            </button>
          `)}
      </div>
    </div>
  `}function Kf(e){const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=Ta(e.schema),s=n.schema?n.unsupportedPaths.length>0:!1,i=!!e.formValue&&!e.loading&&!s,o=e.connected&&!e.saving&&(e.formMode==="raw"?!0:i),r=e.connected&&!e.applying&&!e.updating&&(e.formMode==="raw"?!0:i),c=e.connected&&!e.applying&&!e.updating,a=n.schema?.properties??{},f=er.filter(_=>_.key in a),l=new Set(er.map(_=>_.key)),p=Object.keys(a).filter(_=>!l.has(_)).map(_=>({key:_,label:_.charAt(0).toUpperCase()+_.slice(1)})),h=[...f,...p],v=e.activeSection&&n.schema&&ve(n.schema)==="object"?n.schema.properties?.[e.activeSection]:void 0,w=e.activeSection?Lf(e.activeSection,v):null,k=e.activeSection?Mf({key:e.activeSection,schema:v,uiHints:e.uiHints}):[],S=e.formMode==="form"&&!!e.activeSection&&k.length>0,C=e.activeSubsection===tr,I=e.searchQuery||C?null:e.activeSubsection??k[0]?.key??null,O=e.formMode==="form"?Pf(e.originalValue,e.formValue):[],R=O.length>0;return d`
    <div class="config-layout">
      <!-- Sidebar -->
      <aside class="config-sidebar">
        <div class="config-sidebar__header">
          <div class="config-sidebar__title">Settings</div>
          <span class="pill pill--sm ${t==="valid"?"pill--ok":t==="invalid"?"pill--danger":""}">${t}</span>
        </div>
        
        <!-- Search -->
        <div class="config-search">
          <svg class="config-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="config-search__input"
            placeholder="Search settings..."
            .value=${e.searchQuery}
            @input=${_=>e.onSearchChange(_.target.value)}
          />
          ${e.searchQuery?d`
            <button 
              class="config-search__clear"
              @click=${()=>e.onSearchChange("")}
            >×</button>
          `:g}
        </div>
        
        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Ps.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${h.map(_=>d`
            <button
              class="config-nav__item ${e.activeSection===_.key?"active":""}"
              @click=${()=>e.onSectionChange(_.key)}
            >
              <span class="config-nav__icon">${nr(_.key)}</span>
              <span class="config-nav__label">${_.label}</span>
            </button>
          `)}
        </nav>
        
        <!-- Mode toggle at bottom -->
        <div class="config-sidebar__footer">
          <div class="config-mode-toggle">
            <button
              class="config-mode-toggle__btn ${e.formMode==="form"?"active":""}"
              ?disabled=${e.schemaLoading||!e.schema}
              @click=${()=>e.onFormModeChange("form")}
            >
              Form
            </button>
            <button
              class="config-mode-toggle__btn ${e.formMode==="raw"?"active":""}"
              @click=${()=>e.onFormModeChange("raw")}
            >
              Raw
            </button>
          </div>
        </div>
      </aside>
      
      <!-- Main content -->
      <main class="config-main">
        <!-- Action bar -->
        <div class="config-actions">
          <div class="config-actions__left">
            ${R?d`
              <span class="config-changes-badge">${O.length} unsaved change${O.length!==1?"s":""}</span>
            `:d`
              <span class="config-status muted">No changes</span>
            `}
          </div>
          <div class="config-actions__right">
            <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onReload}>
              ${e.loading?"Loading…":"Reload"}
            </button>
            <button
              class="btn btn--sm primary"
              ?disabled=${!o}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!r}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!c}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>
        
        <!-- Diff panel -->
        ${R?d`
          <details class="config-diff">
            <summary class="config-diff__summary">
              <span>View ${O.length} pending change${O.length!==1?"s":""}</span>
              <svg class="config-diff__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="config-diff__content">
              ${O.map(_=>d`
                <div class="config-diff__item">
                  <div class="config-diff__path">${_.path}</div>
                  <div class="config-diff__values">
                    <span class="config-diff__from">${sr(_.from)}</span>
                    <span class="config-diff__arrow">→</span>
                    <span class="config-diff__to">${sr(_.to)}</span>
                  </div>
                </div>
              `)}
            </div>
          </details>
        `:g}

        ${Uf(e)}

        ${w&&e.formMode==="form"?d`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">${nr(e.activeSection??"")}</div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">${w.label}</div>
                  ${w.description?d`<div class="config-section-hero__desc">${w.description}</div>`:g}
                </div>
              </div>
            `:g}

        ${S?d`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${I===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(tr)}
                >
                  All
                </button>
                ${k.map(_=>d`
                    <button
                      class="config-subnav__item ${I===_.key?"active":""}"
                      title=${_.description||_.label}
                      @click=${()=>e.onSubsectionChange(_.key)}
                    >
                      ${_.label}
                    </button>
                  `)}
              </div>
            `:g}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?d`
                ${e.schemaLoading?d`<div class="config-loading">
                      <div class="config-loading__spinner"></div>
                      <span>Loading schema…</span>
                    </div>`:Tf({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:I})}
                ${s?d`<div class="callout danger" style="margin-top: 12px;">
                      Form view can't safely edit some fields.
                      Use Raw to avoid losing config entries.
                    </div>`:g}
              `:d`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${_=>e.onRawChange(_.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?d`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">${JSON.stringify(e.issues,null,2)}</pre>
            </div>`:g}
      </main>
    </div>
  `}function zf(e){if(!e&&e!==0)return"n/a";const t=Math.round(e/1e3);if(t<60)return`${t}s`;const n=Math.round(t/60);return n<60?`${n}m`:`${Math.round(n/60)}h`}function Hf(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],o=typeof i?.configured=="boolean"&&i.configured,r=typeof i?.running=="boolean"&&i.running,c=typeof i?.connected=="boolean"&&i.connected,f=(n.channelAccounts?.[e]??[]).some(l=>l.configured||l.running||l.connected);return o||r||c||f}function jf(e,t){return t?.[e]?.length??0}function Ea(e,t){const n=jf(e,t);return n<2?g:d`<div class="account-count">Accounts (${n})</div>`}function qf(e,t){let n=e;for(const s of t){if(!n)return null;const i=ve(n);if(i==="object"){const o=n.properties??{};if(typeof s=="string"&&o[s]){n=o[s];continue}const r=n.additionalProperties;if(typeof s=="string"&&r&&typeof r=="object"){n=r;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function Vf(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}function Wf(e){const t=Ta(e.schema),n=t.schema;if(!n)return d`<div class="callout danger">Schema unavailable. Use Raw.</div>`;const s=qf(n,["channels",e.channelId]);if(!s)return d`<div class="callout danger">Channel config schema unavailable.</div>`;const i=e.configValue??{},o=Vf(i,e.channelId);return d`
    <div class="config-form">
      ${$e({schema:s,value:o,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
  `}function Pe(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return d`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?d`<div class="muted">Loading config schema…</div>`:Wf({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
      <div class="row" style="margin-top: 12px;">
        <button
          class="btn primary"
          ?disabled=${s||!n.configFormDirty}
          @click=${()=>n.onConfigSave()}
        >
          ${n.configSaving?"Saving…":"Save"}
        </button>
        <button
          class="btn"
          ?disabled=${s}
          @click=${()=>n.onConfigReload()}
        >
          Reload
        </button>
      </div>
    </div>
  `}function Gf(e){const{props:t,discord:n,accountCountLabel:s}=e;return d`
    <div class="card">
      <div class="card-title">Discord</div>
      <div class="card-sub">Bot status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?B(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?B(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${n?.probe?d`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:g}

      ${Pe({channelId:"discord",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Yf(e){const{props:t,imessage:n,accountCountLabel:s}=e;return d`
    <div class="card">
      <div class="card-title">iMessage</div>
      <div class="card-sub">macOS bridge status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?B(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?B(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${n?.probe?d`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.error??""}
          </div>`:g}

      ${Pe({channelId:"imessage",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Qf(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Jf(e){const{state:t,callbacks:n,accountId:s}=e,i=Qf(t),o=(c,a,f={})=>{const{type:l="text",placeholder:p,maxLength:h,help:v}=f,w=t.values[c]??"",k=t.fieldErrors[c],S=`nostr-profile-${c}`;return l==="textarea"?d`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${a}
          </label>
          <textarea
            id="${S}"
            .value=${w}
            placeholder=${p??""}
            maxlength=${h??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${C=>{const I=C.target;n.onFieldChange(c,I.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${v?d`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${v}</div>`:g}
          ${k?d`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${k}</div>`:g}
        </div>
      `:d`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${a}
        </label>
        <input
          id="${S}"
          type=${l}
          .value=${w}
          placeholder=${p??""}
          maxlength=${h??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${C=>{const I=C.target;n.onFieldChange(c,I.value)}}
          ?disabled=${t.saving}
        />
        ${v?d`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${v}</div>`:g}
        ${k?d`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${k}</div>`:g}
      </div>
    `},r=()=>{const c=t.values.picture;return c?d`
      <div style="margin-bottom: 12px;">
        <img
          src=${c}
          alt="Profile picture preview"
          style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
          @error=${a=>{const f=a.target;f.style.display="none"}}
          @load=${a=>{const f=a.target;f.style.display="block"}}
        />
      </div>
    `:g};return d`
    <div class="nostr-profile-form" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-weight: 600; font-size: 16px;">Edit Profile</div>
        <div style="font-size: 12px; color: var(--text-muted);">Account: ${s}</div>
      </div>

      ${t.error?d`<div class="callout danger" style="margin-bottom: 12px;">${t.error}</div>`:g}

      ${t.success?d`<div class="callout success" style="margin-bottom: 12px;">${t.success}</div>`:g}

      ${r()}

      ${o("name","Username",{placeholder:"satoshi",maxLength:256,help:"Short username (e.g., satoshi)"})}

      ${o("displayName","Display Name",{placeholder:"Satoshi Nakamoto",maxLength:256,help:"Your full display name"})}

      ${o("about","Bio",{type:"textarea",placeholder:"Tell people about yourself...",maxLength:2e3,help:"A brief bio or description"})}

      ${o("picture","Avatar URL",{type:"url",placeholder:"https://example.com/avatar.jpg",help:"HTTPS URL to your profile picture"})}

      ${t.showAdvanced?d`
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div style="font-weight: 500; margin-bottom: 12px; color: var(--text-muted);">Advanced</div>

              ${o("banner","Banner URL",{type:"url",placeholder:"https://example.com/banner.jpg",help:"HTTPS URL to a banner image"})}

              ${o("website","Website",{type:"url",placeholder:"https://example.com",help:"Your personal website"})}

              ${o("nip05","NIP-05 Identifier",{placeholder:"you@example.com",help:"Verifiable identifier (e.g., you@domain.com)"})}

              ${o("lud16","Lightning Address",{placeholder:"you@getalby.com",help:"Lightning address for tips (LUD-16)"})}
            </div>
          `:g}

      <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
        <button
          class="btn primary"
          @click=${n.onSave}
          ?disabled=${t.saving||!i}
        >
          ${t.saving?"Saving...":"Save & Publish"}
        </button>

        <button
          class="btn"
          @click=${n.onImport}
          ?disabled=${t.importing||t.saving}
        >
          ${t.importing?"Importing...":"Import from Relays"}
        </button>

        <button
          class="btn"
          @click=${n.onToggleAdvanced}
        >
          ${t.showAdvanced?"Hide Advanced":"Show Advanced"}
        </button>

        <button
          class="btn"
          @click=${n.onCancel}
          ?disabled=${t.saving}
        >
          Cancel
        </button>
      </div>

      ${i?d`<div style="font-size: 12px; color: var(--warning-color); margin-top: 8px;">
            You have unsaved changes
          </div>`:g}
    </div>
  `}function Xf(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}function ir(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"n/a"}function Zf(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:o,profileFormCallbacks:r,onEditProfile:c}=e,a=s[0],f=n?.configured??a?.configured??!1,l=n?.running??a?.running??!1,p=n?.publicKey??a?.publicKey,h=n?.lastStartAt??a?.lastStartAt??null,v=n?.lastError??a?.lastError??null,w=s.length>1,k=o!=null,S=I=>{const O=I.publicKey,R=I.profile,_=R?.displayName??R?.name??I.name??I.accountId;return d`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${_}</div>
          <div class="account-card-id">${I.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${I.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${I.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Public Key</span>
            <span class="monospace" title="${O??""}">${ir(O)}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${I.lastInboundAt?B(I.lastInboundAt):"n/a"}</span>
          </div>
          ${I.lastError?d`
                <div class="account-card-error">${I.lastError}</div>
              `:g}
        </div>
      </div>
    `},C=()=>{if(k&&r)return Jf({state:o,callbacks:r,accountId:s[0]?.accountId??"default"});const I=a?.profile??n?.profile,{name:O,displayName:R,about:_,picture:M,nip05:ee}=I??{},ht=O||R||_||M||ee;return d`
      <div style="margin-top: 16px; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="font-weight: 500;">Profile</div>
          ${f?d`
                <button
                  class="btn btn-sm"
                  @click=${c}
                  style="font-size: 12px; padding: 4px 8px;"
                >
                  Edit Profile
                </button>
              `:g}
        </div>
        ${ht?d`
              <div class="status-list">
                ${M?d`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${M}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${zt=>{zt.target.style.display="none"}}
                        />
                      </div>
                    `:g}
                ${O?d`<div><span class="label">Name</span><span>${O}</span></div>`:g}
                ${R?d`<div><span class="label">Display Name</span><span>${R}</span></div>`:g}
                ${_?d`<div><span class="label">About</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${_}</span></div>`:g}
                ${ee?d`<div><span class="label">NIP-05</span><span>${ee}</span></div>`:g}
              </div>
            `:d`
              <div style="color: var(--text-muted); font-size: 13px;">
                No profile set. Click "Edit Profile" to add your name, bio, and avatar.
              </div>
            `}
      </div>
    `};return d`
    <div class="card">
      <div class="card-title">Nostr</div>
      <div class="card-sub">Decentralized DMs via Nostr relays (NIP-04).</div>
      ${i}

      ${w?d`
            <div class="account-card-list">
              ${s.map(I=>S(I))}
            </div>
          `:d`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${f?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${l?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Public Key</span>
                <span class="monospace" title="${p??""}"
                  >${ir(p)}</span
                >
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${h?B(h):"n/a"}</span>
              </div>
            </div>
          `}

      ${v?d`<div class="callout danger" style="margin-top: 12px;">${v}</div>`:g}

      ${C()}

      ${Pe({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>Refresh</button>
      </div>
    </div>
  `}function eh(e){const{props:t,signal:n,accountCountLabel:s}=e;return d`
    <div class="card">
      <div class="card-title">Signal</div>
      <div class="card-sub">signal-cli status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Base URL</span>
          <span>${n?.baseUrl??"n/a"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?B(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?B(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${n?.probe?d`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:g}

      ${Pe({channelId:"signal",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function th(e){const{props:t,slack:n,accountCountLabel:s}=e;return d`
    <div class="card">
      <div class="card-title">Slack</div>
      <div class="card-sub">Socket mode status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?B(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?B(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${n?.probe?d`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:g}

      ${Pe({channelId:"slack",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function nh(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,o=s.length>1,r=c=>{const f=c.probe?.bot?.username,l=c.name||c.accountId;return d`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${f?`@${f}`:l}
          </div>
          <div class="account-card-id">${c.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${c.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${c.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${c.lastInboundAt?B(c.lastInboundAt):"n/a"}</span>
          </div>
          ${c.lastError?d`
                <div class="account-card-error">
                  ${c.lastError}
                </div>
              `:g}
        </div>
      </div>
    `};return d`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">Bot status and channel configuration.</div>
      ${i}

      ${o?d`
            <div class="account-card-list">
              ${s.map(c=>r(c))}
            </div>
          `:d`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${n?.configured?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${n?.running?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Mode</span>
                <span>${n?.mode??"n/a"}</span>
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${n?.lastStartAt?B(n.lastStartAt):"n/a"}</span>
              </div>
              <div>
                <span class="label">Last probe</span>
                <span>${n?.lastProbeAt?B(n.lastProbeAt):"n/a"}</span>
              </div>
            </div>
          `}

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${n?.probe?d`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:g}

      ${Pe({channelId:"telegram",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function sh(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return d`
    <div class="card">
      <div class="card-title">WhatsApp</div>
      <div class="card-sub">Link WhatsApp Web and monitor connection health.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Linked</span>
          <span>${n?.linked?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Connected</span>
          <span>${n?.connected?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last connect</span>
          <span>
            ${n?.lastConnectedAt?B(n.lastConnectedAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last message</span>
          <span>
            ${n?.lastMessageAt?B(n.lastMessageAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Auth age</span>
          <span>
            ${n?.authAgeMs!=null?zf(n.authAgeMs):"n/a"}
          </span>
        </div>
      </div>

      ${n?.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:g}

      ${t.whatsappMessage?d`<div class="callout" style="margin-top: 12px;">
            ${t.whatsappMessage}
          </div>`:g}

      ${t.whatsappQrDataUrl?d`<div class="qr-wrap">
            <img src=${t.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`:g}

      <div class="row" style="margin-top: 14px; flex-wrap: wrap;">
        <button
          class="btn primary"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!1)}
        >
          ${t.whatsappBusy?"Working…":"Show QR"}
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!0)}
        >
          Relink
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppWait()}
        >
          Wait for scan
        </button>
        <button
          class="btn danger"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppLogout()}
        >
          Logout
        </button>
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Refresh
        </button>
      </div>

      ${Pe({channelId:"whatsapp",props:t})}
    </div>
  `}function ih(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,o=t?.slack??null,r=t?.signal??null,c=t?.imessage??null,a=t?.nostr??null,l=oh(e.snapshot).map((p,h)=>({key:p,enabled:Hf(p,e),order:h})).sort((p,h)=>p.enabled!==h.enabled?p.enabled?-1:1:p.order-h.order);return d`
    <section class="grid grid-cols-2">
      ${l.map(p=>rh(p.key,e,{whatsapp:n,telegram:s,discord:i,slack:o,signal:r,imessage:c,nostr:a,channelAccounts:e.snapshot?.channelAccounts??null}))}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Channel health</div>
          <div class="card-sub">Channel status snapshots from the gateway.</div>
        </div>
        <div class="muted">${e.lastSuccessAt?B(e.lastSuccessAt):"n/a"}</div>
      </div>
      ${e.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:g}
      <pre class="code-block" style="margin-top: 12px;">
${e.snapshot?JSON.stringify(e.snapshot,null,2):"No snapshot yet."}
      </pre>
    </section>
  `}function oh(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","slack","signal","imessage","nostr"]}function rh(e,t,n){const s=Ea(e,n.channelAccounts);switch(e){case"whatsapp":return sh({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return nh({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return Gf({props:t,discord:n.discord,accountCountLabel:s});case"slack":return th({props:t,slack:n.slack,accountCountLabel:s});case"signal":return eh({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return Yf({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],o=i[0],r=o?.accountId??"default",c=o?.profile??null,a=t.nostrProfileAccountId===r?t.nostrProfileFormState:null,f=a?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Zf({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:a,profileFormCallbacks:f,onEditProfile:()=>t.onNostrProfileEdit(r,c)})}default:return ah(e,t,n.channelAccounts??{})}}function ah(e,t,n){const s=ch(t.snapshot,e),i=t.snapshot?.channels?.[e],o=typeof i?.configured=="boolean"?i.configured:void 0,r=typeof i?.running=="boolean"?i.running:void 0,c=typeof i?.connected=="boolean"?i.connected:void 0,a=typeof i?.lastError=="string"?i.lastError:void 0,f=n[e]??[],l=Ea(e,n);return d`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">Channel status and configuration.</div>
      ${l}

      ${f.length>0?d`
            <div class="account-card-list">
              ${f.map(p=>fh(p))}
            </div>
          `:d`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${o==null?"n/a":o?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${r==null?"n/a":r?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Connected</span>
                <span>${c==null?"n/a":c?"Yes":"No"}</span>
              </div>
            </div>
          `}

      ${a?d`<div class="callout danger" style="margin-top: 12px;">
            ${a}
          </div>`:g}

      ${Pe({channelId:e,props:t})}
    </div>
  `}function lh(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function ch(e,t){return lh(e)[t]?.label??e?.channelLabels?.[t]??t}const dh=600*1e3;function Ca(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<dh:!1}function uh(e){return e.running?"Yes":Ca(e)?"Active":"No"}function ph(e){return e.connected===!0?"Yes":e.connected===!1?"No":Ca(e)?"Active":"n/a"}function fh(e){const t=uh(e),n=ph(e);return d`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${e.name||e.accountId}</div>
        <div class="account-card-id">${e.accountId}</div>
      </div>
      <div class="status-list account-card-status">
        <div>
          <span class="label">Running</span>
          <span>${t}</span>
        </div>
        <div>
          <span class="label">Configured</span>
          <span>${e.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Connected</span>
          <span>${n}</span>
        </div>
        <div>
          <span class="label">Last inbound</span>
          <span>${e.lastInboundAt?B(e.lastInboundAt):"n/a"}</span>
        </div>
        ${e.lastError?d`
              <div class="account-card-error">
                ${e.lastError}
              </div>
            `:g}
      </div>
    </div>
  `}function hh(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function gh(e){const t=e.ts??null;return t?B(t):"n/a"}function Ia(e){return e?`${Ot(e)} (${B(e)})`:"n/a"}function mh(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function vh(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function yh(e){const t=e.state??{},n=t.nextRunAtMs?Ot(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?Ot(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function bh(e){const t=e.schedule;return t.kind==="at"?`At ${Ot(t.atMs)}`:t.kind==="every"?`Every ${Sr(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function wh(e){const t=e.payload;return t.kind==="systemEvent"?`System: ${t.text}`:`Agent: ${t.message}`}function $h(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.channel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function kh(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Sh(e){const t=$h(e);return d`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Scheduler</div>
        <div class="card-sub">Gateway-owned cron scheduler status.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Enabled</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"Yes":"No":"n/a"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${e.status?.jobs??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${Ia(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?d`<span class="muted">${e.error}</span>`:g}
        </div>
      </div>

      <div class="card">
        <div class="card-title">New Job</div>
        <div class="card-sub">Create a scheduled wakeup or agent run.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Name</span>
            <input
              .value=${e.form.name}
              @input=${n=>e.onFormChange({name:n.target.value})}
            />
          </label>
          <label class="field">
            <span>Description</span>
            <input
              .value=${e.form.description}
              @input=${n=>e.onFormChange({description:n.target.value})}
            />
          </label>
          <label class="field">
            <span>Agent ID</span>
            <input
              .value=${e.form.agentId}
              @input=${n=>e.onFormChange({agentId:n.target.value})}
              placeholder="default"
            />
          </label>
          <label class="field checkbox">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${n=>e.onFormChange({enabled:n.target.checked})}
            />
          </label>
          <label class="field">
            <span>Schedule</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${n=>e.onFormChange({scheduleKind:n.target.value})}
            >
              <option value="every">Every</option>
              <option value="at">At</option>
              <option value="cron">Cron</option>
            </select>
          </label>
        </div>
        ${xh(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Session</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${n=>e.onFormChange({sessionTarget:n.target.value})}
            >
              <option value="main">Main</option>
              <option value="isolated">Isolated</option>
            </select>
          </label>
          <label class="field">
            <span>Wake mode</span>
            <select
              .value=${e.form.wakeMode}
              @change=${n=>e.onFormChange({wakeMode:n.target.value})}
            >
              <option value="next-heartbeat">Next heartbeat</option>
              <option value="now">Now</option>
            </select>
          </label>
          <label class="field">
            <span>Payload</span>
            <select
              .value=${e.form.payloadKind}
              @change=${n=>e.onFormChange({payloadKind:n.target.value})}
            >
              <option value="systemEvent">System event</option>
              <option value="agentTurn">Agent turn</option>
            </select>
          </label>
        </div>
        <label class="field" style="margin-top: 12px;">
          <span>${e.form.payloadKind==="systemEvent"?"System text":"Agent message"}</span>
          <textarea
            .value=${e.form.payloadText}
            @input=${n=>e.onFormChange({payloadText:n.target.value})}
            rows="4"
          ></textarea>
        </label>
	          ${e.form.payloadKind==="agentTurn"?d`
	              <div class="form-grid" style="margin-top: 12px;">
                <label class="field checkbox">
                  <span>Deliver</span>
                  <input
                    type="checkbox"
                    .checked=${e.form.deliver}
                    @change=${n=>e.onFormChange({deliver:n.target.checked})}
                  />
	                </label>
	                <label class="field">
	                  <span>Channel</span>
	                  <select
	                    .value=${e.form.channel||"last"}
	                    @change=${n=>e.onFormChange({channel:n.target.value})}
	                  >
	                    ${t.map(n=>d`<option value=${n}>
                            ${kh(e,n)}
                          </option>`)}
                  </select>
                </label>
                <label class="field">
                  <span>To</span>
                  <input
                    .value=${e.form.to}
                    @input=${n=>e.onFormChange({to:n.target.value})}
                    placeholder="+1555… or chat id"
                  />
                </label>
                <label class="field">
                  <span>Timeout (seconds)</span>
                  <input
                    .value=${e.form.timeoutSeconds}
                    @input=${n=>e.onFormChange({timeoutSeconds:n.target.value})}
                  />
                </label>
                ${e.form.sessionTarget==="isolated"?d`
                      <label class="field">
                        <span>Post to main prefix</span>
                        <input
                          .value=${e.form.postToMainPrefix}
                          @input=${n=>e.onFormChange({postToMainPrefix:n.target.value})}
                        />
                      </label>
                    `:g}
              </div>
            `:g}
        <div class="row" style="margin-top: 14px;">
          <button class="btn primary" ?disabled=${e.busy} @click=${e.onAdd}>
            ${e.busy?"Saving…":"Add job"}
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Jobs</div>
      <div class="card-sub">All scheduled jobs stored in the gateway.</div>
      ${e.jobs.length===0?d`<div class="muted" style="margin-top: 12px;">No jobs yet.</div>`:d`
            <div class="list" style="margin-top: 12px;">
              ${e.jobs.map(n=>Ah(n,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Run history</div>
      <div class="card-sub">Latest runs for ${e.runsJobId??"(select a job)"}.</div>
      ${e.runsJobId==null?d`
            <div class="muted" style="margin-top: 12px;">
              Select a job to inspect run history.
            </div>
          `:e.runs.length===0?d`<div class="muted" style="margin-top: 12px;">No runs yet.</div>`:d`
              <div class="list" style="margin-top: 12px;">
                ${e.runs.map(n=>_h(n))}
              </div>
            `}
    </section>
  `}function xh(e){const t=e.form;return t.scheduleKind==="at"?d`
      <label class="field" style="margin-top: 12px;">
        <span>Run at</span>
        <input
          type="datetime-local"
          .value=${t.scheduleAt}
          @input=${n=>e.onFormChange({scheduleAt:n.target.value})}
        />
      </label>
    `:t.scheduleKind==="every"?d`
      <div class="form-grid" style="margin-top: 12px;">
        <label class="field">
          <span>Every</span>
          <input
            .value=${t.everyAmount}
            @input=${n=>e.onFormChange({everyAmount:n.target.value})}
          />
        </label>
        <label class="field">
          <span>Unit</span>
          <select
            .value=${t.everyUnit}
            @change=${n=>e.onFormChange({everyUnit:n.target.value})}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </label>
      </div>
    `:d`
    <div class="form-grid" style="margin-top: 12px;">
      <label class="field">
        <span>Expression</span>
        <input
          .value=${t.cronExpr}
          @input=${n=>e.onFormChange({cronExpr:n.target.value})}
        />
      </label>
      <label class="field">
        <span>Timezone (optional)</span>
        <input
          .value=${t.cronTz}
          @input=${n=>e.onFormChange({cronTz:n.target.value})}
        />
      </label>
    </div>
  `}function Ah(e,t){const s=`list-item list-item-clickable${t.runsJobId===e.id?" list-item-selected":""}`;return d`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${bh(e)}</div>
        <div class="muted">${wh(e)}</div>
        ${e.agentId?d`<div class="muted">Agent: ${e.agentId}</div>`:g}
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.enabled?"enabled":"disabled"}</span>
          <span class="chip">${e.sessionTarget}</span>
          <span class="chip">${e.wakeMode}</span>
        </div>
      </div>
      <div class="list-meta">
        <div>${yh(e)}</div>
        <div class="row" style="justify-content: flex-end; margin-top: 8px;">
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onToggle(e,!e.enabled)}}
          >
            ${e.enabled?"Disable":"Enable"}
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRun(e)}}
          >
            Run
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onLoadRuns(e.id)}}
          >
            Runs
          </button>
          <button
            class="btn danger"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRemove(e)}}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  `}function _h(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${Ot(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${e.error?d`<div class="muted">${e.error}</div>`:g}
      </div>
    </div>
  `}function Th(e){return d`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Snapshots</div>
            <div class="card-sub">Status, health, and heartbeat data.</div>
          </div>
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="stack" style="margin-top: 12px;">
          <div>
            <div class="muted">Status</div>
            <pre class="code-block">${JSON.stringify(e.status??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Health</div>
            <pre class="code-block">${JSON.stringify(e.health??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Last heartbeat</div>
            <pre class="code-block">${JSON.stringify(e.heartbeat??{},null,2)}</pre>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Manual RPC</div>
        <div class="card-sub">Send a raw gateway method with JSON params.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Method</span>
            <input
              .value=${e.callMethod}
              @input=${t=>e.onCallMethodChange(t.target.value)}
              placeholder="system-presence"
            />
          </label>
          <label class="field">
            <span>Params (JSON)</span>
            <textarea
              .value=${e.callParams}
              @input=${t=>e.onCallParamsChange(t.target.value)}
              rows="6"
            ></textarea>
          </label>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn primary" @click=${e.onCall}>Call</button>
        </div>
        ${e.callError?d`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:g}
        ${e.callResult?d`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:g}
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Models</div>
      <div class="card-sub">Catalog from models.list.</div>
      <pre class="code-block" style="margin-top: 12px;">${JSON.stringify(e.models??[],null,2)}</pre>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Event Log</div>
      <div class="card-sub">Latest gateway events.</div>
      ${e.eventLog.length===0?d`<div class="muted" style="margin-top: 12px;">No events yet.</div>`:d`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(t=>d`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${t.event}</div>
                      <div class="list-sub">${new Date(t.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${vh(t.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Eh(e){return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Connected Instances</div>
          <div class="card-sub">Presence beacons from the gateway and clients.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>
      ${e.lastError?d`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:g}
      ${e.statusMessage?d`<div class="callout" style="margin-top: 12px;">
            ${e.statusMessage}
          </div>`:g}
      <div class="list" style="margin-top: 16px;">
        ${e.entries.length===0?d`<div class="muted">No instances reported yet.</div>`:e.entries.map(t=>Ch(t))}
      </div>
    </section>
  `}function Ch(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}s ago`:"n/a",n=e.mode??"unknown",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],o=i.length>0?i.length>3?`${i.length} scopes`:`scopes: ${i.join(", ")}`:null;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"unknown host"}</div>
        <div class="list-sub">${hh(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(r=>d`<span class="chip">${r}</span>`)}
          ${o?d`<span class="chip">${o}</span>`:g}
          ${e.platform?d`<span class="chip">${e.platform}</span>`:g}
          ${e.deviceFamily?d`<span class="chip">${e.deviceFamily}</span>`:g}
          ${e.modelIdentifier?d`<span class="chip">${e.modelIdentifier}</span>`:g}
          ${e.version?d`<span class="chip">${e.version}</span>`:g}
        </div>
      </div>
      <div class="list-meta">
        <div>${gh(e)}</div>
        <div class="muted">Last input ${t}</div>
        <div class="muted">Reason ${e.reason??""}</div>
      </div>
    </div>
  `}const or=["trace","debug","info","warn","error","fatal"];function Ih(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Rh(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Lh(e){const t=e.filterText.trim().toLowerCase(),n=or.some(o=>!e.levelFilters[o]),s=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Rh(o,t)),i=t||n?"filtered":"visible";return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Logs</div>
          <div class="card-sub">Gateway file logs (JSONL).</div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
          <button
            class="btn"
            ?disabled=${s.length===0}
            @click=${()=>e.onExport(s.map(o=>o.raw),i)}
          >
            Export ${i}
          </button>
        </div>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="min-width: 220px;">
          <span>Filter</span>
          <input
            .value=${e.filterText}
            @input=${o=>e.onFilterTextChange(o.target.value)}
            placeholder="Search logs"
          />
        </label>
        <label class="field checkbox">
          <span>Auto-follow</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${o=>e.onToggleAutoFollow(o.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${or.map(o=>d`
            <label class="chip log-chip ${o}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[o]}
                @change=${r=>e.onLevelToggle(o,r.target.checked)}
              />
              <span>${o}</span>
            </label>
          `)}
      </div>

      ${e.file?d`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:g}
      ${e.truncated?d`<div class="callout" style="margin-top: 10px;">
            Log output truncated; showing latest chunk.
          </div>`:g}
      ${e.error?d`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:g}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${s.length===0?d`<div class="muted" style="padding: 12px;">No log entries.</div>`:s.map(o=>d`
                <div class="log-row">
                  <div class="log-time mono">${Ih(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Mh(e){const t=Bh(e),n=qh(e);return d`
    ${Wh(n)}
    ${Vh(t)}
    ${Ph(e)}
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Nodes</div>
          <div class="card-sub">Paired devices and live links.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>
      <div class="list" style="margin-top: 16px;">
        ${e.nodes.length===0?d`<div class="muted">No nodes found.</div>`:e.nodes.map(s=>sg(s))}
      </div>
    </section>
  `}function Ph(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Devices</div>
          <div class="card-sub">Pairing requests + role tokens.</div>
        </div>
        <button class="btn" ?disabled=${e.devicesLoading} @click=${e.onDevicesRefresh}>
          ${e.devicesLoading?"Loading…":"Refresh"}
        </button>
      </div>
      ${e.devicesError?d`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:g}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?d`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(i=>Nh(i,e))}
            `:g}
        ${s.length>0?d`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${s.map(i=>Oh(i,e))}
            `:g}
        ${n.length===0&&s.length===0?d`<div class="muted">No paired devices.</div>`:g}
      </div>
    </section>
  `}function Nh(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?B(e.ts):"n/a",i=e.role?.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${r}</div>
        <div class="muted" style="margin-top: 6px;">
          ${i} · requested ${s}${o}
        </div>
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn--sm primary" @click=${()=>t.onDeviceApprove(e.requestId)}>
            Approve
          </button>
          <button class="btn btn--sm" @click=${()=>t.onDeviceReject(e.requestId)}>
            Reject
          </button>
        </div>
      </div>
    </div>
  `}function Oh(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`roles: ${ms(e.roles)}`,o=`scopes: ${ms(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${s}</div>
        <div class="muted" style="margin-top: 6px;">${i} · ${o}</div>
        ${r.length===0?d`<div class="muted" style="margin-top: 6px;">Tokens: none</div>`:d`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(c=>Dh(e.deviceId,c,t))}
              </div>
            `}
      </div>
    </div>
  `}function Dh(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`scopes: ${ms(t.scopes)}`,o=B(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return d`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?g:d`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}const Ie="__defaults__",rr=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Fh=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Bh(e){const t=e.configForm,n=eg(e.nodes),{defaultBinding:s,agents:i}=ng(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function ar(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Uh(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Kh(e){const t=e?.defaults??{};return{security:ar(t.security),ask:Uh(t.ask),askFallback:ar(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function zh(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const o=i,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const c=typeof o.name=="string"?o.name.trim():void 0,a=o.default===!0;s.push({id:r,name:c||void 0,isDefault:a})}),s}function Hh(e,t){const n=zh(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(r=>i.set(r.id,r)),s.forEach(r=>{i.has(r)||i.set(r,{id:r})});const o=Array.from(i.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,c)=>{if(r.isDefault&&!c.isDefault)return-1;if(!r.isDefault&&c.isDefault)return 1;const a=r.name?.trim()?r.name:r.id,f=c.name?.trim()?c.name:c.id;return a.localeCompare(f)}),o}function jh(e,t){return e===Ie?Ie:e&&t.some(n=>n.id===e)?e:Ie}function qh(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=Kh(t),i=Hh(e.configForm,t),o=tg(e.nodes),r=e.execApprovalsTarget;let c=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&c&&!o.some(p=>p.id===c)&&(c=null);const a=jh(e.execApprovalsSelectedAgent,i),f=a!==Ie?(t?.agents??{})[a]??null:null,l=Array.isArray(f?.allowlist)?f.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:a,selectedAgent:f,agents:i,allowlist:l,target:r,targetNodeId:c,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Vh(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec node binding</div>
          <div class="card-sub">
            Pin agents to a specific node when using <span class="mono">exec host=node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.configDirty}
          @click=${e.onSave}
        >
          ${e.configSaving?"Saving…":"Save"}
        </button>
      </div>

      ${e.formMode==="raw"?d`<div class="callout warn" style="margin-top: 12px;">
            Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
          </div>`:g}

      ${e.ready?d`
            <div class="list" style="margin-top: 16px;">
              <div class="list-item">
                <div class="list-main">
                  <div class="list-title">Default binding</div>
                  <div class="list-sub">Used when agents do not override a node binding.</div>
                </div>
                <div class="list-meta">
                  <label class="field">
                    <span>Node</span>
                    <select
                      ?disabled=${e.disabled||!t}
                      @change=${s=>{const o=s.target.value.trim();e.onBindDefault(o||null)}}
                    >
                      <option value="" ?selected=${n===""}>Any node</option>
                      ${e.nodes.map(s=>d`<option
                            value=${s.id}
                            ?selected=${n===s.id}
                          >
                            ${s.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?g:d`<div class="muted">No nodes with system.run available.</div>`}
                </div>
              </div>

              ${e.agents.length===0?d`<div class="muted">No agents found.</div>`:e.agents.map(s=>Zh(s,e))}
            </div>
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function Wh(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec approvals</div>
          <div class="card-sub">
            Allowlist and approval policy for <span class="mono">exec host=gateway/node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.dirty||!n}
          @click=${e.onSave}
        >
          ${e.saving?"Saving…":"Save"}
        </button>
      </div>

      ${Gh(e)}

      ${t?d`
            ${Yh(e)}
            ${Qh(e)}
            ${e.selectedScope===Ie?g:Jh(e)}
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Gh(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return d`
    <div class="list" style="margin-top: 12px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Target</div>
          <div class="list-sub">
            Gateway edits local approvals; node edits the selected node.
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Host</span>
            <select
              ?disabled=${e.disabled}
              @change=${s=>{if(s.target.value==="node"){const r=e.targetNodes[0]?.id??null;e.onSelectTarget("node",n||r)}else e.onSelectTarget("gateway",null)}}
            >
              <option value="gateway" ?selected=${e.target==="gateway"}>Gateway</option>
              <option value="node" ?selected=${e.target==="node"}>Node</option>
            </select>
          </label>
          ${e.target==="node"?d`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${s=>{const o=s.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(s=>d`<option
                          value=${s.id}
                          ?selected=${n===s.id}
                        >
                          ${s.label}
                        </option>`)}
                  </select>
                </label>
              `:g}
        </div>
      </div>
      ${e.target==="node"&&!t?d`<div class="muted">No nodes advertise exec approvals yet.</div>`:g}
    </div>
  `}function Yh(e){return d`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Ie?"active":""}"
          @click=${()=>e.onSelectScope(Ie)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{const n=t.name?.trim()?`${t.name} (${t.id})`:t.id;return d`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function Qh(e){const t=e.selectedScope===Ie,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],o=typeof s.security=="string"?s.security:void 0,r=typeof s.ask=="string"?s.ask:void 0,c=typeof s.askFallback=="string"?s.askFallback:void 0,a=t?n.security:o??"__default__",f=t?n.ask:r??"__default__",l=t?n.askFallback:c??"__default__",p=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,h=p??n.autoAllowSkills,v=p==null;return d`
    <div class="list" style="margin-top: 16px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Security</div>
          <div class="list-sub">
            ${t?"Default security mode.":`Default: ${n.security}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${w=>{const S=w.target.value;!t&&S==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],S)}}
            >
              ${t?g:d`<option value="__default__" ?selected=${a==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${rr.map(w=>d`<option
                    value=${w.value}
                    ?selected=${a===w.value}
                  >
                    ${w.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask</div>
          <div class="list-sub">
            ${t?"Default prompt policy.":`Default: ${n.ask}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${w=>{const S=w.target.value;!t&&S==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],S)}}
            >
              ${t?g:d`<option value="__default__" ?selected=${f==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Fh.map(w=>d`<option
                    value=${w.value}
                    ?selected=${f===w.value}
                  >
                    ${w.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask fallback</div>
          <div class="list-sub">
            ${t?"Applied when the UI prompt is unavailable.":`Default: ${n.askFallback}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Fallback</span>
            <select
              ?disabled=${e.disabled}
              @change=${w=>{const S=w.target.value;!t&&S==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],S)}}
            >
              ${t?g:d`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${rr.map(w=>d`<option
                    value=${w.value}
                    ?selected=${l===w.value}
                  >
                    ${w.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":v?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${h?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${w=>{const k=w.target;e.onPatch([...i,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!v?d`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                Use default
              </button>`:g}
        </div>
      </div>
    </div>
  `}function Jh(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return d`
    <div class="row" style="margin-top: 18px; justify-content: space-between;">
      <div>
        <div class="card-title">Allowlist</div>
        <div class="card-sub">Case-insensitive glob patterns.</div>
      </div>
      <button
        class="btn btn--sm"
        ?disabled=${e.disabled}
        @click=${()=>{const s=[...n,{pattern:""}];e.onPatch(t,s)}}
      >
        Add pattern
      </button>
    </div>
    <div class="list" style="margin-top: 12px;">
      ${n.length===0?d`<div class="muted">No allowlist entries yet.</div>`:n.map((s,i)=>Xh(e,s,i))}
    </div>
  `}function Xh(e,t,n){const s=t.lastUsedAt?B(t.lastUsedAt):"never",i=t.lastUsedCommand?vs(t.lastUsedCommand,120):null,o=t.lastResolvedPath?vs(t.lastResolvedPath,120):null;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${s}</div>
        ${i?d`<div class="list-sub mono">${i}</div>`:g}
        ${o?d`<div class="list-sub mono">${o}</div>`:g}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Pattern</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${r=>{const c=r.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],c.value)}}
          />
        </label>
        <button
          class="btn btn--sm danger"
          ?disabled=${e.disabled}
          @click=${()=>{if(e.allowlist.length<=1){e.onRemove(["agents",e.selectedScope,"allowlist"]);return}e.onRemove(["agents",e.selectedScope,"allowlist",n])}}
        >
          Remove
        </button>
      </div>
    </div>
  `}function Zh(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${e.isDefault?"default agent":"agent"} ·
          ${n==="__default__"?`uses default (${t.defaultBinding??"any"})`:`override: ${e.binding}`}
        </div>
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Binding</span>
          <select
            ?disabled=${t.disabled||!i}
            @change=${o=>{const c=o.target.value.trim();t.onBindAgent(e.index,c==="__default__"?null:c)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(o=>d`<option
                  value=${o.id}
                  ?selected=${n===o.id}
                >
                  ${o.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function eg(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(c=>String(c)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function tg(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(c=>String(c)==="system.execApprovals.get"||String(c)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function ng(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:i,agents:[t]};const c=[];return r.forEach((a,f)=>{if(!a||typeof a!="object")return;const l=a,p=typeof l.id=="string"?l.id.trim():"";if(!p)return;const h=typeof l.name=="string"?l.name.trim():void 0,v=l.default===!0,k=(l.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;c.push({id:p,name:h||void 0,index:f,isDefault:v,binding:S})}),c.length===0&&c.push(t),{defaultBinding:i,agents:c}}function sg(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),i=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${typeof e.nodeId=="string"?e.nodeId:""}
          ${typeof e.remoteIp=="string"?` · ${e.remoteIp}`:""}
          ${typeof e.version=="string"?` · ${e.version}`:""}
        </div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${n?"paired":"unpaired"}</span>
          <span class="chip ${t?"chip-ok":"chip-warn"}">
            ${t?"connected":"offline"}
          </span>
          ${i.slice(0,12).map(r=>d`<span class="chip">${String(r)}</span>`)}
          ${o.slice(0,8).map(r=>d`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}function ig(e){const t=e.hello?.snapshot,n=t?.uptimeMs?Sr(t.uptimeMs):"n/a",s=t?.policy?.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:"n/a",i=(()=>{if(e.connected||!e.lastError)return null;const r=e.lastError.toLowerCase();if(!(r.includes("unauthorized")||r.includes("connect failed")))return null;const a=!!e.settings.token.trim(),f=!!e.password.trim();return!a&&!f?d`
        <div class="muted" style="margin-top: 8px;">
          This gateway requires auth. Add a token or password, then click Connect.
          <div style="margin-top: 6px;">
            <span class="mono">clawdbot dashboard --no-open</span> → tokenized URL<br />
            <span class="mono">clawdbot doctor --generate-gateway-token</span> → set token
          </div>
          <div style="margin-top: 6px;">
            <a
              class="session-link"
              href="https://docs.clawd.bot/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="Control UI auth docs (opens in new tab)"
              >Docs: Control UI auth</a
            >
          </div>
        </div>
      `:d`
      <div class="muted" style="margin-top: 8px;">
        Auth failed. Re-copy a tokenized URL with
        <span class="mono">clawdbot dashboard --no-open</span>, or update the token,
        then click Connect.
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.clawd.bot/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="Control UI auth docs (opens in new tab)"
            >Docs: Control UI auth</a
          >
        </div>
      </div>
    `})(),o=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0)!==!1)return null;const c=e.lastError.toLowerCase();return!c.includes("secure context")&&!c.includes("device identity required")?null:d`
      <div class="muted" style="margin-top: 8px;">
        This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or
        open <span class="mono">http://127.0.0.1:18789</span> on the gateway host.
        <div style="margin-top: 6px;">
          If you must stay on HTTP, set
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> (token-only).
        </div>
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.clawd.bot/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="Tailscale Serve docs (opens in new tab)"
            >Docs: Tailscale Serve</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.clawd.bot/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="Insecure HTTP docs (opens in new tab)"
            >Docs: Insecure HTTP</a
          >
        </div>
      </div>
    `})();return d`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Gateway Access</div>
        <div class="card-sub">Where the dashboard connects and how it authenticates.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>WebSocket URL</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${r=>{const c=r.target.value;e.onSettingsChange({...e.settings,gatewayUrl:c})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>Gateway Token</span>
            <input
              .value=${e.settings.token}
              @input=${r=>{const c=r.target.value;e.onSettingsChange({...e.settings,token:c})}}
              placeholder="CLAWDBOT_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>Password (not stored)</span>
            <input
              type="password"
              .value=${e.password}
              @input=${r=>{const c=r.target.value;e.onPasswordChange(c)}}
              placeholder="system or shared password"
            />
          </label>
          <label class="field">
            <span>Default Session Key</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${r=>{const c=r.target.value;e.onSessionKeyChange(c)}}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>Connect</button>
          <button class="btn" @click=${()=>e.onRefresh()}>Refresh</button>
          <span class="muted">Click Connect to apply connection changes.</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Snapshot</div>
        <div class="card-sub">Latest gateway handshake information.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Status</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?"Connected":"Disconnected"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Uptime</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Tick Interval</div>
            <div class="stat-value">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Last Channels Refresh</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?B(e.lastChannelsRefresh):"n/a"}
            </div>
          </div>
        </div>
        ${e.lastError?d`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${i??""}
              ${o??""}
            </div>`:d`<div class="callout" style="margin-top: 14px;">
              Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.
            </div>`}
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">Instances</div>
        <div class="stat-value">${e.presenceCount}</div>
        <div class="muted">Presence beacons in the last 5 minutes.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Sessions</div>
        <div class="stat-value">${e.sessionsCount??"n/a"}</div>
        <div class="muted">Recent session keys tracked by the gateway.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Cron</div>
        <div class="stat-value">
          ${e.cronEnabled==null?"n/a":e.cronEnabled?"Enabled":"Disabled"}
        </div>
        <div class="muted">Next wake ${Ia(e.cronNext)}</div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Notes</div>
      <div class="card-sub">Quick reminders for remote control setups.</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">Tailscale serve</div>
          <div class="muted">
            Prefer serve mode to keep the gateway on loopback with tailnet auth.
          </div>
        </div>
        <div>
          <div class="note-title">Session hygiene</div>
          <div class="muted">Use /new or sessions.patch to reset context.</div>
        </div>
        <div>
          <div class="note-title">Cron reminders</div>
          <div class="muted">Use isolated sessions for recurring runs.</div>
        </div>
      </div>
    </section>
  `}const og=["","off","minimal","low","medium","high"],rg=["","off","on"],ag=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"}],lg=["","off","on","stream"];function cg(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Ra(e){return cg(e)==="zai"}function dg(e){return Ra(e)?rg:og}function ug(e,t){return!t||!e||e==="off"?e:"on"}function pg(e,t){return e?t&&e==="on"?"low":e:null}function fg(e){const t=e.result?.sessions??[];return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Sessions</div>
          <div class="card-sub">Active session keys and per-session overrides.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field">
          <span>Active within (minutes)</span>
          <input
            .value=${e.activeMinutes}
            @input=${n=>e.onFiltersChange({activeMinutes:n.target.value,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field">
          <span>Limit</span>
          <input
            .value=${e.limit}
            @input=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:n.target.value,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include global</span>
          <input
            type="checkbox"
            .checked=${e.includeGlobal}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:n.target.checked,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include unknown</span>
          <input
            type="checkbox"
            .checked=${e.includeUnknown}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:n.target.checked})}
          />
        </label>
      </div>

      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:g}

      <div class="muted" style="margin-top: 12px;">
        ${e.result?`Store: ${e.result.path}`:""}
      </div>

      <div class="table" style="margin-top: 16px;">
        <div class="table-head">
          <div>Key</div>
          <div>Label</div>
          <div>Kind</div>
          <div>Updated</div>
          <div>Tokens</div>
          <div>Thinking</div>
          <div>Verbose</div>
          <div>Reasoning</div>
          <div>Actions</div>
        </div>
        ${t.length===0?d`<div class="muted">No sessions found.</div>`:t.map(n=>hg(n,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function hg(e,t,n,s,i){const o=e.updatedAt?B(e.updatedAt):"n/a",r=e.thinkingLevel??"",c=Ra(e.modelProvider),a=ug(r,c),f=dg(e.modelProvider),l=e.verboseLevel??"",p=e.reasoningLevel??"",h=e.displayName??e.key,v=e.kind!=="global",w=v?`${zs("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return d`
    <div class="table-row">
      <div class="mono">${v?d`<a href=${w} class="session-link">${h}</a>`:h}</div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="(optional)"
          @change=${k=>{const S=k.target.value.trim();n(e.key,{label:S||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${mh(e)}</div>
      <div>
        <select
          .value=${a}
          ?disabled=${i}
          @change=${k=>{const S=k.target.value;n(e.key,{thinkingLevel:pg(S,c)})}}
        >
          ${f.map(k=>d`<option value=${k}>${k||"inherit"}</option>`)}
        </select>
      </div>
      <div>
        <select
          .value=${l}
          ?disabled=${i}
          @change=${k=>{const S=k.target.value;n(e.key,{verboseLevel:S||null})}}
        >
          ${ag.map(k=>d`<option value=${k.value}>${k.label}</option>`)}
        </select>
      </div>
      <div>
        <select
          .value=${p}
          ?disabled=${i}
          @change=${k=>{const S=k.target.value;n(e.key,{reasoningLevel:S||null})}}
        >
          ${lg.map(k=>d`<option value=${k}>${k||"inherit"}</option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}function gg(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function Ue(e,t){return t?d`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:g}function mg(e){const t=e.execApprovalQueue[0];if(!t)return g;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`expires in ${gg(s)}`:"expired",o=e.execApprovalQueue.length;return d`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${o>1?d`<div class="exec-approval-queue">${o} pending</div>`:g}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${Ue("Host",n.host)}
          ${Ue("Agent",n.agentId)}
          ${Ue("Session",n.sessionKey)}
          ${Ue("CWD",n.cwd)}
          ${Ue("Resolved",n.resolvedPath)}
          ${Ue("Security",n.security)}
          ${Ue("Ask",n.ask)}
        </div>
        ${e.execApprovalError?d`<div class="exec-approval-error">${e.execApprovalError}</div>`:g}
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-once")}
          >
            Allow once
          </button>
          <button
            class="btn"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-always")}
          >
            Always allow
          </button>
          <button
            class="btn danger"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("deny")}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  `}function vg(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(i=>[i.name,i.description,i.source].join(" ").toLowerCase().includes(n)):t;return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">Bundled, managed, and workspace skills.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${i=>e.onFilterChange(i.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${s.length} shown</div>
      </div>

      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:g}

      ${s.length===0?d`<div class="muted" style="margin-top: 16px;">No skills found.</div>`:d`
            <div class="list" style="margin-top: 16px;">
              ${s.map(i=>yg(i,e))}
            </div>
          `}
    </section>
  `}function yg(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=[...e.missing.bins.map(a=>`bin:${a}`),...e.missing.env.map(a=>`env:${a}`),...e.missing.config.map(a=>`config:${a}`),...e.missing.os.map(a=>`os:${a}`)],c=[];return e.disabled&&c.push("disabled"),e.blockedByAllowlist&&c.push("blocked by allowlist"),d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${vs(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?d`<span class="chip chip-warn">disabled</span>`:g}
        </div>
        ${r.length>0?d`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${r.join(", ")}
              </div>
            `:g}
        ${c.length>0?d`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${c.join(", ")}
              </div>
            `:g}
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; flex-wrap: wrap;">
          <button
            class="btn"
            ?disabled=${n}
            @click=${()=>t.onToggle(e.skillKey,e.disabled)}
          >
            ${e.disabled?"Enable":"Disable"}
          </button>
          ${o?d`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:g}
        </div>
        ${i?d`<div
              class="muted"
              style="margin-top: 8px; color: ${i.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${i.message}
            </div>`:g}
        ${e.primaryEnv?d`
              <div class="field" style="margin-top: 10px;">
                <span>API key</span>
                <input
                  type="password"
                  .value=${s}
                  @input=${a=>t.onEdit(e.skillKey,a.target.value)}
                />
              </div>
              <button
                class="btn primary"
                style="margin-top: 8px;"
                ?disabled=${n}
                @click=${()=>t.onSaveKey(e.skillKey)}
              >
                Save key
              </button>
            `:g}
      </div>
    </div>
  `}function bg(e,t){const n=zs(t,e.basePath);return d`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${s=>{s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),e.setTab(t))}}
      title=${gs(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ql(t)}</span>
      <span class="nav-item__text">${gs(t)}</span>
    </a>
  `}function wg(e){const t=$g(e.sessionKey,e.sessionsResult),n=e.onboarding,s=e.onboarding,i=e.onboarding?!1:e.settings.chatShowThinking,o=e.onboarding?!0:e.settings.chatFocusMode,r=d`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>`,c=d`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h3"></path><path d="M20 7V4h-3"></path><path d="M4 17v3h3"></path><path d="M20 17v3h-3"></path><circle cx="12" cy="12" r="3"></circle></svg>`;return d`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${a=>{const f=a.target.value;e.sessionKey=f,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:f,lastActiveSessionKey:f}),e.loadAssistantIdentity(),Ud(e,f),lt(e)}}
        >
          ${oa(t,a=>a.key,a=>d`<option value=${a.key}>
                ${a.displayName??a.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${()=>{e.resetToolStream(),lt(e)}}
        title="Refresh chat history"
      >
        ${r}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${i?"active":""}"
        ?disabled=${n}
        @click=${()=>{n||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${i}
        title=${n?"Disabled during onboarding":"Toggle assistant thinking/working output"}
      >
        🧠
      </button>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${o}
        title=${s?"Disabled during onboarding":"Toggle focus mode (hide sidebar + page header)"}
      >
        ${c}
      </button>
    </div>
  `}function $g(e,t){const n=new Set,s=[],i=t?.sessions?.find(o=>o.key===e);if(n.add(e),s.push({key:e,displayName:i?.displayName}),t?.sessions)for(const o of t.sessions)n.has(o.key)||(n.add(o.key),s.push({key:o.key,displayName:o.displayName}));return s}const kg=["system","light","dark"];function Sg(e){const t=Math.max(0,kg.indexOf(e.theme)),n=s=>i=>{const r={element:i.currentTarget};(i.clientX||i.clientY)&&(r.pointerClientX=i.clientX,r.pointerClientY=i.clientY),e.setTheme(s,r)};return d`
    <div class="theme-toggle" style="--theme-index: ${t};">
      <div class="theme-toggle__track" role="group" aria-label="Theme">
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${e.theme==="system"?"active":""}"
          @click=${n("system")}
          aria-pressed=${e.theme==="system"}
          aria-label="System theme"
          title="System"
        >
          ${_g()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${xg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Ag()}
        </button>
      </div>
    </div>
  `}function xg(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `}function Ag(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function _g(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}const Tg=/^data:/i,Eg=/^https?:\/\//i;function Cg(e){const t=e.agentsList?.agents??[],s=br(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",o=t.find(c=>c.id===s)?.identity,r=o?.avatarUrl??o?.avatar;if(r)return Tg.test(r)||Eg.test(r)?r:o?.avatarUrl}function Ig(e){const t=e.presenceEntries.length,n=e.sessionsResult?.count??null,s=e.cronStatus?.nextWakeAtMs??null,i=e.connected?null:"Disconnected from gateway.",o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),c=e.onboarding?!1:e.settings.chatShowThinking,a=Cg(e),f=e.chatAvatarUrl??a??null;return d`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?"Expand sidebar":"Collapse sidebar"}"
            aria-label="${e.settings.navCollapsed?"Expand sidebar":"Collapse sidebar"}"
          >
            <span class="nav-collapse-toggle__icon">☰</span>
          </button>
          <div class="brand">
            <div class="brand-title">CLAWDBOT</div>
            <div class="brand-sub">Gateway Dashboard</div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>Health</span>
            <span class="mono">${e.connected?"OK":"Offline"}</span>
          </div>
          ${Sg(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${Hl.map(l=>{const p=e.settings.navGroupsCollapsed[l.label]??!1,h=l.tabs.some(v=>v===e.tab);return d`
            <div class="nav-group ${p&&!h?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const v={...e.settings.navGroupsCollapsed};v[l.label]=!p,e.applySettings({...e.settings,navGroupsCollapsed:v})}}
                aria-expanded=${!p}
              >
                <span class="nav-label__text">${l.label}</span>
                <span class="nav-label__chevron">${p?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${l.tabs.map(v=>bg(e,v))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">Resources</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.clawd.bot"
              target="_blank"
              rel="noreferrer"
              title="Docs (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">📚</span>
              <span class="nav-item__text">Docs</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            <div class="page-title">${gs(e.tab)}</div>
            <div class="page-sub">${Vl(e.tab)}</div>
          </div>
          <div class="page-meta">
            ${e.lastError?d`<div class="pill danger">${e.lastError}</div>`:g}
            ${o?wg(e):g}
          </div>
        </section>

        ${e.tab==="overview"?ig({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:e.cronStatus?.enabled??null,cronNext:s,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:l=>e.applySettings(l),onPasswordChange:l=>e.password=l,onSessionKeyChange:l=>{e.sessionKey=l,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:l,lastActiveSessionKey:l}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):g}

        ${e.tab==="channels"?ih({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:l=>de(e,l),onWhatsAppStart:l=>e.handleWhatsAppStart(l),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(l,p)=>Jt(e,l,p),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(l,p)=>e.handleNostrProfileEdit(l,p),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(l,p)=>e.handleNostrProfileFieldChange(l,p),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):g}

        ${e.tab==="instances"?Eh({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>Zs(e)}):g}

        ${e.tab==="sessions"?fg({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:l=>{e.sessionsFilterActive=l.activeMinutes,e.sessionsFilterLimit=l.limit,e.sessionsIncludeGlobal=l.includeGlobal,e.sessionsIncludeUnknown=l.includeUnknown},onRefresh:()=>pt(e),onPatch:(l,p)=>sc(e,l,p),onDelete:l=>ic(e,l)}):g}

        ${e.tab==="cron"?Sh({loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(l=>l.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:l=>e.cronForm={...e.cronForm,...l},onRefresh:()=>e.loadCron(),onAdd:()=>_c(e),onToggle:(l,p)=>Tc(e,l,p),onRun:l=>Ec(e,l),onRemove:l=>Cc(e,l),onLoadRuns:l=>Cr(e,l)}):g}

        ${e.tab==="skills"?vg({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:l=>e.skillsFilter=l,onRefresh:()=>Ut(e,{clearMessages:!0}),onToggle:(l,p)=>Sd(e,l,p),onEdit:(l,p)=>kd(e,l,p),onSaveKey:l=>xd(e,l),onInstall:(l,p,h)=>Ad(e,l,p,h)}):g}

        ${e.tab==="nodes"?Mh({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>An(e),onDevicesRefresh:()=>Me(e),onDeviceApprove:l=>pd(e,l),onDeviceReject:l=>fd(e,l),onDeviceRotate:(l,p,h)=>hd(e,{deviceId:l,role:p,scopes:h}),onDeviceRevoke:(l,p)=>gd(e,{deviceId:l,role:p}),onLoadConfig:()=>we(e),onLoadExecApprovals:()=>{const l=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Xs(e,l)},onBindDefault:l=>{l?Jt(e,["tools","exec","node"],l):uo(e,["tools","exec","node"])},onBindAgent:(l,p)=>{const h=["agents","list",l,"tools","exec","node"];p?Jt(e,h,p):uo(e,h)},onSaveBindings:()=>bs(e),onExecApprovalsTargetChange:(l,p)=>{e.execApprovalsTarget=l,e.execApprovalsTargetNodeId=p,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:l=>{e.execApprovalsSelectedAgent=l},onExecApprovalsPatch:(l,p)=>wd(e,l,p),onExecApprovalsRemove:l=>$d(e,l),onSaveExecApprovals:()=>{const l=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return bd(e,l)}}):g}

        ${e.tab==="chat"?ff({sessionKey:e.sessionKey,onSessionKeyChange:l=>{e.sessionKey=l,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:l,lastActiveSessionKey:l}),e.loadAssistantIdentity(),lt(e),xs(e)},thinkingLevel:e.chatThinkingLevel,showThinking:c,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:f,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:i,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([lt(e),xs(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:l=>e.handleChatScroll(l),onDraftChange:l=>e.chatMessage=l,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:l=>e.removeQueuedMessage(l),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:l=>e.handleOpenSidebar(l),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:l=>e.handleSplitRatioChange(l),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):g}

        ${e.tab==="config"?Kf({raw:e.configRaw,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:l=>e.configRaw=l,onFormModeChange:l=>e.configFormMode=l,onFormPatch:(l,p)=>Jt(e,l,p),onSearchChange:l=>e.configSearchQuery=l,onSectionChange:l=>{e.configActiveSection=l,e.configActiveSubsection=null},onSubsectionChange:l=>e.configActiveSubsection=l,onReload:()=>we(e),onSave:()=>bs(e),onApply:()=>kc(e),onUpdate:()=>Sc(e)}):g}

        ${e.tab==="debug"?Th({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:l=>e.debugCallMethod=l,onCallParamsChange:l=>e.debugCallParams=l,onRefresh:()=>Sn(e),onCall:()=>Mc(e)}):g}

        ${e.tab==="logs"?Lh({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:l=>e.logsFilterText=l,onLevelToggle:(l,p)=>{e.logsLevelFilters={...e.logsLevelFilters,[l]:p}},onToggleAutoFollow:l=>e.logsAutoFollow=l,onRefresh:()=>qs(e,{reset:!0}),onExport:(l,p)=>e.exportLogs(l,p),onScroll:l=>e.handleLogsScroll(l)}):g}
      </main>
      ${mg(e)}
    </div>
  `}const Rg={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Lg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"main",wakeMode:"next-heartbeat",payloadKind:"systemEvent",payloadText:"",deliver:!1,channel:"last",to:"",timeoutSeconds:"",postToMainPrefix:""};async function Mg(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});t&&(e.agentsList=t)}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}const lr={CONTROL_UI:"control-ui"},cr={WEBCHAT:"webchat"};function Pg(e){return JSON.stringify({version:1,deviceId:e.deviceId,clientId:e.clientId,clientMode:e.clientMode,role:e.role,scopes:[...e.scopes].sort(),signedAtMs:e.signedAtMs,token:e.token,nonce:e.nonce??null})}const Ng=4008;class Og{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.onopen=()=>this.queueConnect(),this.ws.onmessage=t=>this.handleMessage(String(t.data??"")),this.ws.onclose=t=>{const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),this.opts.onClose?.({code:t.code,reason:n}),this.scheduleReconnect()},this.ws.onerror=()=>{})}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,o=!1,r=this.opts.token;if(t){i=await Ys();const l=ud({deviceId:i.deviceId,role:s})?.token;r=l??this.opts.token,o=!!(l&&this.opts.token)}const c=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let a;if(t&&i){const l=Date.now(),p=this.connectNonce??void 0,h=Pg({deviceId:i.deviceId,clientId:this.opts.clientName??lr.CONTROL_UI,clientMode:this.opts.mode??cr.WEBCHAT,role:s,scopes:n,signedAtMs:l,token:r??null,nonce:p}),v=await cd(i.privateKey,h);a={id:i.deviceId,publicKey:i.publicKey,signature:v,signedAt:l,nonce:p}}const f={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??lr.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??cr.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:a,caps:[],auth:c,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",f).then(l=>{l?.auth?.deviceToken&&i&&Vr({deviceId:i.deviceId,role:l.auth.role??s,token:l.auth.deviceToken,scopes:l.auth.scopes??[]}),this.backoffMs=800,this.opts.onHello?.(l)}).catch(()=>{o&&i&&Wr({deviceId:i.deviceId,role:s}),this.ws?.close(Ng,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const r=i.payload,c=r&&typeof r.nonce=="string"?r.nonce:null;c&&(this.connectNonce=c,this.sendConnect());return}const o=typeof i.seq=="number"?i.seq:null;o!==null&&(this.lastSeq!==null&&o>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:o}),this.lastSeq=o);try{this.opts.onEvent?.(i)}catch(r){console.error("[gateway] event handler error:",r)}return}if(s.type==="res"){const i=n,o=this.pending.get(i.id);if(!o)return;this.pending.delete(i.id),i.ok?o.resolve(i.payload):o.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=Hs(),i={type:"req",id:s,method:t,params:n},o=new Promise((r,c)=>{this.pending.set(s,{resolve:a=>r(a),reject:c})});return this.ws.send(JSON.stringify(i)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Ns(e){return typeof e=="object"&&e!==null}function Dg(e){if(!Ns(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!Ns(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!o?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:o}}function Fg(e){if(!Ns(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function La(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function Bg(e,t){const n=La(e).filter(s=>s.id!==t.id);return n.push(t),n}function dr(e,t){return La(e).filter(n=>n.id!==t)}async function Ma(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const o=hs(i);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function ps(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",o=t.defaultAgentId?.trim();return n==="main"||n===i||o&&(n===`agent:${o}:main`||n===`agent:${o}:${i}`)?s:n}function Ug(e,t){if(!t?.mainSessionKey)return;const n=ps(e.sessionKey,t),s=ps(e.settings.sessionKey,t),i=ps(e.settings.lastActiveSessionKey,t),o=n||s||e.sessionKey,r={...e.settings,sessionKey:s||o,lastActiveSessionKey:i||o},c=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),c&&Ce(e,r)}function Pa(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new Og({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"clawdbot-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.hello=t,Hg(e,t),Ma(e),Mg(e),An(e,{quiet:!0}),Me(e,{quiet:!0}),oi(e)},onClose:({code:t,reason:n})=>{e.connected=!1,e.lastError=`disconnected (${t}): ${n||"no reason"}`},onEvent:t=>Kg(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function Kg(e,t){try{zg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function zg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;hc(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&Gr(e,n.sessionKey);const s=nc(e,n);(s==="final"||s==="error"||s==="aborted")&&(js(e),Wd(e)),s==="final"&&lt(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&ri(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Me(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Dg(t.payload);if(n){e.execApprovalQueue=Bg(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=dr(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=Fg(t.payload);n&&(e.execApprovalQueue=dr(e.execApprovalQueue,n.id))}}function Hg(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&Ug(e,n.sessionDefaults)}function jg(e){e.basePath=Pd(),Fd(e,!0),Nd(e),Od(e),window.addEventListener("popstate",e.popStateHandler),Rd(e),Pa(e),Cd(e),e.tab==="logs"&&ti(e),e.tab==="debug"&&si(e)}function qg(e){bc(e)}function Vg(e){window.removeEventListener("popstate",e.popStateHandler),Id(e),ni(e),ii(e),Dd(e),e.topbarObserver?.disconnect(),e.topbarObserver=null}function Wg(e,t){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&e.chatLoading===!1;$n(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Ar(e,t.has("tab")||t.has("logsAutoFollow"))}async function Gg(e,t){await Ic(e,t),await de(e,!0)}async function Yg(e){await Rc(e),await de(e,!0)}async function Qg(e){await Lc(e),await de(e,!0)}async function Jg(e){await bs(e),await we(e),await de(e,!0)}async function Xg(e){await we(e),await de(e,!0)}function Zg(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const o=s.trim(),r=i.join(":").trim();o&&r&&(t[o]=r)}return t}function Na(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function Oa(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function em(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Xf(n??void 0)}function tm(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function nm(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function sm(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function im(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Na(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(Oa(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const o=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Zg(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await de(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function om(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Na(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(Oa(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const a=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:a,success:null};return}const o=i.merged??i.imported??null,r=o?{...t.values,...o}:t.values,c=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:c},i.saved&&await de(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}var rm=Object.defineProperty,am=Object.getOwnPropertyDescriptor,b=(e,t,n,s)=>{for(var i=s>1?void 0:s?am(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(s?r(t,n,i):r(i))||i);return s&&i&&rm(t,n,i),i};const fs=Ul();function lm(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let y=class extends rt{constructor(){super(...arguments),this.settings=Kl(),this.password="",this.tab="chat",this.onboarding=lm(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=fs.name,this.assistantAvatar=fs.avatar,this.assistantAgentId=fs.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Lg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Rg},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.basePath="",this.popStateHandler=()=>Bd(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),jg(this)}firstUpdated(){qg(this)}disconnectedCallback(){Vg(this),super.disconnectedCallback()}updated(e){Wg(this,e)}connect(){Pa(this)}handleChatScroll(e){gc(this,e)}handleLogsScroll(e){mc(this,e)}exportLogs(e,t){yc(e,t)}resetToolStream(){js(this)}resetChatScroll(){vc(this)}async loadAssistantIdentity(){await Ma(this)}applySettings(e){Ce(this,e)}setTab(e){Ld(this,e)}setTheme(e,t){Md(this,e,t)}async loadOverview(){await Jr(this)}async loadCron(){await ri(this)}async handleAbortChat(){await Zr(this)}removeQueuedMessage(e){jd(this,e)}async handleSendChat(e,t){await qd(this,e,t)}async handleWhatsAppStart(e){await Gg(this,e)}async handleWhatsAppWait(){await Yg(this)}async handleWhatsAppLogout(){await Qg(this)}async handleChannelConfigSave(){await Jg(this)}async handleChannelConfigReload(){await Xg(this)}handleNostrProfileEdit(e,t){em(this,e,t)}handleNostrProfileCancel(){tm(this)}handleNostrProfileFieldChange(e,t){nm(this,e,t)}async handleNostrProfileSave(){await im(this)}async handleNostrProfileImport(){await om(this)}handleNostrProfileToggleAdvanced(){sm(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return Ig(this)}};b([$()],y.prototype,"settings",2);b([$()],y.prototype,"password",2);b([$()],y.prototype,"tab",2);b([$()],y.prototype,"onboarding",2);b([$()],y.prototype,"connected",2);b([$()],y.prototype,"theme",2);b([$()],y.prototype,"themeResolved",2);b([$()],y.prototype,"hello",2);b([$()],y.prototype,"lastError",2);b([$()],y.prototype,"eventLog",2);b([$()],y.prototype,"assistantName",2);b([$()],y.prototype,"assistantAvatar",2);b([$()],y.prototype,"assistantAgentId",2);b([$()],y.prototype,"sessionKey",2);b([$()],y.prototype,"chatLoading",2);b([$()],y.prototype,"chatSending",2);b([$()],y.prototype,"chatMessage",2);b([$()],y.prototype,"chatMessages",2);b([$()],y.prototype,"chatToolMessages",2);b([$()],y.prototype,"chatStream",2);b([$()],y.prototype,"chatStreamStartedAt",2);b([$()],y.prototype,"chatRunId",2);b([$()],y.prototype,"compactionStatus",2);b([$()],y.prototype,"chatAvatarUrl",2);b([$()],y.prototype,"chatThinkingLevel",2);b([$()],y.prototype,"chatQueue",2);b([$()],y.prototype,"sidebarOpen",2);b([$()],y.prototype,"sidebarContent",2);b([$()],y.prototype,"sidebarError",2);b([$()],y.prototype,"splitRatio",2);b([$()],y.prototype,"nodesLoading",2);b([$()],y.prototype,"nodes",2);b([$()],y.prototype,"devicesLoading",2);b([$()],y.prototype,"devicesError",2);b([$()],y.prototype,"devicesList",2);b([$()],y.prototype,"execApprovalsLoading",2);b([$()],y.prototype,"execApprovalsSaving",2);b([$()],y.prototype,"execApprovalsDirty",2);b([$()],y.prototype,"execApprovalsSnapshot",2);b([$()],y.prototype,"execApprovalsForm",2);b([$()],y.prototype,"execApprovalsSelectedAgent",2);b([$()],y.prototype,"execApprovalsTarget",2);b([$()],y.prototype,"execApprovalsTargetNodeId",2);b([$()],y.prototype,"execApprovalQueue",2);b([$()],y.prototype,"execApprovalBusy",2);b([$()],y.prototype,"execApprovalError",2);b([$()],y.prototype,"configLoading",2);b([$()],y.prototype,"configRaw",2);b([$()],y.prototype,"configValid",2);b([$()],y.prototype,"configIssues",2);b([$()],y.prototype,"configSaving",2);b([$()],y.prototype,"configApplying",2);b([$()],y.prototype,"updateRunning",2);b([$()],y.prototype,"applySessionKey",2);b([$()],y.prototype,"configSnapshot",2);b([$()],y.prototype,"configSchema",2);b([$()],y.prototype,"configSchemaVersion",2);b([$()],y.prototype,"configSchemaLoading",2);b([$()],y.prototype,"configUiHints",2);b([$()],y.prototype,"configForm",2);b([$()],y.prototype,"configFormOriginal",2);b([$()],y.prototype,"configFormDirty",2);b([$()],y.prototype,"configFormMode",2);b([$()],y.prototype,"configSearchQuery",2);b([$()],y.prototype,"configActiveSection",2);b([$()],y.prototype,"configActiveSubsection",2);b([$()],y.prototype,"channelsLoading",2);b([$()],y.prototype,"channelsSnapshot",2);b([$()],y.prototype,"channelsError",2);b([$()],y.prototype,"channelsLastSuccess",2);b([$()],y.prototype,"whatsappLoginMessage",2);b([$()],y.prototype,"whatsappLoginQrDataUrl",2);b([$()],y.prototype,"whatsappLoginConnected",2);b([$()],y.prototype,"whatsappBusy",2);b([$()],y.prototype,"nostrProfileFormState",2);b([$()],y.prototype,"nostrProfileAccountId",2);b([$()],y.prototype,"presenceLoading",2);b([$()],y.prototype,"presenceEntries",2);b([$()],y.prototype,"presenceError",2);b([$()],y.prototype,"presenceStatus",2);b([$()],y.prototype,"agentsLoading",2);b([$()],y.prototype,"agentsList",2);b([$()],y.prototype,"agentsError",2);b([$()],y.prototype,"sessionsLoading",2);b([$()],y.prototype,"sessionsResult",2);b([$()],y.prototype,"sessionsError",2);b([$()],y.prototype,"sessionsFilterActive",2);b([$()],y.prototype,"sessionsFilterLimit",2);b([$()],y.prototype,"sessionsIncludeGlobal",2);b([$()],y.prototype,"sessionsIncludeUnknown",2);b([$()],y.prototype,"cronLoading",2);b([$()],y.prototype,"cronJobs",2);b([$()],y.prototype,"cronStatus",2);b([$()],y.prototype,"cronError",2);b([$()],y.prototype,"cronForm",2);b([$()],y.prototype,"cronRunsJobId",2);b([$()],y.prototype,"cronRuns",2);b([$()],y.prototype,"cronBusy",2);b([$()],y.prototype,"skillsLoading",2);b([$()],y.prototype,"skillsReport",2);b([$()],y.prototype,"skillsError",2);b([$()],y.prototype,"skillsFilter",2);b([$()],y.prototype,"skillEdits",2);b([$()],y.prototype,"skillsBusyKey",2);b([$()],y.prototype,"skillMessages",2);b([$()],y.prototype,"debugLoading",2);b([$()],y.prototype,"debugStatus",2);b([$()],y.prototype,"debugHealth",2);b([$()],y.prototype,"debugModels",2);b([$()],y.prototype,"debugHeartbeat",2);b([$()],y.prototype,"debugCallMethod",2);b([$()],y.prototype,"debugCallParams",2);b([$()],y.prototype,"debugCallResult",2);b([$()],y.prototype,"debugCallError",2);b([$()],y.prototype,"logsLoading",2);b([$()],y.prototype,"logsError",2);b([$()],y.prototype,"logsFile",2);b([$()],y.prototype,"logsEntries",2);b([$()],y.prototype,"logsFilterText",2);b([$()],y.prototype,"logsLevelFilters",2);b([$()],y.prototype,"logsAutoFollow",2);b([$()],y.prototype,"logsTruncated",2);b([$()],y.prototype,"logsCursor",2);b([$()],y.prototype,"logsLastFetchAt",2);b([$()],y.prototype,"logsLimit",2);b([$()],y.prototype,"logsMaxBytes",2);b([$()],y.prototype,"logsAtBottom",2);y=b([vr("clawdbot-app")],y);
//# sourceMappingURL=index-CfPDenIQ.js.map
