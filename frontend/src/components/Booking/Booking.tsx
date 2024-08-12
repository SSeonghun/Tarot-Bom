import React, { useState } from "react";
import Calendar from "./Calendar";
import Name from "./Name";
import Time from "./Time";
import Category from "./Category";
import Method from "./Method";
import Content from "./Content";
import Swal from "sweetalert2";
import useStore from "../../stores/store";

const { reservation } = require("../../API/reservationsApi");

interface TimeWithDate {
  time: string;
  date: Date | null;
}

interface BookingProps {
  id: string | undefined;
  name: string | undefined;
  profileUrl: string;
  reservationsResponse: {
    status: number;
    code: string;
    message: string;
    data: Reservation[];
  };
}

interface Reservation {
  reservationId: number;
  seekerId: number;
  seekerName: string;
  seekerProfileUrl: string;
  readerId: number;
  readerProfileUrl: string;
  status: string;
  keyword: string;
  startTime: Date;
}

interface ReservationAxios {
  seekerId: number;
  readerId: number;
  startTime: string | null;
  price: number;
  worry: string;
  keyword: string;
  roomStyle: string;
  status: string;
}

const Booking: React.FC<BookingProps> = ({
  id,
  name,
  profileUrl,
  reservationsResponse,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<TimeWithDate[]>([]);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string | null>(
    null
  );
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [worry, setWorry] = useState<string>(""); // worry를 string으로 변경
  const store = useStore();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimes([]);
    setIsTimeModalOpen(true);
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  const confirmTimeSelection = () => {
    closeTimeModal();
  };

  const handleTimeSelect = (timeWithDate: TimeWithDate[]) => {
    setSelectedTimes(timeWithDate);
  };

  const handleCancelSelection = () => {
    setSelectedTimes([]);
    closeTimeModal();
  };

  const handleCategoriesChange = (categories: string | null) => {
    let categoryCode: string | null = null;

    switch (categories) {
      case "연애운":
        categoryCode = "G01";
        break;
      case "진로운":
        categoryCode = "G02";
        break;
      case "금전운":
        categoryCode = "G03";
        break;
      case "건강운":
        categoryCode = "G04";
        break;
      case "기타":
        categoryCode = "G05";
        break;
      default:
        break;
    }

    setSelectedCategories(categoryCode);

    console.log("선택된 카테고리:", categoryCode);
  };

  const handleMethodChange = (method: string | null) => {
    let methodCode: string | null = null;

    switch (method) {
      case "그래픽":
        methodCode = "A01";
        break;
      case "카드":
        methodCode = "A02";
        break;
      default:
        break;
    }

    setSelectedMethod(methodCode);

    console.log("선택된 메소드: ", methodCode);
  };

  const handleWorryChange = (newWorry: string) => {
    setWorry(newWorry);
    console.log("선택된 걱정: ", newWorry);
  };

  const formatDateForServer = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // ISO 8601 형식으로 변환
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const submitClick = async () => {
    // 모든 필드가 채워졌는지 확인
    if (
      selectedCategories === null ||
      selectedMethod === null ||
      worry === "" ||
      selectedDate === null ||
      selectedTimes.length === 0
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "모든 필드를 입력해 주세요.",
        showConfirmButton: true,
      });
      return;
    }

    // selectedTimes의 첫 번째 시간과 날짜를 사용하여 시작 시간 포맷
    const selectedTime = selectedTimes[0];
    const formattedStartTime = formatDateForServer(selectedTime.date!); // date는 null이 아님

    // reservationData 객체 설정
    const reservationData: ReservationAxios = {
      seekerId: Number(store.userInfo?.memberId), // ensure it's a number
      readerId: Number(id), // ensure it's a number
      startTime: formattedStartTime, // ISO 문자열 형식
      price: 100000,
      worry: worry,
      keyword: selectedCategories, // 단일 문자열로 처리
      roomStyle: selectedMethod,
      status: "R01",
    };

    console.log(reservationData);

    try {
      // reservation 함수 호출
      const response = await reservation(reservationData);
      console.log(response);

      // 전역 상태에 예약 정보를 저장
      console.log("저장되는 리더 아이디 : ", id);
      useStore.getState().setReservationInfo({
        memberId: reservationData.readerId,
        time: String(reservationData.startTime),
      });

      // 예약 완료 메시지
      Swal.fire({
        position: "center",
        icon: "success",
        title: "예약 완료",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "예약 실패",
        text: "예약 과정에서 오류가 발생했습니다.",
        showConfirmButton: true,
      });
    }
  };

  const reservedTimesForSelectedDate = reservationsResponse.data
    .filter(
      (reservation) =>
        selectedDate &&
        new Date(reservation.startTime).toDateString() ===
          selectedDate.toDateString()
    )
    .map((reservation) => ({
      time: new Date(reservation.startTime).toLocaleTimeString(),
      date: new Date(reservation.startTime),
    }));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4 z-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <img src={profileUrl} alt="Profile" className="rounded-full mr-2" />
            <div>
              <h1 className="text-white text-2xl">{name}</h1>
              <p className="text-gray-300">TAROT READER</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1">
            <Calendar onDateSelect={handleDateSelect} />
          </div>
          <div className="flex-1">
            {selectedTimes.length > 0 && selectedDate && (
              <div className="text-white text-lg mb-4">
                {selectedDate.toLocaleDateString()}
                {selectedTimes.map((item) => (
                  <span key={item.time}> {item.time}</span>
                ))}
              </div>
            )}
            <Category onCategoryChange={handleCategoriesChange} />
            <Method onMethodChange={handleMethodChange} />
            <Content onWorryChange={handleWorryChange} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={submitClick}
            className="border-[2px] border-purple-300 text-white rounded-lg px-4 py-2 mt-4 w-1/4 hover:bg-purple-300 hover:text-gray-700"
          >
            예약
          </button>
        </div>
      </div>

      {isTimeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-lg mb-4">시간 선택</h2>
            <Time
              selectedDate={selectedDate}
              reservedTimes={reservedTimesForSelectedDate}
              onTimeSelect={handleTimeSelect}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancelSelection}
                className="bg-gray-500 text-white rounded-lg px-4 py-2"
              >
                취소
              </button>
              <button
                onClick={confirmTimeSelection}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
