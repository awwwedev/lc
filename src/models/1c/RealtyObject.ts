import {AxiosResponse} from "axios";
import http from "@/common/http";
import BaseModel from "@/models/BaseModel";

export default class RealtyObject extends BaseModel{
    id_1c?: number
    name?: string
    user_id?: string
    downloadContractHref?: string

    static getList(params?: { [key: string]: string | number }): Promise<AxiosResponse<Array<RealtyObject>>> {
        return http.get<Array<RealtyObject>>('object1cs', { params })
    }

    static get(params: { id: number; [key: string]: string | number }): Promise<AxiosResponse<RealtyObject>> {
        return http.get<RealtyObject>('obj1c/' + params.id, { params })
    }

    static create (params: { [key: string]: string | number }): Promise<AxiosResponse<RealtyObject>> {
        return http.post<RealtyObject>('obj1c', RealtyObject.prepareFormData(params))
    }
    static update (params: { [key: string]: string | number }): Promise<AxiosResponse<RealtyObject>> {
        return http.post<RealtyObject>('obj1c/' + params.id, BaseModel.prepareFormData({...params, "_method": "PUT"}))
    }
    static destroyS(id: number): Promise<AxiosResponse> {
        return http.delete('obj1c/' + id, { })
    }


}
