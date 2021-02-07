<template>
  <v-container>
    <v-layout>
      <v-col align="center">
        <Resister />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import Resister from '~/components/Resister'

export default {
  head() {
    return {
      title: 'resister'
    }
  },
  components: {
    Resister
  }
}
</script>
