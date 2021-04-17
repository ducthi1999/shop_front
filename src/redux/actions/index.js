import * as API from '../../services/global'
import { createBrowserHistory } from 'history'
const browserHistory = createBrowserHistory()

export const auth = () => {

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

export const getAllProductsAsync = () => {
  return dispatch => {
    dispatch(toggleLoading(true))
    API.getAllProducts({})
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(getAllProducts(res.data.products))
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

const getAllProducts = (payload) => {
  return {
    type: 'GET_ALL_PRODUCTS',
    payload
  }
}
