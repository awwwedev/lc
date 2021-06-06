import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Statistic extends BaseModel{
    data?: Array<number>
    type?: number

    static getList(params?: { [key: string]: string | number }): Promise<AxiosResponse<Array<Statistic>>> {
        return http.get<Array<Statistic>>('statistics', { params })
    }
}
