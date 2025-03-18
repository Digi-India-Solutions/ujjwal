import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// import abouimage from "../../images/about.jpg";
import aboutus from "../../images/aboutus.jpeg";
import "../AboutPage/AboutPage.css";
import Metatag from "../../Component/MetaTags/Metatag";
import { useEffect } from "react";
const AboutPage = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <>
      <Metatag
        title="About Assorts - Four Decades of Excellence in Manufacturing Precision Tools"
        description="Learn about Assorts, a family-run business founded in 1975 under the guidance of Sh. Suresh Chandra Gupta. With over 40 years of experience, we manufacture high-quality machine tools and accessories for various industries worldwide."
        keyword="Assorts, machine tools manufacturer, American tool holders, precision tools exporter, India machining tools, custom tools, Suresh Chandra Gupta"
      />

      <section className="bread">
        <div class="overlay">
          <Container>
            <nav aria-label="breadcrumb">
              <Typography variant="h2" gutterBottom>
                About Us
              </Typography>
              <Breadcrumbs class="breadCrumb_names" aria-label="breadcrumb">
                <Link to="/">Home</Link> /<Link to="/">About</Link>
              </Breadcrumbs>
            </nav>
          </Container>
        </div>
      </section>
      <Typography mt={5}>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ marginTop: { xs: '0', md: '8rem', sm: '' } }}>
              <img src={aboutus} width={"100%"} alt="" />
            </Grid>
            <Grid style={{ paddingLeft: '35px', paddingTop: '35px' }} item xs={12} md={6}>
              <Typography
                style={{
                  textAlign: "center",
                  color: "rgb(18, 80, 141)",
                  fontFamily: "inherit",
                  fontWeight: "600",
                  // padding:'1rem'
                }}
                mb={2}
                sx={{ fontSize: { xs: "25px", md: "30px", sm: "30px" }, margin: { xs: '0', sm: '0', md: '1' } }}
              >
                About Our Company
              </Typography>
              <Typography variant="body1" class="aboutcontent">
                Under the guidance of Sh. Suresh Chandra Gupta, the company was
                started in 1975 with a small set up to start manufacturing the
                American type Turning and Parting Tool Holders to supply to the
                people exporting it in their name from India. Today after around
                four decades years of Manufacturing experience & with his 2nd
                generation in business, WE are one of the leading
                Manufacturer-Exporter from India of large variety of Machine
                Tools Accessories for Hobby Machinists, Model Makers, Wood
                Workers, Carpenters & Industrial applications supplying to the
                various renowned retailers of Europe, USA, Asia & Other parts of
                the Globe.
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body1" class="aboutcontent">
                With the help of our well developed production & tool room
                facilities, and by the ardent efforts of our experienced team
                who possess sound knowledge & experience of the industry, have
                enabled us in becoming one of the most reliable name in the
                market today. The company's capabilities of manufacturing CUSTOM
                DESIGNED Items as per the customer's specification has made
                ASSORTS Machine Tools Company, a trusted source for a wide &
                comprehensive range of Precision Tools of International Quality
                Standards at competitive prices
              </Typography>
              <Typography variant="body1" class="aboutcontent">
                Our main Product line range includes Lathe's Quick Change Tool
                Posts, Lathe Parting & Torning Tool Holders, Rotary Tables & its
                accessories Like Clamp Kits, Dividing plates, Tailstocks, ER
                Collets Adaptors & Small Chucks with Back Platins, Knurling
                Tools, Tailstock, tapping attachments, Cutting tools, Taps &
                Dies, Lathe Alignment Test Bars, Vee Blocks, Revolving Centers,
                Vertical Milling Sädes, Boring Heads, Fly Cutters, Arbors,
                Sleeves, Precision Vises For Milling, Drilling & Grinding &
                Bench Vises, HSS Lathe Form Tools & Carbide Braned Tools Set,
                Lathe Chucks, Angle Plates, Surface Inspection Plates, Various
                DIY Hand tools, Punches, Jewelry Tours, Indexable Tools,
                Measuring Tool & Many More......
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </>
  );
};

export default AboutPage;
