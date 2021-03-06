import {combineReducers} from 'redux';

const cakeHeight = 54;

const getYPosFromRow = (row,board) => {
	const {margin,height,trash} = board;
	const rangeTop = height-margin-cakeHeight;
	const rangeBottom = trash.height+(margin*2);
	const rowHeight = (rangeTop-rangeBottom)/2;
	return (row*rowHeight)+rangeBottom;
};

const getRow = () => Math.floor(Math.random()*3);

const headedToDestination = (frosted,yPos,destination,wait) => {
	if(wait!==0){
		return false;
	}
	if(!['failed','frosted'].includes(frosted)){
		return false;
	}
	if(yPos<=destination[1]){
		return false;
	}
	return true;
};

const getPosition = state => {
	const {frosted,trashed,yPos,xPos,wait,destination} = state;
	if(headedToDestination(frosted,yPos,destination,wait)){
		const angle = Math.atan2(destination[1]-yPos,destination[0]-xPos);
		const v = 20;
		const xStep = v*Math.cos(angle);
		const yStep = v*Math.sin(angle);
		return [xPos+xStep,yPos+yStep];
	}
	const newX = trashed ? xPos : xPos-3;
	const newY = trashed ? yPos-10 : yPos;
	return [newX,newY];
}


const cake = (state, action) => {
	switch (action.type) {
	case 'CUPCAKES_MOVE':
		const coords = getPosition(state);
		const wait = state.wait ? state.wait-1 : 0;
		return {
			...state,
			xPos: coords[0],
			yPos: coords[1],
			wait
		};
	case 'CUPCAKES_FROST':
		return {
			...state,
			frosted: action.success ? 'frosted' : 'failed',
			wait: 20,
			destination: action.destination
		};
	case 'CUPCAKES_TRASH':
		return {
			...state,
			trashed: true
		};
	default:
		return state
	}
}

const byId = (state = {}, action) => {
	switch (action.type) {
		case 'CUPCAKES_ADD':
			const row = getRow();
			const newCake = {
				id: action.id,
				width: 40,
				height: cakeHeight,
				frosted: '',
				xPos: action.board.width,
				row,
				yPos: getYPosFromRow(row,action.board),
				wait: 0
			};
			return {
				...state,
				[action.id]: newCake
			};
		case 'CUPCAKES_REMOVE':
			const newState = {...state};
			delete newState[action.id];
			return newState;
		default:
			if(action.id&&state[action.id]){
				return {
					...state,
					[action.id]: cake(state[action.id], action)
				};
			}
			return state;
	}
}

const visibleIds = (state = [], action) => {
	switch (action.type) {
		case 'CUPCAKES_ADD':
			return [
				...state,
				action.id
			]
		case 'CUPCAKES_REMOVE':
			return state.filter(id => id!==action.id);
		default:
			return state
	}
}
const movingIds = (state = [], action) => {
	return visibleIds(state,action);
}

export default combineReducers({
	byId,
	visibleIds,
	movingIds
});

export const getCake = (state, id) =>
	state.byId[id];

export const getVisibleCakes = state =>
	state.visibleIds.map(id => getCake(state, id))
