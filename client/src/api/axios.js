import axios from 'axios'

const BASE_API_URL = 'http://localhost:2000/api/'

export default axios.create({
    baseURL: BASE_API_URL
})