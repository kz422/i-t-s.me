<template>
  <transition appear>
  <v-container class="px-0 pt-0">
    <div 
      class="fixed-bar" 
      :class="{smdisp:$vuetify.breakpoint.smAndDown}"
      v-if="this.user.intro && this.user.intro.length || this.careers && this.careers.length || this.skills && this.skills.length || this.link && this.link.length || this.items && this.items.length || user.igUrl || user.fbUrl || user.twUrl || user.ytUrl"  
    >
      <p v-show="scrollY < 100" class="mb-0 caption" align="center" style="color:#3a4164">- CONTENTS -</p>
      <v-toolbar class="px-0 mb-2" color="rgba(255, 255, 255, 0.3)" :class="{plain: user.theme == 'plain', dark: user.theme == 'dark', smokypink: user.theme == 'smokypink', goDown: scrollY < 100,}" dense rounded="xl" :flat="scrollY < 100" width="auto" style="z-index:2010">
        <div class="anchors mx-auto px-0" align="center">
          <v-layout wrap>
          <v-col class="px-0">
            <v-row align="center" justify="center" class="flex-nowrap">
              <v-flex class="mx-3" v-if="this.user.intro && this.user.intro.length">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.intro'"
                  to
                >
                  <h4>About</h4>
                </nuxt-link>
              </v-flex>
              <v-flex class="mx-3" v-if="this.careers && this.careers.length">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.career'"
                  to
                >
                  <h4>Path</h4>
                </nuxt-link>
              </v-flex>
              <v-flex class="mx-3" v-if="this.skills && this.skills.length">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.skills'"
                  to
                >
                  <h4>Skill</h4>
                </nuxt-link>
              </v-flex>
              <v-flex class="mx-3" v-if="user.igUrl || user.fbUrl || user.twUrl || user.ytUrl">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.sns'"
                  to
                >
                  <h4>SNS</h4>
                </nuxt-link>
              </v-flex>
              <v-flex class="mx-3" v-if="this.link && this.link.length">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.links'"
                  to
                >
                  <h4>Links</h4>
                </nuxt-link>
              </v-flex>
              <v-flex class="mx-3">
                <nuxt-link
                  class="anchor-link body-1"
                  v-scroll-to="'.works'"
                  to
                  v-if="this.items && this.items.length"
                >
                <h4>Works</h4>
                </nuxt-link>
              </v-flex>
            </v-row>
          </v-col>
          </v-layout>
        </div>
      </v-toolbar>
    </div>
    <v-card rounded="xl" elevation="20" class="theme" :class="{plain: user.theme == 'plain', dark: user.theme == 'dark', smokypink: user.theme == 'smokypink'}">
      <div class="avatar-top pt-8 pb-10" align="center" :style="{ backgroundImage: `url(${bgImageUrl})` }">
      <h1 class="user-name">
        <vue-arc-text ref="arctext" :text=user.lastname :arc=+arc :direction=direction :class="{plainname: user.theme == 'plain' && !bgImageUrl}"></vue-arc-text>
      </h1>
      <v-avatar size="164" rounded="10" class="avatar">
      <v-img width="200px" :src="imageUrl"></v-img>
      </v-avatar>
      <h1 class="user-name">
        <vue-arc-text ref="arctext" :text=user.firstname :arc=+arc :direction=direction2 :class="{plainname: user.theme == 'plain' && !bgImageUrl}"></vue-arc-text>
      </h1>
      </div>
        <v-main align="center" class="mb-10">
        <div class="mx-4">
          <v-divider v-if="!user.isBackground"></v-divider>
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
              <div v-if="user.favorites && user.favorites.length">
                <v-divider class="my-4"></v-divider>
                <h5>好きなもの</h5>
                <v-chip class="body-2 mt-4 mx-1" v-for="favorite in user.favorites" :key="favorite.id">{{ favorite }}</v-chip>
              </div>
            </div>
          </div>

            <v-divider></v-divider>

          <div class="intro my-10" v-if="this.user.intro && this.user.intro.length">
            <h3>AboutMe</h3>
            <p class="body-2 intro-p">{{ user.intro }}</p>
            <v-divider></v-divider>
          </div>

          <div class="career my-10" v-if="this.careers && this.careers.length">
            <h3 class="mb-3">Path</h3>
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
              <v-timeline-item v-for="career in careers" :key="career.id" small fill-dot icon="mdi-account-star">
                <p class="mb-2 body-2" style="font-style: italic">{{ career.careerAge }}</p>
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
            <h3 class="mb-2">Skill</h3>
            <v-chip class="mt-1 mx-1 handle" v-for="skill in skills" :key="skill.id" :color="skill.skillColor" text-color="#f9f9f9">{{ skill.skill }}</v-chip>
            <v-divider class="mt-10"></v-divider>
          </div>

          <div class="sns my-10">
            <h3 class="mb-2">SNS</h3>
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

            <v-divider class="mt-10"></v-divider>
          </div>

          <div class="links my-10" v-if="this.link && this.link.length">
            <h3 class="mb-2">Links</h3>
            <v-chip class="mx-1 my-1" v-for="url in user.urls" :key="url.id" text-color="blue">
              <a :href="`${url.url}`" target="_blank" rel="noov-chipener noreferrer">
                {{ url.urlName }}
              </a>
              <v-icon x-small>mdi-open-in-new</v-icon>
            </v-chip>
            <v-divider class="mt-10"></v-divider>
          </div>
        </div>

        <div v-if="this.items && this.items.length" class="works">
          <h3 class="mb-2">Works</h3>
          <div v-if="this.items.length > 2">
            <v-icon>mdi-gesture-swipe-horizontal</v-icon>
            <p class="caption mb-0">Slide</p>
          </div>
          <vue-scroll-snap :horizontal="true">
            <v-row v-for="(item, index) in items" :key="item.id" justify="center" class="ml-2 mr-2">
              <v-card max-width="500" max-height="500" class="mx-2 my-12" rounded="lg" color="rgba(255 ,255 ,255 ,0.4)" @click="slideDialogSwitch(item)">
                <v-img :src="item.slideImage" contain height="250"></v-img>
                <v-divider class="mt-4 mx-5"></v-divider>
                <v-card-title v-if="item.title && item.title.length">{{ item.title }}</v-card-title>
                <v-card-subtitle class="caption" v-if="item.slideCate && item.slideCate.length" align="left">{{ item.slideCate }}</v-card-subtitle>
                <v-card-text v-if="item.text && index != selectedIndex" class="slide-text caption" align="left">{{ item.text.slice(0, 50) }}<span v-show="item.text.length > 50">...</span></v-card-text>
                <div v-if="item.text && item.text.length && item.text.length > 50">
                  <v-icon v-show="index === selectedIndex" @click="selectedIndex = !index">
                    {{ index === selectedIndex ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                  </v-icon>
                </div>
                <v-card-text class="pt-0" align="left" v-if="item.url">
                  <a :href="`${item.url}`" target="_blank" rel="noov-chipener noreferrer">
                    <v-chip class="my-0" x-small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                  </a>
                </v-card-text>
              </v-card>
            </v-row>
          </vue-scroll-snap>
          <!-- card開いた時 -->
          <v-dialog
            v-model="slideDialog"
            v-if="currentSlide"
            height="auto"
            width="600"
            overlay-opacity="5"
            scrollable
            content-class="mx-2"
          >
            <v-row align="center" justify="center" class="mx-0">
              <v-card min-height="500" height="auto" width="600" dark align="center" class="slide-dialog px-0" :style="{ backgroundImage: `url(${currentSlide.slideImage})`}" rounded="lg">
                <v-toolbar color="rgba(0, 0, 0, 0)" short flat dense>
                  <v-spacer></v-spacer>
                  <v-icon class="mt-5" @click="slideDialog=false">mdi-close</v-icon>
                </v-toolbar>
                <div class="mx-3">
                  <v-card-title v-if="currentSlide.title && currentSlide.title.length" class="pb-0 font-weight-black">{{ currentSlide.title }}</v-card-title>
                  <v-card-subtitle class="caption" v-if="currentSlide.slideCate && currentSlide.slideCate.length" align="left">{{ currentSlide.slideCate }}</v-card-subtitle>
                  <v-card-text class="slide-text caption" align="left">{{ currentSlide.text }}</v-card-text>
                  <a :href="`${currentSlide.url}`" target="_blank" rel="noov-chipener noreferrer">
                    <v-chip v-if="currentSlide.url" class="mt-4 mb-5" x-small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                  </a>
                </div>
                <!-- <v-btn class="my-4" @click="slideDialog=false" color="primary" small>OK</v-btn> -->
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
    <v-btn
      class="to-top"
      fab
      small
      v-scroll-to="'.container'"
      to
      v-show="scrollY > 100"
      color="rgba(255,255,255,0.3)"
      ><v-icon>mdi-arrow-up-bold-circle-outline</v-icon></v-btn>
  </v-container>
  </transition>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import VueArcText from 'vue-arc-text'
import VueScrollSnap from "~/components/VueScrollSnap"

export default {
  components: {
    VueArcText,
    VueScrollSnap
  },
  methods: {
    slideDialogSwitch(item) {
      this.currentSlide = item
      this.slideDialog = true
    },
    handleScroll() {
      this.scrollY = window.scrollY
    },
  },
  data() {
    return {
      selectedIndex: null,
      show: false,
      scrollY: 0,
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
    window.addEventListener('scroll', this.handleScroll)

    let userDoc = await db.collection('profs').doc(this.id)
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
        }else {
          alert('ユーザー情報がありません。ホームへ戻ります。')
          this.$router.push('/')
        }
      })
  },
}
</script>

<style scoped>
.career >>> .v-timeline-item__dot {
  z-index: 0;
}
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

.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 1.35em;
  z-index: 2;
  width: 80%;
  margin: 0 auto;
}
.smdisp {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 1.35em;
  z-index: 2;
  width: 100%;
  margin: 0 auto;
}
.smdisp >>> h4 {
  font-size: smaller;
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
.goDown {
  color: #3a4164;
}
.hideP {
  display: none;
}

.theme--light.v-divider {
  border-color: rgba(191, 178, 176,0.6) !important; 
}

.theme--light.v-timeline::before {
  background: rgba(191, 178, 176,0.6) !important; 
}

.avatar {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  /* border: 5px solid #fff; */
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
.intro-p {
  line-height: 26px;
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
  background-color: rgba(0,0,0, 0.7);
  background-blend-mode: darken;
}
.slide-text {
  white-space: pre-wrap;
  word-wrap:break-word;
}
.ok-btn {
  color: #fff;
  top: 90%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 200;
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
.to-top {
  position: fixed;
  top: 85%;
  right: 10%;
}

</style>
