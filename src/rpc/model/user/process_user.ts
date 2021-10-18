export type Data = string | Buffer | ArrayBuffer | Buffer[];

export class ProcessUser {
    public readonly id: string;
    public onMessage: (data: Data) => void = () => {};

    constructor(id: string) {
        this.id = id;
    }
}