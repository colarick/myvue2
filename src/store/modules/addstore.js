import axios from "axios";
const state = {
  number: 1,
  total: 0,
  basenum: 5,
  dataInfo: {}
}

const getters = {
  gettotal: state => state.number + state.basenum
}

const mutations = {//只能执行同步操作  唯一修改更新state的地方
  clickadd: (state, payload) => {
    state.number = state.number + payload
  },
  handleData: (state, payload) => {
    state.dataInfo = payload
  }
}

const actions = {// 可执行异步操作 commit 触发 mutations 
  async handleData ({ commit }) {
    await axios.get('/goods').then(res => {
      commit('handleData', res.data)
    })
  },
  handleClick ({ commit }, payload) {
    commit('clickadd', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}