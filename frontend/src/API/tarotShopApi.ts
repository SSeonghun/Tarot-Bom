import axios from "axios";
import { error } from "console";



// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/tarotshop/";
const API_URL = "http://localhost/tarotbom/tarotshop/";

const writeTarotshop = async (
  shopName: string,
  readerId: number,
  address: string,
  phone: string,
  longitude: number,
  latitude: number
) => {
  try {
    const response = await axios.post(`${API_URL}write`, {
      shopName,
      readerId,
      address,
      phone,
      longitude,
      latitude,
    });
    return response.data;
  } catch (error) {
    console.error("타로점 등록 실패", error);
    throw error;
  }
};

const detailTarotshop = async (shopId: number) => {
  try {
    const response = await axios.get(`${API_URL}${shopId}`);
    return response.data;
  } catch (error) {
    console.error("타로점 상세조회 실패", error);
    throw error;
  }
};

const patchTarotshop = async (
  shopId: number,
  shopName: string,
  readerId: number,
  address: string,
  phone: string,
  longitude: number,
  latitude: number
) => {
  try {
    const response = await axios.patch(`${API_URL}${shopId}`);
    return response.data;
  } catch (error) {
    console.error("타로점 수정 실패", error);
    throw error;
  }
};

const deleteTarotshop = async (shopId: number) => {
  try {
    const response = await axios.delete(`${API_URL}${shopId}`);
    return response.data;
  } catch (error) {
    console.error("타로점 삭제 실패", error);
    throw error;
  }
};

export { writeTarotshop, detailTarotshop, patchTarotshop, deleteTarotshop };
