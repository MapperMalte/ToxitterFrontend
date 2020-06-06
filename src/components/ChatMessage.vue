<template>
    <div>
    <v-row v-intersect="reloadDate" class="col-10" v-bind:class="{ right: right }">
        <v-row>
            <v-avatar size="48" class="avatar">
                <v-img height="48" width="48" v-bind:src="msg.thumbnailUrl"></v-img>
            </v-avatar>
            {{msg.senderName}}<br>
            {{date}}
        </v-row>
    </v-row>
    <v-card :color="this.color" class="msg">
        {{msg.content}}
    </v-card>
    </div>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "ChatMessage",
        props: ["msg","right"],

        mounted() {
            return firebase.storage().ref(this.msg.thumbnailUrl).getDownloadURL().then((url) => {
                this.msg.thumbnailUrl = url;
            })
        },
        data:function() {
          return{
              ourTime: new Date().getTime()
          }
        },
        methods: {
            reloadDate: function () {
                this.ourTime = new Date().getTime();
            }
        },
        computed: {
            color: function(){
                if ( this.right ){
                    return "pink";
                }
                return "blue";
            },
            date: function () {
                let duration = Math.floor((this.ourTime-this.msg.timestamp)/1000);
                if ( duration < 5 )
                {
                    return  "Jetzt";
                }
                if ( duration < 60 )
                {
                    return  "Vor weniger als einer Minute";
                }
                if ( duration >= 60 && duration < 120 )
                {
                    return "Vor über einer Minute";
                }
                if ( duration > 60 && duration < 3600 )
                {
                    return  "Vor "+Math.floor(duration/60)+" Minuten";
                }
                if (duration > 3600 )
                {
                    return "Vor über einer Stunde";
                }
                return new Date(this.msg.timestamp).toString();
            }
        }
    }
</script>

<style scoped>
    .msg{
        margin-top: -10px;
        margin-left: -10px;
        padding: 10px;
        display: block;
        max-width: 70%;
    }
    .right{
        float: right;
        width: 100%;
    }
    .avatar{
        margin-right: 3px;
        margin-bottom: 3px
    }
</style>