import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


function Home() {
  const [search,setSearch]=useState('')
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const load_data = async () => {
    let response = await fetch("http://localhost:3000/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setfoodCat(response[1]);
    setfoodItem(response[0]);
  };

  useEffect(() => {
    load_data();
  }, []);
  return (
    <>
      <Navbar />
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit:"cover !important"}}
      >
        <div className="carousel-inner" id="carousel">
          <div
            className="carousel-caption"
            style={{ zIndex: "6" }}
          >
            <div className="d-flex justify-content-center">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
              />
                {/* <button
                  className="btn btn-outline-success text-white bg-success mx-2 my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://loremflickr.com/320/240/paneer"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://loremflickr.com/320/240/food"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://loremflickr.com/320/240/dosa"
              className="d-block w-100"
              alt="..."
              style={{filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
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
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodCat.length !== 0 &&
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length !==0 ? foodItem.filter((item)=>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).
                map((filteritems)=>{
                  return (
                    <div key={filteritems._id} className="col-12 col-md-6 col-lg-3 mx-4">
                        <Card filteritems={filteritems}> </Card>
                    </div>
                  )
                  
                }):null}

              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
}

export default Home;
