import {Module, VuexModule, Action, Mutation} from 'vuex-module-decorators'
import {AxiosResponse} from 'axios'
import http from "../../common/http";
import UserModel from "@/models/User";


@Module({ name: 'user', namespaced: true })
export default class User extends VuexModule {
    user: UserModel = new UserModel()
    isLogged = false
    inInitState = false
    allowInitUser = false

    get getUser(): UserModel {
        return this.user
    }
    get getIsLogged(): boolean {
        return this.isLogged
    }
    get getInInitState(): boolean {
        return this.inInitState
    }
    get getAllowInitUser(): boolean {
        return this.allowInitUser
    }

    @Mutation
    setUser(user: UserModel): void {
        this.user = user
    }
    @Mutation
    setIsLogged(isLogged: boolean): void {
        this.isLogged = isLogged
    }
    @Mutation
    setInInitState(inLoginState: boolean): void {
        this.inInitState = inLoginState
    }
    @Mutation
    setAllowInitUser(allowInitUser: boolean): void {
        this.allowInitUser = allowInitUser
    }

    @Action
    login (credentials: { email: string, password: string }): Promise<AxiosResponse<{ token: string }>> {
        this.setInInitState(true)

        return http.post<{ token: string }>('login', credentials)
            .finally(() => {
                this.setInInitState(false)
            })
    }
    @Action
    logout (): void {
        this.setUser({})
        this.setIsLogged(false)
    }
    @Action
    initUser (): Promise<AxiosResponse<UserModel>> {
        this.setInInitState(true)

        return http.get<UserModel>('user/byToken').then(response => {
            this.setUser(response.data)
            this.setIsLogged(true)

            return response
        }).finally(() => {
            this.setInInitState(false)
        })
    }
}
