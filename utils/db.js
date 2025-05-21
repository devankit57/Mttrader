import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your environment variables.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then(client => {
      console.log("🔗 Connected to MongoDB (dev) ✅");
      console.log("📂 Using DB:", client.db().databaseName); // Log DB name
      return client;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then(client => {
    console.log("🔗 Connected to MongoDB (prod) ✅");
    console.log("📂 Using DB:", client.db().databaseName); // Log DB name
    return client;
  });
}

export default clientPromise;
