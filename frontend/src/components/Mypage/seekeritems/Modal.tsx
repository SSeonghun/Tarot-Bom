import React, { useState, useRef } from "react";
import useUserStore from "../../../stores/store";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newProfileImg: string,
    newName: string,
    newPassword: string
  ) => void;
}

const { update } = require("../../../API/userApi");

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const store = useUserStore();
  const [newProfileImg, setNewProfileImg] = useState<File | null>(null);
  const [previewProfileImg, setPreviewProfileImg] = useState<string>(
    store.userInfo?.profileImg || ""
  );
  const [newName, setNewName] = useState<string>(
    store.userInfo?.nickname || ""
  );
  const [newPassword, setNewPassword] = useState<string>(
    store.userInfo?.password || ""
  );
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // 모달 배경 클릭 시 모달을 닫기 위해서
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // 프로필 이미지 파일 선택 시
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfileImg(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 비밀번호 확인 입력값이 변경될 때마다 비밀번호와 비교하여 오류 메시지 설정
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (newPassword !== value) {
      setPasswordError("비밀번호가 다릅니다.");
    } else {
      setPasswordError("");
    }
  };

  // 확인 버튼 클릭 시 비밀번호 확인 및 API 호출 로직
  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("비밀번호가 다릅니다.");
      return;
    }

    try {
      const memberId = store.userInfo?.memberId;
      const email = store.userInfo?.email;
      const isReader = store.userInfo?.isReader;
      const isAdmin = store.userInfo?.isAdmin;

      if (
        memberId === undefined ||
        email === undefined ||
        isReader === undefined
      ) {
        console.error("필수 사용자 정보가 누락되었습니다.");
        return;
      }

      // FormData를 사용해 multipart/form-data 요청 준비
      const formData = new FormData();

      formData.append("nickname", newName);
      formData.append("password", newPassword);

      if (newProfileImg) {
        formData.append("profileImage", newProfileImg);
      }
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      // 업데이트 API 호출
      const result = await update(formData);

      console.log("업데이트 성공", result);
      store.userInfoSet({
        memberId: memberId,
        profileImg: previewProfileImg,
        nickname: newName,
        password: newPassword,
        email: email,
        isReader: isReader,
        isAdmin: isAdmin,
      });

      onConfirm(previewProfileImg, newName, newPassword);
      onClose();
    } catch (error) {
      console.error("업데이트 중 오류 발생", error);
      // 오류 처리 로직 추가 가능 (예: 사용자에게 오류 메시지 표시)
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick} // 배경 클릭 시 모달 닫기
    >
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          X
        </button>
        <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            프로필 사진
          </label>
          <div className="mt-2 flex items-center">
            <img
              src={previewProfileImg}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInput.current?.click()}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              변경
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (confirmPassword && confirmPassword !== e.target.value) {
                setPasswordError("비밀번호가 다릅니다.");
              } else {
                setPasswordError("");
              }
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
