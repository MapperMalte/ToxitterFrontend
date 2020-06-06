<template>
    <div class="submit">
        <br>
        <h1>{{title}}</h1>
        <emoji-picker @emoji="insert" style="background-color: white; height: 500px">
            <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
                <button type="button">open</button>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                {{display}}
                <div>
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <h5>{{ category }}</h5>
                        <div>
                            <span v-for="(emoji, emojiName) in emojiGroup"
                                    :key="emojiName"
                                    @click.stop="insert(emoji)"
                                    :title="emojiName">{{ emoji }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </emoji-picker>

        <div class="wras">
            <div class="editContainer">
                    <div class="tools">
                        <button type="button" class="btn btn-default" id="makePhoto">
                            <i class="fa fa-image fa-3x"></i>
                        </button>
                        <button type="button" class="btn btn-default" id="makebold">
                            <i class="fa fa-bold fa-2x"></i>
                        </button>
                        <button type="button" class="btn btn-default" id="makeitalic">
                            <i class="fa fa-italic fa-2x"></i>
                        </button>
                        <button type="button" class="btn btn-default" id="makelist">
                            <i class="fa fa-list-ul fa-3x"></i>
                        </button>

                    </div>
                <br><br>
            </div>
            <div class="center">
                <input class="titleInput" type="text" placeholder="Titel" maxlength="30" v-model="title"/>
                <br>
                <textarea autocapitalize="none" autocomplete="off" spellcheck="false" class="writeArea" v-model="content" @input="mixin_autoResize_resize"></textarea>
                <hr width="270px">
                <br>
                <button class="button submitquestion" @click="this.submit">Absenden</button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import autoResize from "../mixins/autoResize";
    import EmojiPicker from 'vue-emoji-picker';

    export default {
        name: "WritePost",
        mixins: [autoResize],
        components:{
            EmojiPicker
        },
        data: function(){
          return{
              title: "Titel",
              content: "Hallo Welt",
              response:""
          }
        },
        methods: {
            insert(emoji) {
                this.content += emoji
            },
            submit()
            {
                axios.post(this.$store.state.apiScheme+this.$store.state.url+'/post/create',JSON.stringify({
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
    .titleInput{
        width: 100%;
        background-color: white;
        margin-bottom: 5px;
        padding: 10px;
        text-align: center;
        border-radius: 10px;
    }
    .button{
        padding: 10px;
        position: relative;
        display: flex;
    }
    .tools {
        max-width: 100px;
        margin-right: -70px;
        flex-direction: column;
    }
    .submit{
        margin-top: 150px;
    }
    .writeArea{
        background-color: white;
        width: 100%;
        border-radius: 10px;
        border: 1px solid gray;
        box-shadow: black;
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

<style>

    .tools{
        margin-bottom: 20px;
    }

    .ask > *{
        display: block;
    }

    .img{
        width: 48px;
        height: 48px;
    }

    .wras {
        display: inline-block;
        height: 50px;
        margin-top: 10px;
        padding: 5px;
        padding-left: 15px;
    }

    .btn {
        width: 70px;
        height: 70px;
        margin: 3px;
        color: black;
        transition: all ease 0.4s;
    }
    .btn :hover{
        color: orange;
        transition: all ease 0.1s;
    }
    @media only screen and (max-width: 540px)  {
        .wras{
            max-width: 90%!important;
        }
        .writeArea, .titleInput{
            margin-left: 15px!important;
        }
        .btn{
            margin-left: -15px;
        }
    }
    .wras{
        width: 540px;
        height: fit-content;
        padding-top: 20px;
        border-radius: 40px;
        display: inline-flex;
        background-color: var(--colorGloriousPurple);
        border: 1px solid #374955;
        box-shadow: 0 0 13px rgba(0,0,0,0.6);
        -moz-box-shadow: 0 0 13px rgba(0,0,0,0.6);
        -webkit-box-shadow: 0 0 13px rgba(0,0,0,0.6);
        -o-box-shadow: 0 0 13px rgba(0,0,0,0.6);
    }

    .center{
        text-align: center;
        margin: 0 auto;
        width: 70%;
    }
    .center *
    {
        margin: 0 auto;
    }
    .submitquestion{
        width: 200px;
        height: 100%;
        max-height: 50px;
        font-weight: 400;
        border-radius: 40px;
        display: inline;
        bottom: 0px;
        position: relative;
        vertical-align: baseline;

        border: 1px solid var(--colorPalePurple);
        background-color: #FFFFFF;
        color: var(--colorPalePurple);
        transition: all ease 0.4s;
    }
    .submitquestion:hover{
        background-color: var(--colorGloriousPurple);
        color: var(--colorActive);
        transition: all ease 0.4s;
    }
    :root {
        --color1: #7E92F5;
        --color2: rgba(91, 125, 228, 0.1);
        --color3:#7E92F5;
        --color5: rgba(14, 14, 29, 0.46);
        --color7: rgb(57, 137, 172);
        --color4: rgb(57, 137, 172);
        --color6: #ffb900;

        --white: #ffffff;

        --triWheelColor1: #542f7a;
        --triWheelColor3: rgba(14, 14, 29, 0.46);
        --triWheelColor2: rgb(197, 124, 42);


        --coloraegypticanGod: rgba(227, 28, 33, 0.82);
        --colorDarkBlueCounter: rgba(47, 47, 138, 0.62);
        --colorNavbar: #66aeb3;
        --colorPurpleHaze: #807819;
        --colorPalePurple: #ccb8ea;
        --colorGloriousPurple: rgb(98, 65, 112);
        --colorActive: #ee9900;
        --colorPsychicBlue:#120823;
    }
</style>