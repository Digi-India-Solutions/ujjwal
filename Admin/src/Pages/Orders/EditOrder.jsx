import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditOrder = () => {
   
    return (
        <>

            <div className="bread">
                <div className="head">
                    <h4>Update Order</h4>
                </div>
                <div className="links">
                    <Link to="/all-orders" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Order Details</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Order ID</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">User Name</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone Number</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Order Date</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Final Price</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Order Status</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Payment Mode</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Payment Status</th>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Items</h5>
                            </div>
                            <div className="card-body">
                                    <div className="mb-3">
                                        <strong></strong><br />
                                        <p className="mb-1">SKU: </p>
                                        <p className="mb-1">Quantity:</p>
                                        <p className="mb-0">Price: </p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <Link to="/all-orders" className="btn btn-secondary">Back</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOrder;
