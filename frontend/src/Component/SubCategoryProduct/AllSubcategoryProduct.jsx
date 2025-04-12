import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import "../../Pages/CategoryPage/categoryPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Metatag from "../../Component/MetaTags/Metatag";

const AllSubcategoryProduct = () => {
  const { subcategoryName } = useParams();
  const [data, setData] = useState([]);

  const getAllProductData = async () => {
    try {
      const res = await axios.get("https://api.assortsmachinetools.com/api/product");
    
      const resData = res.data.data;

      const filterData = resData.filter(
        (item) => item.subcategoryName?.toLowerCase().trim() === subcategoryName.toLowerCase().trim()
      );

      setData(filterData);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProductData();
  }, [subcategoryName]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Metatag
        title="Precision Machine Tools and Accessories - Quality Products by Assorts"
        description="Browse our extensive collection of precision machine tools, including lathe tool holders, rotary tables, and custom-designed accessories. Assorts offers high-quality products at competitive prices."
        keyword="Precision tools, lathe tool holders, rotary tables, custom machine tools, Assorts products, milling tools, cutting tools, DIY tools"
      />

      <div className="categoryImage">
        <div className="overlay">
          <Container>
            <Typography
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "poppins",
                fontWeight: "600",
              }}
              variant="h4"
              mb={2}
            >
              <u>{subcategoryName} Products</u>
            </Typography>

            {data.length > 0 ? (
              <Grid container spacing={2}>
                {data.map((item, index) => (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    <article className="card">
                      <Link to={`/our-category/category/product-name/${item._id}`}>
                        <div className="card__img">
                          <img
                            src={
                              item.image1.includes("cloudinary")
                                ? item.image1
                                : `https://api.assortsmachinetools.com/${item.image1}`
                            }
                            alt={item.name}
                          />
                        </div>
                        <div className="card__name">
                          <p style={{ margin: "0" }}>
                            {item.categoryname.length > 15
                              ? `${item.categoryname.substring(0, 15)}...`
                              : item.categoryname}
                          </p>
                        </div>
                        <div
                          className="CardContentBottom"
                          style={{
                            textAlign: "center",
                            position: "relative",
                            fontSize: "12px",
                          }}
                        >
                          <p style={{ color: "white" }}>{item.productname.length > 15
                              ? `${item.productname.substring(0, 15)}...`
                              : item.productname}</p>
                        </div>
                      </Link>
                    </article>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="h4"
                color={"white"}
                textAlign={"center"}
                mt={5}
              >
                Currently Out of Stock
              </Typography>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default AllSubcategoryProduct;


