import React, { useState, useEffect } from "react";
import axios from "axios"; // Use Axios or fetch
import LocationCard from "./LocationCard";
import { getAllLocations } from "../services/LocationsAPI";
import "../styles/styles.css";

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
