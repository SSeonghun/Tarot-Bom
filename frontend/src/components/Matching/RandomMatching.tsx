import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";

// 컴포넌트
import HoverButton from "../Common/HoverButton";
import LoadingModal from "../Common/MatchingLoading";
import MatchingConfirmationModal from "../Common/MatchingReady"; // 추가된 모달
// css
import "../../assets/css/FadeInOut.css";

// Zustand 스토어 import
import useStore from "../../stores/store";

interface MatchData {
  selectReader: string;
  selectedLabel: string;
  worry: string;
  code?: string; // code 추가
  requestPayload?: MatchingStartRequestDto; // 매칭 요청 페이로드 추가
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
  const [matchLoading, setMatchLoading] = useState<boolean>(false); // 로딩 상태 추가
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // 매칭 확인 모달 상태 추가

  const [keyword, setKeyword] = useState<string>("G01");
  const [roomStyle, setRoomStyle] = useState<string>("CAM");
  const [memberType, setMemberType] = useState<string>("seeker");
  const worryArea = useRef<HTMLTextAreaElement | null>(null);

  // Zustand 스토어에서 필요한 값 가져오기
  const { userInfo } = useStore();

  const navigate = useNavigate();
  const client = useRef<Client | null>(null);
  const [pendingPayload, setPendingPayload] =
    useState<MatchingStartRequestDto | null>(null); // pendingPayload 상태 추가

  useEffect(() => {
    client.current = new Client({
      brokerURL: "ws://localhost/tarotbom/ws-stomp", // 서버의 WebSocket 엔드포인트로 변경
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true); // 연결 상태 업데이트
        client.current?.subscribe(
          `/sub/matching/status/${userInfo?.memberId}`,
          (message: IMessage) => {
            const match: MatchData = JSON.parse(message.body);
            console.log("Match found:", match);
            setMatchData(match);
            setMatchFound(true);

            if (match.code === "M02") {
              setMatchLoading(false);
              setShowConfirmation(true); // 매칭 확인 모달 열기
            }
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

  const handleButtonClick = (label: string) => {
    if (label === "AI리더" || label === "리더매칭") {
      setSelectReader(label);
      setSelected(true);
    } else {
      setShowSecondInput(true);
      setSelectedLabel(label);
    }
  };

  const submit = () => {
    if (worryArea.current) {
      if (worryArea.current.value === "") {
        alert("고민을 입력해 주세요.");
        return;
      }

      console.log("키워드 : ", selectedLabel);

      const memberId = userInfo?.memberId ?? 0; // Zustand 스토어에서 memberId 가져오기, 기본값 0

      if (selectedLabel === "연애운") {
        setKeyword("G01");
      } else if (selectedLabel === "진로운") {
        setKeyword("G02");
      } else if (selectedLabel === "재물운") {
        setKeyword("G03");
      } else if (selectedLabel === "건강운") {
        setKeyword("G04");
      } else if (selectedLabel === "가족운") {
        setKeyword("G06");
      } else {
        setKeyword("G05");
      }

      const payload: MatchingStartRequestDto = {
        keyword,
        roomStyle,
        memberType,
        memberId,
        worry: worryArea.current.value,
      };

      setPendingPayload(payload); // 페이로드를 상태로 저장

      if (selectReader === "AI리더") {
        navigate(`/online/graphic`, {
          state: payload,
        });
      } else if (selectReader === "리더매칭") {
        if (connected && client.current) {
          setMatchLoading(true); // 매칭 요청 시 로딩 시작
          client.current.publish({
            destination: "/pub/matching/start",
            body: JSON.stringify(payload),
          });
          console.log("Request sent:", payload); // 요청한 내용을 콘솔에 출력
        } else {
          console.error("STOMP client is not connected");
        }
      }
    }
  };

  const handleCancelMatching = () => {
    if (connected && client.current && pendingPayload) {
      const cancelPayload = {
        ...pendingPayload, // 기존 페이로드를 그대로 포함
        cancelReason: "User canceled the matching process", // 취소 이유
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
    setPendingPayload(null); // 페이로드 상태 초기화
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
    setShowConfirmation(false); // 매칭 확인 모달 닫기
  };

  return (
    <div className="bg-white w-[700px] h-[500px] -mt-20 flex items-center justify-center rounded-md fade-in">
      <LoadingModal isOpen={matchLoading} onCancel={handleCancelMatching} />
      <MatchingConfirmationModal
        isOpen={showConfirmation}
        matchData={matchData}
        onClose={handleCloseConfirmation}
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
            <input
              type="text"
              placeholder="Room Style"
              value={roomStyle}
              onChange={(e) => setRoomStyle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full mb-3"
            />
            <textarea
              placeholder="고민"
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
