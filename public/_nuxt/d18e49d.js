(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{455:function(t,e,r){var content=r(456);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("7132a15d",content,!0,{sourceMap:!1})},456:function(t,e,r){(e=r(12)(!1)).push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;-webkit-transition:inherit;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{-ms-flex-item-align:stretch;align-self:stretch;border:solid;border-width:0 thin 0 0;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""]),t.exports=e},463:function(t,e,r){"use strict";r(122),r(99),r(52),r(39),r(197),r(55),r(68),r(45);var n=r(3),o=r(8),c=r(124),l=r(196);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},464:function(t,e,r){var content=r(465);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("424d9537",content,!0,{sourceMap:!1})},465:function(t,e,r){(e=r(12)(!1)).push([t.i,".v-main{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;max-width:100%;-webkit-transition:.2s cubic-bezier(.4,0,.2,1);transition:.2s cubic-bezier(.4,0,.2,1)}.v-main:not([data-booted=true]){-webkit-transition:none!important;transition:none!important}.v-main__wrap{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;max-width:100%;position:relative}@-moz-document url-prefix(){@media print{.v-main{display:block}}}",""]),t.exports=e},477:function(t,e,r){"use strict";var n=r(3),o=(r(455),r(22));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:l({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:l({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},480:function(t,e,r){"use strict";r(275);var n=r(451);e.a=Object(n.a)("layout")},481:function(t,e,r){var content=r(564);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("0e38dc47",content,!0,{sourceMap:!1})},489:function(t,e,r){"use strict";r.r(e);r(100);var n=r(26),o=r(3),c=r(18),l=r(59);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={data:function(){return{form:!1,email:"",password:"",createUserErrorMessage:"",loading:!1,rules:{required:function(t){return!!t||"必須項目です"},counterMax:function(t){return t.length<=20||"20文字以内で入力してください"},counterMin:function(t){return t.length>=8||"8文字以上で入力してください"},email:function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||"メールアドレス形式で入力してください"}}}},methods:f(f({sendVeriMail:function(){c.b.auth().currentUser.sendEmailVerification()}},Object(l.b)(["setUser"])),{},{signUp:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,r=t.email,n=t.password,e.next=5,c.b.auth().createUserWithEmailAndPassword(r,n).then((function(e){c.b.auth().currentUser.uid;var r=e.user;t.setUser(r),t.$router.push("/editor"),t.loading=!1,console.log(r)})).catch((function(e){t.loading=!1;var r=e.code,n=e.message;t.createUserErrorMessage="auth/email-already-in-use"==r?"すでに登録されているIDです":n,console.log(n),console.log(r)}));case 5:e.sent;case 6:case"end":return e.stop()}}),e)})))()},login:function(){var t=this,e=new c.b.auth.GoogleAuthProvider;c.b.auth().signInWithRedirect(e).then((function(e){var r=c.b.auth().currentUser.uid,n=e.user;t.setUser(n),t.$router.push({name:"id",params:{id:"".concat(r)}})})).catch((function(t){alert(t)}))},loginWithTwitter:function(){var t=this,e=new c.b.auth.TwitterAuthProvider;c.b.auth().signInWithRedirect(e).then((function(e){var r=c.b.auth().currentUser.uid,n=e.user;t.setUser(n),t.$router.push({name:"id",params:{id:"".concat(r)}})})).catch((function(t){alert(t)}))},loginWithFacebook:function(){var t=this,e=new c.b.auth.FacebookAuthProvider;c.b.auth().signInWithRedirect(e).then((function(e){var r=c.b.auth().currentUser.uid,n=e.user;t.setUser(n),t.$router.push({name:"id",params:{id:"".concat(r)}})})).catch((function(t){alert(t)}))}})},h=(r(563),r(66)),m=r(76),w=r.n(m),x=r(429),y=r(438),O=r(533),_=r(477),j=r(463),k=r(427),P=r(554),V=r(471),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("transition",{attrs:{appear:""}},[r("v-main",[r("h5",[t._v("新規アカウント作成")]),t._v(" "),r("p",{staticClass:"caption"},[t._v("登録するメールアドレス、パスワードを入力してください")]),t._v(" "),r("v-form",{model:{value:t.form,callback:function(e){t.form=e},expression:"form"}},[r("v-text-field",{attrs:{type:"email",label:"メールアドレスを入力",outlined:"",rounded:"",dense:"",rules:[t.rules.required,t.rules.email]},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),r("v-text-field",{attrs:{type:"password",label:"パスワードを入力",outlined:"",rounded:"",dense:"",hint:"パスワードは8文字以上、20文字以内で設定してください","persistent-hint":"",rules:[t.rules.required,t.rules.counterMin,t.rules.counterMax]},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),r("v-btn",{staticClass:"mt-2",staticStyle:{color:"#fff"},attrs:{depressed:"",loading:t.loading,color:"primary",disabled:!t.form},on:{click:t.signUp}},[t._v("\n        アカウント作成\n      ")]),t._v(" "),r("nuxt-link",{staticClass:"caption",attrs:{to:"login"}},[r("p",[t._v("ご登録済みの方はこちら")])]),t._v(" "),r("p",[t._v(t._s(t.createUserErrorMessage))]),t._v(" "),r("p",{staticClass:"mb-0 caption"},[t._v("または")]),t._v(" "),r("v-col",{staticClass:"mt-2",attrs:{cols:"12"}},[t.isAuthenticated?t._e():r("v-btn",{staticClass:"login-btn",attrs:{depressed:"",width:"200",color:"red"},on:{click:t.login}},[r("v-icon",{attrs:{"x-small":"",left:"",color:"#fff"}},[t._v("mdi-google")]),t._v(" "),r("v-divider",{staticClass:"mr-6",attrs:{vertical:""}}),t._v("\n          Googleでログイン\n        ")],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[t.isAuthenticated?t._e():r("v-btn",{staticClass:"login-btn",attrs:{depressed:"",width:"200",color:"blue"},on:{click:t.loginWithTwitter}},[r("v-icon",{attrs:{"x-small":"",left:"",color:"#fff"}},[t._v("mdi-twitter")]),t._v(" "),r("v-divider",{staticClass:"mr-5",attrs:{vertical:""}}),t._v("\n          Twitterでログイン\n        ")],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12"}},[t.isAuthenticated?t._e():r("v-btn",{staticClass:"login-btn",attrs:{depressed:"",width:"200",color:"#4267B2"},on:{click:t.loginWithFacebook}},[r("v-icon",{attrs:{"x-small":"",left:"",color:"#fff"}},[t._v("mdi-facebook")]),t._v(" "),r("v-divider",{staticClass:"mr-3",attrs:{vertical:""}}),t._v(" "),r("span",[t._v("Facebookでログイン")])],1)],1)],1)],1)],1)],1)}),[],!1,null,"07106b37",null);e.default=component.exports;w()(component,{VBtn:x.a,VCol:y.a,VContainer:O.a,VDivider:_.a,VForm:j.a,VIcon:k.a,VMain:P.a,VTextField:V.a})},554:function(t,e,r){"use strict";r(464);var n=r(93);e.a=n.a.extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,r=t.top,n=t.right,footer=t.footer,o=t.insetFooter,c=t.bottom,l=t.left;return{paddingTop:"".concat(r+e,"px"),paddingRight:"".concat(n,"px"),paddingBottom:"".concat(footer+o+c,"px"),paddingLeft:"".concat(l,"px")}}},render:function(t){var data={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,data,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})},563:function(t,e,r){"use strict";r(481)},564:function(t,e,r){(e=r(12)(!1)).push([t.i,".v-enter-active[data-v-07106b37],.v-leave-active[data-v-07106b37]{-webkit-transform:translate(0);transform:translate(0);-webkit-transition:-webkit-transform 1s cubic-bezier(0,0,.2,1) 0ms;transition:-webkit-transform 1s cubic-bezier(0,0,.2,1) 0ms;transition:transform 1s cubic-bezier(0,0,.2,1) 0ms;transition:transform 1s cubic-bezier(0,0,.2,1) 0ms,-webkit-transform 1s cubic-bezier(0,0,.2,1) 0ms}.v-enter[data-v-07106b37],.v-leave-to[data-v-07106b37]{opacity:0;-webkit-transform:translateY(30vh) translateY(0);transform:translateY(30vh) translateY(0)}.login-btn[data-v-07106b37]{text-transform:none;color:#fff;font-size:12px;background:#e6e7ee}",""]),t.exports=e},596:function(t,e,r){"use strict";r.r(e);var n={head:function(){return{title:"resister"}},components:{Resister:r(489).default}},o=r(66),c=r(76),l=r.n(c),d=r(438),f=r(533),v=r(480),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",[e("v-layout",[e("v-col",{attrs:{align:"center"}},[e("Resister")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{Resister:r(489).default}),l()(component,{VCol:d.a,VContainer:f.a,VLayout:v.a})}}]);