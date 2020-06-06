<template>
    <v-container class="chat">
        <v-card class="card-outter col-2 chat">
            <v-toolbar>
                <h3>Chat mit Karl</h3>
            </v-toolbar>
            <v-card-text id="chatMessagesContainer" @scroll="userScroll" class="content">
                <div v-for="message in messages" :key="message.timestamp">
                    <ChatMessage :msg="message" :right="!isMe(message.senderName)"></ChatMessage>
                </div>
            </v-card-text>
            <v-card-actions class="send">
                <v-form @submit.prevent="sendMessage">
                    <v-text-field autocomplete="off" spellcheck="false" v-model="currentlyTyping" append-icon="mdi-send"></v-text-field>
                </v-form>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import ChatMessage from "./ChatMessage";
    import autoResize from "../mixins/autoResize";
    import keepScrolledToBottom from "../mixins/keepScrolledToBottom";

    export default {
        name: "Chatwindow",
        mixins: [autoResize, keepScrolledToBottom],
        props: ["id"],
        components: {
            ChatMessage
        },
        data: function()
        {
          return {
              currentlyTyping: "",
              messages: [],
              users: [],
              userScrolledChat: false
          }
        },
        methods: {
            userScroll : function(){
                let container = this.$el.querySelector("#chatMessagesContainer");
                console.log("ScrollTop: "+container.scrollTop);
                console.log("ScrollHeight: "+container.scrollHeight);
                if ( Math.abs(container.scrollTop - container.scrollHeight) < 900 )
                {
                    this.userScrolledChat = false;
                } else {
                    this.userScrolledChat = true;
                }
                console.log("usrscol" +this.userScrolledChat)
            },
            autoScroll : function()
            {
                this.$nextTick(() => {
                    if ( !this.userScrolledChat ) {
                        var container = this.$el.querySelector("#chatMessagesContainer");
                        container.scrollTop = container.scrollHeight;
                    }
                });
            },
            isMe : function(userName){
                return (userName === this.$store.state.userName );
            },
            receiveMessage : function(msg){
                console.log("Received message: "+msg);
                this.messages.push(JSON.parse(msg));
                this.autoScroll();
            },
            sendMessage : function(){
                this.socket.send(
                    JSON.stringify({
                        thumbnailUrl: this.$store.state.thumbnailUrl,
                        senderName: this.$store.state.userName,
                        content: this.currentlyTyping,
                        timestamp: (new Date().getTime())
                    })
                )
                this.currentlyTyping = "";
            },
        },
        mounted() {
            this.socket = new WebSocket("ws://"+this.$store.state.elixir+":4000/ws/chat")
            this.socket.addEventListener("message", (event) => {
                this.receiveMessage(event.data);
            })
            this.socket.addEventListener("close", () => {
                this.setupSocket()
            })
        },
    }
</script>

<style scoped>
    .card-outter{
        padding-bottom: 50px;
        margin: 0 auto;
        bottom: 100px;
        position: fixed;
        height: 500px;
    }
    .chat{
        min-width: 300px;
    }
    .send{
        position: absolute;
        bottom: 0px;
    }
    .content{
        max-height: 300px;
        overflow-y: scroll;
    }
</style>
