<template>
    <div class="ProfileCard">
        <h1>Profil</h1>
        <h2>{{profile.displayName}}</h2>
        <div>
            <img class="preview" :src="picture">
            <br>
            <button @click="onUpload">Upload</button>
        </div>
        <div>
            <input type="file" @change="previewImage" accept="image/*" >
        </div>
        <div>
            <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>

        <br>
        <div class="logout">
            <a href="/logout">Logout</a>
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import * as firebase from "firebase";

    export default {
        name: "Profile",
        data: function(){
          return {
              profile: {displayName: "Kurt"},
              imageData: null,
              picture: null,
              uploadValue: 0
          }
        },
        methods: {
          loadProfile: function (response) {
              this.profile = response
              this.picture = response['photoUrl']
              this.$store.commit('SET_PROFILE_PHOTO_URL', response['photoUrl'])
              this.$store.commit('SET_USER_NAME', response['displayName'])
              console.log("Loading: "+response['photoUrl']);
              firebase.storage().ref(response['photoUrl']).getDownloadURL().then((url) => {
                  console.log("DOWNLOAD URL "+url)
                  this.picture = url
              }).catch(function(error)
              {
                  console.log(error)
              })
          },
            previewImage(event) {
                this.uploadValue=0;
                this.picture=null;
                this.imageData = event.target.files[0];
            },

            onUpload(){
                this.picture=null;
                console.log("Path: "+`${this.imageData.name}`);
                const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
                storageRef.on(`state_changed`,snapshot=>{
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, error=>{console.log(error.message)},
                    ()=>{this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.picture = url
                            this.$store.commit('SET_PROFILE_PHOTO_URL', url)
                            axios
                                .get(this.$store.state.apiScheme+this.$store.state.url+'/user/setprofilephoto'
                                    + '?tokenId=' +this.$store.state.accessToken
                                    + '?userId=' +this.$store.state.userId
                                    + '?photoUrl=' +`${this.imageData.name}`
                                )
                                .then(response => (
                                    console.log(response.data + " vs "+url)
                                ))
                                .catch(error => console.log(error));

                        });
                    }
                );
            }
        },
        mounted: function () {
            axios
                .get(this.$store.state.apiScheme+this.$store.state.url+'/user/info'+'?userId='+this.$store.state.userId+'?tokenId='+this.$store.state.accessToken)
                .then(response => (
                    this.loadProfile(response.data)
                ))
                .catch(error => console.log(error));
        },
        upload: function () {
            firebase.storage().ref("").put()
        }
    }
</script>

<style scoped>
    .ProfileCard{
        width: 400px;
        margin: 0 auto;
        padding: 50px;
        font-size: 20px;
    }
    .profileImg{
        transition: all ease 0.4s;
        display: block;
    }
    .background
    {
        border: 1px solid black;
        display: inline;
        width: 200px;
        height: 200px;
        position: absolute;

        transition: all ease 0.4s;
    }
    .logout{
        margin-top: 70px;
    }
    .profileImg img{
        transition: all ease 0.4s;
    }
    .profileImg:hover img{;
        opacity: 0.4;
        transition: all ease 0.4s;
    }
    .profileImg:hover .background{
        background: url("../assets/add.png") no-repeat;
        background-size: contain;
        transition: all ease 0.4s;
    }
    img.preview {
        width: 200px;
    }
</style>