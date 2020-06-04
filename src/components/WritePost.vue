<template>
    <div class="submit">
        <br>
        <h1>{{title}}</h1>
        <input type="text" placeholder="Titel" maxlength="30" v-model="title"/>
        <br>
        <textarea autocapitalize="none" autocomplete="off" spellcheck="false" class="writeArea" v-model="content" @input="mixin_autoResize_resize"></textarea>
        <hr width="270px">
        <button class="button" @click="this.submit">Absenden</button>
    </div>
</template>

<script>
    import * as axios from "axios";
    import autoResize from "../mixins/autoResize";
    export default {
        name: "WritePost",
        mixins: [autoResize],
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
        margin-top: 150px;
    }
    .writeArea{
        width: 403px;
        border-radius: 5px;
        border: none;
        padding: 20px;
        font-size: 20px;
        font-weight: 500;
        margin: 0 auto;
        font-family: Verdana;

    }
    input:focus, textarea:focus
    {
        outline: none;
    }
</style>