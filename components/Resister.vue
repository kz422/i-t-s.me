<template>
  <v-container>
    <transition appear>
      <v-main>
      <h5>新規アカウント作成</h5>
      <p class="caption">登録するメールアドレス、パスワードを入力してください</p>
      <v-form v-model="form">
        <v-text-field 
          type="email" 
          label="メールアドレスを入力"
          v-model="email" 
          outlined rounded
          dense
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          :type="show1 ? 'text' : 'password'"
          label="パスワードを入力"
          v-model="password" 
          outlined 
          rounded
          dense
          counter
          hint="パスワードは8文字以上、20文字以内で設定してください"
          persistent-hint
          :rules="[rules.required, rules.counterMin, rules.counterMax, rules.numEn]"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <!-- <p class="caption mb-0 mt-4">以上の内容で</p> -->
        <v-btn class="mt-2" @click="signUp" depressed :loading="loading" color="primary" style="color:#fff" :disabled="!form">
          アカウント作成
        </v-btn>
        <nuxt-link to="/login" class="caption">
          <p>ご登録済みの方はこちら</p>
        </nuxt-link>
        <p>{{ createUserErrorMessage }}</p>
        <p class="mb-0 caption">または</p>
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
      </v-form>
      </v-main>
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

export default {
  data() {
    return {
      show1: false,
      overlay: true,
      form: false,
      email: '',
      password: '',
      createUserErrorMessage: '',
      loading: false,
      rules: {
          required: value => !!value || '必須項目です',
          counterMax: value => value.length <= 20 || '20文字以内で入力してください',
          counterMin: value => value.length >= 8 || '8文字以上で入力してください',
          numEn: (value) => /^[0-9a-zA-Z]*$/.test(value) || '半角英数で入力してください',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'メールアドレス形式で入力してください'
          },
        },
    }
  },
  methods: {
    sendVeriMail() {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification()
    },
    ...mapActions(['setUser']),
    async signUp() {
      this.loading = true
      const email = this.email
      const password = this.password
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // Signed in
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push('/editor')
          this.loading = false

          console.log(user)
        })
        .catch((error) => {
          this.loading = false
          var errorCode = error.code;
          var errorMessage = error.message;
          if(errorCode == 'auth/email-already-in-use') {
            this.createUserErrorMessage = "すでに登録されているIDです"
          } else {
            this.createUserErrorMessage = errorMessage
          }
          console.log(errorMessage)
          console.log(errorCode)
        });
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
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
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
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
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
        })
    },
    loginPu() {
      this.overlay = true
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
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
          const userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
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
          this.$router.push({ name: 'id', params: {id: `${userId}`}})
        }).catch((error) => {
          alert(error)
          this.overlay = false
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
