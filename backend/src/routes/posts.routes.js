const express=require('express');
const multer= require('multer');
const upload = multer({Storage:multer.memoryStorage()})
const PostRouter=express.Router();
const {CreatePostController,ViewPostController}=require('../controllers/posts.controller')


// api:- /api/posts
PostRouter.post('/',upload.single('image'),CreatePostController);
PostRouter.get('/',ViewPostController);

module.exports=PostRouter;