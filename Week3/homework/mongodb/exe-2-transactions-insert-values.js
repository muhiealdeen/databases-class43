const insertDataAcount = `INSERT INTO account (account_number, balance) VALUES 
(101, 1000.00),
(102, 2000.00),
(103, 3000.00),
(104, 4000.00);`;
const insertDataAccountChanges = `INSERT INTO  account_changes(change_number, account_number, amount, changed_date, remark) VALUES
(NULL, 102, 50.00, '2023-06-01', 'Withdrawal'),
(NULL, 101, 10.00, '2023-06-02', 'Deposit'),
(NULL, 103, 30.00, '2023-06-03', 'Withdrawal'),
(NULL, 104, 40.00, '2023-06-01', 'Withdrawal'),
(NULL, 103, 30.00, '2023-06-01', 'Deposit');`;

module.exports = {
  insertDataAcount,
  insertDataAccountChanges,
};
