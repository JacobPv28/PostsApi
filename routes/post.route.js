'use strict'
const express = require("express");
const router = express.Routeri();
const ElementPost = require("../models/element.post");

//Controllers
router.get('/', async (req, res) => {
     try {
        const post = await ElementPost.create(req.body);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: error.message});
    };
});
