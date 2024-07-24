import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface ProfileImgProps {}

const ProfileImg: React.FC<ProfileImgProps> = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {image ? (
          <img src={image} alt="Profile" className="h-36 w-36 rounded-full" />
        ) : (
          <UserCircleIcon aria-hidden="true" className="h-36 w-36 text-gray-400" />
        )}
        <button
          type="button"
          className="rounded-md bg-gray-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          Change
        </button>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ProfileImg;
