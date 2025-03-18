// src/Components/AddBanner/AddBanner.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner } from '../../Slice/Banner/bannerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const [image, setImage] = useState(null);
    const loading = useSelector((state) => state.banner.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFileData = (e) => {
        setImage(e.target.files[0]);
    };

    const postData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        dispatch(addBanner(formData))
            .unwrap()
            .then(() => {
                toast.success('New Banner is created');
                navigate('/all-banners');
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>
            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="mb-2">
                        <label htmlFor="productImage" className="form-label">Banner Image <sup className='text-danger'>*</sup></label>
                        <input type="file" name="image" id="productImage" className="form-control" onChange={getFileData} />
                    </div>
                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Loading...' : 'Add Banner'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBanner;
