const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o=null;function n(o){t.disabled=o,e.disabled=!o}function a(){n(!0),o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)}n(!1),t.addEventListener("click",(()=>a())),e.addEventListener("click",(()=>(n(!1),clearInterval(o),void(document.body.style.backgroundColor="#fafafa"))));
//# sourceMappingURL=01-color-switcher.46a10918.js.map
