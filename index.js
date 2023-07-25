const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000;
const path = require("path");

const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://laibatanveer:2tAQWhHvYUVwz8Av@banoqabil.nrnpkvd.mongodb.net/?retryWrites=true&w=majority";

  const registrationRouter = require("./API/Registration/Router");
  const productRouter = require("./API/Products/Router");
  
 
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/registration', registrationRouter);
app.use('/products', productRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("SOMETHING WENT WRONG:" + err));

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "register.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
