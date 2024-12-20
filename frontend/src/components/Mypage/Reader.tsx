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
import MatchingReady from "../Common/MatchingReady";
import Create from "../../assets/img/create.webp";
import Change from "../../assets/img/change.webp";
import Modify from "../../assets/img/modify.webp";
import Toggle from "../Common/Toggle";

const { readerMypage } = require("../../API/userApi");
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
interface MatchingStartRequestDto {
    keyword: string;
    roomStyle: string;
    memberType: string;
    memberId: number;
    candidateId: string;
    worry: string;
}

interface ResponseData {
    code: string;
    data: MatchData;
    message: string;
}

const ReaderMypage: React.FC = () => {
    const store = useStore();
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
    const [data, setData] = useState<any>("");
    const [connected, setConnected] = useState<boolean>(false);
    const [matchLoading, setMatchLoading] = useState<boolean>(false); // 로딩 상태
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // 매칭 확인 모달 상태
    const [pendingPayload, setPendingPayload] = useState<any>(null); // 매칭 요청 페이로드
    const [matchData, setMatchData] = useState<MatchData | null>(null);
    const [confirm, setConfirm] = useState<boolean>(false);

    const [selectedKeyword, setSelectedKeyword] = useState<string>(""); // 선택된 키워드
    const [selectedRoomStyle, setSelectedRoomStyle] = useState<string>(""); // 선택된 방 스타일 (기본값은 CAM)

    const client = useRef<Client | null>(null);
    const { userInfo } = useStore();
    const memberId = userInfo?.memberId ?? 0;
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

    useEffect(() => {}, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await readerMypage();
                await setData(response.data);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        client.current = new Client({
            brokerURL: process.env.REACT_APP_WEB_STOMP,
            onConnect: () => {
                console.log("Connected to WebSocket");
                setConnected(true);

                if (memberId) {
                    client.current?.subscribe(
                        `/sub/matching/status/${memberId}`,
                        (message: IMessage) => {
                            const receivedMessage: ResponseData = JSON.parse(
                                message.body
                            );
                            console.log("Received message:", receivedMessage);
                            setMatchData(receivedMessage.data);

                            if (receivedMessage.code === "M02") {
                                console.log("M02");
                                setMatchLoading(false);
                                setShowConfirmation(true); // 매칭 확인 모달 열기
                            }

                            if (receivedMessage.code === "M05") {
                                console.log("M05");
                                setShowConfirmation(false);
                                setConfirm(true);
                            }

                            if (receivedMessage.code === "M08") {
                                console.log("M08");
                                // match.data를 JSON 문자열로 직렬화
                                const jsonString = JSON.stringify(
                                    receivedMessage.data
                                );

                                // JSON 문자열을 객체로 역직렬화하여 token 값을 추출
                                const parsedData = JSON.parse(jsonString);
                                const token = parsedData.roomId;
                                const keyword = parsedData.keyword;
                                const roomStyle = parsedData.roomStyle;
                                const worry = parsedData.worry;
                                const candidateId = parsedData.candidateId;

                                // token 값을 사용
                                console.log(parsedData);
                                enterRoom(
                                    token,
                                    roomStyle,
                                    keyword,
                                    worry,
                                    candidateId
                                );

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
                console.error(
                    "Broker reported error: " + frame.headers["message"]
                );
                console.error("Additional details: " + frame.body);
            },
        });

        client.current.activate();

        return () => {
            client.current?.deactivate();
        };
    }, [memberId]);

    useEffect(() => {
        console.log("roomStyle : ", selectedRoomStyle);
    }, [selectedRoomStyle]); // 이 훅은 selectedRoomStyle이 변경될 때만 실행

    // 방 입장 메서드
    //TODO : 경준형님 토큰: token, nickname : member, type: CAM인지 GFX인지 일단 하드코딩 주말 수정 예정
    const enterRoom = (
        token: string,
        roomStyle: string,
        keyword: string,
        worry: string,
        cadidateId: string
    ) => {
        const payload: MatchingStartRequestDto = {
            keyword: keyword,
            roomStyle: roomStyle,
            candidateId: cadidateId,
            memberType: "reader",
            memberId,
            worry: worry, // worry가 null인 경우 빈 문자열을 기본값으로 사용
        };
        const memberName = userInfo?.nickname ?? "Unknown";
        console.log(memberName, token, roomStyle);
        if (roomStyle === "GFX") {
            const roomEntryPath = `/RTCGFX?token=${encodeURIComponent(
                token
            )}&name=${encodeURIComponent(memberName)}&type=${encodeURIComponent(
                roomStyle
            )}&position=Reader`;

            // 라우터를 통해 방으로 이동
            navigate(roomEntryPath, {
                state: { readerType: "Reader", payload: payload },
            });
        } else {
            // 방 입장 URL을 위한 데이터 준비
            const roomEntryPath = `/RTCCAM?token=${encodeURIComponent(
                token
            )}&name=${encodeURIComponent(memberName)}&type=${encodeURIComponent(
                roomStyle
            )}&position=Reader`;

            // 라우터를 통해 방으로 이동
            navigate(roomEntryPath, {
                state: { readerType: "Reader", payload: payload },
            });
        }
    };

    const handleMatchingSelection = (
        selectedCategory: string | null,
        selectedMethod: string | null
    ) => {
        console.log("Parent - 선택된 카테고리:", selectedCategory);
        console.log("Parent - 선택된 리딩 방법:", selectedMethod);
        // 이 데이터를 이용해 추가 작업을 수행할 수 있습니다.

        if (selectedMethod != null) {
            setSelectedRoomStyle(selectedMethod);
        }
        // null값 처리
        if (selectedCategory != null) {
            setSelectedKeyword(selectedCategory);
        }
        handleRandomMatching(selectedCategory, selectedMethod);
    };

    const handleRandomMatching = (
        keyword: string | null,
        roomStyle: string | null
    ) => {
        if (connected && client.current) {
            const payload = {
                keyword: keyword,
                roomStyle: roomStyle,
                memberType: "reader",
                memberId,
                worry: "I am reader",
            };

            setPendingPayload(payload); // 페이로드 상태 저장
            setMatchLoading(true); // 매칭 요청 시 로딩 시작
            console.log("보내는 정보 : ", payload);

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
            console.log(
                "Matching confirmation request sent:",
                confirmationPayload
            );
        }

        // 매칭 확인 후 상태 업데이트
        setMatchLoading(false);
        setShowConfirmation(false);
        setPendingPayload(null);
    };

    const handleKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedKeyword(event.target.value);
    };

    const handleRoomStyleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedRoomStyle(event.target.value);
    };

    return (
        <div className="relative w-screen h-screen bg-black">
            <LoadingModal
                isOpen={matchLoading}
                onCancel={handleCancelMatching}
            />
            <MatchingConfirmationModal
                isOpen={showConfirmation}
                matchData={matchData}
                onClose={handleCloseConfirmation}
                onMatchConfirmed={handleMatchConfirmed}
            />

            <MatchingReady
                isOpen={confirm}
                matchData={matchData}
                onClose={handleCloseConfirmation}
            ></MatchingReady>

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
                    <img
                        src={store.userInfo?.profileImg}
                        alt="Profile"
                        className="w-32 h-32 rounded-full"
                    />
                </div>
                <div className="flex flex-col justify-center absolute top-[180px] items-center">
                    <h1 className="text-white text-[40px] font-bold mt-5">
                        {data.name}
                    </h1>
                    <div className="flex flex-row justify-center items-center">
                        <Toggle initialProfile={true} />
                        <h3 className="text-white">TAROT READER</h3>
                    </div>
                </div>
            </div>

            <div className="relative h-fit bg-black z-30 ">
                <div className="h-fit bg-white mx-[100px] relative flex flex-col -top-[450px] rounded-xl bg-opacity-55">
                    <ReaderItem
                        data={data}
                        onMatchingSelection={handleMatchingSelection}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReaderMypage;
