import axios from "axios";
import { error } from "console";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/room/";
const API_URL = "http://localhost/tarotbom/room/";

const open = async (
  roomType: string,
  readerId: number,
  seekerId: number,
  keyword: string,
  worry: string,
  roomStyle: string,
  reservationId?: string
) => {
  try {
    const response = await axios.post(`${API_URL}open`, {
      roomType,
      readerId,
      seekerId,
      keyword,
      worry,
      roomStyle,
      reservationId,
    });
    return response.data;
  } catch (error) {
    console.error("방 개설 실패", error);
    throw error;
  }
};

const enter = async (userType: string, userId: number, roomId: number) => {
  try {
    const response = await axios.post(`${API_URL}enter`, {
      userType,
      userId,
      roomId,
    });
    return response.data;
  } catch (error) {
    console.error("방 접속 실패", error);
    throw error;
  }
};

export { open, enter };
