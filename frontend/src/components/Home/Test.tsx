import React, { useState, useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";

// STOMP 클라이언트 컴포넌트
const StompTestComponent: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [sendingNotification, setSendingNotification] = useState<string>("");

  // 사용자가 입력한 알림 메시지
  const [notificationContent, setNotificationContent] = useState<string>("");

  // STOMP 클라이언트 생성 및 연결
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost/tarotbom/ws-stomp", // 웹소켓 서버 URL

      onConnect: () => {
        console.log("Connected to STOMP server");
        setConnected(true);

        // 알림 구독
        stompClient.subscribe("/sub/notification/61", (message: IMessage) => {
          const notification = JSON.parse(message.body);
          console.log("Received notification:", notification);
          setNotifications((prev) => [...prev, notification]);
        });

        setClient(stompClient);
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // 알림 보내기 함수
  const handleSendNotification = () => {
    if (!client || !connected) {
      console.log("STOMP client is not connected");
      return;
    }

    setSendingNotification("Sending...");

    client.publish({
      destination: "/pub/notification/notify/1",
      body: JSON.stringify({
        memberId: 61,
        noType: "N01",
        content: notificationContent,
      }),
    });

    // 성공적으로 발송한 후 상태 업데이트
    setSendingNotification("Notification sent");
    setNotificationContent(""); // 입력 필드 초기화
  };

  return (
    <div>
      <h1>STOMP Test Component</h1>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>

      <div>
        <h2>Send Notification</h2>
        <textarea
          value={notificationContent}
          onChange={(e) => setNotificationContent(e.target.value)}
          placeholder="Enter notification content"
          rows={4}
          cols={50}
        />
        <button
          onClick={handleSendNotification}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send Notification
        </button>
        <p>{sendingNotification}</p>
      </div>

      <div>
        <h2>Notifications:</h2>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              <strong>Content:</strong> {notif.data.content}
              <br />
              <strong>Received At:</strong>{" "}
              {new Date(notif.data.createTime).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StompTestComponent;
