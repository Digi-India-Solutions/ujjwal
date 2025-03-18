import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTags = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8001/api/subcategory");
            const newData = res.data.data;
            setData(newData.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("http://localhost:8001/api/subcategory/" + _id);
            if (res.status === 200) {
                toast.success("Subcategory Deleted Successfully");
            }
            getApiData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Subcategory </h4>
                </div>
                <div className="links">
                    <Link to="/add-tag" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
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
                            <th scope="col">Category Name</th>
                            <th scope="col">Subcategory Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.categoryname}</td>
                                <td>{item.subcategoryName}</td>
                                <td><Link  className="bt edit" to={`/edit-tag/${item._id}`}>Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><Link  className="bt delete" onClick={()=>deleteRecord(item._id)}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                <Link onClick={() => setCurrentPage(number)} to='/all-tags' className='page-link'>
                                    {number}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default AllTags