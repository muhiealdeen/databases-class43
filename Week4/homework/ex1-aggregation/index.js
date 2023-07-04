const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config();
// console.log(process.env); // remove this after

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = 'databaseWeek4';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('population_countries');

  const countryName = 'Netherlands';
  let result = await getPopulationByYear(collection, countryName);
  console.log(`Population Stats for ${countryName}: `, result);

  const year = 2020;
  const age = '100+';
  const continents = [
    'AFRICA',
    'ASIA',
    'EUROPE',
    'LATIN AMERICA AND THE CARIBBEAN',
    'NORTHERN AMERICA',
    'OCEANIA',
  ];
  result = await getContinentPopulation(collection, continents, year, age);
  console.log(result);
}

const getPopulationByYear = async (collection, country) => {
  try {
    const pipeline = [
      { $match: { Country: country } },
      {
        $group: {
          _id: '$Year',
          countPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving population data:', error);
    return [];
  }
};

const getContinentPopulation = async (collection, continents, year, age) => {
  try {
    const pipeline = [
      { $match: { Year: year, Age: age, Country: { $in: continents } } },
      {
        $group: {
          _id: { $toString: { $toObjectId: '$_id' } },
          Country: { $first: '$Country' },
          Year: { $first: '$Year' },
          Age: { $first: '$Age' },
          M: { $sum: '$M' },
          F: { $sum: '$F' },
          TotalPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving continent population data:', error);
    return [];
  }
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
