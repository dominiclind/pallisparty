import { browserHistory } from 'react-router';
import collect from 'collect.js';
import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'river', 
  api_key: '856487459272745', 
  api_secret: '7Y1zPsA-YUE8LPUFvD0EOIklZYQ' 
});


const DRINKS = [
	'1 jäger',
	'1 Gin & Tonic',
	'1 Galopp 🍺 🐎',
	'1 Slippery Nipple 👅',
	'1 Skinny Bitch',
	'1 Sex on the beach 🌅',
	'Något som brinner!?',
	'1 tequila',
	'1 Branca Menta',
	'1 Gin järn',
	'\"det billigaste och starkaste du har\"',
	'1 Branca Menta',
	'1 Rom & Cola',
	'vatten..bara vatten!',
	'\"Överraska mig \"',
	'Öl...med två sugrör',
	'🐟 Fish 🐟',
	'1 Whiskey sour',
	'1 Branca Menta',
	'1 Cider',
	'1 HOTSHOT',
	'1 Bubblezzz',
	'1 Mintu',
	'1 kommer inte på mer :( välj själv',
	'1 \"din första fylla\"',
	'1 \"något-med-pynt-i\"'
];

import {
  listen as FBLISTEN,
  createGame as FBCREATEGAME,
  completeGame as FBCOMPLETEGAME,
  setSelector as FBSETSELECTOR,
  resetSelector as FBRESETSELECTOR,
  saveImage as FBSAVEIMAGE
} from '../utils/firebase';

export const GOT_DATA_SUCCESS = 'DATA/GOT_DATA_SUCCESS';

export const COMPLETE_GAME= 'DATA/COMPLETE_GAME';
export const COMPLETE_GAME_SUCCESS = 'DATA/COMPLETE_GAME_SUCCESS';


export function setSelector(userId) {
	return (dispatch, getState) => {
	  // check if any player is selector
		const {users = []} = getState().data;

	  let found = false;
	  users.map(u => {
	  	if(u.selector){
	  		found = u.id;
	  	}
	  });

	  const randomId = collect(users).random().id;

	  FBSETSELECTOR(userId);
	}
}

export function listen() {
  return (dispatch) => {

    FBLISTEN((data) => {
      console.log(data);
      const game = data.game || false;
      const users = data.users || [];
      const games = data.games || [];
      const selector = data.selector || false;

      dispatch({ type: GOT_DATA_SUCCESS, users: data.users, game, selector, games});
    });
  }
}

export function createGame() {
	return (dispatch, getState) => {
	 	const { auth, data } = getState();
	 	const { users } = data;
	 	const { user } = auth;

	 	if(user){
	 		// find user that is not same user
	 		const allIds = collect(users.map(u => u.id));
	 		const idsWithoutMe = allIds.diff([user.id]);
			const randomId = idsWithoutMe.random();

			const fromPlayer = users.filter(u => u.id == user.id)[0];
			const toPlayer = users.filter(u => u.id == randomId)[0];

			const game = {
				fromPlayer,
				toPlayer,
				drink: collect(DRINKS).random()
			};

	 		FBCREATEGAME(game);

	 	}
  }
}

export function completeGame(image) {
	return (dispatch, getState) => {
	 	const { auth, data } = getState();
	 	const { users, game } = data;
	 	const { user } = auth;
	 	dispatch({type: COMPLETE_GAME});

	 	// ajax save image
		cloudinary.uploader.upload(image).then(result => {
			const {url} = result;
			console.log(url);
		 	FBCOMPLETEGAME({...game, image:url}, user.id, () => {
		 		dispatch({type: COMPLETE_GAME_SUCCESS});
			  dispatch(setSelector(user.id));
		 	});
		});
  }
}


export function saveImage(image, cb) {
	return (dispatch, getState) => {
	 	dispatch({type: COMPLETE_GAME});
	 	const { auth, data } = getState();
	 	const { users, game } = data;
	 	const { user } = auth;

	 	// ajax save image
		cloudinary.uploader.upload(image).then(result => {
			const {url} = result;
			console.log(url);
		 	FBSAVEIMAGE(url, user, () => {
		 		dispatch({type: COMPLETE_GAME_SUCCESS});
		 	});
		});
  }
}
