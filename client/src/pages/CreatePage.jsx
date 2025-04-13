import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apiFunctions";
import useAuthStore from "../store";
import { motion } from "framer-motion";
import { ErrorState, Loading, SuccessState } from "../components/States";

const CreatePage = () => {

    const userId = useAuthStore(state => state.userId);
    const userName = useAuthStore(state => state.userName);
    const userAvatar = useAuthStore(state => state.userAvatar);
    const now = new Date();
    const [preview, setPreview] = useState(null);

    const { handleSubmit, formState: { errors }, register } = useForm();

    // Destructure the file input to combine onChange handlers
    const imageRegister = register("Image", { required: true });

    const { isLoading, mutate, isError, isSuccess, isPending } = useMutation({
        mutationFn: (data) => createPost(data)
    });

    // Create a preview for the uploaded image
    const handleImagePreview = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    if (isSuccess) return <SuccessState />
    if (isLoading || isPending) return <Loading />
    if (isError) return <ErrorState />

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("UserAvatar", userAvatar);
        formData.append("UserId", userId);
        formData.append("User", userName);
        formData.append("Description", data.Description);
        formData.append("Image", data.Image[0]);
        formData.append("Date", now.toISOString().split('T')[0]); // "YYYY-MM-DD"
        formData.append("PostId", crypto.randomUUID());
        mutate(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center py-8"
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-lg w-full">
                <h2 className="lg:text-3xl text-2xl font-extrabold text-center text-[#2D336B] dark:text-gray-100 mb-6 tracking-wider">
                    Create a Post
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#2D336B] dark:text-gray-300 mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...imageRegister}
                            onChange={(e) => {
                                imageRegister.onChange(e);
                                handleImagePreview(e);
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.Image && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                    </div>

                    {/* Preview Section */}
                    {preview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-h-64 object-contain rounded-md border border-gray-300"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            {...register("Description", { required: true })}
                            placeholder="Enter Description"
                            className="mt-1 block w-full h-32 resize-none rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2D336B] focus:border-transparent"
                        />
                        {errors.Description && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-[#2D336B] hover:bg-[#13173e] text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default CreatePage;
