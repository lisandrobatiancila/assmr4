import axios from 'axios'

export const BASE_URL = 'http://localhost:1000/webAPI'
export const SERVER_PORT = '1000'

export const noCredAPI = axios.create({
    baseURL: BASE_URL
})

export const withCredAPI = axios.create({
    baseURL: BASE_URL,
    headers: {"Accept": "application/json"},
    withCredentials: true
})

export const SERVER = {
    URI: 'http://localhost:'
}

// FAST_REFRESH=false, exporting it as an environment variable.