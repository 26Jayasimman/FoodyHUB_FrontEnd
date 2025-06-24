import React, { useEffect, useState, useCallback } from "react";
import "../Styles/Filter.css";
import Header from "./Header";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

function Filter() {
  const location = useLocation();
  const [hotel, setHotel] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selecter, setSelecter] = useState("");
  const [cuisine, setCuisine] = useState([]);
  const [cost, setCost] = useState([]);
  const [sort, setSort] = useState(1); // 1 = low to high, -1 = high to low
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;
  const navigate=useNavigate()
  
  const applyFilter = useCallback(() => {
    const params = queryString.parse(location.search);
    const mealtype = params.mealtypes || sessionStorage.getItem("mealtype");
    const locationid =
      selecter || params.location || sessionStorage.getItem("locationid");

    if (mealtype) sessionStorage.setItem("mealtype", mealtype);
    if (locationid) sessionStorage.setItem("locationid", locationid);

    const filterObject = {
      mealtype: Number(mealtype),
      location: Number(locationid),
      cuisine,
      cost,
      sort,
      page,
      limit,
    };

    console.log("Sending to backend:", filterObject);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/filter`, filterObject)
      .then((res) => {
        setHotel(res.data.restaurants || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => {
        console.error(err);
        setHotel([]);
      });
  }, [location.search, selecter, cuisine, cost, sort, page]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/location`)
      .then((res) => setLocations(res.data.locations || []))
      .catch((err) => console.error(err));

    const params = queryString.parse(location.search);
    const mealtype = params.mealtypes || sessionStorage.getItem("mealtype");
    const locationid = params.location || sessionStorage.getItem("locationid");

    if (mealtype) sessionStorage.setItem("mealtype", mealtype);
    if (locationid && !selecter) {
      setSelecter(locationid);
    }
  }, []);

  useEffect(() => {
    applyFilter();
  }, [applyFilter, page]);

  const handleSelectfunction = (e) => {
    setSelecter(e.target.value);
    setPage(1);
  };

  const handleCuisineChange = (id) => {
    setCuisine((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setPage(1);
  };

  const handleCostChange = (range) => {
    const found = cost.find(
      (r) => r.lcost === range.lcost && r.hcost === range.hcost
    );
    setCost((prev) =>
      found
        ? prev.filter(
            (r) => !(r.lcost === range.lcost && r.hcost === range.hcost)
          )
        : [...prev, range]
    );
    setPage(1);
  };

  const handleSortChange = (val) => {
    setSort(val);
    setPage(1);
  };

  const isCostChecked = (range) =>
    cost.some((r) => r.lcost === range.lcost && r.hcost === range.hcost);

  const handlerestaurentNavigate =(id)=>{
    navigate(`/details/${id}`)
    
  }

  return (
    <>
      <Header />
      <div className="box1">
        <div className="g1">
          <div className="box2">
            <h1 className="fh">Filters</h1>
            <span>
              <button
                className="btn-primary"
                id="reset-filter"
                onClick={() => {
                  setCuisine([]);
                  setCost([]);
                  setSort(1);
                  setSelecter("");
                  setPage(1);
                  setTimeout(() => {
                    applyFilter();
                  }, 0);
                }}
              >
                Clear Filters
              </button>
            </span>
            <h4>Select Location</h4>
            <select
              id="dl"
              className="i1"
              onChange={handleSelectfunction}
              value={selecter || ""}
            >
              <option value={""}>--- select Location ---</option>
              {locations.length > 0 ? (
                locations.map((item) => (
                  <option key={item.location_id} value={item.location_id}>
                    {item.name}, {item.city}
                  </option>
                ))
              ) : (
                <option>No Restaurant Available</option>
              )}
            </select>

            <div>
              <h1 className="fh2">Cuisine</h1>
              <div className="cb1">
                {[1, 2, 3, 4, 5].map((id, i) => (
                  <div key={id}>
                    <input
                      type="checkbox"
                      id={`it${id}`}
                      onChange={() => handleCuisineChange(id)}
                      checked={cuisine.includes(id)}
                    />
                    <label htmlFor={`it${id}`}>
                      {
                        [
                          "North Indian",
                          "South Indian",
                          "Chinese",
                          "Fast Food",
                          "Street Food",
                        ][i]
                      }
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="fh2">Cost for Two</h1>
              <div className="cb1">
                <div>
                  <input
                    type="checkbox"
                    id="it6"
                    onChange={() => handleCostChange({ lcost: 0, hcost: 500 })}
                    checked={isCostChecked({ lcost: 0, hcost: 500 })}
                  />
                  <label htmlFor="it6">Less than 500</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="it7"
                    onChange={() =>
                      handleCostChange({ lcost: 501, hcost: 1000 })
                    }
                    checked={isCostChecked({ lcost: 501, hcost: 1000 })}
                  />
                  <label htmlFor="it7">501 to 1000</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="it8"
                    onChange={() =>
                      handleCostChange({ lcost: 1001, hcost: 1500 })
                    }
                    checked={isCostChecked({ lcost: 1001, hcost: 1500 })}
                  />
                  <label htmlFor="it8">1001 to 1500</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="it9"
                    onChange={() =>
                      handleCostChange({ lcost: 1501, hcost: 2000 })
                    }
                    checked={isCostChecked({ lcost: 1501, hcost: 2000 })}
                  />
                  <label htmlFor="it9">1501 to 2000</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="it10"
                    onChange={() =>
                      handleCostChange({ lcost: 2001, hcost: 50000 })
                    }
                    checked={isCostChecked({ lcost: 2001, hcost: 50000 })}
                  />
                  <label htmlFor="it10">2000+</label>
                </div>
              </div>
            </div>

            <div>
              <h1 className="fh2">Sort</h1>
              <div className="ra">
                <input
                  type="radio"
                  name="sort"
                  id="r1"
                  onChange={() => handleSortChange(1)}
                  checked={sort === 1}
                />
                <label htmlFor="r1">Price low to high</label>
                <br />
                <input
                  type="radio"
                  name="sort"
                  id="r2"
                  onChange={() => handleSortChange(-1)}
                  checked={sort === -1}
                />
                <label htmlFor="r2">Price high to low</label>
              </div>
            </div>
          </div>
        </div>

        <div className="box3">
          {hotel.length > 0 ? (
            hotel.map((item) => (
              <div className="box4" key={item._id} onClick={()=>handlerestaurentNavigate(item._id)}>
                <div className="box41">
                  <div className="box42">
                    <img
                      className="src2"
                      src={item.image || "No image"}
                      alt="restaurant"
                    />
                  </div>
                  <div className="box43">
                    <br />
                    <h1>{item.name}</h1>
                    <br />
                    <h3>{item.city}</h3>
                    <div>{item.locality}</div>
                  </div>
                </div>
                <hr className="line"/>
                <div className="box44">
                  <p>CUISINE : {item.cuisine.map((c) => c.name).join(", ")}</p>
                  <p>COST for TWO : ₹{item.min_price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="norestaurents">No Restaurants Available...</div>
          )}

          {hotel.length > 0 && (
            <div className="box6">
              <button
                className="btn-primary"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn-primary ${page === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn-primary"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Filter;
