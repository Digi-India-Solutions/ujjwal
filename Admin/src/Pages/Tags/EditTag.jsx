import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTag = () => {
  const [data, setData] = useState({
    categoryname: "",
    subcategoryName: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = async () => {
    try {
      const res = await axios.get("https://api.assortsmachinetools.com/api/category");
      setCategoryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFileData = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };
  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getApiData = async () => {
    try {
      let res = await axios.get("https://api.assortsmachinetools.com/api/subcategory/" + _id);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const file = data.image;

    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }
    const formdata = new FormData();
    formdata.append("categoryname", data.categoryname);
    formdata.append("subcategoryName", data.subcategoryName);
    if (file) {
      formdata.append("image", file);
    }

    setLoading(true);
    try {
      let res = await axios.put(
        "https://api.assortsmachinetools.com/api/subcategory/" + _id,
        formdata
      );
      if (res.status === 200) {
        toast.success("Subcategory is Updated");
        navigate("/all-tags");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
    getCategoryData();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Subcategory</h4>
        </div>
        <div className="links">
          <Link to="/all-tags" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={postData}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="categoryname" className="form-label">
                Category Name <sup className="text-danger">*</sup>
              </label>
              <select
                name="categoryname"
                id="categoryname"
                className="form-control"
                onChange={getInputData}
                value={data.categoryname}
              >
                <option value="">Please Select Category</option>
                {categoryData.map((category, index) => (
                  <option key={index} value={category.categoryname}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="subcategoryName" className="form-label">
                SubCategory Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                name="subcategoryName"
                id="subcategoryName"
                className="form-control"
                onChange={getInputData}
                value={data.subcategoryName}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label">
                SubCategory Image <sup className="text-danger">*</sup>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
                onChange={getFileData}
          
              />
            </div>
          </div>
          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? "Updating..." : "Update Subcategory"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTag;
