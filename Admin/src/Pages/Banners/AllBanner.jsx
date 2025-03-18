// src/Components/AllBanner/AllBanner.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners, deleteBanner } from '../../Slice/Banner/bannerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBanner = () => {
    const dispatch = useDispatch();
    const { banners, loading, error } = useSelector((state) => state.banner);

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteBanner(id))
            .unwrap()
            .then(() => {
                toast.success("Banner Deleted Successfully");
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            });
    };

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Banners</h4>
                </div>
                <div className="links">
                    <Link to="/add-banner" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
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
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td><img src={`http://localhost:8001/${item.image}`} alt="" style={{ width: "100%", height: "250px" }} /></td>
                                <td><Link className="bt edit" to={`/edit-banner/${item._id}`}>Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><button className="bt delete" onClick={() => handleDelete(item._id)}>Delete <i className="fa-solid fa-trash"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(banners.length / itemsPerPage) }, (_, i) => (
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
    );
};

export default AllBanner;
