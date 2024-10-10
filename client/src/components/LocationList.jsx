// import React, { useState } from 'react';
// import LocationCard from './LocationCard';

// const locationData = [
//   { id: 1, name: 'New York', description: 'Famous for events in Times Square.' },
//   { id: 2, name: 'Los Angeles', description: 'Popular for Hollywood events.' },
//   { id: 3, name: 'Chicago', description: 'Known for its theaters and music festivals.' },
//   { id: 4, name: 'San Francisco', description: 'Iconic for tech conferences.' },
//   { id: 5, name: 'Miami', description: 'Hotspot for art fairs and nightlife.' }
// ];

// const LocationList = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const toggleLocation = (id) => {
//     if (selectedLocation === id) {
//       setSelectedLocation(null);
//     } else {
//       setSelectedLocation(id);
//     }
//   };

//   return (
//     <div className="location-list">
//       {locationData.map((location) => (
//         <LocationCard
//           key={location.id}
//           location={location}
//           isSelected={selectedLocation === location.id}
//           onClick={() => toggleLocation(location.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default LocationList;

import React, { useState, useEffect } from "react";
import axios from "axios"; // Use Axios or fetch
import LocationCard from "./LocationCard";
import { getAllLocations } from "../services/LocationsAPI";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/locations"); // Or use fetch()
        // setLocations(response.data);
        // setLoading(false);
        const data = await getAllLocations();
        setLocations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <p>Loading locations...</p>;
  }

  return (
    <div className="location-list">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationList;
