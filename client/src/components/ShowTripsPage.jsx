import { useState, useEffect } from "react";
import axios from "axios";

function ShowTripsPage() {
  const [trips, setTrips] = useState([]);
  const [searchTrips, setSearchTrips] = useState("");

  const getTripsData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTrips}`
      );
      setTrips(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTripsData();
  }, [searchTrips]);

  return (
    <>
      <div className="bg-gray-50 font-sans">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-blue-500 text-4xl font-bold">เที่ยวไหนดี</h1>
          <p className="text-gray-500">ค้นหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            className="mt-4 px-4 py-2 border rounded w-1/2 focus:outline-none"
            onChange={(e) => {
              setSearchTrips(e.target.value);
            }}
          />
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          {trips.length > 0 ? (
            trips.map((trip, index) => (
              <div key={trip.eid} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex space-x-6">
                  {/* Main Image */}
                  <img
                    src={trip.photos[0]}
                    alt="Main"
                    className="w-1/3 h-auto rounded-lg object-cover"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{trip.title}</h2>
                    <p className="text-gray-600 mt-2">
                      {trip.description && trip.description.length > 100
                        ? `${trip.description.slice(0, 100)}...`
                        : trip.description}
                    </p>
                    <a
                      href={trip.url}
                      target="_blank"
                      className="text-blue-500 mt-2 inline-block"
                    >
                      อ่านต่อ
                    </a>

                    {/* Tags */}
                    <div className="mt-4 flex space-x-2 text-sm text-gray-500">
                      <span>หมวด</span>
                      {trip.tags.map((tag, tagIndex) => (
                        <a
                          key={tagIndex}
                          href="#"
                          className="text-blue-500 hover:underline"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>

                    {/* Sub Images */}
                    <div className="mt-4 flex space-x-2">
                      {trip.photos.slice(1).map((subImage, subIndex) => (
                        <img
                          key={subIndex}
                          src={subImage}
                          alt={`Thumbnail ${subIndex + 1}`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Link Icon */}
                  <div className="flex items-center">
                    <a
                      href={trip.url}
                      target="_blank"
                      className="text-blue-500 text-2xl"
                    >
                      🔗
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่มีข้อมูลที่จะแสดง</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowTripsPage;
