import React, { useEffect } from "react";
import Hero1 from "../components/Home/Hero1";
import Hero2 from "../components/Home/Hero2";
import Hero3 from "../components/Home/Hero3";
import Hero4 from "../components/Home/Hero4";
import Hero5 from "../components/Home/Home5";
import Test from "../components/Home/Test";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <Hero1></Hero1>
      {/* <Test /> */}
      <Hero2></Hero2>
      <Hero4></Hero4>
      <Hero5></Hero5>
      <Hero3></Hero3>
    </div>
  );
};

export default Home;
