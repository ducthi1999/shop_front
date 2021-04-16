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