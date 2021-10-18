import { ResponseType } from "./response_type";

export class OutputFrame {
    responseType: ResponseType;
    data: any;

    constructor(responseType: ResponseType, data: any) {
        this.responseType = responseType;
        this.data = data;
    }
}