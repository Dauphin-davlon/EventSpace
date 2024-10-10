// import React, { useState } from "react";
// import axios from "axios"; // Use Axios or fetch

// const LocationCard = ({ location }) => {
//   const [events, setEvents] = useState([]);
//   const [showEvents, setShowEvents] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchEvents = async () => {
//     if (showEvents) {
//       setShowEvents(false); // Hide events if already shown
//       return;
//     }
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/events/${location.id}`
//       );
//       setEvents(response.data);
//       setShowEvents(true);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="location-card" style={cardStyle}>
//       <h3>{location.name}</h3>
//       <button onClick={fetchEvents}>Show Events</button>

//       {loading && <p>Loading events...</p>}

//       {showEvents && (
//         <div className="events">
//           {events.length > 0 ? (
//             events.map((event) => (
//               <div key={event.id} style={eventStyle}>
//                 <h4>{event.name}</h4>
//                 <p>{event.description}</p>
//               </div>
//             ))
//           ) : (
//             <p>No events available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Simple styles
// const cardStyle = {
//   border: "1px solid #ccc",
//   padding: "20px",
//   borderRadius: "8px",
//   marginBottom: "10px",
//   cursor: "pointer",
//   backgroundColor: "#f0f8ff",
// };

// const eventStyle = {
//   marginTop: "10px",
//   padding: "10px",
//   border: "1px solid #ddd",
//   borderRadius: "5px",
//   backgroundColor: "#e6f7ff",
// };

// export default LocationCard;

import React from "react";
import { Link } from "react-router-dom"; // Import Link

const LocationCard = ({ location }) => {
  return (
    <div className="location-card" style={cardStyle}>
      <h3>{location.name}</h3>
      <Link to={`/events/${location.id}`}>
        <button>Show Events</button>
      </Link>
    </div>
  );
};

// Styles
const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "10px",
  cursor: "pointer",
  backgroundColor: "#f0f8ff",
};

export default LocationCard;
