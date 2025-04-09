import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Modal, Typography } from "@mui/material";
import "../CategoryPage/categoryPage.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getApiData = async () => {
    try {
      let res = await axios.get(
        "https://api.assortsmachinetools.com/api/subcategory"
      );
      const newData = res.data.data;

      const groupedData = newData.reduce((acc, item) => {
        if (!acc[item.categoryname]) {
          acc[item.categoryname] = [];
        }
        acc[item.categoryname].push(item);
        return acc;
      }, {});

      const groupedArray = Object.keys(groupedData)
        .map((key) => ({
          name: key,
          items: groupedData[key],
        }))
        .reverse();

      setCategories(groupedArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorydata = async () => {
    try {
      let res = await axios.get(
        "https://api.assortsmachinetools.com/api/category"
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
    getCategorydata();
  }, []);

  const handleMouseEnter = (index) => {
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

  const [newProduct, setNewProduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getApiDataNewLanch = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/new-lanch-product"
      );
      if (res.status === 200) {
        const data = res.data.data;
        const filterData = data.filter((x) => x.active === true);
        setNewProduct(filterData.length > 0 ? filterData : []); // Set as an array, even if empty
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiDataNewLanch();
  }, [newProduct.length]);

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

  const displayedProducts = newProduct.slice(currentIndex, currentIndex + 2);

  // ====== Enquiry form Modal =======

  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    productName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setEnquiryForm({ ...enquiryForm, [name]: value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://api.assortsmachinetools.com/api/create-enquiry",
        enquiryForm
      );
      if (res.status === 200) {
        toast.success("Enquiry sent successfully");
        setOpenEnquiryModal(false);
        setEnquiryForm({
          productName: " ",
          name: " ",
          email: " ",
          phone: " ",
          message: " ",
        });
      } else {
        toast.error("Failed to send enquiry");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                            <img
                              src={`https://api.assortsmachinetools.com/${item.image}`}
                              alt={item.categoryname}
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
                  <div
                    key={index}
                    className="productCard"
                    style={{ padding: "10px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{
                          borderRadius: "10px",
                          cursor: "pointer",
                          height: "120px",
                          width: "100%",
                        }}
                        src={
                          product.image1.includes("cloudinary")
                            ? product.image1
                            : `https://api.assortsmachinetools.com/${product.image1}`
                        }
                        alt="New Launch Product"
                        onClick={() => handleOpenModal(product)}
                      />
                    </div>
                    <p style={{ textAlign: "center", margin: "10px 0" }}>
                      {product.productname.slice(0, 15)}...
                    </p>
                    <div className="launch-buttons">
                      <button
                        className="viewButton"
                        onClick={() => handleOpenModal(product)}
                      >
                        View
                      </button>
                      <button
                        className="viewButton"
                        onClick={() => {
                          setOpenEnquiryModal(true);
                          setEnquiryForm((prev) => ({
                            ...prev,
                            productName: product.productname, // auto-fill
                          }));
                        }}
                      >
                        Enquiry Now
                      </button>{" "}
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
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
                      cursor:
                        currentIndex + 2 >= newProduct.length
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ textAlign: "center", margin: "20px" }}>
                No Products Available
              </p>
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
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  padding: "20px",
                  maxWidth: "80vw", // increased from 100% to 90vw for better size
                  maxHeight: "80vh",
                  width: "700px", // you can adjust this value
                  overflow: "auto",
                }}
              >
                {selectedProduct && (
                  <>
                    <img
                      src={selectedProduct.image1.includes("cloudinary")? selectedProduct.image1 : `https://api.assortsmachinetools.com/${selectedProduct.image1}`}
                      alt="Product"
                      style={{
                        width: "100%",
                        maxHeight: "60vh",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                    {/* <Typography
                      variant="body1"
                      style={{ marginTop: "10px", textAlign: "center" }}
                    >
                      {selectedProduct.description}
                    </Typography> */}
                  </>
                )}
              </div>
            </Modal>

            {/* ==== Enquiry Form Modal ======= */}

            <Modal
              open={openEnquiryModal}
              onClose={() => setOpenEnquiryModal(false)}
              aria-labelledby="enquiry-modal-title"
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  padding: "30px",
                  borderTop: "5px solid rgb(24, 29, 69)",
                  borderBottom: "5px solid rgb(24, 29, 69)",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <Typography variant="h5" gutterBottom align="center">
                  Enquiry Form
                </Typography>

                <form onSubmit={handleEnquirySubmit}>
                  <div style={{ marginBottom: "15px" }}>
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={enquiryForm.productName}
                      disabled
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={enquiryForm.name}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        color: "black",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={enquiryForm.email}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          email: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        color: "black",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={enquiryForm.phone}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          phone: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        color: "black",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label>Message</label>
                    <textarea
                      rows="3"
                      name="message"
                      value={enquiryForm.message}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          message: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        color: "black",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "15px",
                      backgroundColor: "rgb(24, 29, 69)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={getInputData}
                  >
                    Send Enquiry
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;
