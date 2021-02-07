<template>
  <v-container>
    <v-layout>
      <v-col align="center">
        <LogIn />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import LogIn from '~/components/LogIn'

export default {
  head() {
    return {
      title: 'login'
    }
  },
  components: {
    LogIn
  }
}
</script>
