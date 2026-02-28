// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Aqui estão as configurações do seu projeto Firebase.
// IMPORTANTE: Você precisa pegar esses dados no Console do Firebase (Configurações do Projeto > Geral > Seus aplicativos).
const firebaseConfig = {
  apiKey: "AIzaSyBcx8B2HnoeCYOf-lygq-ZM6OuyZgcAVQs",
  authDomain: "madeinbrasil-5c5e1.firebaseapp.com",
  projectId: "madeinbrasil-5c5e1",
  storageBucket: "madeinbrasil-5c5e1.firebasestorage.app",
  messagingSenderId: "985298913396",
  appId: "1:985298913396:web:c18bc689d01c7ada2aa921"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Exporta a referência do banco de dados para usarmos no App.tsx
export const db = getFirestore(app);