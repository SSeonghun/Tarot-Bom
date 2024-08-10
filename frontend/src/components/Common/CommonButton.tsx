import React from 'react';

interface CustomButtonProps {
  label: string;
  color: string;
  hoverColor: string;
  wsize: string;
  hsize: string;
  fontsize: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { label, color, hoverColor, wsize, hsize, fontsize, onClick } = props;

  return (
    <div className="group">
      {' '}
      {/* group 클래스를 가진 부모 요소 */}
      <button
        className={`relative ${hsize} ${wsize} overflow-hidden rounded-lg border-[2px] border-gray-500 ${fontsize} shadow bg-${color} group-hover:bg-${hoverColor}`}
        onClick={onClick}
      >
        <span className={`relative text-white group-hover:text-black`}>{label}</span>
      </button>
    </div>
  );
};

export default CustomButton;
