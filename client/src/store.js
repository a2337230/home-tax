import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const types = {
  SET_USER: "SET_USER"
}

const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USER](state, userInfo) {
    userInfo?state.userInfo = userInfo:state.userInfo = {};
  }
}

const actions = {
  // 保存用户信息
  setUserInfo: ({ commit }, userInfo) => {
    commit(types.SET_USER, userInfo)
  },
  // 清除用户信息
  clearCurrentState: ({ commit }) => {
    commit(types.SET_USER, null)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
