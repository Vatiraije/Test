// src/firebaseConfig.test.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // Emulator settings for Firestore
  projectId: "test-project",
  databaseURL: "http://localhost:8080", // This is the default Firestore emulator port
};

const app = initializeApp(firebaseConfig);

export default app;
