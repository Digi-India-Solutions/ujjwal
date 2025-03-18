import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import "./Blog.css";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch Blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://api.assortsmachinetools.com/api/blog/get");
      // console.log(response.data)
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    fetchBlogs();
  }, []);

  return (
    <Container className="blog-container">
      <Typography
        style={{
          textAlign: "center",
          color: "rgb(18, 80, 141)",
          fontFamily: "inherit",
          fontWeight: "600",
        }}
        mb={2}
        sx={{ fontSize: { xs: "25px", md: "30px", sm: "30px" }, margin: { xs: "0", sm: "0", md: "1" } }}
      >
        Our Latest Blogs
      </Typography>
      
      <Grid container spacing={4} className="blog-grid">
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card className="blog-card">
              <CardMedia component="img" height="200" image={`https://api.assortsmachinetools.com/${blog.image}`} alt={blog.name} />
              <CardContent>
                <Typography variant="h6">{blog.name}</Typography>
                <Typography variant="body2" color="textSecondary">{blog.description}</Typography>
                <Button variant="contained" className="read-more-btn">
                  <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none", color: "white" }}>
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
