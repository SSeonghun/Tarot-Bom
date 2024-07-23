import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/UserAuth/Login';
import Navbar from './components/Navbar';
import Offline from './pages/OfflineTarot';
import Online from './pages/PlayTarot/Online';
import SerchReader from './pages/SearchReader/SearchReader';
import Community from './pages/Community/Community';
import SignUp from './pages/UserAuth/Signup';
import Matching from './pages/Matching/Matching';
import Graphic from './pages/PlayTarot/graphic';

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
          <Route path="/online" element={<Online />} />
          <Route path="/online/graphic" element={<Graphic />} />
          <Route path="/serch-reader" element={<SerchReader />} />
          <Route path="/community" element={<Community />} />
          <Route path="/matching" element={<Matching />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
