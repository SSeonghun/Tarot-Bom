import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      const newPost: Post = { id: Date.now(), title, content };
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">게시판</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="내용"
          value={content}
          onChange={handleContentChange}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          게시하기
        </button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 mb-2 rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
