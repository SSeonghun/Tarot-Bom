// InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, error }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="block w-full px-4 py-3 text-gray-200 placeholder-gray-400 bg-gray-700 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
      {error && (
        <p className="text-red-500 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default InputField;
