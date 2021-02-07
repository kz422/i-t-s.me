<template>
  <v-app class="main mainbg">
    <div align="center" class="mt-12 appbar">
      <Appbar />
    </div>
    <nuxt />
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-col class="text-center py-0">
        <small class="footer-logo mr-1">&copy; It'sMe - 2021</small><v-icon color="#C3887D" small>mdi-brain</v-icon>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import Appbar from '~/components/Appbar'

export default {
  components: {
    Appbar
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          var userId = firebase.auth().currentUser.uid
          const user = result.user
          this.setUser(user)
          this.$router.push(`/users/${userId}`)
        }).catch((error) => {
          alert(error)
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
    }
  },
  data () {
    return {
      loggedInUser: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    mypage() {
      return `/users/${this.loggedInUser}`
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.loggedInUser = user.uid
        this.setUser(user)

        db.collection('profs').doc(user.uid).get()
          .then((doc) => {
            const isDataExits = doc.data()
            if(!isDataExits) {
              db.collection('profs').doc(user.uid).set({
                loggedInUser: user.uid,
              })
            }
          })
      }
    })
  },
}
</script>

<style scoped>
.main {
  font-family: 'Arial',;
  background: #E6E7EE;
  letter-spacing: 2px;
}

.appbar {
  z-index: 201;
}

</style>

<style>
a {
  text-decoration: none;
}

.footer-logo {
  font-family: 'Oleo Script';
  font-weight: lighter;
  letter-spacing: 0;
  /* color: #C3887D; */
}


</style>
