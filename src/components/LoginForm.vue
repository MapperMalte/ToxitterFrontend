<template>
    <div class="login">
        <h1>Einloggen</h1>
        <h1>Access-Token: {{accessToken}}</h1>
        <h2>User-Id: {{userId}}</h2>
        <form title="Einloggen">
            <input type="text" v-model="email" placeholder="Email"><br><br>
            <input type="password" v-model="password" placeholder="Passwort"><br><br>
            <button @click.prevent="attemptLogin">Submit</button>
        </form>
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "LoginForm",
        data() {
            return {
                email: "",
                password: "",
            }
        },
        computed: {
            accessToken: function () {
                    return this.$store.state.accessToken
                },
            userId: function () {
                return this.$store.state.userId
            },
        },
        methods:{
            login(response)
            {
                this.$store.commit('SET_ACCESS_TOKEN', response['accessToken'])
                this.$store.commit('SET_USER_ID', response['userId'])
                this.$store.commit('SET_USER_NAME', response['userName'])
                this.$store.commit('SET_PROFILE_PHOTO_URL', response['photoUrl'])
                console.log("Redirect link: "+this.$store.state.redirectLink);
                if ( !(this.$store.state.redirectLink === "") )
                {
                    this.$router.push(this.$store.state.redirectLink);
                }
            },
            attemptLogin() {
                axios
                    .get(this.$store.state.apiScheme+this.$store.state.url+'/auth/login?email='+this.email+"?password="+this.password)
                    .then(response => (
                        this.login(response.data)
                    ))
                    .catch(error => console.log(error));
            },
        }
    }
</script>

<style scoped>
    .login{
        width: 400px;
        margin: 130px auto 0;
    }
    .login input{
        width: 100%;
        border: 10px;
        padding: 5px;
        font-size: 30px;
    }

</style>