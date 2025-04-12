import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Footer/Footer.css";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.assortsmachinetools.com/api/category");
        const newData = res.data.data;

        // const groupedData = newData.reduce((acc, item) => {
        //   if (!acc[item.categoryname]) {
        //     acc[item.categoryname] = [];
        //   }
        //   acc[item.categoryname].push(item);
        //   return acc;
        // }, {});

        // const groupedArray = Object.keys(groupedData).map((key) => ({
        //   name: key,
        //   items: groupedData[key],
        // }));

        setCategories(newData);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <a
        href="/catalogue.pdf"
        download
        className="fixed-pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PictureAsPdfIcon />
      </a>

      <div className="footer">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8} md={2} lg={3}>
              <div className="tt-mobile-collapse">
                <Typography variant="h6" className="tt-collapse-title">
                  Customer Service
                </Typography>
                <div className="tt-collapse-content">
                  <address>
                    <Typography variant="body2">
                      ADDRESS: F-106, Sector-3, DSIIDC Bawana Industrial Area,
                      110039
                    </Typography>
                    <Typography variant="body2">
                      PHONE: +91 9625670144 , +91 9268381215
                    </Typography>
                    <Typography variant="body2">
                      E-MAIL:{" "}
                      <a
                        style={{ color: "red" }}
                        href="mailto:Sales@assortsmachinetools.com"
                      >
                        Sales@assortsmachinetools.com
                      </a>
                    </Typography>
                  </address>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={4} md={6} lg={3}>
              <div className="tt-mobile-collapse">
                <Typography variant="h6" className="tt-collapse-title">
                  Information
                </Typography>
                <div className="tt-collapse-content">
                  <ul className="tt-list">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Grid>

            {/* Category Section */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="tt-mobile-collapse">
                <Typography variant="h6" className="tt-collapse-title">
                  Categories
                </Typography>
                <div className="tt-collapse-content">
                  {categories.slice(0, 5).map((category) => (
                    <div key={category.categoryname} className="footer-category">
                      <Link
                        to={`/our-category/${category.categoryname}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography className="footer-category-heading">
                          <ArrowForwardIosIcon style={{ fontSize: "14px" }} />{" "}
                          {category.categoryname}
                        </Typography>
                      </Link>
                    </div>
                  ))}

                  {categories.length > 5 && (
                    <div className="footer-view-more">
                      <Button variant="outlined" className="view-more-button">
                        <Link to="/our-category" className="view-more-link">
                          View More
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="tt-newsletter">
                <div className="tt-mobile-collapse">
                  <Typography variant="h6" className="tt-collapse-title">
                    Social Media
                  </Typography>
                  <Box className="icons">
                    <div
                      style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
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
                      <a href="https://www.instagram.com/assortsmachinetools_?igsh=MTA0NmVsN29mc2t1YQ==" target="_blank" rel="noopener noreferrer">
  <InstagramIcon className="insta" />
</a>
                    </div>
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Grid container className="copyright">
        <Grid item xs={12} className="text-center">
          <Typography className="text" variant="body2" align="center">
            © Copyright Assorts Machine Tools Co. - ASSORTS{" "}
            {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
