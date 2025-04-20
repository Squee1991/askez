import { initializeApp } from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence,} from 'firebase/auth'
import {getFirestore, updateDoc, deleteField, deleteDoc} from 'firebase/firestore'
import { firebaseConfig } from 'utils/protectFireBase.js'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

setPersistence(auth, browserLocalPersistence)

export {
    auth,
    db,
    deleteField,
    deleteDoc,
    updateDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
}

export const firebaseApp = initializeApp(firebaseConfig)
