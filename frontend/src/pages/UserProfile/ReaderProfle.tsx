import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero1 from "../../components/ReaderProfile/Hero1";
import Hero2 from "../../components/ReaderProfile/Hero2";
import Hero3 from "../../components/ReaderProfile/Hero3";
import Hero4 from "../../components/ReaderProfile/Hero4";
import CardBackground from '../../assets/img/card.png';
import { divide } from "lodash";

const { readerDetail } = require("../../API/api.ts");

interface ShopInfo {
  address: string;
  phone: string;
  readerId: number;
  shopId: number;
  shopName: string;
  latitude: number;
  longitude: number;
}

interface Data {
  memberId?: number;
  name?: string;
  keyword?: string;
  intro?: string;
  rating?: number;
  grade?: string;
  price?: number;
  profileUrl?: string | null;
  reviews?: Array<any>;
  shopInfo?: ShopInfo | null;
  allConsultings?: number;
  allReservations?: number;
  afterReader?: number;
}

const SeekerMypage: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const { readerId } = useParams<{ readerId: string }>();

  useEffect(() => {
    const loadReaders = async () => {
      try {
        const data = await readerDetail(readerId);
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadReaders();
  }, [readerId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ backgroundColor: "#1A0E2D" }}>
        <Hero1
          id={readerId || ""}
          name={data.name || ""}
          profileUrl={data.profileUrl || ""}
          grade={data.grade || ""}
        />
        <Hero2
          name={data.name || ""}
          reviews={data.reviews || []}
          allConsultings={data.allConsultings || 0}
          allReservations={data.allReservations || 0}
          afterReader={data.afterReader || 0}
        />

      <div className="bg-black">
        <Hero3 intro={data.intro || ""} reviews={data.reviews || []} />
      
      <Hero4 shopInfo={data.shopInfo || null} name={data.name || ""}/>
      </div>
    </div>
    </div>
  );
};

export default SeekerMypage;
