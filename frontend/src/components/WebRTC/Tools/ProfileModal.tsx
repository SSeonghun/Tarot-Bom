import React from 'react';

interface ProfileModalProps {
  isVisible: boolean;
  profileData: {
    name: string;
    email: string;
    favoriteReaderList?: Array<{
      memberId: number;
      profileUrl: string;
      name: string;
      keyword: string;
      intro: string;
      rating: number;
      grade: string;
      price: number;
    }>;
  };
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isVisible, profileData, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{profileData.name}'s Profile</h2>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {profileData.email}</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Favorite Readers</h3>
        <ul className="list-disc pl-5">
          {profileData.favoriteReaderList &&profileData.favoriteReaderList.map(reader => (
            <li key={reader.memberId} className="text-gray-700 mb-4">
              <div className="flex items-center">
                <img
                  src={reader.profileUrl}
                  alt={reader.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{reader.name}</p>
                  <p><strong>Keyword:</strong> {reader.keyword}</p>
                  <p><strong>Intro:</strong> {reader.intro}</p>
                  <p><strong>Rating:</strong> {reader.rating}</p>
                  <p><strong>Grade:</strong> {reader.grade}</p>
                  <p><strong>Price:</strong> ${reader.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
