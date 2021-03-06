!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define('lib/maquette',["exports"],r):r(e.maquette={})}(this,function(e){"use strict";var r,t="http://www.w3.org/2000/svg",n=[],o=function(e,r){var t={};return Object.keys(e).forEach(function(r){t[r]=e[r]}),r&&Object.keys(r).forEach(function(e){t[e]=r[e]}),t},i=function(e,r){return e.vnodeSelector===r.vnodeSelector&&(e.properties&&r.properties?e.properties.key===r.properties.key&&e.properties.bind===r.properties.bind:!e.properties&&!r.properties)},a=function(e){if("string"!=typeof e)throw Error("Style values must be strings")},d=function(e,r,t){if(""!==r.vnodeSelector)for(var n=t;n<e.length;n++)if(i(e[n],r))return n;return-1},p=function(e,r,t,n){var o=e[r];if(""!==o.vnodeSelector){var a=o.properties;if(!(a?void 0===a.key?a.bind:a.key:void 0))for(var d=0;d<e.length;d++)if(d!==r){var p=e[d];if(i(p,o))throw Error(t.vnodeSelector+" had a "+o.vnodeSelector+" child "+("added"===n?n:"removed")+", but there is now more than one. You must add unique key properties to make them distinguishable.")}}},s=function(e){if(e.properties){var r=e.properties.enterAnimation;r&&r(e.domNode,e.properties)}},c=[],f=!1,u=function(e){(e.children||[]).forEach(u),e.properties&&e.properties.afterRemoved&&e.properties.afterRemoved.apply(e.properties.bind||e.properties,[e.domNode])},l=function(){f=!1,c.forEach(u),c.length=0},v=function(e){c.push(e),f||(f=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(l,{timeout:16}):setTimeout(l,16))},h=function(e){var r=e.domNode;if(e.properties){var t=e.properties.exitAnimation;if(t)return r.style.pointerEvents="none",void t(r,function(){r.parentNode&&(r.parentNode.removeChild(r),v(e))},e.properties)}r.parentNode&&(r.parentNode.removeChild(r),v(e))},m=function(e,r,n){if(r)for(var o=n.eventHandlerInterceptor,i=Object.keys(r),d=i.length,p=0;d>p;p++)!function(d){var p=i[d],s=r[p];if("className"===p)throw Error('Property "className" is not supported, use "class".');if("class"===p)s.split(/\s+/).forEach(function(r){return e.classList.add(r)});else if("classes"===p)for(var c=Object.keys(s),f=c.length,u=0;f>u;u++){var l=c[u];s[l]&&e.classList.add(l)}else if("styles"===p)for(var v=Object.keys(s),h=v.length,u=0;h>u;u++){var m=v[u],g=s[m];g&&(a(g),n.styleApplyer(e,m,g))}else if("key"!==p&&null!==s&&void 0!==s){var y=typeof s;"function"===y?0===p.lastIndexOf("on",0)&&(o&&(s=o(p,s,e,r)),"oninput"===p&&function(){var e=s;s=function(r){e.apply(this,[r]),r.target["oninput-value"]=r.target.value}}(),e[p]=s):"string"===y&&"value"!==p&&"innerHTML"!==p?n.namespace===t&&"href"===p?e.setAttributeNS("http://www.w3.org/1999/xlink",p,s):e.setAttribute(p,s):e[p]=s}}(p)},g=function(e,r,t){if(r)for(var n=0,o=r;n<o.length;n++){var i=o[n];N(i,e,void 0,t)}},y=function(e,r,t){g(e,r.children,t),r.text&&(e.textContent=r.text),m(e,r.properties,t),r.properties&&r.properties.afterCreate&&r.properties.afterCreate.apply(r.properties.bind||r.properties,[e,t,r.vnodeSelector,r.properties,r.children])},N=function(e,r,n,i){var a,d=0,p=e.vnodeSelector,s=r.ownerDocument;if(""===p)a=e.domNode=s.createTextNode(e.text),void 0!==n?r.insertBefore(a,n):r.appendChild(a);else{for(var c=0;c<=p.length;++c){var f=p.charAt(c);if(c===p.length||"."===f||"#"===f){var u=p.charAt(d-1),l=p.slice(d,c);"."===u?a.classList.add(l):"#"===u?a.id=l:("svg"===l&&(i=o(i,{namespace:t})),void 0!==i.namespace?a=e.domNode=s.createElementNS(i.namespace,l):(a=e.domNode=e.domNode||s.createElement(l),"input"===l&&e.properties&&void 0!==e.properties.type&&a.setAttribute("type",e.properties.type)),void 0!==n?r.insertBefore(a,n):a.parentNode!==r&&r.appendChild(a)),d=c+1}}y(a,e,i)}},w=function(e,r,t){r&&r.split(" ").forEach(function(r){return e.classList.toggle(r,t)})},b=function(e,r,n,o){if(n){for(var i=!1,d=Object.keys(n),p=d.length,s=0;p>s;s++){var c=d[s],f=n[c],u=r[c];if("class"===c)u!==f&&(w(e,u,!1),w(e,f,!0));else if("classes"===c)for(var l=e.classList,v=Object.keys(f),h=v.length,m=0;h>m;m++){var g=v[m],y=!!f[g];y!==!!u[g]&&(i=!0,y?l.add(g):l.remove(g))}else if("styles"===c)for(var N=Object.keys(f),b=N.length,m=0;b>m;m++){var x=N[m],A=f[x];A!==u[x]&&(i=!0,A?(a(A),o.styleApplyer(e,x,A)):o.styleApplyer(e,x,""))}else if(f||"string"!=typeof u||(f=""),"value"===c){var S=e[c];S!==f&&(e["oninput-value"]?S===e["oninput-value"]:f!==u)&&(e[c]=f,e["oninput-value"]=void 0),f!==u&&(i=!0)}else if(f!==u){var k=typeof f;"function"===k&&o.eventHandlerInterceptor||("string"===k&&"innerHTML"!==c?o.namespace===t&&"href"===c?e.setAttributeNS("http://www.w3.org/1999/xlink",c,f):"role"===c&&""===f?e.removeAttribute(c):e.setAttribute(c,f):e[c]!==f&&(e[c]=f),i=!0)}}return i}},x=function(e,t,o,a,c){if(o===a)return!1;o=o||n,a=a||n;for(var f,u=o.length,l=a.length,v=0,m=0,g=!1;l>m;){var y=u>v?o[v]:void 0,w=a[m];if(void 0!==y&&i(y,w))g=r(y,w,c)||g,v++;else{var b=d(o,w,v+1);if(0>b)N(w,t,u>v?o[v].domNode:void 0,c),s(w),p(a,m,e,"added");else{for(f=v;b>f;f++)h(o[f]),p(o,f,e,"removed");g=r(o[b],w,c)||g,v=b+1}}m++}if(u>v)for(f=v;u>f;f++)h(o[f]),p(o,f,e,"removed");return g};r=function(e,r,n){var i=e.domNode,a=!1;if(e===r)return!1;var d=!1;if(""===r.vnodeSelector){if(r.text!==e.text){var p=i.ownerDocument.createTextNode(r.text);return i.parentNode.replaceChild(p,i),r.domNode=p,a=!0}r.domNode=i}else 0===r.vnodeSelector.lastIndexOf("svg",0)&&(n=o(n,{namespace:t})),e.text!==r.text&&(d=!0,void 0===r.text?i.removeChild(i.firstChild):i.textContent=r.text),r.domNode=i,d=x(r,i,e.children,r.children,n)||d,d=b(i,e.properties,r.properties,n)||d,r.properties&&r.properties.afterUpdate&&r.properties.afterUpdate.apply(r.properties.bind||r.properties,[i,n,r.vnodeSelector,r.properties,r.children]);return d&&r.properties&&r.properties.updateAnimation&&r.properties.updateAnimation(i,r.properties,e.properties),a};var A,S=function(e,t){return{getLastRender:function(){return e},update:function(n){if(e.vnodeSelector!==n.vnodeSelector)throw Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");var o=e;e=n,r(o,n,t)},domNode:e.domNode}},k={namespace:void 0,performanceLogger:function(){},eventHandlerInterceptor:void 0,styleApplyer:function(e,r,t){e.style[r]=t}},E=function(e){return o(k,e)},C={create:function(e,r){return r=E(r),N(e,document.createElement("div"),void 0,r),S(e,r)},append:function(e,r,t){return t=E(t),N(r,e,void 0,t),S(r,t)},insertBefore:function(e,r,t){return t=E(t),N(r,e.parentNode,e,t),S(r,t)},merge:function(e,r,t){return t=E(t),r.domNode=e,y(e,r,t),S(r,t)},replace:function(e,r,t){return t=E(t),N(r,e.parentNode,e,t),e.parentNode.removeChild(e),S(r,t)}},O=function(e){return{vnodeSelector:"",properties:void 0,children:void 0,text:""+e,domNode:null}},j=function(e,r,t){for(var n=0,o=r.length;o>n;n++){var i=r[n];Array.isArray(i)?j(e,i,t):null!==i&&void 0!==i&&("string"==typeof i&&(i=O(i)),t.push(i))}},L=function(e,r){for(var t=[];e!==r;)t.push(e),e=e.parentNode;return t};A=Array.prototype.find?function(e,r){return e.find(r)}:function(e,r){return e.filter(r)[0]};var I=function(e,r){var t=e;return r.forEach(function(e){t=t&&t.children?A(t.children,function(r){return r.domNode===e}):void 0}),t},R=function(e,r,t){var n=function(n){t("domEvent",n);var o=r(),i=L(n.currentTarget,o.domNode);i.reverse();var a=I(o.getLastRender(),i);e.scheduleRender();var d;return a&&(d=a.properties["on"+n.type].apply(a.properties.bind||this,arguments)),t("domEventProcessed",n),d};return function(e,r,t,o){return n}};e.dom=C,e.h=function(e,r,t){if(Array.isArray(r))t=r,r=void 0;else if(r&&("string"==typeof r||r.hasOwnProperty("vnodeSelector"))||t&&("string"==typeof t||t.hasOwnProperty("vnodeSelector")))throw Error("h called with invalid arguments");var n,o;return void 0!==t&&1===t.length&&"string"==typeof t[0]?n=t[0]:t&&(j(e,t,o=[]),0===o.length&&(o=void 0)),{vnodeSelector:e,properties:r,children:o,text:""===n?void 0:n,domNode:null}},e.createProjector=function(e){var r,t,n=E(e),o=n.performanceLogger,i=!0,a=!1,d=[],p=[],s=function(e,t,i){var a;n.eventHandlerInterceptor=R(r,function(){return a},o),a=e(t,i(),n),d.push(a),p.push(i)},c=function(){if(t=void 0,i){i=!1,o("renderStart",void 0);for(var e=0;e<d.length;e++){var r=p[e]();o("rendered",void 0),d[e].update(r),o("patched",void 0)}o("renderDone",void 0),i=!0}};return r={renderNow:c,scheduleRender:function(){t||a||(t=requestAnimationFrame(c))},stop:function(){t&&(cancelAnimationFrame(t),t=void 0),a=!0},resume:function(){a=!1,i=!0,r.scheduleRender()},append:function(e,r){s(C.append,e,r)},insertBefore:function(e,r){s(C.insertBefore,e,r)},merge:function(e,r){s(C.merge,e,r)},replace:function(e,r){s(C.replace,e,r)},detach:function(e){for(var r=0;r<p.length;r++)if(p[r]===e)return p.splice(r,1),d.splice(r,1)[0];throw Error("renderFunction was not found")}}},e.createCache=function(){var e,r;return{invalidate:function(){r=void 0,e=void 0},result:function(t,n){if(e)for(var o=0;o<t.length;o++)e[o]!==t[o]&&(r=void 0);return r||(r=n(),e=t),r}}},e.createMapping=function(e,r,t){var n=[],o=[];return{results:o,map:function(i){for(var a=i.map(e),d=o.slice(),p=0,s=0;s<i.length;s++){var c=i[s],f=a[s];if(f===n[p])o[s]=d[p],t(c,d[p],s),p++;else{for(var u=!1,l=1;l<n.length+1;l++){var v=(p+l)%n.length;if(n[v]===f){o[s]=d[v],t(i[s],d[v],s),p=v+1,u=!0;break}}u||(o[s]=r(c,s))}}o.length=i.length,n=a}}},Object.defineProperty(e,"__esModule",{value:!0})});

require(["lib/maquette"], function(maquette){

var h = maquette.h;
var projector = maquette.createProjector();

var word_count = 0;
var word_target = 300;
var text = "";
var text_split = null;

var editorBold = false;
var editorItalic = false;
var editorUnderline = false;

function handleInput(e) {
	text = e.target.innerText;
	if (text) {
		text_split = text.match(/\S+/g); 
		if (text_split) {
			word_count = text_split.length;
		} else {
			word_count = 0;
		}
	} else {
		word_count = 0;
	}
}

function sidebar() {
	return h('div#sidebar', [
		playerFrame("Robert", 120),
		playerFrame("Agda", 90),
		playerFrame("Suzie", 220)
	]);
}

function toggleFontBold(e) {
	editorBold = !editorBold;
}

function toggleFontItalic(e) {
	editorItalic = !editorItalic;
}

function toggleFontUnderline(e) {
	editorUnderline = !editorUnderline;
}

function playerFrame(name, words) {
	return h('div.player-frame',[
		h('div.name', [""+name]),
		h('div.progress-bar',[
			h('p',[words+"/"+word_target]),
			h('div',{style: "width: "+ (words/word_target*100) + "%"})
		])
	]);
}

function editorButtons() {
	return [
		h('div.font-button.bold', {
			classes: {
				"active": editorBold
			},
			onclick: toggleFontBold
		}, ['B']),
		h('div.font-button.italic', {
			classes: {
				"active": editorItalic
			},
			onclick: toggleFontItalic
		}, ['I']),
		h('div.font-button.underline', {
			classes: {
				"active": editorUnderline
			},
			onclick: toggleFontUnderline
		}, ['U']),
	]
}

function topBar() {
	return h('div#top-bar', 
		editorButtons().concat(
			[h('p', [`Words: ${word_count} / ${word_target}`])]
		)
	);
}

function editor() {
	return h('div.sidebar-margin#editor', [
		topBar(),
		h('div#paper', {
			"oninput": handleInput,
			"contenteditable": "true",
			"placeholder": "Once upon a time..."
		})
	]);
}

function render() {
	return h('div', [
		sidebar(),
		editor()
	]);
}


document.addEventListener('DOMContentLoaded', function() {
	projector.append(document.body, render);
});

});

define("scripts", function(){});

define('main',['lib/maquette','./scripts'],function (){
	require("lib/maquette");
	require("./scripts");
});

