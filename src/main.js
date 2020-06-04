import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBez58_HBkL41AB8oLkEy4wE8Czncar6rI",
  authDomain: "toxitter.firebaseapp.com",
  databaseURL: "https://toxitter.firebaseio.com",
  projectId: "toxitter",
  storageBucket: "toxitter.appspot.com",
  messagingSenderId: "89790713944",
  appId: "1:89790713944:web:ec85daf4d196a8e966fa2d",
  measurementId: "G-XFRJWCXFP5"
};
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
