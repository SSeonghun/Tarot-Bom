import axios from "axios";
import { error } from "console";

const API_URL = "https://i11c208.p.ssafy.io/tarotbom/reservations";

const reservation = async (
  seekerId: number,
  readerId: number,
  startTime: string,
  price: number,
  worry: string
) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      seekerId,
      readerId,
      startTime,
      price,
      worry,
    });
    return response.data;
  } catch (error) {
    console.error("예약하기 실패", error);
    throw error;
  }
};

const reader = async () => {
  try {
    const response = await axios.get(`${API_URL}/reader`);
    return response.data;
  } catch (error) {
    console.error("리더기준 예약 내역 조회 실패", error);
    throw error;
  }
};

const seeker = async () => {
  try {
    const response = await axios.get(`${API_URL}/seeker`);
    return response.data;
  } catch (error) {
    console.error("리더기준 예약 내역 조회 실패", error);
    throw error;
  }
};

const deleteReservation = async (reservationId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error("예약 취소하기 실패", error);
    throw error;
  }
};

export { reservation, reader, seeker, deleteReservation };
