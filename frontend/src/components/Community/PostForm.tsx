import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostFormProps {
  addPost: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      const newPost: Post = {
        id: Date.now(),
        title,
        content,
      };
      addPost(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          className="mt-1 p-2 block w-full border rounded-md shadow-sm"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
