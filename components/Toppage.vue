<template>
  <v-container fluid class="ml-0">
    <v-layout>
      <v-row align="center" justify="center">
        <v-col class="pa-0" align="center" style="border: 1px solid black">
          <v-col class="pa-0">
            <v-card class="card" height="80vh"></v-card>
          </v-col>
        </v-col>
        
        <v-col align="center" style="border: 1px solid black">
          <v-col>
            <v-btn v-if="!isAuthenticated" @click="login" depressed width="200" class="mb-3 login-btn" color="red">
              <v-icon x-small left color="#fff">mdi-google</v-icon>
              <v-divider vertical class="mr-6"></v-divider>
              Googleでログイン
            </v-btn>
            <v-btn v-if="!isAuthenticated" @click="loginWithTwitter" depressed width="200" class="mb-3 login-btn" color="blue">
              <v-icon x-small left color="#fff">mdi-twitter</v-icon>
              <v-divider vertical class="mr-5"></v-divider>
              Twitterでログイン
            </v-btn>
            <v-btn v-if="!isAuthenticated" @click="loginWithFacebook" depressed width="200" class="login-btn" color="#4267B2">
              <v-icon x-small left color="#fff">mdi-facebook</v-icon>
              <v-divider vertical class="mr-3"></v-divider>
              <span>Facebookでログイン</span>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.login-btn {
  text-transform: none;
  color: #fff;
  font-size: 12px;
  border-radius: 15px;
  background: #E6E7EE;
  box-shadow:  10px 10px 20px #a8a9ae,
              -10px -10px 20px #ffffff;
}

.card {
  background-image: url("~@/assets/top.jpg");
  background-size: contain;
}

</style>
