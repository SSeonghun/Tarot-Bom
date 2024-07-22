import React from 'react';
import Hero1 from '../components/Home/Hero1';
import Hero2 from '../components/Home/Hero2';
import Hero3 from '../components/Home/Hero3';

const Home: React.FC = () => {
  return (
    <div className='container'>
      <Hero1></Hero1>
      <hr className='border-white'/>
      <Hero2></Hero2>
      <hr className='border-white'/>
      <Hero3></Hero3>
      <hr className='border-white'/>
    </div>
  );
}

export default Home;
