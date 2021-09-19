import express from 'express';
import twig from 'twig';
import http from 'http';
import './socket';
import {WatchlistController} from "./controller/watchlist/watchlist_controller";
import { sequelize } from './repostory/internal/db/connection';

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

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();