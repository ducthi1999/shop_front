import request from '../utils/request'

//AUTH
export const auth = () => {
  return request('/auth', 'GET')
}
//productS
export const getAllProducts = (query) => {
  const { sort, categoryId } = query
  var url = `/products?`
  if (sort) url = url + `sort=${sort}&`
  if (categoryId) url = url + `category=${categoryId}&`

  return request(url, "GET")
}

export const getOneProduct = (slug) => {
  return request(`/products/${slug}`, 'GET')
}

export const createProduct = (data) => {
  const { name, price, desc, image, category } = data
  const formData = new FormData()

  formData.append('name', name || null)
  formData.append('price', price || null)
  formData.append('desc', desc || null)
  formData.append('image', image || null)
  formData.append('category', category || null)

  return request('/products', 'POST', formData)
}

export const updateProduct = (_id, data) => {
  const { name, price, desc, image, category } = data
  const formData = new FormData()

  formData.append('name', name || null)
  formData.append('price', price || null)
  formData.append('desc', desc || null)
  formData.append('image', image || null)
  formData.append('category', category || null)

  return request(`/products/${_id}`, 'PUT', formData)
}

export const deleteProduct = (_id) => {
  return request(`/products/${_id}`, 'DELETE')
}

export const searchProduct = (query) => {
  return request(`/search?q=${query}`, 'GET')
}

//CATEGORY
export const getCategories = () => {
  return request('/categories', 'GET')
}

//USER
export const createUser = (data) => {
  return request('/register', 'product', data)
}

export const updateUser = (userId, data) => {
  return request(`/${userId}`, 'PUT', data)
}

export const getUser = (username) => {
  return request(`/${username}`, 'GET')
}

