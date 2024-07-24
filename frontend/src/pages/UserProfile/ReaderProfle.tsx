import React from 'react';
import Hero1 from '../../components/ReaderProfile/Hero1';
import Hero2 from '../../components/ReaderProfile/Hero2';
import Hero3 from '../../components/ReaderProfile/Hero3';
import Hero4 from '../../components/ReaderProfile/Hero4';

const SeekerMypage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#1A0E2D' }}>
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
    </div>
  );
};

export default SeekerMypage;
