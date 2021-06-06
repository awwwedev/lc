import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Statistic extends BaseModel{
    date?: string
    type?: number
    value?: number

    static getList(params?: { [key: string]: string | number }): Promise<AxiosResponse<Array<Statistic>>> {
        return http.get<Array<Statistic>>('statistics', { params })
    }
}
