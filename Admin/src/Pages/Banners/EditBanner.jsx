// src/Components/EditBanner/EditBanner.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner, updateBanner } from '../../Slice/Banner/bannerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { banner, loading, error } = useSelector((state) => state.banner);

    useEffect(() => {
        if (_id) {
            dispatch(fetchBanner(_id));
        }
    }, [_id, dispatch]);

    useEffect(() => {
        if (banner) {
            setImage(banner.image);
        }
    }, [banner]);

    const getFileData = (e) => {
        setImage(e.target.files[0]);
    };

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        dispatch(updateBanner({ id: _id, formData }))
            .unwrap()
            .then(() => {
                toast.success("Banner is Updated");
                navigate("/all-banners");
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
                    <h4>Edit Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="mb-2">
                        <label htmlFor="image" className="form-label">Banner Image <sup className='text-danger'>*</sup></label>
                        <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                    </div>
                    <button type="submit" className="mybtnself" disabled={loading} style={{ backgroundColor: "#28a745" }}>
                        {loading ? 'Updating...' : 'Update Banner'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
