import React, { useState, useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import HoverButton from "../Common/HoverButton";
import LoadingModal from "../Common/MatchingLoading";
import MatchingConfirmationModal from "../Common/MatchingReady"; // 매칭 확인 모달
import useStore from "../../stores/store";
import ReaderItem from "./Readeritems/ReaderItem";
import ReaderBg from "../../assets/img/readermypage.png";
import Profile from "../../assets/img/profile2.png";

const ReaderMypage: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [socketMessage, setSocketMessage] = useState<string | null>(null);
  const [matchLoading, setMatchLoading] = useState<boolean>(false); // 로딩 상태 추가
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // 매칭 확인 모달 상태 추가
  const [pendingPayload, setPendingPayload] = useState<any>(null); // 매칭 요청 페이로드 상태 추가

  const client = useRef<Client | null>(null);

  const { userInfo } = useStore();
  const memberId = userInfo?.memberId ?? 0;

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
              const receivedMessage = JSON.parse(message.body);
              console.log("Received message:", receivedMessage);
              setSocketMessage(receivedMessage);

              if (receivedMessage.code === "M02") {
                setMatchLoading(false);
                setShowConfirmation(true); // 매칭 확인 모달 열기
              }
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

  useEffect(() => {
    if (socketMessage) {
      console.log("Socket message updated:", socketMessage);
    }
  }, [socketMessage]);

  const handleRandomMatching = () => {
    if (connected && client.current) {
      const payload = {
        keyword: "G01",
        roomStyle: "CAM",
        memberType: "reader",
        memberId,
        worry: "Sample worry",
      };

      setPendingPayload(payload); // 페이로드를 상태로 저장

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
        ...pendingPayload, // 기존 페이로드를 그대로 포함
        cancelReason: "User canceled the matching process", // 취소 이유
      };

      client.current.publish({
        destination: "/pub/matching/cancel",
        body: JSON.stringify(cancelPayload),
      });

      console.log("Matching cancel request sent:", cancelPayload);
    }

    setMatchLoading(false);
    setShowConfirmation(false);
    setSocketMessage(null);
    setConnected(false);
    setPendingPayload(null); // 페이로드 상태 초기화
    console.log("Matching cancelled");
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false); // 매칭 확인 모달 닫기
  };

  return (
    <div className="relative w-screen h-screen">
      <LoadingModal isOpen={matchLoading} onCancel={handleCancelMatching} />
      <MatchingConfirmationModal
        isOpen={showConfirmation}
        matchData={socketMessage}
        onClose={handleCloseConfirmation}
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
          <HoverButton
            label="매칭 취소"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
            onClick={handleCancelMatching}
          />
        </div>
      </div>

      <div className="relative h-fit bg-black z-30">
        <div className="h-fit bg-white mx-[100px] relative flex flex-col -top-[450px] rounded-xl bg-opacity-55">
          <ReaderItem />
        </div>
      </div>
    </div>
  );
};

export default ReaderMypage;
