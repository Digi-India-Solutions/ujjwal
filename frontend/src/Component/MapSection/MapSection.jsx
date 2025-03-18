import React from "react";
import map from "../../images/earth.webp";
import { Container, Grid, Typography } from "@mui/material";
const MapSection = () => {
  return (
    <>
    <Container>
      <Grid container style={{alignItems:'center'}} mb={5}>
        <Grid item xs={12} md={6} p={2}>
          <img src={map} width={"100%"} height={'100%'} alt="our-map" />
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <Typography
            style={{ fontSize: "20px",color:'rgb(18, 80, 141)' ,fontFamily: "poppins" }}
            mb={3}
          ><b>
            If you wish to become one of our strategic partners to distribute
            our products we would love to hear from you.
          </b>
          </Typography>
          <Typography style={{ fontSize: "16px", fontFamily: "poppins" }}>
            Assorts Tools is the leading supplier of Machine Tool Accessories
            for than 55 years in India. New business opportunities have arisen
            for Tools Sector now. We are now Inviting new business partners to
            join the Assorts Tools brand.
          </Typography>
        </Grid>
      </Grid>
    </Container>

    </>
  );
};

export default MapSection;
