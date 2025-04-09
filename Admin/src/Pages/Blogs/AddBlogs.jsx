import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import { addBlog } from '../../Slice/Blog/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlogs = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setcontent] = useState('');
  const [image, setImage] = useState(null);
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFileData = (e) => {
    setImage(e.target.files[0]);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !image) {
      toast.error('All fields are required!');
      return;
    }

    if(image.size){
      if (image.size > 2* 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('image', image);

    try {
      await dispatch(addBlog(formData)).unwrap();
      toast.success('New Blog is created');
      navigate('/all-blog');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Blog</h4>
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
              Blog Name <sup className='text-danger'>*</sup>
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
            <label htmlFor="blogDescription" className="form-label">
              Blog Description <sup className='text-danger'>*</sup>
            </label>
            <JoditEditor
              value={description}
              onChange={(newContent) => setDescription(newContent)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="blogDescription" className="form-label">
              Blog Content <sup className='text-danger'>*</sup>
            </label>
            <JoditEditor
              value={content}
              onChange={(newContent) => setcontent(newContent)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="blogImage" className="form-label">
              Blog Image <sup className='text-danger'>*</sup>
            </label>
            <input 
              type="file" 
              name="image" 
              id="blogImage" 
              className="form-control" 
              onChange={getFileData} 
              required
            />
          </div>
          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? 'Adding...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlogs;
