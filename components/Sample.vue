<template>
  <v-container class="px-0">
    <transition appear>
      <v-card rounded="xl" elevation="20" class="theme" :class="{plain: user.theme == 'plain', dark: user.theme == 'dark', smokypink: user.theme == 'smokypink'}">
        <div class="avatar-top pt-14 pb-10" align="center" :style="{ backgroundImage: `url(${bgImageUrl})` }">
        <h1 class="user-name">
          <vue-arc-text ref="arctext" :text=user.lastname :arc=+arc :direction=direction :class="{plainname: user.theme == 'plain' && !bgImageUrl}"></vue-arc-text>
        </h1>
        <v-avatar size="164" rounded="10" class="avatar">
        <v-img width="200px" :src="imageUrl"></v-img>
        </v-avatar>
        <h1 class="user-name">
          <vue-arc-text ref="arctext" :text=user.firstname :arc=+arc :direction=direction2 :class="{plainname: user.theme == 'plain' && !bgImageUrl}"></vue-arc-text>
        </h1>
        <!-- <v-col class="pt-0">
          <v-chip color="#fff" label>
            <h3>{{ user.lastname }} {{ user.firstname }}</h3>
          </v-chip>
        </v-col> -->
        </div>
        <!-- <div class="sns mb-4" align="center">
          <a :href="user.igUrl" v-if="user.igUrl" target="blank">
            <v-icon  color="#e4405f">mdi-instagram</v-icon>
          </a>
            <v-icon v-else>mdi-instagram</v-icon>

          <a :href="user.fbUrl" v-if="user.fbUrl" target="blank">
            <v-icon color="#4267B2">mdi-facebook</v-icon>
          </a>
            <v-icon v-else>mdi-facebook</v-icon>

          <a :href="user.twUrl" v-if="user.twUrl" target="blank">
            <v-icon color="#1DA1F2">mdi-twitter</v-icon>
          </a>
          <a :href="user.ytUrl" v-if="user.ytUrl" target="blank">
            <v-icon color="#FF0000">mdi-youtube</v-icon>
          </a>
            <v-icon v-else>mdi-youtube</v-icon>

          <a :href="user.liUrl" v-if="user.liUrl" target="blank">
            <v-icon color="#2867B2">mdi-linkedin</v-icon>
          </a>
            <v-icon v-else>mdi-linkedin</v-icon>

          <a :href="user.liUrl" v-if="user.liUrl" target="blank">
            <v-icon color="#2867B2">mdi-github</v-icon>
          </a>
            <v-icon v-else>mdi-github</v-icon>
        </div> -->
        <div class="anchors py-3" align="center">
          <v-container class="pt-0">
            <p class="mb-0 overline">- CONTENTS -</p>
            <!-- <v-divider width="20"></v-divider> -->
            <v-row align="center" justify="center" class="mx-8 mt-1">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.intro'"
                  to
                  v-if="this.user.intro && this.user.intro.length"
                >
                  <h4>AboutMe</h4>
                </nuxt-link>
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.career'"
                  to
                  v-if="this.careers && this.careers.length"
                >
                  <h4>Path</h4>
                </nuxt-link>
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.skills'"
                  to
                  v-if="this.skills && this.skills.length"
                >
                  <h4>Skill</h4>
                </nuxt-link>
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.sns'"
                  to
                >
                  <h4>SNS</h4>
                </nuxt-link>
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.links'"
                  to
                  v-if="this.link && this.link.length"
                >
                  <h4>Links</h4>
                </nuxt-link>
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.works'"
                  to
                  v-if="this.items && this.items.length"
                >
                <h4>Works</h4>
                </nuxt-link>
            </v-row>
          </v-container>
        </div>
          <v-main align="center" class="mb-10">
          <div class="mx-4">
            <v-divider></v-divider>
            <div class="top">
              <div class="py-6">
                <v-row>
                  <v-col>
                    <h5>出身</h5>
                    <v-icon class="pt-1" small>mdi-map-marker</v-icon>
                    <p class="body-2">{{ user.from }}</p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h5>Contacts</h5>
                    <a :href="`mailto:${user.email}`" v-if="user.email" target="_blank" rel="noov-chipener noreferrer">
                      <v-icon>mdi-email-send</v-icon>
                      <!-- <p class="body-2">メール</p> -->
                    </a>
                      <v-icon v-else small>mdi-email-remove</v-icon>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <h5>誕生日</h5>
                    <v-icon class="pt-1" small>mdi-cake-variant</v-icon>
                    <p class="body-2 mt-1" v-if="secretBirthday">ヒミツ</p>
                    <p class="body-2 mt-1" v-else>{{ user.birthday }}</p>
                  </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <h5>好きなもの</h5>
                <v-chip class="body-2 mt-4 mx-1" v-for="favorite in user.favorites" :key="favorite.id">{{ favorite }}</v-chip>
              </div>
            </div>

              <v-divider></v-divider>

            <div class="intro my-10" v-if="this.user.intro && this.user.intro.length">
              <h3>AboutMe</h3>
              <p class="body-2">{{ user.intro }}</p>
              <v-divider></v-divider>
            </div>

            <div class="career my-10" v-if="this.careers && this.careers.length">
              <h3 class="mb-3">Path</h3>
              <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item v-for="career in careers" :key="career.id" small fill-dot icon="mdi-account-star">
                  <p class="mb-2" style="font-style: italic">{{ career.careerAge }}</p>
                  <v-card class="body-1">
                    <h5 class="py-2">
                      {{ career.career }}
                    </h5>
                    <v-card-text class="pt-0 career-exp">{{ career.careerExp }}</v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              <v-divider class="mt-10"></v-divider>
            </div>

            <div class="skills my-10" v-if="this.skills && this.skills.length">
              <h3 class="mb-3">Skill</h3>
              <v-chip class="mt-1 mx-1 handle" v-for="skill in skills" :key="skill.id" :color="skill.skillColor" text-color="#f9f9f9">{{ skill.skill }}</v-chip>
              <v-divider class="mt-10"></v-divider>
            </div>

            <div class="sns my-10">
              <h3>SNS</h3>
              <a :href="user.igUrl" v-if="user.igUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon  color="#e4405f">mdi-instagram</v-icon>
              </a>
                <v-icon v-else>mdi-instagram</v-icon>

              <a :href="user.fbUrl" v-if="user.fbUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon color="#4267B2">mdi-facebook</v-icon>
              </a>
                <v-icon v-else>mdi-facebook</v-icon>

              <a :href="user.twUrl" v-if="user.twUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon color="#1DA1F2">mdi-twitter</v-icon>
              </a>
                <v-icon v-else>mdi-twitter</v-icon>

              <a :href="user.ytUrl" v-if="user.ytUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon color="#FF0000">mdi-youtube</v-icon>
              </a>
                <v-icon v-else>mdi-youtube</v-icon>

              <!-- <a :href="user.liUrl" v-if="user.liUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon color="#2867B2">mdi-linkedin</v-icon>
              </a>
                <v-icon v-else>mdi-linkedin</v-icon>

              <a :href="user.liUrl" v-if="user.liUrl" target="_blank" rel="noov-chipener noreferrer">
                <v-icon color="#2867B2">mdi-github</v-icon>
              </a>
                <v-icon v-else>mdi-github</v-icon> -->
              <v-divider class="mt-10"></v-divider>
            </div>

            <div class="links my-10" v-if="this.link && this.link.length">
              <h3>Links</h3>
              <v-chip class="mt-4 mx-1" v-for="url in user.urls" :key="url.id" text-color="blue">
                <a :href="`${url.url}`" target="_blank" rel="noov-chipener noreferrer">
                  {{ url.urlName }}
                </a>
                <v-icon x-small>mdi-open-in-new</v-icon>
              </v-chip>
              <v-divider class="mt-10"></v-divider>
            </div>
          </div>
            <div v-if="this.items && this.items.length" class="works mx-1">
              <h3 class="mb-6">Works</h3>
              <p class="mb-1" style="font-family: Courier">{{ model + 1 }} / {{ items.length }}</p>
              <v-card
                max-width="600"
                class="mx-auto mb-4"
                color="#f9f9f9"
              >
                <v-carousel
                  delimiter-icon="mdi-minus"
                  height="auto"
                  show-arrows-on-hover
                  hide-delimiters
                  continuous
                  v-model="model"
                >
                  <v-carousel-item
                    v-for="item in items"
                    :key="item.id"
                  >
                    <v-img :src="item.slideImage" contain max-height="500" max-width="600"></v-img>
                    <div class="slide-text">
                      <p v-if="item.text && item.text.length" class="pt-2 pb-1 px-6 mb-0 caption" style="color: black">
                        {{ item.text.slice(0, 50) }}
                        <span v-show="item.text.length > 50">
                        ...
                      </span>
                      </p>
                      <v-btn v-if="item.text.length > 50" @click="slideDialogSwitch(item)" x-small color="primary" outlined class="mb-2">
                        詳しく
                      </v-btn>
                      <v-col class="py-0">
                        <a :href="`${item.url}`" target="_blank" rel="noov-chipener noreferrer">
                          <v-chip v-if="item.url" class="my-0" x-small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                        </a>
                      </v-col>
                    </div>
                  </v-carousel-item>
                </v-carousel>
              </v-card>
              <v-dialog
                v-model="slideDialog"
                v-if="currentSlide"
                height="500"
                width="600"
                overlay-opacity="5"
              >
                <v-row align="center" justify="center" class="mx-0">
                  <v-card height="500" width="600" dark align="center" class="slide-dialog px-0" :style="{ backgroundImage: `url(${currentSlide.slideImage})` }">
                    <v-overlay
                      :absolute="absolute"
                      :value="slideDialog"
                    >
                    <p>{{ currentSlide.text }}</p>
                    <a :href="`${currentSlide.url}`" target="_blank" rel="noov-chipener noreferrer">
                      <v-chip v-if="currentSlide.url" class="my-0" small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                    </a>
                    <p></p>
                    <v-btn class="mr-1" @click="slideDialog = false">Close</v-btn>
                    </v-overlay>
                  </v-card>
                </v-row>
              </v-dialog>
            </div>

            <v-list-group append-icon="mdi-share-variant-outline">
              <v-list>
                <v-row align="center" justify="center">
                  <v-col>
                    <v-chip>
                      <v-list-item align-self="center">
                        <a :href="`https://twitter.com/intent/tweet?url=i-t-s.me/${id}&text=${user.firstname}のIt'sMe`" align-self="center" target="_blank" rel="noov-chipener noreferrer">
                          <v-icon small class="mr-2">mdi-twitter</v-icon>Twitterでシェア
                        </a>
                      </v-list-item>
                    </v-chip>
                  </v-col>
                  <v-col>
                    <v-chip>
                      <v-list-item>
                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=i-t-s.me/${id}`" target="_blank" rel="noov-chipener noreferrer">
                          <v-icon small class="mr-2">mdi-facebook</v-icon>Facebookでシェア
                        </a>
                      </v-list-item>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-list>
            </v-list-group>
          </v-main>

      </v-card>
    </transition>
  </v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import VueArcText from 'vue-arc-text'

export default {
  components: {
    VueArcText
  },
  methods: {
    slideDialogSwitch(item) {
      this.currentSlide = item
      this.slideDialog = true
    }
  },
  data() {
    return {
      currentSlide: null,
      model: 0,
      overlay: false,
      absolute: true,
      slideDialog: false,
      id: this.$route.params.id,
      user: '',
      skills: '',
      careers: '',
      link: '',
      items: '',
      secretBirthday: '',
      bgImageUrl: '',
      imageUrl: require('@/assets/avatar.svg'),
      anchors: [
        {name: 'AboutMe', class: 'intro'},
        {name: 'CareerPath', class: 'career'},
        {name: 'Skill', class: 'skills'},
        {name: 'SNS', class: 'sns'},
        {name: 'Links', class: 'links'},
        {name: 'Works', class: 'works'},
      ],
      direction: 1,
      direction2: -1,
      arc: 180
    }
  },
  async mounted() {
    let userDoc = await db.collection('profs').doc('3pOB0cOhx6b4L0qLthQGIaGzdZH3')
      userDoc.get()
      .then((doc) => {
        if(doc.exists) {
          this.user = doc.data()
          this.skills = this.user.skills
          this.careers = this.user.careers
          this.link = this.user.urls
          this.items = this.user.items
          this.bgImageUrl = this.user.bgImage
          this.secretBirthday = this.user.secretBirthday
          if(this.user.imageUrl){
          this.imageUrl = this.user.imageUrl
          }
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

.test {
  border-radius: 20px;
  background: #E6E7EE;
  box-shadow:  10px 10px 20px #a8a9ae,
              -10px -10px 20px #ffffff;
}

.plain {
  color: #31344B;
  background: #f9f9f9;
}
.plainname {
  color: #31344B;
}
.dark {
  background-color: #3a4164;
  color: #f9f9f9;
}
.smokypink {
  background-color:#C3887D;
  color: #f9f9f9;
}

.theme--light.v-divider {
  border-color: rgba(191, 178, 176,0.6) !important; 
}

.theme--light.v-timeline::before {
  background: rgba(191, 178, 176,0.6) !important; 
}

.avatar {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  border: 5px solid #fff;
}

.avatar-top {
  background-size: cover;
  height: auto;
}

a,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
}

.intro {
  white-space: pre-wrap;
  word-wrap:break-word;
}

.career-exp {
  white-space: pre-wrap;
  word-wrap:break-word;
}

.slide-dialog{
  white-space: pre-wrap;
  word-wrap:break-word;
  background-size: cover;
  background-position: center;
  background-color: 255,255,255, 0.8;
  background-blend-mode:lighten;
}
.slide-text {
  background-color:#f9f9f9;
}

.anchors .theme--light.v-sheet {
  background: none;
}

.anchor-link {
  margin-right: 12px;
  margin-left: 12px;
}

.theme--light.v-list{
  background: rgba(0, 0, 0, 0);
}

.user-name {
  font-size: 32px;
  color: #fff;
  font-family: Futura;
}

</style>
