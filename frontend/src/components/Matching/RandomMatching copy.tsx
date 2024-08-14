import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";

// 컴포넌트
import HoverButton from "../Common/HoverButton";
import LoadingModal from "../Common/MatchingLoading";
import MatchingConfirmationModal from "../Common/MatchingConfirmationModal";
// css
import "../../assets/css/FadeInOut.css";

// Zustand 스토어 import
import useStore from "../../stores/store";

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

interface RoomToken {
  token: string;
}

interface MatchingStartRequestDto {
  keyword: string;
  roomStyle: string;
  memberType: string;
  memberId: number;
  worry: string;
}

const RandomMatching: React.FC = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [selectReader, setSelectReader] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [tarotType, setTarotType] = useState<string | null>(null);

  const [keyword, setKeyword] = useState<string>("");
  const [roomStyle, setRoomStyle] = useState<string>("CAM");
  const [memberType, setMemberType] = useState<string>("seeker");
  const worryArea = useRef<HTMLTextAreaElement | null>(null);

  // Zustand 스토어에서 필요한 값 가져오기
  const { userInfo } = useStore();
  const navigate = useNavigate();
  const client = useRef<Client | null>(null);
  const [pendingPayload, setPendingPayload] =
    useState<MatchingStartRequestDto | null>(null);

  useEffect(() => {
    client.current = new Client({
      brokerURL: "ws://localhost/tarotbom/ws-stomp",
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);
        client.current?.subscribe(
          `/sub/matching/status/${userInfo?.memberId}`,
          (message: IMessage) => {
            const match: ResponseData = JSON.parse(message.body);
            console.log("Match found:", match);
            setMatchData(match.data);
            setMatchFound(true);

            if (match.code === "M02") {
              console.log("매칭확인");
              setMatchLoading(false);
              setShowConfirmation(true);
            }

            if (match.code === "M05") {
              console.log("상대방 매칭 확인 대기");
              setShowConfirmation(false);
              // setConfirm(true);
            }

            if (match.code === "M08") {
              // match.data를 JSON 문자열로 직렬화
              const jsonString = JSON.stringify(match.data);

              // JSON 문자열을 객체로 역직렬화하여 token 값을 추출
              const parsedData = JSON.parse(jsonString);
              const token = parsedData.token;

              // TODO: 여기서? 아님 리더 쪽에서? 리더 아이디 넘겨줘야 결과창에서 받아서 저장함

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
  }, [userInfo?.memberId, navigate]);

  // 방 입장 메서드
  //TODO : 경준형님 토큰: token, nickname : member, type: CAM인지 GFX인지 일단 하드코딩 주말 수정 예정
  const enterRoom = (token: string) => {
    const memberName = userInfo?.nickname ?? "Unknown";
    console.log(memberName, token);

    // 방 입장 URL을 위한 데이터 준비
    const roomEntryPath = `/rtcTest?token=${encodeURIComponent(
      token
    )}&name=${encodeURIComponent(memberName)}&type=${encodeURIComponent(
      roomStyle
    )}`;

    // 라우터를 통해 방으로 이동
    navigate(roomEntryPath);
  };

  const handleButtonClick = (label: string) => {
    if (label === "AI리더" || label === "리더매칭") {
      setSelectReader(label);
      setSelected(true);
    } else {
      setShowSecondInput(true);
      setSelectedLabel(label);
    }
  };

  // 캠 or 그래픽
  const tarotTypeButtonClicke = (label: string) => {
    if (label === "캠으로 보기") {
      setRoomStyle("CAM");
    } else {
      setRoomStyle("GFX");
    }
  };

  const submit = () => {
    if (worryArea.current) {
      if (worryArea.current.value === "") {
        alert("고민을 입력해 주세요.");
        return;
      }

      console.log("키워드 : ", selectedLabel);

      const memberId = userInfo?.memberId ?? 0;

      let keywords = "null";

      if (selectedLabel === "연애운") {
        keywords = "G01";
      } else if (selectedLabel === "진로운") {
        keywords = "G02";
      } else if (selectedLabel === "재물운") {
        keywords = "G03";
      } else if (selectedLabel === "건강운") {
        keywords = "G04";
      } else if (selectedLabel === "가족운") {
        keywords = "G06";
      } else {
        keywords = "G05";
      }

      setKeyword(keywords); // 상태 업데이트

      const payload: MatchingStartRequestDto = {
        keyword: keywords,
        roomStyle,
        memberType,
        memberId,
        worry: worryArea.current.value,
      };

      setPendingPayload(payload);

      if (selectReader === "AI리더") {
        navigate(`/online/graphic`, {
          state: { payload, readerType: "AI" },
        });
      } else if (selectReader === "리더매칭") {
        if (connected && client.current) {
          setMatchLoading(true);
          client.current.publish({
            destination: "/pub/matching/start",
            body: JSON.stringify(payload),
          });
          console.log("Request sent:", payload);
        } else {
          console.error("STOMP client is not connected");
        }
      }
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

    // 상태 초기화
    setMatchLoading(false);
    setSelected(false);
    setSelectReader(null);
    setSelectedLabel(null);
    setShowSecondInput(false);
    setMatchFound(false);
    setMatchData(null);
    setConnected(false);
    setPendingPayload(null);
    console.log("Matching cancelled");
  };

  const buttonLabels: string[] = [
    "연애운",
    "직장운",
    "재물운",
    "건강운",
    "가족운",
    "기타",
  ];

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleMatchConfirmed = (data: MatchData) => {
    if (connected && client.current) {
      // 상태를 'accepted'로 설정
      const confirmationPayload = {
        ...data, // 기존의 myDto와 candidateDto는 그대로 유지
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
    setSelected(false);
    setSelectReader(null);
    setSelectedLabel(null);
    setShowSecondInput(false);
    setMatchFound(false);
    setMatchData(null);
    setPendingPayload(null);
  };

  return (
    <div className="bg-white w-[700px] h-[600px] -mt-20 flex items-center justify-center rounded-md fade-in">
      <LoadingModal isOpen={matchLoading} onCancel={handleCancelMatching} />
      <MatchingConfirmationModal
        isOpen={showConfirmation}
        matchData={matchData}
        onClose={handleCloseConfirmation}
        onMatchConfirmed={handleMatchConfirmed} // 콜백 함수 전달
      />

      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-4 mb-5">
          {!selected && (
            <>
              <HoverButton
                label="리더매칭"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={() => handleButtonClick("리더매칭")}
              />
              <HoverButton
                label="AI리더"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={() => handleButtonClick("AI리더")}
              />
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">{selectReader}</h2>

        {selectedLabel && (
          <h3 className="text-xl font-semibold mb-4" id="category">
            선택된 카테고리: {selectedLabel}
          </h3>
        )}

        {selected && (
          <div className="flex flex-wrap justify-center mt-5">
            {buttonLabels.map((label) => (
              <div key={label} className="m-2">
                <HoverButton
                  label={label}
                  color="bg-gray-300"
                  hoverColor="bg-gray-500"
                  hsize="h-12"
                  wsize="w-48"
                  fontsize="text-lg"
                  onClick={() => handleButtonClick(label)}
                />
              </div>
            ))}
          </div>
        )}

        {showSecondInput && (
          <div className="mt-5 text-center">
            <div className="flex flex-row gap-4 justify-center m-4">
              <div>
                <h1 className="text-gray-700 font-bold">{roomStyle}</h1>
              </div>
              <HoverButton
                label="캠으로 보기"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={() => tarotTypeButtonClicke("캠으로 보기")}
              />
              <HoverButton
                label="그래픽으로 보기"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={() => tarotTypeButtonClicke("그래픽으로 보기")}
              />
            </div>
            <textarea
              placeholder="고민을 입력해주세요"
              className="border border-gray-300 rounded-lg p-3 w-full h-28 resize-none mb-3"
              rows={5}
              ref={worryArea}
              required
            />
            <HoverButton
              label="시작하기"
              color="bg-gray-300"
              hoverColor="bg-gray-500"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
              onClick={submit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomMatching;
