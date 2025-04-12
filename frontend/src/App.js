import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/HomePage';
import Contact from './Component/Contact/Contact'
import Footer from './Component/Footer/Footer';
import HeaderPage from './Component/HeaderPage/HeaderPage';
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import AllProductPage from './Pages/AllProductPage/AllProductPage';
import About from './Component/About/About';
import AboutPage from './Pages/AboutPage/AboutPage';
import toast, { Toaster } from 'react-hot-toast';
import SearchByCategory from './Pages/AllCategory/SearchByCategory';
import Blog from './Pages/BlogPage/Blog';
import BlogDetails from './Pages/BlogDetail/BlogDetails';
import AddToCart from './Pages/AddToCart/AddToCart'
import AllSubcategoryProduct from './Component/SubCategoryProduct/AllSubcategoryProduct';

const App = () => {
  return (
    <>
       <Toaster />
    <BrowserRouter>
    <HeaderPage/>
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/contact' element={<Contact />} />
      <Route path='/our-category' element={<CategoryPage />} />
      <Route path='/our-category/:categoryName' element={<SearchByCategory />} />
      <Route path='/our-category/products/:_id' element={<AllProductPage />} />
      <Route path='/our-category/subcategory-product/:subcategoryName' element={<AllSubcategoryProduct />} />
      <Route path='/our-category/category/product-name/:_id' element={<ProductDetailPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/addtocart' element={<AddToCart/>} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App