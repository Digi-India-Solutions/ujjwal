import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <section className="d-table">
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Role</th>
                            <th scope="col">Active</th>
                            <th scope="col">Created At</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th scope="row"></th>
                            </tr>
                    </tbody>
                </table>
            </div>
            </section>
        </>
    );
};

export default AllUsers;
