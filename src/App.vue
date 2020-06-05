<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><i class="fa fa-2x fa-newspaper"></i>News</router-link>
      <router-link class="hidden" to="/feed"><i class="fa fa-2x fa-eye"></i>Feed</router-link>
      <router-link class="hidden" v-if="loggedIn" to="/chat"><i class="fa fa-2x fa-comments"></i>Chat</router-link>
      <router-link v-if="loggedIn" to="/notifications"><i class="fa fa-2x fa-bell"></i>Benachrichtigungen</router-link>
      <router-link v-if="loggedIn" to="/profile"><i class="fa fa-2x fa-user"></i>Profil</router-link>
      <router-link v-if="!loggedIn" to="/login"><i class="fa fa-2x fa-sign-in-alt"></i>Login</router-link>
      <router-link v-if="!loggedIn" to="/register"><i class="fa fa-2x fa-door-open"></i>Registrieren</router-link>
    </div>
    <div id="mobileBottomNav">
      <router-link class="nothidden" to="/feed"><i class="fa fa-2x fa-eye"></i>Feed</router-link>
      <router-link class="nothidden" v-if="loggedIn" to="/chat"><i class="fa fa-2x fa-comments"></i>Chat</router-link>
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
#mobileBottomNav .nothidden{
  display: none;
}
@media only screen and (max-width: 600px) {
  #nav .hidden{
    display: none;
  }

  #mobileBottomNav{
    width: 100%;
    background-color: #2c3e50;
    position: fixed;
    bottom: 10px;
  }

  #mobileBottomNav .nothidden{
    display: inline-flex!important;
  }
}

#nav {
  height: 65px;
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  position: fixed;
  display: flex;
  vertical-align: center;
  justify-content: center;
  flex-direction: row;
  z-index: 9;
  top: 0;

  background-color: #1a6f11;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
}

i{
  padding: 5px;
  margin-right: 10px;
}
#nav > *
{
  color: rgba(28, 25, 23, 0.92);
  display: inline-block;
  list-style-type: none;
  margin:20px;
}
a {
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ceff1c;
 }

.authbox *{
  margin: 0 auto;
  horiz-align: center;
  vertical-align: center;
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
