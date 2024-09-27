import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Userdashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Example: Fetch user details on component mount
    useEffect(() => {
        // You might want to fetch user details or perform actions when the component mounts
        // Example: actions.fetchUserDetails();
    }, [actions]);

    const handleLogout = () => {
        // Example: Call logout action
        actions.logOutUser(); // Assuming logOutUser is a defined action
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">User Dashboard</h1>
                            {/* Display user information here */}
                            {store.user ? (
                                <div>
                                    <p>Email: {store.user.email}</p>
                                    {/* Display other user details here */}
                                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
