import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-black">
			<div className="container">
				<Link to="/">
				<img className="w-100" src="https://res.cloudinary.com/dkqtmta6d/image/upload/v1726085814/Rudy_s_Fitness_vg4j9m.png" alt="banner" />
				</Link>
				<div className="d-flex w-100 justify-content-between align-items-center">
					<div className="d-flex w-100 justify-content-between">
						<Link to="/loginuser" className="btn btn-dark mt-2">Login User</Link>
						<Link to="/logincustomer" className="btn btn-dark mt-2">Login Customer</Link>
						<Link to="/signupcustomer" className="btn btn-dark mt-2">Signup Customer</Link>
						<Link to="/create-event" className="btn btn-dark mt-2">Create Event</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
