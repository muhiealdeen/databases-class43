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

myQuery('USE muhiedb', 'Using muhiedb database');
myQuery(
  `SELECT a.author_name AS author, m.author_name AS mentor
FROM authors a
LEFT JOIN authors m ON a.mentor = m.author_id;
`,
  'names of authors and their corresponding mentors have been printed',
);

myQuery(
  `SELECT a.*, rp.paper_title
FROM authors a
LEFT JOIN research_papers rp ON a.author_id = rp.author_id;
`,
  'The required data has been printed',
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
