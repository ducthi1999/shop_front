import * as API from '../../services/global'
import { createBrowserHistory } from 'history'
const browserHistory = createBrowserHistory()

export const auth = () => {
  return dispatch => {
    API.auth()
      .then(res => {
        if (res.data && res.data.status) {
          let payload = {
            login: res.data.login,
            user: res.data.user
          }
          dispatch(authAsync(payload))
        } else {
          console.log('Lỗi xác thực!')
        }
      })
  }
}

export const authAsync = (payload) => {
  return {
    type: 'AUTHENTICATION',
    payload
  }

}

export const getUserData = (userData) => {
  return {
    type: 'GET_USER_DATA',
    payload: userData
  }
}

export const toggleLoading = (payload) => {
  return {
    type: 'TOGGLE_LOADING',
    payload
  }
}

export const triggerNotif = (payload) => {
  return {
    type: 'TRIGGER_NOTIF',
    payload
  }
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

export const getAllProductsAsync = (query) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.getAllProducts(query)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(getAllProducts(res.data.products))
          dispatch(toggleLoading(false))
        } else {
          triggerNotif({
            type: 'ERROR',
            content: res.data.message
          })
        }
      })
      .catch(err => {
        dispatch(triggerNotif({
          type: 'ERROR',
          content: 'SERVER_ERROR!'
        }))
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const getAllProducts = (payload) => {
  return {
    type: 'GET_ALL_PRODUCTS',
    payload
  }
}

export const getProductAsync = (slug) => {
  return dispatch => {
    API.getOneProduct(slug)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(getProduct(res.data.product))
        } else {

        }
      })
      .catch(err => {

      })
  }
}

const getProduct = (payload) => {
  return {
    type: 'GET_ONE_PRODUCT',
    payload
  }
}