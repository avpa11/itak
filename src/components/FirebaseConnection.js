import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
require('dotenv').config();

// const firebaseConfig = {
//           apiKey: process.env.REACT_APP_API_KEY,
//           authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//           projectId: process.env.REACT_APP_PROJECT_ID,
//           storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//           messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//           appId: process.env.REACT_APP_APP_ID,
//           measurementId: process.env.REACT_APP_MEASUREMENT_ID
          
//       };

      var firebaseConfig = {
        apiKey: "AIzaSyB4wNWsNK0HvvyB-mni30PhuFuw8i6v0nY",
        authDomain: "itak-game.firebaseapp.com",
        projectId: "itak-game",
        storageBucket: "itak-game.appspot.com",
        messagingSenderId: "6596958720",
        appId: "1:6596958720:web:1be965f9954d6e50c096e5",
        measurementId: "G-Q7W69DW379"
      };

// const config = process.env.NODE_ENV === 'production' ? firebaseConfigProduction : firebaseConfig;
const config = firebaseConfig;

class Firebase {
    constructor() {
        app.initializeApp(config);
        app.analytics();

        this.auth = app.auth();
        this.firestore = app.firestore();        
        this.storage = app.storage();

    }

    gameRoom = () => this.firestore.collection('gameRoom');        
    chips = () => this.firestore.collection('chips');        
}

export default Firebase;

