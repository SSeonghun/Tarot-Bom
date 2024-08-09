import React from 'react';

interface CategoryitemProps {
  name: string;
  onClick:()=>void;
}

const Categoryitem: React.FC<CategoryitemProps> = ({ name, onClick }) => {
  return (
    <li 
    className="flex space-x-4 items-center hover:text-indigo-300 cursor-pointer"
    onClick={onClick}
    >
      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg> */}
      <a href="#">{name}</a>
    </li>
  );
};

export default Categoryitem;
