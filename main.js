import './style.css'


const TOTAL_PRODUCTS = 461;
const DEFAULT_PAGE = 1;
const LIMIT_PER_PAGE = 24;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / LIMIT_PER_PAGE);
const PAGINATION_STEP = 5;
const productsList = document.querySelector('.products-list');
const pagination = document.querySelector('.pagination');
const cartList = document.getElementById('cart')
let currentPage = 1;
const dummyImg =
  'https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj_72c7d7cb-344c-4f62-ad0d-f75ec755894d.jpg?v=1670516960'

const cart = []

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
    const imageSrc = (product.images[0] && product.images[0].src) || dummyImg
    productListHTML += `<li class= "flex flex-col w-300" id=${product.id} data-product-id=${product.id}>
        <div class="w-300 h-300">
        <img class="src object-fit rounded" data-product-src="${imageSrc}" src="${imageSrc}">
        </div>
        <div class="flex justify-between my-3">
          <div class="flex flex-col font-grotesk font-bold text-sm">
            <p class="first-letter:uppercase title">${product.title}</p>
            <span class="price">${product.variants[0].price}</span> <span>KR.</span>
          </div>
          <div class="flex flex-col font-grotesk font-normal text-sm">
          <span> Condition </span>
          <span> Slightly used </span>
          </div>
        </div>
        <button type="button" data-product-id=${product.id} class="add-button bg-black text-white py-4 font-grotesk font-bold text-sm rounded">ADD TO CART</button>
    </li>`
  })
  list.innerHTML = productListHTML
}
async function fetchAndDisplayProducts(currentPage) {
  try {
    const data = await fetchProducts(currentPage)
    addProductsToDOM(data.products, productsList)
  } catch (error) {
    console.error('Error:', error)
  }
}
function getPagesList(start, end) {
  let pages = [] 
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  return pages
}
function getPaginationStart(){
  pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light flex text-lg items-center justify-center'>${DEFAULT_PAGE}</li>`
  pagination.innerHTML +=
    '<li class="pagination-ellipsis-back border rounded-full h-10 w-10 font-light  flex text-lg items-center justify-center">...</li>'
}
function getPaginationPages(pagesList) {
  pagesList.forEach((page) => {
    pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center'>${page}</li>`
  })
}
function getPaginationEnd(){
  pagination.innerHTML +='<li class="pagination-ellipsis-forward border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center">...</li>'
  pagination.innerHTML += `<li class='page border rounded-full h-10 w-10 font-light text-lg flex items-center justify-center'>${TOTAL_PAGES}</li>`
}
function displayPagination(start, end) {
  const pages = getPagesList(start, end);
  pagination.innerHTML = '';

  if (currentPage === DEFAULT_PAGE 
    && currentPage <= PAGINATION_STEP) {
    getPaginationPages(pages)
    if (end <= TOTAL_PAGES - PAGINATION_STEP) {
      getPaginationEnd()
    }
  }

  if (
    currentPage >= PAGINATION_STEP + 1 &&
    currentPage <= TOTAL_PAGES - PAGINATION_STEP
  ) {
    getPaginationStart()
    getPaginationPages(pages)
    getPaginationEnd()
  }

  if (currentPage >= TOTAL_PAGES - PAGINATION_STEP + 1 
    && currentPage <= TOTAL_PAGES) {
    getPaginationStart()
    getPaginationPages(pages)
  }  
}

function swapPages(direction) {
  let  newStart;
  let newEnd; 
  if (direction === "forward") {
    newStart = currentPage + PAGINATION_STEP
    newEnd = newStart + PAGINATION_STEP - 1
  }
 if (direction === "back") {
   newStart = currentPage - PAGINATION_STEP
   newEnd = currentPage-1
 }
  if (newStart > TOTAL_PAGES || newStart < 1) {
    return
  }
  currentPage = newStart
  fetchAndDisplayProducts(currentPage)
  displayPagination(newStart, newEnd)
}

function addProductToCart(productId) {
cartList.innerHTML = ''
let product = document.getElementById(`${productId}`)
console.log(productId)
let titleElement = product.querySelector('.title')
let priceElement = product.querySelector('.price')
let srcElement = product.querySelector('.src')
let title = titleElement.textContent
let price = priceElement.textContent
let src = srcElement.getAttribute('data-product-src')

  if (product) {
    const productIndex = cart.findIndex((item) => item.id === product.id)
    if (productIndex !== -1) {
      cart[productIndex].quantity++
    } else {
      cart.push({
        id: product.id,
        title: title,
        price: price,
        src: src,
        quantity: 1
      })
    }

    console.log('Product added to cart:', cart)
  }
}
function displayCart(cartProductsList) {
   cartProductsList.forEach(product => {
     cartList.innerHTML += `<li data-product-id=${product.id}><img class="w-20 h-20" src=${product.src}><p>${product.title}</p><div class="flex flex-col"><span>${product.price}</span><span>${product.quantity}</span></div></li>`
   })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts(DEFAULT_PAGE)
  displayPagination(DEFAULT_PAGE, PAGINATION_STEP)

  document.querySelector('.pagination').addEventListener('click', (event) => {
    if (event.target.classList.contains('pagination-ellipsis-forward')) {
      swapPages("forward")
    }
    if (event.target.classList.contains('pagination-ellipsis-back')) {
      swapPages("back")
    }
    if (event.target.classList.contains('page')) {
      const clickedPage = parseInt(event.target.textContent, 10)
      if (clickedPage >= DEFAULT_PAGE && clickedPage <= TOTAL_PAGES) {
        currentPage = clickedPage
        fetchAndDisplayProducts(currentPage)
        console.log(currentPage)
      }
    }
  })
  document.querySelector('.products-list').addEventListener('click', (event) => {
      if (event.target.classList.contains('add-button')) {
        const productId = event.target.getAttribute('data-product-id')
        addProductToCart(productId)
        displayCart(cart)
      }
    }
  )
})