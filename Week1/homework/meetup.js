const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

// Database name
const databaseName = 'meetup';

// Drop the database if it exists, then create it
connection.query(`DROP DATABASE IF EXISTS ${databaseName}`, (error) => {
  if (error) {
    console.log('error', error);
  }
  connection.query(`CREATE DATABASE ${databaseName}`, (error) => {
    if (error) {
      console.log('error', error);
    }
    console.log('Database created');

    connection.changeUser({ database: databaseName }, (error) => {
      if (error) {
        console.log('error', error);
      }
      const createInviteeTable = `CREATE TABLE Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(50),
        invited_by VARCHAR(50)
      )`;
      connection.query(createInviteeTable, (error) => {
        if (error) {
          console.log('error', error);
        }
        console.log('Invitee table has been created');
        const createRoomTable = `CREATE TABLE Room (
          room_no INT AUTO_INCREMENT PRIMARY KEY,
          room_name VARCHAR(50),
          floor_number INT
        )`;
        connection.query(createRoomTable, (error) => {
          if (error) {
            console.log('error', error);
          }
          console.log('Room table has been created');

          const createMeetingTable = `CREATE TABLE Meeting (
            meeting_no INT AUTO_INCREMENT PRIMARY KEY,
            meeting_title VARCHAR(255),
            starting_time DATETIME,
            ending_time DATETIME,
            room_no INT,
            FOREIGN KEY (room_no) REFERENCES Room(room_no)
          )`;
          connection.query(createMeetingTable, (error) => {
            if (error) {
              console.log('error', error);
            }
            console.log('Meeting table has been created');

            const insertInvitees = `INSERT INTO Invitee (invitee_name, invited_by) VALUES
              ('Muhie 1', 'Mohamma 1'),
              ('Muhie 2', 'Mohamma 2'),
              ('Muhie 3', 'Mohamma 3'),
              ('Muhie 4', 'Mohamma 4'),
              ('Muhie 5', 'Mohamma 5')`;
            connection.query(insertInvitees, (error) => {
              if (error) {
                console.log('error', error);
              }
              console.log('Invitees data has been inserted');

              const insertRooms = `INSERT INTO Room (room_name, floor_number) VALUES
                ('Room 1', 2),
                ('Room 2', 3),
                ('Room 3', 4),
                ('Room 4', 1),
                ('Room 5', 5)`;
              connection.query(insertRooms, (error) => {
                if (error) {
                  console.log('error', error);
                }
                console.log('Room data has been inserted');
                const insertMeetings = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
                  ('Meeting 1', '2023-06-13 09:00:00', '2023-06-13 11:00:00', 1),
                  ('Meeting 2', '2023-06-14 10:30:00', '2023-06-14 11:00:00', 2),
                  ('Meeting 3', '2023-06-15 14:00:00', '2023-06-15 16:00:00', 3),
                  ('Meeting 4', '2023-06-16 13:30:00', '2023-06-16 16:00:00', 4),
                  ('Meeting 5', '2023-06-17 13:00:00', '2023-06-17 15:00:00', 5)`;
                console.log('Meeting data has been inserted');
                connection.query(insertMeetings, (error) => {
                  if (error) {
                    console.log('error', error);
                  }
                  connection.end((err) => {
                    if (error) {
                      console.log('error', error);
                    }
                    console.log('Database connection closed');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
