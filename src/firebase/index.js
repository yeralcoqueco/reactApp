import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCR_ze-puFEJyE4htQyHghwGFICfCLmNuA',
    authDomain: 'react-guia.firebaseapp.com',
    databaseURL: 'https://react-guia.firebaseio.com',
    projectId: 'react-guia',
    storageBucket: 'react-guia.appspot.com',
    messagingSenderId: '767018470670'
};

firebase.initializeApp(config);

export { firebase };