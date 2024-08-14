import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/UserAuth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import Booking from "./pages/Booking/BookingPage";
import WebRTCpage from "./pages/WebRTC/WebRTCpage";
import WebRTCTest from "./pages/WebRTC/WebRTCtest";
import ImageUpload from "./pages/Test/ImageUpload";
import Admin from "./pages/Admin/AdminPage";
import AdminRoute from "./components/AdminRoute";
import ReaderRoute from "./components/ReaderRouteProps";
import Error from "./components/PermitionError";
import NotFoundError from "./components/NotFoundError";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/online" element={<Matching />} />
          <Route path="/online/graphic" element={<Graphic />} />
          <Route path="/search-reader" element={<SerchReader />} />
          <Route path="/community" element={<Community />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/change-pwd" element={<ChangePwd />} />
          <Route path="/findpwd" element={<FindPwd />} />
          <Route path="/reader-profile/:readerId" element={<ReaderProfile />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/tarot-result" element={<TarotResult />} />
          <Route path="/play" element={<Play />} />
          <Route path="/create-reader" element={<CreateReader />} />
          <Route path="/seeker-mypage" element={<SeekerMypage />} />
          <Route
            path="/reader-mypage"
            element={<ReaderRoute element={<ReaderMypage />} />}
          />
          <Route path="/booking" element={<Booking />} />
          <Route path="/webrtc" element={<WebRTCpage />} />
          <Route path="/rtcTest" element={<WebRTCTest/>} />
          <Route path="/test" element={<ImageUpload />} />
          <Route path="/error" element={<Error />} />

          {/* AdminRoute 사용 */}
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="*" element={<NotFoundError />} />
        </Routes>
        <FooterWrapper /> {/* FooterWrapper 사용 */}
      </div>
    </Router>
  );
};

// Footer 조건부 렌더링을 위한 컴포넌트
const FooterWrapper: React.FC = () => {
  const location = useLocation();
  const shouldHideFooter =
    location.pathname.includes("seeker-mypage") ||
    location.pathname.includes("reader-mypage") ||
    location.pathname.includes("rtcTest") ||
    location.pathname.includes("webrtc");

  return <>{!shouldHideFooter && <Footer />}</>;
};

export default App;
