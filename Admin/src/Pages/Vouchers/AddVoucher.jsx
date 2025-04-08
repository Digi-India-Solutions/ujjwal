import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateVoucher = () => {
    const [formData, setFormData] = useState({
        productName: '',
        active: false,
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

        if (!file) {
            toast.error("Please upload an image");
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('active', formData.active);
        data.append('image', file);

        try {
            const response = await axios.post('https://api.assortsmachinetools.com/api/new-lanch', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            setFormData({ productName: '', active: false });
            setFile(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding banner");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>AddEnquiry Query Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-voucher" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
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
                            required
                        />
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
                            {isLoading ? "Please Wait..." : "AddEnquiry Query"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateVoucher;
