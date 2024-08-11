import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/UserAuth/Login";
import Navbar from "./components/Navbar";
import Offline from "./pages/OfflineTarot";
import SerchReader from "./pages/SearchReader/SearchReader";
import Community from "./pages/Community/PostListPage";
import SignUp from "./pages/UserAuth/Signup";
import Matching from "./pages/Matching/Matching";
import Graphic from "./pages/PlayTarot/Graphic";
import ChangePwd from "./pages/UserAuth/ChangePwd";
import FindPwd from "./pages/UserAuth/FindPwd";
import ReaderProfile from "./pages/UserProfile/ReaderProfle";
import PostDetail from "./components/Community/PostDetail";
import CreatePostPage from "./pages/Community/CreatePostPage";
import TarotResult from "./pages/TarotResult/TarotResult";
import Play from "./pages/PlayTarot/Play";
import CreateReader from "./pages/CreateReader/CreateReader";
import SeekerMypage from "./pages/UserProfile/SeekerMypage";
import ReaderMypage from "./pages/UserProfile/ReaderMypage";
import Booking from "./pages/Booking/Booking";
import WebRTCpage from "./pages/WebRTC/WebRTCpage";
import WebRTCTest from "./pages/WebRTC/WebRTCtest";
import ImageUpload from "./pages/Test/ImageUpload";

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
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/tarot-result" element={<TarotResult />} />
          <Route path="/play" element={<Play />} />
          <Route path="/create-reader" element={<CreateReader />} />
          <Route path="/seeker-mypage" element={<SeekerMypage />} />
          <Route path="/reader-mypage" element={<ReaderMypage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/webrtc" element={<WebRTCpage />} />
          <Route
            path="/rtcTest"
            element={<WebRTCTest token={""} name={""} type={""} />}
          />
          <Route path="/test" element={<ImageUpload/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
