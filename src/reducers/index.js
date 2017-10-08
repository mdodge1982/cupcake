import {combineReducers} from 'redux';
import board from './board';
import bag from './bag';
import frosting from './frosting';
import cupcakes from './cupcakes';

export default combineReducers({
	board,
	bag,
	frosting,
	cupcakes
});
