// userApi.ts
import axios from "axios";

const API_URL = "https://i11c208.p.ssafy.io/tarotbom/user/emails/";

const emailVerificationApi = async (email: string) => {
  try {
    const response = await axios.post(API_URL + "verifications", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("이메일 발송 실패", error);
    throw error;
  }
};

const emailVerificationCheckApi = async (
  email: string,
  verificationCode: string
) => {
  try {
    const response = await axios.post(API_URL + "verifications/check", {
      email,
      verificationCode,
    });
    return response.data;
  } catch (error) {
    console.error("인증 실패", error);
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

export { emailVerificationApi, emailVerificationCheckApi, login };
