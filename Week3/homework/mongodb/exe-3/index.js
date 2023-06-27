const mysql = require('mysql');

let connection;
const createConnection = (error) => {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world',
    multipleStatements: true,
  });
  if (error) {
    console.log('error', error);
  }
  console.log('Connected to the database');
};
createConnection();

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

function getPopulationSecure(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ?? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

// getPopulation('country', 'Turkey', 'TUR', console.log);
getPopulation(
  'country',
  "'; SELECT NULL, name, continent FROM country; --",
  'XYZ',
  console.log,
);

// getPopulationSecure('country', 'Turkey', 'TUR', console.log);
getPopulationSecure(
  'country',
  "'; SELECT NULL, name, continent FROM country; --",
  'XYZ',
  console.log,
);

const endConnection = () => {
  connection.end((error) => {
    if (error) {
      console.error('error');
      return;
    }

    console.log('Database connection closed');
  });
};

endConnection();
