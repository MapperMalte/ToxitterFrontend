<template>
    <div class="submit">
        <h1>{{title}}</h1>
        <input type="text" placeholder="Titel" maxlength="30" v-model="title"/>
        <textarea class="writeArea" v-model="content"></textarea>
        <hr width="270px">
        <button class="button" @click="this.submit">Absenden</button>
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "WritePost",
        data: function(){
          return{
              title: "Titel",
              content: "Hallo Welt",
              response:""
          }
        },
        methods: {

            submit()
            {
                axios.post('http://localhost:8001/post/create',JSON.stringify({
                        tokenId: this.$store.state.accessToken,
                        userId: this.$store.state.userId,
                        title: this.title,
                        content: this.content
                    }))
                    .then(response => (
                        this.$store.commit('ADD_POST',response.data)
                    ))
                    .catch(error => console.log(error));
            }
        }
    }
</script>

<style scoped>
    .button{
        padding: 10px;
        position: relative;
    }
    .submit{
        width: 320px;
        background-color: white;
        height: 280px;
        margin: 0 auto;
        border: 1px solid red;
        position: relative;
        top: 40px;
    }
    .writeArea{
        width: 270px;
        border-radius: 5px;
        border: none;
        padding: 20px;
        font-size: 20px;
        font-weight: 500;

    }
    input:focus, textarea:focus
    {
        outline: none;
    }
</style>