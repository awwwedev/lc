<template>
  <b-row class="h-100 align-items-center justify-content-center m-0">
    <b-col sm="12" md="8">
      <b-container>
        <b-form class="w-50 mx-auto" @submit.prevent="onSubmit">
          <b-overlay :show="!$userIsLogged && ($userInInitState || $allowInitUser)" spinner-variant="primary" class="p-1">
            <b-form-group
                id="email"
                label="Почта"
                label-for="email"
                :invalid-feedback="getValidationMessage($v.formData.email)"
            >
              <b-form-input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :state="getFieldState($v.formData.email)"
              />
            </b-form-group>
            <b-form-group
                id="password"
                label="Пароль"
                label-for="password"
                :invalid-feedback="getValidationMessage($v.formData.password)"
            >
              <b-form-input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  :state="getFieldState($v.formData.password)"
              />
            </b-form-group>
            <b-button-group>
              <b-button variant="primary" type="submit">
                Вход
              </b-button>
            </b-button-group>
          </b-overlay>
        </b-form>
      </b-container>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import {Validation, validationMixin} from "vuelidate";
import {required, email} from "vuelidate/lib/validators"
import ValidationMixin from "@/mixins/validation"
import {getModule} from "vuex-module-decorators";
import UserModule from "@/store/modules/user";
import Notification from "@/store/modules/notification";
import store from "@/store";
import http from "@/common/http";
import {mapGetters} from "vuex";


@Component({
  validations: {
    formData: {
      email: {
        required,
        email
      },
      password: {
        required
      },
    }
  },
  computed: {
    ...mapGetters('user', {
      $userIsLogged: 'getIsLogged',
      $userInInitState: 'getInInitState',
      $allowInitUser: 'getAllowInitUser',
    })
  }
})
export default class Login extends Mixins<Validation>(validationMixin, ValidationMixin) {
  $userIsLogged!: boolean
  $userInInitState!: boolean
  $allowInitUser!: boolean
  formData = {
    email: '',
    password: ''
  }

  onSubmit(): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      const userModule = getModule(UserModule, this.$store)

      userModule.login(this.formData)
          .then((response) => {
            const token = response.data.token

            this.$cookies.set('token', token)
            http.defaults.headers['Authorization'] = 'Bearer ' + token

            userModule.initUser().then(() => {
              this.$router.push({name: 'admin.home'})
            }).catch(() => {
              getModule(Notification, store).setData({
                text: 'Произошла непредвиденная ошибка, обратитесть в администрацию',
                title: 'Ошибка инициализации пользователя!',
                variant: 'danger'
              })
            })
          })
          .catch(() => {
            getModule(Notification, store).setData({
              text: 'Не верный логин или пароль!',
              title: 'Ошибка авторизации',
              variant: 'danger'
            })
          })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
