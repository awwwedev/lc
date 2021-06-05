import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Bill extends BaseModel{
    type?: string
    date?: string
    value?: string
    href?: string

    static getList(params?: { [key: string]: string | number }): Promise<AxiosResponse<Array<Bill>>> {
        return http.get<Array<Bill>>('bills', { params })
    }
}
