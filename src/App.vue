<template>
  <div id="app">
    <div  style="z-index: 1000; position: fixed; top: 0"
          class="alert-container d-flex justify-content-center align-items-center w-100"
    >
      <b-alert :show="dismissCounter"
               :variant="$notificationData.variant || 'info'"
               dismissible
               @dismissed="onDismissed"
               fade
      >
        <h4 class="alert-heading" v-if="$notificationData.title">{{ $notificationData.title }}</h4>
        <hr v-if="$notificationData.title && $notificationData.text">
        <p class="mb-0">
          {{ $notificationData.text }}
        </p>
        <template v-if="$notificationData.links" @click="dismissCounter = 0">
          <b-link v-for="(link, idx) in $notificationData.links" :key="idx"
                  class="alert-link"
                  :to="{ name: link.routeName, params: link.params }"
                  @click="dismissCounter = 0"
          >
            {{ link.label }}
          </b-link>
        </template>
      </b-alert>
    </div>
    <Login v-if="false"/>
    <router-view v-else/>
  </div>

</template>

<script lang="ts">
import {Component, Provide, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {notification} from "@/common/types";
import {getModule} from "vuex-module-decorators";
import Notification from '@/store/modules/notification'
import UserStore from "@/store/modules/user";
import http from "@/common/http";
import Login from "@/components/Login.vue";

@Component({
  components: {Login},
  computed: {
    ...mapGetters('notification', {
      $notificationData: 'getData'
    }),
    ...mapGetters('user', {
      $userIsLogged: 'getIsLogged',
      $allowInitUser: 'getAllowInitUser',
    })
  }
})
export default class App extends Vue {
  $notificationData!: notification
  $userIsLogged!: boolean
  $allowInitUser!: boolean
  dismissCounter = 0
  @Provide('basePath') basePath = process.env.VUE_APP_IMG_PATH
  @Provide('imageBasePath') imageBasePath = process.env.VUE_APP_IMG_PATH

  $userStore!: UserStore

  constructor() {
    super();
  }

  onDismissed(): void {
    this.dismissCounter = 0
    getModule(Notification, this.$store).clearData()
  }

  @Watch('$notificationData')
  watchNotificationData(): void {
    if (Object.keys(this.$notificationData).length) {
      this.dismissCounter = this.$notificationData.direction || 6
    }
  }

  @Watch('$allowInitUser')
  watchAllowInitUser(): void {
    if (this.$allowInitUser && this.$cookies.isKey('token')) {
      http.defaults.headers['Authorization'] = 'Bearer ' + this.$cookies.get('token')

      this.$userStore.initUser()
          .catch(() => {
            delete http.defaults.headers['Authorization']
            this.$cookies.remove('token')
          })
          .finally(() => {
            this.$userStore.setAllowInitUser(false)
          })
    } else {
      this.$userStore.setAllowInitUser(false)
    }
  }

  created (): void {
    this.$userStore = getModule(UserStore, this.$store)
    this.$userStore.setAllowInitUser(true)
  }
}
</script>

<style lang="stylus">
html, body
  height 100%

body
  display: flex;
  flex-direction column

#app
  flex 1 1 100%
</style>