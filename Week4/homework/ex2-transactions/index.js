const { MongoClient } = require('mongodb');

require('dotenv').config();
const createCollection = require('./setup');
const transferTransaction = require('./transfer');

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = 'transfer_money';

async function main() {
  await client.connect();
  // console.log('Connected successfully to server');
  // const db = client.db(dbName);
  // const collection = db.collection('account');

  await createCollection(client);

  await transferTransaction(101, 102, 10000, 'testing...');

  return 'Successfull';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
