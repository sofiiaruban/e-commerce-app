import './style.css'


const TOTAL_PRODUCTS = 461;

let currentPage=1;


function fetchProducts (currentPage) {
const LIMIT_PER_PAGE = 24;
const DEFAULT_PAGE = 1;

const API_URL = `https://voodoo-sandbox.myshopify.com/products.json?limit=${LIMIT_PER_PAGE}&page=${currentPage |  DEFAULT_PAGE
}`

return fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    return data
  })
  .catch((error) => {
    throw error
  })

}
fetchProducts(currentPage)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error('Fetch error:', error)
  })