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

//Routes
app.use("/api/elements", elementPostRoute);

 app.post('/api/elements', async (req, res) => {
   
});

app.get('/api/elements', async (req, res) => {
  try {
    const post = await ElementPost.find({});
    res.status(200).json(post);
  }catch {
    res.status(500).json({message:error.message});
  }
});

//Getting the id
app.get('/api/element/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await ElementPost.findById(id);
    res.status(200).json(post);
    
  }catch {
    res.status(500).json({message:error.message});
  }
});

app.put('/api/element/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await ElementPost.findByIdAndUpdate(id, req.body);

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    };

   const updatedPost = await ElementPost.findById(id);
   res.status(200).json(updatedPost); 

  }catch {
    res.status(500).json({message:error.message});
  }
});

app.delete('/api/element/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await ElementPost.findByIdAndDelete(id);
    
    if (!post) {
      return res.status(404).json({message: "Post not found"});
    };

    res.status(200).json({message: "Post deleted sucessfully"});

  }catch {
    res.status(500).json({message:error.message});
  };
});

app.listen(PORT);