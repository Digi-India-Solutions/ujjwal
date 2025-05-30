import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import "../Contact/Contact.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Metatag from "../MetaTags/Metatag";
const Contact = () => {
  const [data, setData] = useState({
    name: "",
    companyname: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  })
  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const postdata = async (e) => {
    e.preventDefault()
    // console.log(data)
    try {
      let res = await axios.post("https://api.assortsmachinetools.com/api/contact", data)
      if (res.status === 200) {
        toast.success("Message sent successfully");
        setData({
          name: "",
          companyname: "",
          email: "",
          phone: "",
          address: "",
          message: ""
        });
      }
      else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <Metatag
        title="Contact Assorts - Your Reliable Manufacturer of Precision Tools"
        description="Get in touch with Assorts. Our address: Shastri Nagar, Near Metro Station, Landmark Gurudwara. We are one of India's leading manufacturers and exporters of machine tools and accessories."
        keyword="Contact Assorts, Assorts address, machine tools supplier contact, precision tools contact, Assorts customer service"
      />

      <div class="contact-bg">
        <div className="overlay">
          <Container>
            <Grid container style={{ alignItems: "center" }}>
              <Grid xs={12} md={6} p={5}>
                <Typography class="contact_heading">Contact Us</Typography>
                <Typography class="contact_para">
                At Assorts, we are committed to providing high-quality machine tools and accessories to meet your needs. Whether you have questions about our products, need expert advice, or require assistance with an order, our team is here to help!

                </Typography>
                <Typography mt={5} mb={1}>
                  <Link
                    to="mailto:contact@assortsmachinetools.com"
                    style={{ display: "flex", color: "white", gap: "10px" }}
                  >
                    <MailOutlineIcon /> contact@assortsmachinetools.com
                  </Link>
                </Typography>
                <Typography>
                  <Link
                    to="tel:+919625670144"
                    style={{ display: "flex", color: "white", gap: "10px" }}
                  >
                    <CallIcon /> + 91 9625670144 / +91 11 45037429

                  </Link>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <div>
                  <form action="" onSubmit={postdata}>
                    <div
                      style={{
                        padding: "2rem",
                        background: "white",
                        color: "black",
                        borderRadius: "1rem",
                      }}
                    >
                      <Typography variant="h6" mb={5}>
                      Fill out the form, and we’ll get back to you as soon as possible. We look forward to assisting you with the best solutions for your machining needs!
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <label htmlFor="">Enter Your Name</label>
                          <TextField
                          type="text"
                            id="outlined-basic"
                            required
                            variant="outlined"
                            fullWidth name="name" onChange={getInputData} value={data.name}
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-root": {
                                height: "100%",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <label htmlFor="">Company Name</label>
                          <TextField
                          type="text"
                            id="outlined-basic"
                            required
                            variant="outlined"
                            fullWidth name="companyname" onChange={getInputData} value={data.companyname}
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-root": {
                                height: "100%",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <label htmlFor="">Email ID</label>
                          <TextField
                          type="email"
                            id="outlined-basic"
                            variant="outlined"
                            required
                            fullWidth name="email" onChange={getInputData} value={data.email}
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-root": {
                                height: "100%",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <label htmlFor="">Phone Number</label>
                          <TextField
                            type="tel"
                            id="outlined-basic"
                            variant="outlined"
                            required
                            fullWidth name="phone" onChange={getInputData} value={data.phone}
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-root": {
                                height: "100%",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <label htmlFor="">Address</label>
                          <TextField
                          type="text"
                            fullWidth
                            required
                            id="outlined-basic"
                            variant="outlined" name="address" onChange={getInputData} value={data.address}
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-root": {
                                height: "100%",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <label htmlFor="">Your Message</label>
                          <TextField
                            fullWidth
                            type="text"
                            id="outlined-basic"
                            required
                            variant="outlined"
                            multiline name="message" onChange={getInputData} value={data.message}
                            rows={4}
                            sx={{
                              borderRadius: "5px",
                              "& .MuiInputBase-root": {
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <button className="send_message">Send Message</button>
                        </Grid>
                      </Grid>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Contact;
