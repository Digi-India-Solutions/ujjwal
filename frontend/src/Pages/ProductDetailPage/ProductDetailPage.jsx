import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../ProductDetailPage/ProductDetail.css";
import Product from "../../Component/Product/Product";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Metatag from "../../Component/MetaTags/Metatag";

const ProductDetailPage = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // console.log(data);

  const getAllProductData = async () => {
    try {
      let res = await axios.get(`https://api.assortsmachinetools.com/api/product/${_id}`);
      // console.log(res.data.data);
      setData(res.data.data);
      setSelectedImage(res.data.data.image2);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [_id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const images = [data.image1, data.image2, data.image3, data.image4].filter(Boolean);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metatag
        title="Precision Machine Tools and Accessories - Quality Products by Assorts"
        description="Browse our extensive collection of precision machine tools, including lathe tool holders, rotary tables, and custom-designed accessories. Assorts offers high-quality products at competitive prices."
        keyword="Precision tools, lathe tool holders, rotary tables, custom machine tools, Assorts products, milling tools, cutting tools, DIY tools"
      />

      <section className="bread">
        <div className="overlay">
          <Container>
            <nav aria-label="breadcrumb">
              <Typography variant="h2" gutterBottom>
                Our Products
              </Typography>
              <Breadcrumbs className="breadCrumb_names" aria-label="breadcrumb">
                <Link to="/">Home</Link> /<Link to="/">{data.categoryname}</Link> /<Link to="/">{data.subcategoryName}</Link>/<Link to="/">Product-Detail</Link>
              </Breadcrumbs>
            </nav>
          </Container>
        </div>
      </section>

      <div className="detail">
        <Container style={{ marginTop: "1rem" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              p={5}
              sx={{ padding: { xs: "2px", md: "10px", sm: "5px" } }}
            >
              <Typography
                sx={{ padding: { xs: "1rem", md: "2rem", sm: "1rem" } }}
                style={{ border: "1px solid lightgray" }}
              >
                <img src={`https://api.assortsmachinetools.com/${selectedImage}`} width={"100%"} alt={data.categoryname} />
              </Typography>
              <Grid container spacing={2} mt={2}>
                {images.map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <img
                      src={`https://api.assortsmachinetools.com/${image}`}
                      width={"100%"}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ cursor: "pointer", border: selectedImage === image ? "2px solid blue" : "none" }}
                      onClick={() => handleImageClick(image)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ padding: { xs: "1rem", md: "2rem", sm: "1rem" } }}
            >
              <Typography style={{ fontSize: '30px' }} className="name" mt={5} mb={3}>
                <b>
                  {data.productname}
                </b>
              </Typography>
              <Typography className="points" variant="body1" mb={3}>
                {data.details}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container >
        <Typography mt={5}>
          <Typography style={{ textAlign: 'center', fontSize: '30px' }} mb={3}>
            <b>
              Details Of {data.productname}
            </b>
          </Typography>
          <div style={{ overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: data.tableData }} />
        </Typography>
      </Container>
      <Product />
    </>
  );
};

export default ProductDetailPage;
