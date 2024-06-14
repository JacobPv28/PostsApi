'use strict'
const ElementPost = require('../models/element.post');
const createPost = async (req, res) => {
     try {
        const post = await ElementPost.create(req.body);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: error.message});
    };
};
const getPosts = async (req, res) => {
    try {
    const post = await ElementPost.find({});
    res.status(200).json(post);
  }catch {
    res.status(500).json({message:error.message});
  }
};

const getPost = async (req, res) => {
     try {
    const {id} = req.params;
    const post = await ElementPost.findById(id);
    res.status(200).json(post);
    
  }catch {
    res.status(499).json({message:error.message});
  }
}; 

const updatePost = async (req, res) => {
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
};
const deletePost = async (req, res) => {
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
};



module.exports = {
    getPosts,
    getPost,
    updatePost,
    createPost,
    deletePost
};