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
}

const SeekerMypage: React.FC<Hero2Props> = ({ shopInfo }) => {
  console.log(shopInfo);

  return (
    <div className="relative">
      <img
        src={ReaderProfile}
        alt="리더 지도쪽 배경이미지"
        className="w-full object-cover opacity-60"
      />

      {shopInfo ? (
        <OfflineStore 
          key={shopInfo.shopId} // 고유 키를 추가 (shopId 사용)
          address={shopInfo.address}
          phone={shopInfo.phone}
          // readerId={shopInfo.readerId}
          // shopId={shopInfo.shopId}
          shopName={shopInfo.shopName}
          latitude={shopInfo.latitude} // 위도 전달
          longitude={shopInfo.longitude} // 경도 전달
          wsize={500}
          hsize={400}
        />
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          등록된 오프라인 점포가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SeekerMypage;
