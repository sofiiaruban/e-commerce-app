(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const p of c.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();const j=461,u=1,A=24,l=Math.ceil(j/A),a=5,I=document.querySelector(".products-list"),d=document.querySelector(".pagination"),f=document.querySelector(".cart-list"),w=document.querySelector(".cart-aside"),k=document.querySelector(".cart-icon"),H=document.querySelector(".close-cart"),v=document.querySelector(".main-content"),_=document.querySelector(".total-amount");let r=1;const D="https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_72c7d7cb-344c-4f62-ad0d-f75ec755894d.jpg?v=1670516960",o=[];let y=0,h=null;async function R(e){const t=`https://voodoo-sandbox.myshopify.com/products.json?limit=${A}&page=${e}`;try{const n=await fetch(t);if(!n.ok)throw new Error(`Network response was not ok: ${n.status}`);return await n.json()}catch(n){throw n}}function N(e,t){let n="";e.forEach(s=>{const i=s.images[0]&&s.images[0].src||D;n+=`<li class= "flex flex-col w-300" id=${s.id} data-product-id=${s.id}>
        <div class="w-300 h-300">
        <img class="src object-fit rounded" data-product-src="${i}" src="${i}">
        </div>
        <div class="flex justify-between my-3 text-sm">
          <div class="flex flex-col font-bold">
            <p class="first-letter:uppercase title">${s.title}</p>
            <div class="flex">
              <span class="price mr-2">${s.variants[0].price}</span>
              <span>KR.</span>
            </div>
          </div>
          <div class="flex flex-col font-normal">
          <span> Condition </span>
          <span> Slightly used </span>
          </div>
        </div>
        <button type="button" data-product-id=${s.id} class="add-button bg-black text-white py-4 font-grotesk font-bold text-sm rounded">ADD TO CART</button>
    </li>`}),t.innerHTML=n}async function L(e){try{const t=await R(e);N(t.products,I)}catch(t){console.error("Error:",t)}}function F(e,t){let n=[];for(let s=e;s<=t;s++)n.push(s);return n}function T(){d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center' id=${u}>${u}</li>`,d.innerHTML+='<li class="pagination-ellipsis-back border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center">...</li>'}function x(e){e.forEach(t=>{d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${t}>${t}</li>`})}function E(){d.innerHTML+='<li class="pagination-ellipsis-forward border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center">...</li>',d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${l}>${l}</li>`}function S(e,t){const n=F(e,t);d.innerHTML="",r===u&&r<=a&&(x(n),t<=l-a&&E()),r>=a+1&&r<=l-a&&(T(),x(n),E()),r>=l-a+1&&r<=l&&(T(),x(n)),q(r)}function P(e){let t,n;e==="forward"&&(t=r+a,n=t+a-1),e==="back"&&(t=r-a,n=r-1),!(t>l||t<1)&&(r=t,L(r),S(t,n))}function q(e){console.log(e);let t=document.getElementById(e);console.log(t),t&&(h&&h.classList.remove("bg-black","text-white"),t.classList.add("bg-black","text-white"),h=t)}function $(e){f.innerHTML="";let t=document.getElementById(`${e}`);if(t){const n=o.findIndex(s=>s.id===t.id);if(n!==-1)o[n].quantity++;else{let s=t.querySelector(".title"),i=t.querySelector(".price"),c=t.querySelector(".src"),p=s.textContent,C=i.textContent,O=c.getAttribute("data-product-src");o.push({id:t.id,title:p,price:C,src:O,quantity:1})}}b(o)}function M(e){f.innerHTML="";const t=o.findIndex(n=>n.id===e);t!==-1&&o.splice(t,1),b(o)}function U(e){f.innerHTML="";const t=o.findIndex(n=>n.id===e);t!==-1&&(o[t].quantity>1?o[t].quantity--:M(e)),b(o)}function b(e){y=0;for(const t of e)y+=t.quantity*parseFloat(t.price);return _.textContent=y.toFixed(2)}function g(e){e.length>0?e.forEach(t=>{f.innerHTML+=`<li data-product-id=${t.id} class="text-sm flex flex-row gap-5 mb-10">
      <img class="w-20 h-20 " src=${t.src} alt="product">
      <div class="product-info grow">
        <p class="first-letter:uppercase mb-3">${t.title}</p>
        <div class="flex flex-col">
           <div class="flex mb-3">
            <span class="mr-2">${t.price}</span>
            <span>KR.</span>
            </div>
           <span class="decrease-product-quantity cursor-pointer" data-product-id=${t.id}>-<span>
           <span class="px-1">${t.quantity}</span>
           <span class="add-product cursor-pointer" data-product-id=${t.id}>+<span>
         </div>
      </div>
      <div>
        <img class="delete-product cursor-pointer align-top" data-product-id=${t.id} src="./assets/trash-can.svg" alt="trash-can">
      </div>  
    </li>`}):f.innerHTML+="<p>There are no products yet </p>"}function m(e,t){e.classList.toggle(t)}document.addEventListener("DOMContentLoaded",()=>{L(u),S(u,a),d.addEventListener("click",e=>{if(e.target.classList.contains("pagination-ellipsis-forward")&&P("forward"),e.target.classList.contains("pagination-ellipsis-back")&&P("back"),e.target.classList.contains("page")){const t=parseInt(e.target.textContent,10);t>=u&&t<=l&&(r=t,L(r),q(`${r}`))}}),I.addEventListener("click",e=>{if(e.target.classList.contains("add-button")){const t=e.target.getAttribute("data-product-id");$(t),g(o)}}),f.addEventListener("click",e=>{if(e.target.classList.contains("add-product")){const t=e.target.getAttribute("data-product-id");$(t),g(o)}if(e.target.classList.contains("decrease-product-quantity")){const t=e.target.getAttribute("data-product-id");U(t),g(o)}if(e.target.classList.contains("delete-product")){const t=e.target.getAttribute("data-product-id");console.log(t),M(t),g(o)}}),k.addEventListener("click",e=>{m(w,"hidden"),m(v,"invisible")}),H.addEventListener("click",e=>{m(w,"hidden"),m(v,"invisible")})});
