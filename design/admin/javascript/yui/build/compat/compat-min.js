/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("compat",function(D){var S="~yui|2|compat~";if(window.YAHOO!=YUI){var M=(window.YAHOO)?YUI.merge(window.YAHOO):null;window.YAHOO=YUI;if(M){D.mix(D,M);}}D.namespace("util","widget","example");D.env=(D.env)?D.mix(D.env,D.Env):D.Env;D.lang=(D.lang)?D.mix(D.lang,D.Lang):D.Lang;D.env.ua=D.UA;D.mix(D.env,{modules:[],listeners:[],getVersion:function(L){return this.Env.modules[L]||null;}});var G=D.lang;D.mix(G,{augmentObject:function(V,U){var L=arguments,W=(L.length>2)?D.Array(L,2,true):null;return D.mix(V,U,(W),W);},augmentProto:function(V,U){var L=arguments,W=(L.length>2)?D.Array(L,2,true):null;return D.mix(V,U,(W),W,1);},extend:D.extend,merge:D.merge},true);G.augment=G.augmentProto;G.hasOwnProperty=function(U,L){return(U.hasOwnProperty(L));};D.augmentProto=G.augmentProto;D.mix(D,{register:function(L,X,W){var c=D.Env.modules;if(!c[L]){c[L]={versions:[],builds:[]};}var U=c[L],a=W.version,Z=W.build,Y=D.Env.listeners;U.name=L;U.version=a;U.build=Z;U.versions.push(a);U.builds.push(Z);U.mainClass=X;for(var V=0;V<Y.length;V=V+1){Y[V](U);}if(X){X.VERSION=a;X.BUILD=Z;}else{}}});if("undefined"!==typeof YAHOO_config){var O=YAHOO_config.listener,E=D.Env.listeners,B=true,Q;if(O){for(Q=0;Q<E.length;Q=Q+1){if(E[Q]==O){B=false;break;}}if(B){E.push(O);}}}D.register("yahoo",D,{version:"3.0.0",build:"1549"});if(D.Event){var M={isSafari:D.UA.webkit,webkit:D.UA.webkit,webkitKeymap:{63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},isIE:D.UA.ie,_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var V=D.config.doc,L=V.documentElement,U=V.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft];}else{if(U){return[U.scrollTop,U.scrollLeft];}else{return[0,0];}}},getPageX:function(U){var L=U.pageX;if(!L&&0!==L){L=U.clientX||0;if(D.UA.ie){L+=this._getScrollLeft();}}return L;},getCharCode:function(U){var L=U.keyCode||U.charCode||0;if(D.UA.webkit&&(L in D.Event.webkitKeymap)){L=D.Event.webkitKeymap[L];}return L;},getPageY:function(L){var U=L.pageY;if(!U&&0!==U){U=L.clientY||0;if(D.UA.ie){U+=this._getScrollTop();}}return U;},getXY:function(L){return[this.getPageX(L),this.getPageY(L)];},getRelatedTarget:function(U){var L=U.relatedTarget;if(!L){if(U.type=="mouseout"){L=U.toElement;}else{if(U.type=="mouseover"){L=U.fromElement;}}}return this.resolveTextNode(L);},getTime:function(V){if(!V.time){var U=new Date().getTime();try{V.time=U;}catch(L){this.lastError=L;return U;}}return V.time;},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L);},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation();}else{L.cancelBubble=true;}},preventDefault:function(L){if(L.preventDefault){L.preventDefault();}else{L.returnValue=false;}},getTarget:function(V,U){var L=V.target||V.srcElement;return this.resolveTextNode(L);},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode;}else{return L;}},getEl:function(L){return D.get(L);}};D.mix(D.Event,M);D.Event.removeListener=function(Y,X,W,Z,V){var U,L=[X,W,Y];if(Z){if(V){U=(V===true)?Z:V;}L.push(U);L.push(Z);}L.push(S);return D.Event.detach.apply(D.Event,L);};D.Event.addListener=function(Y,X,W,Z,V){var U,L=[X,W,Y];if(Z){if(V){U=(V===true)?Z:V;}L.push(U);L.push(Z);}L.push(S);return D.Event.attach.apply(D.Event,L);};D.Event.on=D.Event.addListener;var T=D.Event.onAvailable;D.Event.onAvailable=function(W,L,V,U){return T(W,L,V,U,false,true);};D.Event.onContentReady=function(W,L,V,U){return T(W,L,V,U,true,true);};D.Event.onDOMReady=function(U){var L=D.Array(arguments,0,true);L.unshift("event:ready");return D.on.apply(D,L);};D.util.Event=D.Event;var F=function(W,U,V,L){var X={context:U,silent:V||false};F.superclass.constructor.call(this,W,X);this.signature=L||F.LIST;};D.extend(F,D.CustomEvent,{});F.LIST=0;F.FLAT=1;D.util.CustomEvent=F;var R=function(){if(!this._yuievt){var L=this.subscribe;D.EventTarget.apply(this,arguments);this.subscribe=L;this.__yuiepinit=function(){};}};D.extend(R,D.EventTarget,{createEvent:function(L,U){U=U||{};U.signature=U.signature||F.FLAT;return this.publish(L,U);},subscribe:function(W,V,Y,U){var X=this._yuievt.events[W]||this.createEvent(W),L=D.Array(arguments);if(U&&true!==U){}D.EventTarget.prototype.subscribe.apply(this,L);},fireEvent:function(L){return this.fire.apply(this,arguments);},hasEvent:function(L){return this.getEvent(L);}});D.util.EventProvider=R;}D.register("event",D,{version:"3.0.0",build:"1549"});var P={};var C={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var I=function(L){if(!C.HYPHEN.test(L)){return L;}if(P[L]){return P[L];}var U=L;while(C.HYPHEN.exec(U)){U=U.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}P[L]=U;return U;};var A={get:function(V){if(V){if(V.nodeType||V.item){return V;}if(typeof V==="string"){return document.getElementById(V);}if("length" in V){var W=[];for(var U=0,L=V.length;U<L;++U){W[W.length]=A.get(V[U]);}return W;}return V;}return null;},isAncestor:function(L,U){return YUI.DOM.contains(A.get(L),A.get(U));},inDocument:function(L){return A.isAncestor(D.config.doc.documentElement,L);},batch:function(W,L,V,U,a){W=(W&&(W.tagName||W.item))?W:A.get(W);if(!W||!L){return false;}if(a){a=D.Array(a);}var c=(U)?V:window;var b=function(e){if(a){var d=N.call(a);d.unshift(e);return L.apply(c,d);}else{return L.call(c,e,V);}};if(W.tagName||W.length===undefined){return b(W);}var Y=[];for(var X=0,Z=W.length;X<Z;++X){Y[Y.length]=b(W[X]);}return Y;},_addClass:function(U,L){if(YUI.DOM.hasClass(U,L)){return false;}YUI.DOM.addClass(U,L);return true;},_removeClass:function(U,L){if(!YUI.DOM.hasClass(U,L)){return false;}YUI.DOM.removeClass(U,L);return true;},_replaceClass:function(U,L,V){if(!V||L===V){return false;}YUI.DOM.replaceClass(U,L,V);return true;},getElementsByClassName:function(W,L,U){L=L||"*";U=(U)?A.get(U):D.config.doc;var V=[];if(U){V=D.Selector.query(L+"."+W,U);}return V;},getElementsBy:function(W,L,U){L=L||"*";U=(U)?A.get(U):null||document;var V=[];
if(U){V=YUI.DOM.byTag(L,U,W);}return V;},getViewportWidth:YUI.DOM.winWidth,getViewportHeight:YUI.DOM.winHeight,getDocumentWidth:YUI.DOM.docWidth,getDocumentHeight:YUI.DOM.docHeight,getDocumentScrollTop:YUI.DOM.docScrollY,getDocumentScrollLeft:YUI.DOM.docScrollX,getDocumentHeight:YUI.DOM.docHeight,_guid:function(L,U){U=U||"yui-gen";A._id_counter=A._id_counter||0;if(L&&L.id){return L.id;}var V=U+A._id_counter++;if(L){L.id=V;}return V;},_region:function(L){if((L.parentNode===null||L.offsetParent===null||YUI.DOM.getStyle(L,"display")=="none")&&L!=L.ownerDocument.body){return false;}return YUI.DOM.region(L);},_ancestorByClass:function(L,U){return YUI.DOM.ancestor(L,function(V){return YUI.DOM.hasClass(V,U);});},_ancestorByTag:function(U,L){L=L.toUpperCase();return YUI.DOM.ancestor(U,function(V){return V.tagName.toUpperCase()===L;});}};var N=[].slice;var H=function(U,L){A[L]=function(){var V=N.call(arguments);V[0]=A.get(V[0]);return U.apply(A,V);};};var J={getAncestorBy:YUI.DOM.ancestor,getAncestorByClassName:A._ancestorByClass,getAncestorByTagName:A._ancestorByTag,getPreviousSiblingBy:YUI.DOM.previous,getPreviousSibling:YUI.DOM.previous,getNextSiblingBy:YUI.DOM.next,getNextSibling:YUI.DOM.next,getFirstChildBy:YUI.DOM.firstChild,getFirstChild:YUI.DOM.firstChild,getLastChildBy:YUI.DOM.lastChild,getLastChild:YUI.DOM.lastChild,getChildrenBy:YUI.DOM.children,getChildren:YUI.DOM.children,insertBefore:function(U,L){YUI.DOM.insertBefore(A.get(U),A.get(L));},insertAfter:function(U,L){YUI.DOM.insertAfter(A.get(U),A.get(L));}};D.each(J,H);var K={getStyle:YUI.DOM.getStyle,setStyle:YUI.DOM.setStyle,getXY:YUI.DOM.getXY,setXY:YUI.DOM.setXY,getX:YUI.DOM.getX,getY:YUI.DOM.getY,setX:YUI.DOM.setX,setY:YUI.DOM.setY,getRegion:A._region,hasClass:YUI.DOM.hasClass,addClass:A._addClass,removeClass:A._removeClass,replaceClass:A._replaceClass,generateId:A._guid};D.each(K,function(L,U){A[U]=function(W){var V=N.call(arguments,1);return A.batch(W,L,null,null,V);};});D.util.Dom=A;YAHOO.util.Region=function(V,W,L,U){this.top=V;this[1]=V;this.right=W;this.bottom=L;this.left=U;this[0]=U;};YAHOO.util.Region.prototype.contains=function(L){return(L.left>=this.left&&L.right<=this.right&&L.top>=this.top&&L.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(X){var V=Math.max(this.top,X.top);var W=Math.min(this.right,X.right);var L=Math.min(this.bottom,X.bottom);var U=Math.max(this.left,X.left);if(L>=V&&W>=U){return new YAHOO.util.Region(V,W,L,U);}else{return null;}};YAHOO.util.Region.prototype.union=function(X){var V=Math.min(this.top,X.top);var W=Math.max(this.right,X.right);var L=Math.max(this.bottom,X.bottom);var U=Math.min(this.left,X.left);return new YAHOO.util.Region(V,W,L,U);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(L){return YUI.DOM.region(L);};YAHOO.util.Point=function(L,U){if(YAHOO.lang.isArray(L)){U=L[1];L=L[0];}this.x=this.right=this.left=this[0]=L;this.y=this.top=this.bottom=this[1]=U;};YAHOO.util.Point.prototype=new YAHOO.util.Region();},"3.0.0",{requires:["dom","event"]});YUI._setup();YUI.use("dom","event","compat");