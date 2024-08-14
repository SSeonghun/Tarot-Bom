import React, { useState, useEffect } from "react";

const { getReport } = require("../../API/adminApi");

const AdminPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold text-white mt-[100px] mb-8">
        관리자 페이지
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-white border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-700 p-4">Report ID</th>
              <th className="border-b border-gray-700 p-4">Content</th>
              <th className="border-b border-gray-700 p-4">Create Time</th>
              <th className="border-b border-gray-700 p-4">Report Type</th>
              <th className="border-b border-gray-700 p-4">Reader ID</th>
              <th className="border-b border-gray-700 p-4">Reporter ID</th>
              <th className="border-b border-gray-700 p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-800">
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
                  {report.readerId}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.reporterId}
                </td>
                <td className="border-b border-gray-800 p-4">
                  {report.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
