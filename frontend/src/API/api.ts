import axios from "axios";
import { error } from "console";

const API_URL = "http://localhost/tarotbom/";

const readerList = async (page: number, name: string) => {
  try {
    const response = await axios.post(`${API_URL}reader/list`);
    return response.data;
  } catch (error) {
    console.error("전체 리더 목록 조회 실패", error);
    throw error;
  }
};

const result = async (readerId: number, seekerId: number, date: string, keyword: string, memo: string, summary: string, music: string, roomId: number) => {
  try {
    const response = await axios.post(`${API_URL}result`, {
      readerId,
      seekerId,
      date,
      keyword,
      memo,
      summary,
      music,
      roomId
    })
    return response.data
  } catch (error) {
    console.error('결과 조회 실패', error)
    throw error
  }
}



export { readerList, result };
