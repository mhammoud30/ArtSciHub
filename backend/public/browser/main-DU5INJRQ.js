import{f as L,g as l,h as y,m as W,n as A,p as Y,u as Z}from"./chunk-WRR7LER4.js";import{a as R}from"./chunk-TJTVD3I2.js";import{a as g,b as x,c as U,d as B,g as V}from"./chunk-AE3RA7K3.js";import{b as z}from"./chunk-XMZMSNLM.js";import"./chunk-XAZLOLJU.js";import"./chunk-PKDV3UHM.js";import{b as H,c as k}from"./chunk-2XIXCD3A.js";import{d as f,o as j}from"./chunk-JRF5FON3.js";import{Aa as d,Db as T,Ha as _,Ja as O,La as u,Oa as h,P as M,S as p,V as D,X as c,Y as a,aa as C,cb as w,db as b,ea as S,eb as P,fa as E,k as N,ta as m,y as F}from"./chunk-KYQM6NPR.js";import"./chunk-4CLCTAJ7.js";var G=[{path:"",loadChildren:()=>import("./chunk-GEKKNDIB.js").then(o=>o.PUBLIC_ROUTES)},{path:"portal",loadChildren:()=>import("./chunk-NOXOQIPG.js").then(o=>o.PORTAL_ROUTES),canActivate:[()=>a(R).isUser()]},{path:"admin",loadChildren:()=>import("./chunk-NTPTSHYE.js").then(o=>o.ADMIN_ROUTES),canActivate:[()=>a(R).isAdmin()]}];var X=(o,t)=>{let e=a(B),r=localStorage.getItem("auth_token"),n=["/auth/login","/auth/register","/public"].some(i=>o.url.includes(i));if(!r||n)return t(o);let s=o.clone({headers:o.headers.set("Authorization",`Bearer ${r}`)});return t(s).pipe(F(i=>(i.status===401&&(localStorage.removeItem("auth_token"),e.navigate(["/login"])),i.status===403&&e.navigate(["/portal"]),N(()=>i))))};var te=(()=>{class o extends A{constructor(e,r,n){super(e,r,n)}ngOnDestroy(){this.flush()}static{this.\u0275fac=function(r){return new(r||o)(c(f),c(l),c(y))}}static{this.\u0275prov=p({token:o,factory:o.\u0275fac})}}return o})();function re(){return new W}function oe(o,t,e){return new Z(o,t,e)}var q=[{provide:y,useFactory:re},{provide:A,useClass:te},{provide:u,useFactory:oe,deps:[g,A,m]}],ne=[{provide:l,useFactory:()=>new Y},{provide:d,useValue:"BrowserAnimations"},...q],Ce=[{provide:l,useClass:L},{provide:d,useValue:"NoopAnimations"},...q];function J(){return h("NgEagerAnimations"),[...ne]}var ie="@",se=(()=>{class o{constructor(e,r,n,s,i){this.doc=e,this.delegate=r,this.zone=n,this.animationType=s,this.moduleImpl=i,this._rendererFactoryPromise=null,this.scheduler=a(O,{optional:!0}),this.loadingSchedulerFn=a(ae,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-MGGSVZ5Y.js").then(n=>n),r;return this.loadingSchedulerFn?r=this.loadingSchedulerFn(e):r=e(),r.catch(n=>{throw new M(5300,!1)}).then(({\u0275createEngine:n,\u0275AnimationRendererFactory:s})=>{this._engine=n(this.animationType,this.doc);let i=new s(this.delegate,this._engine,this.zone);return this.delegate=i,i})}createRenderer(e,r){let n=this.delegate.createRenderer(e,r);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new I(n);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(i=>{let ee=i.createRenderer(e,r);s.use(ee),this.scheduler?.notify(10)}).catch(i=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){_()}}static{this.\u0275prov=p({token:o,factory:o.\u0275fac})}}return o})(),I=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,r,n){this.delegate.insertBefore(t,e,r,n)}removeChild(t,e,r){this.delegate.removeChild(t,e,r)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,r,n){this.delegate.setAttribute(t,e,r,n)}removeAttribute(t,e,r){this.delegate.removeAttribute(t,e,r)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,r,n){this.delegate.setStyle(t,e,r,n)}removeStyle(t,e,r){this.delegate.removeStyle(t,e,r)}setProperty(t,e,r){this.shouldReplay(e)&&this.replay.push(n=>n.setProperty(t,e,r)),this.delegate.setProperty(t,e,r)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,r){return this.shouldReplay(e)&&this.replay.push(n=>n.listen(t,e,r)),this.delegate.listen(t,e,r)}shouldReplay(t){return this.replay!==null&&t.startsWith(ie)}},ae=new D("");function K(o="animations"){return h("NgAsyncAnimations"),S([{provide:u,useFactory:(t,e,r)=>new se(t,e,r,o),deps:[f,g,m]},{provide:d,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Q={providers:[V(G),H(k([X])),J(),E(z),K()]};var v=class o{title="frontend";static \u0275fac=function(e){return new(e||o)};static \u0275cmp=C({type:o,selectors:[["app-root"]],standalone:!0,features:[T],decls:2,vars:0,template:function(e,r){e&1&&(w(0,"main"),P(1,"router-outlet"),b())},dependencies:[j,U]})};x(v,Q).catch(o=>console.error(o));