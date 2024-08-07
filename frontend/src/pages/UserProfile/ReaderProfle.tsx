import React from 'react';
import Hero1 from '../../components/ReaderProfile/Hero1';
import Hero2 from '../../components/ReaderProfile/Hero2';
import Hero3 from '../../components/ReaderProfile/Hero3';
import Hero4 from '../../components/ReaderProfile/Hero4';
import { useLocation } from 'react-router-dom';
const { readerDetail } = require('../../API/api.ts');

// TODO : 여기서 props는 받아왔으니 각 섹터별로 정보 넘기기

const SeekerMypage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const readerId = queryParams.get('id');

  try {
    const data = readerDetail(readerId);
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div style={{ backgroundColor: '#1A0E2D' }}>
      {/* TODO : 각각원하느 데이터 넘겨주기 */}
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
    </div>
  );
};

export default SeekerMypage;
