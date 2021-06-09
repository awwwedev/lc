<template>
  <BModal :visible="show" @hidden="close" size="lg" >
    <template #modal-header>
      <h3>Обращение в техподдержку</h3>
    </template>
    <template>
      <div class="mx-auto chat" ref="modal">
        <PerfectScrollbar class="ps" ref="ps">
          <b-list-group ref="message-container">
            <b-list-group-item v-for="message in messages" :key="message.id">
              <b-media>
                <div class="d-flex justify-content-between align-items-start">
                  <h5 class="mt-0">{{ message.author }}</h5>
                  <b-badge variant="primary" pill>{{ message.created_at }}</b-badge>
                </div>
                <p v-html="message.message"/>
              </b-media>
            </b-list-group-item>
          </b-list-group>
        </PerfectScrollbar>
        <b-form-group label="Сообщение"
                      label-for="description"
                      :invalid-feedback="getValidationMessage($v.formData.message)"
                      class="mt-3"
        >
          <vue-editor class="text-editor" id="textarea" v-model.trim="formData.message" ref="text-editor"
                      @input="$v.formData.message.$touch()"
                      :editor-toolbar="customToolbar" :class="{ 'is-invalid': $v.formData.message.$error  }"/>
        </b-form-group>
      </div>
    </template>
    <template #modal-footer>
      <b-button variant="primary" @click="onSendMessage" :disabled="$v.$invalid">Отправить</b-button>
      <b-button variant="secondary" @click="close">Отмена</b-button>
    </template>
  </BModal>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import TicketMessage from "@/models/TicketMessage";
// @ts-ignore
import {VueEditor} from 'vue2-editor'
import {getModule} from "vuex-module-decorators";
import Notification from "@/store/modules/notification";
import {Validation, validationMixin} from "vuelidate";
import ValidationMixin from "@/mixins/validation";
import {required} from "vuelidate/lib/validators";
import $ from 'jquery'
import {mapGetters} from "vuex";
import User from "@/models/User";


@Component({
  components: {VueEditor},
  validations: {
    formData: {
      message: {
        required
      }
    },
  },
  data: () => ({
    customToolbar: [[{
      header: [false, 2, 3, 4, 5, 6]
    }], ["bold", "italic", "underline", "strike"],
      [{
        align: ""
      }, {
        align: "center"
      }, {
        align: "right"
      }, {
        align: "justify"
      }], ["blockquote", "code-block"], [{
        list: "ordered"
      }, {
        list: "bullet"
      }, {
        list: "check"
      }], [{
        indent: "-1"
      }, {
        indent: "+1"
      }],
      [{
        color: []
      }, {
        background: []
      }],
      ["link"], ["clean"]
    ]
  }),
  computed: {
    ...mapGetters({
      $user: 'user/getUser'
    })
  }
})
export default class Chat extends Mixins<Validation, ValidationMixin>(validationMixin, ValidationMixin) {
  @Ref('ps') $refPs!: Vue
  @Ref('message-container') $refMessageContainer!: HTMLElement
  @Ref('text-editor') $refTextEditor!: Vue
  @Ref('modal') $refModal!: HTMLElement
  @Prop({ type: Boolean })show!: boolean
  $user!: User
  messages = [] as Array<TicketMessage>
  formData = {
    message: ''
  }

  updateState(): void {
    this.formData.message = ''
    this.$v.$reset()

    TicketMessage.getList({ ticket_user_id: this.$user.id as number, sortType: 'desc', sortField: 'created_at' })
        .then(res => {
          this.messages = res.data
          this.$nextTick(() => {
            this.$refPs.$el.scrollTop = this.$refMessageContainer.clientHeight
            const $modal = $(this.$refModal).parents('.modal')[0]

            setTimeout(() => {
              $modal.scrollTo({
                top: $($modal).find('.modal-dialog').height(),
                behavior: 'smooth'
              })
            }, 300)
          })
        })

  }

  onSendMessage(): void {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      TicketMessage.create({ ticket_user_id: this.$user.id as number, ...this.formData }).then(() => {
        getModule(Notification, this.$store).setData({title: 'Сообщение успешно отправлено', variant: 'success', direction: 1 })
        this.updateState()
      })
    } else {
      getModule(Notification, this.$store).setData({title: 'Заполните сообщение', variant: 'danger', direction: 1 })
    }
  }

  @Emit('close')
  close(): boolean {
    return false
  }

  @Watch('show')
  watchSow(value: boolean): void {
    if (value)
     this.updateState()
  }
}
</script>

<style scoped lang="stylus">
.chat
  width 75%
</style>