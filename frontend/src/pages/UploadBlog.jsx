import BlogForm from "@/components/forms/BlogForm";
import { useUploadBlog } from "@/hooks/useUploadBlog";

const UploadBlog = () => {
  const { handleSubmit, handleSaveDraft, handleCancel } = useUploadBlog();

  return (
    <BlogForm 
      isEditMode={false} 
      onSubmit={handleSubmit} 
      onSaveDraft={handleSaveDraft}
      onCancel={handleCancel} 
    />
  );
};

export default UploadBlog;