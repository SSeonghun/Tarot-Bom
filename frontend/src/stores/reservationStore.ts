// stores/reservationStore.ts
import create from "zustand";

interface ReservationState {
  reservations: any[]; // 예약 내역 배열
  setReservations: (reservations: any[]) => void; // 예약 내역을 설정하는 함수
}

const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  setReservations: (reservations) => set({ reservations }),
}));

export default useReservationStore;
