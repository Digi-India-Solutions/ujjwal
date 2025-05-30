import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo-assorts.png";
import "../HeaderPage/Header.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import experience from "../../images/experience.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

import axios from "axios";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageSelector from "../LanguageSelector";
const HeaderPage = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  // Fetch and set categories
  const getApiData = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/subcategory"
      );
      const newData = res.data.data;

      // Group data by category
      const groupedData = newData.reduce((acc, item) => {
        if (!acc[item.categoryname]) {
          acc[item.categoryname] = [];
        }
        acc[item.categoryname].push(item);
        return acc;
      }, {});

      // Convert grouped data to array
      const groupedArray = Object.keys(groupedData).map((key) => ({
        name: key,
        items: groupedData[key],
      }));

      setCategories(groupedArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch and set category data
  const getCategorydata = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/category"
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch and set subcategory data
  const getSubCategorydata = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/subcategory"
      );
      setSubCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch and set product data
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://api.assortsmachinetools.com/api/product"
      );
      // console.log("Product ", res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
    getCategorydata();
    getSubCategorydata();
    getAllProduct();
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Filter results based on query
  useEffect(() => {
    const results = [];

    // Filter categories
    categories.forEach((category) => {
      if (
        category.name &&
        category.name.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          type: "category",
          name: category.name,
          id: category.items[0]._id,
        });
      }
    });

    // Filter subcategories
    subCategory.forEach((subcategory) => {
      if (
        subcategory.subcategoryName &&
        subcategory.subcategoryName.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          type: "subcategory",
          name: subcategory.subcategoryName,
          id: subcategory._id,
        });
      }
    });

    // Filter products
    products.forEach((product) => {
      if (
        product.productname &&
        product.productname.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          type: "product",
          name: product.productname,
          id: product._id,
        });
      }
    });

    setFilteredResults(results);
  }, [query, categories, subCategory, products]);

  // Handle search on Enter key press
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (filteredResults.length > 0) {
        const firstResult = filteredResults[0];
        handleNavigation(firstResult);
      }
    }
  };

  // Navigate to the selected result
  const handleNavigation = (result) => {
    let url = "";
    if (result.type === "category") {
      url = `/our-category/products/${result.id}`;
    } else if (result.type === "subcategory") {
      url = `/our-category/products/${result.id}`;
    } else if (result.type === "product") {
      url = `/our-category/category/product-name/${result.id}`;
    }
    navigate(url);
    setQuery("");
  };

  return (
    <>
      <header>
        <div
          className="topbar"
          style={{
            backgroundColor: "rgb(14 24 56)",
            color: "#fff",
            padding: "10px 0",
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Box
              className="icons"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className="icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon style={{ marginRight: "5px" }} />{" "}
                <p>
                  <Link
                    className="text-decoration-none"
                    to="mailto:business@assortsmachinetools.com"
                    style={{ color: "#fff", fontSize: "16px", margin: 0 }}
                  >
                    business@assortsmachinetools.com
                  </Link>
                </p>
              </Box>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61568361916614"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="face" />
                </a>
                <a
                  href="https://www.youtube.com/@assortsmachinetools-india4434"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon className="youtube" />
                </a>
                <a
                  href="https://t.me/+U0IAB_v6QiBhZTY1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon className="tgm" />
                </a>
                <a
                  href="https://x.com/ASSORTS_Tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className="twitr" />
                </a>
                <a
                  href="https://www.instagram.com/assortsmachinetools_?igsh=MTA0NmVsN29mc2t1YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="insta" />
                </a>
                <div>
                  {" "}
                  <LanguageSelector />
                </div>
              </div>
            </Box>
          </Container>
        </div>

        <div className="for-laptop">
          <Grid className="headerMain" container spacing={2}>
            <Grid item xs={8} md={2}>
              <div className="logo">
                <Link to={"/"}>
                  <img
                    src={logo}
                    width={"100%"}
                    height={"100%"}
                    alt="Logo-Assorts"
                  />
                </Link>
              </div>
            </Grid>
            <Grid item xs={4} md={6}>
              <div className="navItem">
                <ul className="navbarUl">
                  <li className="navbarLi">
                    <Link className="ul_li_links" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="navbarLi">
                    <Link className="ul_li_links" to={"/about"}>
                      About
                    </Link>
                  </li>
                  <li className="navbarLi">
                    <Link
                      className="ul_li_links"
                      to="https://shop.assortsmachinetools.com/"
                      target="_blank"
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="navbarLi dropdown">
                    <div
                      className="dropdown-toggle"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Category <ArrowDropDownIcon />
                    </div>
                    <div className="dropdown-content">
                      <div className="dropdown_inner_content">
                        {categories.map((category) => (
                          <div key={category.name} className="dropdownWidth">
                            <Link to={`/our-category/${category.name}`}>
                              {" "}
                              <Typography className="dropdownheading">
                                {category.name}
                              </Typography>
                            </Link>
                            {category.items.map((item) => (
                              <p key={item._id}>
                                <Link
                                  className="headingContent"
                                  to={`/our-category/subcategory-product/${item.subcategoryName}`}
                                >
                                  <KeyboardDoubleArrowRightIcon
                                    style={{
                                      fontSize: "14px",
                                      color: "rgb(18, 80, 141)",
                                    }}
                                  />
                                  {item.subcategoryName}
                                </Link>
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li className="navbarLi">
                    <Link className="ul_li_links" to={"/blog"}>
                      Blog
                    </Link>
                  </li>
                  <li className="navbarLi">
                    <Link className="ul_li_links" to={"/contact"}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* 🔍 Search Bar */}
              <div
                className="search-container"
                style={{ position: "relative", flex: 1 }}
              >
                <div className="search-bar" style={{ position: "relative" }}>
                  <SearchIcon
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#1d2c59",
                    }}
                  />
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    style={{
                      paddingLeft: "3rem",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />
                </div>

                {/* 🔍 Search Results */}
                {query && filteredResults.length > 0 && (
                  <div className="search-results">
                    <ul>
                      {filteredResults.map((result, index) => (
                        <li
                          key={index}
                          onClick={() => handleNavigation(result)}
                        >
                          {result.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 🛒 Cart Option */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f8f8f8",
                }}
                onClick={() => navigate("/addtocart")} // on click go to /cart
              >
                <img
                  src="/cart.png" // make sure this image is in the /public folder
                  alt="cart"
                  width="25"
                  height="25"
                />
              </div>

              {/* 🖼️ Experience Image */}
              <img
                style={{ position: "relative" }}
                width={"20%"}
                src={experience}
                alt="experience"
              />
            </Grid>
          </Grid>
        </div>

        <div className="responsive-mobile">
          <div className="menu-header">
            <Typography className="menu-item">
              <Link to={"/"}>
                <img src={logo} width={"100%"} alt="" />
              </Link>
            </Typography>
          
            <button className="menu-button" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <ul className={`responsiveUl ${menuOpen ? "open" : ""}`}>
            <li className="responsiveli">
              <Link to={"/"} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="responsiveli">
              <Link to={"/about"} onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="responsiveli">
              <Link
                to={"https://shop.assortsmachinetools.com/"}
                target="_blank"
                onClick={closeMenu}
              >
                Shop
              </Link>
            </li>
            <li className="responsiveli">
              <Link to={"/blog"} onClick={closeMenu}>
                Blog
              </Link>
            </li>
            <li className="responsiveli">
              <div style={{ display: "flex", alignItems: "center" }}>
                Category <KeyboardDoubleArrowRightIcon />
              </div>
              <ul className="dropdown ">
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Lathe Machine Accessories
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Milling Machine Accessories
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Vices & Work
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Measuring Tools & Equipments
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Jewellery & Watch Making
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    DIY Tools (General WorkShop Tools)
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Best Seller Best Combos
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    Indexable Tool
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to={"/"} onClick={closeMenu}>
                    HSS Cutting & Finishing Tools
                  </Link>
                </li>
              </ul>
            </li>
            <li className="responsiveli">
              <Link to={"/contact"} onClick={closeMenu}>
                Contact
              </Link>
            </li>
            <li className="responsiveli">
              <Link to={"/addtocart"} onClick={closeMenu}>
                Cart
              </Link>
            </li>
            
          </ul>
        </div>
      </header>
    </>
  );
};

export default HeaderPage;
