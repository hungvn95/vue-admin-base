import axios from 'axios'
import store from "../store";
import router from "../router";

const baseUrl = process.env.VUE_APP_BASE_URL;

export const apiAxios = axios.create({
  baseURL:`${baseUrl}/api`,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

apiAxios.interceptors.request.use(config => {
  let token = store.state.auth.accessToken
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

apiAxios.interceptors.response.use(undefined, (error) => {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
      store.commit('auth/updateLoginStatus', false)
      store.commit('auth/updateAuthUser', {})
      store.commit('auth/updateAccessToken', '')
      return router.push({name: 'Login'})
    }
  }
})

export default {
  getAuthUser () {
    return apiAxios({
      method: 'get',
      url: '/auth/me'
    })
  },
  login (data) {
    return apiAxios({
      method: 'post',
      url: 'auth/login',
      data: data
    })
  },
}
