import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Booking from "../../components/Booking/Booking";
import { validReservation } from "../../API/reservationsApi";
import { useLocation } from "react-router-dom";

interface Reservation {
  reservationId: number;
  seekerId: number;
  seekerName: string;
  seekerProfileUrl: string;
  readerId: number;
  readerProfileUrl: string;
  status: string;
  keyword: string;
  startTime: Date;
}

const BookingPage: React.FC = () => {
  const [reservationsResponse, setReservationsResponse] = useState<{
    status: number;
    code: string;
    message: string;
    data: Reservation[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const { id, name, profileUrl } = location.state || {};

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await validReservation(id);
        console.log(response);
        setReservationsResponse(response);
      } catch (err) {
        setError("예약 데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reservationsResponse ? (
        <Booking
          id={id}
          name={name}
          profileUrl={profileUrl}
          reservationsResponse={reservationsResponse}
        />
      ) : (
        <p>No reservations data available.</p>
      )}
    </div>
  );
};

export default BookingPage;
