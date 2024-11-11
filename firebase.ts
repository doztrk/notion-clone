import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA3gCqUVU5Zde0UM0QvcHoVi896qlCNPck",
	authDomain: "notion-clone-205c2.firebaseapp.com",
	projectId: "notion-clone-205c2",
	storageBucket: "notion-clone-205c2.firebasestorage.app",
	messagingSenderId: "745767067189",
	appId: "1:745767067189:web:45212995ef796d2407db7c",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
