import React from 'react';
import ReaderProfile from '../../assets/img/ReaderProfile2.png';
import OfflineStore from '../Common/OfflineStore';

// TODO: 데이터 뿌려주기
interface ShopInfo {
  address: string;
  phone: string;
  readerId: number;
  shopId: number;
  shopName: string;
  latitude: number; // 위도 추가
  longitude: number; // 경도 추가
}

interface Hero2Props {
  shopInfo?: ShopInfo | null | undefined; // shopInfo를 선택적 객체로 설정
  name: string;
}

const SeekerMypage: React.FC<Hero2Props> = ({ shopInfo, name }) => {
  console.log(shopInfo);

  const getKakaoDirectionsUrl = (shopName: string, latitude: number, longitude: number) => {
    return `https://map.kakao.com/link/to/${encodeURIComponent(shopName)},${latitude},${longitude}`;
  };

  return (
    <div className="container mx-auto relative">
      {/* <img
        src={ReaderProfile}
        alt="리더 지도쪽 배경이미지"
        className="w-full object-cover opacity-60"
      /> */}
      
      {shopInfo ? (
        <div>
          <div className='flex justify-center items-center'>
            <p className="text-center font-extrabold text-4xl text-white ">{name}님의 오프라인 타로점입니다</p>
            <img 
              src="https://cdn3d.iconscout.com/3d/premium/thumb/store-locator-3d-icon-download-in-png-blend-fbx-gltf-file-formats--shop-gps-pin-pack-icons-7718567.png?f=webp" 
              alt="오프라인 스토어" 
              width={50} 
            />
          </div>
          <div className='flex justify-around p-10'>
            <OfflineStore 
              key={shopInfo.shopId} // 고유 키를 추가 (shopId 사용)
              address={shopInfo.address}
              phone={shopInfo.phone}
              shopName={shopInfo.shopName}
              latitude={shopInfo.latitude} // 위도 전달
              longitude={shopInfo.longitude} // 경도 전달
              wsize={500}
              hsize={400}
            />
            <div className='mr-20 text-xl text-white flex flex-col justify-center'>
              <p className='mb-3'>상호명 : {shopInfo.shopName}</p>
              <p className='mb-3'>주소 : {shopInfo.address}</p>
              <p>전화번호 : {shopInfo.phone}</p>
              <a 
                href={getKakaoDirectionsUrl(shopInfo.shopName, shopInfo.latitude, shopInfo.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                
                className='bg-gray-700 w-20 text-white px-2 py-1 rounded-lg mt-4 text-center hover:bg-gray-500 transition-colors text-sm'
              >
                길찾기
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          {name}님의 등록된 오프라인 점포가 없습니다.
        </div>
      )}
      
    </div>
  );
};

export default SeekerMypage;
