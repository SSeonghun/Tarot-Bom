import axios from "axios";
import { log } from "console";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/";
const API_URL = `${process.env.REACT_APP_URL}/tarotbom/`;

const chatReport = async (
  reportedId: number,
  content: string,
  roomId: String
) => {
  const status = "D00";
  const reporType = "S02";
  try {
    const response = await axios.post(`${API_URL}report`, {
      reportedId,
      content,
      roomId, // 추가: roomId도 함께 전송
      status,
      reporType,
    });
    return response.data;
  } catch (error) {
    console.error("온라인 채팅 신고 실패", error);
    throw error;
  }
};
const readerList = async () => {
  try {
    const response = await axios.get(`${API_URL}user/reader/list`, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });
    return response.data;
  } catch (error) {
    console.error("전체 리더 목록 조회 실패", error);
    throw error;
  }
};

const readerTop = async () => {
  try {
    const response = await axios.get(`${API_URL}user/reader/top`, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("탑 리더 조회 실패", error);
    throw error;
  }
};

const readerDetail = async (readerId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}user/reader/detail/${readerId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("리더 상세 조회 실패");
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
    console.log("cardId : ", cardId);
    const response = await axios.get(`${API_URL}card/info/${cardId}`, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });
    return response.data;
  } catch (error) {
    console.error("카드 조회 실패");
    throw error;
  }
};

interface CardRequset {
  cardId: number;
  sequence: number;
  direction: string;
}

interface saveTarotRequest {
  readerId: number;
  seekerId: number;
  date: Date;
  keyword: string;
  memo: string;
  summary: string;
  music: string;
  roomId: number;
  cards: CardRequset[];
}

const saveTarotResult = async (requestDto: saveTarotRequest) => {
  console.log(requestDto);
  try {
    const response = await axios.post(`${API_URL}result/save`, requestDto, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("결과 등록 실패", error);
    throw error;
  }
};

const readerJoin = async (keyword: string, intro: string) => {
  try {
    const response = await axios.post(
      `${API_URL}user/readerjoin`,
      {
        keyword,
        intro,
      },
      {
        withCredentials: true, // 요청에 쿠키를 포함하도록 설정
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(keyword, intro);
    console.log("리더 등록 실패", error);
    throw error;
  }
};

// const youtubeMusic = async (searchQuery: string) => { // searchQuery를 매개변수로 받음
//   try {
//     const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

//     const response = await axios({
//       method: 'get',
//       url: 'https://www.googleapis.com/youtube/v3/search',
//       params: {
//         key: `${YOUTUBE_API_KEY}`,
//         part: 'snippet',
//         type: 'video',
//         q: `노래 ${searchQuery}`, // searchQuery를 사용
//         maxResults: 1
//       }
//     });
//     const videoId = response.data.items[0].id.videoId;
//     const videoData = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
//     return videoData;
//   } catch (error) {
//     console.error('유튜브 뮤직 검색 실패', error);
//     throw error;
//   }
// }

const youtubeMusic = async (searchQuery: string) => {
  // searchQuery를 매개변수로 받음
  try {
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    const response = await axios({
      method: "get",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        key: `${YOUTUBE_API_KEY}`,
        part: "snippet",
        type: "video",
        q: `노래 ${searchQuery}`, // searchQuery를 사용
        maxResults: 1,
      },
    });

    return response.data.items[0];
  } catch (error) {
    console.error("유튜브 뮤직 검색 실패", error);
    throw error;
  }
};

const addReview = async (
  resultId: number,
  readerId: number,
  rating: number,
  content: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}review/add`,
      {
        resultId,
        readerId,
        rating,
        content
      },
      {
        withCredentials: true, // 요청에 쿠키를 포함하도록 설정
      }
    );
    console.log(response.data);
    console.log('리뷰 등록 성공')
    return response.data;
  } catch (error) {
    console.log("리뷰 등록 실패", error);
    throw error;
  }
};

export {
  chatReport,
  readerJoin,
  readerList,
  result,
  declaration,
  cardInfo,
  youtubeMusic,
  readerDetail,
  readerTop,
  saveTarotResult,
  addReview,
};
