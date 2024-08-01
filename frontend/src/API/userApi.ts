// userApi.ts
import axios from "axios";
import { error } from "console";

const API_URL = "http://localhost/tarotbom/user/";

const signup = async (nickname: string, email: string, password: string) => {
  console.log(nickname, email, password);
  try {
    const response = await axios.post(API_URL + "signup", {
      nickname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // 에러 메시지나 응답 상태 코드에 따라 적절한 처리
    console.error("회원가입 실패", error);
    throw error;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      API_URL + "login",
      {
        email,
        password,
      },
      {
        withCredentials: true, // 쿠키를 포함하도록 설정
      }
    );
    return response.data;
  } catch (error) {
    console.error("로그인 실패", error);
    throw error;
  }
};

export { signup, login };
