import axios from 'axios'

axios.defaults.baseURL = 'https://gamingshopvn-api.herokuapp.com/api'

const request = (endpoint, method, data) => {
  const accessToken = localStorage.getItem('accessToken')
  axios.defaults.headers.common['Authorization'] = accessToken

  return axios({
    method,
    url: endpoint,
    data: data || {}
  })
}

export default request