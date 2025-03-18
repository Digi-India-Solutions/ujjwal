import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTag = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        categoryname: "",
        subcategoryName: ""
    })
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false)

    const getCategorydata = async () => {
        try {
            const res = await axios.get("https://api.assortsmachinetools.com/api/category")
            const categoryData = res.data.data
            setCategoryData(categoryData)
            // console.log(categoryData)
        } catch (error) {
            console.log(error)
        }
    }
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.post("https://api.assortsmachinetools.com/api/subcategory", data)
            // console.log(res)
            if (res.status === 200) {
                toast.success("Product Category is created")
                navigate("/all-tags")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategorydata()
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Subcategory</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="subcategoryName" className="form-label">Select Category <sup className='text-danger'>*</sup></label>
                            <select name="categoryname" id="subcategoryname" className="form-control" onChange={getInputData}>
                                <option value="">Please Select Category</option>
                                {categoryData.map((category, index) => (
                                    <option key={index} value={category.categoryname}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="categoryName" className="form-label">SubCategory Name <sup className='text-danger'>*</sup></label>
                            <input type="text" name="subcategoryName" id="categoryName" className="form-control" onChange={getInputData} placeholder='Subcategory Name' />
                        </div>
                    </div>
                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Loading...' : 'Add  Subcategory'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddTag;
