import React, { useEffect, useState } from 'react';
import MypageBackground from '../../assets/img/mypageback.png';
import SeekerItem from './seekeritems/SeekerItem';
import useUserStore from '../../stores/store';
import useReservationStore from '../../stores/reservationStore'; // zustand 스토어 임포트
import { seekerMypage } from '../../API/userApi';
import Modal from './seekeritems/Modal'; // 모달 컴포넌트 추가
import Modify from '../../assets/img/modify.webp';
import Toggle from '../Common/Toggle';
import { seeker } from '../../API/reservationsApi';
// UserInfo 인터페이스 정의
interface UserInfo {
  nickname: string;
  isReader: boolean;
}

const Seeker: React.FC = () => {
  const store = useUserStore();
  const setReservations = useReservationStore((state) => state.setReservations); // 예약 내역 설정 함수 가져오기
  const [data, setData] = useState<any>(null); // 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [reservationData, setReservationData] = useState<any>(null); // 예약 데이터 상태

  useEffect(() => {
    // 데이터 가져오기 함수
    const fetchData = async () => {
      try {
        const userInfo = store.userInfo as UserInfo; // userInfo를 UserInfo 타입으로 캐스팅
        const nickname = userInfo?.nickname;
        const isReader = userInfo?.isReader;
      
        if (nickname) { // nickname이 존재할 때만 API 호출
          const fetchedData = await seekerMypage(); // 데이터 가져오기
          console.log(fetchedData);

          // 예약 내역만 zustand 스토어에 저장
          if (fetchedData.reservations) {
            setReservations(fetchedData.reservations);
          }

          setData(fetchedData); // 가져온 데이터를 상태에 저장
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다', error);
      }
    };

    fetchData();
  }, [store.userInfo, setReservations]);

  // axios로 예약 내역 가져와서 예약일정이랑 요약에 뿌려주기
  useEffect(() => {
    // 데이터 요청 예시
    const fetchData = async () => {
      try {
        const response = await seeker();
        console.log('response Seeker: ', response);
        await setReservationData(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // console.log(reservationData);
  }, []); // 컴포넌트 마운트 시에만 데이터 요청

  // 모달 열기
  const openProfileModal = () => {
    console.log('수정모달열기');
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 확인 버튼 클릭 시
  const handleConfirm = () => {
    // 확인 버튼 클릭 시 처리할 작업
    console.log('확인 버튼 클릭');
    setIsModalOpen(false); // 모달 닫기
  };

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
          <div className="relative">
            <img
              src={store.userInfo?.profileImg}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <img
              src={Modify}
              alt="Small Icon"
              className="ml-3 w-8 h-8 cursor-pointer absolute top-0 right-0 z-30"
              onClick={openProfileModal} // 버튼 클릭 시 모달 열기
            />
          </div>
        </div>
        <div className="flex flex-col justify-center absolute top-[180px] items-center">
          <div className="flex flex-row items-center">
            <h1 className="text-white text-[40px] font-bold mt-5">{data ? data.name : ''}</h1>
          </div>
          <div className="flex flex-row justify-center items-center">
            {data && data.reader ? <Toggle initialProfile={false} /> : <></>}
            <h3 className="text-white">TAROT SEEKER</h3>
          </div>
        </div>
      </div>

      <div className="relative h-fit bg-gray-700 z-30">
        <div className="h-fit bg-white mx-[100px] relative flex flex-col -top-[450px] rounded-xl bg-opacity-55">
          {/* 가져온 데이터를 SeekerItem에 props로 전달 */}
          {data && <SeekerItem data={data} />}
        </div>
      </div>

      {/* 모달 컴포넌트 추가 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} />
    </div>
  );
};

export default Seeker;
