import React, { useState, useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import HoverButton from "../Common/HoverButton";
import LoadingModal from "../Common/MatchingLoading";
import MatchingConfirmationModal from "../Common/MatchingConfirmationModal"; // 매칭 확인 모달
import useStore from "../../stores/store";
import ReaderItem from "./Readeritems/ReaderItem";
import ReaderBg from "../../assets/img/readermypage.png";
import Profile from "../../assets/img/profile2.png";

// 인터페이스
interface MatchData {
  data: {
    memberDto: {
      keyword: string;
      roomStyle: string;
      matchedTime: string;
      memberType: string;
      memberId: number;
      inConfirm: boolean;
      worry: string;
    };
    candidateDto: {
      keyword: string;
      roomStyle: string;
      matchedTime: string;
      memberType: string;
      memberId: number;
      inConfirm: boolean;
      worry: string;
    };
    status: string; // status를 포함
  };
}

interface ResponseData {
  code: string;
  data: MatchData;
  message: string;
}

const ReaderMypage: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false); // 로딩 상태
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // 매칭 확인 모달 상태
  const [pendingPayload, setPendingPayload] = useState<any>(null); // 매칭 요청 페이로드
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  const [selectedKeyword, setSelectedKeyword] = useState<string>(""); // 선택된 키워드
  const [selectedRoomStyle, setSelectedRoomStyle] = useState<string>("CAM"); // 선택된 방 스타일 (기본값은 CAM)

  const client = useRef<Client | null>(null);
  const { userInfo } = useStore();
  const memberId = userInfo?.memberId ?? 0;
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  useEffect(() => {
    client.current = new Client({
      brokerURL: "ws://localhost/tarotbom/ws-stomp",
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        if (memberId) {
          client.current?.subscribe(
            `/sub/matching/status/${memberId}`,
            (message: IMessage) => {
              const receivedMessage: ResponseData = JSON.parse(message.body);
              console.log("Received message:", receivedMessage);
              setMatchData(receivedMessage.data);

              if (receivedMessage.code === "M02") {
                setMatchLoading(false);
                setShowConfirmation(true); // 매칭 확인 모달 열기
              }
              if (receivedMessage.code === "M08") {
                // match.data를 JSON 문자열로 직렬화
                const jsonString = JSON.stringify(receivedMessage.data);

                // JSON 문자열을 객체로 역직렬화하여 token 값을 추출
                const parsedData = JSON.parse(jsonString);
                const token = parsedData.token;

                // token 값을 사용
                console.log("Token:", token);
                enterRoom(token);

                // token을 활용하여 필요한 로직 수행
                // 예: API 호출, 검증 등
              }
            }
          );
          // 매칭 확인 응답 구독 추가
          client.current?.subscribe(
            `/sub/matching/confirmation/${userInfo?.memberId}`,
            (message: IMessage) => {
              console.log("Confirmation response:", message.body);
              // 여기에 추가 응답 처리 로직을 넣을 수 있습니다.
            }
          );
        }
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [memberId]);

  // 방 입장 메서드
  //TODO : 경준형님 토큰: token, nickname : member, type: CAM인지 GFX인지 일단 하드코딩 주말 수정 예정
  const enterRoom = (token: string) => {
    const memberName = userInfo?.nickname ?? "Unknown";
    console.log(memberName, token);

    // 방 입장 URL을 위한 데이터 준비
    const roomEntryPath = `/rtcTest?token=${encodeURIComponent(
      token
    )}&name=${encodeURIComponent(memberName)}&type=${encodeURIComponent(selectedRoomStyle)}`;

    // 라우터를 통해 방으로 이동
    navigate(roomEntryPath);
  };

  const handleRandomMatching = () => {
    if (connected && client.current) {
      const payload = {
        keyword: selectedKeyword,
        roomStyle: selectedRoomStyle,
        memberType: "reader",
        memberId,
        worry: "Sample worry",
      };

      setPendingPayload(payload); // 페이로드 상태 저장
      setMatchLoading(true); // 매칭 요청 시 로딩 시작

      client.current.publish({
        destination: "/pub/matching/start",
        body: JSON.stringify(payload),
      });

      console.log("Random matching request sent:", payload);
    } else {
      console.error("STOMP client is not connected");
    }
  };

  const handleCancelMatching = () => {
    if (connected && client.current && pendingPayload) {
      const cancelPayload = {
        ...pendingPayload,
        cancelReason: "User canceled the matching process",
      };

      client.current.publish({
        destination: "/pub/matching/cancel",
        body: JSON.stringify(cancelPayload),
      });

      console.log("Matching cancel request sent:", cancelPayload);
    }

    setMatchLoading(false);
    setShowConfirmation(false);
    setPendingPayload(null); // 페이로드 상태 초기화
    console.log("Matching cancelled");
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false); // 매칭 확인 모달 닫기
  };

  const handleMatchConfirmed = () => {
    if (connected && client.current && matchData) {
      // 상태를 'accepted'로 설정
      console.log(matchData);
      const confirmationPayload = {
        ...matchData, // 기존의 myDto와 candidateDto는 그대로 유지
        status: "accepted", // 상태를 'accepted'로 설정
      };

      client.current.publish({
        destination: "/pub/matching/confirm",
        body: JSON.stringify(confirmationPayload),
      });
      console.log("Matching confirmation request sent:", confirmationPayload);
    }

    // 매칭 확인 후 상태 업데이트
    setMatchLoading(false);
    setShowConfirmation(false);
    setPendingPayload(null);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedKeyword(event.target.value);
  };

  const handleRoomStyleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedRoomStyle(event.target.value);
  };

  return (
    <div className="relative w-screen h-screen">
      <LoadingModal isOpen={matchLoading} onCancel={handleCancelMatching} />
      <MatchingConfirmationModal
        isOpen={showConfirmation}
        matchData={matchData}
        onClose={handleCloseConfirmation}
        onMatchConfirmed={handleMatchConfirmed}
      />

      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url(${ReaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute inset-0 z-10 bg-black opacity-50"></div>
      <div className="relative flex flex-col justify-center items-center h-full z-20">
        <div className="bg-black bg-opacity-50 p-2 absolute top-[50px] rounded-full backdrop-filter backdrop-blur-sm">
          <img src={Profile} alt="Profile" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex flex-col justify-center absolute top-[180px] items-center">
          <h1 className="text-white text-[40px] font-bold mt-5">김싸피</h1>
          <h3 className="text-white">TAROT READER</h3>
        </div>
        <div className="flex flex-wrap gap-4 absolute top-[350px]">
          {["G01", "G02", "G03", "G04", "G05", "G06"].map((value, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded dark:border-gray-700"
            >
              <input
                id={`keyword-radio-${value}`}
                type="radio"
                value={value}
                name="keyword-radio"
                checked={selectedKeyword === value}
                onChange={handleKeywordChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`keyword-radio-${value}`}
                className="py-4 ms-2 text-sm font-medium text-white dark:text-gray-300"
              >
                {value === "G01"
                  ? "연애운"
                  : value === "G02"
                  ? "가족운"
                  : value === "G03"
                  ? "재물운"
                  : value === "G04"
                  ? "건강운"
                  : value === "G05"
                  ? "기타"
                  : "직장운"}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 absolute top-[410px]">
          {["CAM", "GFX"].map((value, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded dark:border-gray-700"
            >
              <input
                id={`room-style-radio-${value}`}
                type="radio"
                value={value}
                name="room-style-radio"
                checked={selectedRoomStyle === value}
                onChange={handleRoomStyleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`room-style-radio-${value}`}
                className="py-4 ms-2 text-sm font-medium text-white dark:text-gray-300"
              >
                {value}
              </label>
            </div>
          ))}
        </div>
        <div className="-mt-[200px]">
          <HoverButton
            label="랜덤 매칭 시작"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
            onClick={handleRandomMatching}
          />
        </div>
      </div>

      <div className="relative h-fit bg-black z-30 mt-[150px]">
        <div className="h-fit bg-white mx-[100px] relative flex flex-col -top-[450px] rounded-xl bg-opacity-55">
          <ReaderItem />
        </div>
      </div>
    </div>
  );
};

export default ReaderMypage;
