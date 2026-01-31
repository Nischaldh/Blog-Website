const ImageUploadBox = ({ 
  imageType, 
  label, 
  required = false, 
  formData, 
  setFormData, 
  dragActive, 
  setDragActive, 
  errors, 
  setErrors,
  isEditMode = false 
}) => {
  const image = formData[imageType];
  const isDragging = dragActive[imageType];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive({ ...dragActive, [imageType]: true });
    } else if (e.type === "dragleave") {
      setDragActive({ ...dragActive, [imageType]: false });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive({ ...dragActive, [imageType]: false });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, [imageType]: e.target.result });
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, [imageType]: "" });
    } else {
      setErrors({ ...errors, [imageType]: "Please upload a valid image file" });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, [imageType]: null });
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${errors[imageType] ? "border-red-500" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id={imageType}
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <label
            htmlFor={imageType}
            className="cursor-pointer flex flex-col items-center justify-center h-full min-h-[200px]"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-1">
              {isEditMode && image ? "Replace image" : "Drag and drop your image here"}
            </p>
            <p className="text-xs text-gray-500">or click to browse</p>
          </label>
        </div>

        {/* Preview Area */}
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden min-h-[200px] flex items-center justify-center bg-gray-50 relative">
          {image ? (
            <>
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {isEditMode && !required && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                >
                  ×
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              {isEditMode ? "No image uploaded" : "Image preview"}
            </p>
          )}
        </div>
      </div>
      {errors[imageType] && (
        <p className="text-red-500 text-sm mt-1">{errors[imageType]}</p>
      )}
    </div>
  );
};

export default ImageUploadBox;