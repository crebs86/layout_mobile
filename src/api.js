import axios from 'axios'

let host = ''

if (import.meta.env.VITE_APP_MODE === 'dev') {
  host = import.meta.env.VITE_BACKEND_HOST_DEV
} else if (import.meta.env.VITE_APP_MODE === 'prod') {
  host = import.meta.env.VITE_BACKEND_HOST_PROD
}

const api = axios.create({
  baseURL: host,
  withCredentials: true
})

api.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.put['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.delete['Access-Control-Allow-Origin'] = '*'
//api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
/** */
export default api
