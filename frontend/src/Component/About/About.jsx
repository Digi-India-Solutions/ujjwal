import React from "react";
import aboutImage from "../../images/aboutmachine.jpg";
import { Container, Grid, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ backgroundColor: "#0a192f", py: 8, color: "#ffffff" , mt: 3}}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={aboutImage}
                alt="About Us"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  borderRadius: "20px",
                  boxShadow: "0px 8px 30px rgba(0, 255, 255, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Box>
          </Grid>
          
          {/* Text Section */}
          <Grid item xs={12} md={6}>
           <Typography
                   sx={{
                     textAlign: "center",
                     color: "#00FFFF",
                     fontFamily: "inherit",
                     fontWeight: "600",
                     padding: "1rem",
                     fontSize: { xs: "25px", md: "30px", sm: "30px" },
                     margin: { xs: "0", sm: "0", md: "1" },
                   }}
                   mb={2}
                 >
                   About Us
                 </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: "#d1d1d1",
                textAlign: "center",
                fontSize: "18px",
                lineHeight: "1.8",
                letterSpacing: "0.8px",
                px: { xs: 2, md: 4 },
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 5px 15px rgba(0, 255, 255, 0.2)",
              }}
            >
              Under the guidance of Sh. Suresh Chandra Gupta, the company started in 1975 with a small setup to manufacture high-quality Turning and Parting Tool Holders. Over four decades, with a passion for innovation and precision, we have evolved into a leading Manufacturer-Exporter of Machine Tools Accessories. Serving Hobby Machinists, Model Makers, Wood Workers, Carpenters, and Industrial sectors across Europe, USA, and Asia, we take pride in our heritage of excellence and craftsmanship.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;