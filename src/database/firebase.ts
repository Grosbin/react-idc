import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Development

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY_DEV,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN_DEV,
//   projectId: import.meta.env.VITE_PROJECT_ID_DEV,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET_DEV,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_DEV,
//   appId: import.meta.env.VITE_APP_ID_DEV,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
