import axios from "axios";
import { error } from "console";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/boards/"; 
const API_URL = "http://localhost/tarotbom/boards/"; 

const boardWrite = async (
  memberId: number,
  title: string,
  content: string,
  boardType: string
) => {
  try {
    const response = await axios.post(`${API_URL}write`, {
      memberId,
      title,
      content,
      boardType,
    });
    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패", error);
    throw error;
  }
};

const boardList = async (boardType: string, title: string) => {
  try {
    const response = await axios.post(`${API_URL}list`, {
      boardType,
      title,
    });
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 실패", error);
    throw error;
  }
};

const boardDetail = async (boardId: number) => {
  try {
    const response = await axios.get(`${API_URL}${boardId}`);
    return response.data;
  } catch (error) {
    console.error("상세 글 조회 실패 ", error);
    throw error;
  }
};

const boardPatch = async (
  boardId: number,
  title: string,
  content: string,
  boardType: string
) => {
  try {
    const response = await axios.patch(`${API_URL}${boardId}`, {
      title,
      content,
      boardType,
    });
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패", error);
    throw error;
  }
};

const boardDelete = async (boardId: number) => {
  try {
    const response = await axios.delete(`${API_URL}${boardId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패", error);
    throw error;
  }
};

export { boardWrite, boardList, boardDetail, boardPatch, boardDelete };
