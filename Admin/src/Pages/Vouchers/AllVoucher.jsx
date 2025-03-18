import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/new-lanch');
                setVouchers(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching vouchers");
                setIsLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this voucher?")) {
            try {
                await axios.delete(`http://localhost:8001/api/new-lanch/${id}`);
                setVouchers(vouchers.filter(voucher => voucher._id !== id));
                toast.success("Voucher deleted successfully");
            } catch (error) {
                toast.error("Error deleting voucher");
            }
        }
    };

    const handleCheckboxChange = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:8001/api/new-lanch/${id}`, {
                active: !currentStatus,
            });
            setVouchers(vouchers.map(voucher =>
                voucher._id === id ? { ...voucher, active: !currentStatus } : voucher
            ));
            toast.success("Status updated successfully");
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All New Launch</h4>
                </div>
                <div className="links">
                    <Link to="/add-voucher" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
            <section className="mt-2 d-table table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">S No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Active</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            vouchers.length > 0 ? vouchers.map((voucher, index) => (
                                <tr key={voucher._id}>
                                    <td>{index + 1}</td>
                                    <td>{voucher.productName}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:8001/${voucher.image}`}
                                            alt={voucher.productName}
                                            style={{ width: '100px', height: 'auto' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={voucher.active}
                                            onChange={() => handleCheckboxChange(voucher._id, voucher.active)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/edit-voucher/${voucher._id}`} className="btn btn-warning btn-sm">Edit</Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(voucher._id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No vouchers found</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllVoucher;
