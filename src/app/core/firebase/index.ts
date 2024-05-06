import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQGr9X2wKnqZfH5_3tMo3ZelCiS5KWp98',
  authDomain: 'books-spectrumdata.firebaseapp.com',
  projectId: 'books-spectrumdata',
  storageBucket: 'books-spectrumdata.appspot.com',
  messagingSenderId: '983558254570',
  appId: '1:983558254570:web:042d9b1e26271280074c93'
};

initializeApp(firebaseConfig);

export const db = getFirestore();
