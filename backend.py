# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import pyrebase
import os

# --- Firebase Configuration ---
# Replace with your actual Firebase project configuration
# You can find this in your Firebase project settings -> General -> Your apps -> Firebase SDK snippet -> Config
firebaseConfig = {
    "apiKey": "YOUR_API_KEY", # Replace with your actual API Key
    "authDomain": "YOUR_AUTH_DOMAIN", # Replace with your actual Auth Domain (e.g., your-project-id.firebaseapp.com)
    "projectId": "YOUR_PROJECT_ID", # Replace with your actual Project ID
    "storageBucket": "YOUR_STORAGE_BUCKET", # Replace with your actual Storage Bucket (e.g., your-project-id.appspot.com)
    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID", # Replace with your actual Messaging Sender ID
    "appId": "YOUR_APP_ID", # Replace with your actual App ID
    "databaseURL": "YOUR_DATABASE_URL" # Replace with your actual Database URL (if using Realtime Database, not strictly needed for Auth/Firestore)
}

# Initialize Pyrebase
try:
    firebase = pyrebase.initialize_app(firebaseConfig)
    auth = firebase.auth()
    db = firebase.firestore() # Initialize Firestore client
    print("Pyrebase initialized successfully.")
except Exception as e:
    print(f"Error initializing Pyrebase: {e}")
    print("Please ensure your firebaseConfig is correct.")
    # In a production environment, you might want to log this error and exit


