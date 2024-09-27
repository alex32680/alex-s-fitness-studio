import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateEvent = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");
    const [photo, setPhoto] = useState("");
    const [instructor, setInstructor] = useState("");

    useEffect(()=>{
        actions.checkIfTokenInSessionStorage()
        // actions.verifyUser()
        if(!store.token){
            alert("no token found")
        }

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.createEvent({
            time,
            date,
            location,
            capacity: parseInt(capacity),
            signups: 0,
            photo,
            instructor
            
        });
        if (success) {
            navigate("/events");
        } else {
            alert("Error creating event");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Create Event</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="capacity"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Photo URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="photo"
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instructor" className="form-label">Instructor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="instructor"
                                        value={instructor}
                                        onChange={(e) => setInstructor(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Create Event</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};