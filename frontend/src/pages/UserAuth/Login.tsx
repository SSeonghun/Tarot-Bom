import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { useState, useEffect } from 'react';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // 페이지가 마운트되면 스타일 적용
    document.body.style.overflow = 'hidden';

    // 페이지가 언마운트되면 스타일 제거
    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  const validateEmail = (email: string) => {
    // 이메일 형식 검증을 위한 정규 표현식
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (validateEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    // 여기서 로그인 로직을 추가합니다.
    console.log('로그인 시도', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 login-page">
      <div className="z-10 w-full max-w-md ml-auto mr-10 mt-36"> 
        <div className="flex min-h-screen bg-[#04060F] bg-opacity-0">
          <div className="w-full space-y-6 bg-gray-800 rounded-lg max-w-96 bg-opacity-0">
            <div className="text">
              <h2 className="text-6xl font-bold text-white">로그인</h2>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="block w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-700 border-gray-600 rounded-lg borer focus:outline-none focus:ring-2 focus:ring-gray-800"
                />

                {emailError && (
                  <p className="text-red-500 mt-2 text-sm">{emailError}</p>
                )}

              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />

              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none"
                >
                  로그인
                </button>
              </div>
              <div>

                <button
                  type="button"
                  className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none"
                >
                  <Link to={'/Signup'}>
                    회원가입
                  </Link>
                </button>
              </div>

            <Link className='block text-blue-400 !my-5' to={''}>
                아이디/비밀번호 찾기
            </Link>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Login;
