const initialState = {
  login: false,
  auth: {},
  user: {},
  loading: {},
  products: [],
  product: {},
  users: [],
  profile: {},
  categories: []
}

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES': {
      return {
        ...state,
        categories: [
          ...action.payload
        ]
      }
    }

    case 'GET_PRODUCT': {
      return {
        ...state,
        product: {
          ...action.payload
        }
      }
    }
  }
  
  return state
}

export default globalReducer