import express from "express";
import {
  upload,
  createPost,
  sendPosts,
  editPost,
  deletePost,
  likePost,
  addComment,
  getUserPosts,
} from "../controllers/controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
router.post("/create", upload.single("Image"), createPost);
router.get("/getPosts/:user", sendPosts);
router.post("/edit/:id", upload.single("Image"), editPost);
router.delete("/delete/:id", deletePost);
router.put("/posts/:id/like", likePost);
router.post("/posts/:id/comment", addComment);
router.get("/myPosts/:id", getUserPosts);

export default router;
