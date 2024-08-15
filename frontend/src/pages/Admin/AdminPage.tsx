import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "react-modal";
import { Client, IMessage } from "@stomp/stompjs";
const { getReport } = require("../../API/adminApi");

// Modal 설정
Modal.setAppElement("#root");

const AdminPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [notification, setNotification] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const client = useRef<Client | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReport();
        if (Array.isArray(response)) {
          setReports(response);
        } else if (response && Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          setError("잘못된 데이터 형식입니다.");
        }
      } catch (error) {
        console.error(error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    client.current = new Client({
      brokerURL: process.env.REACT_APP_WEB_STOMP,
      onConnect: () => {
        console.log("WebSocket 연결됨");
        setConnected(true);
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
  }, []);

  const openModal = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
    setNotification("");
    setDeleteError(null);
  };

  const handleSendNotification = useCallback(() => {
    if (selectedReport && client.current && connected) {
      console.log("알림 전송:", notification);
      client.current.publish({
        destination: "/pub/notification/notify",
        body: JSON.stringify({
          memberId: selectedReport.reportedId, // 예시로 설정
          noType: "N01", // 예시로 설정
          content: notification,
        }),
      });
      setNotification("");
    }
  }, [selectedReport, notification, connected]);

  const handleDeleteMember = async () => {
    if (selectedReport) {
      try {
        // await deleteMember(selectedReport.reporterId); // 가정: deleteMember API 호출
        setReports(
          reports.filter(
            (report) => report.reportId !== selectedReport.reportId
          )
        );
        closeModal();
      } catch (error) {
        console.error("멤버 삭제 오류:", error);
        setDeleteError("멤버 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold text-white mt-[100px] mb-8">
        관리자 페이지 (신고내역)
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-white border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-700 p-4">Report ID</th>
              <th className="border-b border-gray-700 p-4">Content</th>
              <th className="border-b border-gray-700 p-4">Create Time</th>
              <th className="border-b border-gray-700 p-4">Report Type</th>
              <th className="border-b border-gray-700 p-4">Reported ID</th>
              <th className="border-b border-gray-700 p-4">Reporter ID</th>
              <th className="border-b border-gray-700 p-4">Status</th>
              <th className="border-b border-gray-700 p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.reportId} className="hover:bg-gray-800">
                <td className="border-b border-gray-800 p-4">
                  {report.reportId}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.content}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.createTime}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.reportType}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.reportedId}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.reporterId}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.status}
                </td>
                <td className="border-b border-gray-800 p-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => openModal(report)}
                  >
                    상세 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 알림 모달 */}
      {selectedReport && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Notification Modal"
          className="fixed inset-0 flex items-center justify-center z-[9999]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-[400px]"
            style={{ zIndex: 999, position: "relative" }}
          >
            <h2 className="text-xl font-bold mb-4">Report Details</h2>
            <p>
              <strong>Report ID:</strong> {selectedReport.reportId}
            </p>
            <p>
              <strong>Content:</strong> {selectedReport.content}
            </p>
            <p>
              <strong>Create Time:</strong> {selectedReport.createTime}
            </p>
            <p>
              <strong>Report Type:</strong> {selectedReport.reportType}
            </p>
            <p>
              <strong className="text-red-400">Reported ID:</strong>{" "}
              {selectedReport.reportedId}
            </p>
            <p>
              <strong>Reporter ID:</strong> {selectedReport.reporterId}
            </p>
            <p>
              <strong>Status:</strong> {selectedReport.status}
            </p>

            <div className="mt-4">
              <textarea
                className="w-full border-gray-300 rounded p-2 border border-black"
                rows={4}
                placeholder="알림 내용을 입력하세요..."
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSendNotification}
              >
                알림 전송
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="mt-4">
                {deleteError && (
                  <p className="text-red-500 mt-2">{deleteError}</p>
                )}
              </div>
              <button
                className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
