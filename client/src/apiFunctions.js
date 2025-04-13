import axios from "axios";
import useAuthStore from "./store";

export const createPost = async (data) => {
  const response = await axios.post("http://localhost:3000/create", data);

  return response;
};

export const getPosts = async (user) => {
  if (user) user = user.toLowerCase();
  else user = "allPosts";

  const response = await axios.get(`http://localhost:3000/getPosts/${user}`);

  return response.data;
};

export const editPost = async (data) => {
  const response = await axios.post(
    `http://localhost:3000/edit/${data.id}`,
    data.formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`http://localhost:3000/delete/${id}`);

  return response.data;
};

export const likePost = async (postId, userName) => {
  const response = await axios.put(
    `http://localhost:3000/posts/${postId}/like`,
    { userName }
  );
  return response.data;
};

export const addComment = async (postId, userName, comment) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/posts/${postId}/comment`,
      {
        userName,
        comment,
      }
    );

    return response.data;
  } catch (err) {
    console.error("❌ Error in addComment API function:", err);
    throw err;
  }
};

export const getUserPosts = async (id) => {
  const response = await axios.get(`http://localhost:3000/myPosts/${id}`);
  return response.data;
};
