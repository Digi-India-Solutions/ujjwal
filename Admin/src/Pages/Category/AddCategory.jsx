import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../Slice/Category/categorySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [data, setData] = useState({ categoryname: "", image: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.category);
const [active, setActive] = useState(false);
    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("categoryname", data.categoryname);
        formData.append("image", data.image);
        formData.append("active", active);
        dispatch(addCategory(formData))
            .unwrap()
            .then(() => {
                toast.success("Category added successfully");
                navigate("/all-category");
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
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="mb-2">
                        <label htmlFor="categoryname" className="form-label">Category Name <sup className='text-danger'>*</sup></label>
                        <input type="text" name="categoryname" id="categoryname" className="form-control" onChange={getInputData} placeholder='Category Name' required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image" className="form-label">Category Image <sup className='text-danger'>*</sup></label>
                        <input type="file" name="image" id="image" className="form-control" onChange={getFileData} required/>
                    </div>
                    <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            <input
              type="checkbox"
              name="active"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              style={{ width: "16px", height: "16px" }}
            />
            <label htmlFor="active">Active</label>
          </div>
                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Loading...' : 'Add Category'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
