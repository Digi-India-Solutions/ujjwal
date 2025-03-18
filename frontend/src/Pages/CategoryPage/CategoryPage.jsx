import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Modal, Typography } from "@mui/material";
import "../CategoryPage/categoryPage.css";
import image1 from "../../images/LatheMachineaccessories/LatheTailstockDieHolder.jpg";
import image2 from "../../images/MillingMachineTools/Drill Sleeves.jpg";
import image3 from "../../images/Vice&WorkHolding/Bench Vises.jpg";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const getApiData = async () => {
    try {
      let res = await axios.get("https://api.assortsmachinetools.com/api/subcategory");
      const newData = res.data.data;

      const groupedData = newData.reduce((acc, item) => {
        if (!acc[item.categoryname]) {
          acc[item.categoryname] = [];
        }
        acc[item.categoryname].push(item);
        return acc;
      }, {});

      const groupedArray = Object.keys(groupedData).map(key => ({
        name: key,
        items: groupedData[key]
      })).reverse();

      setCategories(groupedArray);
    } catch (error) {
      console.log(error);
    }
  };


  const getCategorydata = async () => {
    try {
      let res = await axios.get("https://api.assortsmachinetools.com/api/category");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
    getCategorydata();
  }, []);

  const handleMouseEnter = index => {
    setActiveCategory(index);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const [newProduct, setNewProduct] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const getApiDataNewLanch = async () => {
    try {
      const res = await axios.get("https://api.assortsmachinetools.com/api/new-lanch");
      if (res.status === 200) {
        const data = res.data;
        const filterData = data.filter((x) => x.active === true);
        setNewProduct(filterData.length > 0 ? filterData : []); // Set as an array, even if empty
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getApiDataNewLanch()
  }, [newProduct.length])



  // Handle next and previous buttons
  const handleNext = () => {
    if (currentIndex + 2 < newProduct.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  // Slice products to show only 2 at a time
  const displayedProducts = newProduct.slice(currentIndex, currentIndex + 2);

  // const newProduct = [
  //   {
  //     image: image1,
  //     description: "Ultra Precision Working Block Pairs",
  //   },
  //   {
  //     image: image2,
  //     description: "Ultra Precision Working Block Pairs",
  //   },
  //   {
  //     image: image3,
  //     description: "Ultra Precision Working Block Pairs",
  //   },
  // ];

  return (
    <Container maxWidth="xl">
      <Typography
        mt={2}
        style={{
          textAlign: "center",
          color: "rgb(18 80 141)",
          fontFamily: "poppins",
          fontWeight: "600",
          margin: "0",
          padding: "1rem",
        }}
        mb={2}
        sx={{ fontSize: { xs: "25px", md: "30px", sm: "30px" } }}
      >
        Category
      </Typography>
      <Grid container spacing={3}>
        {/* Sidebar with categories and subcategories */}
        <Grid item md={3} xs={12}>
          <div className="sidebar" onMouseLeave={handleMouseLeave}>
            {categories.map((category, index) => (
              <div
                key={index}
                className="sidebar-category"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {category.name}
                {activeCategory === index && (
                  <ul className="sidebar-items">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <KeyboardDoubleArrowRightIcon />
                        <Link to={`/our-category/products/${item._id}`}>
                          {item.subcategoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Grid>

        {/* Main content area with product cards */}
        <Grid item md={7} xs={12}>
          <div className="categoryImage">
            <div className="overlay">
              <Container>
                <Grid container spacing={2}>
                  {data.map((item, index) => (
                    <Grid item xs={6} sm={6} md={4} key={index}>
                      <article className="card">
                        <Link to={`/our-category/products/${item._id}`}>
                          <div className="card__img">
                            <img src={`https://api.assortsmachinetools.com/${item.image}`} alt={item.categoryname} />
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
                            <p className="bottomContent">
                              {item.categoryname.length > 15
                                ? `${item.categoryname.substring(0, 15)}...`
                                : item.categoryname}
                            </p>
                          </div>
                        </Link>
                      </article>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          </div>
        </Grid>


        {/* New Product Launch Section */}
        <Grid item md={2} xs={12} p={0}>
          <div className="newLaunch">
            <Typography
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              New Product Launch
            </Typography>

            {newProduct && newProduct.length > 0 ? (
              <div>
                {displayedProducts?.map((product, index) => (
                  <div key={index} className="productCard" style={{ marginBottom: "0px", padding: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{ borderRadius: "10px", cursor: "pointer" , height: "120px" , width: "120px" }}
                        src={`https://api.assortsmachinetools.com/${product.image}`}
                        alt="New Launch Product"
                        onClick={() => handleOpenModal(product)}
                      />
                    </div>
                    <p style={{ textAlign: "center", margin: "10px 0" }}>
                      {product.productName}
                    </p>
                    <div className="launch-buttons">
                      <button className="viewButton" onClick={() => handleOpenModal(product)}>
                        View
                      </button>
                      <Link to="/contact">
                        <button className="viewButton">Enquiry Now</button>
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#181D45",
                      color: "White",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex + 2 >= newProduct.length}
                    style={{
                      backgroundColor: "#181D45",
                      color: "White",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      cursor: currentIndex + 2 >= newProduct.length ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ textAlign: "center", margin: "20px" }}>No Products Available</p>
            )}

            {/* Modal Component */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="product-modal-title"
              aria-describedby="product-modal-description"
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  padding: "20px",
                  maxWidth: "80%",
                  maxHeight: "80%",
                  overflow: "auto",
                }}
              >
                {selectedProduct && (
                  <>
                    <img
                      src={`https://api.assortsmachinetools.com/${selectedProduct.image}`}
                      alt="Product"
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Typography variant="body1" style={{ marginTop: "10px", textAlign: "center" }}>
                      {selectedProduct.description}
                    </Typography>
                  </>
                )}
              </div>
            </Modal>
          </div>
        </Grid>

      </Grid>
    </Container>
  );
};

export default CategoryPage;
