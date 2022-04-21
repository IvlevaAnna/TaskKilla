// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2lP8vNKmOF58QJ_o46CUOwjPp7SqEirs",
    authDomain: "taskkilla-60bb7.firebaseapp.com",
    databaseURL: "https://taskkilla-60bb7-default-rtdb.firebaseio.com",
    projectId: "taskkilla-60bb7",
    storageBucket: "taskkilla-60bb7.appspot.com",
    messagingSenderId: "752312838047",
    appId: "1:752312838047:web:2661f09d7ac592820a7faa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const historyRef = ref(db, 'history')
export const getHistoryByTaskIdRef = (taskId) => ref(db, `history/${taskId}`)
export const getHistoryByIdRef = (taskId, historyId) => ref(db, `history/${taskId}/${historyId}`)
