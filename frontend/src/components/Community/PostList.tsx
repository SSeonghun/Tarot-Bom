import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  boardId: number;
  title: string;
  content: string;
  nickname: string;
  createdTime: string;
  category: string; // 추가된 필드
}


interface PostListProps {
  posts: Post[];
}


function convertToKoreaStandardTime(utcDateString: string) {
  const utcDate = new Date(utcDateString); // 입력받은 UTC 날짜 문자열을 Date 객체로 변환
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(utcDate.getTime() + kstOffset); // KST로 변환

  // MM/DD 형식으로 변환
  const month = String(kstDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(kstDate.getDate()).padStart(2, '0'); // 일

  return `${month}/${day}`; // MM/DD 형식으로 반환
}


function getCategoryName(code: string): string {
  const categories: { [key: string]: string } = {
      'B01': '공지사항',
      'B02': '카드',
      'B03': '리딩경험담',
      'B04': '기타'
  };

  return categories[code] || '알 수 없는 코드'; // 코드가 없을 경우 기본 메시지 반환
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">카테고리</th> {/* 열 제목 변경 */}
            <th className="py-2 px-4 border-b text-left">제목</th>
            <th className="py-2 px-4 border-b">글쓴이</th>
            <th className="py-2 px-4 border-b">날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.boardId}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(post.boardId)}
            >
              <td className="py-2 px-4 border-b text-center">{getCategoryName(post.category)}</td> {/* 카테고리 표시 */}
              <td className="py-2 px-4 border-b text-left">{post.title}</td>
              <td className="py-2 px-4 border-b text-center">{post.nickname}</td>
              <td className="py-2 px-4 border-b text-center">{convertToKoreaStandardTime(post.createdTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
