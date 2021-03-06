
import { Model, DataTypes, Sequelize } from "sequelize"

interface StockAttributes {
    symbol: string
    exchange: string
    open: number
    high: number
    low: number
    close: number | null
    last: number | null
    volume: number | null
    date: Date
}

export class StockEntity extends Model<StockAttributes> {
    public readonly id!: number
    public symbol!: string
    public exchange!: string
    public open!: number
    public high!: number
    public low!: number
    public close!: number | null
    public last!: number | null
    public volume!: number | null
    public date!: Date

    static initEntity(sequelize: Sequelize) {
        StockEntity.init({
            symbol: DataTypes.STRING,
            exchange: DataTypes.STRING,
            open: DataTypes.FLOAT,
            high: DataTypes.FLOAT,
            low: DataTypes.FLOAT,
            close: DataTypes.FLOAT,
            last: DataTypes.FLOAT,
            volume: DataTypes.DOUBLE,
            date: DataTypes.DATE
        }, { sequelize, modelName: 'stock' })
    }
}