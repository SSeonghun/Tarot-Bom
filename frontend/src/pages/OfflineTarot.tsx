import React from 'react';
import OfflineTarot from '../components/OfflineTarot/OfflineTarot';

const Offline: React.FC = () => {
  return (
    <div className='flex justify-center min-h-screen bg-gray-900'>
      <div className="container p-4 mx-auto">
        <OfflineTarot />
      </div>
    </div>
  );
}

export default Offline;
