import { Db, MongoClient } from "mongodb"

export class MongoDbConnection {
    private static instance: MongoDbConnection

    public static setInstance(connection: MongoDbConnection) {
        this.instance = connection
    }

    public static getInstance(): Promise<MongoDbConnection> {
        if (!MongoDbConnection.instance) {
            const connection = new MongoDbConnection()
            return connection.connect().then(() => {
                return connection
            })
        }

        return new Promise<MongoDbConnection>(() => MongoDbConnection.instance)
    }

    url: string
    client: MongoClient
    dbName: string

    constructor() {
        this.url = 'mongodb://localhost:27017'
        this.client = new MongoClient(this.url)
        this.dbName = "test"
    }

    private async connect() {
        await this.client.connect()
        console.log('Connected successfully to server')
    }

    public db(): Db {
        return this.client.db(this.dbName)
    }
}