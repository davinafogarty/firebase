// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, get, child }
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrs-U0Zs1vUbRQbESbejRvIBlGFn4-M-s",
    authDomain: "fir-alt1.firebaseapp.com",
    databaseURL: "https://fir-alt1-default-rtdb.firebaseio.com",
    projectId: "fir-alt1",
    storageBucket: "fir-alt1.firebasestorage.app",
    messagingSenderId: "325985040555",
    appId: "1:325985040555:web:053cd6993c592f3a511fee",
    measurementId: "G-EVX7GF0EPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get references to the buttons and table body
const insertBtn = document.getElementById("insertBtn");
const selectBtn = document.getElementById("selectBtn");
const dataList = document.getElementById("data-list");

// Function to insert data into Firebase
function insertData() {
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let age = document.getElementById('age').value.trim();
    let occupation = document.getElementById('occupation').value;

    // Check if required fields are empty
    if (name === "" || email === "") {
        alert("Name and Email are required!");
        return;
    }

    // Push user data to Firebase
    push(ref(db, 'users'), {
        name: name,
        email: email,
        age: age,
        occupation: occupation
    })
        .then(() => {
            alert("Data stored successfully");
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('age').value = "";
            document.getElementById('occupation').value = "teacher"; // Reset to default
        })
        .catch((error) => {
            alert("Error: " + error);
        });
}

// Function to fetch and display records from Firebase
function displayRecords() {
    const dbRef = ref(db);

    get(child(dbRef, 'users')).then((snapshot) => {
        dataList.innerHTML = ''; // Clear previous data

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.age}</td>
                    <td>${data.occupation}</td>
                `;
                dataList.appendChild(row);
            });
        } else {
            alert("No data available.");
        }
    }).catch((error) => {
        alert("Error fetching data: " + error);
    });
}

// Attach event listeners to buttons
insertBtn.addEventListener("click", insertData);
selectBtn.addEventListener("click", displayRecords);
