const getDestination = (success,board) => {
	const {box,trash} = board;
	if(success){
		return [box.xPos+(box.width/3),box.yPos+(box.height/3)];
	}else{
		return [trash.xPos+(trash.width/4),trash.yPos+(trash.height/2)];
	}
};

const cupcakeMove = id => {
	return {type: 'CUPCAKES_MOVE', id};
};

const removeCupcake = (id,status) => {
	return (dispatch,getState) => {
		dispatch({type:'CUPCAKES_REMOVE',id});
		dispatch({type:'BOARD_REMOVECUPCAKE',status});
	};
};

const moveCupcake = id => {
	return (dispatch,getState) => {
		const {cupcakes,board} = getState();
		const cake = cupcakes.byId[id];
		const trashDest = getDestination(false,board);
		if(cake.xPos<=trashDest[0]){
			if(cake.yPos<=trashDest[1]){
				dispatch(removeCupcake(id,'trash'));
			}else{
				if(cake.frosted===''){
					dispatch({type: 'CUPCAKES_TRASH', id});
				}
				dispatch(cupcakeMove(id));
			}
		}else{
			const boxDest = getDestination(true,board);
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

export default () => {
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
