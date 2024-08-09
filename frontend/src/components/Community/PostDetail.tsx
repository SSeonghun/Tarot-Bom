import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/store';


const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const store = useUserStore();

  const { boardDetail, writeComment } = require("../../API/boardsApi")

  useEffect(() => {
    const fetchPost = async () => {
      // API 호출 부분은 비워둡니다.
      
      const response = await boardDetail(id);
      // console.log(response.data);
      setPost(response.data)
      setLoading(false)
      return response.data

    };

    fetchPost();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    const response = await writeComment(id, store.userInfo?.memberId, newComment);
    // console.log(response);
    setNewComment(''); // 댓글 입력 필드 초기화
    const response1 = await boardDetail(id);
    // console.log(response1.data);
    setPost(response1.data)
    setLoading(false)
    // 댓글 추가 후 게시글을 다시 불러오기 로직 필요

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">작성자: {post.writer}</p>
          <p className="text-sm text-gray-600">작성일: {new Date(post.createTime).toLocaleString()}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">내용</h2>
          <p className="mt-2 text-gray-800">{post.content}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">댓글</h2>
          <div className="mt-4">
            {post.commentList.map((comment: any) => (
              <div key={comment.commentId} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
                <p className="font-semibold">{comment.writerName}</p>
                <p className="text-sm text-gray-600">{new Date(comment.createTime).toLocaleString()}</p>
                <p className="mt-2 text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="댓글을 작성하세요..."
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              댓글 달기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
