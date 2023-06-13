const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    return;
  }
  console.log('Connected to the database');
});

connection.query('CREATE DATABASE IF NOT EXISTS world', (error) => {
  if (error) throw error;
  console.log('World database has been created');
});
connection.query('USE world', (error) => {
  if (error) throw error;
});

connection.query(
  'SELECT Name FROM country WHERE Population > 8000000',
  (error, results) => {
    if (error) throw error;
    console.log('Countries with population greater than 8 million:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM country WHERE Name LIKE "%land%"',
  (error, results) => {
    if (error) throw error;
    console.log('Countries with "land" in their names:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000',
  (error, results) => {
    if (error) throw error;
    console.log('Cities with population between 500,000 and 1 million:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM country WHERE Continent = "Europe"',
  (error, results) => {
    if (error) throw error;
    console.log('Countries in Europe:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM country ORDER BY SurfaceArea DESC',
  (error, results) => {
    if (error) throw error;
    console.log('Countries in descending order of surface areas:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM city WHERE CountryCode = "NLD"',
  (error, results) => {
    if (error) throw error;
    console.log('Cities in the Netherlands:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Population FROM city WHERE Name = "Rotterdam"',
  (error, results) => {
    if (error) throw error;
    console.log('Population of Rotterdam:');
    console.log(results[0].Population);
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  (error, results) => {
    if (error) throw error;
    console.log('Top 10 countries by Surface Area:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT Name FROM city ORDER BY Population DESC LIMIT 10',
  (error, results) => {
    if (error) throw error;
    console.log('Top 10 most populated cities:');
    results.forEach((row) => {
      console.log(row.Name);
    });
    console.log('---------------------------');
  },
);

connection.query(
  'SELECT SUM(Population) AS World_population FROM country',
  (error, results) => {
    if (error) throw error;
    console.log('Population number of the world:');
    console.log(results[0].World_population);
    console.log('---------------------------');
  },
);

connection.end((error) => {
  if (error) {
    console.error('Error disconnecting: ', error);
    return;
  }
  console.log('Disconnected succsssfully');
});
