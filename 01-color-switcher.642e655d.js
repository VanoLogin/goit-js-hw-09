const t=document.body.style.backgroundColor,e=document.getElementById("data-start"),d=document.getElementById("data-stop"),a=document.getElementById("data-return");e.addEventListener("click",(()=>{e.disabled=!0;const n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3);d.addEventListener("click",(()=>{clearInterval(n),e.disabled=!1})),a.addEventListener("click",(()=>(clearInterval(n),e.disabled=!1,document.body.style.backgroundColor=t)))}));
//# sourceMappingURL=01-color-switcher.642e655d.js.map