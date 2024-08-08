import axios from "axios";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/";
const API_URL = "http://localhost/tarotbom/";

const readerList = async () => {
  try {
    const response = await axios.get(`${API_URL}user/reader/list`);
    return response.data;
  } catch (error) {
    console.error("전체 리더 목록 조회 실패", error);
    throw error;
  }
};

const readerDetail = async (readerId: number) => {
  try {
    const response = await axios.get(`${API_URL}user/reader/detail/${readerId}`);
    return response.data;
  } catch (error) {
    console.error("리더 상세 조회 실패");
    throw error;
  }
};

const readerTop = async () => {
  try {
    const response = await axios.get(`${API_URL}user/reader/top`,
      {
        withCredentials: true, // 쿠키를 포함하도록 설정
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('탑 리더 조회 실패', error);
    throw error;
  }
}

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
    console.error("결과 저장 실패", error);
    throw error;
  }
};
const result_get = async(
  resultId: number,
)=>{
  try{
    const response = await axios.get(`${API_URL}result/search/${resultId}`
      ,
      {
        withCredentials: true, // 쿠키를 포함하도록 설정
      }
    )
    // )console.log(resultId)
    
  //   const response={
  //     readerId : 1,
  //     seekerId : 2,
  //     date : '2024.08.08',
  //     keyword : 'String',
  //     memo : 'String',
  //     summary : 'String',
  //     music : 'url',
  //     roomId : 1,
  //     cards : [
  //        {
  //           cardId: 1,
  //           sequence: 1,
  //           direction: '테스트',
  //        }
  //        ,
  //              {
  //           cardId: 2,
  //           sequence: 2,
  //           direction: 'String',
  //        },
  //        {
  //     cardId: 3,
  //     sequence: 3,
  //     direction: 'String',
  //  }
  //     ]
  //  }
    return response;
  }catch(error){
    console.error("결과 조회 실패")
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

    return response;
  } catch (error) {
    console.error("신고 실패", error);
    throw error;
  }
};

const cardInfo = async (cardId: number) => {
  try {
    const response = await axios.get(`${API_URL}card/info/${cardId}`, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });
    return response.data;
  } catch (error) {
    console.error("카드 조회 실패");
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
    const videoId = response.data.items[0].id.videoId;
    const videoData = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    return videoData;
  } catch (error) {
    console.error("유튜브 뮤직 검색 실패", error);
    throw error;
  }
};

export { readerList, result, result_get, declaration, cardInfo, youtubeMusic, readerDetail };
