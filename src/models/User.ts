import {AxiosResponse} from "axios";
import http from "../common/http";
import BaseModel from "@/models/BaseModel";

export default class User extends BaseModel{

    created_at?: string
    email?: string
    id?: number
    name?: string
    phone?: string
    role_id?: number
    updated_at?: string

    static getList(options: { [key: string]: any } = { page: 1 }): Promise<AxiosResponse<Array<User>>> {
        return http.get<Array<User>>('user', { params: options })
    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<User>> {
        return http.get<User>('user/' + params.id, { params: params })    }

    static create (params: { [key: string]: any }): Promise<AxiosResponse<User>> {
        return http.post<User>('user', User.prepareFormData(params))
    }
    static update (params: { [key: string]: any }): Promise<AxiosResponse<User>> {
        return http.post<User>('user/' + params.id, User.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroy (data: { [key: string]: any }): Promise<AxiosResponse> {
        return http.delete('user', { params: { id: data } })
    }
    static destroySingle (id: number): Promise<AxiosResponse> {
        return http.delete('user/' + id, { })
    }
}
