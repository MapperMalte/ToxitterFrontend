<template>
    <div class="post">
        <h1>{{title}}</h1>
        <div class="postHeader">
            <img class="img" v-bind:src="profileUrl"><br>
            <h3>{{author}}</h3> schreibt:
        </div>
        <div class="content" v-html="displayText"></div>
        <br><br>
        <div class="toolbar">
            <div v-for="reaction in reactions" :key="reaction.smileyName">
                <button @click="react(reaction.smiley)" class="option">
                    <span v-html="reaction.html"></span>
                </button>
                {{reaction.count}}
            </div>
            <button type="button" :class="{ 'triggered': showEmojiPicker }" @mousedown.prevent="toggleEmojiPicker" class="btn btn-default">
                <i class="fa fa-smile fa-3x"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import * as firebase from "firebase";

    export default {
        name: "Post",
        props: ['author','title','img','profileId','postId','text','reactions','profileImageUrl'],

        data: function() {
            return{
                profileUrl: this.profileImageUrl,
            }
        },
        mounted: function(){
            console.log("Reactions: "+JSON.stringify(this.reactions));
            console.log("Url: "+this.profileImageUrl.split(".").join("_100x100."));
            firebase.storage().ref(this.profileImageUrl.split(".").join("_100x100.")).getDownloadURL().then((url) => {
                this.profileUrl = url;
            }).catch(function(error)
            {
                console.log(error)
            })

        },
        computed: {
          displayText: function () {
              return this.text.split('\\n').join("<br>")
          }
        },
        methods: {
            setReactionCount(smiley, count)
            {
                console.log("Smiley: "+smiley+" Count: "+count);
                for(var i = 0; i < this.reactions.length; i++) {
                    if ( this.reactions[i]["smiley"] === smiley )
                    {
                        this.reactions[i]["count"] = count;
                    }
                }
            },
            addEmoji(emoji) {
                this.react(emoji.id);
                this.$store.state.showEmojiPicker = false;
            },
            toggleEmojiPicker () {
                this.$store.state.showEmojiPicker = !this.$store.state.showEmojiPicker
                this.$el.querySelector('#emojiPicker').top = 1000;
            },
          react(smiley) {
              console.log("React with smiley: "+smiley);
              axios
                  .get(this.$store.state.apiScheme+this.$store.state.url+'/post/react'
                      + '?tokenId=' +this.$store.state.accessToken
                      + '?postId=' +this.postId
                      + '?userId=' +this.$store.state.userId
                      + '?smiley=' +smiley
                  )
                  .then(response => (
                      this.setReactionCount(smiley,response.data)
                  ))
                  .catch(error => console.log(error));
          }
        }
    }
</script>

<style scoped>
    .paragraph{
        white-space: pre-line;
    }
    .post {
        max-width: 600px;
        background-color: white;
        border-radius: 15px;
        border: 1px solid grey;
        padding: 10px;
        font-family: "Droid Sans";
        font-weight: 400;
        margin: 100px auto 0;
    }
    .toolbar{
        justify-content: space-evenly;
        flex-direction: row;
        display: flex;
        width: 100%;
        height: 50px;
    }
    .option{
        border: none;
        font-size: 30px;
        background-color: white;
        transition: all ease 0.3s;
        flex-grow: 1;
    }
    .option:hover{
        font-size: 33px;
        transition: all ease 0.3s;
    }
    .content{
        padding: 20px;
        text-align: left;
    }
    .img{
        border-radius: 50%;
    }

</style>