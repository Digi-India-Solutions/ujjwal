
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Metatag from "../../Component/MetaTags/Metatag";
import { Container, Grid, Typography } from "@mui/material";

const SearchByCategory = () => {
  const { categoryName } = useParams(); // e.g., "Electronics"
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("https://api.assortsmachinetools.com/api/subcategory"); 

        const allSubcategories = response.data.data;

        console.log("allSubcategories", allSubcategories);
        
        // Filter based on category name from URL
        const filtered = allSubcategories.filter(
          (sub) => sub.categoryname.toLowerCase().trim() === categoryName.toLowerCase().trim()
        );

        setFilteredSubcategories(filtered);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [categoryName]);

  return (
    <>
    <Metatag
      title="Precision Machine Tools and Accessories - Quality Products by Assorts"
      description="Browse our extensive collection of precision machine tools, including lathe tool holders, rotary tables, and custom-designed accessories. Assorts offers high-quality products at competitive prices."
      keyword="Precision tools, lathe tool holders, rotary tables, custom machine tools, Assorts products, milling tools, cutting tools, DIY tools"
    />

    <div className="categoryImage">
      <div className="overlay">
        <Container>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "poppins",
              fontWeight: "600",
            }}
            variant="h4"
            mb={2}>
            <u>{categoryName}</u>
          </Typography>
          {
            filteredSubcategories.length > 0 ? <Grid container spacing={2}>
              {filteredSubcategories.map((item, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <article className="card">
                    <Link to={`/our-category/subcategory-product/${item.subcategoryName}`}>
                      <div className="card__img">
                        <img src={item.image.includes("cloudinary") ? item.image : `https://api.assortsmachinetools.com/${item.image}`} alt={item.name} />
                      </div>
                      <div className="card__name">
                      <p style={{ margin: "0" }}>
                            {item.subcategoryName.length > 15
                              ? `${item.subcategoryName.substring(0, 15)}...`
                              : item.subcategoryName}
                              
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
                        <p style={{ color: 'white' }}> {item.subcategoryName.length > 15
                              ? `${item.subcategoryName.substring(0, 15)}...`
                              : item.subcategoryName}</p>
                      </div>
                    </Link>
                  </article>
                </Grid>
              ))}
            </Grid> : <Typography variant="h4" color={"white"} textAlign={"center"} mt={5}>Currently Out of Stock</Typography>
          }
        </Container>
      </div>
    </div>

  </>
  
  );
};

export default SearchByCategory;
