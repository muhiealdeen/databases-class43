const mysql = require('mysql');
const {
  createTableAccount,
  createTableAccountChanges,
} = require('./exe-2-transactions-create-tables.js');
const {
  insertDataAcount,
  insertDataAccountChanges,
} = require('./exe-2-transactions-insert-values.js');

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

function myQuery(input) {
  return new Promise((resolve, reject) => {
    connection.query(input, (error, result) => {
      if (error) {
        console.error('!!!An error happened!!!', error);
        reject(error);
      } else {
        resolve(result);
        console.log('Executed successfuly: ', input);
      }
    });
  });
}

myQuery(`DROP DATABASE IF EXISTS muhiedb`);
myQuery(`CREATE DATABASE muhiedb`);
myQuery('USE muhiedb');

myQuery(createTableAccount);
myQuery(createTableAccountChanges);
myQuery(insertDataAcount);
myQuery(insertDataAccountChanges);

let transactionSyntax = [
  'START TRANSACTION;',
  'UPDATE account SET balance = balance - 1000 WHERE account_number = 101;',
  'UPDATE account SET balance = balance + 1000 WHERE account_number = 102;',
  'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES(101, 1000, CURDATE(), "transferd to account numder 102");',
  'COMMIT;',
];

try {
  for (let i = 0; i < transactionSyntax.length; i++) {
    myQuery(transactionSyntax[i]);
  }
} catch (error) {
  console.log('The transfer failed');
  myQuery('ROOLBACK;');
}

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
