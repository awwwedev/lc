import BaseModel from "@/models/BaseModel";
import {AxiosResponse} from "axios";
import http from "@/common/http";

export default class TicketMessage extends BaseModel {
    message!: string
    author!: string

    static getList(params: { ticket_user_id: number, [key: string]: any }): Promise<AxiosResponse<Array<TicketMessage>>> {
        return http.get<Array<TicketMessage>>(`auth/ticket-message`, { params })
    }

    static create (params: { ticket_user_id: number, message: string, [key: string]: any }): Promise<AxiosResponse<TicketMessage>> {
        return http.post<TicketMessage>('auth/ticket-message', TicketMessage.prepareFormData(params))
    }
}