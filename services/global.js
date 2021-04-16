import request from '../utils/request'

//AUTH
export const auth = () => {
  return request('/auth', 'GET')
}
//POSTS
export const getAllPosts = (query) => {
  const { sort, category_Id, }
  var url = `/posts?`
  if (sort) url = url + `sort=${sort}&`
  if (category_Id) url = url + `category=${category_Id}&`

  return request(url, "GET")
}

export const getOnePost = (slug) => {
  return request(`/posts/${slug}`, 'GET')
}

export const createPost = (data) => {
  const { title, desc, content, image, category_Id, source, newCategory } = data
  const formData = new FormData()

  formData.append('title', title || null)
  formData.append('desc', desc || null)
  formData.append('content', content || null)
  formData.append('image', image || null)
  formData.append('category_Id', category_Id || null)
  formData.append('source', source || null)
  formData.append('newCategory', newCategory || null)

  return request('/posts', 'POST', formData)
}

export const updatePost = (_id, data) => {
  const { title, desc, content, image, category_Id, source, newCategory } = data
  const formData = new FormData()

  formData.append('title', title || null)
  formData.append('desc', desc || null)
  formData.append('content', content || null)
  formData.append('image', image || null)
  formData.append('category_Id', category_Id || null)
  formData.append('source', source || null)
  formData.append('newCategory', newCategory || null)

  return request(`/posts/${_id}`, 'PUT', formData)
}

export const deletePost = (_id) => {
  return request(`/posts/${_id}`, 'DELETE')
}

export const searchPost = (query) => {
  return request(`/search?q=${query}`, 'GET')
}

export const like = (postId, userInfo) => {
  const { _id, username, image } = userInfo
  const data = {
    _id: _id || null,
    username: username || null,
    image: image || null
  }

  return request(`/posts/${postId}/likes`, 'PUT', data)
}

export const unlike = (postId, userInfo) => {
  const { _id, username, image } = userInfo
  const data = {
    _id: _id || null,
  }

  return request(`/posts/${postId}/unlikes`, 'PUT', data)
}

export const comment = (postId, info) => {
  const { content, _id, image, username } = info
  const data = {
    content: content || null,
    _id: _id || null,
    image: image || null,
    username: username || null
  }

  return request(`/posts/${postId}/comments`, 'POST', data)
}

export const delComment = (postId, commentId) => {
  return request(`/posts/${postId}/comments?id=${commentId}`, 'DELETE')
}

//USER
export const createUser = (data) => {
  return request('/register', 'POST', data)
}

export const updateUser = (userId, data) => {
  return request(`/${userId}`, 'PUT', data)
}

export const getUser = (username) => {
  return request(`/${username}`, 'GET')
}

