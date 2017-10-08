import {combineReducers} from 'redux';

const getPosition = blob => {
	if(blob.yPos>0){
		const v = 40;
		const vX = v*Math.cos(blob.angle);
		const vY = v*Math.sin(blob.angle);
		const now = new Date().getTime();
		const elapsed = (now-blob.startTime)/50;
		const y = (-1*Math.pow(elapsed,2))+vY*elapsed;
		const x = blob.x0+(vX*elapsed);
		return [x,y];
	}
	return [blob.xPos,0];
}

const blob = (state, action) => {
	switch (action.type) {
	case 'MOVE_FROSTING':
		const coords = getPosition(state);
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
	switch (action.type) {
		case 'STOP_FROSTING':
			return state.filter(id => id!==action.id);
		default:
			return visibleIds(state,action);
	}
}

export default combineReducers({
	byId,
	visibleIds,
	movingIds
});

export const getBlob = (state, id) =>
	state.byId[id];

export const getVisibleBlobs = state =>
	state.visibleIds.map(id => getBlob(state, id))

export const getMovingBlobs = state =>
	state.movingIds.map(id => getBlob(state, id))
