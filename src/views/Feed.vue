<template>
    <div class="feed">
        <div class="submit">
            <VueEmoji ref="emoji" @input="onInput" :value="myText" />

            <button class="button">Absenden</button>
        </div>
        <button @click="load"></button>
        <div v-for="post in posts" :key="post.id">
            <Post :post-id="post.id" :img="post.img" :text="post.content" :author="post.ownerName" :reactions="post.reactions"></Post>
        </div>
    </div>
</template>

<script>
    import Post from "../components/Post";
    import VueEmoji from 'emoji-vue'
    import * as axios from "axios";
    export default {
        name: "Feed",
        components: {
            Post,
            VueEmoji
        },
        methods: {
            onInput(event) {
                return event == null;
            },
            clearTextarea(){
                this.$refs.emoji.clear()
            },
            load(data){
                this.postsFetched = data;
                console.log("PostsFetched: "+this.postsFetched[0]["content"]);
                let isJson = function IsJsonString(str) {
                    try {
                        JSON.parse(str);
                    } catch (e) {
                        console.log(e)
                        return false;
                    }
                    return true;
                }
                console.log("Jsonizing...");
                console.log("IsJson: "+isJson(this.postsFetched));
                for(var i = 0; i < this.postsFetched.length; i++) {
                    var obj = this.postsFetched[i];
                    console.log("Object:"+ obj);
                    console.log("Content: "+obj.content);
                    this.posts.push(obj);
                }
                console.log("Posts: "+this.posts)
            },

        },
        data: function () {
            return {
                postsFetched: null,
                posts: []
            }
        },
        mounted () {
            console.log("Token: "+this.$store.state.accessToken.toString());
            if ( this.$store.state.accessToken.toString() == "" )
            {
                console.log("Not logged in");
                this.$store.commit('SET_RECIRECT',"/login#/feed");
                window.location = "/login#/login";
            }
            axios
                .get('http://localhost:8001/feed/all?tokenId='+this.$store.state.accessToken)
                .then(response => (
                    this.load(response.data)
                ))
                .catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .feed {
        height: 4000px;
        background-color: darkgrey;
        width: 640px;
        margin: 0 auto;
    }
    .submit{
        width: 320px;
        background-color: white;
        height: 240px;
        margin: 0 auto;
    }
    .button{
        margin: 0 auto;
        width: fit-content;
        padding: 10px;
        border-radius: 7px;
        font-weight: 600;
        font-size: 30px;
        color: purple;
        transition: all ease 0.7s;
        background-color: black;
        border: 1px solid grey;
    }
    .button:hover{
        color: red;
        text-decoration-color: black;
        transition: all ease 0.7s;
    }
    .reactionBar{
        justify-content: space-evenly;
    }
</style>