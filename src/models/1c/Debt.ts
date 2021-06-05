import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Debt extends BaseModel{
    type?: string
    date?: string
    value?: string
    href?: string

    static getList(params?: { [key: string]: string | number }): Promise<AxiosResponse<Array<Debt>>> {
        return http.get<Array<Debt>>('debts', { params })
    }
}
