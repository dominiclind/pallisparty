import firebase from 'firebase';
// import { getISOWeek, getYear } from 'date-fns';
import axios from 'axios';


var config = {
  apiKey: "AIzaSyDuQ0V397br4rYmedYaxXz2hlFicojde-0",
  authDomain: "pallis-party.firebaseapp.com",
  databaseURL: "https://pallis-party.firebaseio.com",
  projectId: "pallis-party",
  storageBucket: "pallis-party.appspot.com",
  messagingSenderId: "448013048195"
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
}


const provider = new firebase.auth.FacebookAuthProvider();


const objectAsArray = (obj = {}) => {
  const array = Object.keys(obj).map(key => {
    return {
      ...obj[key],
      id: key
    }
  });
  return array;
}

export function checkLogin(cb) {
	firebase.auth().onAuthStateChanged((user) => {
    if(user){
    	const cleanUser = {
				email: user.email,
				displayName: user.displayName,
				photo: user.photoURL,
				id: user.uid
    	};
      cb(cleanUser);
    } else {
      cb(false);
    }
  });
}

export function login() {

 	return new Promise((resolve, reject) => {

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;

		  // The signed-in user info.
		  var user = result.user;
		  var ref = firebase.database().ref().child("users");
		  
			var data = {
				email: user.email,
				displayName: user.displayName,
				photo: user.photoURL,
				id: user.uid
			}

			// resolve({user: data});
			ref.child(user.uid).update(data).then(function(ref) {
				resolve({token, user: data});
			}, function(error) {
				reject({error});
			});

		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
			reject({error});
		});
});

}


export function listen(cb) {
	firebase.database().ref().on('value', function(snapshot){
		const firebaseData = snapshot.val();

		cb({
			users: objectAsArray(firebaseData.users).map(user => {
				return {
					...user,
					games: objectAsArray(user.games)
				}
			}),
			games: objectAsArray(firebaseData.games).reverse(),
			game: firebaseData.game,
			selector: firebaseData.selector || false
		});
		
	})
}

export function createGame(game) {
	firebase.database().ref().child('game').set(game);
}

export function completeGame(game, uid, cb) {

	const gameToSave = {
		...game,
		date: new Date().getTime(),
		fromPlayer: {
			displayName: game.fromPlayer.displayName,
			photo: game.fromPlayer.photo
		},
		toPlayer: {
			displayName: game.toPlayer.displayName,
			photo: game.toPlayer.photo
		}
	};

	firebase.database().ref().child('games').push(gameToSave);
	
	firebase.database().ref().child('users/'+ uid).child('games').push(gameToSave, () => {
		firebase.database().ref().child('game').set(null);
		cb()
	});
}


export function saveImage(image, user, cb) {

	const gameToSave = {
		image: image,
		date: new Date().getTime(),
		fromPlayer: {
			displayName: user.displayName,
			photo: user.photo
		}
	};

	
	firebase.database().ref().child('games').push(gameToSave, () => {
		//firebase.database().ref().child('game').set(null);
		cb();
	});
}

export function setSelector(uid) {
	firebase.database().ref().child('selector').set(uid)
}

// logout
export const logout = (uid) => {
	firebase.database().ref().child('users/'+ uid).remove()
	firebase.auth().signOut();	
}
