import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/UserAuth/Login';
import Navbar from './components/Navbar';
import Offline from './pages/OfflineTarot';
import Online from './pages/OnlineTarot';
import SerchReader from './pages/SearchReader/SearchReader';
import Community from './pages/Community/Community'
import SignUp from './pages/UserAuth/SignUp'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/online" element={<Online />} />
          <Route path="/serch-reader" element={<SerchReader />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
