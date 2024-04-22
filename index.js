const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// user: cleaner_service
// pass: 0iEBQvptPn3abuZe

const uri =
  "mongodb+srv://cleaner_service:0iEBQvptPn3abuZe@cluster0.u9i6xb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the "insertDB" database and access its users collection
    const database = client.db("cleanerService");
    const allServices = database.collection("providedServices");
    const allClients = database.collection("users");
    const allComments = database.collection("comments");
    const options = { ordered: true };
    
    // add services
    // const servicesResult = await allServices.insertMany(services.services, options);
    // console.log(`${servicesResult.insertedCount} documents were inserted`);
    
    // add comments
    // const result = await comments.insertMany(exUsers.users, options);
    // console.log(`${result.insertedCount} documents were inserted`);
    app.post("/comments", async (req, res) => {
      const comment = req.body;
      const result = await allComments.insertOne(comment);
      res.send(result);
    });

    // add clients
    app.post("/clients", async (req, res) => {
      const newUser = req.body;
      const result = await allClients.insertOne(newUser);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result);
    });

    //find comments
    app.get("/comments", async(req, res) => {
      const comments = await allComments.find({}).toArray();
      res.send(comments);
    });
    //find clients
    app.get("/clients", async (req, res) => {
      const clients = await allClients.find({}).toArray();
      res.send(clients);
    });
    //find services
    app.get("/allservices", async (req, res) => {
      const findServices = await allServices.find({}).toArray();
      res.send(findServices);
    });
    
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is Running!!!");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
