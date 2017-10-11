import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';

const getPosition = blob => {
	const now = new Date().getTime();
	const elapsed = (now-blob.startTime)/50;
	const v = 40;
	const vX = v*Math.cos(blob.angle);
	const vY = v*Math.sin(blob.angle);
	const x = blob.x0+(vX*elapsed);
	let y = (-1*Math.pow(elapsed,2))+vY*elapsed;
	y = Math.max(0,y);
	return [x,y];
}

const blob = (state, action) => {
	switch (action.type) {
	case 'MOVE_FROSTING':
		const coords = getPosition(state);
		if(coords===false){
			return state;
		}
		return {
			...state,
			prevYPos: state.yPos,
			xPos: coords[0],
			yPos: coords[1]
		};
	default:
		return state
	}
}

const byId = (state = {}, action) => {
	switch (action.type) {
	case 'ADD_FROSTING':
		const width = 24;
		const xPos = action.xPos-width/2;
		const newBlob = {
			id: action.id,
			xPos,
			x0: xPos,
			y0: action.yPos,
			prevYPos: 1,
			yPos: 1,
			height: 40,
			width: width,
			startTime: new Date().getTime(),
			angle: action.angle
		};
		return {
			...state,
			[action.id]: newBlob
		};
	default:
		if(action.id&&state[action.id]){
			return {
				...state,
				[action.id]: blob(state[action.id], action)
			};
		}
		return state;
	}
}

const visibleIds = (state = [], action) => {
	switch (action.type) {
		case 'ADD_FROSTING':
			return [
				...state,
				action.id
			]
		case 'REMOVE_FROSTING':
			return state.filter(id => id!==action.id);
		case 'START_GAME':
			return [];
		default:
			return state
	}
}
const movingIds = (state = [], action) => {
	return visibleIds(state,action);
}

export default reduceReducers(
	combineReducers({
		byId,
		visibleIds,
		movingIds
	}),
	(state, action) => {
		switch (action.type) {
			case 'MOVE_FROSTING':
				var blob = state.byId[action.id];
				if(blob.yPos===0){
					return {
						...state,
						movingIds: state.movingIds.filter((id) => id!==action.id)
					};
				}
				return state;
			default:
				return state;
		}
	}
);

export const getBlob = (state, id) => {
	return state.byId[id];
}

export const getVisibleBlobs = state =>
	state.visibleIds.map(id => getBlob(state, id))

export const getMovingBlobs = state =>
	state.movingIds.map(id => getBlob(state, id))
