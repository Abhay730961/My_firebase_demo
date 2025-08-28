// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔑 Firebase Config (अपनी Firebase Console से कॉपी करें)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML Elements
const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

// ✅ Add Data
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    await addDoc(collection(db, "users"), { name, email });
    alert("✅ User Added!");
    loadUsers(); // reload users list
    userForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// ✅ Read Data
async function loadUsers() {
  userList.innerHTML = ""; // clear old data
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = `${doc.data().name} - ${doc.data().email}`;
    userList.appendChild(li);
  });
}

// Load data on page load
loadUsers();
