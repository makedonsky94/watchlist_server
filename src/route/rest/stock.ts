import { app } from "./../express"
import { StockController } from "./../../controller/watchlist/stock_controller"

app.get('/stocks/intraday/:symbolName', (req, res) => {
    StockController.intradayByName(req, res)
})