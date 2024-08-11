import axios from "axios";
import { error } from "console";



// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/shop";
const API_URL = "http://localhost/tarotbom/shop";

const writeTarotshop = async (
  shopName: string,
  address: string,
  phone: string,
  longitude: number,
  latitude: number
) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      shopName,
      address,
      phone,
      longitude,
      latitude,
      
    },
    {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });
    return response.data;
  } catch (error) {
    console.error("타로점 등록 실패", error);
    throw error;
  }
};

const detailTarotshop = async (shopId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${shopId}`);
    return response.data;
  } catch (error) {
    console.error("타로점 상세조회 실패", error);
    throw error;
  }
};

const patchTarotshop = async (
  shopId: number,
  shopName: string,
  address: string,
  phone: string,
  longitude: number,
  latitude: number
) => {
  try {

    const response = await axios.patch(`${API_URL}/${shopId}`,
      {
        shopName,
        address,
        phone,
        longitude,
        latitude,
      },
      {
        withCredentials: true, // 쿠키를 포함하도록 설정
      }
    );
    return response.data;
  } catch (error) {
    console.error("타로점 수정 실패", error);
    throw error;
  }
};

const deleteTarotshop = async (shopId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${shopId}`,
      {
        withCredentials: true, // 쿠키를 포함하도록 설정
      }
    );
    return response.data;
  } catch (error) {
    console.error("타로점 삭제 실패", error);
    throw error;
  }
};

export { writeTarotshop, detailTarotshop, patchTarotshop, deleteTarotshop };
