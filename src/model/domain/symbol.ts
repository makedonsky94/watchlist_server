import {Document} from "bson";

export class Symbol implements Document {
    shortName: string
    fullName: string
    description: string
    iconUrl: string | null

    constructor(shortName: string, fullName: string, description: string, iconUrl: string | null) {
        this.shortName = shortName;
        this.fullName = fullName;
        this.description = description;
        this.iconUrl = iconUrl;
    }
}