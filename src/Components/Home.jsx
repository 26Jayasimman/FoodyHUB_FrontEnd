import React, { useEffect, useState } from "react";
import "../Styles/Wallpaper.css";
import Qsearch from "./QuickSearch";
import "../Styles/Qsearch.css";
import QSitems from "./QSearchItems";
import "../Styles/Qsearchitem.css";
import Wallpaper from "./wallpaper";
import axios from "axios";

function Home() {
  const [location, setLocation] = useState([]);
  const [mealtype, setMealtype] = useState([]);

  useEffect(() => {
    sessionStorage.clear();


    axios({
      method: "GET",
      url: "http://localhost:3001/location",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.data.locations);

        setLocation(response.data.locations);
      })
      .catch((err) => console.log(err));
    //for mealtypes
 axios({
      method: "GET",
      url: "http://localhost:3001/mealtypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data.mealtypes);

        setMealtype(response.data.mealtypes);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <>
      <Wallpaper locations={location} />
      <Qsearch />
      <div className="row b-0" 
      >
        <QSitems mealtypes={mealtype}/>
      </div>
    </>
  );
}

export default Home;
