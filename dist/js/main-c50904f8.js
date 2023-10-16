(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const p of c.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();class H extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
            <style>
              .products-info {
                background-color: black;
                color: #FCF7E6;
                border-radius: 4px;
                padding: 1rem;
                margin-bottom: 3rem;
                max-width: 100%;
                font-family: 'Space Grotesk', sans-serif;
              }
              .summary {
                display: flex;
                gap: 12px;
              }
              .attention-sign {
                display: flex;
                gap:2px; 
                justify-content: center;
                align-items: center;
              }
              .alert-circle {
                margin-right: 4px;
              }
              .alpha {
                font-size: 1rem;
                font-weight: 700;
              }
              .message  {
                font-size: 500;
                font-size: 0.75rem;
                padding-top: 0.25rem;
                flex-grow: 1;
              }
              .arrow-down {
                cursor: pointer;
              }
            </style>
            <details class="products-info">
                <summary class="summary">
                    <div class="attention-sign">
                        <img class="alert-circle" src="./assets/alert-circle.svg" alt="alert circle">
                        <span class="alpha">ALPHA</span>
                    </div>
                    <p class="message">Important info regarding our service</p>
                    <img class="arrow-down" src="./assets/chevron-down.svg" alt="arrow down">
                </summary>
                <p>
                    <slot></slot>
                </p>
            </details>
        `}}customElements.define("custom-disclosure",H);const O=461,u=1,A=24,l=Math.ceil(O/A),a=5,I=document.querySelector(".products-list"),d=document.querySelector(".pagination"),f=document.querySelector(".cart-list"),w=document.querySelector(".cart-aside"),j=document.querySelector(".cart-icon"),D=document.querySelector(".close-cart"),v=document.querySelector(".main-content"),_=document.querySelector(".total-amount");let r=1;const R="https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_72c7d7cb-344c-4f62-ad0d-f75ec755894d.jpg?v=1670516960",o=[];let y=0,h=null;async function F(e){const t=`https://voodoo-sandbox.myshopify.com/products.json?limit=${A}&page=${e}`;try{const s=await fetch(t);if(!s.ok)throw new Error(`Network response was not ok: ${s.status}`);return await s.json()}catch(s){throw s}}function N(e,t){let s="";e.forEach(n=>{const i=n.images[0]&&n.images[0].src||R;s+=`<li class= "flex flex-col w-300" id=${n.id} data-product-id=${n.id}>
        <div class="w-300 h-300">
        <img class="src object-fit rounded" data-product-src="${i}" src="${i}">
        </div>
        <div class="flex justify-between my-3 text-sm">
          <div class="flex flex-col font-bold">
            <p class="first-letter:uppercase title">${n.title}</p>
            <div class="flex">
              <span class="price mr-2">${n.variants[0].price}</span>
              <span>KR.</span>
            </div>
          </div>
          <div class="flex flex-col font-normal">
          <span> Condition </span>
          <span> Slightly used </span>
          </div>
        </div>
        <button type="button" data-product-id=${n.id} class="add-button bg-black text-white py-4 font-grotesk font-bold text-sm rounded">ADD TO CART</button>
    </li>`}),t.innerHTML=s}async function L(e){try{const t=await F(e);N(t.products,I)}catch(t){console.error("Error:",t)}}function G(e,t){let s=[];for(let n=e;n<=t;n++)s.push(n);return s}function E(){d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center' id=${u}>${u}</li>`,d.innerHTML+='<li class="pagination-ellipsis-back border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center">...</li>'}function x(e){e.forEach(t=>{d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${t}>${t}</li>`})}function T(){d.innerHTML+='<li class="pagination-ellipsis-forward border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center">...</li>',d.innerHTML+=`<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${l}>${l}</li>`}function S(e,t){const s=G(e,t);d.innerHTML="",r===u&&r<=a&&(x(s),t<=l-a&&T()),r>=a+1&&r<=l-a&&(E(),x(s),T()),r>=l-a+1&&r<=l&&(E(),x(s)),q(r)}function P(e){let t,s;e==="forward"&&(t=r+a,s=t+a-1),e==="back"&&(t=r-a,s=r-1),!(t>l||t<1)&&(r=t,L(r),S(t,s))}function q(e){console.log(e);let t=document.getElementById(e);console.log(t),t&&(h&&h.classList.remove("bg-black","text-white"),t.classList.add("bg-black","text-white"),h=t)}function $(e){f.innerHTML="";let t=document.getElementById(`${e}`);if(t){const s=o.findIndex(n=>n.id===t.id);if(s!==-1)o[s].quantity++;else{let n=t.querySelector(".title"),i=t.querySelector(".price"),c=t.querySelector(".src"),p=n.textContent,C=i.textContent,k=c.getAttribute("data-product-src");o.push({id:t.id,title:p,price:C,src:k,quantity:1})}}b(o)}function M(e){f.innerHTML="";const t=o.findIndex(s=>s.id===e);t!==-1&&o.splice(t,1),b(o)}function U(e){f.innerHTML="";const t=o.findIndex(s=>s.id===e);t!==-1&&(o[t].quantity>1?o[t].quantity--:M(e)),b(o)}function b(e){y=0;for(const t of e)y+=t.quantity*parseFloat(t.price);return _.textContent=y.toFixed(2)}function g(e){e.length>0?e.forEach(t=>{f.innerHTML+=`<li data-product-id=${t.id} class="text-sm flex flex-row gap-5 mb-10">
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
    </li>`}):f.innerHTML+="<p>There are no products yet </p>"}function m(e,t){e.classList.toggle(t)}document.addEventListener("DOMContentLoaded",()=>{L(u),S(u,a),d.addEventListener("click",e=>{if(e.target.classList.contains("pagination-ellipsis-forward")&&P("forward"),e.target.classList.contains("pagination-ellipsis-back")&&P("back"),e.target.classList.contains("page")){const t=parseInt(e.target.textContent,10);t>=u&&t<=l&&(r=t,L(r),q(`${r}`))}}),I.addEventListener("click",e=>{if(e.target.classList.contains("add-button")){const t=e.target.getAttribute("data-product-id");$(t),g(o)}}),f.addEventListener("click",e=>{if(e.target.classList.contains("add-product")){const t=e.target.getAttribute("data-product-id");$(t),g(o)}if(e.target.classList.contains("decrease-product-quantity")){const t=e.target.getAttribute("data-product-id");U(t),g(o)}if(e.target.classList.contains("delete-product")){const t=e.target.getAttribute("data-product-id");console.log(t),M(t),g(o)}}),j.addEventListener("click",e=>{m(w,"hidden"),m(v,"invisible")}),D.addEventListener("click",e=>{m(w,"hidden"),m(v,"invisible")})});
