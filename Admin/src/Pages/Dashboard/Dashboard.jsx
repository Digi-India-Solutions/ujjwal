import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaList, FaTags, FaBoxOpen, FaImage, FaEnvelope, FaRocket } from 'react-icons/fa';
import './dashboard.css'; // Import the external CSS file
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState(0);
  const [subcategories, setSubcategories] = useState(0);
  const [products, setProducts] = useState(0);
  const [banner, setBanner] = useState(0);
  const [contactEnquiries, setContactEnquiries] = useState(0);
  const [newLanch, setNewLanch] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const categoryRes = await axios.get('http://localhost:8001/api/category');
      const subcategoryRes = await axios.get('http://localhost:8001/api/subcategory');
      const productRes = await axios.get('http://localhost:8001/api/product');
      const banner = await axios.get('http://localhost:8001/api/banner');
      const contactEnquiryRes = await axios.get('http://localhost:8001/api/contact');
      const newlanchdata = await axios.get('http://localhost:8001/api/get-all-enquiry');

      setCategories(categoryRes.data.data.length);
      setSubcategories(subcategoryRes.data.data.length);
      setProducts(productRes.data.data.length);
      setBanner(banner.data.data.length);
      setNewLanch(newlanchdata.data.data.length);
      setContactEnquiries(contactEnquiryRes.data.data.length);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <Link to='/all-category' className="link-style">
            <FaList className="dashboard-icon" />
            <h3>All Categories</h3>
            <p>{categories}</p>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/all-tags" className="link-style">
            <FaTags className="dashboard-icon" />
            <h3>Subcategories</h3>
            <p>{subcategories}</p>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/all-products" className="link-style">
            <FaBoxOpen className="dashboard-icon" />
            <h3>Products</h3>
            <p>{products}</p>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/all-banners" className="link-style">
            <FaImage className="dashboard-icon" />
            <h3>All Banner</h3>
            <p>{banner}</p>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to='/all-shop-banners' className="link-style">
            <FaEnvelope className="dashboard-icon" />
            <h3>Contact Enquiries</h3>
            <p>{contactEnquiries}</p>
          </Link>
        </div>
        <div className="dashboard-card">
          <Link to="/all-voucher" className="link-style">
            <FaRocket className="dashboard-icon" />
            <h3>Enquiry Queries</h3>
            <p>{newLanch}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
