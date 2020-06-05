<template>
    <div>
        <h1>Url {{url}}</h1>
        <img class="profileImg" v-bind:src="msg.thumbnailUrl">
        {{msg.senderName}}
        {{msg.timestamp}}
        <p class="contentP">
            {{msg.content}}
        </p>
    </div>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "ChatMessage",
        props: ["msg"],

        mounted() {
            return firebase.storage().ref(this.msg.thumbnailUrl).getDownloadURL().then((url) => {
                this.msg.thumbnailUrl = url;
            }).catch(function(error)
            {
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .profileImg
    {
        width: 32px;
        height: 32px;
        float: left;
    }
    .contentP
    {
        padding: 10px;
        font-family: Helvetica;
        font-size: 15px;
        background-color: rgba(37,255,252,0.44)
    }
</style>