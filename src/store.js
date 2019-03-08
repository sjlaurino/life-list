import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let _api = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Steven'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listItems: []

  },
  mutations: {
    setList(state, data) {
      state.listItems = data
    },
    addList(state, data) {
      state.listItems.push(data)
    }
  },
  actions: {
    postItem({ commit, dispatch }, payload) {
      _api.post('bugs', payload)
        .then(res => {
          dispatch('getList')
        })
    },
    getList({ commit, dispatch }) {
      _api.get('bugs')
        .then(res => {
          commit('setList')
        })
    }

  }
})
