import{a as G}from"./chunk-FGL3AQVM.js";import{M as J,X as P,Y as A,Z as H,_ as h,da as V}from"./chunk-2V6UCU3L.js";import{k as w,m as N,n as O,o as B,s as z}from"./chunk-D3LPHSJ7.js";import{Db as C,Eb as S,Ha as i,Kb as q,Lb as R,Ra as D,S as M,T as Q,Ta as E,Xa as c,Y as F,Za as k,_a as r,aa as x,ba as I,cb as $,hb as f,ib as u,kb as v,lb as b,mb as y,oa as T,tb as _,ub as j,vb as g,wb as p,yb as d,zb as s}from"./chunk-GG2QCC6U.js";var L=({dt:e})=>`
.p-card {
    background: ${e("card.background")};
    color: ${e("card.color")};
    box-shadow: ${e("card.shadow")};
    border-radius: ${e("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${e("card.caption.gap")};
}

.p-card-body {
    padding: ${e("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${e("card.body.gap")};
}

.p-card-title {
    font-size: ${e("card.title.font.size")};
    font-weight: ${e("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${e("card.subtitle.color")};
}
`,U={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},K=(()=>{class e extends V{name="card";theme=L;classes=U;static \u0275fac=(()=>{let t;return function(n){return(t||(t=T(e)))(n||e)}})();static \u0275prov=M({token:e,factory:e.\u0275fac})}return e})();var W=["header"],X=["title"],Y=["subtitle"],Z=["content"],ee=["footer"],te=["*",[["p-header"]],[["p-footer"]]],ne=["*","p-header","p-footer"];function ae(e,o){e&1&&y(0)}function ie(e,o){if(e&1&&(f(0,"div",8),g(1,1),c(2,ae,1,0,"ng-container",6),u()),e&2){let t=_();i(2),r("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function re(e,o){if(e&1&&(v(0),C(1),b()),e&2){let t=_(2);i(),S(t.header)}}function oe(e,o){e&1&&y(0)}function le(e,o){if(e&1&&(f(0,"div",9),c(1,re,2,1,"ng-container",10)(2,oe,1,0,"ng-container",6),u()),e&2){let t=_();i(),r("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),i(),r("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function ce(e,o){if(e&1&&(v(0),C(1),b()),e&2){let t=_(2);i(),S(t.subheader)}}function pe(e,o){e&1&&y(0)}function de(e,o){if(e&1&&(f(0,"div",11),c(1,ce,2,1,"ng-container",10)(2,pe,1,0,"ng-container",6),u()),e&2){let t=_();i(),r("ngIf",t.subheader&&!t._subtitleTemplate&&t.subtitleTemplate),i(),r("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function se(e,o){e&1&&y(0)}function me(e,o){e&1&&y(0)}function fe(e,o){if(e&1&&(f(0,"div",12),g(1,2),c(2,me,1,0,"ng-container",6),u()),e&2){let t=_();i(2),r("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var ue=(()=>{class e extends G{header;subheader;set style(t){J(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=D(null);_componentStyle=F(K);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=T(e)))(n||e)}})();static \u0275cmp=x({type:e,selectors:[["p-card"]],contentQueries:function(l,n,m){if(l&1&&(p(m,P,5),p(m,A,5),p(m,W,4),p(m,X,4),p(m,Y,4),p(m,Z,4),p(m,ee,4),p(m,H,4)),l&2){let a;d(a=s())&&(n.headerFacet=a.first),d(a=s())&&(n.footerFacet=a.first),d(a=s())&&(n.headerTemplate=a.first),d(a=s())&&(n.titleTemplate=a.first),d(a=s())&&(n.subtitleTemplate=a.first),d(a=s())&&(n.contentTemplate=a.first),d(a=s())&&(n.footerTemplate=a.first),d(a=s())&&(n.templates=a)}},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},standalone:!0,features:[q([K]),E,R],ngContentSelectors:ne,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[4,"ngIf"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(l,n){l&1&&(j(te),f(0,"div",0),c(1,ie,3,1,"div",1),f(2,"div",2),c(3,le,3,2,"div",3)(4,de,3,2,"div",4),f(5,"div",5),g(6),c(7,se,1,0,"ng-container",6),u(),c(8,fe,3,1,"div",7),u()()),l&2&&($(n.styleClass),r("ngClass","p-card p-component")("ngStyle",n._style()),k("data-pc-name","card"),i(),r("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),i(2),r("ngIf",n.header||n.titleTemplate||n._titleTemplate),i(),r("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),i(3),r("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),i(),r("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[z,w,N,B,O,h],encapsulation:2,changeDetection:0})}return e})(),$e=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=I({type:e});static \u0275inj=Q({imports:[ue,h,h]})}return e})();export{ue as a,$e as b};
