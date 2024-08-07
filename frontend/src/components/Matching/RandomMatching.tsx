import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import HoverButton from "../Common/HoverButton";
// css
import "../../assets/css/FadeInOut.css"; // CSS 파일을 가져옴

const RandomMatching: React.FC = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [selectReader, setSelectReader] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
  const worryArea = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();

  /*
   카테고리 설정 버튼 함수
   이 함수가 실행되면 고민 설정 부분이 나타남
   */
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
        // TODO: 고민을 입력하지 않으면 경고를 띄우기
        alert("고민을 입력해 주세요.");
        return;
      }

      // 정상 접근
      console.log("리더 유형: " + selectReader);
      console.log("선택된 카테고리: " + selectedLabel);
      console.log("고민: " + worryArea.current.value);

      if (selectReader === "AI리더") {
        // navigate to the desired path with state
        navigate(`/online/graphic`, {
          state: {
            selectReader: selectReader,
            selectedLabel: selectedLabel,
            worry: worryArea.current.value,
          },
        });
      } else if (selectReader === "리더매칭") {
        // navigate to a different path with state
        navigate(`/different/path`, {
          state: {
            selectReader: selectReader,
            selectedLabel: selectedLabel,
            worry: worryArea.current.value,
          },
        });
      }
    }
  };

  // 카테고리 구조체
  const buttonLabels = [
    "연애운",
    "직장운",
    "재물운",
    "건강운",
    "가족운",
    "기타",
  ];

  return (
    <div className="bg-white w-[700px] h-[500px] -mt-20 flex items-center justify-center rounded-md fade-in">
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
            <textarea
              placeholder="고민"
              className="border border-gray-300 rounded-lg p-3 w-full h-28 resize-none"
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
