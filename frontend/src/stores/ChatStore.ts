import {create} from 'zustand';
import axios from 'axios';

interface ChatLog {
    userId: string;
    message: string;
    timestamp: string;
}

interface ChatStoreState {
    logs: ChatLog[];
    addLog: (log: ChatLog) => void;
    sendLogsToBackend: () => Promise<void>;
}

// Zustand 스토어를 생성합니다.
const useChatStore = create<ChatStoreState>((set, get) => ({
    logs: [],
    addLog: (log: ChatLog) => set((state) => ({
        logs: [...state.logs, log],
    })),
    
    sendLogsToBackend: async () => {
        const { logs } = get(); // 상태를 가져오는 방법
        console.log(logs)
        try {
            await axios.post('/chat/logs', { logs }); // 모든 로그를 백엔드로 전송
            
            set({ logs: [] }); // 전송 후 로그 초기화
        } catch (error) {
            
            console.log('hi')
            console.error('Failed to send logs to server', error);
        }
    },
}));

export default useChatStore;



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface ChatLog {
//     userId: string;
//     message: string;
//     timestamp: string;
// }

// interface ChatState {
//     logs: ChatLog[];
//     addLog: (log: ChatLog) => void;
//     clearLogs: () => void;
//     getLogs: () => ChatLog[];  // 추가: 상태를 가져오는 메서드
// }

// // Zustand 스토어를 생성하고, 로컬 스토리지에 상태를 저장하도록 설정합니다.
// const useChatStore = create<ChatState>()(
//     persist(
//         (set, get) => ({
//             logs: [],
//             addLog: (log) => set((state) => ({
//                 logs: [...state.logs, log]  // 로그를 추가합니다.
//             })),
//             clearLogs: () => set({ logs: [] }),  // 로그를 모두 삭제합니다.
//             getLogs: () => get().logs,  // 상태를 가져오는 메서드 추가
//         }),
//         {
//             name: 'chat-storage', // 로컬 스토리지에 저장할 때 사용할 고유 이름
//         }
//     )
// );

// export default useChatStore;
