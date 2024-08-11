import React, { useState, useEffect } from "react";
import Address from './Address';

const { patchTarotshop } = require("../../../API/tarotShopApi");

interface PatchProps {
  shopId: number;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  shopName: string;
}

const Patch: React.FC<PatchProps> = ({
  shopId,
  address: initialAddress,
  latitude: initialLatitude,
  longitude: initialLongitude,
  phone: initialPhone,
  shopName: initialShopName
}) => {
  const [shopName, setShopName] = useState(initialShopName);
  const [address, setAddress] = useState({
    address: '',
    zonecode: '',
    detailAddress: '',
  });
  const [phone, setPhone] = useState(initialPhone);
  const [latitude, setLatitude] = useState<number | null>(initialLatitude);
  const [longitude, setLongitude] = useState<number | null>(initialLongitude);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    const { address: parsedAddress, zonecode, detailAddress } = extractAddressComponents(initialAddress);

    setShopName(initialShopName);
    setAddress({
      address: parsedAddress,
      zonecode: zonecode,
      detailAddress: detailAddress,
    });
    setPhone(initialPhone);
    setLatitude(initialLatitude);
    setLongitude(initialLongitude);
  }, [initialShopName, initialAddress, initialPhone, initialLatitude, initialLongitude]);

  const extractAddressComponents = (fullAddress: string) => {
    const closingParenIndex = fullAddress.indexOf(')');
    if (closingParenIndex === -1) {
      return { address: fullAddress, zonecode: '', detailAddress: '' };
    }

    const address = fullAddress.slice(0, closingParenIndex + 1).trim();
    const detailAddress = fullAddress.slice(closingParenIndex + 1).trim();
    const zonecode = ''; // 적절한 zonecode 변환 방법을 추가해야 합니다.

    return { address, zonecode, detailAddress };
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    const regex = /^\d{3}-\d{3,4}-\d{4}$/;
    setPhoneError(!regex.test(value));
  };

  useEffect(() => {
    if (address.address) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x, y } = result[0];
          setLongitude(parseFloat(x));
          setLatitude(parseFloat(y));
        } else {
          alert("해당 주소의 좌표를 찾을 수 없습니다.");
        }
      });
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName || !address.address || !phone || !latitude || !longitude) {
      setAddressError(!address.address || !address.detailAddress);
      alert("모든 필드를 올바르게 입력해 주세요.");
      return;
    }

    try {
      const fullAddress = `${address.address} ${address.detailAddress}`;
      console.log("Full Address:", fullAddress); // 전체 주소 확인
      console.log(shopId);
      console.log(shopName);
      console.log(phone);
      console.log(longitude);
      console.log(latitude);

      await patchTarotshop(
        shopId,
        shopName,
        fullAddress,
        phone,
        longitude,
        latitude
      );
      alert("타로샵이 성공적으로 수정되었습니다.");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("타로샵 수정 실패:", error);
      alert("타로샵 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-lg">상점 이름</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full max-w-xs mx-auto"
            />
          </div>
          <div>
            <Address 
              address={address}
              setAddress={setAddress}
            />
            {addressError && (
              <small className="text-red-500">주소와 상세 주소를 입력해 주세요.</small>
            )}
          </div>
          <div>
            <label className="block text-lg">전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
              pattern="^\d{3}-\d{3,4}-\d{4}$"
              className="border border-gray-300 p-2 w-full max-w-xs mx-auto"
              placeholder="예: 010-1234-5678, 062-123-4567"
            />
            {phoneError && (
              <small className="text-red-500">형식이 어긋났습니다</small>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white p-2 rounded"
            disabled={phoneError || addressError}
          >
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Patch;
