import React, { useEffect, useState } from 'react';
import Hero1 from '../../components/ReaderProfile/Hero1';
import Hero2 from '../../components/ReaderProfile/Hero2';
import Hero3 from '../../components/ReaderProfile/Hero3';
import Hero4 from '../../components/ReaderProfile/Hero4';
import { useLocation } from 'react-router-dom';
const { readerDetail } = require('../../API/api.ts');

// TODO : 여기서 props는 받아왔으니 각 섹터별로 정보 넘기기

const SeekerMypage: React.FC = () => {
  const [data, setData] = useState<{
    memberId?: number;
    name?: string;
    keyword?: string;
    intro?: string;
    rating?: number;
    grade?: string;
    price?: number;
    profileUrl?: string | null;
    reviews?: Array<any>;
    allConsultings?: number;
    allReservations?: number;
    afterReader?: number;
  }>({});
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const readerId = queryParams.get('id');

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
  }, []);

  return (
    <div style={{ backgroundColor: '#1A0E2D' }}>
      {/* TODO : 각각원하느 데이터 넘겨주기 */}
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
      <Hero4 />
    </div>
  );
};

export default SeekerMypage;
