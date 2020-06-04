<template>
    <div class="feed">
        <WritePost></WritePost>
        <div v-for="post in posts" :key="post.id">
            <Post
                    :post-id="post.id"
                    :profile-image-url="post.photoUrl"
                    :text="post.content"
                    :author="post.ownerName"
                    :reactions="post.reactions"
                    :title="post.title"
            ></Post>
        </div>
    </div>
</template>

<script>
    import Post from "../components/Post";
    import WritePost from "../components/WritePost";

    import * as axios from "axios";
    export default {
        name: "Feed",
        components: {
            Post,
            WritePost
        },
        methods: {
            onInput(event) {
                return event == null;
            },
            clearTextarea(){
                this.$refs.emoji.clear()
            },
            load(data){
                console.log("PostsFetched: "+JSON.stringify(data).toString());
                console.log("First content: "+(data[0]["content"]).toString());
                this.$store.commit('SET_POSTS',data)
            }

        },
        computed: {
          posts: function () {
              return this.$store.state.posts
          },
            loggedIn: function () {
                return !(this.$store.state.accessToken.toString() === "")
            }
        },
        mounted () {
            console.log("Token: "+this.$store.state.accessToken.toString());
            if ( !this.loggedIn )
            {
                console.log("Not logged in");
                this.$store.commit('SET_REDIRECT',"/login#/feed");
                window.location = "/login#/login";
            } else {

                axios
                    .get('http://localhost:8001/feed/all?tokenId='+this.$store.state.accessToken)
                    .then(response => (
                        this.load(response.data)
                    ))
                    .catch(error => console.log(error));
            }
        }
    }
</script>

<style scoped>
    .feed {
        height: 12000px;
        background-color: darkgrey;
        width: 640px;
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