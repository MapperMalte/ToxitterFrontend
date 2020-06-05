<template>
  <div class="home">
    <h1>04.06 - Chat läuft</h1>
    <p>
      Das Backend für den Chat läuft auf Elixir. Ich überlege, wie ich die Daten persistiere. Cassandra als verteilte Datenbank spricht mich an.
    </p>
    <br>
    <h3>Betritt jetzt Toxitter:</h3>
    <br>
    <button class="btn" @click="$router.push('/register')">KLICK MICH!!!</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  computed: {
    loggedIn: function () {
      return !(this.$store.state.accessToken.toString() === "")
    }
  },
  mounted () {
    if (!this.loggedIn) {
      console.log("Not logged in");
      this.$store.commit('SET_REDIRECT', "/");
    }
  }
}
</script>
<style scoped>
  .home h1{
    margin-top: 150px;
  }
  .btn{
    width: 300px;
    height: 130px;
    font-size: 35px;

  }
</style>