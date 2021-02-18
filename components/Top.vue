<template>
  <v-container class="pb-0" fluid>
    <v-layout class="main">
      <v-row align="center">
        <!-- modal section -->
        <v-dialog
          :value="dialog"
          fullscreen
        >
          <v-app-bar class="appbar mt-5" max-width="90%" color="rgba(255, 255, 255, 0)" flat fixed>
            <v-toolbar-title>
              <h1 class="logo pa-3" @click="dialog = false" style="cursor:pointer">
                <v-img width="100px" :src="require('@/assets/ItsMe_Logo.png')"></v-img>
              </h1>
            </v-toolbar-title>
          </v-app-bar>
          <v-card class="mx-2" align="center" color="255, 255, 255, 0">
          <v-btn class="prev-btn" @click="prev" outlined small>
            back
          </v-btn>
          <v-btn class="next-btn" @click="model++" outlined small>
            next
          </v-btn>
            <v-carousel class="slide" v-model="model" height="auto" hide-delimiters light :show-arrows="false">
              <!-- <v-banner color="primary">
                <v-pagination
                  v-model="model"
                ></v-pagination>
              </v-banner> -->
              <!-- <v-carousel-item></v-carousel-item> -->
              <v-carousel-item class="about pt-8">
                <h2 class="mb-4" style="font-family:'Oleo Script'">Welcome</h2>
                <p class="body-2">It'Meへようこそ。</p>
                <p class="body-2">It'Meでは、あなたを知ってもらうために</p>
                <p class="body-2">「ホームページを作るまでもない」</p>
                <p class="body-2">「そもそもどうやって作ればよいか分からない」</p>
                <p class="body-2">「手軽にポートフォリオを作成したい」</p>
                <p class="body-2">という方にぴったりのサービスです</p>
                <p class="body-2">まずは是非、サンプルをご覧ください</p>
                <h4 style="font-family:'Oleo Script'">Here We Go!!</h4>
                <v-icon @click="model++">mdi-chevron-double-right</v-icon>
                <p v-if="$vuetify.breakpoint.smAndDown" class="caption mt-4">スワイプで移動できます</p>
              </v-carousel-item>
              <v-carousel-item>
                <h3 style="color:#333">Inoue(開発者)のページ</h3>
                <Sample class="mx-auto px-2"/>
              </v-carousel-item>
              <v-carousel-item>
                <h3>Sergioさんのページ</h3>
                <Sample2 class="mx-auto px-2"/>
              </v-carousel-item>
            </v-carousel>
            <v-chip class="btn" @click="dialog = false" outlined>
              サービスへ
            </v-chip>
          </v-card>
        </v-dialog>

        <!-- main contents -->
        <v-col align="center" class="mt-3">
          <h1>Hello</h1>
          <h1>It'sMe</h1>
          <p>手軽にポートフォリオ作成</p>
          <!-- <p class="mt-5 mb-6">あなたを知ってもらうための１ページ</p> -->
          <p v-if="!isAuthenticated">設定はカンタン、まずはアカウント作成</p>
          <div v-if="!isAuthenticated">
            <v-row justify="center">
              <nuxt-link to="/resister">
                <v-btn depressed color="red" style="color:#fff" class="mt-4" elevation="10">はじめる</v-btn>
              </nuxt-link>
            </v-row>
            <!-- <v-row justify="center" class="my-5">
              <p class="mb-0">or</p>
            </v-row>
            <v-row justify="center">
              <nuxt-link to="/login">
                <v-btn depressed style="text-transform: none;" color="primary">ログイン・SNSアカウントでログイン</v-btn>
              </nuxt-link>
            </v-row> -->
          </div>
          <div v-if="isAuthenticated">
            <v-row justify="center" class="mt-4">
              <nuxt-link :to="`/${currentUser}`">
                <v-btn depressed color="red" style="color:#fff" elevation="10">自分の<span class="itsme">It'sMe</span>ページへ</v-btn>
              </nuxt-link>
            </v-row>
            <!-- <v-row justify="center" class="my-5">
              <p class="mb-0">or</p>
            </v-row>
            <v-row justify="center">
              <nuxt-link to="/editor">
                <v-btn depressed><span class="itsme" >It'sMe</span>エディターへ</v-btn>
              </nuxt-link>
            </v-row> -->
          </div>
          <v-col class="mt-16 btn-sample">
            <!-- <nuxt-link to="/samples"> -->
              <v-btn @click="dialog=true" color="primary" rounded elevation="10">サンプルを見る</v-btn>
            <!-- </nuxt-link> -->
          </v-col>
        </v-col>
      </v-row>
    </v-layout>  
  </v-container>  
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import LogIn from '~/components/LogIn'
import Sample from '~/components/Sample'
import Sample2 from '~/components/Sample2'

export default {
  components: {
    LogIn,
    Sample,
    Sample2,
  },
  data () {
    return {
      userInfo: '',
      currentUser: '',
      lastname: '',
      firstname: '',
      imageUrl: null,
      dialog: false,
      model: 0
    }
  },
  methods: {
    ...mapActions(['setUser']),
    prev(){
      if(this.model == 0){
        this.model = 2
      } else {
        this.model--
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.currentUser = user.uid
        this.lastname = user.lastname
        this.setUser(user)

        let userDoc = db.collection('profs').doc(this.currentUser)
          userDoc.get()
          .then((doc) => {
            if(doc.exists) {
              this.userInfo = doc.data()
              this.firstname = this.userInfo.firstname
              this.lastname = this.userInfo.lastname
              this.imageUrl = this.userInfo.image
            }
          })
      }
    })
  },
}
</script>

<style scoped>
.btn {
  /* color: #fff; */
  top: 90%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 200;
  /* background: linear-gradient(270deg, #000080, #bbbbe3, #e05c30);
  background-size: 600% 600%; */
}

.prev-btn {
  top: 70%;
  left: 5%;
  position: fixed;
  z-index: 200;
}
.next-btn {
  top: 70%;
  right: 5%;
  position: fixed;
  z-index: 200;
}
.appbar {
  margin: 0 auto;
}

.slide {
  padding-top: 12vh;
}
.itsme {
  /* font-family: 'Oleo Script';
  font-weight: bold;
  color: #C3887D; */
  text-transform: none;
}
.btn-sample {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-content: center;
}

</style>
