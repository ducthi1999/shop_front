import { io } from 'socket.io-client'
// const socket = io('https://gamingshopvn-api.herokuapp.com')
const socket = io('http://localhost:3999')

const initialState = {
  socket,
  login: false,
  auth: {},
  credit: {
    number: '',
    bank: ''
  },
  popup: {
    active: false,
    content: ''
  },
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    role: null,
    request: [],
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

    case 'UPDATE_NOTIF': {
      return {
        ...state,
        user: {
          ...state.user,
          userNotif: [
            ...state.user.userNotif,
            action.payload
          ]
        }
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

    case 'CHANGE_COINS': {
      return {
        ...state,
        user: {
          ...state.user,
          coins: action.payload
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
      const { login, firstName, request, _id, credit, image, lastName, coins, role, token, notif, bought, username, phone } = action.payload
      localStorage.setItem('accessToken', token)
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          request,
          firstName,
          lastName,
          role,
          credit,
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
      const { firstName, request, image, _id, credit, lastName, coins, role, notif, bought, username, phone } = user
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          firstName,
          lastName,
          role,
          coins,
          credit,
          request,
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
          _id: '',
          username: '',
          firstName: '',
          lastName: '',
          role: '',
          coins: 0,
          credit: {
            number: '',
            bank: ''
          },
          request: [],
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