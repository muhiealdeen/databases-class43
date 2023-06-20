const mysql = require('mysql');

let connection;
const createConnection = (error) => {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });
  if (error) {
    console.log('error', error);
  }
  console.log('Connected to the database');
};
createConnection();

function myQuery(input, res) {
  return new Promise((resolve, reject) => {
    connection.query(input, res, (error, result) => {
      if (error) {
        console.error('error', error);
        reject(error);
      } else {
        resolve(result);
        console.log(res);
      }
    });
  });
}

myQuery(`DROP DATABASE IF EXISTS muhiedb`, 'Database muhiedb dropped');
myQuery(`CREATE DATABASE muhiedb`, 'Database muhiedb created');
myQuery('USE muhiedb', 'Using muhiedb database');

myQuery(
  `CREATE TABLE authors (
      author_id   Int  PRIMARY KEY AUTO_INCREMENT,
      author_name    VARCHAR(50),
      university      VARCHAR(255),
      date_of_birth    DATE,
      h_index INT,
      gender ENUM('male','female')
    );`,
  'authors table is created',
);

myQuery(
  `ALTER TABLE authors
      ADD column mentor INT,
      ADD CONSTRAINT mentorFK FOREIGN KEY(mentor) REFERENCES authors(author_id);`,
  'mentor column is added',
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
// module.exports = { createConnection, myQuery, endConnection };
