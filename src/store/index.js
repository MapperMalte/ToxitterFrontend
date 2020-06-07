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
      showEmojiPicker: false,
      photoUrl:"",
      thumbnailUrl: "",
      url: "e061599de4c7.ngrok.io",
      apiScheme: "https://",
      elixir: "e061599de4c7.ngrok.io",
      posts:[]
  },
  mutations: {
      SET_ACCESS_TOKEN: (state, newValue) => {
          state.accessToken = newValue
      },
      SET_USER_ID: (state, newValue) => {
          state.userId = newValue
      },
      SET_REDIRECT: (state,newValue) => {
        state.redirectLink = newValue;
      },
      SET_USER_NAME: (state,newValue) => {
          state.userName = newValue;
      },
      SET_POSTS: (state,newValue) => {
          state.posts = newValue;
      },
      SET_PROFILE_PHOTO_URL: (state,newValue) => {
          state.photoUrl = newValue;
          state.thumbnailUrl = newValue.split(".").join("_100x100.");
      },
      ADD_POST: (state, newValue) => {
          state.posts.unshift(newValue)
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
  },
  modules: {
  }
})
