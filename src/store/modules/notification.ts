import {Module, VuexModule, Action, Mutation} from 'vuex-module-decorators'
import {notification} from "@/common/types";


@Module({ name: 'notification', namespaced: true })
export default class Notification extends VuexModule {
    data: notification = {}

    get getData (): notification {
        return this.data
    }

    @Mutation
    _setData(data: notification): void {
        this.data = data
    }    @Mutation

    @Action
    setData(data: notification): void {
        this._setData(data)
    }

    @Action
    clearData(): void {
        this._setData({})
    }
}
