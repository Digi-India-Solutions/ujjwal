import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCartEnquiry = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:8001/api/cart-enquiry");

      const newData = res.data;

      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, [data.length]);
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Subscription Email </h4>
        </div>
        {/* <div className="links">
                    <Link to="/add-shop-banner" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div> */}
      </div>

      {/* <div className="filteration">
                <div className="selects">
                    <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div> */}

      <section className="d-table ">
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Company Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Products</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.companyName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>{item.status}</td>
                <td>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "20px",
                      margin: 0,
                    }}
                  >
                    {item.cart &&
                      item.cart.map((item, index) => (
                        <li key={index} style={{ display: 'list-item' }}> • {item.productname}</li>
                      ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllCartEnquiry;
