
export const stopBag = () => {
	return {type: 'BAG_STOP'};
};
export const startGame = (replay) => {
	return (dispatch,getState) => {
		dispatch({type: 'BOARD_START'});
		dispatch({type: 'FROSTING_START'});
	}
};
export const resizeWindow = (e) => {
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
			type: 'CUPCAKES_ADD',
			id: nextCupcakeId++,
			board: board
		});
	};
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

const removeCupcake = (id,status) => {
	return (dispatch,getState) => {
		dispatch({type:'CUPCAKES_REMOVE',id});
		dispatch({type:'BOARD_REMOVECUPCAKE',status});
	};
}
const cupcakeMove = id => {
	return {type: 'CUPCAKES_MOVE', id};
}
const moveCupcake = id => {
	return (dispatch,getState) => {
		const {cupcakes,board} = getState();
		const cake = cupcakes.byId[id];
		const trashDest = getDestination(false,board);
		const boxDest = getDestination(true,board);
		const leftedge = trashDest[0];
		if(cake.xPos<=leftedge){
			if(cake.yPos<=trashDest[1]){
				dispatch(removeCupcake(id,'trash'));
			}else{
				if(cake.frosted===''){
					dispatch({type: 'CUPCAKES_TRASH', id});
				}
				dispatch(cupcakeMove(id));
			}
		}else{
			if(cake.yPos<=boxDest[1]){
				dispatch(removeCupcake(id,'box'));
			}else{
				dispatch(cupcakeMove(id));
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
					type: 'CUPCAKES_FROST',
					id: hitCakeId,
					success,
					destination
				});
				dispatch({type: 'FROSTING_REMOVE', id:blobId});
			}else{
				dispatch({type: 'FROSTING_MOVE', id:blobId});
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
