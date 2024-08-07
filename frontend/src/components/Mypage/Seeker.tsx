import React, { useEffect, useState } from 'react';
import MypageBackground from '../../assets/img/mypageback.png';
import Profile from '../../assets/img/profile2.png';
import SeekerItem from './seekeritems/SeekerItem';
import useUserStore from '../../stores/store';
import { seekerMypage } from '../../API/userApi';

// UserInfo 인터페이스 정의
interface UserInfo {
  nickname: string;
  isReader: boolean;
}

const Seeker: React.FC = () => {
  const store = useUserStore();
  const [data, setData] = useState<any>(null); // 상태 추가

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const userInfo = store.userInfo as UserInfo; // userInfo를 UserInfo 타입으로 캐스팅
        const nickname = userInfo?.nickname;
        const isReader = userInfo?.isReader;
        
        if (nickname) { // nickname이 존재할 때만 API 호출
          const fetchedData = await seekerMypage(nickname, isReader); // 데이터 가져오기
          console.log(fetchedData);
          setData(fetchedData); // 가져온 데이터를 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [store.userInfo]);

  return (
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
          {/* 가져온 데이터를 SeekerItem에 props로 전달 */}
          {data && <SeekerItem data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Seeker;
