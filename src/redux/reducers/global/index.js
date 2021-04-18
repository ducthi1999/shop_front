const initialState = {
  login: false,
  auth: {},
  user: {
    firstName: '',
    lastName: '',
    role: null,
    userImage: null,
    notif: {},
    userNotif: [],
    userBought: [],
    phone: '',
  },
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

    case 'GET_ALL_PRODUCTS': {
      return {
        ...state,
        products: [
          ...action.payload
        ]
      }
    }

    case 'TOGGLE_LOADING': {
      return {
        ...state,
        loading: action.payload
      }
    }

    case 'GET_USER_DATA': {
      const { login, firstName, image, lastName, role, token, notif, bought, username, phone } = action.payload
      localStorage.setItem('accessToken', token)
      return {
        ...state,
        login: login,
        user: {
          username,
          firstName,
          lastName,
          role,
          userNotif: notif,
          userBought: bought,
          userImage: image,
          phone
        }
      }
    }

    case 'AUTHENTICATION': {
      const { login, user } = action.payload
      const { firstName, image, lastName, role, notif, bought, username, phone } = user
      return {
        ...state,
        login: login,
        user: {
          username,
          firstName,
          lastName,
          role,
          userNotif: notif,
          userBought: bought,
          userImage: image,
          phone
        }
      }
    }

    case 'CLEAR_DATA': {
      return {
        ...state,
        login: false,
        user: {
          username: '',
          firstName: '',
          lastName: '',
          role: '',
          userNotif: [],
          userBought: [],
          userImage: null,
          phone: ''
        }
      }
    }
  }

  return state
}

export default globalReducer