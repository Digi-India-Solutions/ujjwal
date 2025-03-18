import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Typography } from "@mui/material";
import "../ProductPage/ProductPage.css";
import axios from "axios";

function ProductPage() {
  const [data, setData] = useState([]);

  const getBannerData = async () => {
    try {
      let res = await axios.get("http://localhost:8001/api/banner");
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const settingsCarousel = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autospeed: 2000,
    speed: 500,
  };

  useEffect(() => {
    getBannerData();
  }, []);

  return (
    <div>
      <Slider style={{ width: "100%", overflow: "hidden" }} {...settingsCarousel}>
        {data.map((banner, index) => (
          <div key={index}>
            <img width={"100%"} src={`http://localhost:8001/${banner.image}`} alt={`banner-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductPage;
