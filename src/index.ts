import express from 'express';
import twig from 'twig';
import http from 'http';
import './socket';
import { MongoClient } from 'mongodb';
import {WatchlistController} from "./controller/watchlist/watchlist_controller";

const app      = express();
const server   = http.createServer(app);

app.set('views', __dirname + '/view');
app.set('view engine', 'twig');

app.get('/', (req, res) => {
  res.render('index', {
      buttonText : "Send"
  });
});

app.get('/watchlist', (req, res) => {
    WatchlistController.index(res)
})


server.listen(80, () => {
  console.log('listening on *:80');
});
