import {MongoDbConnection} from "../db/mongo_db_connection";
import {WatchlistRepository} from "../../public/watchlist/watchlist_repository";
import {Watchlist} from "../../../model/domain/watchlist";
import {Symbol} from "../../../model/domain/symbol";

export class WatchlistRepositoryImpl implements WatchlistRepository {
    getWatchlist(): Promise<Watchlist> {
        return MongoDbConnection.getInstance().then((connection) => {
            const db = connection.db()
            const collection = db.collection<Symbol>("symbols")
            return collection.find().toArray().then((symbols) => {
                console.log(symbols)
                return new Watchlist("Watchlist", symbols)
            })
        })
    }
}
