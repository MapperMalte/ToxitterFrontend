<template>
    <div class="ProfileCard">
        <h1>Profil</h1>
        {{profile}}
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "Profile",
        data: function(){
          return {
              profile:null
          }
        },
        mounted: function () {
            axios
                .get('http://localhost:8001/user/info'+'?userId='+this.$store.state.userId+'?tokenId='+this.$store.state.accessToken)
                .then(response => (
                    this.profile = response.data
                ))
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .ProfileCard{
        width: 400px;
        margin: 0 auto;
        padding: 50px;
        font-size: 20px;
    }
</style>