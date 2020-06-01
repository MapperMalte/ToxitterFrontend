<template>
    <div class="login">
        <h1>Registrieren</h1>
        <h1>Access-Token: {{accessToken}}</h1>
        <form title="Registrieren">
            <input type="text" v-model="email" placeholder="Email"><br><br>
            <input type="password" v-model="password" placeholder="Passwort"><br><br>
            <input type="password" v-model="password_repeat" placeholder="Passwort wiederholen"><br><br>
            <button @click.prevent="attemptLogin">Submit</button>
        </form>
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "RegisterForm",
        data() {
            return {
                email: "",
                password: "",
                password_repeat: "",
                userId: this.$store.state.userId
            }
        },
        computed: {
            accessToken: function () {
                    return this.$store.state.accessToken
                },
        },
        methods:{
            login(response)
            {
                this.$store.commit('SET_ACCESS_TOKEN', response['accessToken'])
                this.$store.commit('SET_USER_ID', response['userId'])
                console.log("Redirect link: "+this.$store.state.redirectLink);
                if ( !(this.$store.state.redirectLink === "") )
                {
                    window.location = this.$store.state.redirectLink;
                }
            },
            attemptLogin() {
                axios
                    .get('http://localhost:8001/auth/register?email='+this.email+"?password="+this.password)
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
        margin: 0 auto;
        width: 400px;
    }
    .login input{
        width: 100%;
        border: 10px;
        padding: 5px;
        font-size: 30px;
    }
</style>