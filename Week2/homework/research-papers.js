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
const researchPapers = `CREATE TABLE IF NOT EXISTS research_papers (
  paper_id INT PRIMARY KEY AUTO_INCREMENT,
  paper_title VARCHAR(50),
  conference VARCHAR(50),
  publish_date  DATE,
  author_id INT,
  CONSTRAINT authorFK FOREIGN KEY(author_id) REFERENCES authors(author_id)
  ); `;
myQuery(researchPapers, 'research_papers has been created');

myQuery(
  ` CREATE TABLE IF NOT EXISTS relationship_authors_research_papers (
  author_id INT,
  paper_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
)`,
  'relationship_authors_research_papers has been created',
);

myQuery(
  ` INSERT INTO research_papers ( paper_id, paper_title, conference, publish_date)
 VALUES 
 (null, 'paper 1', 'conference 1', '2023-03-15'),
 (null, 'paper 2', 'conference 2', '2023-03-16'),
 (null, 'paper 3', 'conference 3', '2023-03-17'),
 (null, 'paper 4', 'conference 4', '2023-03-18'),
 (null, 'paper 5', 'conference 5', '2023-03-19'),
 (null, 'paper 6', 'conference 6', '2023-03-20'),
 (null, 'paper 7', 'conference 7', '2023-03-21'),
 (null, 'paper 8', 'conference 8', '2023-03-22'),
 (null, 'paper 9', 'conference 9', '2023-03-23'),
 (null, 'paper 10', 'conference 10', '2023-03-24'),
 (null, 'paper 11', 'conference 11', '2023-03-25'),
 (null, 'paper 12', 'conference 12', '2023-03-26'),
 (null, 'paper 13', 'conference 13', '2023-03-26'),
 (null, 'paper 14', 'conference 14', '2023-03-26'),
 (null, 'paper 15', 'conference 15', '2023-03-26'),
 (null, 'paper 16', 'conference 16', '2023-03-27'),
 (null, 'paper 17', 'conference 17', '2023-04-27'),
 (null, 'paper 18', 'conference 18', '2023-04-27'),
 (null, 'paper 19', 'conference 19', '2023-04-27'),
 (null, 'paper 20', 'conference 20', '2023-04-27'),
 (null, 'paper 21', 'conference 21', '2023-04-27'),
 (null, 'paper 22', 'conference 22', '2023-04-27'),
 (null, 'paper 23', 'conference 23', '2023-04-30'),
 (null, 'paper 24', 'conference 24', '2023-04-30'),
 (null, 'paper 25', 'conference 25', '2023-04-30'),
 (null, 'paper 26', 'conference 26', '2023-04-30'),
 (null, 'paper 27', 'conference 27', '2023-05-01'),
 (null, 'paper 28', 'conference 28', '2023-05-01'),
 (null, 'paper 29', 'conference 29', '2023-05-01'),
 (null, 'paper 30', 'conference 23', '2023-05-01');
`,
  '30 rows have been inserted into research_paper',
);

myQuery(
  `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender)
VALUE   
(null, 'author 1', 'university 1', '1980-01-01', 13, 'male'),
(null, 'author 2', 'university 2', '1980-01-01', 13, 'male'),
(null, 'author 3', 'university 3', '1980-01-01', 12, 'male'),
(null, 'author 4', 'university 2', '1980-01-01', 13, 'male'),
(null, 'author 5', 'university 3', '1980-01-01', 10, 'male'),
(null, 'author 6', 'university 2', '1980-01-01', 12, 'male'),
(null, 'author 7', 'university 5', '1980-01-01', 13, 'male'),
(null, 'author 8', 'university 7', '1980-01-01', 12, 'male'),
(null, 'author 9', 'university 2', '1981-12-22', 12, 'female'),
(null, 'author 10', 'university 3', '1981-12-22', 12, 'female'),
(null, 'author 11', 'university 2', '1981-12-22', 12, 'female'),
(null, 'author 12', 'university 4', '1981-12-22', 12, 'female'),
(null, 'author 13', 'university 2', '1981-12-22', 10, 'female'),
(null, 'author 14', 'university 3', '1981-12-22', 12, 'female'),
(null, 'author 15', 'university 15', '1981-12-22', 10, 'female');
`,
  '15 rows have been inserted into authors table',
);

myQuery(
  `UPDATE authors
SET mentor = ROUND(RAND() * 14) + 1`,
  'Added values to mentors',
);
myQuery(
  `UPDATE research_papers
SET author_id = ROUND(RAND() * 14) + 1`,
  'Added values to author_id',
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
