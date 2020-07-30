
const state = {
    userInfo: {},
    token: localStorage.getItem('token')
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    RESET_TOKEN: (state, token) => {
        state.token = ''
        localStorage.removeItem('token');
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data
    }
}

const getters = {
}


const actions = {
    /**
     * login
     * @param {Object} userInfo 
     * 登录后存用户token到 store和 localStorage；
     */
    login({ commit }, userInfo) {
        const { phone, password } = userInfo;
        return new Promise((reslove, reject) => {
            reslove();
            // $request('/user/login', { phone: phone.trim(), password }).then(res => {
            //     if (res.code === 200) {
            //         localStorage.setItem('token', res.data);
            //         commit('SET_TOKEN', res.data)
            //         reslove();
            //     } else {
            //         reject();
            //     }
            // }).catch(err => {
            //     reject();
            // })
        })

    },
    /**
     * logout
     * 清楚token和用户信息后退出登录定向到 Login页面 
     *
     */
    logout({ commit }) {
        commit('RESET_TOKEN');
        vm.$router.replace('/login')
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}