import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    sessionId:"",
    accessToken:"",
    redirectLink:"",
    userName:"",
    userMail:"",
    photoUrl:""
  },
  mutations: {
      SET_ACCESS_TOKEN: (state, newValue) => {
          state.accessToken = newValue
      },
      SET_USER_ID: (state, newValue) => {
          state.userId = newValue
      },
      SET_RECIRECT: (state,newValue) => {
        state.redirectLink = newValue;
      },
      SET_USER_NAME: (state,newValue) => {
          state.userName = newValue;
      },
      SET_PHOTO_URL: (state,newValue) => {
          state.photoUrl= newValue;
      }
  },
  actions: {
      updateAccessToken: ({commit, state}, newValue) => {
          commit('SET_ACCESS_TOKEN', newValue)
          return state.accessToken
      },
      updateUserId: ({commit, state}, newValue) => {
          commit('SET_USER_ID', newValue)
          return state.userId
      },
      // other actions
  },
  modules: {
  }
})
