import axios from "axios";
import useAuthStore from "./store";

const URL = import.meta.env.VITE_API_URL;

export const createPost = async (data) => {
  const response = await axios.post(`${URL}/create`, data);

  return response;
};

export const getPosts = async (user) => {
  if (user) user = user.toLowerCase();
  else user = "allPosts";

  const response = await axios.get(`${URL}/getPosts/${user}`);
  const res=response.data.reverse()
  return res
};

export const editPost = async (data) => {
  const response = await axios.post(`${URL}/edit/${data.id}`, data.formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${URL}/delete/${id}`);

  return response.data;
};

export const likePost = async (postId, userName) => {
  const response = await axios.put(`${URL}/posts/${postId}/like`, { userName });
  return response.data;
};

export const addComment = async (postId, userName, comment) => {
  try {
    const response = await axios.post(`${URL}/posts/${postId}/comment`, {
      userName,
      comment,
    });

    return response.data;
  } catch (err) {
    console.error("❌ Error in addComment API function:", err);
    throw err;
  }
};

export const getUserPosts = async (id) => {
  const response = await axios.get(`${URL}/myPosts/${id}`);
  return response.data;
};
