import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Wallpaper({ locations }) {
  const [restaurent, setRestaurent] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();

  const handleLocation = (e) => {
    const locationid = e.target.value;
    sessionStorage.setItem('locationid',locationid)

    if (!locationid) {
      setRestaurent([]);
      setSelectedName("");
      return;
    }

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}/restaurant/${locationid}`,
      headers: { "Content-Type": "application/json" }, 
    })
      .then((response) => {
        console.log(response.data);
        setRestaurent(response.data.restaurent || []);
        setSelectedName(""); // Clear selected restaurant when location changes
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setRestaurent([]);
      });
  };

  const handleRestaurantSelect = (e) => {
    const value = e.target.value;
    setSelectedName(value); // <-- set the selected value

    // Find the selected restaurant by name
    const selected = restaurent.find(
      (r) => r.name.toLowerCase() === value.toLowerCase()
    );

    // Navigate if a matching restaurant is found
    if (selected) {
      navigate(`/details/${selected._id}`);
    }
  };

  return (
    <div className="m1">
      <Header />

      <div className="idiv">
        <div className="h1">
          <h1 className="t1">Find the best Restaurants, Cafes, & Bars</h1>
        </div>

        <div className="inputdiv">
          <div className="inputs">
            <select className="s1" onChange={handleLocation} defaultValue="">
              <option value="">-- Select Location --</option>
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.name}, {loc.city}
                  </option>
                ))
              ) : (
                <option disabled>No locations available</option>
              )}
            </select>

            <input
              className="s2"
              list="datalist"
              value={selectedName}
              onChange={handleRestaurantSelect}
              placeholder="Select From Restaurants"
            />
            <datalist id="datalist">
              {restaurent.length === 0 ? (
                <option disabled>No restaurants available</option>
              ) : (
                restaurent.map((res) => (
                  <option key={res._id} value={res.name} />
                ))
              )}
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;
