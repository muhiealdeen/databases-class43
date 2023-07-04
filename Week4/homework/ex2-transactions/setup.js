const createCollection = async (client) => {
  const myCollection = await client.db('transfer_money').collection('account');

  await myCollection.deleteMany({});

  await myCollection.insertMany([
    {
      account_number: 101,
      balance: 2000,
      account_changes: [
        {
          change_number: 1,
          amount: -200,
          changed_date: '2023-06-19',
          remark: 'Withdrawal',
        },
      ],
    },
    {
      account_number: 102,
      balance: 2500,
      account_changes: [
        {
          change_number: 1,
          amount: 1000,
          changed_date: '2023-06-21',
          remark: 'Depozit',
        },
      ],
    },
  ]);
  console.log(`Create account and values`);
  return 'done...';
};

module.exports = createCollection;
