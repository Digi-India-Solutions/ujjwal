import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../../Slice/Blog/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .unwrap()
      .then(() => {
        toast.success("Blog Deleted Successfully");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Blogs</h4>
        </div>
        <div className="links">
          <Link to="/add-blog" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
        </div>
      </div>

      <div className="filteration">
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div>

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td><img src={ item.image.includes("cloudinary") ? item.image : `https://api.assortsmachinetools.com/${item.image}`} alt={item.name} style={{ width: "100px", height: "100px" }} /></td>
                <td>{item.name}</td>
                <td dangerouslySetInnerHTML={{ __html: item.description }}></td>
                <td><Link className="bt edit" to={`/edit-blog/${item._id}`}>Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                <td><button className="bt delete" onClick={() => handleDelete(item._id)}>Delete <i className="fa-solid fa-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(blogs.length / itemsPerPage) }, (_, i) => (
              <li key={i} className="page-item">
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  )
}

export default AllBlogs;