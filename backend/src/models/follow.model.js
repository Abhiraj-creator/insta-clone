const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    Followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "followee is required"]
    }

    }, {
    timestamps: true
})

const FollowModel=mongoose.model('follow',FollowSchema);


module.exports=FollowModel;