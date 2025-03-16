# EmployeePortal
Employee Portal with proper CRUD operation functionality

Download the project on your local machine.

///////////////////////////////////// Backend ///////////////////////////////////////////////////

In the terminal go inside the project folder and open terminal.

cd /Backend

npm i -f // To install all packages in Express Project

create .env file in root folder

Add 

API_KEY='Your_API_Key' // The key to access the APIs

There is also a "EmployeeAPI.postman_collection.json" file that you can open to run APIs in Postman

Finally run:

npm run dev // to run the Express Project

///////////////////////////////////// Fronend ///////////////////////////////////////////////////

Now Open different terminal and go to the frontend folder

cd /Frontend

npm i -f // To install all packages in React JS Project

create .env file in root folder

Add 

API_KEY='Your_API_Key' // The key to access the APIs 

VITE_API_BASE_URL='http://localhost:5000/api/employees'  // The base URL for APi

npm run dev // to run the React JS Project
