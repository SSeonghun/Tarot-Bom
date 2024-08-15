import React from "react";
import OfflineStore from "../../Common/OfflineStore";
import Register from './Register';
import Delete from './Delete';
import Patch from './Patch';

interface OfflineProps {
  shopInfo: {
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    readerId: number;
    shopId: number;
    shopName: string;
  } | null; // shopInfo가 null일 수 있도록 설정
}

const Offline: React.FC<OfflineProps> = ({ shopInfo }) => {
  return (
    <div className="relative p-10 flex justify-center items-center h-screen">
      {shopInfo ? (
        <div className="flex justify-center items-center">
          <div className="flex-none" style={{ width: '600px', height: '500px' }}>
            <OfflineStore 
              address={shopInfo.address}
              phone={shopInfo.phone}
              shopName={shopInfo.shopName}
              latitude={shopInfo.latitude}
              longitude={shopInfo.longitude}
              wsize={600}
              hsize={500}
            />
          </div>
        </div>
      ) : (
        <Register />
      )}
      {shopInfo && (
        <div className="absolute bottom-4 right-4">
          <Delete shopId={shopInfo.shopId} />
        </div>
      )}
    </div>
  );
};

export default Offline;
