import React, { useState } from 'react';
import HoverButton from '../Common/HoverButton';

const RandomMatching: React.FC = () => {
  // 상태 추가: 선택된 버튼의 레이블과 두 번째 입력 필드의 표시 여부를 제어
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [showSecondInput, setShowSecondInput] = useState<boolean>(false);

  // 버튼 클릭 핸들러
  const handleButtonClick = (label: string) => {
    setSelectedLabel(label);
    setShowSecondInput(true); // 두 번째 입력 필드를 나타나게 설정
  };

  // 버튼 레이블 배열
  const buttonLabels = [
    '연애운', 
    '직장운', 
    '재물운', 
    '건강운', 
    '가족운',
    '기타'
  ];

  return (
    <div className='bg-white w-[700px] h-[400px] -mt-20 flex items-center justify-center rounded-md'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-4'>랜덤 매칭</h2>

        {/* 선택된 레이블을 상단에 표시 */}
        {selectedLabel && (
          <h3 className='text-xl font-semibold mb-4'>
            {selectedLabel}
          </h3>
        )}

        <div className='flex flex-wrap justify-center mt-5'>
          {buttonLabels.map((label) => (
            <div key={label} className='m-2'>
              <HoverButton 
                label={label} // 동적 레이블
                color="bg-gray-500"
                hoverColor="bg-gray-300"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={() => handleButtonClick(label)} // 버튼 클릭 시 레이블 설정
              />
            </div>
          ))}
        </div>

        {showSecondInput && (
          <div>
            <input
              type='text'
              placeholder='고민'
              className='border border-gray-300 rounded-lg p-3 w-80 text-lg mt-5'
            />
            <HoverButton
                label='입력'
                color="bg-gray-500"
                hoverColor="bg-gray-300"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomMatching;
