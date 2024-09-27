from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Define the association table for the many-to-many relationship between Customers and Events
event_customers = db.Table('event_customers',
    db.Column('customer_id', db.Integer, db.ForeignKey('customer.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # Do not serialize the password, it's a security breach
        }

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    dob = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    # Define many-to-many relationship with Event model using the event_customers table
    events = db.relationship('Event', secondary=event_customers, backref=db.backref('customers', lazy='dynamic'))

    def __repr__(self):
        return f'<Customer {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "dob": self.dob,
            "address": self.address,
            "events": [event.serialize() for event in self.events]
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    capacity = db.Column(db.Integer)
    photo = db.Column(db.String(120), nullable=False)
    instructor = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Event {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "time": self.time,
            "date": self.date,
            "location": self.location,
            "capacity": self.capacity,
            "signups": self.customers.count(),  # Use count method for dynamic relationship
            "photo": self.photo,
            "instructor": self.instructor
        }
