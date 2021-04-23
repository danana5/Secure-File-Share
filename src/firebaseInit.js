import firebase from "firebase";
import "firebase/firestore";
import config from "./firebaseConfig";

const app = firebase.initializeApp(config);

export const st = app.storage();
export default app.firestore();
