export const startGame = () => {
	return (dispatch,getState) => {
		dispatch({type: 'BOARD_START'});
		dispatch({type: 'FROSTING_START'});
	}
};

export const resizeWindow = () => {
	return (dispatch,getState) => {
		const {board} = getState();
		const width = document.getElementById('root').offsetWidth;
		dispatch({type: 'BOARD_RESIZE',width});
		dispatch({
			type: 'BAG_RESIZE',
			boardMargin: board.margin,
			width
		});
	}
};

export const moveBag = (value) => {
	return (dispatch,getState) => {
		const {board} = getState();
		const direction = typeof value==='string' ? value : false;
		const newXPos = direction ? false : value;
		dispatch({
			type: 'BAG_MOVE',
			boardWidth: board.width,
			boardMargin: board.margin,
			direction,
			newXPos
		});
	};
};

export const stopBag = () => {
	return {type: 'BAG_STOP'};
};

let nextCupcakeId = 1001;
export const addCupcake = () => {
	return (dispatch,getState) => {
		const {board} = getState();
		dispatch({
			type: 'CUPCAKES_ADD',
			id: nextCupcakeId++,
			board: board
		});
	};
};

let nextBlobId = 1;
export const addFrosting = () => {
	return (dispatch,getState) => {
		const {bag} = getState();
		const {xPos,angle,height} = bag;
		dispatch({
			type: 'FROSTING_ADD',
			id: nextBlobId++,
			yPos: height,
			xPos,
			angle
		});
	};
};

export const angleShoot = e => {
	return (dispatch,getState) => {
		const {board} = getState();
		dispatch({
			type: 'BAG_ANGLESHOOT',
			e,
			board
		});
		dispatch(addFrosting());
		setTimeout(() => {
			dispatch({type: 'BAG_UPRIGHT'})
		},500);
	};
};
