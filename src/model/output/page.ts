export class Page {
    count: number
    totalCount: number
    offset: number

    constructor(count: number, totalCount: number, offset: number) {
        this.count = count
        this.totalCount = totalCount
        this.offset = offset
    }
}