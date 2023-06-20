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
  `SELECT rp.paper_title, COUNT(rarp.author_id) AS author_count
  FROM research_papers rp
  LEFT JOIN relationship_authors_research_papers rarp ON rp.paper_id = rarp.paper_id
  GROUP BY rp.paper_id;
  
`,
  'The required data 1 has been printed',
);

myQuery(
  `SELECT SUM(rp.paper_id) AS total_research_papers
  FROM research_papers rp
  INNER JOIN authors a ON rp.author_id = a.author_id
  WHERE a.gender = 'female';
`,
  'The required data 2 has been printed',
);

myQuery(
  `SELECT university, AVG(h_index) AS average_h_index
  FROM authors
  GROUP BY university;  
`,
  'The required data 3 has been printed',
);
myQuery(
  `SELECT a.university, SUM(rp.paper_id) AS total_research_papers
  FROM authors a
  INNER JOIN research_papers rp ON a.author_id = rp.author_id
  GROUP BY a.university;  
`,
  'The required data 4 has been printed',
);
myQuery(
  `SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
  FROM authors
  GROUP BY university;
    
`,
  'The required data 5 has been printed',
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
