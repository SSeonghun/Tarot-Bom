import React from 'react';
import classNames from 'classnames';

interface HoverButtonProps {
  label: string;
  color?: string; // 기본 배경 색상
  hoverColor?: string; // 호버 시 배경 색상
  textColor?: string; // 기본 글자 색상
  hoverTextColor?: string; // 호버 시 글자 색상
  hsize?: string; // 버튼 높이
  wsize?: string; // 버튼 너비
  fontsize?: string; // 글꼴 크기
  rounded?: boolean; // 둥근 모서리 여부
  shadow?: boolean; // 그림자 효과 여부
  disabled?: boolean; // 비활성화 여부
  onClick: () => void; // 클릭 이벤트 핸들러
}

const HoverButton: React.FC<HoverButtonProps> = ({
  label,
  color = 'bg-gray-300',
  hoverColor = 'hover:bg-gray-500',
  textColor = 'text-black',
  hoverTextColor = 'hover:text-white',
  hsize = 'h-12',
  wsize = 'w-48',
  fontsize = 'text-lg',
  rounded = true,
  shadow = true,
  disabled = false,
  onClick,
}) => {
  const buttonClass = classNames(
    color,
    textColor,
    hoverColor,
    hoverTextColor,
    hsize,
    wsize,
    fontsize,
    'flex items-center justify-center transition-all duration-300 ease-in-out',
    {
      'cursor-pointer': !disabled,
      'cursor-not-allowed opacity-50': disabled,
      'rounded-lg': rounded,
      'shadow-lg': shadow,
    }
  );

  return (
    <button className={buttonClass} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {label}
    </button>
  );
};

export default HoverButton;
