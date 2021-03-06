import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPsIrvQzyfPjqZscFgI35ivxl7Ee2Yn50',
  authDomain: 'wally-not-found.firebaseapp.com',
  projectId: 'wally-not-found',
  storageBucket: 'wally-not-found.appspot.com',
  messagingSenderId: '643983018940',
  appId: '1:643983018940:web:46f1bfba518c184d1739b9'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
