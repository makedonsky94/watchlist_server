import { Sequelize } from "sequelize";
import { WatchlistEntity } from "./entity/watchlist_entity";
import * as config from './.connection.config.json'

export const sequelize: Sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
    host: 'localhost',
    dialect: 'mysql'
});

WatchlistEntity.initEntity(sequelize)
sequelize.sync();

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
  
testConnection();