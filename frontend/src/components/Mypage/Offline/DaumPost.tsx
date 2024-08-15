import React from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPost: React.FC<any> = (props) => {
    const complete = (data: any) => {
        let fullAddress = data.address;
        let zonecode = data.zonecode;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log(data);
        console.log(fullAddress);
        console.log(zonecode);

        // 선택한 주소값을 상태값으로 설정
        props.setAddress({
            address: fullAddress,
            zonecode: zonecode,
        });

        // 팝업창 닫기
        props.handleComplete();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="relative" style={{ width: '500px', height: '500px', zIndex: 10000 }}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-white text-lg">주소 검색</h1>
                    <button 
                        onClick={props.handleComplete} 
                        className="text-white cursor-pointer"
                    >
                        닫기
                    </button>
                </div>
                <DaumPostcode
                    autoClose
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    onComplete={complete}
                />
            </div>
        </div>
    );
}

export default DaumPost;
