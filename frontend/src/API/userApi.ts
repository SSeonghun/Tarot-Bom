// userApi.ts
import axios from "axios";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/user/";
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
  console.log(API_URL + "login");

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

const update = async (
  nickname: string,
  newPassword: string,
  profileImage: any,
  memberType: String
) => {
  try {
    const response = await axios.patch(API_URL + "update", {
      nickname,
      newPassword,
      profileImage,
      memberType,
    });

    return response.data;
  } catch (error) {
    console.error("회원 정보 수정 실패", error);
    throw error;
  }
};

const refresh = async (refreshToken: string) => {
  try {
    const response = await axios.post(API_URL + "refresh", {
      refreshToken,
    });

    return response.data;
  } catch (error) {
    console.error("refresh 토큰 발행 실패", error);
    throw error;
  }
};

const kakaoLogin = async (kakaoToken: string) => {
  try {
    const response = await axios.post(API_URL + "kakaologin", {
      kakaoToken,
    });

    return response.data;
  } catch (error) {
    console.error("카카오 로그인 실패", error);
    throw error;
  }
};

const like = async (readerId: number, seekerId: number) => {
  try {
    // POST 요청 처리
    const postResponse = await axios.post(API_URL + "like", {
      readerId,
      seekerId,
    });
    return postResponse.data;
  } catch (postError) {
    console.error("찜 하기 실패", postError);
    throw postError;
  }
};

const unlike = async (readerId: number, seekerId: number) => {
  try {
    // DELETE 요청 처리
    const deleteResponse = await axios.delete(API_URL + "like", {
      data: {
        readerId,
        seekerId,
      },
    });
    return deleteResponse.data;
  } catch (deleteError) {
    console.error("찜 취소 실패", deleteError);
    throw deleteError;
  }
};

const emailsVerifications = async (email: string) => {
  try {
    const response = await axios.post(API_URL + "emails/verifications", {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("email 인증 보내기 실패", error);
    throw error;
  }
};

const emailsCheck = async (email: string, verificationCode: string) => {
  try {
    const response = await axios.post(API_URL + "emails/check", {
      email,
      verificationCode,
    });

    return response.data;
  } catch (error) {
    console.error("eamil 확인 실패", error);
    throw error;
  }
};

const userQuit = async () => {
  try {
    const response = await axios.post(API_URL + "quit");

    return response.data;
  } catch (error) {
    console.error("회원 탈퇴 실패", error);
    throw error;
  }
};

const info = async () => {
  try {
    const response = await axios.get(API_URL + "info");

    return response.data;
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(API_URL + "logout");

    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};

const seekerMypage = async (seekerId: number) => {
  try {
    const response = await axios.get(`${API_URL}seeker/${seekerId}`);
    return response.data;
  } catch (error) {
    console.error("시커 마이페이지 조회 실패", error);
    throw error;
  }
};

const likeList = async () => {
  try {
    const response = await axios.get(`${API_URL}like/list`);
    return response.data;
  } catch (error) {
    console.error("찜한 목록 조회 실패", error);
    throw error;
  }
};

const readerAuth = async (keyword: string, intro: string) => {
  try {
    const response = await axios.post(`${API_URL}reader/auth`, {
      keyword,
      intro,
    });
    return response.data;
  } catch (error) {
    console.error("리더 인증 실패", error);
    throw error;
  }
};

const readerSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/summary`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 요약 조회 실패", error);
    throw error;
  }
};

const readerTarot = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/tarot`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 개인타로분석 조회 실패", error);
    throw error;
  }
};

const readerSales = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/sales`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 수입 조회 실패", error);
    throw error;
  }
};

const readerReview = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/review`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 리뷰 조회 실패", error);
    throw error;
  }
};

const readerConsult = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/consult`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 최근상담내역 조회 실패", error);
    throw error;
  }
};

const readerSchedule = async () => {
  try {
    const response = await axios.get(`${API_URL}reader/schedule`);
    return response.data;
  } catch (error) {
    console.error("리더 마이페이지 예약일정 조회 실패", error);
    throw error;
  }
};

export {
  signup,
  login,
  update,
  refresh,
  kakaoLogin,
  like,
  unlike,
  emailsVerifications,
  emailsCheck,
  userQuit,
  info,
  logout,
  seekerMypage,
  likeList,
  readerAuth,
  readerSummary,
  readerTarot,
  readerSales,
  readerReview,
  readerConsult,
  readerSchedule,
};
