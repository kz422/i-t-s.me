<template>
  <div class="container">
    <v-app-bar class="appbar" max-width="95%" color="rgba(255, 255, 255, 0)" flat>
      <v-toolbar-title>
        <nuxt-link to="/">
          <h1 class="logo pa-3"><v-img width="100px" :src="require('@/assets/ItsMe_Logo.png')"></v-img></h1>
        </nuxt-link>
      </v-toolbar-title>
      <div>
      </div>
      <v-spacer></v-spacer>
      <!-- <nuxt-link to="/resister">
        <v-btn depressed color="red" style="color:#fff" small rounded v-if="!isAuthenticated && $route.path === '/'">はじめる</v-btn>
      </nuxt-link> -->
      <v-icon class="ml-3" @click="drawer = !drawer">mdi-dots-vertical</v-icon>
    </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        right
      >
        <v-list
          nav
        >
          <v-list-item v-if="isAuthenticated" class="mb-0">
            <v-list-item-avatar size="35"><v-img width="200px" :src="imageUrl"></v-img></v-list-item-avatar>
            <p class="mb-0 caption">{{ firstname }} さん</p>
          </v-list-item>
          <v-list-item>
            <v-col>
              <nuxt-link to="/resister">
                <v-btn v-if="!isAuthenticated" depressed width="200" class="my-3 login-btn" color="red" style="color: #fff" small>
                  アカウント作成
                </v-btn>
              </nuxt-link>
              <nuxt-link to="/login">
                <v-btn v-if="!isAuthenticated" depressed width="200" class="my-3 login-btn" color="primary" small>
                  <!-- <v-icon x-small left>mdi-account-arrow-left</v-icon>
                  <v-divider vertical class="mr-6"></v-divider> -->
                  ログイン
                </v-btn>
              </nuxt-link>
            
              <v-btn v-if="isAuthenticated" class="btn" @click="logout" depressed width="200"><v-icon left depressed width="200" small>mdi-account-arrow-right</v-icon>
              ログアウト
              </v-btn>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <nuxt-link :to="`/${currentUser}`">
                <v-btn class="btn" v-if="isAuthenticated" depressed width="200"><v-icon left depressed width="200" small>mdi-account</v-icon>
                マイページ
                </v-btn>
              </nuxt-link>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <nuxt-link to="/editor">
                <v-btn class="btn" v-if="isAuthenticated" depressed width="200"><v-icon left depressed width="200" small>mdi-pencil</v-icon>
                エディター
                </v-btn>
              </nuxt-link>
            </v-col>
          </v-list-item>
          <v-list-item>
            <v-col>
              <v-dialog v-model="dialog" width="300">
                <v-card class="qrcode" align="center">
                  <v-card-subtitle class="pb-0 pt-2">あなたのQRコードです！</v-card-subtitle>
                  <img :src="qrUrl"/>
                </v-card>
              </v-dialog>
              <v-btn class="mb-16 btn" @click="createQr" v-if="isAuthenticated" depressed width="200">
                <v-icon left depressed width="200">mdi-qrcode</v-icon>
                QRコードを生成!
              </v-btn>
            </v-col>
            </v-list-item>
            <v-list-item>
              <v-col>
                <v-btn class="mb-16 btn caption" @click="deleteUser" v-if="isAuthenticated" depressed width="200" color="red" text outlined>
                  ユーザーを削除する
                </v-btn>
              </v-col>
            </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-icon color="#C3887D">mdi-brain</v-icon>
      </v-navigation-drawer>
  </div>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import QRCode from 'qrcode'

export default {
  methods: {
    ...mapActions(['setUser']),
    closeDraw() {
      this.drawer = false
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          var userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push(`${userId}`)
        }).catch((error) => {
          alert(error)
        })
    },
    loginWithTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          var userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push(`${userId}`)
        }).catch((error) => {
          alert(error)
        })
    },
    loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          var userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push(`${userId}`)
        }).catch((error) => {
          alert(error)
        })
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          this.closeDraw()
          alert('ログアウトしました')
          this.$router.push('/')
        })
        .catch((e) => {
          alert('Couldnt LoggedOut')
          console.log(e)
        })
    },
    createQr() {
      const url = `i-t-s.me/${this.currentUser}`
      const width = 100                // widthの指定ができます。
      QRCode.toDataURL(url, { width: width })
        .then(code => {
          this.qrUrl = code
          this.dialog = true
          console.log(url)
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteUser() {
      if(confirm('ユーザーを削除します。この操作は取り消しができません。よろしいですか？')){
        var user = firebase.auth().currentUser;
        user.delete().then(() => {
          alert('ユーザー情報が削除されました。')
        }).catch((e) => {
          alert('ユーザー情報を削除できませんでした。')
        });

        db.collection('profs').doc(this.currentUser).delete()
          .then(() => {
            this.setUser(null)
            this.$router.push('/')
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  },
  data () {
    return {
      userInfo: '',
      currentUser: '',
      clipped: false,
      drawer: false,
      lastname: '',
      firstname: 'ユーザー',
      imageUrl: require('@/assets/avatar.svg'),
      qrUrl: '',
      dialog: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
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
              if(this.userInfo.imageUrl){
                this.imageUrl = this.userInfo.imageUrl
              }
            }
          })
      }
    })
  },
}
</script>

<style scoped>
.appbar {
  margin: 0 auto;
}

.btn {
  text-transform: none;
}

.login-btn {
  text-transform: none;
  color: #fff;
  font-size: 12px;
  background: #E6E7EE;
}

</style>
