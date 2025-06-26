"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Send,
  CheckCircle,
  Edit,
  Trash2,
  Upload,
  X,
  Eye,
} from "lucide-react";
import service from "../lib/appwrite/service";
import {
  addNews,
  updateNews,
  deleteNews,
  setNews,
} from "../lib/redux/slices/newsSlice";

export default function NewsTab() {
  const dispatch = useDispatch();
  const newsPosts = useSelector((state) => state.news.news);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    ward_no: "all",
    image: null,
  });

  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load all news when component mounts
    (async () => {
      try {
        const result = await service.getAllNews();
        dispatch(setNews(result.documents));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    })();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload image if selected
      const uploadedImage = formData.image
        ? await service.uploadFile(formData.image)
        : null;

      if (editingPost) {
        // If editing, update existing post
        const updated = await service.updatePost(editingPost.$id, {
          title: formData.title,
          content: formData.content,
          ward_no: formData.ward_no,
          featuredImage: uploadedImage
            ? uploadedImage
            : { $id: editingPost.featuredImage },
          status: "published",
        });
        dispatch(updateNews(updated));
        setEditingPost(null);
      } else {
        // If creating new post
        const newPost = await service.createPost({
          title: formData.title,
          content: formData.content,
          ward_no: formData.ward_no,
          featuredImage: uploadedImage ? uploadedImage.$id : null,
          status: "published",
        });
        dispatch(addNews(newPost));
      }

      // Reset UI state after successful submission
      setIsSubmitted(true);
      setShowCreateForm(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ title: "", content: "", ward_no: "all", image: null });
      }, 2000);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      ward_no: post.ward_no,
      image: null,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const success = await service.deletePost(id);
      if (success) dispatch(deleteNews(id));
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">News Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          <Plus className="w-5 h-5 mr-2" /> Create News
        </button>
      </div>

      {/* Form */}
      {showCreateForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 border"
        >
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title..."
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={3}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter content..."
              className="w-full border px-4 py-2 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={10}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="ward_no"
              className="block text-sm font-medium text-gray-700"
            >
              Ward Number
            </label>
            <select
              id="ward_no"
              name="ward_no"
              value={formData.ward_no}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {[
                "all",
                ...Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
              ].map((ward) => (
                <option key={ward} value={ward}>
                  {ward === "all" ? "All Wards" : `Ward ${ward}`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {formData.image && (
              <p className="text-sm mt-2 text-green-600">
                {formData.image.name}
              </p>
            )}
            {editingPost?.featuredImage && !formData.image && (
              <img
                src={service.getFilePreview(editingPost.featuredImage)}
                alt="Current"
                className="w-32 h-20 object-cover mt-2 rounded-lg"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowCreateForm(false);
                setEditingPost(null);
                setFormData({
                  title: "",
                  content: "",
                  ward_no: "all",
                  image: null,
                });
              }}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingPost ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      )}

      {/* Success message */}
      {isSubmitted && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center space-x-2 shadow">
          <CheckCircle className="w-5 h-5" />
          <span>
            News {editingPost ? "updated" : "published"} successfully!
          </span>
        </div>
      )}

      {/* News List */}
      <div className="bg-white shadow-md rounded-lg divide-y border">
        {newsPosts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No news or updates available.
          </div>
        ) : (
          newsPosts.map((post) => (
            <div
              key={post.$id}
              className="p-6 flex justify-between items-start hover:bg-gray-50"
            >
              <div>
                <h2 className="font-bold text-xl"><span className="font-bold text-2xl text-red-500">Title : </span>{post.title}</h2>
                <p className="text-sm text-gray-600 mt-4">
                  <span className="text-sm mt-1 text-red-500">Ward No : </span>{post.ward_no}
                </p>
                <p className="text-sm text-gray-600 mt-1"><span className="text-sm mt-1 text-red-500">Status : </span>{post.status}</p>
                <p className="text-gray-700 mt-4">{post.content}</p>
              </div>
              <div className="flex space-x-2 gap-3">
                <button
                  onClick={() => setViewingPost(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(post.$id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Modal */}
      {viewingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setViewingPost(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2"><span className="font-bold text-2xl text-red-500">Title : </span>{viewingPost.title}</h2>
            <p className="text-gray-600 text-sm mb-1">
              Ward: {viewingPost.ward_no}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Status: {viewingPost.status}
            </p>
            <p className="text-gray-700">{viewingPost.content}</p>
            {viewingPost.featuredImage && (
              <img
                src={service.getFilePreview(viewingPost.featuredImage)}
                alt="preview"
                className="mt-4 rounded-lg shadow"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
