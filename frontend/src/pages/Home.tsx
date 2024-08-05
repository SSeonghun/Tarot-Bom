import React from 'react';
import Hero1 from '../components/Home/Hero1';
import Hero2 from '../components/Home/Hero2';
import Hero3 from '../components/Home/Hero3';
import Hero4 from '../components/Home/Hero4'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className='container'>
      <Hero1></Hero1>
      <hr className='border-white'/>
      <Hero2></Hero2>
      <hr className='border-white'/>
      <Hero3></Hero3>
      <hr className='border-white'/>
      <Hero4></Hero4>
    </div>
  );
}

export default Home;
