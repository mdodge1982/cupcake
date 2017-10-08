const width = document.getElementById('root').offsetWidth;

const initialState = {
	xPos: width/2,
	angle: 1.57,
	width: 46,
	height: 100
};

const bag = (state = initialState, action) => {
	switch (action.type) {
		case 'MOVE_BAG':
			const step = action.width/70;
			const movement = action.direction === 'right'
				? step
				: -1*step;
			const margin = step*4;
			const test = movement>0 ? state.xPos<action.width-margin : state.xPos>margin;
			return {
				...state,
				xPos: test ? state.xPos+movement : state.xPos,
				facing: action.direction
			}
		case 'STOP_BAG':
			return {
				...state,
				facing: 'front'
			}
		case 'ANGLE_SHOOT':
			return {
				...state,
				angle: action.angle
			}
		case 'BAG_UPRIGHT':
			return {
				...state,
				angle: 1.57
			}
		default:
			return state
	}
}

export default bag
