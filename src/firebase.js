// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJdWFgNLqFwkDM7sClwsWbaNjuYGJ9fJI",
	authDomain: "chat-962f8.firebaseapp.com",
	projectId: "chat-962f8",
	storageBucket: "chat-962f8.appspot.com",
	messagingSenderId: "37623943071",
	appId: "1:37623943071:web:7845df8df7338f4be2f7aa",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const storage = getStorage()

