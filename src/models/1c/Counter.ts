import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Counter extends BaseModel{
    type?: string
    date?: string
    value?: string

    static getList(params?: { [key: string]: string | number | Array<number> | Array<string> }): Promise<AxiosResponse<Array<Counter>>> {
        return http.get<Array<Counter>>('counters', { params })
    }
}
