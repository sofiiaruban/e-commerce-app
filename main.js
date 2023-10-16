import './style.css'

const TOTAL_PRODUCTS = 461;
const DEFAULT_PAGE = 1;
const LIMIT_PER_PAGE = 24;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / LIMIT_PER_PAGE);
const PAGINATION_STEP = 5;
const productsList = document.querySelector('.products-list');
const pagination = document.querySelector('.pagination');
const cartList = document.querySelector('.cart-list');
const cartAside = document.querySelector('.cart-aside');
const cartIcon = document.querySelector('.cart-icon');
const closeCartIcon = document.querySelector('.close-cart');
const mainContent = document.querySelector('.main-content');
const totalAmount = document.querySelector('.total-amount');

let currentPage = 1;
const dummyImg =
  'https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_72c7d7cb-344c-4f62-ad0d-f75ec755894d.jpg?v=1670516960'

const cart = [];
let total = 0;
let previousPage = null;

// products list display functions

async function fetchProducts (currentPage) {
  const API_URL = `https://voodoo-sandbox.myshopify.com/products.json?limit=${LIMIT_PER_PAGE}&page=${currentPage}`

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}

function addProductsToDOM(products, list) {
  let productListHTML = ''
  products.forEach((product) => {
    const imageSrc = (product.images[0] && product.images[0].src) || dummyImg;
    productListHTML += `<li class= "flex flex-col w-300" id=${product.id} data-product-id=${product.id}>
        <div class="w-300 h-300">
        <img class="src object-fit rounded" data-product-src="${imageSrc}" src="${imageSrc}">
        </div>
        <div class="flex justify-between my-3 text-sm">
          <div class="flex flex-col font-bold">
            <p class="first-letter:uppercase title">${product.title}</p>
            <div class="flex">
              <span class="price mr-2">${product.variants[0].price}</span>
              <span>KR.</span>
            </div>
          </div>
          <div class="flex flex-col font-normal">
          <span> Condition </span>
          <span> Slightly used </span>
          </div>
        </div>
        <button type="button" data-product-id=${product.id} class="add-button bg-black text-white py-4 font-grotesk font-bold text-sm rounded">ADD TO CART</button>
    </li>`
  })
  list.innerHTML = productListHTML;
}

async function fetchAndDisplayProducts(currentPage) {
  try {
    const data = await fetchProducts(currentPage);
    addProductsToDOM(data.products, productsList);
  } catch (error) {
    console.error('Error:', error);
  }
}

//pagination

function getPagesList(start, end) {
  let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  return pages;
}

function getPaginationStart(){
  pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center' id=${DEFAULT_PAGE}>${DEFAULT_PAGE}</li>`
  pagination.innerHTML +=
    '<li class="pagination-ellipsis-back border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center">...</li>';
}

function getPaginationPages(pagesList) {
  pagesList.forEach((page) => {
    pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${page}>${page}</li>`
  })
}

function getPaginationEnd(){
  pagination.innerHTML +='<li class="pagination-ellipsis-forward border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center">...</li>';
  pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center' id=${TOTAL_PAGES}>${TOTAL_PAGES}</li>`
}

function displayPagination(start, end) {
  const pages = getPagesList(start, end);
  pagination.innerHTML = '';

  if (currentPage === DEFAULT_PAGE 
    && currentPage <= PAGINATION_STEP) {
    getPaginationPages(pages);
    if (end <= TOTAL_PAGES - PAGINATION_STEP) {
      getPaginationEnd();
    }
  }

  if (
    currentPage >= PAGINATION_STEP + 1 &&
    currentPage <= TOTAL_PAGES - PAGINATION_STEP
  ) {
    getPaginationStart();
    getPaginationPages(pages);
    getPaginationEnd();
  }

  if (currentPage >= TOTAL_PAGES - PAGINATION_STEP + 1 
    && currentPage <= TOTAL_PAGES) {
    getPaginationStart();
    getPaginationPages(pages);
  } 
  setCurrentPageStyle(currentPage);
}

function swapPages(direction) {
  let newStart;
  let newEnd; 

  if (direction === "forward") {
    newStart = currentPage + PAGINATION_STEP;
    newEnd = newStart + PAGINATION_STEP - 1;
  }

  if (direction === "back") {
   newStart = currentPage - PAGINATION_STEP;
   newEnd = currentPage-1;
  }

  if (newStart > TOTAL_PAGES || newStart < 1) {
    return
  }
  currentPage = newStart;
  fetchAndDisplayProducts(currentPage);
  displayPagination(newStart, newEnd);
}
function setCurrentPageStyle(currentPage) {
  console.log(currentPage)
  let page = document.getElementById(currentPage);
  console.log(page)
  if (page) {
     if (previousPage) {
       previousPage.classList.remove('bg-black', 'text-white')
     }

     page.classList.add('bg-black', 'text-white')
     previousPage = page
  }
}

// cart functions

function addProductToCart(productId) {
  cartList.innerHTML = '';
  let product = document.getElementById(`${productId}`);

    if (product) {
      const productIndex = cart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        cart[productIndex].quantity++;
      } else {
        let titleElement = product.querySelector('.title');
        let priceElement = product.querySelector('.price');
        let srcElement = product.querySelector('.src');
        let title = titleElement.textContent;
        let price = priceElement.textContent;
        let src = srcElement.getAttribute('data-product-src');
        cart.push({
          id: product.id,
          title: title,
          price: price,
          src: src,
          quantity: 1
        })
      }
    }
  calculateTotal(cart);
}

function deleteProductFromCart(productId) {
  cartList.innerHTML = '';
  const productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }
  calculateTotal(cart);
}

