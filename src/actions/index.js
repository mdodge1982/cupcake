
export const stopBag = () => {
	return {type: 'STOP_BAG'};
};
export const startGame = (replay) => {
	return {type: 'START_GAME', replay};
};
export const resizeWindow = (e) => {
	return (dispatch,getState) => {
		const {board} = getState();
		dispatch({
			type: 'RESIZE',
			width: document.getElementById('root').offsetWidth,
			boardMargin: board.margin
		});
	}
}

const getDestination = (success,board) => {
	const {box,trash} = board;
	if(success){
		return [box.xPos+(box.width/3),box.yPos+(box.height/3)];
	}else{
		return [trash.xPos+(trash.width/4),trash.yPos+(trash.height/2)];
	}
}

let nextCupcakeId = 1001;
export const addCupcake = () => {
	return (dispatch,getState) => {
		const {board} = getState();
		dispatch({
			type: 'ADD_CUPCAKE',
			id: nextCupcakeId++,
			boardWidth: board.width
		});
	};
};

export const moveBag = (value) => {
	return (dispatch,getState) => {
		const {board} = getState();
		const direction = typeof value==='string' ? value : false;
		const newXPos = direction ? false : value;
		dispatch({
			type: 'MOVE_BAG',
			boardWidth: board.width,
			boardMargin: board.margin,
			direction,
			newXPos
		});
	};
};

const moveCupcake = id => {
	return (dispatch,getState) => {
		const {cupcakes,board} = getState();
		const cake = cupcakes.byId[id];
		const trashDest = getDestination(false,board);
		const boxDest = getDestination(true,board);
		const leftedge = trashDest[0];
		if(cake.xPos<=leftedge){
			if(cake.yPos<=trashDest[1]){
				dispatch({type: 'REMOVE_CUPCAKE', status:'trash', id});
			}else{
				if(cake.frosted===''){
					dispatch({type: 'TRASH_CUPCAKE', id});
				}
				dispatch({type: 'MOVE_CUPCAKE', id});
			}
		}else{
			if(cake.yPos<=boxDest[1]){
				dispatch({type: 'REMOVE_CUPCAKE', status:'box', id});
			}else{
				dispatch({type: 'MOVE_CUPCAKE', id});
			}
		}
	}
};

const moveFrosting = blobId => {
	return (dispatch,getState) => {
		const {cupcakes,frosting,board} = getState();
		const blob = frosting.byId[blobId];
		const {xPos,yPos,width,height} = blob;
		if(yPos>0){
			const hitCakeId = cupcakes.visibleIds.find(id => {
				const cake = cupcakes.byId[id];
				if(cake.trashed||cake.frosted!==''){
					return false;
				}
				const yHit = yPos+height >= cake.yPos && yPos <= cake.yPos+cake.height;
				const xHit = xPos+width >= cake.xPos && xPos <= cake.xPos+cake.width;
				return xHit&&yHit;
			});
			if(hitCakeId){
				const success = blob.yPos<blob.prevYPos;
				const destination = getDestination(success,board);
				dispatch({
					type: 'FROST_CUPCAKE',
					id: hitCakeId,
					success,
					destination
				});
				dispatch({type: 'REMOVE_FROSTING', id:blobId});
			}else{
				dispatch({type: 'MOVE_FROSTING', id:blobId});
			}
		}
	}
};

let nextBlobId = 1;
export const addFrosting = () => {
	return (dispatch,getState) => {
		const {bag} = getState();
		const {xPos,angle,height} = bag;
		dispatch({
			type: 'ADD_FROSTING',
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
			type: 'ANGLE_SHOOT',
			e,
			board
		});
		dispatch(addFrosting());
		setTimeout(() => {
			dispatch({type: 'BAG_UPRIGHT'})
		},500);
	};
};


export const moveObjects = () => {
	return (dispatch,getState) => {
		const {cupcakes,frosting} = getState();
		const blobIds = frosting.movingIds;
		const cakeIds = cupcakes.movingIds;
		for(let i=0;i<blobIds.length;i++){
			dispatch(moveFrosting(blobIds[i]));
		}
		for(let i=0;i<cakeIds.length;i++){
			dispatch(moveCupcake(cakeIds[i]));
		}
	}
};
