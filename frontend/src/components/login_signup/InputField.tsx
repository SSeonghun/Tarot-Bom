// InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean; // **여기에 disabled 속성 추가**
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, error, disabled }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        disabled={disabled} // **여기를 통해 비활성화 기능 추가**
        className={`block w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-700 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // **비활성화 시 스타일 추가**
      />
      {error && (
        <p className="text-red-500 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default InputField;
