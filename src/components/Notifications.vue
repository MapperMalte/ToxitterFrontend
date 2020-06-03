<template>
    <div class="notificationBadge">
        <div v-for="(notification,index) in notifications" :key="index">
            {{notification}}
            {{index}}
        </div>
        {{content}}
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
                .get('http://localhost:8001/notifications/user'
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
        width: 0px;
        margin: 0 auto;
    }

    .notification{
        width: 320px;
        height: 70px;
        font-weight: 400;
        font-size: 20px;
    }
</style>