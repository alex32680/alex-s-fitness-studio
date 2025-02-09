import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginCustomer = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await actions.logInCustomer({ email, password });
		if(success){
			navigate("/")
		} else {
			alert("error login in")
		}
		
		// Here you would typically call your login action
		console.log("Login attempt with:", email, password);
	}
	return (
<div className="container mt-5"> 
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Login</h2>
							<form onSubmit={handleSubmit}>
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
								<div className="d-grid">
									<button onClick="submit" className="btn btn-primary">Login</button>
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