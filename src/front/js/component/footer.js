import React, { Component } from "react";
import { Link } from "react-router-dom";
export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-black">

		<div class="container text-center">
			<div class="row">
				<div className="col d-flex flex-column align-items-center">
					<h4 classname="text-white">
						Quick links:
					</h4>
					<Link to="/logincustomer" class="btn text-white fw-bold">Login Customer</Link>
					<Link to="/loginuser" class="btn text-white fw-bold">Login User</Link>
					<Link to="/signupcustomer" class="btn text-white fw-bold">Signup Customer</Link>
					<Link to="/create-event" class="btn text-white fw-bold">Create Event</Link>
				</div>
				<div className="col d-flex flex-column align-items-center">
					<h4 classname="text-white">
						Social Media:
					</h4>
					<a href="https://www.facebook.com/" class="btn text-white fw-bold">Facebook</a>
					<a href="https://www.instagram.com/stories/daking_alm26/" class="btn text-white fw-bold">Instagram</a>
					<a href="https://x.com/AlexMartinboro1" class="btn text-white fw-bold">X</a>
					<a href="https://www.linkedin.com/in/alex-martinborough-51830323/" class="btn text-white fw-bold">Linkedin</a>
				</div>
			</div>
		</div>

		<p>


			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
		</p>

	</footer>
);

