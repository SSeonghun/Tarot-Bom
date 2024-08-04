import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// URL 상태 인터페이스 정의
interface UrlState {
  url: string; // 저장할 URL
  setUrl: (newUrl: string) => void; // URL을 설정하는 함수
}

// Zustand 스토어 생성
const useUrlStore = create<UrlState>()(
  persist(
    (set) => ({
      url: "https://i11c208.p.ssafy.io/tarotbom", // 초기 URL 값
      setUrl: (newUrl) => set({ url: newUrl }), // URL 설정 함수
    }),
    {
      name: 'url-storage', // 로컬 스토리지에 저장될 키
    } as PersistOptions<UrlState> // PersistOptions 타입 지정
  )
);

export default useUrlStore;
