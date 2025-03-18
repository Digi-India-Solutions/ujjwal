import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, updateCategory } from '../../Slice/Category/categorySlice'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useParams();
    const category = useSelector((state) => state.category.category); // Correctly access category from state
    const [data, setData] = useState({
        categoryname: "",
        image: "" // This will only be used for display, not form input
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCategory(_id)); // Fetch category data on component mount
    }, [dispatch, _id]);

    useEffect(() => {
        if (category) {
            setData({
                categoryname: category.categoryname || "",
                image: category.image || "" // Set image URL for preview
            });
        }
    }, [category]);

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("categoryname", data.categoryname);
        if (data.image) {
            formData.append("image", data.image);
        }

        setLoading(true);
        try {
            await dispatch(updateCategory({ id: _id, formData }));
            toast.success("Category is Updated");
            navigate("/all-category");
        } catch (error) {
            toast.error("Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="mb-2">
                        <label htmlFor="categoryname" className="form-label">Category Name <sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="categoryname"
                            value={data.categoryname}
                            id="categoryname"
                            className="form-control"
                            onChange={getInputData}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image" className="form-label">Category Image <sup className='text-danger'>*</sup></label>
                        {data.image && <img src={data.image} alt="Current Category" style={{ width: 100, height: 100 }} />}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-control"
                            onChange={getFileData}
                        />
                    </div>
                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Category'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
