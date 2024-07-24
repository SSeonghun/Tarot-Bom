import React from 'react';
import Sphere from '../../assets/img/sphere.png';
import Category from './item/Category';
import ReaderCard from './item/ReaderCard';
import LinkButton from '../login_signup/LinkButton';

const SerchReader: React.FC = () => {
  const Labels = [
    { name: '연애운' },
    { name: '직장운' },
    { name: '재물운' },
    { name: '건강운' },
    { name: '가족운' },
    { name: '기타' }
  ];

  // 카드 데이터 배열 (8개의 카드 생성)
  const cards = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    name: `Reader ${index + 1}`,
    detail: `Detail for Reader ${index + 1}`,
    review: Math.floor(Math.random() * 100), // 랜덤 리뷰 수
    category: ['Category1', 'Category2'], // 더미 카테고리
    imgUrl: 'https://via.placeholder.com/150', // 더미 이미지 URL
    hsize: 'h-10',
    wsize: 'w-40'
  }));

  return (
    <div className="container p-4 mx-auto relative min-h-[700px]">
      {/* 배경 이미지 */}
      <img src={Sphere} alt="sphere" className='absolute object-cover right-10 bottom-0 max-w-[450px] h-auto z-0' />

      {/* 제목과 수평선 */}
      <div className='flex justify-between items-end'>
        <h1 className="text-6xl font-bold text-white mb-10 mt-5">리더 검색</h1>
        <div className='mb-5'>
            <form action="" className='flex flex-row'>
                <input type="text" placeholder='리더를 검색해보세요' className='p-2 rounded me-3 w-60'/>
                <div className='w-28'>
                <LinkButton to='#' text='검색'></LinkButton>
                </div>
            </form>
        </div>
      </div>

      <hr className='relative border-white z-10' />

      <div className="grid grid-cols-12 gap-4 mt-10">
        {/* 첫 번째 열 (2/12) */}
        <div className="col-span-2 text-white p-4 z-10">
          <Category items={Labels} />
        </div>

        {/* 두 번째 열 (10/12) */}
        <div className="col-span-10 text-black p-4 z-10">
          <div className="grid grid-cols-4 gap-4">
            {cards.map(card => (
              <ReaderCard
                key={card.id}
                name={card.name}
                detail={card.detail}
                review={card.review}
                category={card.category}
                imgUrl={card.imgUrl}
                hsize={card.hsize}
                wsize={card.wsize}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SerchReader;
