import { SignupCustomer } from "../pages/SignupCustomer";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			token: sessionStorage.getItem("token"),
			sessionStorageChecked: !!sessionStorage.getItem("token"),
			userId: undefined,
			events:  []
		},
		actions: {
			// Use getActions to call a function within a fuction


			checkIfTokenInSessionStorage: () => {
				if (sessionStorage.getItem("token")) {
					setStore({
						token: sessionStorage.getItem("token")
					});
				};
				setStore({
					sessionStorageChecked: true
				});
			},

			logInUser: async (user) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/user-login", {
					method: "POST",
					body: JSON.stringify({
						email: user.email,
						password: user.password
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
				);
				if (response.status !== 200) return false;

				const responseBody = await response.json();
				setStore({
					token: responseBody.access_token,
					isLoggedIn: true
				});
				sessionStorage.setItem("token", responseBody.access_token);

				return true;
			},

			verifyUser: ({ access_token, user_id }) => {
				setStore({
					token: access_token,
					userId: user_id
				})
				sessionStorage.setItem("token", access_token);
				sessionStorage.setItem("userId", user_id);
			},

			logInCustomer: async (customer) => {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer-login", {
					method: "POST",
					body: JSON.stringify({
						email: customer.email,
						password: customer.password
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
				);
				if (response.status !== 200) return false;

				const responseBody = await response.json();
				setStore({
					token: responseBody.access_token,
					isLoggedIn: true
				});
				sessionStorage.setItem("token", responseBody.access_token);

				return true;
			},

			signUpForEvent: async () => {

				const response = await fetch(
					process.env.BACKEND_URL + "/api/customer-signup", {
					method: "POST",
					body: JSON.stringify({ name: customer.name, email: customer.email, dob: customer.dob, address: customer.address, password: customer.password }),
					headers: {
						"Content-Type": "application/json"
					}

				}
				)
				if (response.status !== 201) return false;
				const responseBody = await response.json();
				console.log(responseBody)
				return true

			},
			logUserOut: () => {
				setStore({
					token: undefined,
					customerId: undefined
				});
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("customerId");
				setStore({ isLoggedIn: false });

				console.log("Logged out:", getStore().token)
			},
			createEvent: async (event) => {
				try {
					const response = await fetch(
						process.env.BACKEND_URL + "/api/create-event",
						{
							method: "POST",
							body: JSON.stringify({
								time: event.time,
								date: event.date,
								location: event.location,
								capacity: event.capacity,
								photo: event.photo,
								instructor: event.instructor
							}),
							headers: {
								"Content-Type": "application/json"
							}
						}
					);

					if (response.status !== 201) {
						console.error("Failed to create event");
						return false;
					}

					const responseBody = await response.json();
					console.log("Event created:", responseBody);

					return true;
				} catch (error) {
					console.error("Error creating event:", error);
					return false;
				}
			},

			signUpForEvent: async () => {

				const response = await fetch(process.env.BACKEND_URL + "/api/work-order/all", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				})
				if (response.status !== 200) return false;
				const responseBody = await response.json();
				setStore({ orders: responseBody.work_orders })
				return true;
			},

			getAllEvents: async () => {
				try{
					const response = await fetch (process.env.BACKEND_URL +"/api/events-all")
					if(response.status !==200) return false
					const data = await response.json()
					console.log("fetchevents",data)
					setStore({events:data})
					console.log("store updated with events",getStore().events)
					return true
				} catch (error){
					console.error("error fetching events",error)
					return false
				}

			}





		}
	};
};


export default getState;

// homework: create the action customer login and logout in flux, use user as reference. where ever it says user change the word to customer but has to its own action