<template>
    <div>
        <h1>Hier ist der Chat!</h1>
        <ChatWindow></ChatWindow>
    </div>
</template>

<script>
    import ChatWindow from "../components/ChatWindow";
    export default {
        name: "Chatview",
        components: {
            ChatWindow
        }
    }
</script>

<style scoped>

</style>