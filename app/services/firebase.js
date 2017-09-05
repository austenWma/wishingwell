import * as firebase from "firebase"
import { apiKey, authDomain, databaseURL} from '../../config'

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL
};

export const firebaseRef = firebase.initializeApp(firebaseConfig);
