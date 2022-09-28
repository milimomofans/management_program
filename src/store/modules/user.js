import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    userInfo:{}
  },

  mutations: {
    SET_USERINFO:( state, userInfo ) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // const result = response
          // storage.set(ACCESS_TOKEN, result.token, new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
          // commit('SET_TOKEN', result.token)
          storage.set(ACCESS_TOKEN,response.token)
          // dispatch('GetInfo')
          commit('SET_TOKEN',response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        getInfo().then(response => {
          commit('SET_USERINFO',response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        storage.remove(ACCESS_TOKEN)
        commit('SET_TOKEN','')
        commit('SET_USERINFO',{})
        resolve()
      })
    }

  }
}

export default user
