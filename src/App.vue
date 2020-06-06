<template>
  <v-app id="app">
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
  </v-app>
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
  @media only screen and (max-width: 510px) {
    #nav {
      height: 90px!important;
    }
    i{
      margin-right: 0px!important;
    }
  }
  @media only screen and (max-width: 600px) {
    #nav .hidden{
      display: none;
    }
    #mobileBottomNav{
      width: 100%;
      background-color: rgb(69, 73, 74);
      position: fixed;
      bottom: 0px;
      padding-top: 10px;
    }
    #mobileBottomNav .nothidden{
      display: inline-flex!important;
      color: #66aeb3;
      margin-right: 20px;
      margin-left: 20px;
    }
    .router-link-exact-active {
      color: #ee9900!important;
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

    background-color: rgb(69, 73, 74);
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
  }
  #nav a.router-link-exact-active {
    color: #ee9900;
  }
  #nav > *
  {
    color: #66aeb3;
    display: inline-block;
    list-style-type: none;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
  }

  i{
    padding: 5px;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
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
