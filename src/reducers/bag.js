const width = document.getElementById('root').offsetWidth;
const uprightAngle = 1.57;

const initialState = {
	facing: 'front',
	xPos: width/2,
	angle: uprightAngle,
	width: 46,
	height: 100
};

const bag = (state = initialState, action) => {
	switch (action.type) {
		case 'BAG_MOVE':
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
		case 'BAG_STOP':
			return {
				...state,
				facing: 'front'
			};
		case 'BAG_ANGLESHOOT':
			const {e,board} = action;
			const x = e.nativeEvent.offsetX;
			const y = board.height-e.nativeEvent.offsetY;
			let angle = Math.atan2(y,x-state.xPos);
			if(angle>1.9){
				angle = 2.0;
			}else if(angle<1.2){
				angle = 1.1;
			}
			return {
				...state,
				angle: angle
			};
		case 'BAG_UPRIGHT':
			return {
				...state,
				angle: uprightAngle
			};
		case 'BAG_RESIZE':
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
