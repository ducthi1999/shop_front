import request from '../utils/request'

//AUTH
export const auth = () => {
  return request('/auth', 'GET')
}

export const loginAuth = (userData) => {
  return request('/login', 'POST', userData)
}

export const register = (userData) => {
  return request('/register', 'POST', userData)
}
//productS
export const getAllProducts = (query) => {
  const { sort, categoryId, sellerId, passed } = query
  var url = `/products?`
  if (sort) url = url + `sort=${sort}&`
  if (sellerId) url = url + `seller=${sellerId}&`
  if (categoryId) url = url + `category=${categoryId}&`
  if (passed) url = url + `passed=${passed}&`

  return request(url, "GET")
}

export const getOneProduct = (slug) => {
  return request(`/products/${slug}`, 'GET')
}

export const createProduct = (data) => {
  const { name, password, price, desc, image, category } = data
  const formData = new FormData()

  formData.append('name', name || null)
  formData.append('password', password || null)
  formData.append('price', price || null)
  formData.append('desc', desc || null)
  formData.append('image', image || null)
  formData.append('category', category || null)

  return request('/products', 'POST', formData)
}

export const updateProduct = (slug, data) => {
  return request(`/products/${slug}`, 'PUT', data)
}

export const deleteProduct = (productId, sellerId, image) => {
  return request(`/products/${productId}/${sellerId}`, 'DELETE', image )
}

export const passProduct = (productId) => {
  return request(`/products/${productId}/pass`, 'PUT')
}

export const searchProduct = (query) => {
  return request(`/search?q=${query}`, 'GET')
}

export const buyProduct = (productId) => {
  return request(`/products/buy/${productId}`)
}

//CATEGORY
export const getCategories = () => {
  return request('/categories', 'GET')
}

//USER
export const createUser = (data) => {
  return request('/register', 'product', data)
}

export const updateUser = (id, data) => {
  return request(`/${id}`, 'PUT', data)
}

export const updateAvt = (id, data) => {
  return request(`/${id}/avt`, 'PUT', data)
}

export const getUser = (userId) => {
  return request(`/${userId}`, 'GET')
}

export const giveCoins = (userId, coins) => {
  return request(`/${userId}/${coins}`, 'PUT')
}

export const getRequest = () => {
  return request('/requests', 'GET')
}

export const removeRequest = (requestId) => {
  return request(`/requests/${requestId}`, 'DELETE')
}