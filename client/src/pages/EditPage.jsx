import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { editPost } from '../apiFunctions'
import { motion } from 'framer-motion'
import { ErrorState, Loading, SuccessState } from '../components/States'

const EditPage = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const now = new Date();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Description: state?.Description || "",
        },
    });
    const queryClient = useQueryClient();
    const [preview, setPreview] = useState(null);
    const { mutate, isLoading, isError, isSuccess, isPending } = useMutation({
        mutationFn: (data) => editPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    })
    const imageRegister = register("Image");
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("Description", data.Description)
        formData.append("Image", data.Image[0])
        formData.append("Date", now.toISOString().split('T')[0])
        mutate({ formData, id })
    }
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

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen  flex items-center justify-center py-8"
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-lg w-full">
                <h2 className="text-3xl font-extrabold text-center text-[#2D336B] dark:text-gray-100 mb-6 tracking-wider">
                    Edit Your Post
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Update Image
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
                            {...register("Description")}
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
    )
}

export default EditPage