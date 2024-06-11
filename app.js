'use strict'
const express = require('express');
const mongoose = require('mongoose');
const ElementPost = require('./models/element.post');
const PORT = 8000;

const uri = "mongodb+srv://testUser:rAsB0C2LcJRSQRQL@apirestdb.ffzhajw.mongodb.net/?retryWrites=true&w=majority&appName=ApiRestDb";
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

app.get('/v1', (req, res) => {
    res.send("This API is working better than expected.")
});

 app.post('/api/elements', async (req, res) => {
    try {
        const post = await ElementPost.create(req.body);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: error.message});
    };
})

app.listen(PORT);