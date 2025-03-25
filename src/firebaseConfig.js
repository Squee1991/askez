import { initializeApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from 'firebase/auth';
import { getFirestore, updateDoc , deleteField , deleteDoc , } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBhDly0l8cImq0geDGG7pQdsbH12sPl9CQ',
    authDomain: 'ascetic-app-a3a9d.firebaseapp.com',
    projectId: 'ascetic-app-a3a9d',
    storageBucket: "ascetic-app-a3a9d.appspot.com",
    appId: '1:727045995978:web:70afb6b73fc2bab1e26333',
    measurementId: "G-CMRDWZ7TDP"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ❗ Отключаем серверные сессии и включаем локальное хранение авторизации
setPersistence(auth, browserLocalPersistence);

export { auth, db, deleteField, deleteDoc ,  updateDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword };
