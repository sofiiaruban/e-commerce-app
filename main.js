import './style.css'


const TOTAL_PRODUCTS = 461;
//let products = 
let currentPage = 1;
const productsList = document.querySelector('.products-list');

async function fetchProducts (currentPage) {
const LIMIT_PER_PAGE = 24;
const DEFAULT_PAGE = 1;

const API_URL = `https://voodoo-sandbox.myshopify.com/products.json?limit=${LIMIT_PER_PAGE}&page=${currentPage |  DEFAULT_PAGE
}`

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
window.addEventListener('load', () => {
    fetchAndDisplayProducts(currentPage)
})

