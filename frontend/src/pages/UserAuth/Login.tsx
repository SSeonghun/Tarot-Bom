// Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import InputField from '../../components/login_signup/InputField';
import SubmitButton from '../../components/login_signup/SubmitButton';
import useUserStore from '../../stores/store';

const { login } = require('../../API/userApi');

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const store = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const validateEmail = (email: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    console.log('로그인 시도', { email, password });

    try {
      const result = await login(email, password);
      console.log('로그인 성공', result);
      store.loginUser();
      store.userInfoSet({
        memberId: result.data.memberId,
        nickname: result.data.name,
        email: result.data.email,
        isReader: result.data.reader,
      });

      // window.location.href = "/";
      navigate('/');
    } catch (error) {
      alert('이메일과 비밀번호를 다시 확인하세요');
      console.error('로그인 중 오류 발생', error);
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 login-page">
      <div className="z-10 w-full max-w-md ml-auto mr-10 mt-28">
        <div className="flex min-h-screen bg-[#04060F] bg-opacity-0">
          <div className="w-full space-y-6 bg-gray-800 rounded-lg max-w-96 bg-opacity-0">
            <div className="text">
              <h2 className="text-6xl font-bold text-white">로그인</h2>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <InputField
                type="email"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
              <InputField
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <SubmitButton text="로그인" />

              <div className="flex justify-evenly mb-auto">
                <Link className="block text-blue-400 my-5" to="/signup">
                  회원가입
                </Link>
                <Link className="block text-blue-400 my-5" to="/change-pwd">
                  비밀번호 변경
                </Link>
                <Link className="block text-blue-400 my-5" to="/findpwd">
                  비밀번호 찾기
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
