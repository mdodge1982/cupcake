const receptacle = (state = {}, action) => {
	switch (action.type) {
		case 'REMOVE_CUPCAKE':
			return {
				...state,
				count: state.count+1
			};
		default:
			return state;
	}
};
const getWidth = () => document.getElementById('root').offsetWidth;

const width = getWidth();

const margin = 10;

const boxWidth = 100;

const cupcakeCount = 20;

const initialState = {
	width: width,
	height: 440,
	cupcakeCount: cupcakeCount,
	gameStarted: false,
	gameOver: false,
	trash: {
		width: 71,
		height: 100,
		xPos: margin,
		yPos: margin,
		type: 'trash',
		count: 0
	},
	box: {
		width: boxWidth,
		height: 88,
		xPos: width-boxWidth-margin,
		yPos: margin,
		type: 'box',
		count: 0
	}
};

const board = (state = initialState, action) => {
	switch (action.type) {
		case 'REMOVE_CUPCAKE':
			const gameOver = state.cupcakeCount===1;
			return {
				...state,
				cupcakeCount: state.cupcakeCount-1,
				[action.status]: receptacle(state[action.status],action),
				gameOver
			};
		case 'START_GAME':
			return {
				...state,
				gameStarted: true,
				gameOver: false,
				trash: {...state.trash,count:0},
				box: {...state.box,count:0},
				cupcakeCount
			};
		default:
			return state;
	}
}

export default board;
