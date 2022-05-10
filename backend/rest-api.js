let db;

function runQuery(tableName, req, res, parameters, sqlForPreparedStatement, onlyOne = false) {
  let result;
  try {
    result = db.run(sqlForPreparedStatement, parameters);
  }
  catch (error) {
    result = { _error: error + '' };
  }
  if (onlyOne) { result = result[0]; }
  result = result || null;
  res.status(result ? (result._error ? 500 : 200) : 404);
  setTimeout(() => res.json(result), 1);
}

module.exports = function setupRESTapi(app, databaseConnection) {

  db = databaseConnection;

  app.get('/api/tables', (req, res) => res.json(db.tables));
  app.get('/api/views', (req, res) => res.json(db.views));

  for (let name of [...db.tables, ...db.views]) {

    app.get('/api/' + name, (req, res) => {
      runQuery(name, req, res, {}, `
        SELECT *
        FROM ${name}
      `);
    });

    app.get('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        SELECT *
        FROM ${name}
        WHERE id = $id
      `, true);
    });

    if (db.views.includes(name)) {
      continue;
    }

    app.post('/api/' + name, (req, res) => {
      delete req.body.id;
      runQuery(name, req, res, req.body, `
        INSERT INTO ${name} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map(x => '$' + x)})
      `);
    });

    let putAndPatch = (req, res) => {
      runQuery(name, req, res, { ...req.body, ...req.params }, `
        UPDATE ${name}
        SET ${Object.keys(req.body).map(x => x + ' = $' + x)}
        WHERE id = $id
      `);
    };

    app.put('/api/' + name + '/:id', putAndPatch);
    app.patch('/api/' + name + '/:id', putAndPatch);

    app.delete('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        DELETE FROM ${name}
        WHERE id = $id
      `);
    });

  }

  app.all('/api/*', (req, res) => {
    res.status(404);
    res.json({ _error: 'No such route!' });
  });

  app.use((error, req, res, next) => {
    if (error) {
      let result = {
        _error: error + ''
      };
      res.json(result);
    }
    else {
      next();
    }
  });

}