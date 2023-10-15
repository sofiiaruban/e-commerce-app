import './style.css'


const TOTAL_PRODUCTS = 461;
const DEFAULT_PAGE = 1;
const LIMIT_PER_PAGE = 24;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / LIMIT_PER_PAGE);
const PAGINATION_STEP = 5;
const productsList = document.querySelector('.products-list');
const pagination = document.querySelector('.pagination');
let currentPage = 1;

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
    list.innerHTML = ''
  products.forEach((product) => {
    list.innerHTML += `<li>${product.id}</li>`
  })
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
})