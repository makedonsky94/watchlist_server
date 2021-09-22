import { Page } from "./page"

export class PageData<T> {
    data: T
    page: Page

    constructor(data: T, page: Page) {
        this.data = data
        this.page = page
    }
}