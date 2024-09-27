"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/user-login", methods=["POST"])
def login_user():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "Bad email or password"}), 400
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"msg": "no user"}), 404
    if user.password != password:
     return jsonify({"msg": "bad password"}), 401 
    access_token = create_access_token(identity=user.id)

    return jsonify(access_token=access_token)




@api.route("/user-current", methods=["GET"])
@jwt_required() 
def user_current():
    user = User.query.get(get_jwt_identity())  # Add parentheses to call the function
    if user is None:
        return jsonify({"msg": "user not found"}), 404
    return jsonify(user.serialize()), 200
  
  
@api.route("/customer-login", methods=["POST"])
def login_customer():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "Bad email or password"}), 400
    customer= Customer.query.filter_by(email=email).one_or_none()
    if customer is None:
        return jsonify({"msg": "no customer"}), 404
    if customer.password != password:
     return jsonify({"msg": "bad password"}), 401 
    access_token = create_access_token(identity=customer.id)

    return jsonify(access_token=access_token)

@api.route("/customer-signup", methods=["POST"])
def customer_signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    dob = request.json.get ("dob", None)
    address = request.json.get ("address", None)
    
    if name is None or email is None or password is None or dob is None or address is None:
        return jsonify({"msg": "Some fields are missing"}), 400
    customer= Customer.query.filter_by(email=email).one_or_none()
    if customer:
        return jsonify({"msg": "customer already exsist"}), 404
    customer= Customer(name=name, email=email, password=password, dob=dob,address=address)
    db.session.add(customer)
    db.session.commit()
    db.session.refresh(customer)
    response_body={"msg":"customer account successfully created","customer":customer.serialize()}
    return jsonify(response_body),201

@api.route("/events-all",methods={"GET"})
def events_all():
    events=Event.query.all()
    serialized_events=[ev.serialize() for ev in events] 
    return jsonify({"events": serialized_events}), 200

@api.route("/create-event", methods=["POST"])
def create_event():
    time = request.json.get("time", None)
    date = request.json.get("date", None)
    location = request.json.get("location", None)
    capacity = request.json.get("capacity", None)
    photo = request.json.get("photo", None)
    instructor = request.json.get("instructor", None)

    if time is None or date is None or location is None or capacity is None or photo is None or instructor is None:
        return jsonify({"msg": "Some fields are missing"}), 400

    event = Event(time=time, date=date, location=location, capacity=capacity, photo=photo, instructor=instructor)
    db.session.add(event)
    db.session.commit()
    db.session.refresh(event)
    response_body = {"msg": "Event successfully created", "event": event.serialize()}
    return jsonify(response_body), 201

@api.route("/delete-event/<int:event_id>",methods={"DELETE"})
def delete_event(event_id):

    event = Event.query.get(event_id)
    if event is None: 
        return jsonify({"msg": "event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "event successfully deleted"}), 200

@api.route("/edit-event/<int:event_id>", methods={"PUT"})
def edit_event(event_id):

    time = request.json.get("time" )
    date = request.json.get("date" )
    location = request.json.get("location")
    capacity = request.json.get("capacity")
    signups= request.json.get("signups")
    photo = request.json.get("photo")
    instructor = request.json.get("instructor")
    customer_id = request.json.get("customer_id")

    if time is None or date is None or location is None or capacity is None or signups is None or photo is None or instructor is None or customer_id is None:
        return jsonify({"msg": "Some fields are missing"}), 400
    
   
    event= Event.query.get(event_id)
    if event is None: 
        return jsonify({"msg": "event not found"}), 404
    event.time = time
    event.date = date
    event.location = location
    event.capacity = capacity
    event.signups = signups
    event.photo = photo
    event.instructor = instructor 
    event.customer_id = customer_id

   
    db.session.commit()
    db.session.refresh(event)
    response_body={"msg":"event account successfully created","event":event.serialize()}
    return jsonify(response_body),201

@api.route("/signup-for-event", methods=["POST"])
def signup_for_event():
    customer_id = request.json.get("customer_id", None)
    event_id = request.json.get("event_id", None)

    if customer_id is None or event_id is None:
        return jsonify({"msg": "Customer ID and Event ID are required"}), 400

    customer = Customer.query.get(customer_id)
    event = Event.query.get(event_id)

    if not customer or not event:
        return jsonify({"msg": "Customer or Event not found"}), 404

    if event in customer.events:
        return jsonify({"msg": "Customer already signed up for this event"}), 400

    if len(event.customers) >= event.capacity:
        return jsonify({"msg": "Event is already at full capacity"}), 400

    customer.events.append(event)
    db.session.commit()

    return jsonify({"msg": "Successfully signed up for the event"}), 200




