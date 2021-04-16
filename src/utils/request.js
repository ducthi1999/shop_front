import axios from 'axios'

const accessToken = localStorage.getItem('accessToken')

axios.defaults.baseURL = 'http://localhost:3999/api'
axios.defaults.headers.common['Authorization'] = accessToken

const request = (endpoint, method, data) => {
  return axios({
    method,
    url: endpoint,
    data: data || {}
  })
}

export default request