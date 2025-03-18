import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVoucher = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: '',
        active: false,
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the existing voucher data
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/new-lanch/${id}`);
                const { productName, active, image } = response.data;
                setFormData({ productName, active });
                setFile(image); // You can set the existing image here if needed
            } catch (error) {
                toast.error("Error fetching voucher data");
            }
        };
        fetchVoucher();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('active', formData.active);

        if (file instanceof File) {
            data.append('image', file);
        }

        try {
            const response = await axios.put(`http://localhost:8001/api/new-lanch/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            setIsLoading(false);
            navigate("/all-voucher");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating voucher");
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Voucher</h4>
                </div>
                <div className="links">
                    <Link to="/all-vouchers" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            name='productName'
                            className="form-control"
                            id="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Product Image</label>
                        <input
                            type="file"
                            name='image'
                            className="form-control"
                            id="image"
                            onChange={handleFileChange}
                        />
                        {file && typeof file === 'string' && (
                            <div className="mt-2">
                                <img src={file} alt="Current" style={{ width: '100px', height: 'auto' }} />
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="active"
                                id="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="active">
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Update Voucher"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditVoucher;
