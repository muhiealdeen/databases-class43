const { MongoClient } = require('mongodb');

require('dotenv').config();
const createCollection = require('./setup');
const transferTransaction = require('./transfer');

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = 'transfer_money';

async function main() {
  await client.connect();

  await createCollection(client);

  await transferTransaction(101, 102, 1000, 'testing...');

  return 'Successfull';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