app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- Sign Up Endpoint ---
@app.route('/signup', methods=['POST'])
def signup():
    """
    Handles user registration using Pyrebase Authentication and Firestore.
    Creates a user in Firebase Authentication and stores additional details in Firestore.
    """
    try:
        data = request.get_json()

        # Extract data from the request
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        age = data.get('age')
        state = data.get('state')
        country = data.get('country')
        aadhaar = data.get('aadhaar')
        email = data.get('email')
        password = data.get('password')

        # Basic validation: Check if essential fields are present
        if not all([name, email, password]):
            return jsonify({'message': 'Missing required fields (name, email, password)'}), 400

        # Create user in Firebase Authentication using Pyrebase
        try:
            # Pyrebase's create_user_with_email_and_password handles email/password creation
            user = auth.create_user_with_email_and_password(email, password)
            user_id = user['localId'] # Get the user ID from the response

            print(f"Successfully created new user via Pyrebase Auth: {user_id}")

            # Store additional user details in Firestore
            # The document ID in the 'users' collection will be the Firebase Auth user ID
            user_ref = db.collection('users').document(user_id)
            user_ref.set({
                'name': name,
                'address': address,
                'phone': phone, # Store phone number
                'age': age,     # Store age
                'state': state, # Store state
                'country': country, # Store country
                'aadhaar': aadhaar, # Store Aadhaar number
                'email': email      # Store email (redundant with Auth but useful for queries)
                # Note: Do NOT store the password here. Firebase Auth handles password hashing securely.
            })
            print(f"Successfully stored user details in Firestore for user: {user_id}")

            return jsonify({'message': 'User created successfully', 'userId': user_id}), 201

        except Exception as e:
            # Pyrebase exceptions might be less granular than firebase-admin
            # Inspect the exception message to identify specific errors
            error_message = str(e)
            print(f"Error during user creation: {error_message}")

            if "EMAIL_EXISTS" in error_message:
                 return jsonify({'message': 'Email already exists'}), 409
            elif "WEAK_PASSWORD" in error_message:
                 return jsonify({'message': 'Password is too weak'}), 400
            else:
                return jsonify({'message': f'Error creating user: {error_message}'}), 500

    except Exception as e:
        print(f"Error in signup request: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# --- Sign In Endpoint ---
@app.route('/signin', methods=['POST'])
def signin():
    """
    Handles user authentication using Pyrebase Authentication.
    Verifies user credentials (email/password).
    """
    try:
        data = request.get_json()

        # Extract data from the request
        email = data.get('email')
        # Phone is not used for direct sign-in with pyrebase's sign_in_with_email_and_password method
        password = data.get('password')

        # Basic validation
        if not email or not password: # Only require email and password for this sign-in method
             return jsonify({'message': 'Missing email or password'}), 400

        try:
            # Pyrebase sign_in_with_email_and_password directly verifies the password
            user = auth.sign_in_with_email_and_password(email, password)
            user_id = user['localId'] # Get the user ID from the successful sign-in response

            # You might want to return more user info here if needed on the frontend immediately after sign-in
            # For example, fetch some basic profile data from Firestore:
            # user_doc = db.collection('users').document(user_id).get()
            # user_data = user_doc.to_dict() if user_doc.exists else {}

            print(f"Successfully signed in user via Pyrebase Auth: {user_id}")
            return jsonify({'message': 'Sign in successful', 'userId': user_id}), 200 # Include userId in response

        except Exception as e:
            # Pyrebase sign-in errors
            error_message = str(e)
            print(f"Error during sign in: {error_message}")

            if "EMAIL_NOT_FOUND" in error_message or "INVALID_LOGIN_CREDENTIALS" in error_message:
                 # INVALID_LOGIN_CREDENTIALS covers both email not found and wrong password
                 return jsonify({'message': 'Invalid email or password'}), 401
            elif "TOO_MANY_ATTEMPTS_TRY_LATER" in error_message:
                 return jsonify({'message': 'Too many failed sign-in attempts. Try again later.'}), 429
            else:
                return jsonify({'message': f'Error during sign in: {error_message}'}), 500

    except Exception as e:
        print(f"Error in signin request: {e}")
        return jsonify({'message': 'Internal server error'}), 500

# --- Profile Endpoint ---
@app.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    """
    Fetches user profile data from Firestore based on user ID.
    NOTE: In a production app, you MUST add authentication/authorization
    to ensure only the logged-in user can access their own profile data.
    This endpoint is simplified for demonstration.
    """
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()

        if user_doc.exists:
            user_data = user_doc.to_dict()
            # Exclude sensitive info if necessary before sending to frontend
            # For this example, we'll send all stored data
            return jsonify(user_data), 200
        else:
            return jsonify({'message': 'User profile not found'}), 404

    except Exception as e:
        print(f"Error fetching profile data for user {user_id}: {e}")
        return jsonify({'message': 'Error fetching profile data'}), 500

# --- Placeholder Endpoint for Travel Plans (Needs Implementation) ---
@app.route('/user/<user_id>/travel-plans', methods=['GET'])
def get_user_travel_plans(user_id):
    """
    Fetches recent travel plans for a user from Firestore.
    This is a placeholder and needs actual implementation based on
    how you structure travel plans in your database.
    """
    try:
        # --- Implementation Needed Here ---
        # Example: Fetch documents from a 'travel_plans' collection
        # where a 'userId' field matches the requested user_id.
        # You might also want to order by date and limit the results.

        # Example query (assuming a 'travel_plans' collection with a 'userId' field):
        # docs = db.collection('travel_plans').where('userId', '==', user_id).order_by('startDate', direction='DESCENDING').limit(5).stream()
        # plans_list = [doc.to_dict() for doc in docs]

        # For now, returning dummy data or an empty list
        plans_list = [] # Replace with actual data fetching

        if not plans_list:
             # Return a 404 if no plans are found, or just an empty list with 200
             # Returning 200 with an empty list is often simpler for frontend handling
             return jsonify({'plans': []}), 200
        else:
             return jsonify({'plans': plans_list}), 200

    except Exception as e:
        print(f"Error fetching travel plans for user {user_id}: {e}")
        return jsonify({'message': 'Error fetching travel plans'}), 500


# --- Root Endpoint (Optional) ---
@app.route('/')
def index():
    return "Pyrebase + Flask Backend is running!"

# --- Run the Flask App ---
if __name__ == '__main__':
    # Run the app on a local development server
    # In production, use a production-ready WSGI server like Gunicorn or uWSGI
    app.run(debug=True, port=5000) # Runs on http://127.0.0.1:5000/
