import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../Pages/CategoryPage/categoryPage.css";
import "../../Component/Product/Product.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);

  const getCategoryData = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/new-lanch-product"
      );

      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          color: "rgb(18, 80, 141)",
          fontFamily: "inherit",
          fontWeight: "600",
          padding: "1rem",
          fontSize: { xs: "25px", md: "30px", sm: "30px" },
          margin: { xs: "0", sm: "0", md: "1" },
        }}
        mb={2}
      >
        New Launches
      </Typography>
      <div style={{ background: "#181d45", padding: "2rem" }}>
        <Container style={{ marginBottom: "1rem" }}>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="slick-slide-custom">
                <Link to={`our-category/category/product-name/${item._id}`}>
                  <div className="box">
                    <img
                      className="product"
                      width="100%"
                      style={{ height: "200px" }}
                      src={
                        item.image1.includes("cloudinary")
                          ? item.image
                          : `https://api.assortsmachinetools.com/${item.image1}`
                      }
                      alt={`${item.productname.slice(0, 20)}...`}
                    />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        margin: 0,
                        padding: "5px",
                        textAlign: "center",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      mt={2}
                      variant="body2"
                    >
                      {item.productname}
                    </Typography>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </Container>
      </div>
    </>
  );
};

export default Product;
