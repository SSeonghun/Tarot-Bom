import React, { useEffect, useState } from 'react';
import MypageBackground from '../../assets/img/mypageback.png';
import Profile from '../../assets/img/profile2.png';
import SeekerItem from './seekeritems/SeekerItem';

const { seekerMypage } = require('../../API/userApi');

const Seeker: React.FC = () => {
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // TODO: 이름이랑, 리더 여부 넘겨줘야함
        const data = seekerMypage();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    // TODO: 반환되는 형식에 맞게 설정
    <div className="relative w-screen h-screen">
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url(${MypageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 z-10 bg-black opacity-50"></div>
      <div className="relative flex flex-col justify-center items-center h-full z-20">
        <div className="bg-black bg-opacity-50 p-2 absolute top-[50px] rounded-full backdrop-filter backdrop-blur-sm">
          <img src={Profile} alt="Profile" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex flex-col justify-center absolute top-[180px] items-center">
          <h1 className="text-white text-[40px] font-bold mt-5">김싸피</h1>
          <h3 className="text-white">TAROT SEEKER</h3>
        </div>
      </div>

      <div className="relative h-fit bg-gray-700 z-30">
        <div className="h-fit bg-white mx-[100px] relative flex flex-col -top-[450px] rounded-xl bg-opacity-55">
          {/* TODO : 여기에 거의 모든 값을 넘겨줘야함 props로 */}
          <SeekerItem />
        </div>
      </div>
    </div>
  );
};

export default Seeker;
