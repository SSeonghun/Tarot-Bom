import React, { useState, useEffect } from "react";
import Select from "../Common/SelectTime"; // 경로 수정

interface TimeProps {
  selectedDate: Date | null;
  reservedTimes: { time: string; date: Date | null }[];
  onTimeSelect: (timeWithDate: { time: string; date: Date | null }[]) => void;
}

const Time: React.FC<TimeProps> = ({
  selectedDate,
  reservedTimes,
  onTimeSelect,
}) => {
  console.log("time mounted");
  console.log("reservedTimes:", reservedTimes);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [savedButtons, setSavedButtons] = useState<string[]>([]);

  // 기본 시간 옵션 생성 (10:00부터 13:00까지, 16:00부터 24:00까지)
  const generateTimeOptions = () => {
    const timeOptions: string[] = [];
    for (let hour = 10; hour <= 13; hour++) {
      timeOptions.push(
        `${String(hour).padStart(2, "0")}:00`,
        `${String(hour).padStart(2, "0")}:30`
      );
    }
    for (let hour = 16; hour <= 23; hour++) {
      timeOptions.push(
        `${String(hour).padStart(2, "0")}:00`,
        `${String(hour).padStart(2, "0")}:30`
      );
    }
    return timeOptions;
  };

  // 예약된 시간 제외
  const getReservedTimeStrings = () => {
    return reservedTimes
      .filter(
        (reservation) =>
          reservation.date?.toDateString() === selectedDate?.toDateString()
      )
      .map((reservation) => convertTo24HourFormat(reservation.time));
  };

  // 12시간 형식의 시간 문자열을 24시간 형식으로 변환하는 함수
  const convertTo24HourFormat = (time: string) => {
    const [timeOfDay, timeString] = time.split(" ");
    const [hours, minutes] = timeString.split(":").map(Number);

    let newHours = hours;
    if (timeOfDay === "오후" && hours < 12) {
      newHours += 12;
    } else if (timeOfDay === "오전" && hours === 12) {
      newHours = 0;
    }

    return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  // 컴포넌트 마운트 시 활성화 상태 설정
  useEffect(() => {
    const timeOptions = generateTimeOptions();
    const reservedTimeStrings = getReservedTimeStrings();
    setActiveButtons(
      timeOptions.filter((option) => !reservedTimeStrings.includes(option))
    );
  }, [selectedDate, reservedTimes]);

  // 시간 선택 핸들러
  const handleSelect = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }

    if (selectedDate) {
      const timeWithDate = [
        { time, date: new Date(`${selectedDate.toDateString()} ${time}`) },
      ];
      onTimeSelect(timeWithDate);
    }
  };

  // 버튼 활성화 여부 확인
  const isButtonActive = (option: string): boolean => {
    const reservedTimeStrings = getReservedTimeStrings();
    const isActive =
      activeButtons.includes(option) &&
      !reservedTimeStrings.includes(option) &&
      option !== selectedTime;
    console.log(`Button ${option} is ${isActive ? "active" : "inactive"}`);
    return isActive;
  };

  return (
    <div className="mb-4">
      <Select
        options={generateTimeOptions()} // 모든 시간 옵션을 제공
        selectedOption={[selectedTime].filter(Boolean) as string[]}
        onSelect={handleSelect}
        isButtonActive={isButtonActive}
        activeButtons={activeButtons}
      />
    </div>
  );
};

export default Time;
