<template>
  <v-container>
    <transition appear>
      <v-layout>
        <v-row class="mb-6" align="center">
          <v-col v-if="!isAuthenticated" class="mx-auto" cols="12">
            <h5>ログイン</h5>
            <p class="caption">メールアドレス、パスワードを入力してください</p>
            <v-form v-model="form" ref="form">
              <v-text-field
                type="email"
                label="メールアドレスを入力"
                v-model="email"
                rounded
                :rules="[rules.required, rules.email]"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                type="password"
                label="パスワードを入力"
                v-model="password"
                rounded
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
            </v-form>
            <v-btn 
              @click="loginWithEmailAndPw" 
              depressed 
              class="login-btn" 
              color="primary" 
              :loading="loading"
              :disabled="!form"
              >
              ログイン
            </v-btn>
            <br>
            <p>{{ logInErrorMessage }}</p>
            <ChangePw v-show="changePw" />
            <v-chip v-show="!changePw" @click="changePw = !changePw" x-small>パスワードをお忘れの場合</v-chip>
            <v-chip v-show="changePw" @click="changePw = false" x-small>しまう</v-chip>
            <nuxt-link to="resister">
              <p class="caption mb-1 mt-2" v-if="unuser">アカウントをお持ちではないですか？</p>
            </nuxt-link>
          </v-col>
          <!-- モバイル表示 -->
          <div v-if="$vuetify.breakpoint.smAndDown" class="login-m mx-auto">
            <v-col cols="12" class="mt-6">
              <v-btn v-if="!isAuthenticated" @click="login" depressed width="200" class="login-btn" color="red">
                <v-icon x-small left color="#fff">mdi-google</v-icon>
                <v-divider vertical class="mr-6"></v-divider>
                Googleでログイン
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="!isAuthenticated" @click="loginWithTwitter" depressed width="200" class="login-btn" color="blue">
                <v-icon x-small left color="#fff">mdi-twitter</v-icon>
                <v-divider vertical class="mr-5"></v-divider>
                Twitterでログイン
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="!isAuthenticated" @click="loginWithFacebook" depressed width="200" class="login-btn" color="#4267B2">
                <v-icon x-small left color="#fff">mdi-facebook</v-icon>
                <v-divider vertical class="mr-3"></v-divider>
                <span>Facebookでログイン</span>
              </v-btn>
            </v-col>
          </div>
          <!-- PC表示 -->
          <div v-else class="login-pc mx-auto">
            <v-col cols="12" class="mt-6">
              <v-btn v-if="!isAuthenticated" @click="loginPu" depressed width="200" class="login-btn" color="red">
                <v-icon x-small left color="#fff">mdi-google</v-icon>
                <v-divider vertical class="mr-6"></v-divider>
                Googleでログイン
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="!isAuthenticated" @click="loginWithTwitterPu" depressed width="200" class="login-btn" color="blue">
                <v-icon x-small left color="#fff">mdi-twitter</v-icon>
                <v-divider vertical class="mr-5"></v-divider>
                Twitterでログイン
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="!isAuthenticated" @click="loginWithFacebookPu" depressed width="200" class="login-btn" color="#4267B2">
                <v-icon x-small left color="#fff">mdi-facebook</v-icon>
                <v-divider vertical class="mr-3"></v-divider>
                <span>Facebookでログイン</span>
              </v-btn>
            </v-col>
          </div>
        </v-row>
      </v-layout>
    </transition>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import ChangePw from '~/components/ChangePw'

export default {
  components: {
    ChangePw
  },
  data() {
    return {
      overlay: true,
      email: '',
      password: '',
      logInErrorMessage: '',
      changePw: false,
      loading: false,
      form: true,
      unuser: false,
      loggedInUser: '',
      rules: {
          required: value => !!value || '必須項目です',
          counterMax: value => value.length <= 20 || '20文字以内で入力してください',
          counterMin: value => value.length >= 8 || '8文字以上で入力してください',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'メールアドレス形式で入力してください'
          },
        },
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
        })
    },
    loginWithTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
        })
    },
    loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
        })
    },
    loginWithEmailAndPw() {
      this.loading = true
      const email = this.email
      const password = this.password
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.loading = false
        const userId = firebase.auth().currentUser.uid
        const user = result.user
        this.setUser(user)
        // this.$router.push({ name: 'id', params: {id: `${userId}`}})
      })
      .catch((error) => {
        this.unuser = true
        this.loading = false
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
          this.logInErrorMessage = "ログインできません。ユーザーID,パスワードをご確認ください。"
        }else{
          this.logInErrorMessage = "ログインできませんでした。"
        }
        console.log(errorMessage)
        console.log(errorCode)
      });
    },
    loginPu() {
      this.overlay = true
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
          this.overlay = false
        })
    },
    loginWithTwitterPu() {
      this.overlay = true
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = credential.accessToken;
          var secret = credential.secret;

          // The signed-in user info.
          // var user = result.user;
          // ...
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
          this.overlay = false
        })
    },
    loginWithFacebookPu() {
      this.overlay = true
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          // this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
          this.overlay = false
        })
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          alert('LoggedOut')
          this.$router.push('/')
        })
        .catch((e) => {
          alert('Couldnt LoggedOut')
          console.log(e)
        })
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        const loggedInUser = user.uid
        this.setUser(user)
        this.$router.push({ name: 'id', params: {id: `${loggedInUser}`}})
      } else {
        this.overlay = false
      }
    })
  },
}
</script>

<style scoped>
.v-enter-active, .v-leave-active {
  transform: translate(0px, 0px);
  transition: transform 1s cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(30vh) translateY(0px);
}

.login-btn {
  text-transform: none;
  color: #fff;
  font-size: 12px;
  background: #E6E7EE;
}
</style>
