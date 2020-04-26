import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://api.hiwty.com/w',
    timeout: 10000
})

axios.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})

export default axios
