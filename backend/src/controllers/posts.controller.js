const PostModel = require("../models/posts.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function CreatePostController(req, res) {

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "/inst_clone",
  });

  const post = await PostModel.create({
    caption: req.body.caption,
    imgurl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function ViewPostController(req, res) {


  let userId = req.user.id

  const posts = await PostModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "post fetched successfully",
    posts,
  });
}
async function ViewPostDetailsController(req, res) {

  let userid = req.user.id
  const PostId = req.params.PostId;
  const post = await PostModel.findById(PostId);
  if (!post) {
    return res.status(404).json({
      message: "post Not Found ",
    });
  }
  const IsUserValid = post.user.toString() === userid;
  if (!IsUserValid) {
    return res.status(403).json({
      message: "forbidden content",
    });
  }
  return res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}
module.exports = {
  CreatePostController,
  ViewPostController,
  ViewPostDetailsController,
};
