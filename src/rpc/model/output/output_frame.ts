import { ResponseType } from "./response_type";

export class OutputFrame {
    type: ResponseType;
    data: any;

    constructor(responseType: ResponseType, data: any) {
        this.type = responseType;
        this.data = data;
    }
}