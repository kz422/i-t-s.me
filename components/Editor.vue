<template>
  <v-container class="px-0">
    <v-overlay
      :value="overlay"
    >
      <v-card class="pa-6" align="center" flat>
        <h4 class="mb-3">ご登録ありがとうございます！</h4>
        <p class="body-2 mb-0">ご登録メールアドレスの認証にご協力をお願い致します。</p>
        <p class="body-2">ご認証後、再度アクセスをお願い致します。</p>
        <v-btn @click="reloadPage" light small>認証済みです</v-btn>
        <v-btn href="/" light small>HOMEへ</v-btn>
        <v-row justify="center" class="mt-2">
          <v-btn @click="sendVeriMail">認証メールを送信する</v-btn>
        </v-row>
      </v-card>
    </v-overlay>
    <v-card rounded="xl" elevation="20" color="#f9f9f9">
      <div class="avatar-top pt-12" align="center" :style="{ backgroundImage: `url(${bgImageUrl})` }">
        <v-avatar size="164" rounded="10" class="avatar">
          <v-img width="200px" :src="imageUrl"></v-img>
        </v-avatar>
        <div class="ul-avatar pt-2 mt-2">
          <v-file-input type="file" @change="uploadIconFile" accept="image/*" show-size small-chips label="アイコン画像を選択" :clearable="false"></v-file-input>
          <v-file-input v-if="isBackground" type="file" @change="uploadBgFile" accept="image/*" show-size small-chips label="背景画像を選択" :clearable="false"></v-file-input>
          <v-checkbox class="pb-2" dense messages="設定しない場合、すでに設定済みの背景は削除されます" v-model="isBackground" label="背景画像を設定する"></v-checkbox>
        </div>
      </div>
      <v-main align="center" class="mb-10 px-3">
        <div class="top mt-3">
          <v-form v-model="valid">
            <v-col align="center">
              <v-text-field
                class="inputs"
                v-model="lastname"
                :counter="10"
                label="みょうじ"
                required
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>

            <v-col align="center">
              <v-text-field
                class="inputs"
                v-model="firstname"
                :counter="10"
                label="なまえ"
                required
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-form>
            <v-col align="center">
              <h5>出身</h5>
              <v-text-field
                class="inputs"
                v-model="from"
                :counter="10"
                label="出身"
                required
                outlined
                dense
                rounded
              ></v-text-field>
              </v-col>
            <v-col v-if="!secretBirthday" align="center">
              <h5>誕生日</h5>
              <p>{{ this.birthday }}
                <v-icon small @click="switchSecret">mdi-eye-off</v-icon>
              </p>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="inputs"
                    v-model="birthday"
                    label="誕生日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    rounded
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                  locale="ty-jp"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col v-else align="center">
              <h5 class="inputs">誕生日</h5>
              <p>ひみつ
                <v-icon small @click="switchSecret">mdi-eye</v-icon>
              </p>
            </v-col>
          <v-col align="center">
            <h5>メール</h5>
            <v-text-field
              class="inputs"
              v-model="email"
              label="メール"
              type="email"
              hint="こちらに入力されたメールアドレスは公開されます。公開を希望されない場合は空欄にしてください。"
              persistent-hint
              outlined
              dense
              rounded
            ></v-text-field>
          </v-col>
          
          <div class="favorite my-10">
            <h5>Favorite</h5>
            <draggable v-model="favorites" v-bind="dragOptions">
              <v-chip class="mt-4 mx-1 handle" v-for="(favorite, index) in favorites" :key="favorite.id">
                {{ favorite }}
                <v-icon @click="deleteFavorite(index)" x-small color="red">mdi-close-circle</v-icon>
              </v-chip>
            </draggable>
            <p class="caption pt-3">ドラッグで並び替えが可能です</p>
            <v-icon small>mdi-transfer-up</v-icon>
            <v-form class="inputs" v-model="formFav" ref="formFav">
            <v-chip class="mb-2" :color="selectedColor" text-color="#f9f9f9" v-show="favorite">
                {{ favorite }}
              </v-chip>
              <v-text-field
                class="inputs"
                v-model="favorite"
                label="すきなもの"
                :rules="[required]"
                outlined
                dense
                rounded
              ></v-text-field>
              <v-col>
                <v-btn color="primary" @click="addFavorite" :disabled="!formFav">Add</v-btn>
              </v-col>
              <v-chip @click="resetFavForm" small outlined>reset</v-chip>
            </v-form>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="intro my-10">
          <h3>AboutMe</h3>
          <p class="intro body-2">{{ this.intro }}</p>
          <v-textarea
            class="mx-auto textareas"
            v-model="intro"
            label="じこしょうかい"
            rows="6"
            row-height="35"
            no-resize
            shaped
            outlined
          ></v-textarea>
        </div>

        <v-divider></v-divider>

        <div class="path my-10">
          <h3 class="mb-3">Path</h3>
          <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <draggable v-model="careers" handle=".handle" v-bind="dragOptions">
              <v-timeline-item v-for="(career, index) in careers" :key="career.id" small fill-dot icon="mdi-account-star">
                <p v-show="!isEditable" class="mb-2" style="font-style: italic">{{ career.careerAge }}</p>
                <v-text-field
                  v-show="isEditable"
                  v-model="career.careerAge"
                  class="editable-input"
                  outlined
                  dense
                  rounded
                ></v-text-field>
                <v-card class="body-1">
                  <v-icon class="handle">mdi-drag-horizontal-variant</v-icon>
                  <h5 class="py-2" v-show="!isEditable">
                    {{ career.career }}
                  </h5>
                  <h5 v-show="isEditable">
                    <v-text-field 
                      v-model="career.career"
                      class="editable-input mx-4"
                      label="経歴"
                      outlined
                      dense
                      rounded
                    ></v-text-field>
                  </h5>
                  <v-card-text class="pt-0 career-exp" v-show="!isEditable">{{ career.careerExp }}</v-card-text>
                  <v-textarea
                    v-show="isEditable"
                    class="textareas mx-1"
                    label="内容"
                    v-model="career.careerExp"
                    shaped
                    outlined
                    no-resize
                    rounded
                  >
                  </v-textarea>
                </v-card>
                <v-icon @click="deleteCareer(index)" x-small color="red">mdi-close-circle</v-icon>
              </v-timeline-item>
            </draggable>
          </v-timeline>
          <p class="caption pt-3 mb-2">
            アイコン
            <v-icon class="handle">mdi-drag-horizontal-variant</v-icon>
            をドラッグして並び替えが可能です
          </p>
          <v-btn-toggle>
            <v-btn @click="isEditable = !isEditable" small>
              編集モード
              <v-icon v-show="!isEditable" small>mdi-pencil-outline</v-icon>
              <v-icon v-show="isEditable" small>mdi-pencil-off-outline</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-row align="center" justify="center" class="mt-4 mx-auto">
            <v-col align="center">
              <v-form v-model="formCareer" ref="formCareer">
                <v-text-field
                  class="inputs"
                  v-model="career"
                  label="経歴"
                  :rules="[required]"
                  outlined
                  dense
                  rounded
                ></v-text-field>
                <v-text-field
                  class="inputs"
                  v-model="careerAge"
                  label="在籍年"
                  :rules="[required]"
                  outlined
                  dense
                  rounded
                ></v-text-field>
                <v-textarea
                  class="textareas"
                  v-model="careerExp"
                  label="内容"
                  :rules="[required]"
                  rows="6"
                  row-height="35"
                  no-resize
                  shaped
                  outlined
                ></v-textarea>
                <v-col>
                  <v-btn color="primary" @click="addCareer" :disabled="!formCareer">Add</v-btn>
                </v-col>
                <v-chip @click="resetCareerForm" small outlined>reset</v-chip>
              </v-form>
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>

        <div class="skills my-10">
          <v-col align="center">
            <h3>Skill</h3>
            <draggable v-model="skills" v-bind="dragOptions">
              <v-chip class="mt-1 mx-1 handle" v-for="(skill, index) in skills" :key="skill.id" :color="skill.skillColor"  text-color="#f9f9f9">
                {{ skill.skill }}
                <v-icon @click="deleteSkill(index)" x-small>mdi-close-circle</v-icon>
              </v-chip>
            </draggable>
            <p class="caption pt-3">ドラッグで並び替えが可能です</p>
            <v-icon small>mdi-transfer-up</v-icon>
            <v-form class="inputs" v-model="formSkill" ref="formSkill">
              <v-chip class="mb-2" :color="selectedColor" text-color="#f9f9f9" v-show="skill">
                {{ skill }}
              </v-chip>
              <v-text-field
                v-model="skill"
                label="スキルを入力"
                :rules="[required]"
                append-icon="mdi-palette-outline"
                @click:append="togglePalette"
                outlined
                dense
                rounded
              >
              </v-text-field>
              <v-color-picker
                v-show="isPalette"
                class="mb-2"
                dark
                v-model="selectedColor"
                hide-canvas
                hide-inputs
                hide-sliders
                show-swatches
                :swatches="swatches"
              ></v-color-picker>
              <v-col class="pt-0">
                <v-btn color="primary" @click="addSkill" :disabled="!formSkill">Add</v-btn>
              </v-col>
              <v-chip @click="resetSkillForm" small outlined>reset</v-chip>
            </v-form>
          </v-col>
        </div>

        <v-divider></v-divider>

        <div class="sns my-10">
          <h3>SNS</h3>
          <v-icon>mdi-instagram</v-icon>
          <v-icon>mdi-facebook</v-icon>
          <v-icon>mdi-twitter</v-icon>
          <v-icon>mdi-youtube</v-icon>
          <!-- <v-icon>mdi-linkedin</v-icon>
          <v-icon>mdi-github</v-icon> -->
          <p class="caption">各サービスのURLを入力してください</p>
          <v-row class="inputs" align="center" justify="center">
            <v-col>
              <v-text-field
                prepend-icon="mdi-instagram"
                label="Instagram"
                v-model="igUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-facebook"
                label="Facebook"
                v-model="fbUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-twitter"
                label="Twitter"
                v-model="twUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-youtube"
                label="YouTube"
                v-model="ytUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field>
              <!-- <v-text-field
                prepend-icon="mdi-linkedin"
                label="LinkedIn"
                v-model="liUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field> -->
              <!-- <v-text-field
                prepend-icon="mdi-github"
                label="GitHub"
                v-model="ghUrl"
                placeholder="URLを入力"
                outlined
                dense
                rounded
              >  
              </v-text-field> -->
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>
        
        <div class="links my-10">
          <h3>Links</h3>
          <draggable v-model="urls" v-bind="dragOptions">
            <v-chip class="mt-4 mb-3 mx-1 handle" v-for="(url, index) in urls" :key="url.id">
              <a :href="`${url.url}`" target="blank">
                {{ url.urlName }}
              </a>
              <v-icon @click="deleteUrl(index)" x-small color="red">mdi-close-circle</v-icon>
            </v-chip>
          </draggable>
          <v-icon small>mdi-transfer-up</v-icon>
          <v-form class="inputs" v-model="form" ref="form">
            <v-text-field
              v-model="urlName"
              label="リンク名"
              :rules="[required]"
              outlined
              dense
              rounded
            ></v-text-field>
            <v-text-field
              v-model="url"
              label="URL"
              type="URL"
              :rules="[required]"
              outlined
              dense
              rounded
            ></v-text-field>
            <v-col>
              <v-btn color="primary" @click="addUrls" :disabled="!form">Add</v-btn>
            </v-col>
            <v-chip @click="resetUrlForm" small outlined>reset</v-chip>
          </v-form>
        </div>

        <v-divider></v-divider>
              
        <div class="slide my-8">
          <h3>Works</h3>
            <v-card
              max-width="600"
              class="mx-auto my-8"
              color="rgba(255, 255, 255, 0)"
            >
              <v-carousel
                delimiter-icon="mdi-minus"
                height="auto"
                show-arrows-on-hover
                hide-delimiters
                continuous
                
              >
                <v-carousel-item
                  v-for="item in items"
                  :key="item.id"
                >
                  <v-img :src="item.slideImage" contain max-height="500" max-width="600"></v-img>
                  <div class="slide-text">
                    <p v-if="item.text && item.text.length" class="py-2 mb-0 body-2" style="color: black">
                      {{ item.text.slice(0, 10) }}
                      <span>
                        <v-btn v-if="item.text.length > 10" @click="slideDialogSwitch(item.id)" x-small color="primary" outlined>...詳しく</v-btn>
                      </span>
                    </p>
                    <v-col class="py-0">
                      <a :href="`${item.url}`" target="_blank" rel="noov-chipener noreferrer">
                        <v-chip v-if="item.url" class="my-0" x-small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                      </a>
                    </v-col>
                    <v-btn @click="deleteSlide(index)" class="mb-3 mt-2" small>このスライドを削除</v-btn>
                  </div>
                  <v-dialog
                    v-model="slideDialog"
                    v-if="item.text.length > 1"
                    height="500"
                    width="600"
                  >
                    <v-row align="center" justify="center" class="mx-0">
                      <v-card height="500" width="600" dark align="center" class="slide-dialog px-0" :style="{ backgroundImage: `url(${item.slideImage})` }">
                        <v-overlay
                          :absolute="absolute"
                          :value="slideDialog"
                        >
                        <p>{{ item.text }}</p>
                        <a :href="`${item.url}`" target="_blank" rel="noov-chipener noreferrer">
                          <v-chip v-if="item.url" class="my-0" small>Link<v-icon x-small>mdi-open-in-new</v-icon></v-chip>
                        </a>
                        </v-overlay>
                      </v-card>
                    </v-row>
                  </v-dialog>
                </v-carousel-item>
              </v-carousel>
            </v-card>
              <v-icon class="mb-2" small>mdi-transfer-up</v-icon>
              <v-form class="textareas" ref="slideform" v-model="formSlide">
              <v-chip v-show="this.slideImage" x-small outlined>Preview</v-chip>
              <v-img v-show="this.slideImage" :src="slideImage" class="mx-auto mb-6" max-width="200" contain></v-img>
              <v-file-input v-if="view" type="file" @change="uploadFile" accept="image/*" show-size small-chips label="画像を選択" :clearable="false" dense :rules="imagerules"></v-file-input>
              <v-text-field
                v-model="slideUrl"
                label="urlを入力（あれば）"
                outlined
                dense
                rounded
              ></v-text-field>
              <v-textarea
                class="textareas"
                v-model="slideText"
                label="テキストを入力"
                outlined
                shaped
                rounded
              ></v-textarea>
              <v-col>
                <v-btn color="primary" @click="addItem" :disabled="!formSlide">Add</v-btn>
              </v-col>
              <v-chip @click="reset" small outlined>reset</v-chip>
            </v-form>
            <!-- <p v-if="!overLength" class="body-2" style="color: red">*最大10枚までアップロード可能です<br>アップロードするにはスライドを削除してください</p> -->
        </div>

        <v-divider></v-divider>

        <div class="theme mt-6">
          <h3>Select Theme</h3>
          <v-row class="theme mb-10 py-8">
            <v-col>
              <input type="radio" value="plain" id="plain" name="theme" v-model="selectTheme">
              <label for="plain">
                <v-img class="theme-image" width="100px" :src="require('@/assets/plain.png')"></v-img>
              </label>
            </v-col>
            <v-col>
              <input type="radio" value="dark" id="dark" name="theme" v-model="selectTheme">
              <label for="dark">
                <v-img class="theme-image" width="100px" :src="require('@/assets/dark.png')"></v-img>
              </label>
            </v-col>
            <v-col>
              <input type="radio" value="smokypink" id="smokypink" name="theme" v-model="selectTheme">
              <label for="smokypink">
                <v-img class="theme-image" width="100px" :src="require('@/assets/pop.png')"></v-img>
              </label>
            </v-col>
          </v-row>
          <h5>選択されたテーマ</h5>
          <p class="caption">{{ selectTheme }}</p>
        </div>
        <v-btn class="btn" @click="saveProf" width="70%" v-show="isVerifyEmail">save</v-btn>
      </v-main>
    </v-card>
  </v-container>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  methods: {
    resetSkillForm() {
      this.$refs.formSkill.reset()
      this.selectedColor = '#AAA'
    }, 
    resetFavForm() {
      this.$refs.formFav.reset()
      this.selectedColor = '#AAA'
    }, 
    resetCareerForm() {
      this.$refs.formCareer.reset()
    }, 
    resetUrlForm() {
      this.$refs.form.reset()
    }, 
    togglePalette() {
      this.isPalette = !this.isPalette
    },
    slideDialogSwitch() {
      this.slideDialog = true
    },
    addItem() {
      this.items.push({slideImage: this.slideImage, text: this.slideText, url: this.slideUrl})
      this.reset()
    },
    deleteSlide(index) {
      if(confirm('削除してもよろしいですか？')){
        this.items.splice(index, 1)
      }
    },
    reset () {
      this.view = false
      this.$nextTick(function () {
      this.view = true
      })
    this.slideText = ''
    this.slideUrl = ''
    this.slideImage = ''
    },
    async uploadFile(data) {
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`users/${time}_${data.name}`)
      const snapshot = await ref.put(data)
      const url = await snapshot.ref.getDownloadURL()
      this.slideImage = url
    },
    sendVeriMail() {
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(() => {
        alert('メールが送信されました')
      }).catch(function(error) {
        alert('エラーが発生しました')
        console.log(error)
        // An error happened.
      });
    },
    reloadPage() {
      // location.reload()
      this.$router.go()
    },
    switchSecret() {
      this.secretBirthday = !this.secretBirthday
    },
    saveProf2() {
      this.$refs.saveProf2.saveProf()
    },
    deleteUrl(index) {
      this.urls.splice(index, 1)
    },
    addUrls() {
      this.urls.push({urlName: this.urlName, url: this.url})
      this.resetUrlForm()
    },
    deleteFavorite(index) {
      this.favorites.splice(index, 1)
    }, 
    addFavorite() {
      this.favorites.push(this.favorite)
      this.$refs.formFav.reset()
    },
    deleteSkill(index) {
      this.skills.splice(index, 1)
    }, 
    addSkill() {
      this.skills.push({skill: this.skill, skillColor: this.selectedColor})
      this.resetSkillForm()
    },
    deleteCareer(index) {
      if(confirm('削除してもよろしいですか？')){
        this.careers.splice(index, 1)
      }
    }, 
    addCareer() {
      this.careers.push({career: this.career, careerAge: this.careerAge, careerExp: this.careerExp})
      this.resetCareerForm()
    },
    async uploadIconFile(data) {
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`users/${time}_${data.name}`)
      const snapshot = await ref.put(data)
      const url = await snapshot.ref.getDownloadURL()
      this.imageUrl = url
    },
    async uploadBgFile(data) {
      const storageRef = firebase.storage().ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`users/${time}_${data.name}`)
      const snapshot = await ref.put(data)
      const url = await snapshot.ref.getDownloadURL()
      this.bgImageUrl = url
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    async saveProf() {
      if(!this.isBackground){
        this.bgImageUrl = ''
      }
      //doc IDをUserのUIDに指定
      var user = firebase.auth().currentUser.uid
      if(confirm('保存しますか？')){
        await db.collection('profs').doc(user)
        .set({ 
          imageUrl: this.imageUrl,
          bgImage: this.bgImageUrl,
          isBackground: this.isBackground,
          firstname: this.firstname,
          lastname: this.lastname,
          from: this.from,
          birthday: this.birthday,
          secretBirthday: this.secretBirthday,
          email: this.email,
          intro: this.intro,
          favorites: this.favorites,
          careers: this.careers,
          skills: this.skills,
          igUrl: this.igUrl,
          fbUrl: this.fbUrl,
          twUrl: this.twUrl,
          ytUrl: this.ytUrl,
          liUrl: this.liUrl,
          ghUrl: this.ghUrl,
          urls: this.urls,
          theme: this.selectTheme,
          items: this.items,
          loggedInUser: user,
          })
      var userId = firebase.auth().currentUser.uid
      this.$router.push(`/${userId}`)
      }
    }
  },
  data() {
    return {
      swatches: [
        ['#F44336', '#4CAF50', '#9C27B0'],
        ['#FF9800', '#2196F3', '#E91E63'],
        ['#FFEB3B', '#3F51B5', '#795548'],
      ],
      isPalette: false,
      selectedColor: '#AAA',
      overlay: false,
      absolute: true,
      slideDialog: false,
      isEditable: false,
      drag: true,
      careerAge: '',
      careerExp: '',
      view: true,
      items: [],
      slideText: '',
      slideUrl: '',
      slideImage: '',
      verifyEmail: '',
      secretBirthday: true,
      isBackground: false,
      selectTheme: 'plain',
      isPlain: false,
      isDark: false,
      isPop: false,
      favorite: '',
      favorites: [],
      skill: '',
      skills: [],
      career: '',
      careers: [],
      currentUser: '',
      user: '',
      firstname: '',
      lastname: '',
      from: '',
      email: '',
      imageUrl: '',
      bgImageUrl: '',
      igUrl: '',
      fbUrl: '',
      twUrl: '',
      ytUrl: '',
      liUrl: '',
      ghUrl: '',
      birthday: null,
      intro: '',
      url: '',
      urlName: '',
      urls: [],
      required: value => !!value || "何かしら入れてね",
      form: true,
      formFav: true,
      formSkill: true,
      formCareer: true,
      formSlide: true,
      valid: true,
      // nameRules: [
      //   v => !!v || 'Name is required',
      //   v => v.length <= 10 || 'Name must be less than 10 characters',
      // ],
      cycle: true,
      menu: false,
      imagerules: [
        value => !!value || 'Required.',
        value => !value || value.size < 3000000 || '画像ファイルのサイズは3MBまでです！',
      ],
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  beforeCreate() {
    // this.overlay = false
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.currentUser = user.uid
        this.verifyEmail = user.emailVerified
      }
    })
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.currentUser = user.uid

        if(!this.isVerifyEmail && user.providerData[0].providerId == 'password') {
          this.overlay = true
        } else {
          this.verifyEmail = true
        }

        let userDoc = db.collection('profs').doc(this.currentUser)
          userDoc.get()
          .then((doc) => {
            if(doc.exists) {
              this.user = doc.data()
              if(this.user.firstname) {
                this.firstname = this.user.firstname
              }
              if(this.user.lastname){
                this.lastname = this.user.lastname
              }
              if(this.user.from){
                this.from = this.user.from
              }
              if(this.user.birthday){
                this.birthday = this.user.birthday
              }
              if(this.user.secretBirthday){
                this.secretBirthday = this.user.secretBirthday
              }
              if(this.user.imageUrl){
                this.imageUrl = this.user.imageUrl
              }
              if(this.user.bgImage){
                this.bgImageUrl = this.user.bgImage
              }
              if(this.user.isBackground){
                this.isBackground = this.user.isBackground
              }
              if(this.user.email){
                this.email = this.user.email
              }
              if(this.user.urls){
                this.urls = this.user.urls
              }
              if(this.user.igUrl){
                this.igUrl = this.user.igUrl
              }
              if(this.user.twUrl){
                this.twUrl = this.user.twUrl
              }
              if(this.user.fbUrl){
                this.fbUrl = this.user.fbUrl
              }
              if(this.user.ytUrl){
                this.ytUrl = this.user.ytUrl
              }
              if(this.user.liUrl){
                this.liUrl = this.user.liUrl
              }
              if(this.user.intro){
                this.intro = this.user.intro
              }
              if(this.user.theme){
                this.selectTheme = this.user.theme
              }
              if(this.user.favorites){
                this.favorites = this.user.favorites
              }
              if(this.user.careers){
                this.careers = this.user.careers
              }
              if(this.user.skills){
                this.skills = this.user.skills
              }
              if(this.user.items){
                this.items = this.user.items
              }
            }
          })
      } else {
        alert('ログインしてください')
        this.$router.push('/login')
      }
    })
  },
  computed: {
    isVerifyEmail() {
      return this.verifyEmail
    },
    dragOptions(){
      return {
        animation: 200,
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  border: 5px solid #fff;
}

.avatar-top {
  background-size: cover;
  height: auto;
}
.intro {
  white-space: pre-wrap;
  word-wrap:break-word;
  /* background-color: aliceblue; */
}
.career-exp {
  white-space: pre-wrap;
  word-wrap:break-word;
  /* background-color: aliceblue; */
}

.handle:hover {
    cursor: grab;
  }
  .handle:active {
    cursor: grabbing;
  }

.theme {
  margin: 0 auto;
}


.theme-image {
  margin: 0 auto;
  cursor: pointer;
}

.inputs {
  /* padding: 0 auto; */
  margin: 0 auto;
  max-width: 500px;
}
.editable-input >>> input {
  text-align: center;
}

.theme--dark.v-sheet {
    background-color:rgba(255, 255, 255, 0);
}

.textareas{
  max-width: 500px;
  margin: 0 auto;
}


.plain {
  background-color: #f9f9f9;
}
.dark {
  background-color: #191a35;
  color: #C3887D;
}
.pop {
  background-color:#C3887D;
  color: #f9f9f9;
}

.btn {
  color: #fff;
  top: 90%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 200;
  background: linear-gradient(270deg, #000080, #bbbbe3, #e05c30);
  background-size: 600% 600%;

  -webkit-animation: AnimationName 21s ease infinite;
  -moz-animation: AnimationName 21s ease infinite;
  animation: AnimationName 21s ease infinite;
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

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.ul-avatar {
  width: 250px;
  margin: 0 auto;
}
.ul-avatar .v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.ul-avatar .v-input--checkbox {
  padding-top: 0;
  margin-top: 0;
}
</style>
