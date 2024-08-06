import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatLog {
    userId: string;
    message: string;
    timestamp: string;
}

interface ChatState {
    logs: ChatLog[];
    addLog: (log: ChatLog) => void;
    clearLogs: () => void;
}

const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (log) => set((state) => ({
                logs: [...state.logs, log]
            })),
            clearLogs: () => set({ logs: [] }),
        }),
        {
            name: 'chat-storage', // 로컬 스토리지에 저장할 때 사용할 고유 이름
        }
    )
);

export default useChatStore;
