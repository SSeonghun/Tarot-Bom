import React from 'react';

const Category: React.FC = () => {
  return (
    <nav className="rounded-md w-44 h-screen flex flex-col justify-between">
      <div className=" h-full">
        <div className="flex justify-center shadow-sm pr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <div className="pl-2">
            <p className="text-2xl font-bold text-indigo-300">READER</p>
            <span className="text-xs block text-gray-400">CATEGORY</span>
          </div>
        </div>
        <div className="pl-10">
          <ul className="space-y-8 pt-10">
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <a href="#">연애운</a>
            </li>
 
          </ul>
        </div>
      </div>
      <div className="bg-white flex items-center space-x-4 pl-10 pb-10 hover:text-indigo-600 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <a href="#">Logout</a>
      </div>
    </nav>
  );
};

export default Category;
