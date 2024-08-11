import React, { useState, useEffect } from "react";
import Address from './Address';
import { add } from "lodash";

const { writeTarotshop } = require("../../../API/tarotShopApi");

const Register: React.FC = () => {
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState({ address: '', zonecode: '', detailAddress: '' });
  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    const regex = /^\d{3}-\d{3,4}-\d{4}$/;
    setPhoneError(!regex.test(value));
  };

  // 주소가 변경될 때마다 좌표 변환
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

    if (latitude && longitude) {
      try {
        // address와 detailAddress를 합친 문자열 생성
        const fullAddress = `${address.address} ${address.detailAddress}`;

        await writeTarotshop(
          shopName,
          fullAddress, // 합쳐진 주소를 API에 전달
          phone,
          longitude, // 반올림된 경도
          latitude // 반올림된 위도
        );
        alert("타로샵이 성공적으로 등록되었습니다.");
        window.location.reload(); // 페이지 새로고침
      } catch (error) {
        console.error("타로샵 등록 실패:", error);
        alert("타로샵 등록에 실패했습니다.");
      }
    } else {
      console.log("위도와 경도를 확인해 주세요.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">타로샵 등록</h1>
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
            className="bg-gray-500 text-white p-2 rounded"
            disabled={phoneError || addressError}
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
