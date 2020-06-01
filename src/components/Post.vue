<template xmlns="http://www.w3.org/1999/html">
    <div class="post">
        <div class="postHeader">
            {{author}} schreibt:
        </div>
        {{text}}
        <br><br>
        <div class="toolbar">
            <div v-for="emotion in emo" :key="emotion.id">
                <button class="option">
                    <span v-html="emotion.html"></span>
                </button>
                {{emotion.count}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: ['author','img','profileId','postId','text','reactions'],
        mounted: function(){
            console.log("Reactions: "+JSON.stringify(this.reactions));
            for(var i = 0; i < this.reactions.length; i++) {
             console.log(this.reactions[i]["smiley"]);
                console.log(this.reactions[i]["smiley"]);
                console.log(this.reactions[i]["count"]);

                for ( var x=0; x < this.emo.length; x++)
                {
                    console.log("Emo:"+this.emo[x].id);

                    if ( this.emo[x].id === (":"+this.reactions[i]["smiley"]+":") )
                    {
                        this.emo[x].count = this.reactions[i]["count"];
                        break;
                    }
                }
            }
        },
        data: function(){
            return {
                emo: [{
                        id: ":heart_eyes:",
                        html: "&#128525;",
                        html2: "&#x1f60d;",
                        count: 0
                    },
                    {
                        id:":heart:",
                        html:"❤️",
                        html2:"&#65039;",
                        count: 0
                    },
                    {
                        id: ":rage:",
                        html:"&#128545;",
                        html2:"&#x1f621;",
                        count: 0
                    },
                    {
                        id:":joy:",
                        html:"&#128514;",
                        html2:"&#x1f602;",
                        count: 0
                    },
                    {
                        id:":cry:",
                        html:"&#128546;",
                        html2:"&#x1f622;",
                        count: 0
                    },
                    {
                        id:":flushed:",
                        html:"&#128563;",
                        html2:"&#x1f633;",
                        count: 0
                    },
                    {
                        id:":satisfied:",
                        html:"&#128518;",
                        html2:"&#x1f606;",
                        count: 0
                    }
                    ]
            }
        }
    }
</script>

<style scoped>
    .post {
        max-width: 340px;
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
</style>