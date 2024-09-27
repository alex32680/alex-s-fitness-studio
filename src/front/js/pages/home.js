import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Calendar, User } from 'lucide-react';

export const Home = () => {
	const { store, actions } = useContext(Context);
	

	useEffect(() => {
		const fetchEvents = async () => {
			const success = await actions.getAllEvents()
			
			if (success) {
			
				console.log(store.events)
			} else {
				alert("Touble getting events")
			}
		}
		fetchEvents()
		
	}, [actions])

	return (
		<div className="container-fluid bg-dark text-light">
			<div className="row">
				<div className="col-12 p-4">
					<h1 className="display-4 mb-4">Gym</h1>
					<div className="position-relative">
						<img src="https://res.cloudinary.com/dkqtmta6d/image/upload/v1726083459/gettyimages-group_photo_bwnidx.jpg" alt="Gym interior" className="img-fluid w-100" />
						<div className="position-absolute top-50 start-50 translate-middle text-center">
							<h2 className="translucid-background display-3 fw-bold">Get fit with a community</h2>
							<p className="translucid-background lead">At our gym, you can workout, take classes, and meet other members.</p>
							<button className="btn btn-primary btn-lg mt-3">Sign up for free</button>
						</div>
					</div>
					<div className="mt-4">
						<div className="input-group mb-3">
							<input type="email" className="form-control" placeholder="Enter your email" />
							<button className="btn btn-primary" type="button">Get started</button>
						</div>
					</div>
				</div>
			</div>


			<div className="row mt-5">
				 <div className="col-12">
					<h3 className="mb-4">Upcoming events</h3>
					{store.events.map((event) => (
						<div key={event.id} className="card bg-dark text-light mb-3">
							<div className="row g-0">
								<div className="col-md-4">
									<img src={event.photo} alt={event.instructor} className="img-fluid rounded-start" />
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h5 className="card-title">{event.instructor}</h5>
										<p className="card-text">
											<small className="text-muted">
												<User size={16} /> {event.instructor} <Calendar size={16} /> {event.date} at {event.time}
											</small>
										</p>
										<p className="card-text">{event.location}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};


