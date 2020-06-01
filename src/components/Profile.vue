<template>
    <div class="ProfileCard">
        <h1>Profil</h1>
        <h2>{{profile.displayName}}</h2>
        <div class="profileImg">
            <div class="background"></div>
            <img v-bind:src="profile.photoUrl">
        </div>
        <div class="logout">
            <a href="/logout">Logout</a>
        </div>

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
        methods: {
          loadProfile: function (response) {
              this.profile = response
              this.$store.commit('SET_PHOTO_URL', response['photoUrl'])
              this.$store.commit('SET_USER_NAME', response['userName'])
          }
        },
        mounted: function () {
            axios
                .get('http://localhost:8001/user/info'+'?userId='+this.$store.state.userId+'?tokenId='+this.$store.state.accessToken)
                .then(response => (
                    this.loadProfile(response.data)
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
    .profileImg{
        width: 128px;
        height: 128px;
        transition: all ease 0.4s;
        display: block;
        margin: -96px auto 0;
    }
    .background
    {
        width: 64px;
        height: 64px;
        position: relative;
        left: 32px;
        top: 96px;
        transition: all ease 0.4s;
        display: block;
    }
    .logout{
        margin-top: 70px;
    }
    .profileImg img{
        width: 128px;
        height: 128px;
        transition: all ease 0.4s;
    }
    .profileImg:hover img{;
        opacity: 0.4;
        transition: all ease 0.4s;
    }
    .profileImg:hover .background{
        background: url("../assets/add.png") no-repeat;
        background-size: contain;
        transition: all ease 0.4s;
    }
</style>