import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog, updateBlog } from "../../Slice/Blog/blogSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

const EditBlogs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, loading } = useSelector((state) => state.blog);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [content, setcontent] = useState("");

  useEffect(() => {
    // console.log(id)
    
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      // console.log("blog value",blog);
      
      setName(blog.name || "");
      setDescription(blog.description || "");
      setcontent(blog.content || "");
    }
  }, [blog]);

  const getFileData = (e) => {
    setImage(e.target.files[0]);
  };

  const postData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // console.log("content",content);
    
    formData.append("content", content);
    if (image) {
      
      if (image.size > 2* 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      formData.append("image", image);
    }
    
    dispatch(updateBlog({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Blog Updated Successfully");
        navigate("/all-blog");
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
          <h4>Edit Blog</h4>
        </div>
        <div className="links">
          <Link to="/all-blog" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={postData}>
          <div className="mb-2">
            <label htmlFor="blogName" className="form-label">
              Blog Name <sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="name"
              id="blogName"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="blogImage" className="form-label">
              Blog Image <sup className="text-danger">*</sup>
            </label>
            <input
              type="file"
              name="image"
              id="blogImage"
              className="form-control"
              onChange={getFileData}
            />
            {blog?.image && !image && (
              <img
                src={`http://localhost:8001/${blog.image}`}
                alt="Blog"
                className="mt-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="New Blog Preview"
                className="mt-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="blogDescription" className="form-label">
              Description <sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              value={description}
              onChange={(content) => setDescription(content)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="blogcontent" className="form-label">
              content <sup className="text-danger">*</sup>
            </label>
            <JoditEditor
              value={content}
              onChange={(content) => setcontent(content)}
            />
          </div>

          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlogs;
