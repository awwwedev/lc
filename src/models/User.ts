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

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<User>> {
        return http.get<User>('user/' + params.id, { params: params })    }
}
