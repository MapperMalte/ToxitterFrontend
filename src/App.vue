<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">News</router-link> |
      <router-link to="/feed">Feed</router-link> |
      <router-link to="/chat">Chat</router-link> |
      <router-link to="/notifications">Benachrichtigungen</router-link>
    </div>
    <div id="auth" v-if="!loggedIn">
      <router-link class="authbox login loginLink" to="/login">Login</router-link>
      <router-link class="authbox register registerLink" to="/register">Registrieren</router-link>
    </div>
    <div id="profileView" v-if="loggedIn">
      <router-link class="authbox login" to="/profile">Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
  background-color: white;
}
.router-link-exact-active{
  background-color: black;
  color: orangered;
}

.authbox{
  position: fixed;
  right: 0px;
  margin: 50px;
  border: 1px solid black;
  padding: 30px;
  font-weight: bolder;
  width: 100px;
  height: 28px;
}
.authbox *{
  margin: 0 auto;
  horiz-align: center;
  vertical-align: center;
}
  .login{
    top: 0px;
  }
  .register{
    top: 110px;
  }
</style>

<script>
    export default {
        name: "App",
        computed: {
            loggedIn : function(){
                return !(this.$store.state.accessToken === "");
            }
        }
    }
</script>
