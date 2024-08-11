import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Hero1 from '../../components/ReaderProfile/Hero1';
import Hero2 from '../../components/ReaderProfile/Hero2';
import Hero3 from '../../components/ReaderProfile/Hero3';
import Hero4 from '../../components/ReaderProfile/Hero4';
import { useLocation } from 'react-router-dom';
import { log } from '@livekit/components-core';
const { readerDetail } = require('../../API/api.ts');

interface ShopInfo {
  address: string;
  phone: string;
  readerId: number;
  shopId: number;
  shopName: string;
  latitude: number;
  longitude: number;
}

interface Data {
  memberId?: number;
  name?: string;
  keyword?: string;
  intro?: string;
  rating?: number;
  grade?: string;
  price?: number;
  profileUrl?: string | null;
  reviews?: Array<any>;
  shopInfo?: ShopInfo | null; // 여기서 shopInfo를 ShopInfo 타입으로 변경
  allConsultings?: number;
  allReservations?: number;
  afterReader?: number;
}

const SeekerMypage: React.FC = () => {
  const [data, setData] = useState<Data | null>(null); // 초기값을 null로 설정하여 타입 일치

  const { readerId } = useParams<{ readerId: string }>();
  useEffect(() => {
    const loadReaders = async () => {
      try {
        const data = await readerDetail(readerId);
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadReaders();
    
    
  }, [readerId]); // dependency array에 readerId 추가

  if (!data) return <div>Loading...</div>; // 데이터 로딩 중일 때 처리
  
  return (
    <div style={{ backgroundColor: '#1A0E2D' }}>
      <Hero1 
        name={data.name || ''}
        profileUrl={data.profileUrl || ''}
        grade={data.grade || ''}
      />
      <Hero2 
        name={data.name || ''}
        reviews={data.reviews || []} // 기본값 제공
        allConsultings={data.allConsultings || 0} // 기본값 제공
        allReservations={data.allReservations || 0} // 기본값 제공
        afterReader={data.afterReader || 0} // 기본값 제공
      />
      <Hero3
        intro={data.intro || ''}
        reviews={data.reviews || []}
      />
      <Hero4 shopInfo={data.shopInfo || null} /> {/* shopInfo를 배열로 변환 */}
    </div>
  );
};

export default SeekerMypage;
