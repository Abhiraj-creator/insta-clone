const express=require('express');
const multer= require('multer');
const upload = multer({Storage:multer.memoryStorage()})
const PostRouter=express.Router();
const {CreatePostController,ViewPostController,ViewPostDetailsController}=require('../controllers/posts.controller')
const VerifyUser=require('../middleware/auth.middleware');

// api:- /api/posts
PostRouter.post('/',upload.single('image'),VerifyUser,CreatePostController);
PostRouter.get('/',VerifyUser,ViewPostController);
PostRouter.get('/details/:PostId',VerifyUser,ViewPostDetailsController);

module.exports=PostRouter;