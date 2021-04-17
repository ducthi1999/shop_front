import * as API from '../../services/global'

export const auth = () => {
  
}

export const getCategoriesAsync = () => {
  return (dispatch) => {
    API.getCategories()
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(getCategories(res.data.categories))
        }
      })
  }
}

const getCategories = (payload) => {
  return {
    type: 'GET_CATEGORIES',
    payload
  }
}

export const getAllProductsAsync = () => {
  return dispatch => {
    API.getAllProducts({})
      .then(res => {
        console.log(res)
        if (res.data && res.data.status) {
          dispatch(getAllProducts(res.data.products))
        }
      })
  }
}

const getAllProducts = (payload) => {
  return {
    type: 'GET_ALL_PRODUCTS',
    payload
  }
}