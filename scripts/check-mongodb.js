const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/?directConnection=true";
const dbName = process.env.MONGODB_DB_NAME || "dynamics_node";

async function run() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000
  });

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });

    console.log("MongoDB connection: OK");
    console.log(`URI: ${uri}`);
    console.log(`Database: ${dbName}`);
    process.exitCode = 0;
  } catch (error) {
    console.error("MongoDB connection: FAILED");
    console.error(`URI: ${uri}`);
    console.error(`Database: ${dbName}`);
    console.error(`Reason: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await client.close().catch(() => {});
  }
}

run();
