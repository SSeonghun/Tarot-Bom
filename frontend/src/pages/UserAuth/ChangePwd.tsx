import React, { useState, useEffect } from 'react';
import './login.css';
import InputField from '../../components/login_signup/InputField';
import SubmitButton from '../../components/login_signup/SubmitButton';
import LinkButton from '../../components/login_signup/LinkButton';

const Signup: React.FC = () => {
  // const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const noopHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  // const validateEmail = (email: string) => {
  //   const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return re.test(String(email).toLowerCase());
  // };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setEmail(value);
  //   if (validateEmail(value)) {
  //     setEmailError('');
  //   } else {
  //     setEmailError('유효한 이메일 주소를 입력해주세요.');
  //   }
  // };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateEmail(email)) {
    //   setEmailError('유효한 이메일 주소를 입력해주세요.');
    //   return;
    // }
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 login-page">
      <div className="z-10 w-full max-w-md ml-auto mr-10 mt-16"> 
        <div className="flex min-h-screen bg-[#04060F] bg-opacity-0">
          <div className="w-full space-y-6 bg-gray-800 rounded-lg max-w-96 bg-opacity-0">
            <div className="text">
              <h2 className="text-6xl font-bold text-white">비밀번호 변경</h2>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

              <InputField
                type="password"
                placeholder="기존 비밀번호"
                value={currentPassword}
                onChange={noopHandler}
              />

              <InputField
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={passwordError}
              />
              <SubmitButton text="비밀번호 변경" />
              <LinkButton to="/login" text="로그인 페이지로 돌아가기" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;