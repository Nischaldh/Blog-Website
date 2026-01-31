import BlogForm from "@/components/forms/BlogForm";
import { useEditBlog } from "@/hooks/useEditBlog";

const EditBlog = () => {
  const { loading, initialData, handleSubmit, handleSaveDraft, handleCancel } = useEditBlog();

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <p className="text-gray-500">Blog not found...</p>
      </div>
    );
  }

  return (
    <BlogForm
      initialData={initialData}
      isEditMode={true}
      onSubmit={handleSubmit}
      onSaveDraft={handleSaveDraft}
      onCancel={handleCancel}
    />
  );
};

export default EditBlog;