import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import "./BlogDetails.css"; 
import axios from "axios";

const BlogDetails = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const getBlogDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/blog/change/${id}`);
      // console.log("asasa",response.data.data);
      setBlogPost(response.data.data);
    } catch (error) {
      setError(true);
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBlogDetail();
  }, [id]); 

  if (error) {
    return (
      <Container className="blog-details-container">
        <Typography variant="h5" align="center">
          Blog not found!
        </Typography>
      </Container>
    );
  }

  if (!blogPost) {
    return (
      <Container className="blog-details-container">
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="blog-details-container">
      <Typography
        mt={2}
        style={{
          textAlign: "center",
          color: "rgb(18 80 141)",
          fontFamily: "Poppins",
          fontWeight: "600",
          margin: "0",
        }}
        mb={2}
        sx={{ fontSize: { xs: "25px", md: "30px", sm: "30px" } }}
      >
        {blogPost.title}
      </Typography>
      
      <div className="blog-image-container">
        <img src={`http://localhost:8001/${blogPost.image}`} alt={blogPost.title} className="blog-image" />
      </div>

      <Typography variant="body1" className="blog-content">
        {blogPost.content}
      </Typography>

      <div className="button-container">
        <Button variant="contained" className="back-button">
          <Link to="/blog">Back to Blogs</Link>
        </Button>
      </div>
    </Container>
  );
};

export default BlogDetails;
