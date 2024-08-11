import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

interface OfflineStoreProps {
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  shopName: string;
  wsize: number; // 지도 가로 크기
  hsize: number; // 지도 세로 크기
}

const OfflineStore: React.FC<OfflineStoreProps> = ({
  address,
  latitude,
  longitude,
  phone,
  shopName,
  wsize,
  hsize,
}) => {
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>({ lat: latitude, lng: longitude });
  const [isOpen, setIsOpen] = useState(false); // 인포윈도우 열림 상태
  const [infoWindowWidth, setInfoWindowWidth] = useState(0); // 인포윈도우의 너비

  useEffect(() => {
    setMarkerPosition({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  useEffect(() => {
    // 지도 크기에 따라 인포윈도우 너비 설정
    const width = Math.min(wsize * 0.4, 300); // 지도 가로 크기의 40% 또는 최대 300px
    setInfoWindowWidth(width);
  }, [wsize]);

  const handleMarkerClick = () => {
    setIsOpen(!isOpen); // 마커 클릭 시 인포윈도우 열기/닫기
  };

  const handleCloseInfoWindow = () => {
    setIsOpen(false); // X 버튼 클릭 시 인포윈도우 닫기
  };

  // 커스터마이즈한 마커 이미지 설정
  const markerImage = {
    src: 'https://cdn3d.iconscout.com/3d/premium/thumb/map-pin-9990594-8140788.png?f=webp', // 마커 이미지 URL
    size: { width: 40, height: 40 }, // 마커 이미지 크기
    options: {
      offset: { x: 20, y: 40 }, // 마커 이미지의 위치 조정
    },
  };

  return (
    <div>
      <Map
        center={markerPosition}
        style={{ width: wsize, height: hsize }}
        level={3}
      >
        <MapMarker 
          position={markerPosition} 
          onClick={handleMarkerClick} // 마커 클릭 시 인포윈도우 열기/닫기
          image={markerImage} // 커스터마이즈한 마커 이미지 적용
        />

        {isOpen && (
          <MapInfoWindow position={markerPosition}>
            <div
              style={{
                background: '#fff',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 1,
                position: 'relative',
                width: `${infoWindowWidth}px`, // 지도 크기에 따른 너비 설정
                height: 'auto', // 높이는 내용에 따라 자동 조절
                whiteSpace: 'pre-wrap', // 줄바꿈을 위해 설정
              }}
            >
              <button
                onClick={handleCloseInfoWindow}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                X
              </button>
              <h4><strong>{shopName}</strong></h4> {/* shopName을 굵게 표시 */}
              <p>주소: {address}</p>
              <p>전화번호: {phone}</p>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`} style={{ color: 'blue' }} target="_blank" rel="noopener noreferrer">길찾기</a>
            </div>
          </MapInfoWindow>
        )}
      </Map>
    </div>
  );
};

export default OfflineStore;
