const PostModel = require('../models/posts.model');
const jwt = require('jsonwebtoken');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({

    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY

});

async function CreatePostController(req, res) {

    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: "you don't have token"
        })
    }

    let decoded;

    try {

        decoded = await jwt.verify(token, process.env.JWT_SECRET);

    }
    catch (error) {

        res.status(401).json({
            message: "unauthorized access"
        })

    }


    const file = await imagekit.files.upload({

        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'fileName',
        folder: '/inst_clone'
        
    });

    const post = await PostModel.create({
        caption: req.body.caption,
        imgurl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}
async function ViewPostController(req,res){
    let token=req.cookies.token;
    console.log(token);
    
}
module.exports = {
    CreatePostController,
    ViewPostController
}