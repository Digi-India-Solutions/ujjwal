import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import AllCategory from "../../Pages/Category/AllCategory";
import AddCategory from "../../Pages/Category/AddCategory";
import EditCategory from "../../Pages/Category/EditCategory";
import AllProduct from "../../Pages/Products/AllProduct";
import AddProduct from "../../Pages/Products/AddProduct";
import EditProduct from "../../Pages/Products/EditProduct";
import AllBanner from "../../Pages/Banners/AllBanner";
import AddBanner from "../../Pages/Banners/AddBanner";
import EditBanner from "../../Pages/Banners/EditBanner";
import AllShopBanner from "../../Pages/ShopBanner/AllShopBanner";
import AddShopBanner from "../../Pages/ShopBanner/AddShopBanner";
import EditShopBanner from "../../Pages/ShopBanner/EditShopBanner";
import AllTags from "../../Pages/Tags/AllTags";
import AddTag from "../../Pages/Tags/AddTag";
import EditTag from "../../Pages/Tags/EditTag";
import AllVoucher from "../../Pages/Vouchers/AllVoucher";
import CreateVoucher from "../../Pages/Vouchers/AddVoucher";
import AllOrder from "../../Pages/Orders/AllOrder";
import EditOrder from "../../Pages/Orders/EditOrder";
import AllUsers from "../../Pages/Users/AllUsers";
import Login from "../auth/Login";
import EditVoucher from "../../Pages/Vouchers/EditVoucher";
import AllBlogs from "../../Pages/Blogs/AllBlogs";
import AddBlogs from "../../Pages/Blogs/AddBlogs";
import EditBlogs from "../../Pages/Blogs/EditBlogs";
import AllSubscription from "../../Pages/Subscripiton/AllSubscription";
import AllCartEnquiry from "../../Pages/CartEnquiry/AllCartEnquiry";
import ResetPassword from "../../Pages/ResetPassword/ResetPassword";
import axios from "axios";
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const checkAuth = async () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/reset-password")) {
      return;
    }
  
    const token = localStorage.getItem('token');
 
    if (!token) {
      navigate('/login');
      return;
    }
    try {
  const res =   await axios.post('https://api.assortsmachinetools.com/api/v1/auth/verify',{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     if(res.data.success){
      setIsAuthenticated(true);
      navigate('/dashboard');
     }
      
    } catch (err) {
      setIsAuthenticated(false);
      // localStorage.removeItem('token');
      navigate('/login');
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  
  return (
    <>
  
      {isAuthenticated ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

            
              {/* Category Routes */}
              <Route path="/all-category" element={<AllCategory />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:_id" element={<EditCategory />} />

              {/* Product Routes */}
              <Route path="/all-products" element={<AllProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:_id" element={<EditProduct />} />

              {/* User Routes */}
              <Route path="/all-users" element={<AllUsers />} />

              {/* Voucher Routes */}
              <Route path="/all-voucher" element={<AllVoucher />} />
              <Route path="/add-voucher" element={<CreateVoucher />} />
              <Route path="/edit-voucher/:id" element={<EditVoucher />} />

              {/* Tag Routes */}
              <Route path="/all-tags" element={<AllTags />} />
              <Route path="/add-tag" element={<AddTag />} />
              <Route path="/edit-tag/:_id" element={<EditTag />} />

              {/* Banner Routes */}
              <Route path="/all-banners" element={<AllBanner />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/edit-banner/:_id" element={<EditBanner />} />

              {/* Shop Banner Routes */}
              <Route path="/all-shop-banners" element={<AllShopBanner />} />
              <Route path="/add-shop-banner" element={<AddShopBanner />} />
              <Route
                path="/edit-shop-banner/:_id"
                element={<EditShopBanner />}
              />

              {/* Shop Banner Routes */}
              <Route path="/all-blog" element={<AllBlogs />} />
              <Route path="/add-blog" element={<AddBlogs />} />
              <Route path="/edit-blog/:id" element={<EditBlogs />} />

              {/* Order Routes */}
              <Route path="/all-orders" element={<AllOrder />} />
              <Route path="/edit-order/:_id" element={<EditOrder />} />

              {/* All Subscription Email */}
              <Route
                path="/all-subscription-email"
                element={<AllSubscription />}
              />
              <Route path="/all-cart-enquiry" element={<AllCartEnquiry />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route
                path="/reset-password/:id/:token"
                element={<ResetPassword />}
              />
        </Routes>
      )}
    </>
  );
};

export default Home;
