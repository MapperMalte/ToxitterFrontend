<template>
    <div>
        <v-card class="col-4 notificationBadge" v-for="(notification,index) in notifications" :key="index">
            <v-card-text>
                {{notification}}
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "Notifications",
        data: function(){
            return {
                notifications: []
            }
        },
        mounted: function () {
            axios
                .get(this.$store.state.apiScheme+this.$store.state.url+'/notifications/user'
                    + '?tokenId=' +this.$store.state.accessToken
                    + '?userId=' +this.$store.state.userId
                )
                .then(response => (
                    this.notifications = response.data
                ))
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .notificationBadge{
        top: 100px;
        margin: 0 auto;
        height: fit-content;
    }
    .notificationBadge:hover{
        border: 1px solid black;
    }
    .notification{
        width: 320px;
        height: 70px;
        font-weight: 400;
        font-size: 20px;
    }
</style>