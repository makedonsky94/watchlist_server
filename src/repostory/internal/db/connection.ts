import { Sequelize } from "sequelize";
import { WatchlistEntity } from "./entity/watchlist_entity";

export const sequelize: Sequelize = new Sequelize('ufo_mysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

WatchlistEntity.initEntity(sequelize)
sequelize.sync();