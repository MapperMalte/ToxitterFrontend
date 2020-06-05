<template>
    <div class="chatwindow">
        <h3>Hier ist der Chat</h3>
        <div v-for="message in messages" :key="message.timestamp">
            <ChatMessage :msg="message"></ChatMessage>
        </div>
        <textarea v-model="currentlyTyping"></textarea>
        <button @click="sendMessage">Submit</button>
    </div>
</template>

<script>
    import ChatMessage from "./ChatMessage";

    export default {
        name: "Chatwindow",
        components: {
            ChatMessage
        },
        data: function()
        {
          return {
              currentlyTyping: "",
              messages: [],
              users: []
          }
        },
        methods: {
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
            this.socket = new WebSocket("ws://localhost:4000/ws/chat")

            this.socket.addEventListener("message", (event) => {
                console.log("Received message: "+event.data);
                this.messages.push(JSON.parse(event.data));
            })

            this.socket.addEventListener("close", () => {
                this.setupSocket()
            })
        },
    }
</script>

<style scoped>
    .chatwindow{
        float: bottom;
        width: 350px;
        height: 600px;
        border-radius: 8px;
        border: 2px solid black;
        margin: 0 auto;
    }
</style>