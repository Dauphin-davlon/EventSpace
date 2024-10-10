// src/components/EventsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getEventsByLocation } from "../services/EventsAPI";

const EventsPage = () => {
  const { locationId } = useParams(); // Get the location ID from the URL
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5000/api/events/${locationId}`
        // );
        // setEvents(response.data);
        const data = await getEventsByLocation(locationId);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [locationId]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Events for Location {locationId}</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} style={eventStyle}>
            <h4>{event.name}</h4>
            <p>{event.description}</p>
          </div>
        ))
      ) : (
        <p>No events available for this location.</p>
      )}
    </div>
  );
};

// Styles for the event display
const eventStyle = {
  marginTop: "10px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  backgroundColor: "#e6f7ff",
};

export default EventsPage;
