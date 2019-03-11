import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router';

let _api = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Steven'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listItems: [],
    activeItem: {},
    activeId: {},
    notes: []

  },
  mutations: {
    setList(state, data) {
      state.listItems = data
    },
    addItem(state, data) {
      state.listItems.push(data)
    },
    activeItem(state, data) {
      Vue.set(state, 'activeItem', data)
    },
    activeId(state, data) {
      state.activeId = data
    },
    setNotes(state, data) {
      state.notes = data
    },
    homeRoute() {
      router.go(-1);
    },
  },
  actions: {
    postItem({ commit, dispatch }, payload) {
      _api.post('bugs', payload)
        .then(res => {
          dispatch('getList')
        })
    },
    getList({ commit, dispatch }, id) {
      _api.get('bugs')
        .then(res => {
          commit('setList', res.data.results)
          commit('activeId', id)
        })
    },
    getOneItem({ commit, dispatch }, id) {
      //this id may need to come straight from router...
      _api.get('bugs/' + id)
        .then(res => {
          debugger
          commit('activeItem', res.data.results)
        })
    },
    getListStatus({ commit, dispatch }) {
      _api.get('bugs')
        .then(res => {
          commit('setList', res.data.results)
        })
    },
    setActive({ commit, dispatch }, item) {
      this.commit('activeItem', item)
      router.push({ name: 'itemDetails', params: { id: item._id } })
    },
    postNote({ commit, dispatch }, payload) {
      let id = this.state.activeId
      _api.post('bugs/' + id + '/notes', payload)
        .then(res => {
          dispatch('getNotes', id)
        })
    },
    getNotes({ commit, dispatch }, id) {
      _api.get('bugs/' + id + '/notes')
        .then(res => {
          commit('setNotes', res.data.results)
        })
    },
    toggleClosed({ commit, dispatch }, id) {
      _api.delete('bugs/' + id)
        .then(res => {
          dispatch('getListStatus')
        })
    },
    homeRoute(commit, dispatch) {
      dispatch('homeRoute')

    },
    editItem({ commit, dispatch }, newData) {
      _api.put('bugs/' + newData.id, newData)
        .then(res => {
          debugger
          dispatch('getOneItem', newData.id)
        })
    },
    removeNote({ commit, dispatch }, id) {
      // appears that this can only be done on open bugs?
      _api.delete('bugs/' + this.state.activeId + '/notes/' + id)
      dispatch('getNotes', this.state.activeId)
    }
  }
})
