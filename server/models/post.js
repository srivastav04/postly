import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  UserAvatar: { type: String },
  UserId: { type: String, required: true },
  User: { type: String, required: true },
  PostId: { type: String, unique: true },
  Description: { type: String },
  Image: { type: String, required: true },
  Likes: {
    LikeCount: { type: Number, default: 0 },
    LikedUsers: [{ type: String }],
  },
  Comments: [{ userName: { type: String }, comment: { type: String } }],
  Date: { type: String },
  EditedOn: { type: String, default: null },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
