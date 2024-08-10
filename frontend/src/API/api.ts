import axios from "axios";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/";
const API_URL = "https://i11c208.p.ssafy.io/tarotbom/";
const chatReport = async(reportedId:number, content:string, roomId:String)=>{
  const status='D00'
  const reporType='S02'
  try{
    const response = await axios.post(`${API_URL}report`, {
      reportedId,
      content,
      roomId, // 추가: roomId도 함께 전송
      status,
      reporType
    });
    return response.data
  }catch(error){
    console.error("온라인 채팅 신고 실패",error);
    throw error;
  }
  
}

const readerList = async (page: number, name: string) => {
  try {
    const response = await axios.post(`${API_URL}reader/list`);
    return response.data;
  } catch (error) {
    console.error("전체 리더 목록 조회 실패", error);
    throw error;
  }
};

const result = async (
  readerId: number,
  seekerId: number,
  date: string,
  keyword: string,
  memo: string,
  summary: string,
  music: string,
  roomId: number
) => {
  try {
    const response = await axios.post(`${API_URL}result`, {
      readerId,
      seekerId,
      date,
      keyword,
      memo,
      summary,
      music,
      roomId,
    });
    return response.data;
  } catch (error) {
    console.error("결과 조회 실패", error);
    throw error;
  }
};

const declaration = async (
  reporterId: number,
  reportedId: number,
  roomId: number,
  content: string,
  reportTime: string,
  repotType: string
) => {
  try {
    const response = await axios.post(`${API_URL}declaration`, {
      reportedId,
      reporterId,
      roomId,
      content,
      reportTime,
      repotType,
    });

    return response.data;
  } catch (error) {
    console.error("신고 실패", error);
    throw error;
  }
};

const cardInfo = async (cardId: number) => {
  try {
    const response = await axios.get(`${API_URL}card/info/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("카드 조회 실패");
    throw error;
  }
};

export { chatReport,readerList, result, declaration, cardInfo };
