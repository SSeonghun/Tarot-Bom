import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/UserAuth/Login';
import Navbar from './components/Navbar';
import Offline from './pages/OfflineTarot';
import SerchReader from './pages/SearchReader/SearchReader';
import Community from './pages/Community/Community';
import SignUp from './pages/UserAuth/Signup';
import Matching from './pages/Matching/Matching';
import Graphic from './pages/PlayTarot/graphic';
import ChangePwd from './pages/UserAuth/ChangePwd';
import FindPwd from './pages/UserAuth/FindPwd';
import ReaderProfile from './pages/UserProfile/ReaderProfle';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/online" element={<Matching />} />
          <Route path="/online/graphic" element={<Graphic />} />
          <Route path="/serch-reader" element={<SerchReader />} />
          <Route path="/community" element={<Community />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/change-pwd" element={<ChangePwd />} />
          <Route path="/findpwd" element={<FindPwd />} />
          <Route path="/reader-profile" element={<ReaderProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
