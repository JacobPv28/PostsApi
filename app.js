'use strict'
const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require("./routes/post.route");

//Environment variables
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3000; // || 3000 alternative port in case assigned port won't work

//Mongoose connection
const uri = `mongodb+srv://${dbUser}:${dbPassword}@apirestdb.ffzhajw.mongodb.net/?retryWrites=true&w=majority&appName=ApiRestDb`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.log("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
run().catch(console.dir);

const app = express();
app.use(express.json());

// ROUTES
app.use("/api/posts", postsRoute);
app.get('/v1', (req, res) => {
    res.send("Api route working properly");
});

app.listen(PORT);