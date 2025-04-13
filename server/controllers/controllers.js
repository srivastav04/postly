import Post from "../models/post.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) =>
      `${Date.now()}_${file.originalname.split(".")[0]}`,
  },
});

export const upload = multer({ storage });

export const createPost = async (req, res) => {
  const { Description, Date, PostId, User, UserId, UserAvatar } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const imageUrl = req.file.path;
    const newPost = new Post({
      UserAvatar,
      Description,
      Date,
      PostId,
      User: User.toLowerCase(),
      UserId,
      Image: imageUrl,
    });
    await newPost.save();
    await redis.del("posts:all");
    await redis.del(`posts:user:${User.toLowerCase()}`);

    return res.status(200).json({
      message: "Uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const sendPosts = async (req, res) => {
  const { user } = req.params;
  const cacheKey = user === "allPosts" ? "posts:all" : `posts:user:${user}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const posts =
      user === "allPosts"
        ? await Post.find({})
        : await Post.find({ User: user });

    await redis.set(cacheKey, JSON.stringify(posts), "EX", 60);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { Description, Date } = req.body;

    let updatedPost =
      Description === "" ? { EditedOn: Date } : { Description, EditedOn: Date };

    if (req.file) {
      updatedPost.Image = req.file.path;
    }

    const updatedPostData = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    if (updatedPostData) {
      await redis.del("posts:all");
      await redis.del(`posts:user:${updatedPostData.User}`);
      return res.status(200).json(updatedPostData);
    }

    return res.status(400).json({ message: "Post not found" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  await redis.del("posts:all");
  await redis.del(`posts:user:${deletedPost.User}`);

  return res.status(200).json({ message: "Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { userName } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.Likes.LikedUsers.includes(userName)) {
    post.Likes.LikedUsers = post.Likes.LikedUsers.filter((u) => u !== userName);
  } else {
    post.Likes.LikedUsers.push(userName);
  }

  post.Likes.LikeCount = post.Likes.LikedUsers.length;
  await post.save();

  await redis.del("posts:all");
  await redis.del(`posts:user:${post.User}`);

  res.json(post);
};

export const addComment = async (req, res) => {
  const { userName, comment } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.Comments.push({ userName, comment });
  await post.save();

  await redis.del("posts:all");
  await redis.del(`posts:user:${post.User}`);

  return res.status(200).json(post);
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ UserId: id });
    if (posts) {
      return res.status(200).json(posts);
    }
    return res.status(400).json({ message: "Posts not found" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