function decreaseProductQuantity(productId) {
  cartList.innerHTML = '';
  const productIndex = cart.findIndex((item) => item.id === productId)

  if (productIndex !== -1) {

    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity--;
    } else {
      deleteProductFromCart(productId);
    }
  }
  calculateTotal(cart);
}
function calculateTotal(cart) {
  total = 0;

  for (const item of cart) {
    total += item.quantity * parseFloat(item.price);
  }

  return (totalAmount.textContent = total.toFixed(2));
}

function displayCart(cartProductsList) {

  if (cartProductsList.length > 0) {
    cartProductsList.forEach((product) => {
      cartList.innerHTML += `<li data-product-id=${product.id} class="text-sm flex flex-row gap-5 mb-10">
      <img class="w-20 h-20 " src=${product.src} alt="product">
      <div class="product-info grow">
        <p class="first-letter:uppercase mb-3">${product.title}</p>
        <div class="flex flex-col">
           <div class="flex mb-3">
            <span class="mr-2">${product.price}</span>
            <span>KR.</span>
            </div>
           <span class="decrease-product-quantity cursor-pointer" data-product-id=${product.id}>-<span>
           <span class="px-1">${product.quantity}</span>
           <span class="add-product cursor-pointer" data-product-id=${product.id}>+<span>
         </div>
      </div>
      <div>
        <img class="delete-product cursor-pointer align-top" data-product-id=${product.id} src="https://github.com/sofiiaruban/e-commerce-app/assets/37212452/c703996c-cd2e-4c12-a7b0-17cb860c4fa5" alt="trash-can">
      </div>  
    </li>`
    })
    //cause trash can not uploaded in deploy replace it to link
  } else {
    cartList.innerHTML += '<p>There are no products yet </p>';
  }
}

function toggleElementClass(element, className) {
  element.classList.toggle(className);
}

//event listeners

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts(DEFAULT_PAGE);
  displayPagination(DEFAULT_PAGE, PAGINATION_STEP);

  pagination.addEventListener('click', (event) => {

    if (event.target.classList.contains('pagination-ellipsis-forward')) {
      swapPages("forward");
    }

    if (event.target.classList.contains('pagination-ellipsis-back')) {
      swapPages("back");
    }

    if (event.target.classList.contains('page')) {
      const clickedPage = parseInt(event.target.textContent, 10);

      if (clickedPage >= DEFAULT_PAGE && clickedPage <= TOTAL_PAGES) {
        currentPage = clickedPage;
        fetchAndDisplayProducts(currentPage);
        setCurrentPageStyle(`${currentPage}`);
      }
     
    }
    
  });

  productsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-button')) {
      const productId = event.target.getAttribute('data-product-id');
      addProductToCart(productId);
      displayCart(cart);
    }
  });

  cartList.addEventListener('click', (event) => {

    if (event.target.classList.contains('add-product')) {
      const productId = event.target.getAttribute('data-product-id');
      addProductToCart(productId);
      displayCart(cart);
    }

    if (event.target.classList.contains('decrease-product-quantity')) {
      const productId = event.target.getAttribute('data-product-id');
      decreaseProductQuantity(productId);
      displayCart(cart);
    }

    if (event.target.classList.contains('delete-product')) {
      const productId = event.target.getAttribute('data-product-id');
      console.log(productId);
      deleteProductFromCart(productId);
      displayCart(cart);
    }
  });
  
  cartIcon.addEventListener('click', (event) => {
    toggleElementClass(cartAside,  'hidden');
    toggleElementClass(mainContent, 'invisible');
  });

  closeCartIcon.addEventListener('click', (event) => {
    toggleElementClass(cartAside, 'hidden');
    toggleElementClass(mainContent, 'invisible');
  });
})