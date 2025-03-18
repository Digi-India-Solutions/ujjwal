import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import "../CategoryPage/categoryPage.css";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Metatag from "../../Component/MetaTags/Metatag";

const AllProductPage = () => {
  const { _id } = useParams();
  const [data, setData] = useState([]);
  const [catedata, setCatedata] = useState({});
  const [subcatedata, setSubcatedata] = useState({});

  const getCategorydata = async () => {
    try {
      let res = await axios.get(`https://api.assortsmachinetools.com/api/category/${_id}`);
      setCatedata(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategorydata = async () => {
    try {
      let res = await axios.get(`https://api.assortsmachinetools.com/api/subcategory/${_id}`);
      setSubcatedata(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProductData = async () => {
    try {
      let res = await axios.get('https://api.assortsmachinetools.com/api/product');
      const resData = res.data.data;
      const filterData = resData.filter((item) => {
        return (
          item.categoryname === catedata.categoryname ||
          item.subcategoryName === subcatedata.subcategoryName
        );
      });

      setData(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorydata();
    getSubCategorydata();
  }, [_id]);

  useEffect(() => {
    if (catedata.categoryname || subcatedata.subcategoryName) {
      getAllProductData();
    }
  }, [catedata, subcatedata]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
              mb={2}>
              <u>All Products</u>
            </Typography>
            {
              data.length > 0 ? <Grid container spacing={2}>
                {data.map((item, index) => (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    <article className="card">
                      <Link to={`/our-category/category/product-name/${item._id}`}>
                        <div className="card__img">
                          <img src={`https://api.assortsmachinetools.com/${item.image1}`} alt={item.name} />
                        </div>
                        <div className="card__name">
                          <p>{item.categoryname}</p>
                        </div>
                        <div
                          className="CardContentBottom"
                          style={{
                            textAlign: "center",
                            position: "relative",
                            fontSize: "12px",
                          }}
                        >
                          <p style={{ color: 'white' }}>{item.productname}</p>
                        </div>
                      </Link>
                    </article>
                  </Grid>
                ))}
              </Grid> : <Typography variant="h4" color={"white"} textAlign={"center"} mt={5}>Currently Out of Stock</Typography>
            }
          </Container>
        </div>
      </div>
    </>
  );
};

export default AllProductPage;
