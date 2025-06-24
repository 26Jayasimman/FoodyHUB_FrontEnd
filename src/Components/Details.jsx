import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";
import "../Styles/Detail.css";
import Modal from "react-modal";

Modal.setAppElement('#root');

function Details() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectRestaurent, setSelectRestaurent] = useState(null);
  const { id } = useParams();
  const [menuModal, setMenuModal] = useState(false);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState({});

  // console.log("Details.jsx: fetching restaurant ID:", id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/details/${id}`)
      .then((response) => {
         console.log("API response:", response.data);
        setSelectRestaurent(response.data.restaurent);
      })
      .catch((err) => {
        console.error("Error fetching restaurant details:", err);
      });
  }, [id]);

  if (!selectRestaurent) return <div>Loading...</div>;

  const handleMenuModal = () => {
    setMenuModal(true);
  };

  const menuClose = () => {
    setMenuModal(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      height: "96%",
      width: "85%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#035d5e",
      color: "white",
      zIndex: 9999,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)", // fallback blur
      backdropFilter: "blur(8px)", // actual blur
      WebkitBackdropFilter: "blur(8px)", // for Safari
      zIndex: 9998,
    },
  };

  const handleMenus = (restaurant_id) => {
    // console.log("Calling menu API with ID:", selectRestaurent.restaurant_id);

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}/${restaurant_id}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => setMenu(response.data.menufile))
      .catch((err)=>{console.log(err);
      });

    handleMenuModal(true);
  };

  const increaseQuantity = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const totalItems = Object.values(quantity).reduce((acc, val) => acc + val, 0);

  const totalAmount = menu.reduce((acc, item) => {
    const qty = quantity[item._id] || 0;
    return acc + qty * item.price;
  }, 0);

  const handlePayment = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, {
      amount: totalAmount,
    });

    const options = {
      key: "rzp_test_98guRxGmKkvzn7",
      amount: res.data.amount,
      currency: "INR",
      order_id: res.data.id,
      description:"For My Website Testing",
      name: "My Website",
      handler: function (response) {
        alert("Payment Success !");
        console.log(response);
      },
      prefill: {
      name: "Jai",
      email: "test@example.com",
      contact: "9876543210",
    },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <Header />

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          
          <div className="carousel-item active">
            <img
              src={"/assets/slide2.jpg"}
              className="d-block w-100"
              alt="Cafe interior with vintage decor"
            />
          </div>

          <div className="carousel-item">
            <img
              src={"/assets/slide5.jpg"}
              className="d-block w-100"
              alt="Pastries on a white plate"
            />
          </div>
          <div className="carousel-item">
            <img
              src={"/assets/slide6.jpg"}
              className="d-block w-100"
              alt="Pastries on a white plate"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="tbcc">
        <h1 className="rest-name">{selectRestaurent.name}</h1>
        <button
          className="place-orderlogin"
          onClick={() => {
            handleMenus(selectRestaurent.restaurant_id);
          }}
        >
          Place Order Online
        </button>
      </div>

      {/* Tab Section */}
      <div className="container1">
        <div className="title">{selectRestaurent.name}</div>

        <div className="header">
          <div
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => setActiveTab("Overview")}
          >
            Overview
          </div>
          <div
            className={activeTab === "Contact" ? "active" : ""}
            onClick={() => setActiveTab("Contact")}
          >
            Contact
          </div>
        </div>

        <div className="indicator">
          <div style={{ left: activeTab === "Overview" ? "0%" : "50%" }}></div>
        </div>

        <div className="body">
          {activeTab === "Overview" && (
            <div className="active">
              <h1>About this Place</h1>
              <h2>Cuisine</h2>
              <p>
                {Array.isArray(selectRestaurent.cuisine)
                  ? selectRestaurent.cuisine.map((c) => c.name).join(", ")
                  : "Cuisine details not available"}
              </p>

              <h2>Average Cost</h2>
              <p>₹{selectRestaurent.min_price || "Not available"}</p>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="active">
              <h2>Phone Number</h2>
              <p>{selectRestaurent.contact_number || "Not available"}</p>
              <h2>{selectRestaurent.name}</h2>
              <address>
                {selectRestaurent.locality}
                <br />
                {selectRestaurent.city}
                <br />
                {selectRestaurent.rating_text}
              </address>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={menuModal} style={customStyles}>
        <div className="menu-margin">
          <div className="menu-heading">
            <h2>MENU</h2>
          </div>

          <button className="closemenu" onClick={menuClose}>
            close
          </button>
        </div>

        <div className="food-maindiv">
          <div className="food-secdiv row ">
            {menu.map((item) => (
              <div
                className="card d-flex flex-row col-12 col-sm-12 col-md-6 col-lg-4 "
                key={item._id}
              >
                <div className="card-img">
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="card-img"
                  />
                </div>
                <div className="c-body">
                  <div className="food-name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="food-content d-flex flex-row">
                    <div className="price">
                      <h4>Rs.{item.price}</h4>
                    </div>
                    <div className="adding d-flex flex-row">
                      <div className="minus">
                        <i
                          className="fa-solid fa-minus fa-2x "
                          id="iconminus"
                          style={{ color: "#ff0000", cursor: "pointer" }}
                          onClick={() => decreaseQuantity(item._id)}
                        ></i>
                      </div>
                      <div className="counting">
                        <input
                          type="text"
                          value={quantity[item._id] || 0}
                          className="count"
                          readOnly
                        />
                      </div>

                      <div className="plus">
                        <i
                          className="fa-solid fa-plus fa-2x"
                          id="iconplus"
                          style={{ color: "#ff0000", cursor: "pointer" }}
                          onClick={() => increaseQuantity(item._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom-field">
            <div className="total-items">
              <h1>Items</h1>
              <input
                type="number"
                className="total-itemcount"
                value={totalItems}
                readOnly
              />
            </div>

            <div className="total-amount">
              <h1>Bill</h1>
              <input
                type="number"
                className="total-itemcount"
                value={totalAmount}
                readOnly
              />
            </div>

            <div className={`pay-button ${totalAmount===0?"disabled":""}`} onClick={totalAmount>0 ? handlePayment:null}>
              Payment
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Details;
