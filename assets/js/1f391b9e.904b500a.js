"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[61],{3933:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var a=n(6540),r=n(53),l=n(7941),c=n(5680),o=n(5582),s=n(1461),i=n(5988);const m="mdxPageWrapper_3qD3";const d=function(e){var t=e.content,n=t.frontMatter,d=t.metadata,u=n.title,f=n.description,v=n.wrapperClassName,p=n.hide_table_of_contents,E=d.permalink;return a.createElement(l.A,{title:u,description:f,permalink:E,wrapperClassName:null!=v?v:i.GN.wrapper.mdxPages,pageClassName:i.GN.page.mdxPage},a.createElement("main",{className:"container container--fluid margin-vert--lg"},a.createElement("div",{className:(0,r.A)("row",m)},a.createElement("div",{className:(0,r.A)("col",!p&&"col--8")},a.createElement(c.xA,{components:o.A},a.createElement(t,null))),!p&&t.toc&&a.createElement("div",{className:"col col--2"},a.createElement(s.A,{toc:t.toc})))))}},1461:(e,t,n)=>{n.d(t,{m:()=>s,A:()=>i});var a=n(6540),r=n(53);const l=function(e,t,n){var r=(0,a.useState)(void 0),l=r[0],c=r[1];(0,a.useEffect)((function(){function a(){var a=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=n}));if(t){if(t.getBoundingClientRect().top>=n){var a=e[e.indexOf(t)-1];return null!=a?a:t}return t}return e[e.length-1]}();if(a)for(var r=0,o=!1,s=document.getElementsByClassName(e);r<s.length&&!o;){var i=s[r],m=i.href,d=decodeURIComponent(m.substring(m.indexOf("#")+1));a.id===d&&(l&&l.classList.remove(t),i.classList.add(t),c(i),o=!0),r+=1}}return document.addEventListener("scroll",a),document.addEventListener("resize",a),a(),function(){document.removeEventListener("scroll",a),document.removeEventListener("resize",a)}}))},c="tableOfContents_35-E";var o="table-of-contents__link";function s(e){var t=e.toc,n=e.isChild;return t.length?a.createElement("ul",{className:n?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return a.createElement("li",{key:e.id},a.createElement("a",{href:"#"+e.id,className:o,dangerouslySetInnerHTML:{__html:e.value}}),a.createElement(s,{isChild:!0,toc:e.children}))}))):null}const i=function(e){var t=e.toc;return l(o,"table-of-contents__link--active",100),a.createElement("div",{className:(0,r.A)(c,"thin-scrollbar")},a.createElement(s,{toc:t}))}}}]);