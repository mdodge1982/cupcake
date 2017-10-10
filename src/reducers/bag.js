const width = document.getElementById('root').offsetWidth;

const initialState = {
	facing: 'front',
	xPos: width/2,
	angle: 1.57,
	width: 46,
	height: 100
};

const bag = (state = initialState, action) => {
	switch (action.type) {
		case 'MOVE_BAG':
			let xPos = action.newXPos;
			let facing = action.direction;
			if(action.direction){
				const step = action.boardWidth/70;
				const movement = action.direction === 'right'
				? step
				: -1*step;
				xPos = state.xPos+movement;
			}else{
				facing = state.xPos-action.newXPos>0 ? 'left' : 'right';
			}
			const limitLeft = action.boardMargin;
			const limitRight = action.boardWidth-action.boardMargin-state.width;
			return {
				...state,
				xPos: xPos<limitLeft||xPos>limitRight ? state.xPos : xPos,
				facing
			};
		case 'STOP_BAG':
			return {
				...state,
				facing: 'front'
			};
		case 'ANGLE_SHOOT':
			return {
				...state,
				angle: action.angle
			};
		case 'BAG_UPRIGHT':
			return {
				...state,
				angle: 1.57
			};
		case 'RESIZE':
			const rightLimit = action.width-action.boardMargin-state.width;
			return {
				...state,
				xPos: state.xPos>rightLimit ? rightLimit : state.xPos
			};
		default:
			return state
	}
}

export default bag
