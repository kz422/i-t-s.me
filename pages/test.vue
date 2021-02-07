<template>
<v-container>
  <div class="test">
    <h3>
    <vue-arc-text ref="arctext" :text=text :arc=+arc :direction=direction></vue-arc-text>
    </h3>
    <v-row>
      <v-col>
        <span>i-t-s.me/</span>
        <v-text-field value="ご希望のユーザー名" v-model="originalUserName"></v-text-field>
      </v-col>
    </v-row>
    <v-btn @click="save">save</v-btn>
    <p>{{ originalUserName }}</p>
  </div>
</v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
import VueArcText from 'vue-arc-text'

export default {
  components: {
    VueArcText
  },
  methods: {
    ...mapActions(['setUser']),
    async save() {
      const user = this.originalUserName
      await db.collection('profs').doc(user)
        .set({
          originalUserName: this.originalUserName
        })
    }
  },
  data() {
    return {
      originalUserName: '',
      text: 'oppai',
      direction: 1,
      arc: 45
    }
  }
}
</script>


<style scoped>
.test{
  width: 200px;
}


</style>
