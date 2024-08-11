import React, { useState, useEffect } from "react";
import DaumPost from "./DaumPost";

interface PostCode {
    address: string;
    zonecode: string;
    detailAddress: string; // 상세주소 필드 추가
}

const Address: React.FC<{ address: PostCode; setAddress: React.Dispatch<React.SetStateAction<PostCode>> }> = ({ address = { address: '', zonecode: '', detailAddress: '' }, setAddress }) => {
    const [popup, setPopup] = useState(false);
    const [detailAddress, setDetailAddress] = useState(""); // 상세주소를 위한 상태 추가

    // 상세주소가 변경될 때마다 address 상태 업데이트
    useEffect(() => {
        setAddress((prev) => ({
            ...prev,
            detailAddress: detailAddress, // 상세주소 업데이트
        }));
    }, [detailAddress, setAddress]);

    // 팝업 열고 닫기
    const handleComplete = () => {
        setPopup(!popup);
    };

    const handleZonecodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, zonecode: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, address: e.target.value });
    };

    const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(e.target.value); // 상세주소 상태 업데이트
    };

    return (
        <>
            <div className="mb-4">
                <h4 className="w-72 mb-2 text-lg">주소</h4>
                <div className="mb-3 flex items-center">
                    
                    <input
                        className="border border-gray-300 rounded-lg p-2 flex-1 bg-white"
                        value={address.zonecode} // 선택한 우편번호 input 태그에 바인딩
                        onChange={handleZonecodeChange}
                        type="text"
                        required
                        placeholder="우편번호"
                    />
                    <button
                        onClick={handleComplete}
                        className="ml-2 rounded-lg bg-gray-500 text-white px-4 py-2"
                    >
                        주소 검색
                    </button>
                </div>
                <input
                    className="border border-gray-300 rounded-lg p-2 mb-3 bg-white w-full"
                    value={address.address} // 선택한 주소값 input 태그에 바인딩
                    onChange={handleAddressChange}
                    type="text"
                    required
                    placeholder="기본주소"
                />
                <input
                    className="border border-gray-300 rounded-lg p-2 bg-white w-full"
                    value={detailAddress} // 상세주소 input 태그에 바인딩
                    onChange={handleDetailAddressChange}
                    type="text"
                    placeholder="상세주소"
                    required
                    minLength={2}
                    maxLength={36}
                />
            </div>

            {/* DaumPost 컴포넌트에서 상태값을 설정할 수 있도록 props을 전달합니다 */}
            {popup && <DaumPost address={address} setAddress={setAddress} handleComplete={handleComplete} />}
        </>
    );
}

export default Address;
