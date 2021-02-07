<template>
  <v-container class="px-2">
    <h4 align="center">- editor -</h4>
    <Editor />
  </v-container>
</template>

<script>
import Editor from '~/components/Editor'

export default {
  head() {
    return {
      title: 'editor'
    }
  },
  components: {
    Editor
  }
}
</script>

<style scoped>
h4 {
  font-family: 'Oleo Script';
  color: #333;
}

</style>
