const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    caption:{
        type:String,
        deafult:''
    },
    imgurl:{
        type:String,
        required:[true,"image url is required to create an post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is needed to create any post"]
    }
})

const PostModel=mongoose.model("posts",PostSchema);


module.exports=PostModel;