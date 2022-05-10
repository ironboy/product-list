const bestSqlite = require('best-sqlite3');
const express = require('express');
const restApi = require('./rest-api');

const port = 4000;
const dbPath = '../database/db.sqlite3';

async function start() {
  const db = await bestSqlite.connect(dbPath);
  const app = express();
  app.use(express.json());
  app.use(express.static('dist'));
  restApi(app, db);
  app.listen(port, () => console.log('Backend listening on http://localhost:' + port));
}

start();

