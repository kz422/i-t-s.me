<template>
  <v-container class="px-2">
    <Mypage />
  </v-container>
</template>

<script>
import Mypage from '~/components/Mypage'

export default {
  head() {
    return {
      title: 'MyPage'
    }
  },
  components: {
    Mypage
  }
}
</script>
