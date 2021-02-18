<template>
  <v-container>
    <v-form v-model="form" ref="form">
      <p class="caption mb-0">パスワード変更用のメールを送信致します。</p>
      <p class="caption">メールアドレスを入力してください。</p>
      <v-text-field 
        type="email" 
        label="メールアドレスを入力" 
        v-model="email" 
        outlined 
        rounded 
        dense
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-btn @click="sendMail" depressed :disabled="!form">メール送信</v-btn>
    </v-form>
    <p class="body-2 mb-0 mt-2">{{ erroredMessage }}</p>
    <p class="body-2">{{ erroredMessageEn }}</p>
  </v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      erroredMessage: '',
      erroredMessageEn: '',
      form: true,
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
    sendMail() {
      const auth = firebase.auth();
      const emailAddress = this.email
      auth.sendPasswordResetEmail(emailAddress).then(() => {
        // Email sent.
        alert('メールが送信されました')
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        if(errorCode == 'auth/user-not-found') {
          this.erroredMessage = 'IDが見当たりません'
          this.erroredMessageEn = errorMessage
        } else{
          this.erroredMessage = 'エラーが発生しました'
          this.erroredMessageEn = errorMessage
        }
      });
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
}
</script>
