import { io } from 'socket.io-client'
const socket = io('localhost:3999')

const initialState = {
  socket,
  login: false,
  auth: {},
  user: {
    firstName: '',
    lastName: '',
    role: null,
    userImage: null,
    notif: {},
    userNotif: [],
    coins: 0,
    userBought: [],
    phone: '',
  },
  loading: false,
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

    case 'GET_ONE_PRODUCT': {
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
      const { login, firstName, image, lastName, coins, role, token, notif, bought, username, phone } = action.payload
      localStorage.setItem('accessToken', token)
      return {
        ...state,
        login: login,
        user: {
          username,
          firstName,
          lastName,
          role,
          coins,
          userNotif: notif,
          userBought: bought,
          userImage: image,
          phone
        }
      }
    }

    case 'AUTHENTICATION': {
      const { login, user } = action.payload
      const { firstName, image, lastName, coins, role, notif, bought, username, phone } = user
      return {
        ...state,
        login: login,
        user: {
          username,
          firstName,
          lastName,
          role,
          coins,
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
          coins: 0,
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