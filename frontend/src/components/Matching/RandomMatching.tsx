import React, { useState, useEffect, useRef } from "react";

// 컴포넌트
import HoverButton from "../Common/HoverButton";
// css
import "../../assets/css/FadeInOut.css"; // CSS 파일을 가져옴

const RandomMatching: React.FC = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null); // 카테고리를 어떤걸 선택했는지 나타내는 변수 (밑에 변수 떄문에 useState)
  const [showSecondInput, setShowSecondInput] = useState<boolean>(false); // 카테고리를 설정해야 고민을 입력할수 있게 설정하는 변수
  const [animationClass, setAnimationClass] = useState<string>("fade-out"); // 에니메이션 유지 변수
  const [onLoad, setOnLoad] = useState<boolean>(false); // 처음에 컴포넌트 띄울때 에니메이션
  const worryArea = useRef<HTMLTextAreaElement | null>(null); // 고민 내용 변수
  const value = useRef<string | null>(null);

  /*
  카테고리 설정 버튼 함수
  이함수가 실행되면 고민 설정 부분이 나타남
  */
  const handleButtonClick = (label: string) => {
    if (label === "AI리더" || label === "리더매칭") {
      value.current = label;
      // setSelectedLabel(label);
      setSelected(true);
    } else {
      setShowSecondInput(true);
      setSelectedLabel(label);
    }

    setAnimationClass("fade-in");
  };

  /* 
  매칭 시작 버튼 함수
  반응형 변수인 카테고리 정보와, 고민내용을 받아 어딘가에 저장해야 할듯
  */
  const submit = () => {
    if (worryArea.current) {
      if (worryArea.current.value === "") {
        // 고민을 입력하지 않으면
        console.log("여기 Alert으로 고민 입력하라고 띄우기");
        return;
      }

      // 정상 접근
      console.log("선택된 카테고리 : " + selectedLabel);
      console.log("고민 : " + worryArea.current.value);
    }
  };

  /*
  컴포넌트가 onMounted 될때 애니메이션 효과 실행 하기위한 함수
  */
  useEffect(() => {
    setOnLoad(true);

    return () => {
      setOnLoad(false);
    };
  }, []);

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
    <div
      className={`bg-white w-[700px] h-[500px] -mt-20 flex items-center justify-center rounded-md ${
        onLoad ? "button-fade-in" : "fade-out-clear"
      }`}
    >
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

        <h2 className="text-2xl font-bold mb-4">{value.current}</h2>

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
          <div className={`mt-5 ${animationClass} text-center`}>
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
