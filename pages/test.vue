<template>
<v-container>
  <div class="test">
    <h3>
    <vue-arc-text ref="arctext" :text=text :arc=+arc :direction=direction></vue-arc-text>
    </h3>
    <v-row>
      <v-col>
        <span>i-t-s.me/</span>
        <v-text-field value="ご希望のユーザー名" v-model="originalUserName" @change="check"></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="check">check</v-btn>
    <v-btn @click="save">check</v-btn>
    <p>{{ originalUserName }}</p>
    <p>{{ isUser }}</p>
    <vue-scroll-snap :horizontal="true">
    <div class="item"><v-img width="100px" :src="require('@/assets/ItsMe_Logo.png')"></v-img></div>
    <div class="item"><v-img width="100px" :src="require('@/assets/ItsMe_Logo.png')"></v-img></div>
    ...
  </vue-scroll-snap>
  </div>
</v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import VueArcText from 'vue-arc-text'
import VueScrollSnap from "~/components/VueScrollSnap";

export default {
  components: {
    VueArcText,
    VueScrollSnap
  },
  methods: {
    save() {
      var user = firebase.auth().currentUser.uid
      if(confirm('保存しますか？')){
        db.collection('profs').doc(user)
        .set({
          userId: this.originalUserName
        })
      }
    },
    check(){
      let self = this
      const username = this.originalUserName
      console.log('ok')
      const query = firebase.firestore().collection('profs')
      query.where("userId", "==", username).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if(doc.data().userId){
              // doc.data() is never undefined for query doc snapshots
              self.isUser = true
              console.log('aru')
            }
            if(!doc.data().userId) {
              self.isUser = false
              console.log('nai')
            }
        });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      }
    // ...mapActions(['setUser']),
    // async save() {
    //   const user = this.originalUserName
    //   await db.collection('profs').doc(user)
    //     .set({
    //       originalUserName: this.originalUserName
    //     })
    // }
  },
  data() {
    return {
      originalUserName: '',
      text: 'oppai',
      direction: 1,
      arc: 45,
      isUser: false,
    }
  },
  computed: {
    isUserId() {
      return this.isUser
    }
  }
}
</script>


<style scoped>
.test{
  width: 200px;
}
.item {
    /* Set the minimum height of the items to be the same as the height of the scroll-snap-container.*/
    min-height: 500px;
  }

  .scroll-snap-container {
    height: 500px;
    width: 500px;
  }
</style>

</style>
