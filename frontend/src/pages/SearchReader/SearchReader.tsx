import React, { useEffect } from "react";
import SearchReader from "../../components/SearchReader/SearchReader";

const SerchReader: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-tl from-rose-600 from-0% via-fuchsia-900 to-purple-900 h-fit ">
      <SearchReader />
    </div>
  );
};

export default SerchReader;
