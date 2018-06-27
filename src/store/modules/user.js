import fetch from '@/utils/fetch'
import { SetToken } from '@/utils/auth'
import API_URL from '@/config/ApiUrl';
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: '',
    name: '',
    isAdmin: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = [];
      roles.forEach(item => {
        state.roles.push(item)
      })
    },
    SET_ADMIN: (state, isadmin) => {
      state.isAdmin = isadmin;
    }
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.Name.trim();
      return new Promise((resolve, reject) => {
        // fetch({
        //   method: "post",
        //   url: API_URL.BigData + "CheckUser",
        //   data: {
        //     NAME: userInfo.Name,
        //     PASSWORD: userInfo.Password
        //   }
        // }).then(({ data }) => {
        //   if (data.Success) {
        //     let token = data.Data.ID;
        //     commit('SET_TOKEN', token)
        //     commit('SET_ADMIN', data.Data1)
        //     SetToken(token)
        //     resolve();
        //   }else{
        //     reject(data.ErrorMessage);
        //   }
        // }).catch(err => {
        //   reject("服务异常,请稍后再尝试或者联系管理员.")
        // })
        commit('SET_TOKEN', "1")
        commit('SET_ADMIN', true)
        SetToken("1")
        resolve();
      })


    },
    SetUserRole({ commit, state }, roles) {
      return new Promise((resolve, reject) => {
        // fetch({
        //   method: "get",
        //   url: API_URL.BigData + "GetUserMenu?user_id=" + roles,
        // }).then(({ data }) => {
        //   if (data.Success) {
        //     let rolearr = JSON.parse(data.Data);
        //     if (state.isAdmin === 'True') {
        //       rolearr.push('admin')
        //     }
        //     commit('SET_ROLES', rolearr);
        //     resolve();
        //   }
        // }).catch(err => {
        //   reject(err)
        // })
        let rolearr = ['admin'];
        commit('SET_ROLES', rolearr);
        resolve();
      })
    }

  }
}

export default user
