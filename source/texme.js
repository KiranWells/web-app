/* Texme.js from https://github.com/susam/texme/. @liscense MIT */

!function(){"use strict";var t,d={},m={};d.setDefaultOptions=function(){m.renderOnLoad=!0,m.useMathJax=!0,m.protectMath=!0,m.style="viewer",m.onRenderPage=void 0,m.commonmarkURL="https://cdn.jsdelivr.net/npm/commonmark@0.29.2/dist/commonmark.min.js",m.MathJaxURL="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"};d.setOption=function(e,n){m[e]=n};function e(e,n){var t=window.document.createElement("script");t.src=e,t.onload=n,window.document.head.appendChild(t)}d.tokenType={MARK:0,MASK:1},d.tokenLiteral={MASK:"::MASK::"};var c={plain:["body {","  color: #333;","}","main {","  max-width: 40em;","  margin-left: auto;","  margin-right: auto;","}","h1, h2, h3, h4, h5, h6, h7 {","  margin-top: 1.2em;","  margin-bottom: 0.5em;","}","a:link, a:visited {","  color: #03c;","  text-decoration: none;","}","a:hover, a:active {","  color: #03f;","  text-decoration: underline;","}","img {","  max-width: 100%;","}","pre, code, samp, kbd {","  font-family: monospace,monospace;","  font-size: 0.9em;","  color: #009;","}","pre code, pre samp, pre kbd {","  font-size: 1em;","}","pre {","  padding: 0.5em;","  overflow: auto;","  background: #eee;","}","blockquote {","  border-left: medium solid #ccc;","  margin-left: 0;","  margin-right: 0;","  padding: 0.5em;","  background: #eee;","}","blockquote *:first-child {","  margin-top: 0;","}","blockquote *:last-child {","  margin-bottom: 0;","}"].join("\n"),viewer:["@media screen and (min-width: 40em) {","  body {","    background: #444;","  }","  main {","    background: #fff;","    padding: 5em 6em;","    margin: 1em auto;","    box-shadow: 0.4em 0.4em 0.4em #222;","  }","}"].join("\n"),none:""};c.viewer=c.plain+c.viewer,d.tokenize=function(e){for(var n,t,o=["\\\\begin{(.*)}([\\s\\S]*?)\\\\end{\\1}","\\\\\\[[\\s\\S]*?\\\\\\]","\\\\\\([\\s\\S]*?\\\\\\)","\\\\\\$","\\$\\$(?:[^\\\\]|\\\\.)*?\\$\\$","\\$(?:[^$\\\\]|\\\\.)+?\\$",d.tokenLiteral.MASK].join("|"),i=new RegExp(o,"g"),r=[],a=0;null!==(n=i.exec(e));)n.index>a&&(t=e.substring(a,n.index),r.push([d.tokenType.MARK,t])),void 0!==n[1]&&n[1].startsWith("md")?r.push([d.tokenType.MARK,n[2]]):r.push([d.tokenType.MASK,n[0]]),a=i.lastIndex;return t=e.substring(a),e.length>a&&r.push([d.tokenType.MARK,t]),r},d.mask=function(e){for(var n,t,o=[],i=[],r=0;r<e.length;r++)n=e[r][0],t=e[r][1],n===d.tokenType.MARK?o.push(t):(o.push(d.tokenLiteral.MASK),i.push(t));return{text:o.join(""),tokenValues:i}},d.unmask=function(e,n){var t=new RegExp(d.tokenLiteral.MASK,"g"),o=0;return e.replace(t,function(){return n[o++]})},d.renderCommonMark=function(e){var n=(new t.Parser).parse(e);return(new t.HtmlRenderer).render(n)},d.protectMathAndRenderCommonMark=function(e){var n=d.tokenize(e),t=d.mask(n),o=d.renderCommonMark(t.text);return d.unmask(o,t.tokenValues)},d.render=function(e){return m.protectMath?d.protectMathAndRenderCommonMark(e):d.renderCommonMark(e)},d.renderPage=function(){var e,n,t=window.document.getElementsByTagName("textarea"),o=window.document.createElement("main");0<t.length?(e=t[0].value.trim(),t[0].remove()):(e=window.document.body.innerHTML.trim(),window.document.body.innerHTML=""),void 0!==window.document.title&&""!==window.document.title||(n=e.split("\n",1)[0].replace(/^\s*#*\s*|\s*#*\s*$/g,""),window.document.title=n),window.document.body.appendChild(o);var i=window.document.createElement("style"),r=c[m.style];i.appendChild(window.document.createTextNode(r)),window.document.head.appendChild(i);var a=window.document.createElement("meta");a.name="viewport",a.content="width=device-width; initial-scale=1.0",window.document.head.appendChild(a),o.innerHTML=d.render(e),m.useMathJax&&window.MathJax.typeset(),void 0!==m.onRenderPage&&m.onRenderPage()},d.main=function(){d.setDefaultOptions(),"undefined"!=typeof window?(function(){for(var e in m)"undefined"!=typeof window&&void 0!==window.texme&&void 0!==window.texme[e]&&(m[e]=window.texme[e])}(),e(m.commonmarkURL,function(){t=window.commonmark}),m.useMathJax&&(window.MathJax={tex:{inlineMath:[["$","$"],["\\(","\\)"]],tags:"ams"},startup:{typeset:!1}},e(m.MathJaxURL)),m.renderOnLoad&&(window.onload=d.renderPage),window.texme=d):(t=require("commonmark"),module.exports=d)},d.main()}();

// custom code for this site, mostly to add all-page content
let temp = window.onload || (() =>{})
window.onload = () =>
{
  temp();
  let footer = document.createElement("footer"); 
  footer.innerHTML = `
  <div class="links">
    <a href="/index.html">Home</a>
    <a href="/Math251">Math 251</a>
    <a href="/Math308">Math 308</a>
  </div>
  <div class="disclaimer">
    If you feel any content on this site is your intellectual property, 
    feel free to 
    <a href='m&#97;i&#108;to&#58;Ki%72&#97;&#37;6EW%6&#53;lls&#49;0%30&#56;&#64;gm%61i%6C&#46;c&#111;&#37;6&#68;'>email me</a>. 
    I will remove it if necessary.
  </div>
    `;
  document.body.firstChild.appendChild(footer);

}