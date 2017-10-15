const receptacle = (state = {}, action) => {
	switch (action.type) {
		case 'BOARD_REMOVECUPCAKE':
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

const height = window.innerHeight;
const maxHeight = 440;

const margin = 10;

const boxWidth = 100;

const cupcakeCount = 20;

const initialState = {
	width: width,
	height: Math.min(height,maxHeight),
	cupcakeCount: cupcakeCount,
	gameStarted: false,
	gameOver: false,
	margin: margin,
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
		case 'BOARD_START':
			return {
				...state,
				gameStarted: true,
				gameOver: false,
				trash: {...state.trash,count:0},
				box: {...state.box,count:0},
				cupcakeCount
			};
		case 'BOARD_RESIZE':
			return {
				...state,
				width: action.width,
				box: {...state.box,xPos: action.width-boxWidth-margin,}
			};
		case 'BOARD_REMOVECUPCAKE':
			const gameOver = state.cupcakeCount===1;
			return {
				...state,
				cupcakeCount: state.cupcakeCount-1,
				[action.status]: receptacle(state[action.status],action),
				gameOver
			};
		default:
			return state;
	}
}

export default board;
