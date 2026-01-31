import { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";

const BlogForm = ({ 
  initialData = {
    title: "",
    content: "",
    tags: [],
    primary_image: null,
    secondary_image1: null,
    secondary_image2: null,
  },
  isEditMode = false,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState(initialData);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState({
    primary_image: false,
    secondary_image1: false,
    secondary_image2: false,
  });

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && formData.tags.length < 3 && !formData.tags.includes(tag)) {
        setFormData({ ...formData, tags: [...formData.tags, tag] });
        setTagInput("");
        setErrors({ ...errors, tags: "" });
      } else if (formData.tags.length >= 3) {
        setErrors({ ...errors, tags: "Maximum 3 tags allowed" });
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.primary_image)
      newErrors.primary_image = "Primary image is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (formData.tags.length === 0)
      newErrors.tags = "At least one tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {isEditMode ? "Edit Blog" : "Upload New Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blog title..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Primary Image */}
        <ImageUploadBox
          imageType="primary_image"
          label="Primary Image"
          required={true}
          formData={formData}
          setFormData={setFormData}
          dragActive={dragActive}
          setDragActive={setDragActive}
          errors={errors}
          setErrors={setErrors}
          isEditMode={isEditMode}
        />

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your blog content here..."
            rows={8}
            style={{ minHeight: "200px" }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs ml-2">
              (Maximum 3 tags)
            </span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            disabled={formData.tags.length >= 3}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tags ? "border-red-500" : "border-gray-300"
            } ${formData.tags.length >= 3 ? "bg-gray-100" : ""}`}
            placeholder="Type a tag and press Enter or comma..."
          />
          <p className="text-gray-500 text-xs mt-1">
            {formData.tags.length}/3 tags added
          </p>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>

        {/* Secondary Images */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">
            Additional Images (Optional)
          </h3>
          <ImageUploadBox
            imageType="secondary_image1"
            label="Secondary Image 1"
            formData={formData}
            setFormData={setFormData}
            dragActive={dragActive}
            setDragActive={setDragActive}
            errors={errors}
            setErrors={setErrors}
            isEditMode={isEditMode}
          />
          <ImageUploadBox
            imageType="secondary_image2"
            label="Secondary Image 2"
            formData={formData}
            setFormData={setFormData}
            dragActive={dragActive}
            setDragActive={setDragActive}
            errors={errors}
            setErrors={setErrors}
            isEditMode={isEditMode}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isEditMode ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;