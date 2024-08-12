// stores/store.ts
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// 사용자 상태 인터페이스 정의
interface UserState {
  isLoggedIn: boolean; // 로그인 여부
  userInfo:
    | {
        memberId: number;
        nickname: string | undefined;
        email: string | undefined;
        isReader: boolean | undefined;
        profileImg : string | undefined;
        password: string;
      }
    | undefined; // 사용자 정보 (null일 수 있음)
  loginUser: () => void; // 로그인 함수
  logoutUser: () => void; // 로그아웃 함수
  userInfoSet: (info: {
    memberId: number;
    nickname: string | undefined;
    email: string | undefined;
    isReader: boolean | undefined;
    profileImg : string | undefined;
    password : string;
  }) => void; // 사용자 정보 설정 함수
}

// Zustand 스토어 생성
const useStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: undefined,
      loginUser: () => set({ isLoggedIn: true }), // 로그인 함수
      logoutUser: () => set({ isLoggedIn: false, userInfo: undefined }), // 로그아웃 함수
      userInfoSet: (info) => set({ userInfo: info }), // 사용자 정보 설정 함수
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 키
    } as PersistOptions<UserState> // PersistOptions 타입 지정
  )
);

export default useStore;
