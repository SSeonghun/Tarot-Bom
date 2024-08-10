import React, { useEffect } from 'react';

interface KakaoMapProps {
  width: string;
  height: string;
}

const KakaoMap: React.FC<KakaoMapProps> = (props) => {
  useEffect(() => {
    // 스크립트 요소를 동적으로 생성하고 카카오맵 API를 로드합니다.
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KakaoMap_api}`; // 발급받은 API 키
    script.async = true;
    document.head.appendChild(script);
    

    // 스크립트 로드가 완료되면 지도 객체를 생성합니다.
    script.onload = () => {
      const kakao = (window as any).kakao;
      const container = document.getElementById('map');
      if (container) {
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978), // 지도 중심 좌표 (서울시청)
          level: 3, // 확대 레벨
        };
        new kakao.maps.Map(container, options); // 지도 객체 생성
      }
      else {
        console.error('Kakao Maps API가 로드되지 않았습니다.');
      }
    };

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: props.width, height: props.height }}></div>;
};

export default KakaoMap;
