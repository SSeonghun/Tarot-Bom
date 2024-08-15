import axios from "axios";
import { error } from "console";
import { rest } from "lodash";

// const API_URL = "https://i11c208.p.ssafy.io/tarotbom/boards/";
const API_URL = `${process.env.REACT_APP_URL}/tarotbom/report/`;

const getReport = async () => {
  try {
    const response = await axios.get(`${API_URL}get`);
    return response.data;
  } catch (error) {
    console.error("신고내역  조회 실패");
    throw error;
  }
};

export { getReport };
