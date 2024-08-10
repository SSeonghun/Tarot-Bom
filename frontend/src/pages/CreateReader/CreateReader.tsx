import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const { readerJoin } = require("../../API/api");
//  : axios로 서버 저장
const CreateReader: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState<string>("");
  const interests = ["연애운", "금전운", "취업운", "가족운", "기타"];
  const interestscode = ["G01", "G02", "G03", "G04", "G05"];

  //TODO: 키워드가 안들어감
  const handleaxios = () => {
    const selectedCodes = selectedInterests
      .map((interest) => {
        const index = interests.indexOf(interest);
        return index !== -1 ? interestscode[index] : "";
      })
      .filter((code) => code)
      .join(","); // 빈 코드 제거
    console.log(selectedCodes);
    // 서버에 데이터 전송
    readerJoin(selectedCodes, introduction);
    navigate("/");
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* 단계 표시기 */}
        <div className="flex justify-between mb-6">
          <div
            className={`flex-1 h-2 ${
              step >= 1 ? "bg-blue-500" : "bg-gray-300"
            } mx-1 rounded`}
          ></div>
          <div
            className={`flex-1 h-2 ${
              step >= 2 ? "bg-blue-500" : "bg-gray-300"
            } mx-1 rounded`}
          ></div>
          <div
            className={`flex-1 h-2 ${
              step >= 3 ? "bg-blue-500" : "bg-gray-300"
            } mx-1 rounded`}
          ></div>
        </div>

        {step === 1 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">유의사항</h2>
            <p className="mb-4">
              여기에 유의사항 내용을 적습니다. 유의사항 내용을 자세히 읽고
              동의해주세요.
            </p>
            <div className="flex items-center mb-6">
              <input
                id="terms"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-700">
                위 내용을 확인하였습니다.
              </label>
            </div>
            <div className="flex justify-between w-full">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-600 transition-colors duration-300"
                disabled={step === 1}
              >
                이전
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
                disabled={!isChecked}
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">정보 입력</h2>
            <div className="mb-6 w-full">
              <h3 className="text-lg font-semibold mb-2">관심분야</h3>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ${
                      selectedInterests.includes(interest)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 w-full">
              <h3 className="text-lg font-semibold mb-2">자기소개</h3>
              <textarea
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="자기소개를 작성해주세요"
              />
            </div>
            <div className="flex justify-between w-full">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-600 transition-colors duration-300"
              >
                이전
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
              >
                다음
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">인증 완료</h2>
            {/* 여기에 인증 완료 메시지를 추가합니다 */}
            <div className="flex justify-between w-full">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-600 transition-colors duration-300"
              >
                이전
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={handleaxios}
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateReader;
