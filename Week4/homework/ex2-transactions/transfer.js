const { MongoClient } = require('mongodb');
require('dotenv').config();

const checkBalance = async (myCollection, accountNumber, amount) => {
  console.log(' -------------------------------- ', accountNumber, amount);
  try {
    const currentAccount = await myCollection.findOne({
      account_number: accountNumber,
    });
    return currentAccount.balance >= amount;
  } catch (error) {
    throw new Error('Error while checking balance:');
  }
};

const transfer = async (myCollection, accountNumber, amount, remark) => {
  const currentAccount = await myCollection.findOne({
    account_number: accountNumber,
  });

  const accountChanges = {
    change_number: currentAccount.account_changes.length + 1,
    amount: amount,
    changed_date: Date.now(),
    remark: remark,
  };

  await myCollection.findOneAndUpdate(
    { account_number: accountNumber },
    {
      $inc: { balance: amount },
      $push: {
        account_changes: accountChanges,
      },
    },
  );
  console.log(
    `Transferring from/to account: ${accountNumber}, amount: ${amount}, note: "${remark}".`,
  );
};

const transferTransaction = async (fromAccount, toAccount, amount, remark) => {
  const url = process.env.MONGODB_URL;
  const connection = new MongoClient(url);

  const client = await connection.connect();
  const myCollection = await client.db('transfer_money').collection('account');

  const session = connection.startSession();

  try {
    session.startTransaction();

    if (!(await checkBalance(myCollection, fromAccount, amount)))
      throw new Error('Insufficient balance!');

    await transfer(myCollection, fromAccount, -amount, remark);
    await transfer(myCollection, toAccount, amount, remark);
    await session.commitTransaction();
  } catch (error) {
    console.log('Error on Transaction. Aborting... ' + error.message);
    await session.abortTransaction();
  }
  session.endSession();
};

module.exports = transferTransaction;
