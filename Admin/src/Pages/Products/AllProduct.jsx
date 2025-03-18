import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Number of items per page

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8001/api/product");
            const newData = res.data.data
            setData(newData.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("http://localhost:8001/api/product/" + _id);
            // console.log(res)
            if (res.status === 200) {
                toast.success("Product deleted successfully");
                getApiData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Product List </h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subcategory</th>
                            <th scope="col">Image1</th>
                            <th scope="col">Image2</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.productname}</td>
                                <td>{item.categoryname}</td>
                                <td>{item.subcategoryName}</td>
                                <td>
                                    <a href={`http://localhost:8001/${item.image1}`} target='_blank' rel="noopener noreferrer">
                                        <img src={`http://localhost:8001/${item.image1}`} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td>
                                    <a href={`http://localhost:8001/${item.image2}`} target='_blank' rel="noopener noreferrer">
                                        <img src={`http://localhost:8001/${item.image2}`} alt="" style={{ height: 50 }} />
                                    </a>
                                </td>
                                <td><Link className="bt edit" to={`/edit-product/${item._id}`}>Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><Link className="bt delete" onClick={() => deleteRecord(item._id)}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </section>
        </>
    )
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <Link onClick={() => paginate(number)} to='/all-products' className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AllProduct