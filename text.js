const axios = require("axios");


// Define the API endpoint
const apiUrl = "http://localhost:8000/1";

// Define the payload for the POST request
const payload = {
  // Your payload data here
};

// Define the number of requests you want to send
const numRequests = 500;

// Function to send POST request
function sendPostRequest() {
  return axios.get(apiUrl);
}

// Send multiple requests
// setInterval(() => {
    try {
        console.log(new Date().getTime());
        for (let i = 0; i < numRequests; i++) {
            sendPostRequest();
        }
        console.log(new Date().getTime());
        console.log("......................")
    } catch (error) {
        console.log("Error")
    }
// },10);
