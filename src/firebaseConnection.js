import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCih7FgyHC41ZycjBAFx2QCqXDZ7WZMDrQ",
  authDomain: "curso-fd3be.firebaseapp.com",
  projectId: "curso-fd3be",
  storageBucket: "curso-fd3be.appspot.com",
  messagingSenderId: "220722696866",
  appId: "1:220722696866:web:938aa3ea3863fe47a7fdfb",
  measurementId: "G-1GTDK17014"
};
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export { db, auth };