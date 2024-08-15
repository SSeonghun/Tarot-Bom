import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal"; // 모달 라이브러리 임포트
import { Link, useNavigate } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import PrivateLink from "./Common/PrivateLink";
import useStore from "../stores/store";
import Icon from "../assets/img/NavIcon-removebg-preview.png";
import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";

const { logout } = require("../API/userApi");

interface Notification {
  noId: number;
  memberId: number;
  noType: string;
  content: string;
  read: boolean;
  valid: boolean;
  createTime: string;
}

Modal.setAppElement("#root"); // 모달이 포커스를 잃지 않도록 설정

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
  const [notificationList, setNotificationList] = useState<Notification[]>([]); // 알림 상태
  const [connected, setConnected] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태

  const userInfo = store.userInfo;
  const client = useRef<Client | null>(null);

  const reservationInfo = useStore((state) => state.reservationInfo); // reservationInfo 상태 가져오기

  useEffect(() => {
    // reservationInfo가 정의되고, memberId와 time이 유효한 경우에만 호출
    if (reservationInfo && reservationInfo.memberId && reservationInfo.time) {
      console.log("Reservation Info has changed:", reservationInfo);
      handleSendNotification(reservationInfo.memberId, reservationInfo.time);
    }
  }, [reservationInfo]); // reservationInfo가 변경될 때마다 실행

  const handleLogout = async () => {
    console.log("로그아웃 요청");
    try {
      const result = await logout();
      console.log("로그아웃 성공", result);
      store.logoutUser();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생", error);
    }
  };

  // 드롭다운 열기/닫기 함수
  const toggleDropdown = () => {
    console.log("드롭다운 토글");
    setDropdownOpen((prev) => !prev);
  };

  // 알림 모달 열기
  const openNotificationModal = async () => {
    console.log("알림 모달 열기");
    setModalIsOpen(true);

    // 모달이 열릴 때 전체 알림 목록을 가져오는 요청
    if (userInfo?.memberId && connected) {
      console.log("전체 알림 목록 요청");
      client.current?.publish({
        destination: `/pub/notification/get/${userInfo.memberId}`,
        body: JSON.stringify({}),
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownOpen && !target.closest(".dropdown")) {
        console.log("드롭다운 닫기");
        setDropdownOpen(false);
      }
    };

    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    client.current = new Client({
      brokerURL: "ws://localhost/tarotbom/ws-stomp",
      onConnect: () => {
        console.log("WebSocket 연결됨");
        setConnected(true);

        if (userInfo?.memberId) {
          console.log(`구독 시작: /sub/notification/${userInfo.memberId}`);
          client.current?.subscribe(
            `/sub/notification/${userInfo.memberId}`,
            (message: IMessage) => {
              const notification = JSON.parse(message.body);
              // console.log("알림", notification.data[0].content);

              if (notification.code === "N01") {
              }

              if (notification.code === "N02") {
                // N02 코드 수신 시 알림 추가 및 모달 열기
                console.log("새 알림 도착");
                const newNotification = notification.data as Notification; // 단일 알림 객체로 처리
                console.log(newNotification);
                setNotificationList((prevList) => [
                  newNotification,
                  ...prevList,
                ]);
                // setModalIsOpen(true); // 알림 수신 시 모달 열기
              } else if (notification.code === "N03") {
                // N03 코드 수신 시 전체 알림 목록 요청
                console.log("전체 알림 목록 다시 요청");
                const allNotifications = notification.data as Notification[];
                setNotificationList((prevList) => [...allNotifications]);
              }
            }
          );

          // WebSocket 연결이 완료된 후 전체 알림 목록 요청
          console.log("전체 알림 목록 요청");
          client.current?.publish({
            destination: `/pub/notification/get/${userInfo.memberId}`,
            body: JSON.stringify({}),
          });
        }
      },
      onStompError: (frame) => {
        console.error("STOMP 에러 발생: " + frame.headers["message"]);
        console.error("추가 세부 사항: " + frame.body);
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [userInfo?.memberId]);

  const handleSendNotification = (memberId: number, time: string) => {
    console.log("예약 알림 전송");
    if (client.current && connected) {
      console.log("진짜전송? ", typeof memberId, time);
      (client.current as Client).publish({
        destination: "/pub/notification/notify",
        body: JSON.stringify({
          memberId: memberId,
          noType: "N01",
          content: formatDate(time),
        }),
      });
    } else {
      console.log("STOMP client is not connected");
    }
  };

  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식
      timeZone: "Asia/Seoul", // 서울 시간대 설정
    };

    const formatter = new Intl.DateTimeFormat("ko-KR", options);
    const parts = formatter.formatToParts(date);

    const year = parts.find((part) => part.type === "year")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const day = parts.find((part) => part.type === "day")?.value ?? "";
    const hour = parts.find((part) => part.type === "hour")?.value ?? "";
    const minute = parts.find((part) => part.type === "minute")?.value ?? "";

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분에 예약이 들어왔습니다!`;
  };

  // 알림 읽음 처리
  const markAsRead = (noId: number) => {
    console.log(`알림 읽음 처리: ${noId}`);
    client.current?.publish({
      destination: "/pub/notification/update",
      body: JSON.stringify({
        noId,
        memberId: userInfo?.memberId,
        read: true,
        valid: false,
      }),
    });

    setNotificationList((prevList) =>
      prevList.map((notif) =>
        notif.noId === noId ? { ...notif, read: true } : notif
      )
    );
  };

  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 w-full z-40 pointer-events-none">
      <div className="container flex items-center justify-between mx-auto ">
        <div className="font-bold text-white pointer-events-auto">
          <Link
            to="/"
            className="text-white hover:text-gray-400 flex flex-row justify-center items-center"
          >
            <img src={Icon} alt="" className="w-[70px] -rotate-12" />
            <h1
              className="text-[18px] font-bold"
              style={{
                background: "linear-gradient(to right, #7af0e5, #ce67f7)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              타로 : 봄
            </h1>
          </Link>
        </div>
        <div className="space-x-4 flex items-center justify-center pointer-events-auto">
          <PrivateLink to="/online">타로보기</PrivateLink>
          <PrivateLink to="/search-reader">예약하기</PrivateLink>
          <PrivateLink to="/community">커뮤니티</PrivateLink>

          {store.isLoggedIn ? (
            <div className="relative inline-block text-left dropdown ">
              <button onClick={toggleDropdown} className="focus:outline-none ">
                <img
                  src={userInfo?.profileImg}
                  alt="마이페이지"
                  style={{ width: "40px", height: "40px" }}
                  className="cursor-pointer rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-gray-300 rounded-md shadow-lg">
                  <div className="flex items-center px-3 py-3 justify-center">
                    <div className="mr-2">
                      <img
                        src={userInfo?.profileImg}
                        alt="마이페이지"
                        style={{ width: "40px", height: "40px" }}
                        className="cursor-pointer rounded-full mr-3"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="block text-xs text-gray-900 dark:text-white">
                        {userInfo?.nickname}
                      </span>
                      <span className="block text-xs text-gray-500 truncate dark:text-gray-400">
                        {userInfo?.email}
                      </span>
                    </div>
                  </div>
                  <hr className="border-black"></hr>
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/seeker-mypage"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                      내 정보
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link to="/login">
                <h1 className="text-white">로그인</h1>
              </Link>
            </div>
          )}

          {/* 알림 모달 */}
          {store.isLoggedIn && (
            <div className="relative inline-block text-left">
              <button
                onClick={openNotificationModal}
                className="relative focus:outline-none"
              >
                <span className="absolute -top-[5px] -right-[5px] -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {notificationList.filter((notif) => !notif.read).length}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405C17.79 14.79 17 13.42 17 12V8a5 5 0 00-4-4.9V3a1 1 0 10-2 0v.1A5 5 0 007 8v4c0 1.42-.79 2.79-2.595 3.595L3 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* 알림 목록을 표시하는 모달 */}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Notification Modal"
                className="fixed inset-0 flex items-center justify-center z-[9999]" // 모달의 z-index를 높게 설정
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]" // 오버레이의 z-index를 모달보다 낮게 설정
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-[400px]"
                  style={{ zIndex: 999, position: "relative" }}
                >
                  <h2 className="text-2xl font-semibold mb-4">알림 목록</h2>
                  <div className="divide-y divide-gray-200 h-[300px] overflow-y-scroll">
                    {notificationList.length === 0 ? (
                      <p className="text-center text-gray-600">
                        새로운 알림이 없습니다.
                      </p>
                    ) : (
                      notificationList.map((notif) => (
                        <div
                          key={notif.noId}
                          className={`py-2 ${
                            notif.read ? "bg-gray-200" : "bg-white"
                          }`}
                        >
                          <p>{notif.createTime}</p>
                          <p className="text-sm">{notif.content}</p>
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.noId)}
                              className="text-xs text-blue-500 hover:underline"
                            >
                              읽음으로 표시
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
