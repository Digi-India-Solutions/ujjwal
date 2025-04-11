import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSubscription = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8001/api/subscription")
            // console.log(res)
            const newData = res.data.data
            console.log("new Data", newData);
            
            setData(newData.reverse())
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getApiData()
    }, [data.length])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Subscription Email </h4>
                </div>
                {/* <div className="links">
                    <Link to="/add-shop-banner" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div> */}
            </div>

            {/* <div className="filteration">
                <div className="selects">
                    <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div> */}

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllSubscription