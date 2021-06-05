import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class Contract extends BaseModel{

    static get(params: { [key: string]: string | number }): Promise<AxiosResponse<Contract>> {
        return http.get<Contract>('contract', { params })
    }
}
