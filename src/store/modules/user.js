import { login, getMenu} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setCookie } from '@/utils/support';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      let params = new URLSearchParams();
      params.append('userName',userInfo.userName.trim());
      params.append('userPass',userInfo.userPass.trim());
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          const data = response.data;
					setCookie("user",JSON.stringify(data));
          // const tokenStr = data.tokenHead+data.token
          // setToken(tokenStr)
          // commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取菜单信息
    GetMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenu().then(response => {
          const data = response.data;
					commit('SET_ROLES', "admin");
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.username)
          // commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
					console.log(error)
          reject(error)
        })
      })
    },
		
		LogOut({ commit, state }){
			return new Promise((resolve, reject) => {
				setCookie("user","");
				commit('SET_ROLES', []);
				resolve();
			})
		}

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
