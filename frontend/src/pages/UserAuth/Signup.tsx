import React, { useState, useEffect } from "react";
import "./login.css";
import InputField from "../../components/login_signup/InputField";
import SubmitButton from "../../components/login_signup/SubmitButton";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const { signup } = require("../../API/userApi"); // api.js에서 signup 함수를 import
const {
  emailVerificationApi,
  emailVerificationCheckApi,
} = require("../../API/emailApi");

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [pinError, setPinError] = useState(""); // State to hold pin error
  const [verifyEmail, setVerifyEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // document.body.style.overflow = "hidden";
    // return () => {
    //   document.body.style.overflow = "";
    // };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (validateEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handlePinNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      // Validate pin to be numeric and up to 6 digits
      setPinNumber(value);
      if (value.length === 6) {
        setPinError(""); // Clear error if pin is 6 digits
      } else {
        setPinError("핀 번호는 6자리 숫자여야 합니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!verifyEmail) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "이메일인증을 완료해 주세요",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }

    console.log("회원가입 시도", { username, email, password });

    try {
      const result = await signup(username, email, password);
      console.log("회원가입 성공", result);
      window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 중 오류 발생", error);
    }
  };

  const emailVerification = async () => {
    if (!validateEmail(email)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "이메일을 확인하세요",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }

    try {
      await emailVerificationApi(email);
      console.log("인증번호 발송");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "인증번호 전송",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.error("이메일 인증 코드 전송 중 오류 발생", error);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "이메일을 확인하세요",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  const emailVerificationCheck = async () => {
    console.log(pinNumber);

    try {
      await emailVerificationCheckApi(email, pinNumber);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "인증성공",
        showConfirmButton: false,
        timer: 1200,
      });
      console.log("인증성공");
      setVerifyEmail(true);
    } catch (error) {
      console.error("이메일 인증 실패");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "인증실패",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 login-page">
      <div className="z-10 w-full max-w-md ml-auto mr-10 mt-16">
        <div className="flex min-h-screen bg-[#04060F] bg-opacity-0">
          <div className="w-full space-y-6 bg-gray-800 rounded-lg max-w-96 bg-opacity-0">
            <div className="text">
              <h2 className="text-6xl font-bold text-white">회원가입</h2>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <InputField
                type="text"
                placeholder="닉네임"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                type="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
              <div className="flex flex-row justify-end mx-4">
                <button
                  type="button"
                  className="text-white font-bold text-[18px]"
                  onClick={emailVerification}
                >
                  인증번호 전송
                </button>
              </div>
              <InputField
                type="text"
                placeholder="인증번호"
                value={pinNumber}
                onChange={handlePinNumChange}
                error={pinError}
              />
              <div className="flex flex-row justify-end items-center mx-4 text-[18px]">
                {/* <button className="text-white font-bold onClick={emailVerification}">
                  {" "}
                  다시 전송{" "}
                </button> */}
                <button
                  className="text-white ms-4 font-bold"
                  onClick={emailVerificationCheck}
                >
                  {" "}
                  확인{" "}
                </button>
              </div>

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
              <SubmitButton text="회원가입" />
              <Link to="/login" className="block text-blue-400 my-5">
                로그인 페이지로
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
