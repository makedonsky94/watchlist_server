export class Price {
    value: number
    change: number
    changePercent: number

    constructor(value: number, change: number, changePercent: number) {
        this.value = value;
        this.change = change;
        this.changePercent = changePercent;
    }
}