import axios from 'axios'

const accessToken = localStorage.getItem('accessToken')

axios.defaults.baseURL = 'localhost:3999'
axios.defaults.headers.common['Authorization'] = accessToken

const request = (method, endpoint, data) => {
  return axios({
    method,
    url: endpoint,
    data: data || {}
  })
}

export default request