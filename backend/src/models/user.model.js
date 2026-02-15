const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:[true,'user already exists with username'],
        required:true
    },
    email:{
        type:String,
        unique:[true,'user already exists with email'],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profilePic:{
        type:String,
        deafult:`https://ik.imagekit.io/fr6xntzql/74a3b6a8856b004dfff824ae9668fe9b.webp`
    }
})

const UserModel=mongoose.model('users',userSchema);


module.exports=UserModel;