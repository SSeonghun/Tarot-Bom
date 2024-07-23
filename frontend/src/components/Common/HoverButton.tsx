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
    <button
      className={`group relative ${hsize} ${wsize} overflow-hidden rounded-lg ${color} ${fontsize} shadow`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 w-3 ${hoverColor} transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
      <span className="relative text-black group-hover:text-white">{label}</span>
    </button>
  );
}

export default CustomButton;
