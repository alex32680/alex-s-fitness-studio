import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignupCustomer = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [dob, setDob] = useState("");
	const [address, setAddress] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await actions.signupCustomer({
			name: name,
			email: email,
			dob: dob,
			address: address,
			password: password
		});
		if (success) {
			navigate("/")
		} else {
			alert("error signup customer")
		}
	}
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Customer Signup</h2>
							<form onSubmit={handleSubmit}>
							<div className="mb-3">
									<label htmlFor="name" className="form-label">Name</label>
									<input
										type="name"
										className="form-control"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">Email address</label>
									<input
										type="email"
										className="form-control"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">Password</label>
									<input
										type="password"
										className="form-control"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="" className="form-label">DOB</label>
									<input
										type="dob"
										className="form-control"
										id="dob"
										value={dob}
										onChange={(e) => setDob(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="address" className="form-label">Address</label>
									<input
										type="address"
										className="form-control"
										id="address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										required
									/>
								</div>

								<div className="d-grid">
									<button type="submit" className="btn btn-primary">Login</button>
								</div>
							</form>
							<div className="mt-3 text-center">
								<Link to="/forgot-password">Forgot password?</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)

};



// 