import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCNK2mUA1dV-zW63DG3ulxAKkF5WWQEheE",
    authDomain: "ffspinn-2559.firebaseapp.com",
    projectId: "ffspinn-2559",
    storageBucket: "ffspinn-2559.appspot.com",
    messagingSenderId: "119913352994",
    appId: "1:119913352994:web:2329aeaab21f899ad59f7b",
    measurementId: "G-7V5EYDY524"
};

const app = initializeApp(firebaseConfig);

const Firestore = getFirestore(app);

export {Firestore};
