const createTableAccount = `CREATE TABLE IF NOT EXISTS account (
  account_number INT PRIMARY KEY,
  balance DECIMAL(10,2)
);`;

const createTableAccountChanges = `CREATE TABLE IF NOT EXISTS account_changes (
  change_number INT AUTO_INCREMENT PRIMARY KEY,
  account_number INT,
  amount DECIMAL(10,2),
  changed_date DATE,
  remark VARCHAR(255),
  FOREIGN KEY (account_number) REFERENCES account(account_number)
);`;

module.exports = {
  createTableAccount,
  createTableAccountChanges,
};
