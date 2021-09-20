
import { Model, DataTypes, Sequelize } from "sequelize"

interface WatchlistAttributes {
    name: string
    symbolsArray: string
}

export class WatchlistEntity extends Model<WatchlistAttributes> {
    public readonly id!: number
    public name!: string
    public symbolsArray!: string

    static initEntity(sequelize: Sequelize) {
        WatchlistEntity.init({
            name: DataTypes.STRING,
            symbolsArray: DataTypes.STRING(5000)
        }, { sequelize, modelName: 'watchlist' })
    }
}